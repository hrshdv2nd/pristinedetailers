'use client';

import { useState, useTransition } from 'react';
import { openBillingPortal } from '@/actions/membership';
import type { Payment } from '@/lib/types/database';

const STATUS_COLOR: Record<string, string> = {
  succeeded: '#16A34A',
  pending:   '#D97706',
  failed:    '#DC2626',
  refunded:  '#6B6B6B',
};

const TYPE_LABEL: Record<string, string> = {
  one_time:     'One-time',
  subscription: 'Membership',
  refund:       'Refund',
};

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtAmount(amount: number, currency: string) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: currency.toUpperCase() }).format(amount);
}

export default function BillingClient({ payments }: { payments: Payment[] }) {
  const [isPending, startTransition] = useTransition();

  function handleManagePaymentMethod() {
    startTransition(async () => {
      const res = await openBillingPortal();
      if (res.url) window.location.href = res.url;
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 700 }}>

      {/* Payment method management */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A', marginBottom: 4 }}>Payment Method</div>
          <div style={{ fontSize: 13, color: '#6B6B6B' }}>Manage your saved cards via the Stripe billing portal</div>
        </div>
        <button
          onClick={handleManagePaymentMethod}
          disabled={isPending}
          style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#C89B37', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          {isPending ? 'Opening…' : 'Manage →'}
        </button>
      </div>

      {/* Payment history */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0EDE8' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0A0A0A', margin: 0 }}>Payment History</h2>
        </div>

        {payments.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#9CA3AF', margin: 0 }}>No payments yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F0EDE8' }}>
                {['Date', 'Type', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < payments.length - 1 ? '1px solid #F0EDE8' : 'none' }}>
                  <td style={{ padding: '14px 24px', fontSize: 14, color: '#0A0A0A' }}>{fmt(p.created_at)}</td>
                  <td style={{ padding: '14px 24px', fontSize: 14, color: '#6B6B6B' }}>{TYPE_LABEL[p.payment_type] ?? p.payment_type}</td>
                  <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>
                    {p.payment_type === 'refund' ? `−${fmtAmount(p.amount, p.currency)}` : fmtAmount(p.amount, p.currency)}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: STATUS_COLOR[p.status] ?? '#6B6B6B', background: `${STATUS_COLOR[p.status]}18`, padding: '3px 8px', borderRadius: 4 }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
