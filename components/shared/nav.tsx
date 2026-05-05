'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Arrow } from './atoms';

// ── About subsection data ──────────────────────────────────────────────────

const ABOUT_ITEMS = [
  {
    id: 'story',
    label: 'Our Story',
    desc: 'Built in Melbourne 2019, on a belief every car deserves obsessive care.',
    href: '/about',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    id: 'reviews',
    label: 'Reviews',
    desc: '4.9 stars across 240 verified customer reviews in greater Melbourne.',
    href: '/about/reviews',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'results',
    label: 'Results',
    desc: 'Ceramic coatings, PPF wraps, and full-detail transformations — the proof.',
    href: '/about/results',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: 'careers',
    label: 'Join the Team',
    desc: "Passionate about cars? We're always growing our crew of Melbourne detailers.",
    href: '/about/careers',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: 'events',
    label: 'Events',
    desc: 'Member collection days, VIP reveals, and seasonal car showcases.',
    href: '/about/events',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

// ── Dropdown panel ─────────────────────────────────────────────────────────

function AboutPanel({
  onEnter,
  onLeave,
}: {
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="pd-about-panel"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Left: nav items */}
      <div style={{ padding: '16px 10px' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#7A7A76',
            padding: '4px 14px 12px',
          }}
        >
          About Pristine
        </div>

        {ABOUT_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="pd-about-item"
          >
            <div className="pd-about-item-icon">
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  letterSpacing: '-0.01em',
                  color: '#0A0A0A',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#7A7A76',
                  marginTop: 2,
                  lineHeight: 1.45,
                }}
              >
                {item.desc}
              </div>
            </div>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C8C4BB"
              strokeWidth="2.5"
              style={{ flexShrink: 0 }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        ))}
      </div>

      {/* Right: featured card */}
      <div className="pd-about-featured">
        {/* Decorative blob */}
        <svg
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 180,
            height: 180,
            opacity: 0.06,
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 50,5 C 80,5 95,25 90,55 C 85,85 60,95 35,90 C 10,85 5,60 10,35 C 15,15 25,5 50,5 Z"
            fill="#C89B37"
          />
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Melbourne · Since 2019
          </div>

          <div
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              color: '#fff',
              marginTop: 12,
              letterSpacing: '-0.025em',
              lineHeight: 1.18,
            }}
          >
            Melbourne's Most Trusted Detailer.
          </div>

          <div
            style={{
              height: 1,
              background: 'rgba(200,155,55,0.3)',
              margin: '20px 0',
            }}
          />

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { value: '2,400+', label: 'Cars Detailed' },
              { value: '4.9 ★', label: '240 Reviews' },
              { value: '6 yrs', label: 'In Melbourne' },
              { value: '60+', label: 'Suburbs Covered' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.45)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    textAlign: 'right',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <a
              href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 18px',
                borderRadius: 8,
                background: '#C89B37',
                color: '#0A0A0A',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Book a detail <Arrow />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Nav ───────────────────────────────────────────────────────────────

export function Nav({ active = 'home' }: { active?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const regularLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'membership', label: 'Membership', href: '/membership' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];

  const onAboutEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setAboutOpen(true);
  };

  const onAboutLeave = () => {
    hoverTimer.current = setTimeout(() => setAboutOpen(false), 130);
  };

  const handleMobileToggle = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    if (!next) {
      setAboutOpen(false);
      setAboutMobileOpen(false);
    }
  };

  return (
    <nav className="pd-nav">
      <div className="pd-nav-inner" style={{ flexWrap: 'wrap' }}>
        {/* Logo */}
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
          <Image
            src="/logo-flag.png"
            alt="Logo"
            width={34}
            height={34}
            style={{ objectFit: 'contain' }}
          />
          <span>
            Pristine
            <span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.55 }}>
              ·
            </span>
            Detailers
          </span>
        </a>

        {/* Hamburger button */}
        <button
          className="pd-nav-hamburger"
          onClick={handleMobileToggle}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Desktop + mobile nav links */}
        <div className={`pd-nav-links${mobileOpen ? ' pd-open' : ''}`}>
          {/* Regular links */}
          {regularLinks.map((l) => (
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

          {/* About — desktop hover dropdown */}
          <div
            className="pd-about-desktop"
            style={{ position: 'relative' }}
            onMouseEnter={onAboutEnter}
            onMouseLeave={onAboutLeave}
          >
            <button
              onClick={() => setAboutOpen((v) => !v)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: '14px',
                color: active === 'about' ? '#0A0A0A' : '#7A7A76',
                fontWeight: active === 'about' ? '500' : '400',
                opacity: active === 'about' ? 1 : 0.7,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              About
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                  marginTop: 1,
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {aboutOpen && (
              <AboutPanel onEnter={onAboutEnter} onLeave={onAboutLeave} />
            )}
          </div>

          {/* About — mobile accordion */}
          <div className="pd-about-mobile">
            <button
              onClick={() => setAboutMobileOpen((v) => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                fontSize: '16px',
                color: '#0A0A0A',
                fontWeight: '400',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 0',
                fontFamily: 'inherit',
              }}
            >
              About
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: aboutMobileOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {aboutMobileOpen && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  marginBottom: 8,
                  background: '#F8F7F4',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #E1DFD8',
                }}
              >
                {ABOUT_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      borderBottom: '1px solid #E1DFD8',
                      textDecoration: 'none',
                      color: '#0A0A0A',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: '#F3E8CD',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#C89B37',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div
          className={`pd-nav-actions${mobileOpen ? ' pd-open' : ''}`}
          style={{ marginLeft: 'auto' }}
        >
          <a
            href="/login"
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            My Portal
          </a>
          <a
            href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D" target="_blank" rel="noopener noreferrer"
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
