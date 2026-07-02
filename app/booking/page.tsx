import type { Metadata } from 'next';
import { Booking } from '@/components/pages/booking';

export const metadata: Metadata = {
  title: 'Book a Detail — Pristine Detailers',
  description: 'Book your mobile car detailing appointment in Melbourne. Choose from full detail, ceramic coating, paint protection film, and more — we come to you.',
};

export default function Page() {
  return <Booking />;
}
