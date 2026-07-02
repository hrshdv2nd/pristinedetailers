import type { Metadata } from 'next';
import LoginPage from '@/components/portal/auth/login-page';

export const metadata: Metadata = {
  title: 'Sign In — Pristine Detailers',
  description: 'Sign in to your Pristine Detailers account to manage bookings, track your car care history, and access your membership.',
};

export default function Page() {
  return <LoginPage />;
}
