import type { Metadata } from 'next';
import Link from 'next/link';
import { getCustomers } from '@/actions/admin';
import Topbar from '@/components/portal/layout/topbar';
import StatusBadge from '@/components/portal/shared/status-badge';

export const metadata: Metadata = { title: 'Customers — Pristine Detailers Admin' };

export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const sp = await searchParams;
  const page = parseInt(sp.page ?? '1', 10);
  const search = sp.search ?? '';
  const { customers, total } = await getCustomers(page, search);

  return (
    <div>
      <Topbar title="Customers" subtitle={`${total} total`} />
      <div style={{ padding: 32 }}>
        <form method="GET" style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by name or email…"
            style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, background: '#FAFAF8', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#C89B37', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
            Search
          </button>
          {search && <a href="/admin/customers" style={{ padding: '10px 16px', border: '1.5px solid #E5E0D8', borderRadius: 8, color: '#6B6B6B', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Clear</a>}
        </form>

        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 80px', gap: 0, padding: '12px 20px', background: '#FAFAF8', borderBottom: '1px solid #F0EDE8' }}>
            {['Name', 'Email', 'Plan', 'Status', ''].map(h => (
              <div key={h} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF' }}>{h}</div>
            ))}
          </div>
          {customers.map((c, i) => {
            const profile = c.profiles as { full_name: string; email: string; phone: string | null } | null;
            const plan = c.membership_plans as { name: string } | null;
            return (
              <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 80px', padding: '14px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none', alignItems: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{profile?.full_name ?? '—'}</div>
                <div style={{ fontSize: 13, color: '#6B6B6B' }}>{profile?.email ?? '—'}</div>
                <div style={{ fontSize: 13, color: '#374151' }}>{plan?.name ?? 'No plan'}</div>
                <StatusBadge status={c.membership_status} />
                <Link href={`/admin/customers/${c.id}`} style={{ fontSize: 13, color: '#C89B37', fontWeight: 600, textDecoration: 'none' }}>View →</Link>
              </div>
            );
          })}
          {customers.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>No customers found.</div>
          )}
        </div>

        {/* Pagination */}
        {total > 25 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {page > 1 && (
              <a href={`/admin/customers?page=${page - 1}&search=${search}`} style={{ padding: '8px 16px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, color: '#374151', textDecoration: 'none' }}>← Prev</a>
            )}
            <span style={{ padding: '8px 16px', fontSize: 14, color: '#6B6B6B' }}>Page {page} of {Math.ceil(total / 25)}</span>
            {page < Math.ceil(total / 25) && (
              <a href={`/admin/customers?page=${page + 1}&search=${search}`} style={{ padding: '8px 16px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, color: '#374151', textDecoration: 'none' }}>Next →</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
