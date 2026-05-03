import { redirect } from 'next/navigation';
import { getCurrentProfile } from '@/actions/auth';
import Sidebar from '@/components/portal/layout/sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile) redirect('/login');
  if (profile.role !== 'customer') redirect(profile.role === 'admin' ? '/admin' : '/detailer/jobs');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF8' }}>
      <Sidebar role="customer" userName={profile.full_name} />
      <main style={{ flex: 1, marginLeft: 240, overflowY: 'auto', minHeight: '100vh' }}>{children}</main>
    </div>
  );
}
