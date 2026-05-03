import type { Metadata } from 'next';
import LoginPage from '@/components/portal/auth/login-page';

export const metadata: Metadata = {
  title: 'Sign In — Pristine Detailers',
};

export default function Page() {
  return <LoginPage />;
}
