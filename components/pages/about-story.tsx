'use client';

import Image from 'next/image';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

const VALUES = [
  {
    title: 'Obsession',
    body: 'We don\'t clock out when the job looks good enough. We finish when it\'s genuinely flawless — because we know you\'ll notice.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <path d="M12 3C8 9 5 12 5 16a7 7 0 0 0 14 0c0-4-3-7-7-13z" />
      </svg>
    ),
  },
  {
    title: 'Precision',
    body: 'Every panel corrected, every coat measured, every product chosen deliberately. No shortcuts on paint that took years to earn.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Respect',
    body: 'We treat your car as if it\'s ours. We turn up on time, clean up completely, and leave every surface better than we found it.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const MILESTONES = [
  { year: '2019', event: 'Founded in Richmond with one van and a pressure washer.' },
  { year: '2020', event: 'First ceramic coating certification. First repeat customer base.' },
  { year: '2021', event: 'Expanded to 2 mobile units. Launched membership program.' },
  { year: '2022', event: 'PPF accreditation. Partnered with XPEL and Gtechniq.' },
  { year: '2023', event: 'Crossed 1,000 vehicles detailed. Third unit commissioned.' },
  { year: '2024', event: '4.9 Google rating locked in. 60+ suburbs serviced regularly.' },
  { year: '2025', event: 'Fourth unit launched. Introduced graphene coating tier.' },
  { year: '2026', event: 'Over 2,400 vehicles and growing. Melbourne\'s highest-rated mobile detailer.' },
];

export function AboutStory() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Our Story</Eyebrow>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginTop: 20,
              maxWidth: 900,
            }}
          >
            Built on a belief that every car deserves{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              obsessive
            </span>{' '}
            care.
          </h1>
          <p style={{ fontSize: 19, color: '#3A3A38', marginTop: 32, maxWidth: 640, lineHeight: 1.6 }}>
            Pristine Detailers started in 2019 with one van, a pressure washer, and an uncompromising standard for what &#8220;clean&#8221; really means. Six years later, we&#8217;re Melbourne&#8217;s highest-rated mobile detailing service — and nothing about how we approach a car has changed.
          </p>
        </div>
      </section>

      {/* Team photo */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              height: 480,
              background: '#0A0A0A',
            }}
          >
            <Image
              src="/images/20241203_134603.jpg"
              alt="The Pristine Detailers team"
              fill
              style={{ objectFit: 'cover', opacity: 0.85 }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                background: 'rgba(10,10,10,0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: 16,
                padding: '16px 24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                The crew · Melbourne
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500, color: '#fff', marginTop: 4 }}>
                Passionate about cars. Serious about results.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 0', background: '#0A0A0A', color: '#fff' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-four-col" style={{ gap: 40, textAlign: 'center' }}>
            {[
              { value: '2,400+', label: 'Cars detailed' },
              { value: '6 yrs', label: 'In Melbourne' },
              { value: '4', label: 'Mobile units' },
              { value: '60+', label: 'Suburbs covered' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 500, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 8, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>What drives us</Eyebrow>
          <h2
            className="pd-h-md"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, maxWidth: 600 }}
          >
            Three values. Zero compromise.
          </h2>
          <div className="pd-three-col" style={{ gap: 24, marginTop: 56 }}>
            {VALUES.map(v => (
              <div
                key={v.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E1DFD8',
                  borderRadius: 20,
                  padding: 32,
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F3E8CD', display: 'grid', placeItems: 'center', marginBottom: 24 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 500, marginBottom: 12 }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 15, color: '#3A3A38', lineHeight: 1.65 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pd-sect" style={{ background: '#EBEAE5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, marginBottom: 56 }}>
            How we got here.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1px 1fr',
                  gap: '0 28px',
                  paddingBottom: i < MILESTONES.length - 1 ? 36 : 0,
                }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: '#C89B37', paddingTop: 2 }}>
                  {m.year}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C89B37', flexShrink: 0, marginTop: 4 }} />
                  {i < MILESTONES.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: '#D8D5CE', marginTop: 8 }} />
                  )}
                </div>
                <p style={{ fontSize: 16, color: '#3A3A38', lineHeight: 1.55, paddingTop: 2 }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}>
            Ready to experience it?
          </h2>
          <p style={{ fontSize: 17, color: '#3A3A38', marginTop: 16, marginBottom: 40 }}>
            Book online in 90 seconds. Same-day slots available inside the CBD ring.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/booking"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
            >
              Book a detail <Arrow />
            </a>
            <a
              href="/about/reviews"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: 'transparent', color: '#0A0A0A', fontSize: 14, fontWeight: 500, border: '1px solid #E1DFD8', textDecoration: 'none' }}
            >
              Read reviews <Arrow />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
