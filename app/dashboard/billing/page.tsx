import type { Metadata } from 'next';
import { getPaymentHistory, openBillingPortal } from '@/actions/membership';
import Topbar from '@/components/portal/layout/topbar';
import BillingClient from '@/components/portal/customer/billing-client';

export const metadata: Metadata = { title: 'Billing — Pristine Detailers' };

export default async function BillingPage() {
  const payments = await getPaymentHistory();

  return (
    <div>
      <Topbar title="Billing" subtitle="Payment history and saved payment methods" />
      <div style={{ padding: 32 }}>
        <BillingClient payments={payments} />
      </div>
    </div>
  );
}
