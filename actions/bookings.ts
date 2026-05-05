'use server';

import { createClient } from '@/lib/supabase/server';
import { getSlots as setmoreSlots, createAppointment, cancelAppointment as setmoreCancel } from '@/lib/setmore';
import type { BookingWithRelations } from '@/lib/types/database';

export async function getUpcomingBookings(): Promise<BookingWithRelations[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return [];

  const { data } = await supabase
    .from('bookings')
    .select('*, services(name, duration_minutes), vehicles(make, model, year, color), detailers(profiles(full_name)), locations(name, address, city), job_details(before_photos, after_photos, completion_notes, checklist)')
    .eq('customer_id', customer.id)
    .in('status', ['pending', 'confirmed', 'in_progress'])
    .gte('scheduled_start', new Date().toISOString())
    .order('scheduled_start', { ascending: true });

  return (data as BookingWithRelations[]) ?? [];
}

export async function getPastBookings(limit = 20): Promise<BookingWithRelations[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return [];

  const { data } = await supabase
    .from('bookings')
    .select('*, services(name, duration_minutes), vehicles(make, model, year, color), detailers(profiles(full_name)), locations(name, address, city), job_details(before_photos, after_photos, completion_notes, checklist)')
    .eq('customer_id', customer.id)
    .in('status', ['completed', 'cancelled', 'no_show'])
    .order('scheduled_start', { ascending: false })
    .limit(limit);

  return (data as BookingWithRelations[]) ?? [];
}

export async function getAvailableSlots(serviceId: string, date: string): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data: service } = await supabase.from('services').select('setmore_service_id').eq('id', serviceId).single<{ setmore_service_id: string }>();
    if (!service?.setmore_service_id) return [];
    return await setmoreSlots('', service.setmore_service_id, date);
  } catch {
    return [];
  }
}

export async function createBooking(params: { serviceId: string; slotTime: string; notes?: string }): Promise<{ bookingId?: string; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: customer } = await supabase.from('customers').select('id, membership_status').eq('user_id', user.id).single<{ id: string; membership_status: string }>();
  if (!customer) return { error: 'Customer not found' };
  if (customer.membership_status !== 'active') return { error: 'Active membership required to book' };

  try {
    const appt = await createAppointment({ staff_key: '', service_key: params.serviceId, customer_key: user.id, start_time: params.slotTime, comment: params.notes });
    const { data: booking } = await supabase.from('bookings').insert({
      setmore_booking_id: appt.key,
      customer_id: customer.id,
      service_id: params.serviceId,
      status: 'confirmed',
      scheduled_start: appt.start_time,
      scheduled_end: appt.end_time,
      is_membership_booking: true,
      customer_notes: params.notes ?? null,
    }).select('id').single<{ id: string }>();

    return { bookingId: booking?.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Booking failed' };
  }
}

export async function cancelBooking(bookingId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: booking } = await supabase.from('bookings').select('id, setmore_booking_id, customer_id, customers!inner(user_id)').eq('id', bookingId).single<{ id: string; setmore_booking_id: string; customer_id: string; customers: { user_id: string } }>();
  if (!booking || booking.customers?.user_id !== user.id) return { error: 'Not authorized' };

  if (booking.setmore_booking_id) {
    try { await setmoreCancel(booking.setmore_booking_id); } catch { /* best-effort */ }
  }

  await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
  return {};
}
