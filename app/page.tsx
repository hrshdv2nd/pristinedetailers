import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: "Pristine Detailer | Melbourne's Paint Protection Specialists",
  description: "Melbourne's premium ceramic coating, graphene coating, and paint protection film specialists, plus mobile window tinting. Serving 60+ suburbs.",
};

export default function Page() {
  return <Home />;
}
