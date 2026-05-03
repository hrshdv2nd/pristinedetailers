import type { Metadata } from 'next';
import { getMembershipStatus, getPaymentHistory } from '@/actions/membership';
import MembershipClient from '@/components/portal/customer/membership-client';

export const metadata: Metadata = { title: 'My Membership — Pristine Detailers' };

export default async function MembershipPage() {
  const [membership, payments] = await Promise.all([getMembershipStatus(), getPaymentHistory()]);
  return <MembershipClient membership={membership} payments={payments} />;
}
