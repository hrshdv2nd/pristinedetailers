import type { Metadata } from 'next';
import SignupPage from '@/components/portal/auth/signup-page';

export const metadata: Metadata = {
  title: 'Create Account — Pristine Detailers',
};

export default function Page() {
  return <SignupPage />;
}
