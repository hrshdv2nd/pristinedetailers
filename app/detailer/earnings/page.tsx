import type { Metadata } from 'next';
import { getMyEarnings } from '@/actions/detailer';
import Topbar from '@/components/portal/layout/topbar';
import StatCard from '@/components/portal/shared/stat-card';

export const metadata: Metadata = { title: 'My Earnings — Pristine Detailers' };

export default async function EarningsPage() {
  const earnings = await getMyEarnings();

  return (
    <div>
      <Topbar title="My Earnings" subtitle="Your performance this month" />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatCard
            label="This Month"
            value={`$${earnings.thisMonth.toFixed(2)}`}
            subtext={`${earnings.jobsCompleted} jobs completed`}
            color="gold"
          />
          <StatCard
            label="Last Month"
            value={`$${earnings.lastMonth.toFixed(2)}`}
            subtext="Previous period"
          />
          <StatCard
            label="Jobs Completed"
            value={String(earnings.jobsCompleted)}
            subtext="This month"
          />
          <StatCard
            label="Pending Payout"
            value={`$${earnings.pendingPayout.toFixed(2)}`}
            subtext="Paid on the 21st"
            color="gold"
          />
        </div>

        <div style={{ background: '#0A0A0A', borderRadius: 16, padding: 28, color: '#fff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', color: '#C89B37' }}>Payout Schedule</h3>
          <p style={{ fontSize: 14, color: '#9CA3AF', margin: 0, lineHeight: 1.6 }}>
            Payouts are processed on the 21st of each month via direct bank transfer.
            Your pending payout covers all completed jobs for this calendar month.
          </p>
        </div>
      </div>
    </div>
  );
}
