'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Arrow } from '@/components/shared/atoms';
import { BlobImage } from '@/components/shared/blob-image';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export function Services() {
  const [selected, setSelected] = useState('vehicle-detailing');
  const services = [
    {
      id: 'vehicle-detailing',
      title: 'Basic Detailing',
      description: 'Interior, exterior, polish, and protection for every finish.',
      price: '$150',
      label: 'Best for a quick inside and out clean',
      body: 'Our team handles the full job from wash and clay bar through finishing touches. If you want add-ons such as engine bay detail or headlight restoration, we\'ll plan them in.',
      benefits: ['Full interior vacuum & wipe-down', 'Exterior hand wash & dry', 'Tyre shine & window clean', 'Add-ons available on request'],
    },
    {
      id: 'revitalise-package',
      title: 'Revitalise Package',
      description: 'A full reset — deep clean, paint correction, and lasting protection in one visit.',
      price: '$300',
      label: 'Best for neglected or pre-sale vehicles',
      body: 'The Revitalise Package is for cars that need more than a wash. We start with a full exterior decontamination and clay bar, move through a two-stage paint correction to remove swirls and light scratches, then finish with an interior deep clean, leather treatment, tyre dressing, and a paint sealant that holds for up to 6 months.',
      benefits: ['Two-stage machine paint correction', 'Full decontamination & clay bar', 'Interior deep clean & leather treatment', 'Paint sealant — lasts up to 6 months'],
    },
    {
      id: 'ceramic-coating',
      title: 'Ceramic coating',
      description: 'Long-lasting hydrophobic protection for paint, wheels, and glass.',
      price: '$999',
      label: 'Best for deep long lasting protection',
      body: 'A nano-ceramic barrier bonded directly to your paintwork. Hydrophobic, UV-stable, and scratch-resistant — our ceramic coatings are applied by certified technicians and backed by a manufacturer warranty of up to 8 years.',
      benefits: ['Hydrophobic, UV-stable nano-ceramic', 'Scratch and swirl resistant finish', 'Applied by certified technicians', 'Manufacturer warranty up to 8 years'],
    },
    {
      id: 'paint-protection',
      title: 'Paint Protection film',
      description: 'Invisible, impact-resistant coverage for the most vulnerable panels.',
      price: '$3,000',
      label: 'Best for high-risk areas',
      body: 'Self-healing polyurethane film, precisely cut and installed panel by panel. Virtually invisible at any angle, PPF takes the stone chips, road debris, and minor abrasions so your paint never has to. Stack with ceramic for maximum long-term defence.',
      benefits: ['Self-healing polyurethane film', 'Virtually invisible, panel-by-panel install', 'Absorbs stone chips & road debris', 'Stack with ceramic for max protection'],
    },
    {
      id: 'window-tinting',
      title: 'Mobile Window Tinting',
      description: 'UV and heat-blocking film fitted at your home or office.',
      price: '$200',
      label: 'Best for privacy, heat reduction and UV protection',
      body: 'Our mobile technicians install premium window film on-site, cutting glare and cabin heat while blocking up to 99% of UV rays. Choose your tint level and we handle the rest — no need to visit a shop.',
      benefits: ['Blocks up to 99% of UV rays', 'Cuts glare & cabin heat', 'Installed on-site, no shop visit', 'Choose your preferred tint level'],
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
                  <Image src="https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/scratch-repair.jpg" alt="" fill style={{ objectFit: 'cover' }} />
                </BlobImage>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="pd-eyebrow">Need help choosing?</div>
                <h2 style={{ fontSize: 30, marginTop: 18 }}>Talk to our team.
                </h2>
                <p style={{ marginTop: 16, color: 'var(--ink-3)' }}>We'll recommend the right plan based on your vehicle, schedule, and protection needs.</p>
                <Link href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark" style={{ marginTop: 24 }}>Book a call</Link>
              </div>
            </div>
          </div>

          <div className="pd-two-col" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'stretch' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 32,
                  overflowX: 'auto',
                  paddingBottom: 6,
                  scrollbarWidth: 'none',
                }}
              >
                {services.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelected(service.id)}
                    className="pd-btn pd-btn-light"
                    style={{
                      padding: '14px 20px',
                      borderRadius: 999,
                      border: `1.5px solid ${selected === service.id ? '#C89B37' : '#C8C5BC'}`,
                      background: selected === service.id ? '#C89B37' : '#fff',
                      color: '#0A0A0A',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      fontSize: 14,
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 320px' }}>
                          <div className="pd-eyebrow">{service.title}</div>
                          <h2 style={{ fontSize: 34, lineHeight: 1.1, marginTop: 14 }}>{service.description}</h2>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C89B37', marginBottom: 6 }}>Starting From</div>
                          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 6, whiteSpace: 'nowrap' }}>
                            <span style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 500 }}>{service.price}</span>
                            <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--ink-3)' }}>+ GST</span>
                          </div>
                          <div style={{ color: 'var(--ink-3)', marginTop: 8, maxWidth: 200 }}>{service.label}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 24, display: 'grid', gap: 24 }}>
                        <p style={{ color: 'var(--ink-2)' }}>{service.body}</p>

                        <ul style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, 1fr)', padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                          {service.benefits.map(b => (
                            <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink-2)' }}>
                              <CheckIcon />
                              {b}
                            </li>
                          ))}
                        </ul>

                        <Link href="https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark" style={{ justifySelf: 'start' }}>Book this service <Arrow /></Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="pd-aside-sticky" style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div className="pd-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <div className="pd-eyebrow">Why we're different</div>
                  <ul style={{ marginTop: 20, display: 'grid', gap: 16 }}>
                    {[
                      'Mobile service across greater Melbourne.',
                      'Technicians certified by Ceramic Pro and Gtechniq.',
                      'One-point communication via text and phone.',
                      'Clear pricing for every stage of your service.',
                    ].map(item => (
                      <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', lineHeight: 1.5, color: 'var(--ink-2)' }}>
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', gap: 4, color: '#C89B37', fontSize: 16 }}>{'★★★★★'}</div>
                  <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>Rated 5 stars by Melbourne car owners for reliable, mobile, on-time service.</p>
                </div>

                <div style={{ padding: 20, borderRadius: 14, background: 'var(--bg-2)' }}>
                  <div className="pd-eyebrow">See it in person</div>
                  <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>Browse before-and-after results from recent details, coatings, and PPF installs.</p>
                  <Link href="/gallery" className="pd-btn pd-btn-ghost pd-btn-sm" style={{ marginTop: 14 }}>View gallery <Arrow /></Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
