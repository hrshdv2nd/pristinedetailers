import type { Metadata } from 'next';
import { Booking } from '@/components/pages/booking';

export const metadata: Metadata = {
  title: 'Book Now - Pristine Detailers',
  description: 'Book your ceramic coating, graphene coating, or paint protection film appointment in Melbourne.',
};

export default function Page() {
  return <Booking />;
}
