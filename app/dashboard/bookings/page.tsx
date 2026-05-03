import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import BookingsClient from '@/components/portal/customer/bookings-client';
import type { Service } from '@/lib/types/database';

export const metadata: Metadata = { title: 'Book a Service — Pristine Detailers' };

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').eq('is_active', true).order('display_order');
  return <BookingsClient services={(services as Service[]) ?? []} />;
}
