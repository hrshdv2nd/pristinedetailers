'use server';

import { createClient } from '@/lib/supabase/server';
import type { CustomerWithPlan, MembershipStatus } from '@/lib/types/database';

export interface AdminKPIs {
  activeMemberships: number;
  newMembershipsThisMonth: number;
  churnedThisMonth: number;
  mrr: number;
  bookingsThisMonth: number;
  jobsCompleted: number;
  failedPayments: number;
  avgOrderValue: number;
  pendingPayouts: number;
  reviewConversion: number;
  referralConversion: number;
}

export interface RevenueBreakdown {
  byService: Array<{ service: string; revenue: number; jobs: number }>;
  byDetailer: Array<{ detailer: string; revenue: number; jobs: number }>;
  total: number;
  period: string;
}

export interface PayoutItem {
  detailerId: string;
  detailerName: string;
  jobsCompleted: number;
  amount: number;
  period: string;
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single<{ role: string }>();
  if (profile?.role !== 'admin') throw new Error('Forbidden');
  return supabase;
}

export async function getAdminKPIs(): Promise<AdminKPIs> {
  const supabase = await requireAdmin();
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [
    { count: activeMemberships },
    { count: newMemberships },
    { count: bookingsThisMonth },
    { count: jobsCompleted },
    { count: failedPayments },
    { data: plans },
    { data: recentPayments },
  ] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }).eq('membership_status', 'active'),
    supabase.from('customers').select('*', { count: 'exact', head: true }).gte('membership_started_at', monthStart),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).gte('created_at', monthStart),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'completed').gte('updated_at', monthStart),
    supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'failed').gte('created_at', monthStart),
    supabase.from('customers').select('membership_plan_id, membership_plans(price_monthly)').eq('membership_status', 'active'),
    supabase.from('payments').select('amount').eq('status', 'succeeded').gte('created_at', monthStart),
  ]);

  const mrr = ((plans ?? []) as unknown as Array<{ membership_plans: { price_monthly: number } | null }>)
    .reduce((sum, c) => sum + (c.membership_plans?.price_monthly ?? 0), 0);

  const totalRevenue = ((recentPayments ?? []) as Array<{ amount: number }>)
    .reduce((sum, p) => sum + p.amount, 0);

  const avgOrderValue = recentPayments?.length ? totalRevenue / recentPayments.length : 0;

  return {
    activeMemberships: activeMemberships ?? 0,
    newMembershipsThisMonth: newMemberships ?? 0,
    churnedThisMonth: 0,
    mrr,
    bookingsThisMonth: bookingsThisMonth ?? 0,
    jobsCompleted: jobsCompleted ?? 0,
    failedPayments: failedPayments ?? 0,
    avgOrderValue: Math.round(avgOrderValue),
    pendingPayouts: 0,
    reviewConversion: 0,
    referralConversion: 0,
  };
}

export async function getCustomers(page = 1, search = ''): Promise<{ customers: CustomerWithPlan[]; total: number }> {
  const supabase = await requireAdmin();
  const limit = 25;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('customers')
    .select('*, membership_plans(name, price_monthly, benefits), profiles!inner(full_name, email, phone, created_at)', { count: 'exact' });

  if (search) {
    query = query.or(`profiles.full_name.ilike.%${search}%,profiles.email.ilike.%${search}%`);
  }

  const { data, count } = await query.range(offset, offset + limit - 1).order('created_at', { ascending: false });
  return { customers: (data as CustomerWithPlan[]) ?? [], total: count ?? 0 };
}

export async function updateCustomerMembership(customerId: string, status: MembershipStatus): Promise<void> {
  const supabase = await requireAdmin();
  await supabase.from('customers').update({ membership_status: status }).eq('id', customerId);
}

export async function getRevenueBreakdown(period: 'month' | 'quarter' | 'year'): Promise<RevenueBreakdown> {
  const supabase = await requireAdmin();
  const days = period === 'month' ? 30 : period === 'quarter' ? 90 : 365;
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const { data: payments } = await supabase
    .from('payments')
    .select('amount, bookings(services(name), detailers(profiles(full_name)))')
    .eq('status', 'succeeded')
    .gte('created_at', since);

  const byService = new Map<string, { revenue: number; jobs: number }>();
  const byDetailer = new Map<string, { revenue: number; jobs: number }>();
  let total = 0;

  for (const p of (payments ?? []) as unknown as Array<{ amount: number; bookings: { services: { name: string } | null; detailers: { profiles: { full_name: string } | null } | null } | null }>) {
    total += p.amount;
    const svc = p.bookings?.services?.name ?? 'Other';
    const det = p.bookings?.detailers?.profiles?.full_name ?? 'Unknown';
    const s = byService.get(svc) ?? { revenue: 0, jobs: 0 };
    byService.set(svc, { revenue: s.revenue + p.amount, jobs: s.jobs + 1 });
    const d = byDetailer.get(det) ?? { revenue: 0, jobs: 0 };
    byDetailer.set(det, { revenue: d.revenue + p.amount, jobs: d.jobs + 1 });
  }

  return {
    byService: [...byService.entries()].map(([service, v]) => ({ service, ...v })).sort((a, b) => b.revenue - a.revenue),
    byDetailer: [...byDetailer.entries()].map(([detailer, v]) => ({ detailer, ...v })).sort((a, b) => b.revenue - a.revenue),
    total,
    period,
  };
}

export async function getPendingPayouts(): Promise<PayoutItem[]> {
  const supabase = await requireAdmin();
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  const { data } = await supabase
    .from('bookings')
    .select('detailer_id, price, detailers(profiles(full_name))')
    .eq('status', 'completed')
    .gte('updated_at', monthStart)
    .is('payout_id', null);

  const map = new Map<string, PayoutItem>();
  for (const b of (data ?? []) as unknown as Array<{ detailer_id: string; price: number; detailers: { profiles: { full_name: string } | null } | null }>) {
    if (!b.detailer_id) continue;
    const name = b.detailers?.profiles?.full_name ?? 'Unknown';
    const existing = map.get(b.detailer_id) ?? { detailerId: b.detailer_id, detailerName: name, jobsCompleted: 0, amount: 0, period: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) };
    map.set(b.detailer_id, { ...existing, jobsCompleted: existing.jobsCompleted + 1, amount: existing.amount + (b.price ?? 0) });
  }

  return [...map.values()];
}

export async function addAdminNote(customerId: string, note: string): Promise<void> {
  const supabase = await requireAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('admin_notes').insert({ customer_id: customerId, note, author_id: user!.id });
}
