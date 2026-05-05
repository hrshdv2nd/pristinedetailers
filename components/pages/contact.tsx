'use client';

import { useState } from 'react';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

const CONTACT_DETAILS = [
  {
    label: 'Phone',
    value: '0491 108 905',
    sub: 'Call or text anytime during business hours',
    href: 'tel:0491108905',
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
    sub: '60+ suburbs — we come to you',
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1.5px solid #E1DFD8',
    fontSize: 15,
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    color: '#0A0A0A',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="contact" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Contact</Eyebrow>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginTop: 20,
              maxWidth: 800,
            }}
          >
            We&apos;re a{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              call away.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 24, maxWidth: 560, lineHeight: 1.6 }}>
            Questions about a service, a quote, or your area? Reach out — we respond to every message personally.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pd-sect" style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-two-col" style={{ gap: 64, alignItems: 'start' }}>

            {/* Left — contact details + hours */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Contact cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {CONTACT_DETAILS.map(d => {
                  const inner = (
                    <div
                      style={{
                        background: '#fff',
                        border: '1px solid #E1DFD8',
                        borderRadius: 16,
                        padding: '20px 24px',
                        display: 'flex',
                        gap: 16,
                        alignItems: 'flex-start',
                        transition: 'border-color 0.15s',
                      }}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F3E8CD', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        {d.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                          {d.label}
                        </div>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 500, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
                          {d.value}
                        </div>
                        <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 3 }}>{d.sub}</div>
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
              <div style={{ background: '#0A0A0A', borderRadius: 20, padding: 28, color: '#fff' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
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
                      <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: '#C89B37' }}>9:00am – 5:00pm</span>
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
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="tel:0491108905"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, background: '#0A0A0A', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-2.97-8.72A2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call us
                </a>
                <a
                  href="mailto:info@pristinedetailers.com.au"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, background: 'transparent', color: '#0A0A0A', fontSize: 14, fontWeight: 500, border: '1.5px solid #E1DFD8', textDecoration: 'none' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email us
                </a>
                <a
                  href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, background: '#C89B37', color: '#0A0A0A', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
                >
                  Book a detail <Arrow />
                </a>
              </div>
            </div>

            {/* Right — contact form */}
            <div>
              <div style={{ background: '#fff', border: '1px solid #E1DFD8', borderRadius: 24, padding: 40 }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F3E8CD', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 500, marginBottom: 10 }}>
                      Message sent
                    </h3>
                    <p style={{ fontSize: 15, color: '#3A3A38', lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>
                      Thanks for reaching out. We&apos;ll get back to you within one business day.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      style={{ marginTop: 28, padding: '10px 20px', borderRadius: 8, background: '#F4F4F2', border: '1px solid #E1DFD8', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 600, marginBottom: 8 }}>
                      Send us a message
                    </h2>
                    <p style={{ fontSize: 14, color: '#7A7A76', marginBottom: 32, lineHeight: 1.5 }}>
                      Fill in the form and we&apos;ll get back to you within one business day.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div className="pd-two-col" style={{ gap: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7, color: '#0A0A0A' }}>Full name *</label>
                          <input
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7, color: '#0A0A0A' }}>Phone</label>
                          <input
                            type="tel"
                            placeholder="04xx xxx xxx"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7, color: '#0A0A0A' }}>Email address *</label>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          required
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7, color: '#0A0A0A' }}>Subject</label>
                        <select
                          value={form.subject}
                          onChange={e => setForm({ ...form, subject: e.target.value })}
                          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="">Select a topic…</option>
                          <option>General enquiry</option>
                          <option>Quote request</option>
                          <option>Ceramic coating</option>
                          <option>Paint Protection Film</option>
                          <option>Membership</option>
                          <option>Existing booking</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7, color: '#0A0A0A' }}>Message *</label>
                        <textarea
                          placeholder="Tell us about your car, your location, and what you're looking for…"
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          required
                          rows={5}
                          style={{ ...inputStyle, resize: 'vertical' }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          padding: '14px 28px',
                          borderRadius: 8,
                          background: loading ? '#7A7A76' : '#0A0A0A',
                          color: '#fff',
                          fontSize: 15,
                          fontWeight: 600,
                          border: 'none',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontFamily: 'inherit',
                          transition: 'background 0.15s',
                        }}
                      >
                        {loading ? 'Sending…' : (<>Send message <Arrow /></>)}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
