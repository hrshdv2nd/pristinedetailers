'use client';

import Script from 'next/script';
import Link from 'next/link';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow } from '@/components/shared/atoms';

const BOOKING_URL = 'https://link.upscalerhq.com/booking/pristine-detailers';

const CONTACT_DETAILS = [
  {
    label: 'Phone',
    value: '0468 048 461',
    sub: 'Call or text anytime during business hours',
    href: 'tel:0468048461',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 0 0 .1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@pristinedetailers.com.au',
    sub: 'We reply within one business day',
    href: 'mailto:info@pristinedetailers.com.au',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Business Hours',
    value: 'Mon – Sun, 9am – 5pm',
    sub: 'Open every day of the week',
    href: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Service Area',
    value: 'Greater Melbourne',
    sub: '60+ suburbs — mobile window tinting available',
    href: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function Contact() {
  return (
    <div className="pd-page">
      <Nav active="contact" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div className="pd-container">
          <div className="pd-eyebrow" style={{ marginBottom: 20 }}>Contact</div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              maxWidth: 800,
            }}
          >
            Get in{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              touch.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', marginTop: 24, maxWidth: 560, lineHeight: 1.6 }}>
            Questions about a service, a quote, or your area? Reach out — we respond to every message personally.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pd-sect" style={{ paddingTop: 0 }}>
        <div className="pd-container">
          <div className="pd-two-col" style={{ gap: 64, alignItems: 'start' }}>

            {/* Left — contact details + hours */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Contact cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {CONTACT_DETAILS.map(d => {
                  const inner = (
                    <div className="pd-card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--navy-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        {d.icon}
                      </div>
                      <div>
                        <div className="pd-eyebrow" style={{ marginBottom: 4 }}>{d.label}</div>
                        <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                          {d.value}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3 }}>{d.sub}</div>
                      </div>
                      {d.href && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8C4BB" strokeWidth="2.5" style={{ marginLeft: 'auto', flexShrink: 0, marginTop: 4 }}>
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </div>
                  );
                  return d.href ? (
                    <a key={d.label} href={d.href} style={{ textDecoration: 'none' }}>{inner}</a>
                  ) : (
                    <div key={d.label}>{inner}</div>
                  );
                })}
              </div>

              {/* Hours table */}
              <div style={{ background: 'var(--ink)', borderRadius: 20, padding: 28, color: '#fff' }}>
                <div className="pd-eyebrow" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
                  Opening Hours
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {DAYS.map((day, i) => (
                    <div
                      key={day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: i < DAYS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                      }}
                    >
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>{day}</span>
                      <span style={{ fontSize: 13, color: '#C89B37' }}>9:00am – 5:00pm</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    Same-day bookings available for calls received before 10am. After-hours enquiries are responded to the following morning.
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="pd-hero-actions">
                <a href="tel:0468048461" className="pd-btn pd-btn-dark" style={{ fontSize: 14 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-2.97-8.72A2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call us
                </a>
                <a href="mailto:info@pristinedetailers.com.au" className="pd-btn pd-btn-ghost" style={{ fontSize: 14 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email us
                </a>
                <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-primary" style={{ fontSize: 14 }}>
                  Book a detail <Arrow />
                </Link>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="pd-card" style={{ padding: 40 }}>
              <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 600, marginBottom: 8 }}>
                Send us a message
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 32, lineHeight: 1.5 }}>
                Fill in the form and we&apos;ll get back to you within one business day.
              </p>

              <iframe
                src="https://link.upscalerhq.com/widget/form/vy4mvXGjBuyJHO6vMzgm"
                style={{ width: '100%', height: 961, border: 'none', borderRadius: 8 }}
                id="inline-vy4mvXGjBuyJHO6vMzgm"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact Form"
                data-height="961"
                data-layout-iframe-id="inline-vy4mvXGjBuyJHO6vMzgm"
                data-form-id="vy4mvXGjBuyJHO6vMzgm"
                title="Contact Form"
              />
              <Script src="https://link.upscalerhq.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
