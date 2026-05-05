'use client';

import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

const UPCOMING = [
  {
    date: 'Sat 7 Jun 2026',
    title: 'Member Collection Day',
    subtitle: 'Monthly · Members only',
    location: 'Richmond, Melbourne',
    desc: 'Bring your car in, meet the crew, and spend a Saturday morning watching your paint get perfected. Coffee, conversation, and seriously clean cars.',
    memberOnly: true,
    spots: 12,
  },
  {
    date: 'Sat 21 Jun 2026',
    title: 'Cars & Coffee — Toorak',
    subtitle: 'Public · Free entry',
    location: 'Como Park, South Yarra',
    desc: 'Our quarterly public showcase. Open to all car enthusiasts — bring your pride and joy or just come to look. Hosted with local marque clubs.',
    memberOnly: false,
    spots: null,
  },
  {
    date: 'Sat 5 Jul 2026',
    title: 'Member Collection Day',
    subtitle: 'Monthly · Members only',
    location: 'Richmond, Melbourne',
    desc: 'First Saturday of every month. Priority booking for member cars, complimentary tyre dressing, and access to our product demo area.',
    memberOnly: true,
    spots: 12,
  },
  {
    date: 'Sun 20 Jul 2026',
    title: 'Ceramic & PPF Masterclass',
    subtitle: 'Workshop · Limited seats',
    location: 'Pristine HQ · Richmond',
    desc: 'A 4-hour deep-dive into paint science, ceramic chemistry, and PPF installation technique. Hosted by our senior technicians. Includes product kit.',
    memberOnly: false,
    spots: 8,
  },
  {
    date: 'Sat 2 Aug 2026',
    title: 'Member Collection Day',
    subtitle: 'Monthly · Members only',
    location: 'Richmond, Melbourne',
    desc: 'Monthly member slot. Same-day service, member pricing, and first access to our new graphene coating tier launching this month.',
    memberOnly: true,
    spots: 12,
  },
];

const PAST = [
  {
    date: 'Apr 2026',
    title: 'Autumn Showcase — Brighton',
    highlight: '48 cars, 300+ attendees',
  },
  {
    date: 'Mar 2026',
    title: 'Porsche Club Collaboration',
    highlight: '20 club members detailed',
  },
  {
    date: 'Feb 2026',
    title: 'Valentine\'s Detail Giveaway',
    highlight: '5 members won a free detail',
  },
  {
    date: 'Dec 2025',
    title: 'Year-End VIP Member Night',
    highlight: 'Exclusive Doncaster venue',
  },
];

export function AboutEvents() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-two-col pd-two-col-1-2" style={{ gap: 60, alignItems: 'center' }}>
            <div>
              <Eyebrow>Events</Eyebrow>
              <h1
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  fontWeight: 600,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  marginTop: 20,
                }}
              >
                Where great cars{' '}
                <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  gather.
                </span>
              </h1>
              <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 480, lineHeight: 1.6 }}>
                Monthly member collection days, quarterly public showcases, and occasional workshops — for anyone who takes their car seriously.
              </p>
            </div>

            {/* Membership callout */}
            <div
              style={{
                background: '#0A0A0A',
                color: '#fff',
                borderRadius: 24,
                padding: 32,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, opacity: 0.06, pointerEvents: 'none' }}>
                <path d="M 50,5 C 80,5 95,25 90,55 C 85,85 60,95 35,90 C 10,85 5,60 10,35 C 15,15 25,5 50,5 Z" fill="#C89B37" />
              </svg>
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#C89B37', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                  Members get priority
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 500, marginBottom: 12, lineHeight: 1.2 }}>
                  Monthly collection days are member-exclusive.
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 24 }}>
                  Starting at $80/month, membership gets you first access to every collection day slot, plus priority booking and 15% off coatings.
                </p>
                <a
                  href="/membership"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 6, background: '#C89B37', color: '#0A0A0A', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                >
                  See membership plans <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Upcoming</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, marginBottom: 48 }}>
            What&#8217;s on.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {UPCOMING.map((ev, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid #E1DFD8',
                  borderRadius: 20,
                  padding: '28px 32px',
                }}
              >
                <div className="pd-two-col" style={{ gap: 40, alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                    {/* Date block */}
                    <div
                      style={{
                        background: '#F3E8CD',
                        border: '1px solid #C89B37',
                        borderRadius: 14,
                        padding: '12px 16px',
                        textAlign: 'center',
                        minWidth: 64,
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A07A21', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {ev.date.split(' ')[1]}
                      </div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 600, lineHeight: 1, color: '#0A0A0A', marginTop: 2 }}>
                        {ev.date.split(' ')[0].replace('Sat', '').replace('Sun', '').trim() || ev.date.split(' ')[1]}
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 999, background: ev.memberOnly ? '#0A0A0A' : '#EBEAE5', color: ev.memberOnly ? '#fff' : '#3A3A38', fontSize: 11, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                          {ev.subtitle}
                        </span>
                        {ev.spots && (
                          <span style={{ padding: '3px 10px', borderRadius: 999, background: '#FEF3C7', color: '#92400E', fontSize: 11, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                            {ev.spots} spots
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500, marginBottom: 6 }}>
                        {ev.title}
                      </h3>
                      <div style={{ fontSize: 12, color: '#7A7A76', fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>
                        📍 {ev.location}
                      </div>
                      <p style={{ fontSize: 14, color: '#3A3A38', lineHeight: 1.6 }}>{ev.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {ev.memberOnly ? (
                      <a
                        href="/membership"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 6, background: '#C89B37', color: '#0A0A0A', fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
                      >
                        Join to attend <Arrow />
                      </a>
                    ) : (
                      <a
                        href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 13, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
                      >
                        Register interest <Arrow />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past events */}
      <section className="pd-sect-sm" style={{ background: '#EBEAE5' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Past events</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, marginBottom: 40 }}>
            What we&#8217;ve run.
          </h2>
          <div className="pd-four-col" style={{ gap: 16 }}>
            {PAST.map(ev => (
              <div
                key={ev.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E1DFD8',
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76', marginBottom: 8 }}>
                  {ev.date}
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
                  {ev.title}
                </h3>
                <div style={{ fontSize: 12, color: '#C89B37', fontWeight: 500 }}>
                  {ev.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pd-sect">
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Eyebrow>Stay in the loop</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16 }}>
            Never miss an event.
          </h2>
          <p style={{ fontSize: 16, color: '#3A3A38', marginTop: 16, marginBottom: 32 }}>
            We send one update per month — upcoming events, new services, and member exclusives. No spam.
          </p>
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', gap: 8, maxWidth: 440, margin: '0 auto', flexWrap: 'wrap' }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                minWidth: 200,
                padding: '12px 16px',
                borderRadius: 8,
                border: '1.5px solid #E1DFD8',
                fontSize: 14,
                background: '#fff',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 20px',
                borderRadius: 8,
                background: '#0A0A0A',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Subscribe <Arrow />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
