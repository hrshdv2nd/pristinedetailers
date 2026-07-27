'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Eyebrow, Arrow } from '@/components/shared/atoms';
import { SupportTicketModal } from '@/components/shared/support-ticket-modal';

const SECTIONS = [
  {
    heading: 'Overview',
    body: [
      'This policy explains how cancellations, rescheduling, and change-of-mind requests are handled for all Pristine Detailers bookings, including one-off services and membership subscriptions.',
      'It should be read alongside our Terms & Conditions and forms part of the agreement you accept when you make a booking.',
    ],
  },
  {
    heading: 'Cancellations & Rescheduling',
    id: 'cancellations',
    body: [
      '24 hours or more notice: Email us at least 24 hours before your appointment and we\'ll transfer your booking to another session of your choosing (subject to availability and pricing) or issue you a credit voucher for future use.',
      'Ceramic coating & PPF (multi-day) bookings: A $100 reschedule fee applies to transfers or cancellations of ceramic coating and paint protection film jobs. We\'ll issue a credit voucher for your purchase amount less the reschedule fee.',
      'Less than 24 hours notice: Cancelling or requesting to reschedule within 24 hours of your appointment start time is treated as a "No Show" — you are not entitled to a transfer or credit for that booking.',
      'Business-initiated changes: We may need to reschedule due to adverse weather, safety concerns, or staff availability. We\'ll contact you as soon as possible to arrange an alternative time at no cost to you.',
    ],
  },
  {
    heading: 'Change of Mind',
    body: [
      'Under the Australian Consumer Law, businesses are not legally required to provide a refund or credit simply because you\'ve changed your mind about a service you\'ve booked.',
      'As a courtesy, if you change your mind before your appointment and give us 24 hours or more notice, we\'ll treat it the same as a cancellation above — a transfer or credit voucher, less any applicable reschedule fee.',
      'Once a service has commenced — including preparation, paint correction, coating application, or film installation — it can no longer be cancelled for change of mind, as products and labour have already been committed.',
      'Consumables and products applied to your vehicle (ceramic coating, film, protective products) cannot be "returned" once applied, and change-of-mind refunds do not apply to completed work.',
      'This does not affect your rights under the Australian Consumer Law where a service is not provided with due care and skill, or is not fit for purpose — see "Your Consumer Guarantees" below.',
    ],
  },
  {
    heading: 'Membership Cancellations',
    body: [
      'Membership plans can be cancelled at any time by giving written notice before your next billing date.',
      'Once a monthly membership payment has been processed, that month is non-refundable — including where you choose not to book a service that month.',
      'The standard 24-hour cancellation and rescheduling terms above apply to individual appointments booked under a membership.',
    ],
  },
  {
    heading: 'No Shows',
    body: [
      'If you don\'t show up for a scheduled appointment without giving at least 24 hours notice, it\'s recorded as a No Show and no transfer, credit, or refund is provided.',
      'Repeated no-shows may result in us requiring prepayment for future bookings or declining to offer further appointments.',
    ],
  },
  {
    heading: 'Refunds & Credit Vouchers',
    body: [
      'Where a refund or credit is approved under this policy, credit vouchers are issued to the email address used for booking and can be redeemed against any future Pristine Detailers service.',
      'Credit vouchers do not expire but are not redeemable for cash.',
      'Refunds to your original payment method (via Stripe) are only issued at our discretion or where required under the Australian Consumer Law.',
    ],
  },
  {
    heading: 'Your Consumer Guarantees',
    body: [
      'Nothing in this policy excludes, restricts, or modifies any consumer guarantee, right, or remedy you have under the Australian Consumer Law.',
      'If our work is not carried out with due care and skill, or a product used is not of acceptable quality, you may be entitled to a repair, resupply, or refund regardless of the change-of-mind terms above.',
      'If you believe our work has caused an issue with your vehicle, notify us within 48 hours of service completion so we can assess it fairly.',
    ],
  },
  {
    heading: 'How to Cancel, Reschedule, or Request a Refund',
    body: [
      'Email us at info@pristinedetailers.com.au with your name, booking date, and the change you\'d like to make.',
      'Call or text us on 0468 048 461.',
      'Or submit a support ticket using the button below and our team will respond as soon as possible.',
    ],
  },
];

function CtaBanner({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      className="pd-card"
      style={{
        padding: '36px 40px',
        marginBottom: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.01em' }}>
          Need to change or cancel a booking?
        </h3>
        <p style={{ fontSize: 14, color: '#7A7A76', margin: 0 }}>
          Submit a support ticket and our team will action your request as soon as possible.
        </p>
      </div>
      <button type="button" onClick={onOpen} className="pd-btn pd-btn-dark" style={{ flexShrink: 0 }}>
        Submit a Support Ticket <Arrow />
      </button>
    </div>
  );
}

export function CancellationPolicy() {
  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <div className="pd-page">
      <Nav />

      <section style={{ padding: '60px 0 100px' }}>
        <div className="pd-container" style={{ maxWidth: 780 }}>
          <Eyebrow>Legal</Eyebrow>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              marginTop: 12,
              marginBottom: 12,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Cancellation & Change of Mind Policy
          </h1>
          <p style={{ fontSize: 14, color: '#7A7A76', marginBottom: 40 }}>
            Effective date: 1 May 2026 &nbsp;·&nbsp; Pristine Detailers, Melbourne VIC, Australia
          </p>

          <p style={{ fontSize: 15, color: '#3A3A38', lineHeight: 1.65, marginBottom: 40 }}>
            Please read this policy before booking. Once you’ve reviewed it, you can submit a support
            ticket directly from this page if you need to cancel, reschedule, or request a refund.
          </p>

          <CtaBanner onOpen={() => setTicketOpen(true)} />

          <div style={{ display: 'grid', gap: 0 }}>
            {SECTIONS.map((section) => (
              <div
                key={section.heading}
                id={section.id}
                style={{ paddingBottom: 36, marginBottom: 36, borderBottom: '1px solid #E1DFD8', scrollMarginTop: 100 }}
              >
                <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.01em' }}>
                  {section.heading}
                </h2>
                <ul style={{ display: 'grid', gap: 10 }}>
                  {section.body.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14, fontSize: 15, color: '#3A3A38', lineHeight: 1.65 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C89B37', flexShrink: 0, marginTop: 10 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <CtaBanner onOpen={() => setTicketOpen(true)} />

          <p style={{ marginTop: 16, fontSize: 13, color: '#7A7A76' }}>
            Questions about this policy?{' '}
            <Link href="/contact" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Contact us
            </Link>{' '}
            or read our{' '}
            <Link href="/terms" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Terms & Conditions
            </Link>.
          </p>
        </div>
      </section>

      <SupportTicketModal open={ticketOpen} onClose={() => setTicketOpen(false)} />

      <Footer />
    </div>
  );
}
