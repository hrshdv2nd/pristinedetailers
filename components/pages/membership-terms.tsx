import Link from 'next/link';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Eyebrow } from '@/components/shared/atoms';

const TERMS = [
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
      "It is the member's responsibility to book their monthly detail appointment, but we will send reminders to make sure you don't miss it.",
      'Membership does not automatically create bookings.',
      "If a booking is not made within a given month, that month's service is considered unused.",
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
      "We request a minimum of 24 hours' notice for appointment changes or cancellations.",
      "Late cancellations or no-shows may result in that month's service being forfeited.",
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
      "Membership services are available only within Pristine Detailers' active service areas, currently East and South East Melbourne.",
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
      'Pristine Detailers may update pricing, inclusions, or membership terms from time to time, but we will let you know beforehand.',
      'Members will be notified of material changes before they take effect.',
    ],
  },
];

export function MembershipTerms() {
  return (
    <div className="pd-page">
      <Nav active="membership" />

      <section style={{ padding: '60px 0 100px' }}>
        <div className="pd-container" style={{ maxWidth: 780 }}>
          <Link
            href="/membership"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#7A7A76', marginBottom: 36, textDecoration: 'none' }}
          >
            ← Back to membership
          </Link>

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
            Membership Terms & Conditions
          </h1>
          <p style={{ fontSize: 14, color: '#7A7A76', marginBottom: 56 }}>
            By subscribing to a Pristine Detailers membership, you agree to the following terms.
          </p>

          <div style={{ display: 'grid', gap: 0 }}>
            {TERMS.map((section) => (
              <div key={section.heading} style={{ paddingBottom: 36, marginBottom: 36, borderBottom: '1px solid #E1DFD8' }}>
                <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.01em' }}>
                  {section.heading}
                </h2>
                <ul style={{ display: 'grid', gap: 10 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14, fontSize: 15, color: '#3A3A38', lineHeight: 1.65 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C89B37', flexShrink: 0, marginTop: 10 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 16, fontSize: 13, color: '#7A7A76' }}>
            Questions? Contact us before subscribing —{' '}
            <Link href="/booking" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              get in touch
            </Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
