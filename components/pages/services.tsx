'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const BOOKING_URL = 'https://link.upscalerhq.com/booking/pristine-detailers';

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

const MEMBERSHIP_FAQS = [
  { q: 'How does the membership work?', a: 'You pay a recurring monthly fee by direct debit. This keeps you on our maintenance program and gives you access to your monthly detail.' },
  { q: 'Do you automatically book my monthly appointment?', a: 'No. You are responsible for making your booking each month.' },
  { q: 'What happens if I forget to book?', a: "That month's service is forfeited. Memberships do not include rollovers, credits, or catch-up appointments." },
  { q: 'Can I use two details the following month if I missed one?', a: 'No. No catch-up details are arranged.' },
  { q: 'Will you remind me each month?', a: 'We generally do not send monthly booking reminders. We will contact you only if there is a rainy day, weather issue, or cancellation from our side.' },
  { q: 'What if it rains on the day?', a: "If weather affects your appointment, we'll contact you and arrange a suitable alternative time." },
  { q: 'Can I reschedule my appointment?', a: 'Yes — provided reasonable notice is given and subject to availability.' },
  { q: 'What happens if my payment fails?', a: 'Your membership may be paused until payment is successfully processed.' },
  { q: 'Can I cancel my membership anytime?', a: 'Yes. Cancellation must be requested before your next billing date. Payments already processed are non-refundable.' },
  { q: 'What if my car is much dirtier than normal?', a: 'Memberships are designed for maintenance-level vehicles. Heavily soiled vehicles may require an upgraded service or additional charge.' },
];

const MEMBERSHIP_PLANS = [
  {
    id: 'essential',
    title: 'Essential membership',
    price: '$150/mo',
    description: 'Light protection and a monthly exterior refresh for city drivers.',
    benefits: ['Monthly wash + seal', 'Priority booking', 'Member support'],
  },
  {
    id: 'signature',
    title: 'Signature membership',
    price: '$149/mo',
    description: 'Recommended: maintenance detailing, ceramic care, and priority mobile service.',
    benefits: ['Bi-Monthly Detail', 'Ceramic maintenance', 'Exclusive add-on pricing'],
    featured: true,
  },
];

export function Services() {
  const [selected, setSelected] = useState('maintenance-detail');
  const [plan, setPlan] = useState('signature');
  const [openFaq, setOpenFaq] = useState(-1);
  const services = [
    {
      id: 'maintenance-detail',
      title: 'Maintenance Detail',
      description: 'Monthly wash-and-seal to keep your car looking freshly detailed, year-round.',
      price: '$150/mo',
      label: 'Included with Essential membership',
      body: 'The Maintenance Detail is our recurring monthly service — a full exterior wash, decontamination, and protective seal that keeps your paint looking after itself between bigger jobs. It comes standard with our Essential membership, with priority booking and member pricing on every add-on.',
      benefits: ['Monthly wash + protective seal', 'Priority booking every month', 'Member support & scheduling', 'Discounted rates on add-ons'],
    },
    {
      id: 'revitalise-package',
      title: 'Revitalise Package',
      description: 'A full reset — deep clean, paint correction, and lasting protection in one visit.',
      price: '$385',
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

      {/* Membership plans */}
      <section id="membership" className="pd-sect-sm" style={{ borderTop: '1px solid var(--line)', scrollMarginTop: 100 }}>
        <div className="pd-container">
          <div className="pd-two-col pd-two-col-1-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start', marginBottom: 48 }}>
            <div>
              <Eyebrow>Membership</Eyebrow>
              <h2 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 16, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Membership for every level of care.
              </h2>
              <p style={{ marginTop: 20, fontSize: 17, color: 'var(--ink-2)', maxWidth: 560 }}>
                Stay ahead of wear, preserve finishes, and save on every booked service when you join our Signature club.
              </p>
            </div>

            <div className="pd-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div>
                  <div className="pd-eyebrow">Member benefit</div>
                  <h3 style={{ fontSize: 22, marginTop: 10 }}>Keep it Pristine, always.</h3>
                </div>
                <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark">Join now</Link>
              </div>
              <div style={{ display: 'grid', gap: 16, color: 'var(--ink-3)' }}>
                <p>Signature members save up to 35% on bookings annually, enjoy faster scheduling, and receive personalised care plans for their vehicles.</p>
                <p>Membership is designed for owners who want consistent, premium service without repeated calls or price surprises.</p>
              </div>
            </div>
          </div>

          <div className="pd-two-col pd-two-col-1fr-300" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'grid', gap: 20 }}>
                {MEMBERSHIP_PLANS.map(planOption => (
                  <button
                    key={planOption.id}
                    type="button"
                    onClick={() => setPlan(planOption.id)}
                    className="pd-card"
                    style={{
                      textAlign: 'left',
                      padding: 28,
                      borderColor: plan === planOption.id ? 'var(--ink)' : 'var(--line)',
                      background: plan === planOption.id ? '#F8F7F3' : '#FFF',
                      position: 'relative',
                    }}
                  >
                    {planOption.featured && (
                      <span className="pd-tag" style={{ position: 'absolute', right: 24, top: 24 }}>Popular</span>
                    )}
                    <div className="pd-eyebrow">{planOption.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
                      <h3 style={{ fontSize: 28, margin: 0 }}>
                        {planOption.price}
                        <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.6, marginLeft: 5 }}>+ GST</span>
                      </h3>
                      <span style={{ color: 'var(--ink-3)' }}>{plan === planOption.id ? 'Selected' : 'Choose'}</span>
                    </div>
                    <p style={{ marginTop: 18, color: 'var(--ink-2)' }}>{planOption.description}</p>
                    <ul style={{ marginTop: 22, display: 'grid', gap: 10, color: 'var(--ink-3)' }}>
                      {planOption.benefits.map((benefit) => (
                        <li key={benefit} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C89B37', display: 'inline-block' }} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 14 }}>
                <button className="pd-btn pd-btn-dark">Select plan</button>
                <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-ghost">Book member service</Link>
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)' }}>
                By subscribing you agree to our{' '}
                <Link href="/membership/terms" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>membership terms & conditions</Link>.
              </p>
            </div>

            <aside className="pd-aside-sticky" style={{ position: 'sticky', top: 100 }}>
              <div className="pd-card" style={{ padding: 28 }}>
                <Eyebrow>What members love</Eyebrow>
                <div style={{ marginTop: 20, display: 'grid', gap: 18 }}>
                  <div>
                    <strong>Know your schedule</strong>
                    <p style={{ marginTop: 8, color: 'var(--ink-3)' }}>We book your next detail before the current one finishes, so your car stays on track.</p>
                  </div>
                  <div>
                    <strong>Save without compromise</strong>
                    <p style={{ marginTop: 8, color: 'var(--ink-3)' }}>Members receive lower add-on rates and protective service pricing.</p>
                  </div>
                  <div>
                    <strong>Priority service</strong>
                    <p style={{ marginTop: 8, color: 'var(--ink-3)' }}>Your booking moves to the front of the queue when time is tight.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Membership FAQ */}
          <div style={{ marginTop: 72, maxWidth: 780, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow>Membership FAQs</Eyebrow>
            <h3 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 24, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Common questions.
            </h3>
            {MEMBERSHIP_FAQS.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid #E1DFD8', ...(i === MEMBERSHIP_FAQS.length - 1 ? { borderBottom: '1px solid #E1DFD8' } : {}) }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{ width: '100%', padding: '20px 0', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', gap: 16 }}
                >
                  {f.q}
                  <span style={{ fontSize: 22, color: '#7A7A76', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 20, fontSize: 15, color: '#3A3A38', lineHeight: 1.65 }}>{f.a}</div>
                )}
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
