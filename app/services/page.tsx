import type { Metadata } from 'next';
import { Services } from '@/components/pages/services';

export const metadata: Metadata = {
  title: 'Services - Pristine Detailers',
  description: 'Premium ceramic coating, graphene coating, and paint protection film services in Melbourne - plus leather, glass, and wheel coating add-ons, and mobile window tinting.',
};

export default function Page() {
  return <Services />;
}
