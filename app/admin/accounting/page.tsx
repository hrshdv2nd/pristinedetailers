import type { Metadata } from 'next';
import { getRevenueBreakdown, getPendingPayouts } from '@/actions/admin';
import Topbar from '@/components/portal/layout/topbar';
import StatCard from '@/components/portal/shared/stat-card';

export const metadata: Metadata = { title: 'Accounting — Pristine Detailers Admin' };

export default async function AccountingPage({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const sp = await searchParams;
  const period = (sp.period ?? 'month') as 'month' | 'quarter' | 'year';
  const [breakdown, payouts] = await Promise.all([getRevenueBreakdown(period), getPendingPayouts()]);

  const totalPayout = payouts.reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <Topbar title="Accounting" subtitle="Revenue & payout overview" />
      <div style={{ padding: 32 }}>
        {/* Period picker */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {(['month', 'quarter', 'year'] as const).map(p => (
            <a
              key={p}
              href={`/admin/accounting?period=${p}`}
              style={{
                padding: '7px 18px', borderRadius: 8, fontSize: 14, fontWeight: period === p ? 600 : 400, textDecoration: 'none', textTransform: 'capitalize',
                background: period === p ? '#0A0A0A' : '#fff',
                color: period === p ? '#C89B37' : '#374151',
                border: `1.5px solid ${period === p ? '#C89B37' : '#E5E0D8'}`,
              }}
            >
              {p === 'month' ? 'This Month' : p === 'quarter' ? 'Quarter' : 'Year'}
            </a>
          ))}
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatCard label="Total Revenue" value={`$${breakdown.total.toLocaleString()}`} color="gold" />
          <StatCard label="Pending Payouts" value={`$${totalPayout.toFixed(2)}`} subtext={`${payouts.length} detailers`} />
          <StatCard label="Net Revenue" value={`$${(breakdown.total - totalPayout).toFixed(2)}`} subtext="After payout" color="gold" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Revenue by service */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EDE8' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0A', margin: 0 }}>By Service</h3>
            </div>
            {breakdown.byService.length === 0 ? (
              <p style={{ padding: 20, color: '#9CA3AF', fontSize: 14 }}>No data for this period.</p>
            ) : breakdown.byService.map((s, i) => (
              <div key={s.service} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{s.service}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{s.jobs} jobs</div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#C89B37' }}>${s.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Revenue by detailer */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EDE8' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0A', margin: 0 }}>By Detailer</h3>
            </div>
            {breakdown.byDetailer.length === 0 ? (
              <p style={{ padding: 20, color: '#9CA3AF', fontSize: 14 }}>No data for this period.</p>
            ) : breakdown.byDetailer.map((d, i) => (
              <div key={d.detailer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{d.detailer}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{d.jobs} jobs</div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#C89B37' }}>${d.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payout table */}
        {payouts.length > 0 && (
          <div style={{ marginTop: 28, background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EDE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0A', margin: 0 }}>Pending Payouts</h3>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>Paid on the 21st</span>
            </div>
            {payouts.map((p, i) => (
              <div key={p.detailerId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{p.detailerName}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{p.jobsCompleted} jobs · {p.period}</div>
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#C89B37' }}>${p.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
