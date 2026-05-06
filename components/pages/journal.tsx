'use client';

import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  published_at: string | null;
};

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
}

const CATEGORY_COLORS: Record<string, string> = {
  'Ceramic Coating': '#F3E8CD',
  'Paint Protection Film': '#E8EDF3',
  'Membership': '#E8F3EC',
  'Detailing': '#EBEAE5',
};

export function Journal({ articles }: { articles: Article[] }) {
  const featured = articles[0];

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="home" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-two-col pd-two-col-1-2" style={{ gap: 60, alignItems: 'center' }}>
            <div>
              <Eyebrow>Blog</Eyebrow>
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
                Know your{' '}
                <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  paint.
                </span>
              </h1>
              <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 24, maxWidth: 480, lineHeight: 1.6 }}>
                Expert guides on ceramic coating, paint protection, and keeping your car in showroom condition — written by our technicians.
              </p>
            </div>

            {/* Featured article */}
            {featured && (
              <div style={{ background: '#0A0A0A', color: '#fff', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden' }}>
                <svg viewBox="0 0 100 100" style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, opacity: 0.06, pointerEvents: 'none' }}>
                  <path d="M 50,5 C 80,5 95,25 90,55 C 85,85 60,95 35,90 C 10,85 5,60 10,35 C 15,15 25,5 50,5 Z" fill="#C89B37" />
                </svg>
                <div style={{ position: 'relative' }}>
                  <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: '#C89B37', color: '#0A0A0A', fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                    Latest
                  </span>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500, lineHeight: 1.25, marginBottom: 12 }}>
                    {featured.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24 }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{featured.read_time}</span>
                    <a href={`/blog/${featured.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#C89B37', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                      Read <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-three-col" style={{ gap: 24 }}>
            {articles.map(article => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #E1DFD8',
                    borderRadius: 20,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(10,10,10,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {/* Category colour block */}
                  <div style={{ height: 6, background: CATEGORY_COLORS[article.category] ?? '#EBEAE5' }} />

                  <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span style={{ padding: '4px 10px', borderRadius: 999, background: CATEGORY_COLORS[article.category] ?? '#EBEAE5', color: '#3A3A38', fontSize: 11, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                        {article.category}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76' }}>
                        {formatDate(article.published_at)}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 500, lineHeight: 1.3, color: '#0A0A0A', marginBottom: 12 }}>
                      {article.title}
                    </h3>

                    <p style={{ fontSize: 14, color: '#3A3A38', lineHeight: 1.65, flex: 1 }}>
                      {article.excerpt}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid #E1DFD8' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76' }}>{article.read_time}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#0A0A0A', fontSize: 13, fontWeight: 500 }}>
                        Read <Arrow />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pd-sect-sm" style={{ background: '#0A0A0A', color: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Eyebrow style={{ color: 'rgba(255,255,255,0.45)' }}>Stay informed</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, color: '#fff', marginTop: 16 }}>
            New articles, monthly.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginTop: 12, marginBottom: 32 }}>
            One email per month — new guides, seasonal tips, and member exclusives. No spam.
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 8, maxWidth: 440, margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              required
              style={{ flex: 1, minWidth: 200, padding: '12px 16px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.15)', fontSize: 14, background: 'rgba(255,255,255,0.07)', color: '#fff', outline: 'none', fontFamily: 'inherit' }}
            />
            <button
              type="submit"
              style={{ padding: '12px 20px', borderRadius: 8, background: '#C89B37', color: '#0A0A0A', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}
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
