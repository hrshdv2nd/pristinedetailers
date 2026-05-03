'use server';

import { createClient } from '@/lib/supabase/server';
import type { DetailerJobWithRelations } from '@/lib/types/database';

async function getDetailerId(): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data } = await supabase.from('detailers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!data) throw new Error('Detailer not found');
  return data.id;
}

export async function getMyJobs(): Promise<DetailerJobWithRelations[]> {
  const supabase = await createClient();
  const detailerId = await getDetailerId();
  const from = new Date();
  from.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from('bookings')
    .select('*, services(name, duration_minutes), vehicles(make, model, year, color, license_plate, notes), customers(notes, profiles(full_name, phone)), job_details(*)')
    .eq('detailer_id', detailerId)
    .in('status', ['confirmed', 'in_progress', 'pending'])
    .gte('scheduled_start', from.toISOString())
    .order('scheduled_start', { ascending: true });

  return (data as DetailerJobWithRelations[]) ?? [];
}

export async function getJobDetail(bookingId: string): Promise<DetailerJobWithRelations | null> {
  const supabase = await createClient();
  const detailerId = await getDetailerId();

  const { data } = await supabase
    .from('bookings')
    .select('*, services(name, duration_minutes), vehicles(make, model, year, color, license_plate, notes), customers(notes, profiles(full_name, phone)), job_details(*)')
    .eq('id', bookingId)
    .eq('detailer_id', detailerId)
    .single<DetailerJobWithRelations>();

  return data ?? null;
}

export async function startJob(bookingId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('bookings').update({ status: 'in_progress' }).eq('id', bookingId);
  await supabase.from('job_details').upsert({ booking_id: bookingId, started_at: new Date().toISOString() }, { onConflict: 'booking_id' });
}

export async function uploadJobPhotos(bookingId: string, type: 'before' | 'after', urls: string[]): Promise<void> {
  const supabase = await createClient();
  const { data: existing } = await supabase.from('job_details').select('before_photos, after_photos').eq('booking_id', bookingId).single<{ before_photos: string[]; after_photos: string[] }>();

  const field = type === 'before' ? 'before_photos' : 'after_photos';
  const current = existing?.[field] ?? [];

  await supabase.from('job_details').upsert({ booking_id: bookingId, [field]: [...current, ...urls] }, { onConflict: 'booking_id' });
}

export async function completeJob(
  bookingId: string,
  params: { notes: string; paymentType: 'membership' | 'card' | 'cash'; cashAmount?: number }
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const detailerId = await getDetailerId();

  const { data: booking } = await supabase.from('bookings').select('id, customer_id, price').eq('id', bookingId).eq('detailer_id', detailerId).single<{ id: string; customer_id: string; price: number }>();
  if (!booking) return { error: 'Job not found' };

  await supabase.from('bookings').update({ status: 'completed' }).eq('id', bookingId);
  await supabase.from('job_details').upsert({
    booking_id: bookingId,
    completion_notes: params.notes,
    completed_at: new Date().toISOString(),
  }, { onConflict: 'booking_id' });

  if (params.paymentType === 'cash' && params.cashAmount) {
    await supabase.from('payments').insert({
      customer_id: booking.customer_id,
      booking_id: bookingId,
      amount: params.cashAmount,
      currency: 'AUD',
      payment_type: 'one_time',
      status: 'pending',
    });
  }

  // Trigger review request
  await supabase.from('review_requests').insert({
    booking_id: bookingId,
    customer_id: booking.customer_id,
    status: 'pending',
    scheduled_send_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  });

  return {};
}

export async function getMyEarnings(): Promise<{ thisMonth: number; lastMonth: number; jobsCompleted: number; pendingPayout: number }> {
  const supabase = await createClient();
  const detailerId = await getDetailerId();

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();

  const [{ data: thisMonthJobs }, { data: lastMonthJobs }] = await Promise.all([
    supabase.from('bookings').select('price').eq('detailer_id', detailerId).eq('status', 'completed').gte('updated_at', thisMonthStart),
    supabase.from('bookings').select('price').eq('detailer_id', detailerId).eq('status', 'completed').gte('updated_at', lastMonthStart).lt('updated_at', thisMonthStart),
  ]);

  const sum = (jobs: Array<{ price: number }> | null) => (jobs ?? []).reduce((s, j) => s + (j.price ?? 0), 0);

  return {
    thisMonth: sum(thisMonthJobs as Array<{ price: number }>),
    lastMonth: sum(lastMonthJobs as Array<{ price: number }>),
    jobsCompleted: (thisMonthJobs ?? []).length,
    pendingPayout: sum(thisMonthJobs as Array<{ price: number }>),
  };
}
