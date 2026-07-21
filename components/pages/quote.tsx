'use client';

import Script from 'next/script';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';

export function Quote() {
  return (
    <div className="pd-page">
      <Nav active="quote" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div className="pd-container">
          <div className="pd-eyebrow" style={{ marginBottom: 20 }}>Quote</div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              maxWidth: 800,
            }}
          >
            Get a{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              free quote.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', marginTop: 24, maxWidth: 560, lineHeight: 1.6 }}>
            Tell us about your car and what you&apos;re after — we&apos;ll get back to you with pricing within one business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pd-sect" style={{ paddingTop: 0 }}>
        <div className="pd-container" style={{ maxWidth: 760 }}>
          <div className="pd-card" style={{ padding: 40 }}>
            <iframe
              src="https://link.upscalerhq.com/widget/form/jmztcdFF0hA4f8P6O6uB"
              style={{ width: '100%', height: 846, border: 'none', borderRadius: 8 }}
              id="inline-jmztcdFF0hA4f8P6O6uB"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Auto Detailer Form"
              data-height="846"
              data-layout-iframe-id="inline-jmztcdFF0hA4f8P6O6uB"
              data-form-id="jmztcdFF0hA4f8P6O6uB"
              title="Auto Detailer Form"
            />
            <Script src="https://link.upscalerhq.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
