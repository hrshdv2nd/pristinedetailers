'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createStripeCustomer } from '@/lib/stripe';
import type { Profile } from '@/lib/types/database';

export async function signUp(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const email    = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name     = formData.get('full_name') as string;
  const phone    = formData.get('phone') as string | null;

  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
  if (error) return { error: error.message };
  if (!data.user) return { error: 'Signup failed' };

  // Create Stripe customer
  let stripeCustomerId: string | null = null;
  try {
    stripeCustomerId = await createStripeCustomer(email, name, { supabase_user_id: data.user.id });
  } catch { /* non-fatal */ }

  // Upsert customer record with stripe ID
  await supabase.from('customers').upsert({
    user_id: data.user.id,
    stripe_customer_id: stripeCustomerId,
  });

  // Update profile with phone
  if (phone) {
    await supabase.from('profiles').update({ phone }).eq('id', data.user.id);
  }

  redirect('/dashboard');
}

export async function signIn(formData: FormData): Promise<{ error?: string }> {
  const supabase  = await createClient();
  const email     = formData.get('email') as string;
  const password  = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  // Role-based redirect
  const { data: profile } = await supabase.from('profiles').select('role').single<{ role: string }>();
  const dest = profile?.role === 'admin' ? '/admin' : profile?.role === 'detailer' ? '/detailer/jobs' : '/dashboard';
  redirect(dest);
}

export async function signInWithGoogle(): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
  });
  if (error) return { error: error.message };
  return { url: data.url };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single<Profile>();
  return data ?? null;
}
