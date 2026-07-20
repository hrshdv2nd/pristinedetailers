'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Arrow } from '@/components/shared/atoms';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const BOOKING_URL = 'https://pristinedetailers.setmore.com/?rwg_token=AFd1xnHc01bPFSDGd3K3nYddUlaV-cztDbrRQWVpRQrryHy2QabfUzu8eldvWeBOKmsA3V_ye-mvGjVtw1bchHEbX1qVQpXyJQ%3D%3D';

const DIFFERENTIATORS = [
  { title: 'Mobile, wherever you are', desc: 'We travel across greater Melbourne — home, office, or car park.' },
  { title: 'Certified technicians', desc: 'Trained and certified by Ceramic Pro and Gtechniq, not casual detailers.' },
  { title: 'One point of contact', desc: 'Text or call — no chasing different people for updates.' },
  { title: 'Transparent pricing', desc: 'Clear pricing for every stage of your service, no surprises.' },
];

const REVIEWS = [
  { name: 'Marcus T.', car: '2024 Porsche 911 GT3', quote: 'The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar.', rating: 5 },
  { name: 'Priya S.', car: '2023 Range Rover Sport', quote: 'Six months of school-run punishment and it still looks showroom. Membership has paid for itself.', rating: 5 },
  { name: 'Dan K.', car: '2022 Tesla Model S Plaid', quote: "They came to my garage in Toorak, set up a whole dust barrier. Most professional service I've had.", rating: 5 },
];

export function Services() {
  const [selected, setSelected] = useState('revitalise-package');
  const services = [
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

      {/* Hero */}
      <section className="pd-sect-hero">
        <div className="pd-container">
          <div className="pd-eyebrow" style={{ marginBottom: 20 }}>Services</div>
          <h1 style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.03, maxWidth: 780 }}>
            We treat every car like the one we drive.
          </h1>
          <p style={{ marginTop: 24, fontSize: 17, color: 'var(--ink-2)', maxWidth: 620 }}>
            From mobile detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless.
          </p>
        </div>
      </section>

      {/* Service selector + detail */}
      <section className="pd-sect" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="pd-container">
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

          <div className="pd-card" style={{ padding: 40 }}>
            {services.map(service => (
              <div key={service.id} style={{ display: selected === service.id ? 'block' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 420px' }}>
                    <div className="pd-eyebrow">{service.title}</div>
                    <h2 style={{ fontSize: 34, lineHeight: 1.1, marginTop: 14 }}>{service.description}</h2>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C89B37', marginBottom: 6 }}>Starting From</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 6, whiteSpace: 'nowrap' }}>
                      <span style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 500 }}>{service.price}</span>
                      <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--ink-3)' }}>+ GST</span>
                    </div>
                    <div style={{ color: 'var(--ink-3)', marginTop: 8, maxWidth: 220 }}>{service.label}</div>
                  </div>
                </div>

                <div style={{ marginTop: 28, display: 'grid', gap: 28 }}>
                  <p style={{ color: 'var(--ink-2)', maxWidth: 720 }}>{service.body}</p>

                  <ul className="pd-four-col" style={{ padding: '24px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                    {service.benefits.map(b => (
                      <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink-2)', listStyle: 'none' }}>
                        <CheckIcon />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark" style={{ justifySelf: 'start' }}>
                    Book this service <Arrow />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we're different */}
      <section className="pd-sect-sm" style={{ background: 'var(--bg-2)' }}>
        <div className="pd-container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="pd-eyebrow">Why we're different</div>
            <h2 style={{ fontSize: 36, marginTop: 16 }}>Clear pricing. Certified work. One point of contact.</h2>
          </div>
          <div className="pd-four-col">
            {DIFFERENTIATORS.map(d => (
              <div key={d.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: 24 }}>
                <CheckIcon />
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 500, marginTop: 14 }}>{d.title}</div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="pd-sect-sm">
        <div className="pd-container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="pd-eyebrow">Reviews</div>
            <h2 style={{ fontSize: 36, marginTop: 16 }}>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>4.9 stars</span> from happy customers.
            </h2>
          </div>
          <div className="pd-three-col">
            {REVIEWS.map(r => (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  background: '#fff',
                  padding: 24,
                  borderRadius: 16,
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ color: '#C89B37', fontSize: 16 }}>{'★'.repeat(r.rating)}</div>
                <p style={{ fontFamily: 'var(--f-display)', fontSize: 20, lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400 }}>
                  "{r.quote}"
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: 12, alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#F3E8CD',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#C89B37',
                      fontWeight: 600,
                      fontFamily: 'var(--f-display)',
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="pd-sect-sm">
        <div className="pd-container">
          <div className="pd-card pd-two-col-1-2" style={{ display: 'grid', overflow: 'hidden', alignItems: 'stretch' }}>
            <div style={{ position: 'relative', minHeight: 280 }}>
              <Image src="/images/20250217_125148.jpg" alt="Ceramic coating result" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="pd-eyebrow">See it in person</div>
              <h2 style={{ fontSize: 30, marginTop: 16 }}>Browse the work.</h2>
              <p style={{ marginTop: 12, fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 380 }}>
                Before-and-after results from recent details, coatings, and PPF installs across Melbourne.
              </p>
              <Link href="/gallery" className="pd-btn pd-btn-ghost" style={{ marginTop: 24, alignSelf: 'flex-start' }}>
                View gallery <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to our team */}
      <section className="pd-sect-sm" style={{ background: '#0A0A0A', color: '#fff' }}>
        <div className="pd-container" style={{ textAlign: 'center' }}>
          <div className="pd-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Need help choosing?</div>
          <h2 style={{ fontSize: 36, marginTop: 16, color: '#fff' }}>Talk to our team.</h2>
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            We'll recommend the right plan based on your vehicle, schedule, and protection needs.
          </p>
          <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-primary" style={{ marginTop: 28 }}>
            Book a call
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
