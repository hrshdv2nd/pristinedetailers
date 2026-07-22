import type { Metadata } from 'next';
import { Services } from '@/components/pages/services';

export const metadata: Metadata = {
  title: 'Services — Pristine Detailers',
  description: 'Premium car detailing services in Melbourne — full detail, ceramic coating, paint protection film, interior care, add-ons, and mobile window tinting.',
};

export default function Page() {
  return <Services />;
}
