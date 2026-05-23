'use client';

import { useEffect, useState } from 'react';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';
import type { GoogleReview, ReviewsPayload } from '@/app/api/reviews/route';

const GOOGLE_REVIEWS_URL = 'https://g.page/r/Cc1b9olmTTY0EAI/review';

export function AboutReviews() {
  const [data, setData] = useState<ReviewsPayload | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then((d: ReviewsPayload) => setData(d))
      .catch(() => {});
  }, []);

  const rating = data?.rating ?? 4.9;
  const total = data?.total ?? null;
  const reviews: GoogleReview[] = data?.reviews ?? [];

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
                  {rating} stars.
                </span>
                <br />
                {total ? `${total} Melburnians.` : 'Melbourne.'}
              </h1>
              <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 480, lineHeight: 1.6 }}>
                Real reviews from Melbourne car owners, verified on Google. Read them for yourself.
              </p>
            </div>

            {/* Rating card */}
            <div style={{ background: '#fff', border: '1px solid #E1DFD8', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #E1DFD8' }}>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 72, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {rating}
                  </div>
                  <div style={{ color: '#C89B37', fontSize: 22, marginTop: 4 }}>★★★★★</div>
                  {total && (
                    <div style={{ fontSize: 13, color: '#7A7A76', marginTop: 4 }}>{total} verified reviews</div>
                  )}
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
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 999, background: '#F4F4F2', border: '1px solid #E1DFD8', fontSize: 13, fontWeight: 500, color: '#0A0A0A', textDecoration: 'none' }}
              >
                ✓ Verified on Google
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          {reviews.length > 0 ? (
            <div className="pd-three-col" style={{ gap: 20 }}>
              {reviews.map((r) => (
                <div
                  key={r.time}
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
                  {r.text && (
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, lineHeight: 1.45, letterSpacing: '-0.01em', fontWeight: 400, flex: 1 }}>
                      &#8220;{r.text}&#8221;
                    </p>
                  )}
                  <div style={{ paddingTop: 16, borderTop: '1px solid #E1DFD8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {r.profile_photo_url && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={r.profile_photo_url}
                          alt={r.author_name}
                          width={32}
                          height={32}
                          style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{r.author_name}</div>
                    </div>
                    <div style={{ fontSize: 11, color: '#7A7A76', fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.relative_time_description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback CTA when API not configured or loading */
            <div style={{ background: '#fff', border: '1px solid #E1DFD8', borderRadius: 24, padding: '64px 48px', textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <div style={{ color: '#C89B37', fontSize: 28, letterSpacing: 4, marginBottom: 20 }}>★★★★★</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
                Read our reviews on Google
              </h2>
              <p style={{ fontSize: 17, color: '#3A3A38', lineHeight: 1.6, marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
                See what Melbourne car owners are saying about Pristine Detailers — all verified, all real.
              </p>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
              >
                View on Google <Arrow />
              </a>
            </div>
          )}
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
            href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
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
