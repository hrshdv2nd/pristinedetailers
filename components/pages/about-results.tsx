'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';
import { Placeholder } from '@/components/shared/placeholder';

const CATEGORIES = ['All', 'Ceramic', 'PPF', 'Full Detail', 'Engine Bay'];

const RESULTS = [
  {
    label: 'Ceramic Coating — Classic Build',
    service: 'Ceramic',
    src: '/images/20250217_125148.jpg',
    h: 420,
    desc: '5-year graphene-infused ceramic coating on a classic build. Mirror-finish gloss locked in for years.',
  },
  {
    label: 'Full Detail — Red Sports',
    service: 'Full Detail',
    src: '/images/20250525_093249.jpg',
    h: 340,
    desc: 'Full exterior wash, clay bar, paint correction, and sealant. Taken from dull to showroom in a single session.',
  },
  {
    label: 'Engine Bay Detail',
    service: 'Engine Bay',
    src: '/images/20250321_101446.jpg',
    h: 320,
    desc: 'Full engine bay degreasing, detailing, and dressing. Every sensor cover cleaned to OEM spec.',
  },
  {
    label: 'PPF Full Front — Satin',
    service: 'PPF',
    src: undefined,
    h: 380,
    desc: 'Invisible self-healing PPF across the full front end. Zero orange-peel, zero edge lift.',
    tone: 'dark',
  },
  {
    label: 'Interior Detail — Alcantara',
    service: 'Full Detail',
    src: undefined,
    h: 300,
    desc: 'Deep interior clean including Alcantara steering wheel, leather treatment, and headliner steam.',
    tone: 'navy',
  },
  {
    label: 'Ceramic — Obsidian Black',
    service: 'Ceramic',
    src: undefined,
    h: 360,
    desc: 'Two-stage paint correction followed by a 3-year ceramic coating on Obsidian Black metallic.',
    tone: 'dark',
  },
];

export function AboutResults() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? RESULTS : RESULTS.filter(r => r.service === active);

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Results</Eyebrow>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginTop: 20,
              maxWidth: 820,
            }}
          >
            The{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              proof
            </span>{' '}
            is in the finish.
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 580, lineHeight: 1.6 }}>
            Ceramic coatings, PPF installs, and full-detail transformations — real cars, real results.
          </p>

          <div style={{ display: 'flex', gap: 36, marginTop: 56, paddingTop: 40, borderTop: '1px solid #E1DFD8', flexWrap: 'wrap' }}>
            {[
              { value: '2,400+', label: 'Vehicles completed' },
              { value: '100%', label: 'Satisfaction guarantee' },
              { value: '8yr', label: 'Max coating warranty' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 4, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          {/* Category filter */}
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
                style={{ breakInside: 'avoid' as React.CSSProperties['breakInside'], marginBottom: 20, position: 'relative', borderRadius: 20, overflow: 'hidden', height: item.h }}
              >
                {item.src ? (
                  <Image src={item.src} alt={item.label} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <Placeholder label={item.label.toUpperCase()} tone={(item.tone ?? 'dark') as 'dark' | 'navy' | 'light'} style={{ height: item.h }} />
                )}
                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 20,
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#C89B37', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    {item.service}
                  </span>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>
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
            Your car. Our best work.
          </h2>
          <p style={{ fontSize: 17, color: '#3A3A38', marginTop: 16, marginBottom: 40 }}>
            Book a free consultation and we&#8217;ll recommend the right service for your paint.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/booking"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
            >
              Get a quote <Arrow />
            </a>
            <a
              href="/services"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: 'transparent', color: '#0A0A0A', fontSize: 14, fontWeight: 500, border: '1px solid #E1DFD8', textDecoration: 'none' }}
            >
              View services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
