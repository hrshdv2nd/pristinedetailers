import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Billing — Pristine Detailers' };

export default function BillingPage() {
  redirect('/dashboard/membership');
}
