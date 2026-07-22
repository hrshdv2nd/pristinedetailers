'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        color: '#fff',
        padding: '80px 0 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        <div className="pd-footer-grid" style={{ marginBottom: '60px' }}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: '600',
                fontSize: '22px',
                marginBottom: '20px',
              }}
            >
              <Image src="/logo-flag.png" alt="Logo" width={34} height={34} />
              <span>Pristine Detailers</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', maxWidth: '340px', lineHeight: 1.6, marginBottom: '28px' }}>
              Melbourne's premium mobile detailing service. Ceramic coating, paint protection film, and membership care.
            </p>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                color: '#fff',
              }}
            >
              ★ 4.9
            </div>
          </div>

          {[
            {
              title: 'Services',
              links: [
                { label: 'Full Detail', href: '/services' },
                { label: 'Ceramic Coating', href: '/services' },
                { label: 'Paint Protection Film', href: '/services' },
                { label: 'Interior Care', href: '/services' },
                { label: 'Add-ons', href: '/services' },
              ],
            },
            {
              title: 'Membership',
              links: [
                { label: 'Plans', href: '/membership' },
                { label: 'Member Perks', href: '/membership' },
                { label: 'Savings Calculator', href: '/membership' },
                { label: 'Priority Booking', href: '/booking' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'Reviews', href: '/about/reviews' },
                { label: 'Melbourne Service Area', href: '/' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Blog', href: '/blog' },
                { label: 'Refer A Mate', href: '/about/refer-a-mate' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ],
            },
            {
              title: 'Portals',
              links: [
                { label: 'Customer', href: '/dashboard' },
                { label: 'Detailer', href: '/detailer/jobs' },
                { label: 'Admin', href: '/admin' },
              ],
            },
          ].map((section, i) => (
            <div key={i}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>{section.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.links.map((link, j) => (
                  <Link
                    key={j}
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pd-footer-bottom">
          <span>© 2026 Pristine Detailers · Melbourne, Australia · ABN 00 000 000 000</span>
          <span style={{ fontFamily: "'Inter Tight', sans-serif" }}>0468 048 461 · hello@pristinedetailers.com.au</span>
        </div>
      </div>
    </footer>
  );
}
