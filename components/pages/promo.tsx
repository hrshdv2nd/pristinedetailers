import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow } from '@/components/shared/atoms';
import { currentOffer } from '@/lib/offers';

function PromoCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function Promo() {
  return (
    <div className="pd-page">
      <Nav active="promo" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div className="pd-container">
          <div
            style={{
              display: 'inline-block',
              background: '#9B2226',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            {currentOffer.badge}
          </div>

          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#C89B37',
              maxWidth: 820,
              margin: 0,
            }}
          >
            {currentOffer.headline}
          </h1>

          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 24, maxWidth: 620, lineHeight: 1.6 }}>
            {currentOffer.subhead}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
            <span style={{ color: '#C89B37', fontSize: 20, letterSpacing: 2 }}>★★★★★</span>
            <span style={{ fontSize: 14, color: '#7A7A76' }}>Trusted by 30+ Melburnians since 2020</span>
          </div>

          <div style={{ marginTop: 40 }}>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#0A0A0A',
              }}
            >
              {currentOffer.price}
            </div>
            <div style={{ fontSize: 14, color: '#7A7A76', marginTop: 4 }}>{currentOffer.priceNote}</div>
          </div>

          <a
            href="#lead-form"
            className="pd-btn pd-btn-primary"
            style={{ marginTop: 32, textDecoration: 'none' }}
          >
            Claim This Offer <Arrow />
          </a>
        </div>
      </section>

      {/* Photo row */}
      <section className="pd-sect-sm" style={{ paddingTop: 0 }}>
        <div className="pd-container">
          <div className="pd-three-col">
            {[
              { label: 'Tint edge trim', file: '/images/promo-tint-trim.jpg' },
              { label: 'Machine paint polish', file: '/images/promo-machine-polish.jpg' },
              { label: 'Tint film install', file: '/images/promo-tint-install.jpg' },
            ].map((photo) => (
              <div
                key={photo.label}
                style={{
                  aspectRatio: '4 / 5',
                  borderRadius: 16,
                  border: '1px dashed #C8C4BB',
                  background: '#EBEAE5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 24,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: '#3A3A38' }}>{photo.label}</div>
                <div style={{ fontSize: 11, color: '#7A7A76', marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                  Replace with {photo.file}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="pd-sect-sm">
        <div className="pd-container">
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: 32,
            }}
          >
            What&apos;s included
          </h2>
          <div className="pd-two-col" style={{ gap: 40 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#A07A21', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                Ceramic Coating
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Hydrophobic, UV-stable nano-ceramic',
                  'Scratch and swirl resistant finish',
                  'Applied by certified technicians',
                  'Manufacturer warranty up to 8 years',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: '#3A3A38' }}>
                    <PromoCheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#A07A21', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                Window Tinting — Free with this offer
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Blocks up to 99% of UV rays',
                  'Cuts glare & cabin heat',
                  'Installed on-site, no shop visit',
                  'Choose your preferred tint level',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: '#3A3A38' }}>
                    <PromoCheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORM_SECTION */}

      {/* FINE_PRINT_SECTION */}

      <Footer />
    </div>
  );
}
