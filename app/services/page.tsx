import type { Metadata } from 'next';
import { Services } from '@/components/pages/services';

export const metadata: Metadata = {
  title: 'Services — Pristine Detailers',
  description: 'Premium mobile car detailing services in Melbourne — full detail, ceramic coating, paint protection film, interior care, and add-ons. We come to your driveway.',
};

export default function Page() {
  return <Services />;
}
