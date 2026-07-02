import type { Metadata } from 'next';
import SignupPage from '@/components/portal/auth/signup-page';

export const metadata: Metadata = {
  title: 'Create Account — Pristine Detailers',
  description: 'Create your Pristine Detailers account to book services, manage your membership, and track your car care history online.',
};

export default function Page() {
  return <SignupPage />;
}
