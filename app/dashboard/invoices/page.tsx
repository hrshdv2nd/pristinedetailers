import type { Metadata } from 'next';
import { getCustomerXeroInvoices } from '@/actions/profile';
import Topbar from '@/components/portal/layout/topbar';

export const metadata: Metadata = { title: 'Invoices — Pristine Detailers' };

const STATUS_COLOR: Record<string, { text: string; bg: string }> = {
  PAID:       { text: '#16A34A', bg: '#F0FDF4' },
  AUTHORISED: { text: '#D97706', bg: '#FFFBEB' },
  DRAFT:      { text: '#6B6B6B', bg: '#F5F5F5' },
  VOIDED:     { text: '#9CA3AF', bg: '#F5F5F5' },
};

function fmt(dateStr: string) {
  if (!dateStr) return '—';
  const match = dateStr.match(/\/Date\((\d+)/);
  const d = match ? new Date(parseInt(match[1])) : new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function InvoicesPage() {
  let invoices: Awaited<ReturnType<typeof getCustomerXeroInvoices>> = [];
  let fetchError = false;

  try {
    invoices = await getCustomerXeroInvoices();
  } catch {
    fetchError = true;
  }

  return (
    <div>
      <Topbar title="Invoices" subtitle="Your invoices from Pristine Detailers" />
      <div style={{ padding: 32, maxWidth: 800 }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>

          {fetchError ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#DC2626' }}>Could not load invoices. Please try again later.</p>
            </div>
          ) : invoices.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🧾</div>
              <p style={{ fontSize: 14, color: '#9CA3AF', margin: 0 }}>No invoices yet.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F0EDE8' }}>
                  {['Invoice #', 'Date', 'Due', 'Total', 'Balance Due', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => {
                  const colors = STATUS_COLOR[inv.Status] ?? { text: '#6B6B6B', bg: '#F5F5F5' };
                  return (
                    <tr key={inv.InvoiceID} style={{ borderBottom: i < invoices.length - 1 ? '1px solid #F0EDE8' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>
                        {inv.InvoiceNumber || '—'}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: '#6B6B6B' }}>{fmt(inv.Date)}</td>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: '#6B6B6B' }}>{fmt(inv.DueDate)}</td>
                      <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>
                        {new Intl.NumberFormat('en-AU', { style: 'currency', currency: inv.CurrencyCode || 'AUD' }).format(inv.Total)}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: inv.AmountDue > 0 ? '#DC2626' : '#16A34A', fontWeight: 500 }}>
                        {new Intl.NumberFormat('en-AU', { style: 'currency', currency: inv.CurrencyCode || 'AUD' }).format(inv.AmountDue)}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: colors.text, background: colors.bg, padding: '3px 8px', borderRadius: 4 }}>
                          {inv.Status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
