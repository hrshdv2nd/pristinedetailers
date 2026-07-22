import type { Metadata } from 'next';
import { Promo } from '@/components/pages/promo';

export const metadata: Metadata = {
  title: 'Free Window Tinting with Ceramic Coating — Pristine Detailers',
  description: 'Receive a free mobile window tinting on every Ceramic Coating Package this month. Ceramic coating + tint packages from $999 in Melbourne.',
};

export default function Page() {
  return <Promo />;
}
