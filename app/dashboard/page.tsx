import { getMembershipStatus } from '@/actions/membership';
import { getUpcomingBookings } from '@/actions/bookings';
import Topbar from '@/components/portal/layout/topbar';
import StatCard from '@/components/portal/shared/stat-card';
import StatusBadge from '@/components/portal/shared/status-badge';

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default async function DashboardPage() {
  const [membership, bookings] = await Promise.all([getMembershipStatus(), getUpcomingBookings()]);
  const next = bookings[0];

  return (
    <div>
      <Topbar title="My Dashboard" subtitle={`Welcome back${membership?.customer ? '' : ''}`} />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatCard
            label="Membership"
            value={membership?.plan?.name ?? 'None'}
            subtext={membership?.customer.membership_status === 'active' ? 'Active' : 'Inactive'}
            color={membership?.customer.membership_status === 'active' ? 'gold' : 'default'}
          />
          <StatCard
            label="Upcoming Bookings"
            value={String(bookings.length)}
            subtext={next ? `Next: ${fmt(next.scheduled_start)}` : 'None scheduled'}
          />
          <StatCard
            label="Total Visits"
            value={String(membership?.customer.lifetime_visits ?? 0)}
            subtext="All time"
          />
        </div>

        {bookings.length > 0 && (
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginBottom: 16 }}>Upcoming Appointments</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bookings.map(b => (
                <div key={b.id} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: '1px solid #F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>
                      {(b.services as { name: string } | null)?.name ?? 'Service'}
                    </div>
                    <div style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4 }}>{fmt(b.scheduled_start)}</div>
                    {b.vehicles && (
                      <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>
                        {(b.vehicles as { year?: number; make: string; model: string }).year} {(b.vehicles as { make: string; model: string }).make} {(b.vehicles as { model: string }).model}
                      </div>
                    )}
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {bookings.length === 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, textAlign: 'center', border: '1px solid #F0EDE8' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🚗</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0A0A0A', margin: '0 0 8px' }}>No upcoming bookings</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 24px' }}>Book your next detail session and keep your car looking pristine.</p>
            <a href="/dashboard/bookings" style={{ display: 'inline-block', padding: '10px 24px', background: '#C89B37', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
              Book Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
