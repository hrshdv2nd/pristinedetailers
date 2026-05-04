'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Arrow } from './atoms';

export function Nav({ active = 'home' }: { active?: string }) {
  const [open, setOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'membership', label: 'Membership', href: '/membership' },
    { id: 'booking', label: 'Book', href: '/booking' },
    { id: 'about', label: 'About', href: '#' },
  ];

  return (
    <nav className="pd-nav">
      <div className="pd-nav-inner" style={{ flexWrap: 'wrap' }}>
        <a
          href="/"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: '600',
            fontSize: '22px',
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Image src="/logo-flag.png" alt="Logo" width={34} height={34} style={{ objectFit: 'contain' }} />
          <span>
            Pristine<span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.55 }}>·</span>Detailers
          </span>
        </a>

        <button
          className="pd-nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <div className={`pd-nav-links${open ? ' pd-open' : ''}`}>
          {links.map(l => (
            <a
              key={l.id}
              href={l.href}
              style={{
                fontSize: '14px',
                color: active === l.id ? '#0A0A0A' : '#7A7A76',
                fontWeight: active === l.id ? '500' : '400',
                opacity: active === l.id ? 1 : 0.7,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className={`pd-nav-actions${open ? ' pd-open' : ''}`} style={{ marginLeft: 'auto' }}>
          <a
            href="/portal-customer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              background: '#EBEAE5',
              fontSize: '14px',
              fontWeight: '500',
              color: '#0A0A0A',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            My Portal
          </a>
          <a
            href="/booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              background: '#0A0A0A',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Book Now
            <Arrow />
          </a>
        </div>
      </div>
    </nav>
  );
}
