'use client';

import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow } from '@/components/shared/atoms';
import { currentOffer, formatExpiryDate } from '@/lib/offers';

function PromoCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function Promo() {
  const [quoteOpen, setQuoteOpen] = useState(false);

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

          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className="pd-btn pd-btn-primary"
            style={{ marginTop: 32 }}
          >
            Claim This Offer <Arrow />
          </button>
        </div>
      </section>

      {/* Photo row */}
      <section className="pd-sect-sm" style={{ paddingTop: 0 }}>
        <div className="pd-container">
          <div className="pd-three-col">
            {[
              { label: 'Tint edge trim', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/scratch-repair.jpg' },
              { label: 'Snow foam pre-wash', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20240822_100032.jpg' },
              { label: 'Tint film install', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/Car-Window-Tinting-scaled.webp' },
            ].map((photo) => (
              <div
                key={photo.label}
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#EBEAE5',
                }}
              >
                <Image src={photo.src} alt={photo.label} fill style={{ objectFit: 'cover' }} />
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

      {/* Claim offer CTA */}
      <section className="pd-sect-sm">
        <div className="pd-container" style={{ maxWidth: 640 }}>
          <div className="pd-card" style={{ padding: 40, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 600, marginBottom: 8 }}>
              Claim Your Free Window Tinting
            </h2>
            <p style={{ fontSize: 14, color: '#7A7A76', marginBottom: 24, lineHeight: 1.5 }}>
              Fill in your details and we&apos;ll be in touch to book your Ceramic Coating + free Window Tinting package.
            </p>
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="pd-btn pd-btn-primary"
            >
              Claim This Offer <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* Popup form */}
      {quoteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setQuoteOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,10,0.6)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 20,
              maxWidth: 560,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              padding: 32,
            }}
          >
            <button
              type="button"
              onClick={() => setQuoteOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: '#F4F4F2',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 600, marginBottom: 20 }}>
              Claim Your Free Window Tinting
            </h2>
            <iframe
              src="https://link.upscalerhq.com/widget/form/jmztcdFF0hA4f8P6O6uB"
              style={{ width: '100%', height: 780, border: 'none', borderRadius: 8 }}
              id="popup-jmztcdFF0hA4f8P6O6uB"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="leadCollected"
              data-deactivation-value=""
              data-form-name="Auto Detailer Form"
              data-height="780"
              data-layout-iframe-id="popup-jmztcdFF0hA4f8P6O6uB"
              data-form-id="jmztcdFF0hA4f8P6O6uB"
              title="Auto Detailer Form"
            />
            <Script src="https://link.upscalerhq.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
        </div>
      )}

      {/* Fine print */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="pd-container">
          <p style={{ fontSize: 12, color: '#7A7A76', textAlign: 'center', margin: 0 }}>
            Offer valid till {formatExpiryDate(currentOffer)}. Applies to Ceramic Coating packages only.
            Cannot be combined with other offers.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
