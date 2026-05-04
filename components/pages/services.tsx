'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Arrow, Eyebrow } from '@/components/shared/atoms';
import { Placeholder } from '@/components/shared/placeholder';
import { BlobImage } from '@/components/shared/blob-image';

export function Services() {
  const [selected, setSelected] = useState('vehicle-detailing');
  const services = [
    {
      id: 'vehicle-detailing',
      title: 'Vehicle detailing',
      description: 'Interior, exterior, polish, and protection for every finish.',
      price: '$120',
      label: 'Best for a quick inside and out clean',
      body: 'Our team handles the full job from wash and clay bar through finishing touches. If you want add-ons such as engine bay detail or headlight restoration, we\'ll plan them in.',
    },
    {
      id: 'revitalise-package',
      title: 'Revitalise Package',
      description: 'A full reset — deep clean, paint correction, and lasting protection in one visit.',
      price: '$300',
      label: 'Best for neglected or pre-sale vehicles',
      body: 'The Revitalise Package is for cars that need more than a wash. We start with a full exterior decontamination and clay bar, move through a two-stage paint correction to remove swirls and light scratches, then finish with an interior deep clean, leather treatment, tyre dressing, and a paint sealant that holds for up to 6 months.',
    },
    {
      id: 'ceramic-coating',
      title: 'Ceramic coating',
      description: 'Long-lasting hydrophobic protection for paint, wheels, and glass.',
      price: '$750',
      label: 'Best for deep long lasting protection',
      body: 'A nano-ceramic barrier bonded directly to your paintwork. Hydrophobic, UV-stable, and scratch-resistant — our ceramic coatings are applied by certified technicians and backed by a manufacturer warranty of up to 8 years.',
    },
    {
      id: 'paint-protection',
      title: 'Paint Protection film',
      description: 'Invisible, impact-resistant coverage for the most vulnerable panels.',
      price: '$3,000',
      label: 'Best for high-risk areas',
      body: 'Self-healing polyurethane film, precisely cut and installed panel by panel. Virtually invisible at any angle, PPF takes the stone chips, road debris, and minor abrasions so your paint never has to. Stack with ceramic for maximum long-term defence.',
    },
  ];

  return (
    <div className="pd-page">
      <Nav active="services" />

      <section style={{ padding: '40px 0 100px' }}>
        <div className="pd-container">
          <div className="pd-two-col pd-two-col-1fr-380" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
            <div>
              <div className="pd-eyebrow" style={{ marginBottom: 20 }}>Services</div>
              <h1 style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.03 }}>
                We treat every car like the one we drive.
              </h1>
              <p style={{ marginTop: 24, fontSize: 17, color: 'var(--ink-2)', maxWidth: 680 }}>From mobile detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless.</p>
            </div>

            <div className="pd-card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -80, top: -80, opacity: 0.15, pointerEvents: 'none' }}>
                <BlobImage variant="a" size={220} rotate={20} color="#C89B37">
                  <Placeholder label="GOLD" tone="navy" style={{ width: '100%', height: '100%' }} />
                </BlobImage>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="pd-eyebrow">Need help choosing?</div>
                <h2 style={{ fontSize: 30, marginTop: 18 }}>Talk to our team.
                </h2>
                <p style={{ marginTop: 16, color: 'var(--ink-3)' }}>We'll recommend the right plan based on your vehicle, schedule, and protection needs.</p>
                <Link href="/booking" className="pd-btn pd-btn-dark" style={{ marginTop: 24 }}>Book a call</Link>
              </div>
            </div>
          </div>

          <div className="pd-two-col" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
                {services.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelected(service.id)}
                    className="pd-btn pd-btn-light"
                    style={{
                      padding: '16px 22px',
                      borderRadius: 999,
                      border: `1.5px solid ${selected === service.id ? '#C89B37' : '#C8C5BC'}`,
                      background: selected === service.id ? '#C89B37' : '#fff',
                      color: '#0A0A0A',
                    }}
                  >
                    {service.title}
                  </button>
                ))}
              </div>

              <div className="pd-card" style={{ padding: 36 }}>
                <div style={{ display: 'grid', gap: 24 }}>
                  {services.map(service => (
                    <div key={service.id} style={{ display: selected === service.id ? 'block' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                        <div>
                          <div className="pd-eyebrow">{service.title}</div>
                          <h2 style={{ fontSize: 38, lineHeight: 1.05, marginTop: 14 }}>{service.description}</h2>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C89B37', marginBottom: 6 }}>Starting From</div>
                          <div style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 500 }}>{service.price}</div>
                          <div style={{ color: 'var(--ink-3)', marginTop: 8 }}>{service.label}</div>
                        </div>
                      </div>
                      <div style={{ marginTop: 28, display: 'grid', gap: 14 }}>
                        <p style={{ color: 'var(--ink-2)' }}>{service.body}</p>
                        <Link href="/booking" className="pd-btn pd-btn-dark">Book this service <Arrow /></Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="pd-aside-sticky" style={{ position: 'sticky', top: 100 }}>
              <div className="pd-card" style={{ padding: 28 }}>
                <div className="pd-eyebrow">Why we're different</div>
                <ul style={{ marginTop: 20, display: 'grid', gap: 18, lineHeight: 1.7, color: 'var(--ink-3)' }}>
                  <li>Mobile service across greater Melbourne.</li>
                  <li>Technicians certified by Ceramic Pro and Gtechniq.</li>
                  <li>One-point communication via text and phone.</li>
                  <li>Clear pricing for every stage of your service.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
