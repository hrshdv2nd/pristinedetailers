'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/actions/auth';

type Role = 'customer' | 'detailer' | 'admin';

const NAV: Record<Role, { label: string; href: string; icon: string }[]> = {
  customer: [
    { label: 'Overview',   href: '/dashboard',            icon: '◈' },
    { label: 'Membership', href: '/dashboard/membership', icon: '✦' },
    { label: 'Bookings',   href: '/dashboard/bookings',   icon: '⊞' },
    { label: 'History',    href: '/dashboard/history',    icon: '⊟' },
    { label: 'Billing',    href: '/dashboard/billing',    icon: '⊛' },
    { label: 'Referrals',  href: '/dashboard/referrals',  icon: '⊕' },
  ],
  detailer: [
    { label: 'My Jobs',  href: '/detailer/jobs',     icon: '◈' },
    { label: 'Earnings', href: '/detailer/earnings', icon: '⊛' },
  ],
  admin: [
    { label: 'Dashboard',   href: '/admin',               icon: '◈' },
    { label: 'Customers',   href: '/admin/customers',     icon: '⊞' },
    { label: 'Detailers',   href: '/admin/detailers',     icon: '⊟' },
    { label: 'Calendar',    href: '/admin/calendar',      icon: '⊛' },
    { label: 'Accounting',  href: '/admin/accounting',    icon: '⊕' },
    { label: 'Reviews',     href: '/admin/reviews',       icon: '✦' },
    { label: 'Referrals',   href: '/admin/referrals',     icon: '⊗' },
    { label: 'Goals',       href: '/admin/goals',         icon: '◎' },
  ],
};

export default function Sidebar({ role, userName }: { role: Role; userName: string }) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      background: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
            Pristine<span style={{ color: '#C89B37' }}>·</span>Detailers
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {role === 'admin' ? 'Admin Portal' : role === 'detailer' ? 'Detailer Portal' : 'My Portal'}
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {NAV[role].map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 2,
                textDecoration: 'none',
                background: isActive ? 'rgba(200,155,55,0.12)' : 'transparent',
                color: isActive ? '#C89B37' : 'rgba(255,255,255,0.55)',
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 12, opacity: 0.7 }}>{item.icon}</span>
              {item.label}
              {isActive && (
                <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#C89B37' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: '16px 24px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#C89B37', display: 'grid', placeItems: 'center',
            fontSize: 13, fontWeight: 600, color: '#0A0A0A', flexShrink: 0,
          }}>
            {userName?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', lineHeight: 1.2 }}>{userName}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' }}>{role}</div>
          </div>
        </div>
        <form action={signOut}>
          <button type="submit" style={{
            width: '100%', padding: '8px 12px', borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: 'rgba(255,255,255,0.45)',
            fontSize: 12, cursor: 'pointer', textAlign: 'left',
          }}>
            Sign out →
          </button>
        </form>
      </div>
    </aside>
  );
}
