import type { Metadata } from 'next';
import { getReferralData } from '@/actions/membership';
import Topbar from '@/components/portal/layout/topbar';
import StatCard from '@/components/portal/shared/stat-card';

export const metadata: Metadata = { title: 'Referrals — Pristine Detailers' };

export default async function ReferralsPage() {
  const referrals = await getReferralData();

  return (
    <div>
      <Topbar title="Referral Program" subtitle="Earn rewards for every friend you refer" />
      <div style={{ padding: 32 }}>
        {/* Referral code card */}
        <div style={{ background: '#0A0A0A', borderRadius: 16, padding: 28, marginBottom: 24, color: '#fff' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C89B37', margin: '0 0 12px' }}>Your Referral Code</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'monospace', color: '#C89B37' }}>{referrals.code}</span>
            <button
              onClick={() => navigator.clipboard.writeText(referrals.code)}
              style={{ padding: '8px 16px', background: 'rgba(200,155,55,0.2)', border: '1px solid rgba(200,155,55,0.4)', borderRadius: 8, color: '#C89B37', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Copy
            </button>
          </div>
          <p style={{ fontSize: 13, color: '#9CA3AF', margin: '12px 0 0' }}>
            Every 5 conversions earns you a free detail session. You need {referrals.nextRewardIn} more to unlock your next reward.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatCard label="Total Referred" value={String(referrals.totalReferred)} />
          <StatCard label="Converted" value={String(referrals.converted)} color="gold" />
          <StatCard label="Rewards Earned" value={String(referrals.rewardsEarned)} subtext="Free detail sessions" color="gold" />
        </div>

        {/* Timeline */}
        {referrals.timeline.length > 0 && (
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginBottom: 16 }}>Referral Activity</h2>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
              {referrals.timeline.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{r.email}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500,
                      background: r.status === 'first_detail_completed' ? '#DCFCE7' : '#FEF9EC',
                      color: r.status === 'first_detail_completed' ? '#16A34A' : '#B45309',
                    }}>
                      {r.status === 'first_detail_completed' ? 'Converted' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {referrals.timeline.length === 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, textAlign: 'center', border: '1px solid #F0EDE8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎁</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', margin: '0 0 8px' }}>No referrals yet</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', margin: 0 }}>Share your code with friends and earn free detail sessions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
