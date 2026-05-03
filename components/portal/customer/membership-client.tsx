'use client';

import { useState } from 'react';
import type { Customer, MembershipPlan, Payment } from '@/lib/types/database';
import { startMembershipCheckout, openBillingPortal } from '@/actions/membership';
import Topbar from '@/components/portal/layout/topbar';
import StatusBadge from '@/components/portal/shared/status-badge';

interface Props {
  membership: { customer: Customer; plan: MembershipPlan | null } | null;
  payments: Payment[];
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MembershipClient({ membership, payments }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const customer = membership?.customer;
  const plan = membership?.plan;
  const isActive = customer?.membership_status === 'active';

  async function handleCheckout(planId: string) {
    setLoading(planId);
    const result = await startMembershipCheckout(planId);
    if (result.url) window.location.href = result.url;
    setLoading(null);
  }

  async function handlePortal() {
    setLoading('portal');
    const result = await openBillingPortal();
    if (result.url) window.location.href = result.url;
    setLoading(null);
  }

  return (
    <div>
      <Topbar
        title="My Membership"
        action={isActive ? (
          <button
            onClick={handlePortal}
            disabled={loading === 'portal'}
            style={{ padding: '9px 18px', background: '#fff', border: '1.5px solid #C89B37', color: '#C89B37', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
          >
            Manage Billing
          </button>
        ) : undefined}
      />
      <div style={{ padding: 32 }}>
        {isActive && plan ? (
          <div style={{ background: '#0A0A0A', borderRadius: 16, padding: 28, color: '#fff', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(200,155,55,0.15) 0%, transparent 70%)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C89B37', marginBottom: 8 }}>Active Plan</p>
                <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>{plan.name}</h2>
                <p style={{ fontSize: 24, fontWeight: 300, margin: '0 0 20px', color: '#C89B37' }}>${plan.price_monthly}<span style={{ fontSize: 14, fontWeight: 400, color: '#9CA3AF' }}>/mo</span></p>
                {customer?.membership_renews_at && (
                  <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0 }}>Renews {fmt(customer.membership_renews_at)}</p>
                )}
              </div>
              <StatusBadge status={customer?.membership_status ?? 'none'} />
            </div>
            {plan.benefits && plan.benefits.length > 0 && (
              <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {plan.benefits.map((b, i) => (
                  <span key={i} style={{ background: 'rgba(200,155,55,0.15)', border: '1px solid rgba(200,155,55,0.3)', borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#C89B37' }}>{b.label}</span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #F0EDE8', marginBottom: 32, textAlign: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0A0A0A', margin: '0 0 8px' }}>No Active Membership</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 20px' }}>Choose a plan to start booking premium details.</p>
            <a href="/membership" style={{ display: 'inline-block', padding: '10px 24px', background: '#C89B37', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
              View Plans
            </a>
          </div>
        )}

        {payments.length > 0 && (
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginBottom: 16 }}>Payment History</h2>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
              {payments.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', textTransform: 'capitalize' }}>{p.payment_type.replace('_', ' ')}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{fmt(p.created_at)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <StatusBadge status={p.status} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>${(p.amount / 100).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
