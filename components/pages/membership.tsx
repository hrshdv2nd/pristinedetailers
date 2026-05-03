'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Arrow, Eyebrow } from '@/components/shared/atoms';
import { BlobImage } from '@/components/shared/blob-image';
import { Placeholder } from '@/components/shared/placeholder';

export function Membership() {
  const [plan, setPlan] = useState('signature');
  const [openFaq, setOpenFaq] = useState(-1);

  const faqs = [
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
  const plans = [
    {
      id: 'essential',
      title: 'Essential membership',
      price: '$79/mo',
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

  return (
    <div className="pd-page">
      <Nav active="membership" />

      <section style={{ padding: '40px 0 100px' }}>
        <div className="pd-container">
          <div className="pd-two-col pd-two-col-1-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <div className="pd-eyebrow" style={{ marginBottom: 20 }}>Membership</div>
              <h1 style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.03 }}>Membership for every level of care.</h1>
              <p style={{ marginTop: 24, fontSize: 17, color: 'var(--ink-2)', maxWidth: 680 }}>Stay ahead of wear, preserve finishes, and save on every booked service when you join our Signature club.</p>
            </div>

            <div className="pd-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div>
                  <div className="pd-eyebrow">Member benefit</div>
                  <h2 style={{ fontSize: 26, marginTop: 10 }}>Keep it Pristine, always.</h2>
                </div>
                <Link href="/booking" className="pd-btn pd-btn-dark">Join now</Link>
              </div>
              <div style={{ display: 'grid', gap: 16, color: 'var(--ink-3)' }}>
                <p>Signature members save up to  35% on bookings annually, enjoy faster scheduling, and receive personalised care plans for their vehicles.</p>
                <p>Membership is designed for owners who want consistent, premium service without repeated calls or price surprises.</p>
              </div>
            </div>
          </div>

          <div className="pd-two-col pd-two-col-1fr-300" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'grid', gap: 20 }}>
                {plans.map(planOption => (
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
                      <h2 style={{ fontSize: 28, margin: 0 }}>{planOption.price}</h2>
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
                <Link href="/booking" className="pd-btn pd-btn-ghost">Book member service</Link>
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)' }}>
                By subscribing you agree to our{' '}
                <a href="#terms" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>membership terms & conditions</a>.
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
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid #E1DFD8' }}>
        <div className="pd-container" style={{ maxWidth: 780 }}>
          <Eyebrow>FAQs</Eyebrow>
          <h2 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 40, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Common questions.
          </h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid #E1DFD8', ...(i === faqs.length - 1 ? { borderBottom: '1px solid #E1DFD8' } : {}) }}>
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
      </section>

      {/* ── TERMS & CONDITIONS ── */}
      <section id="terms" style={{ padding: '80px 0', background: '#F4F4F2', borderTop: '1px solid #E1DFD8' }}>
        <div className="pd-container" style={{ maxWidth: 780 }}>
          <Eyebrow>Legal</Eyebrow>
          <h2 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 40, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Membership Terms & Conditions
          </h2>

          {[
            {
              heading: 'Membership Billing',
              items: [
                'Membership payments are charged by direct debit using your nominated payment method.',
                'Payments are charged automatically on a recurring monthly basis unless cancelled in accordance with these terms.',
                'Membership fees secure your place in our maintenance program and ongoing access to member pricing, priority scheduling, and allocated servicing capacity.',
                'Failed, declined, or overdue payments may result in suspension of membership benefits until payment is successfully processed.',
              ],
            },
            {
              heading: 'Booking Responsibility',
              items: [
                'It is the member\'s responsibility to book their monthly detail appointment.',
                'Membership does not automatically create bookings.',
                'If a booking is not made within a given month, that month\'s service is considered unused.',
              ],
            },
            {
              heading: 'Missed Months / No Catch-Up Services',
              items: [
                'Unused monthly services do not roll over.',
                'No catch-up details, backdated appointments, credits, or refunds will be provided for missed months, regardless of customer availability, travel, scheduling conflicts, or failure to book.',
              ],
            },
            {
              heading: 'Weather, Rainy Days & Rescheduling',
              items: [
                'Pristine Detailers will contact you only where a booking needs to be adjusted due to unsuitable weather conditions, operational delays, staff availability, or cancellation on our end.',
                'In these situations, we will work with you to arrange the next suitable available booking.',
              ],
            },
            {
              heading: 'Customer Cancellations & Rescheduling',
              items: [
                'We request at least 24 hours\' notice for appointment changes or cancellations.',
                'Late cancellations or no-shows may result in that month\'s service being forfeited.',
                'Rescheduling is subject to availability.',
              ],
            },
            {
              heading: 'Vehicle Condition',
              items: [
                'Membership services are intended for ongoing maintenance of regularly maintained vehicles.',
                'Vehicles presenting excessive dirt, pet hair, sand, staining, mould, heavy contamination, or neglected condition may require an additional charge or upgrade to a higher service package.',
              ],
            },
            {
              heading: 'Access & Appointment Readiness',
              items: [
                'Customers must ensure the vehicle is accessible at the agreed time and location.',
                'If we are unable to access the vehicle or commence work due to lack of access, unavailable keys, locked premises, or unsafe working conditions, the appointment may be treated as completed for that month.',
              ],
            },
            {
              heading: 'Service Areas',
              items: [
                "Membership services are available only within Pristine Detailers' active service areas.",
                'Travel fees may apply outside standard service zones.',
              ],
            },
            {
              heading: 'Membership Changes & Cancellation',
              items: [
                'Membership may be cancelled by the customer by providing written notice before the next billing date.',
                'Once a monthly payment has been processed, that month is non-refundable.',
                'Pristine Detailers reserves the right to suspend or cancel membership where payments fail repeatedly, abusive conduct occurs, or service becomes commercially impractical.',
              ],
            },
            {
              heading: 'Pricing & Terms Updates',
              items: [
                'Pristine Detailers may update pricing, inclusions, or membership terms from time to time.',
                'Members will be notified of material changes before they take effect.',
              ],
            },
          ].map((section) => (
            <div key={section.heading} style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>{section.heading}</h3>
              <ul style={{ display: 'grid', gap: 8 }}>
                {section.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: '#3A3A38', lineHeight: 1.65 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C89B37', flexShrink: 0, marginTop: 9 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
