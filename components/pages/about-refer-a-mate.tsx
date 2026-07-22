'use client';

import Script from 'next/script';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Eyebrow } from '@/components/shared/atoms';

export function AboutReferAMate() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Refer A Mate</Eyebrow>
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
            $50 referral voucher,<br />
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              across the board.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 580, lineHeight: 1.6 }}>
            Know someone who&#8217;d love a Pristine detail? Refer them below and you&#8217;ll both be looked after.
          </p>
        </div>
      </section>

      {/* Referral form */}
      <section className="pd-sect">
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-card" style={{ padding: 40 }}>
            <iframe
              src="https://link.upscalerhq.com/widget/form/4KSAV5ZPVb7KB49CKIUs"
              style={{ width: '100%', height: 729, border: 'none', borderRadius: 8 }}
              id="inline-4KSAV5ZPVb7KB49CKIUs"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Referral System"
              data-height="729"
              data-layout-iframe-id="inline-4KSAV5ZPVb7KB49CKIUs"
              data-form-id="4KSAV5ZPVb7KB49CKIUs"
              title="Referral System"
            />
            <Script src="https://link.upscalerhq.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
