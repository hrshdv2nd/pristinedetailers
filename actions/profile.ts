'use server';

import { createClient } from '@/lib/supabase/server';
import { getXeroInvoices, upsertXeroContact } from '@/lib/xero';
import type { Profile, Vehicle } from '@/lib/types/database';

export async function getCustomerProfile(): Promise<{ profile: Profile; customerId: string } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profile }, { data: customer }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single<Profile>(),
    supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>(),
  ]);

  if (!profile || !customer) return null;
  return { profile, customerId: customer.id };
}

export async function updateProfile(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const full_name = formData.get('full_name') as string;
  const phone     = formData.get('phone') as string | null;

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: full_name.trim(), phone: phone?.trim() || null, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  return error ? { error: error.message } : {};
}

export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return [];

  const { data } = await supabase
    .from('vehicles')
    .select('*')
    .eq('customer_id', customer.id)
    .order('is_primary', { ascending: false })
    .order('created_at', { ascending: true });

  return (data as Vehicle[]) ?? [];
}

export async function addVehicle(data: {
  make: string;
  model: string;
  year?: number;
  color?: string;
  license_plate?: string;
}): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return { error: 'Customer not found' };

  const { data: existing } = await supabase.from('vehicles').select('id').eq('customer_id', customer.id).limit(1);
  const isPrimary = !existing?.length;

  const { error } = await supabase.from('vehicles').insert({
    customer_id:   customer.id,
    make:          data.make.trim(),
    model:         data.model.trim(),
    year:          data.year ?? null,
    color:         data.color?.trim() || null,
    license_plate: data.license_plate?.trim() || null,
    is_primary:    isPrimary,
  });

  return error ? { error: error.message } : {};
}

export async function deleteVehicle(vehicleId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return { error: 'Not found' };

  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', vehicleId)
    .eq('customer_id', customer.id);

  return error ? { error: error.message } : {};
}

export async function setPrimaryVehicle(vehicleId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return { error: 'Not found' };

  await supabase.from('vehicles').update({ is_primary: false }).eq('customer_id', customer.id);
  const { error } = await supabase.from('vehicles').update({ is_primary: true }).eq('id', vehicleId).eq('customer_id', customer.id);

  return error ? { error: error.message } : {};
}

export interface XeroInvoiceRow {
  InvoiceID:     string;
  InvoiceNumber: string;
  Date:          string;
  DueDate:       string;
  Total:         number;
  AmountDue:     number;
  Status:        string;
  CurrencyCode:  string;
}

export async function getCustomerXeroInvoices(): Promise<XeroInvoiceRow[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: row } = await supabase
    .from('customers')
    .select('xero_contact_id, profiles(full_name, email)')
    .eq('user_id', user.id)
    .single<{ xero_contact_id: string | null; profiles: { full_name: string; email: string } | null }>();

  if (!row) return [];

  let contactId = row.xero_contact_id;

  if (!contactId && row.profiles) {
    try {
      contactId = await upsertXeroContact({ name: row.profiles.full_name, email: row.profiles.email });
      await supabase.from('customers').update({ xero_contact_id: contactId }).eq('user_id', user.id);
    } catch {
      return [];
    }
  }

  if (!contactId) return [];

  try {
    const invoices = await getXeroInvoices(contactId);
    return invoices as XeroInvoiceRow[];
  } catch {
    return [];
  }
}
