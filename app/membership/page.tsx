import type { Metadata } from 'next';
import { Membership } from '@/components/pages/membership';

export const metadata: Metadata = {
  title: 'Membership Plans — Pristine Detailers',
  description: 'Join a Pristine Detailers membership for regular professional car care in Melbourne. Enjoy member discounts, priority booking, and dedicated detailer service.',
};

export default function Page() {
  return <Membership />;
}
