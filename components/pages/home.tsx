'use client';

import { useState } from 'react';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Placeholder } from '@/components/shared/placeholder';
import { BlobImage } from '@/components/shared/blob-image';
import { Arrow, Eyebrow, Stat } from '@/components/shared/atoms';

export function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="home" />

      <HeroSection />
      <MarqueeStrip />
      <ServicesPreview />
      <FlagshipSection />
      <MelbourneSection />
      <PPFSection />
      <MembershipTeaser />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />

      <Footer />
    </div>
  );
}

// ============ HERO ============
function HeroSection() {
  return (
    <section style={{ padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: '#EBEAE5',
                fontSize: '12px',
                fontWeight: '500',
                color: '#0A0A0A',
              }}
            >
              Melbourne · Mobile Service
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: 'transparent',
                fontSize: '12px',
                fontWeight: '500',
                color: '#0A0A0A',
                border: '1px solid #E1DFD8',
              }}
            >
              ★ 4.9 / 240 reviews
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(56px, 7.2vw, 104px)',
              fontWeight: 400,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginBottom: 32,
            }}
          >
            Where your car<br />
            meets its{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              better
            </span>
            <br />
            self.
          </h1>
          <p style={{ fontSize: 19, color: '#3A3A38', marginTop: 32, maxWidth: 520, lineHeight: 1.55 }}>
            Mobile ceramic coating, paint protection film, and obsessive-grade detailing — brought to your driveway in Melbourne. No shortcuts. No shops. No fuss.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            <a
              href="/booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '6px',
                background: '#0A0A0A',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Book a Detail <Arrow />
            </a>
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '6px',
                background: 'transparent',
                color: '#0A0A0A',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #E1DFD8',
              }}
            >
              Explore services
            </a>
          </div>
          <div style={{ display: 'flex', gap: 48, marginTop: 64, paddingTop: 32, borderTop: '1px solid #E1DFD8' }}>
            <Stat value="2,400+" label="Cars detailed" />
            <Stat value="8yr" label="Ceramic warranty" />
            <Stat value="$80/mo" label="Membership from" />
          </div>
        </div>

        <HeroComposition />
      </div>
    </section>
  );
}

function HeroComposition() {
  return (
    <div style={{ position: 'relative', height: 620 }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: 20, right: -40, width: 460, height: 460, zIndex: 0 }}>
        <path d="M 55,6 C 82,10 94,35 88,60 C 82,85 55,95 30,88 C 8,82 4,55 10,32 C 16,12 32,4 55,6 Z" fill="#C89B37" opacity="0.08" />
      </svg>

      <BlobImage variant="b" size={440} rotate={-4} style={{ position: 'absolute', top: 10, right: 0, zIndex: 2 }}>
        <Placeholder label="HERO · PORSCHE 911" tone="dark" style={{ width: '100%', height: '100%' }} />
      </BlobImage>

      <BlobImage variant="c" size={220} rotate={6} style={{ position: 'absolute', bottom: 10, left: 0, zIndex: 3 }}>
        <Placeholder label="DETAIL · PAINT BEAD" tone="navy" style={{ width: '100%', height: '100%' }} />
      </BlobImage>

      <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: 180, left: 220, width: 150, height: 150, zIndex: 1 }}>
        <path d="M 50,8 C 78,8 92,28 92,52 C 92,78 72,92 48,92 C 24,92 8,72 10,48 C 12,24 24,8 50,8 Z" fill="#0A0A0A" />
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          right: 40,
          zIndex: 4,
          background: '#fff',
          borderRadius: 16,
          padding: '14px 18px',
          border: '1px solid #E1DFD8',
          boxShadow: '0 4px 12px rgba(10,10,10,0.05), 0 12px 28px rgba(10,10,10,0.05)',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F3E8CD', display: 'grid', placeItems: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="2">
            <path d="M12 3C8 9 5 12 5 16a7 7 0 0 0 14 0c0-4-3-7-7-13z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#7A7A76', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Contact angle
          </div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>
            110°+
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MARQUEE ============
function MarqueeStrip() {
  const items = ['Porsche', 'Audi RS', 'BMW M', 'Tesla', 'Mercedes-AMG', 'Range Rover', 'Ferrari', 'McLaren', 'Lotus'];
  const row = [...items, ...items, ...items];

  return (
    <section style={{ padding: '28px 0', borderTop: '1px solid #E1DFD8', borderBottom: '1px solid #E1DFD8', background: '#EBEAE5', overflow: 'hidden' }}>
      <style>{`@keyframes pd-marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      <div style={{ display: 'flex', gap: 64, animation: 'pd-marquee 60s linear infinite', whiteSpace: 'nowrap' }}>
        {row.map((it, i) => (
          <span key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontStyle: 'italic', color: '#3A3A38', fontWeight: 400, letterSpacing: '-0.02em' }}>
            {it} <span style={{ color: '#7A7A76', marginLeft: 64 }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ============ SERVICES PREVIEW ============
function ServicesPreview() {
  const services = [
    { tag: '01', title: 'Full Detail', blurb: 'Exterior wash, decontamination, machine polish, interior deep clean.', from: '$340', blob: 'a' },
    { tag: '02', title: 'Ceramic Coating', blurb: '1, 3, or 5-year paint protection with hydrophobic gloss finish.', from: '$1,290', blob: 'b', flagship: true },
    { tag: '03', title: 'Paint Protection Film', blurb: 'Self-healing polyurethane film for stone chips and swirl defence.', from: '$2,800', blob: 'c' },
    { tag: '04', title: 'Interior Restoration', blurb: 'Leather reconditioning, stain removal, odour elimination.', from: '$280', blob: 'd' },
  ];

  return (
    <section style={{ padding: '120px 0 60px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <Eyebrow>01 · Services</Eyebrow>
            <h2 style={{ fontSize: 72, marginTop: 16, maxWidth: 780, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, letterSpacing: '-0.03em' }}>
              Four pillars of <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>obsession.</span>
            </h2>
          </div>
          <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0A0A0A', fontSize: '14px', fontWeight: '500' }}>
            All services <Arrow />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {services.map(s => (
            <a
              key={s.tag}
              href="/services"
              style={{
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                background: s.flagship ? '#0A0A0A' : '#fff',
                color: s.flagship ? '#fff' : '#0A0A0A',
                borderRadius: 16,
                border: s.flagship ? 'none' : '1px solid #E1DFD8',
                minHeight: 420,
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em', opacity: 0.5 }}>
                  {s.tag}
                </span>
                {s.flagship && (
                  <span
                    style={{
                      background: '#C89B37',
                      border: 'none',
                      color: '#0A0A0A',
                      fontWeight: 700,
                      fontSize: '10px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Flagship
                  </span>
                )}
              </div>
              <div style={{ height: 180, display: 'grid', placeItems: 'center' }}>
                <BlobImage variant={s.blob} size={160} color={s.flagship ? '#C89B37' : '#0A0A0A'}>
                  <Placeholder
                    label={s.title.toUpperCase()}
                    tone={s.flagship ? 'navy' : 'dark'}
                    style={{ width: '100%', height: '100%' }}
                  />
                </BlobImage>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontSize: 30, fontWeight: 500, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: s.flagship ? 'rgba(255,255,255,0.7)' : '#3A3A38', marginTop: 10, lineHeight: 1.5 }}>
                  {s.blurb}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: `1px solid ${s.flagship ? 'rgba(255,255,255,0.15)' : '#E1DFD8'}`,
                  }}
                >
                  <span style={{ fontSize: 13, opacity: 0.6 }}>From</span>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500 }}>
                    {s.from}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FLAGSHIP: CERAMIC COATING ============
function FlagshipSection() {
  return (
    <section style={{ padding: '120px 0', background: '#0A0A0A', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Eyebrow style={{ color: 'rgba(255,255,255,0.5)' }}>02 · Flagship</Eyebrow>
            <h2
              style={{
                fontSize: 88,
                marginTop: 16,
                color: '#fff',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              Ceramic coating.<br />
              The{' '}
              <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                last
              </span>
              <br />
              wax<br />
              you'll ever need.
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 28, maxWidth: 500, lineHeight: 1.6 }}>
              A nano-ceramic barrier fused to your paint. Hydrophobic, UV-stable, and guaranteed for up to 8 years. Applied by certified technicians in a controlled, dust-free environment at your location.
            </p>

            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { tier: '1YR', price: '$1,290', feat: '9H hardness, hydrophobic' },
                { tier: '3YR', price: '$1,890', feat: 'Enhanced gloss, 2 layers', best: true },
                { tier: '5YR', price: '$2,490', feat: 'Graphene infusion, 3 layers' },
              ].map(p => (
                <div
                  key={p.tier}
                  style={{
                    padding: 20,
                    background: p.best ? '#fff' : 'rgba(255,255,255,0.05)',
                    color: p.best ? '#0A0A0A' : '#fff',
                    borderRadius: 16,
                    border: p.best ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                  }}
                >
                  {p.best && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: 16,
                        background: '#C89B37',
                        color: '#0A0A0A',
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 999,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Most loved
                    </span>
                  )}
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.55, letterSpacing: '0.1em' }}>
                    {p.tier}
                  </div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 500, marginTop: 6, letterSpacing: '-0.02em' }}>
                    {p.price}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8, lineHeight: 1.4 }}>{p.feat}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
              <a
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  background: '#fff',
                  color: '#0A0A0A',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Learn the process <Arrow />
              </a>
              <a
                href="/booking"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  background: 'transparent',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                Get a quote
              </a>
            </div>
          </div>

          <div style={{ position: 'relative', height: 640 }}>
            <BlobImage variant="d" size={500} rotate={-6} color="#C89B37" style={{ position: 'absolute', top: 20, right: -20 }}>
              <Placeholder label="WATER · BEADING" tone="navy" style={{ width: '100%', height: '100%' }} />
            </BlobImage>
            <BlobImage variant="a" size={240} rotate={8} color="#fff" style={{ position: 'absolute', bottom: 0, left: 0 }}>
              <Placeholder label="GLOSS · REFLECTION" tone="dark" style={{ width: '100%', height: '100%' }} />
            </BlobImage>
            <div
              style={{
                position: 'absolute',
                top: 60,
                left: -20,
                zIndex: 5,
                background: '#fff',
                color: '#0A0A0A',
                borderRadius: 16,
                padding: '18px 22px',
                boxShadow: '0 24px 60px rgba(10,10,10,0.10)',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#7A7A76',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Thickness
              </div>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 36,
                  fontWeight: 500,
                  marginTop: 4,
                  letterSpacing: '-0.02em',
                }}
              >
                2.4µm
              </div>
              <div style={{ fontSize: 12, color: '#7A7A76', marginTop: 2 }}>Graphene-infused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MELBOURNE ============
function MelbourneSection() {
  const suburbs = [
    'Toorak',
    'South Yarra',
    'Brighton',
    'Hawthorn',
    'Kew',
    'Malvern',
    'Albert Park',
    'Carlton',
    'Fitzroy',
    'Richmond',
    'St Kilda',
    'Docklands',
    'Caulfield',
    'Glen Iris',
    'Camberwell',
    'Balwyn',
    'Armadale',
    'Prahran',
  ];

  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 120 }}>
            <Eyebrow>03 · Local</Eyebrow>
            <h2
              style={{
                fontSize: 72,
                marginTop: 16,
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              Servicing<br />
              <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Melbourne
              </span>
              <br />
              since 2019.
            </h2>
            <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, lineHeight: 1.6, maxWidth: 440 }}>
              Our mobile units travel across greater Melbourne, bringing studio-grade detailing to your driveway, garage, or office car park. Same-day bookings available inside the CBD ring.
            </p>

            <div style={{ marginTop: 40, display: 'flex', gap: 40 }}>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em' }}>
                  60+
                </div>
                <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 4, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Suburbs
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em' }}>
                  4
                </div>
                <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 4, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Mobile units
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em' }}>
                  24h
                </div>
                <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 4, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Typical lead time
                </div>
              </div>
            </div>

            <a
              href="/booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '6px',
                background: '#0A0A0A',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                marginTop: 40,
              }}
            >
              Check your suburb <Arrow />
            </a>
          </div>

          <div>
            <div
              style={{
                aspectRatio: '4/3',
                borderRadius: 24,
                border: '1px solid #E1DFD8',
                position: 'relative',
                overflow: 'hidden',
                background: '#EFEDE7',
              }}
            >
              <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
                <g stroke="#C9C5BB" strokeWidth="1" fill="none">
                  <path d="M 0 150 Q 200 130 400 150" />
                  <path d="M 0 180 Q 200 200 400 170" />
                  <path d="M 50 0 L 50 300" />
                  <path d="M 150 0 L 150 300" />
                  <path d="M 250 0 L 250 300" />
                  <path d="M 350 0 L 350 300" />
                  <path d="M 0 80 L 400 100" />
                  <path d="M 0 240 L 400 230" />
                </g>
                <path d="M 0 160 Q 100 140 180 170 Q 260 200 400 155" stroke="#C89B37" strokeWidth="2" fill="none" opacity="0.4" />
                {[
                  [80, 120],
                  [140, 160],
                  [200, 145],
                  [250, 130],
                  [180, 200],
                  [300, 170],
                  [220, 100],
                  [120, 200],
                  [320, 130],
                  [260, 220],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="10" fill="#C89B37" opacity="0.15" />
                    <circle cx={x} cy={y} r="4" fill="#C89B37" />
                  </g>
                ))}
                <g>
                  <circle cx="200" cy="160" r="18" fill="#0A0A0A" />
                  <circle cx="200" cy="160" r="6" fill="#fff" />
                </g>
                <text x="218" y="164" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="600">
                  HQ · RICHMOND
                </text>
                <text x="20" y="30" fontFamily="Bricolage Grotesque" fontSize="14" fill="#7A7A76" fontStyle="italic">
                  Melbourne
                </text>
              </svg>
            </div>

            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {suburbs.map(s => (
                <span
                  key={s}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: '#fff',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: '1px solid #E1DFD8',
                    color: '#0A0A0A',
                  }}
                >
                  {s}
                </span>
              ))}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: '#0A0A0A',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: 'none',
                }}
              >
                + 40 more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ PPF ============
function PPFSection() {
  return (
    <section style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ background: '#EBEAE5', borderRadius: 32, padding: '80px 60px', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div>
              <Eyebrow>04 · Protection</Eyebrow>
              <h2
                style={{
                  fontSize: 72,
                  marginTop: 16,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                }}
              >
                Paint<br />
                Protection<br />
                <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  Film.
                </span>
              </h2>
              <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 24, maxWidth: 480, lineHeight: 1.6 }}>
                Self-healing polyurethane film. Virtually invisible. Takes the hits so your paint doesn't. When PPF meets ceramic, you've built a fortress.
              </p>

              <div style={{ marginTop: 40 }}>
                {[
                  { name: 'Partial Front', parts: 'Bumper + partial hood + mirrors', price: '$2,800' },
                  { name: 'Full Front', parts: 'Bumper, full hood, fenders, mirrors, headlights', price: '$4,200' },
                  { name: 'Full Vehicle', parts: 'Every painted panel, top-to-bottom', price: '$8,900' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #E1DFD8' }}>
                    <div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 2 }}>{p.parts}</div>
                    </div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 500 }}>
                      {p.price}
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E1DFD8' }} />
              </div>
            </div>

            <div style={{ position: 'relative', height: 520 }}>
              <BlobImage variant="b" size={420} rotate={4} color="#0A0A0A" style={{ position: 'absolute', top: 0, right: 0 }}>
                <Placeholder label="PPF · APPLICATION" tone="dark" style={{ width: '100%', height: '100%' }} />
              </BlobImage>
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  zIndex: 3,
                  background: '#fff',
                  padding: 20,
                  borderRadius: 20,
                  boxShadow: '0 4px 12px rgba(10,10,10,0.05), 0 12px 28px rgba(10,10,10,0.05)',
                  maxWidth: 240,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#7A7A76',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Self-heal
                </div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 500, marginTop: 4 }}>
                  Swirls vanish in 60s
                </div>
                <div style={{ fontSize: 12, color: '#3A3A38', marginTop: 8 }}>
                  Thermo-activated elastomers reflow above 40°C.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MEMBERSHIP TEASER ============
function MembershipTeaser() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            background: '#C89B37',
            color: '#0A0A0A',
            borderRadius: 32,
            padding: '64px 60px',
            position: 'relative',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', right: -60, top: -60, width: 400, height: 400, opacity: 0.08 }}>
            <path d="M 50,5 C 80,5 95,25 90,55 C 85,85 60,95 35,90 C 10,85 5,60 10,35 C 15,15 25,5 50,5 Z" fill="#fff" />
          </svg>
          <div style={{ position: 'relative' }}>
            <Eyebrow style={{ color: 'rgba(10,10,10,0.6)' }}>Membership · $80/mo</Eyebrow>
            <h2
              style={{
                fontSize: 60,
                marginTop: 16,
                color: '#0A0A0A',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              A pristine car,<br />
              every month.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(10,10,10,0.75)', marginTop: 20, maxWidth: 480, lineHeight: 1.55 }}>
              One monthly wash-and-seal, priority booking, 15% off coatings, member-only collection days. Cancel any time.
            </p>
            <a
              href="/membership"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '6px',
                background: '#0A0A0A',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                marginTop: 32,
              }}
            >
              See plans <Arrow />
            </a>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                background: 'rgba(10,10,10,0.06)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(10,10,10,0.12)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Savings vs à la carte
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 72, fontWeight: 500, marginTop: 8, letterSpacing: '-0.03em' }}>
                $720<span style={{ fontSize: 22, opacity: 0.7 }}>/yr</span>
              </div>
              <div style={{ height: 1, background: 'rgba(10,10,10,0.15)', margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                {['12 monthly details included', 'Priority same-week booking', '15% off ceramic + PPF', 'Free headlight restoration /yr'].map(x => (
                  <div key={x} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY ============
function GallerySection() {
  const items = [
    { label: 'BMW M3 · CERAMIC', variant: 'a', h: 420, tone: 'dark' },
    { label: 'R8 · PPF FRONT', variant: 'b', h: 320, tone: 'navy' },
    { label: 'INTERIOR · RECARO', variant: 'c', h: 360, tone: 'dark' },
    { label: 'GTR · FULL DETAIL', variant: 'd', h: 380, tone: 'dark' },
    { label: '911 · GLOSS', variant: 'a', h: 300, tone: 'navy' },
    { label: 'WHEELS · FORGED', variant: 'b', h: 340, tone: 'dark' },
  ];

  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <Eyebrow>05 · Portfolio</Eyebrow>
            <h2
              style={{
                fontSize: 72,
                marginTop: 16,
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              The <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>work.</span>
            </h2>
          </div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0A0A0A', fontSize: '14px', fontWeight: '500' }}>
            View gallery <Arrow />
          </a>
        </div>

        <div style={{ columnCount: 3, columnGap: 20 } as any}>
          {items.map((item, i) => (
            <div key={i} style={{ breakInside: 'avoid' as any, marginBottom: 20 }}>
              <Placeholder label={item.label} tone={item.tone as any} style={{ height: item.h, borderRadius: 20 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============
function TestimonialsSection() {
  const reviews = [
    {
      name: 'Marcus T.',
      car: '2024 Porsche 911 GT3',
      quote: 'The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar.',
      rating: 5,
    },
    {
      name: 'Priya S.',
      car: '2023 Range Rover Sport',
      quote: 'Six months of school-run punishment and it still looks showroom. Membership has paid for itself.',
      rating: 5,
    },
    {
      name: 'Dan K.',
      car: '2022 Tesla Model S Plaid',
      quote: "They came to my garage in Toorak, set up a whole dust barrier. Most professional service I've had.",
      rating: 5,
    },
  ];

  return (
    <section style={{ padding: '80px 0', background: '#EBEAE5' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>06 · Reviews</Eyebrow>
          <h2 style={{ fontSize: 60, marginTop: 16, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, letterSpacing: '-0.03em' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>4.9 stars</span> across 240 reviews.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {reviews.map(r => (
            <div
              key={r.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                background: '#fff',
                padding: 24,
                borderRadius: 16,
                border: '1px solid #E1DFD8',
              }}
            >
              <div style={{ color: '#C89B37', fontSize: 16 }}>{'★'.repeat(r.rating)}</div>
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400 }}>
                "{r.quote}"
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 12, alignItems: 'center', paddingTop: 20, borderTop: '1px solid #E1DFD8' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: '#F3E8CD',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#C89B37',
                    fontWeight: 600,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: '#7A7A76' }}>{r.car}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FAQ ============
function FAQSection() {
  const [open, setOpen] = useState<number>(-1);
  const faqs = [
    { q: 'Do you come to my home or office?', a: 'Yes — our mobile units are fully self-contained with water, power, lighting and a dust barrier system. We only require a covered or semi-covered space roughly the size of two parking bays.' },
    { q: 'How long does a ceramic coating take?', a: 'A full ceramic application (including paint correction) is typically 1–3 days depending on the condition of the vehicle. We\'ll give you an exact timeline after our free paint inspection.' },
    { q: 'Is my ceramic coating warrantied?', a: 'All ceramic coatings come with a manufacturer-backed warranty of 1, 3, 5, or 8 years depending on tier. We also provide an annual inspection to keep the warranty valid.' },
    { q: 'Can I combine PPF and ceramic coating?', a: 'Absolutely — and we recommend it for maximum protection. PPF goes on first (physical barrier), ceramic on top (hydrophobic finish + self-heal enhancement).' },
    { q: 'What does the membership include?', a: '$80/month gets you one monthly wash-and-seal detail, priority same-week booking, 15% off ceramic and PPF services, one free headlight restoration per year, and member-only collection days.' },
  ];

  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>07 · FAQ</Eyebrow>
          <h2 style={{ fontSize: 60, marginTop: 16, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, letterSpacing: '-0.03em' }}>
            Questions, answered.
          </h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderTop: '1px solid #E1DFD8', ...(i === faqs.length - 1 ? { borderBottom: '1px solid #E1DFD8' } : {}) }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: '100%',
                padding: '24px 0',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              {f.q}
              <span style={{ fontSize: 24, color: '#7A7A76', transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                +
              </span>
            </button>
            {open === i && (
              <div style={{ paddingBottom: 24, fontSize: 16, color: '#3A3A38', lineHeight: 1.6, maxWidth: 720 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ CTA ============
function CTASection() {
  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            background: '#0A0A0A',
            color: '#fff',
            borderRadius: 32,
            padding: '100px 60px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Eyebrow style={{ color: 'rgba(255,255,255,0.5)' }}>Ready when you are</Eyebrow>
          <h2
            style={{
              fontSize: 96,
              marginTop: 24,
              color: '#fff',
              maxWidth: 900,
              margin: '24px auto 0',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            Let's make it{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              pristine.
            </span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', marginTop: 24, maxWidth: 520, margin: '24px auto 0' }}>
            Book in 90 seconds. We'll confirm your time slot and assigned technician within the hour.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a
              href="/booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '6px',
                background: '#fff',
                color: '#0A0A0A',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Book a detail <Arrow />
            </a>
            <a
              href="/membership"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '6px',
                background: 'transparent',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              Start membership
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
