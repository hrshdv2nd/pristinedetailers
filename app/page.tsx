import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: "Pristine Detailers — Melbourne's Premium Car Detailing",
  description: "Melbourne's premium car detailing service. Ceramic coating, paint protection film, obsessive-grade car care, and mobile window tinting. Serving 60+ suburbs.",
};

export default function Page() {
  return <Home />;
}
