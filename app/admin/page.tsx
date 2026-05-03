import type { Metadata } from 'next';
import { getAdminKPIs, getPendingPayouts } from '@/actions/admin';
import Topbar from '@/components/portal/layout/topbar';
import StatCard from '@/components/portal/shared/stat-card';

export const metadata: Metadata = { title: 'Admin Dashboard — Pristine Detailers' };

export default async function AdminPage() {
  const [kpis, payouts] = await Promise.all([getAdminKPIs(), getPendingPayouts()]);

  return (
    <div>
      <Topbar title="Dashboard" subtitle="Business overview" />
      <div style={{ padding: 32 }}>
        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatCard label="Active Memberships" value={String(kpis.activeMemberships)} subtext={`+${kpis.newMembershipsThisMonth} this month`} color="gold" />
          <StatCard label="MRR" value={`$${kpis.mrr.toLocaleString()}`} subtext="Monthly recurring revenue" color="gold" />
          <StatCard label="Jobs Completed" value={String(kpis.jobsCompleted)} subtext="This month" />
          <StatCard label="Bookings" value={String(kpis.bookingsThisMonth)} subtext="This month" />
          <StatCard label="Avg Order Value" value={`$${kpis.avgOrderValue}`} />
          <StatCard label="Failed Payments" value={String(kpis.failedPayments)} subtext="This month" color={kpis.failedPayments > 0 ? 'default' : 'default'} />
          <StatCard label="New Members" value={String(kpis.newMembershipsThisMonth)} subtext="This month" />
          <StatCard label="Churned" value={String(kpis.churnedThisMonth)} subtext="This month" />
        </div>

        {/* Pending Payouts */}
        {payouts.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginBottom: 16 }}>Pending Payouts</h2>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
              {payouts.map((p, i) => (
                <div key={p.detailerId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>{p.detailerName}</div>
                    <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>{p.jobsCompleted} jobs · {p.period}</div>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#C89B37' }}>${p.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { href: '/admin/customers', label: 'Manage Customers', icon: '👥' },
            { href: '/admin/accounting', label: 'Accounting', icon: '📊' },
            { href: '/admin/customers', label: 'Revenue Breakdown', icon: '💰' },
          ].map(item => (
            <a key={item.href} href={item.href} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #F0EDE8', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{item.label}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
