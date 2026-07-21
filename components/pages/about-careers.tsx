'use client';

import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Eyebrow } from '@/components/shared/atoms';

export function AboutCareers() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Work With Us</Eyebrow>
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
            Passionate about cars?<br />
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              We&#8217;re growing.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 580, lineHeight: 1.6 }}>
            Pristine Detailers is Melbourne&#8217;s highest-rated mobile detailing crew. We&#8217;re always looking for people who care as much as we do — about cars, craft, and the people who own them.
          </p>
        </div>
      </section>

      {/* No current openings */}
      <section className="pd-sect">
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ background: '#fff', border: '1px solid #E1DFD8', borderRadius: 20, padding: 40, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 500, marginBottom: 8 }}>
              We're looking for the right people, not just anyone. Submit a resume today!
            </div>
            <p style={{ color: '#3A3A38', fontSize: 15, lineHeight: 1.6 }}>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
