import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminCustomerClient from '@/components/portal/admin/customer-detail-client';
import type { CustomerWithPlan } from '@/lib/types/database';

export const metadata: Metadata = { title: 'Customer Detail — Pristine Detailers Admin' };

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: customer } = await supabase
    .from('customers')
    .select('*, membership_plans(name, price_monthly, benefits), profiles!inner(full_name, email, phone, created_at)')
    .eq('id', id)
    .single<CustomerWithPlan>();

  if (!customer) notFound();

  const { data: notes } = await supabase
    .from('admin_notes')
    .select('*, profiles(full_name)')
    .eq('customer_id', id)
    .order('created_at', { ascending: false });

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, services(name), job_details(completion_notes)')
    .eq('customer_id', id)
    .order('scheduled_start', { ascending: false })
    .limit(20);

  return <AdminCustomerClient customer={customer} notes={notes ?? []} bookings={bookings ?? []} />;
}
