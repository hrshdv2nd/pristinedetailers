'use client';

import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

const REVIEWS = [
  {
    name: 'Marcus T.',
    car: '2024 Porsche 911 GT3',
    suburb: 'Toorak',
    rating: 5,
    date: 'March 2026',
    quote: 'The finish on my GT3 is better than the day it left Stuttgart. Water rolls off in sheets — it\'s like the car is permanently wet. Worth every dollar and then some.',
  },
  {
    name: 'Priya S.',
    car: '2023 Range Rover Sport',
    suburb: 'Hawthorn',
    rating: 5,
    date: 'February 2026',
    quote: 'Six months of school-run punishment and three Melbourne summers later, it still looks showroom. The membership has more than paid for itself. Wouldn\'t go anywhere else.',
  },
  {
    name: 'Dan K.',
    car: '2022 Tesla Model S Plaid',
    suburb: 'Kew',
    rating: 5,
    date: 'January 2026',
    quote: 'They came to my garage, set up a full dust barrier system — completely self-contained. Most professional service I\'ve had for any vehicle. The graphene coat is exceptional.',
  },
  {
    name: 'Lena B.',
    car: '2021 BMW M3 Competition',
    suburb: 'Brighton',
    rating: 5,
    date: 'December 2025',
    quote: 'The paint correction alone was worth it — scratches I\'d accepted as permanent are just gone. The ceramic on top has made washing the car almost meditative. Effortless.',
  },
  {
    name: 'James W.',
    car: '2020 Mercedes-AMG GT63',
    suburb: 'Malvern',
    rating: 5,
    date: 'November 2025',
    quote: 'PPF and ceramic combo on an AMG Obsidian Black — I was nervous handing it over. They treated it like it was their own car. The protection is invisible and the finish is stunning.',
  },
  {
    name: 'Sarah M.',
    car: '2024 Audi RS6 Avant',
    suburb: 'Camberwell',
    rating: 5,
    date: 'October 2025',
    quote: 'Pristine turned up on time, finished ahead of schedule, and left the driveway cleaner than they found it. The interior detail was surgical. Four stars would be underselling it.',
  },
  {
    name: 'Tom R.',
    car: '2019 Ferrari 488 Pista',
    suburb: 'South Yarra',
    rating: 5,
    date: 'September 2025',
    quote: 'I\'ve used detailers in London, Monaco, and Sydney. These guys are the best I\'ve found. They understand the relationship between an owner and their car. That\'s rare.',
  },
  {
    name: 'Claire N.',
    car: '2023 McLaren Artura',
    suburb: 'Doncaster',
    rating: 5,
    date: 'August 2025',
    quote: 'Full front PPF on the Artura, perfectly installed. You can\'t tell it\'s there unless you\'re looking for it, which is exactly the point. Highly recommend the full-front package.',
  },
  {
    name: 'Alex P.',
    car: '2022 Lexus LC500',
    suburb: 'Berwick',
    rating: 5,
    date: 'July 2025',
    quote: 'Booked online, got a response within the hour confirming my slot. The detailer arrived perfectly kitted out. Polished the LC to a mirror finish that Lexus themselves couldn\'t match.',
  },
];

export function AboutReviews() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-two-col pd-two-col-1-2" style={{ gap: 60, alignItems: 'center' }}>
            <div>
              <Eyebrow>Reviews</Eyebrow>
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
                <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  4.9 stars.
                </span>
                <br />
                240 Melburnians.
              </h1>
              <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 480, lineHeight: 1.6 }}>
                Verified reviews from real customers across greater Melbourne — from Berwick to Brighton, Toorak to Doncaster.
              </p>
            </div>

            {/* Rating breakdown */}
            <div style={{ background: '#fff', border: '1px solid #E1DFD8', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #E1DFD8' }}>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 72, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
                    4.9
                  </div>
                  <div style={{ color: '#C89B37', fontSize: 22, marginTop: 4 }}>★★★★★</div>
                  <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 4 }}>240 verified reviews</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[
                    { stars: 5, pct: 94 },
                    { stars: 4, pct: 5 },
                    { stars: 3, pct: 1 },
                    { stars: 2, pct: 0 },
                    { stars: 1, pct: 0 },
                  ].map(r => (
                    <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76', width: 12, textAlign: 'right' }}>{r.stars}</span>
                      <span style={{ color: '#C89B37', fontSize: 11 }}>★</span>
                      <div style={{ flex: 1, height: 6, background: '#EBEAE5', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${r.pct}%`, background: r.pct > 10 ? '#C89B37' : '#E1DFD8', borderRadius: 999 }} />
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76', width: 28 }}>{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Google', 'Facebook', 'Trustpilot'].map(p => (
                  <span
                    key={p}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 999,
                      background: '#F4F4F2',
                      border: '1px solid #E1DFD8',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#0A0A0A',
                    }}
                  >
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-three-col" style={{ gap: 20 }}>
            {REVIEWS.map(r => (
              <div
                key={r.name}
                style={{
                  background: '#fff',
                  border: '1px solid #E1DFD8',
                  borderRadius: 20,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ color: '#C89B37', fontSize: 14 }}>{'★'.repeat(r.rating)}</div>
                <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 19, lineHeight: 1.4, letterSpacing: '-0.01em', fontWeight: 400, flex: 1 }}>
                  &#8220;{r.quote}&#8221;
                </p>
                <div style={{ paddingTop: 16, borderTop: '1px solid #E1DFD8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: '#7A7A76', marginTop: 2 }}>{r.car}</div>
                      <div style={{ fontSize: 11, color: '#7A7A76', marginTop: 1, fontFamily: "'JetBrains Mono', monospace" }}>{r.suburb}</div>
                    </div>
                    <div style={{ fontSize: 11, color: '#7A7A76', fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd-sect-sm" style={{ background: '#0A0A0A', color: '#fff' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, color: '#fff' }}>
            Add your car to the list.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', marginTop: 16, marginBottom: 40 }}>
            Book online in 90 seconds. Confirmation within the hour.
          </p>
          <a
            href="/booking"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 28px', borderRadius: 6, background: '#C89B37', color: '#0A0A0A', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
          >
            Book a detail <Arrow />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
