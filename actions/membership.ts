'use server';

import { createClient } from '@/lib/supabase/server';
import { createStripeCustomer, createMembershipCheckout, createBillingPortalSession, getCustomerInvoices } from '@/lib/stripe';
import type { Customer, MembershipPlan, Payment } from '@/lib/types/database';

export interface ReferralStats {
  code: string;
  totalReferred: number;
  pending: number;
  converted: number;
  rewardsEarned: number;
  nextRewardIn: number;
  timeline: Array<{
    name: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
}

export async function getMembershipStatus(): Promise<{ customer: Customer; plan: MembershipPlan | null } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('customers')
    .select('*, membership_plans(*)')
    .eq('user_id', user.id)
    .single<Customer & { membership_plans: MembershipPlan | null }>();

  if (!data) return null;
  const { membership_plans, ...customer } = data;
  return { customer, plan: membership_plans };
}

async function ensureStripeCustomer(supabase: Awaited<ReturnType<typeof createClient>>, userId: string): Promise<string | null> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single<{ email: string; full_name: string }>();

  if (!profile) return null;

  try {
    const stripeId = await createStripeCustomer(profile.email, profile.full_name, { supabase_user_id: userId });
    await supabase.from('customers').update({ stripe_customer_id: stripeId }).eq('user_id', userId);
    return stripeId;
  } catch {
    return null;
  }
}

export async function startMembershipCheckout(planId: string): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: plan } = await supabase.from('membership_plans').select('stripe_price_id').eq('id', planId).single<{ stripe_price_id: string }>();
  if (!plan?.stripe_price_id) return { error: 'Plan not found' };

  let { data: customer } = await supabase.from('customers').select('stripe_customer_id').eq('user_id', user.id).single<{ stripe_customer_id: string | null }>();

  if (!customer?.stripe_customer_id) {
    const newId = await ensureStripeCustomer(supabase, user.id);
    if (!newId) return { error: 'Could not create billing account. Please add STRIPE_SECRET_KEY.' };
    customer = { stripe_customer_id: newId };
  }

  try {
    const url = await createMembershipCheckout(
      customer.stripe_customer_id!,
      plan.stripe_price_id,
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/membership?success=1`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/membership`,
    );
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Checkout failed' };
  }
}

export async function openBillingPortal(): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  let { data: customer } = await supabase.from('customers').select('stripe_customer_id').eq('user_id', user.id).single<{ stripe_customer_id: string | null }>();

  if (!customer?.stripe_customer_id) {
    const newId = await ensureStripeCustomer(supabase, user.id);
    if (!newId) return { error: 'Could not create billing account. Please add STRIPE_SECRET_KEY.' };
    customer = { stripe_customer_id: newId };
  }

  try {
    const url = await createBillingPortalSession(
      customer.stripe_customer_id!,
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing`,
    );
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Portal failed' };
  }
}

export async function getPaymentHistory(): Promise<Payment[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: customer } = await supabase.from('customers').select('id').eq('user_id', user.id).single<{ id: string }>();
  if (!customer) return [];

  const { data } = await supabase.from('payments').select('*').eq('customer_id', customer.id).order('created_at', { ascending: false }).limit(50);
  return (data as Payment[]) ?? [];
}

export async function getReferralData(): Promise<ReferralStats> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', user!.id)
    .single<{ id: string }>();

  const { data: referrals } = await supabase
    .from('referrals')
    .select('*, referred_user:referred_user_id(email, full_name, created_at)')
    .eq('referrer_customer_id', customer?.id ?? '')
    .order('created_at', { ascending: false });

  const rows = (referrals ?? []) as Array<{ status: string; referred_user: { email: string; full_name: string; created_at: string } | null; created_at: string }>;
  const converted = rows.filter(r => r.status === 'first_detail_completed').length;

  return {
    code: user!.id.slice(0, 8).toUpperCase(),
    totalReferred: rows.length,
    pending: rows.filter(r => r.status !== 'first_detail_completed').length,
    converted,
    rewardsEarned: Math.floor(converted / 5),
    nextRewardIn: 5 - (converted % 5),
    timeline: rows.map(r => ({
      name: r.referred_user?.full_name ?? 'Unknown',
      email: r.referred_user?.email ?? '',
      status: r.status,
      createdAt: r.created_at,
    })),
  };
}
