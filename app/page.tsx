import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: "Pristine Detailers — Melbourne's Premium Mobile Detailing",
  description: "Melbourne's premium mobile detailing service. Ceramic coating, paint protection film, and obsessive-grade car care — brought to your driveway. Serving 60+ suburbs.",
};

export default function Page() {
  return <Home />;
}
