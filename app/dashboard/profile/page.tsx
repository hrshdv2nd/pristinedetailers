import type { Metadata } from 'next';
import { getCustomerProfile, getVehicles } from '@/actions/profile';
import Topbar from '@/components/portal/layout/topbar';
import ProfileClient from '@/components/portal/customer/profile-client';

export const metadata: Metadata = { title: 'My Profile — Pristine Detailers' };

export default async function ProfilePage() {
  const [profileData, vehicles] = await Promise.all([getCustomerProfile(), getVehicles()]);

  if (!profileData) {
    return (
      <div>
        <Topbar title="My Profile" subtitle="Manage your details" />
        <div style={{ padding: 32 }}>
          <p style={{ color: '#6B6B6B' }}>Could not load profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="My Profile" subtitle="Manage your personal details and vehicles" />
      <div style={{ padding: 32, maxWidth: 700 }}>
        <ProfileClient profile={profileData.profile} vehicles={vehicles} />
      </div>
    </div>
  );
}
