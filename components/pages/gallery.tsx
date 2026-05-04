'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';
import { Placeholder } from '@/components/shared/placeholder';

const CATEGORIES = ['All', 'Ceramic', 'PPF', 'Full Detail', 'Engine Bay', 'Team'];

const ITEMS = [
  { label: 'Ceramic Coating — Classic Build', category: 'Ceramic', src: '/images/20250217_125148.jpg', h: 480 },
  { label: 'Full Detail — Red Sports Car', category: 'Full Detail', src: '/images/20250525_093249.jpg', h: 360 },
  { label: 'Engine Bay Detail', category: 'Engine Bay', src: '/images/20250321_101446.jpg', h: 320 },
  { label: 'The Pristine Team', category: 'Team', src: '/images/20241203_134603.jpg', h: 400 },
  { label: 'PPF Full Front — Satin', category: 'PPF', src: null, h: 380, tone: 'dark' },
  { label: 'Interior Detail — Alcantara', category: 'Full Detail', src: null, h: 340, tone: 'navy' },
  { label: 'Ceramic — Obsidian Black', category: 'Ceramic', src: null, h: 420, tone: 'dark' },
  { label: 'PPF — Partial Hood', category: 'PPF', src: null, h: 300, tone: 'dark' },
  { label: 'Wheel Detail', category: 'Full Detail', src: null, h: 360, tone: 'navy' },
  { label: 'Paint Correction', category: 'Ceramic', src: null, h: 340, tone: 'dark' },
  { label: 'Graphene Coating', category: 'Ceramic', src: null, h: 400, tone: 'navy' },
  { label: 'PPF — Full Vehicle', category: 'PPF', src: null, h: 360, tone: 'dark' },
];

export function Gallery() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.category === active);

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="home" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Gallery</Eyebrow>
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
            The{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              work.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 24, maxWidth: 560, lineHeight: 1.6 }}>
            Every car we touch. Ceramic coatings, PPF installs, full details, and engine bays — all documented.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#0A0A0A', padding: '24px 0' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-four-col" style={{ gap: 0, textAlign: 'center' }}>
            {[
              { value: '2,400+', label: 'Cars detailed' },
              { value: '4.9★', label: '240 reviews' },
              { value: '8yr', label: 'Max warranty' },
              { value: '6 yrs', label: 'In Melbourne' },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '8px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 500, color: '#C89B37', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter + Grid */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  border: `1.5px solid ${active === c ? '#C89B37' : '#E1DFD8'}`,
                  background: active === c ? '#C89B37' : '#fff',
                  color: active === c ? '#0A0A0A' : '#3A3A38',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="pd-gallery-columns" style={{ columnCount: 3, columnGap: 20 } as React.CSSProperties}>
            {filtered.map((item, i) => (
              <div
                key={i}
                style={{
                  breakInside: 'avoid' as React.CSSProperties['breakInside'],
                  marginBottom: 20,
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  height: item.h,
                }}
              >
                {item.src ? (
                  <Image src={item.src} alt={item.label} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <Placeholder
                    label={item.label.toUpperCase()}
                    tone={(item.tone ?? 'dark') as 'dark' | 'navy' | 'light'}
                    style={{ height: item.h }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, transparent 55%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 20,
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#C89B37', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    {item.category}
                  </span>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd-sect-sm" style={{ background: '#EBEAE5' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}>
            Want results like these?
          </h2>
          <p style={{ fontSize: 17, color: '#3A3A38', marginTop: 16, marginBottom: 40 }}>
            Book online in 90 seconds. We&apos;ll confirm your slot and technician within the hour.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
              Book a detail <Arrow />
            </a>
            <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: 'transparent', color: '#0A0A0A', fontSize: 14, fontWeight: 500, border: '1px solid #E1DFD8', textDecoration: 'none' }}>
              View services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
