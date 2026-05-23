import Link from 'next/link';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Eyebrow } from '@/components/shared/atoms';

const SECTIONS = [
  {
    heading: 'Acceptance of Terms',
    body: [
      'By booking a service, creating an account, or using any part of the Pristine Detailers website or customer portal, you agree to be bound by these Terms & Conditions.',
      'These terms apply to all customers, including one-off bookings and membership subscribers.',
      'If you do not agree to these terms, please do not use our services.',
    ],
  },
  {
    heading: 'Our Services',
    body: [
      'Pristine Detailers provides mobile car detailing, ceramic coating, paint protection film, interior care, and related services in the Greater Melbourne area.',
      'All services are performed at your nominated location. You are responsible for ensuring a safe, accessible, and suitable working environment at the time of your appointment.',
      'Service inclusions are as described on our website at the time of booking. We reserve the right to update service details at any time with reasonable notice.',
    ],
  },
  {
    heading: 'Bookings',
    body: [
      'Bookings are confirmed upon receipt of your booking request via our website, phone, or booking platform.',
      'You will receive a confirmation message with your appointment details. Please review these details carefully and contact us immediately if any information is incorrect.',
      'We reserve the right to decline or cancel a booking where service is not feasible at the requested location, where demand exceeds capacity, or where prior conduct warrants refusal.',
    ],
  },
  {
    heading: 'Cancellations & Rescheduling',
    body: [
      'We require at least 24 hours\' notice for any cancellation or reschedule request.',
      'Cancellations made with less than 24 hours\' notice or no-shows may result in a cancellation fee of up to the full service value, at our discretion.',
      'Pristine Detailers may cancel or reschedule appointments due to adverse weather conditions, safety concerns, staff availability, or other operational factors. We will contact you as soon as possible and arrange an alternative time.',
    ],
  },
  {
    heading: 'Pricing & Payment',
    body: [
      'All prices are listed in Australian dollars (AUD) and include GST where applicable.',
      'Payment is required in full at the time of booking or prior to commencement of service, unless otherwise agreed.',
      'We accept payment via credit or debit card through Stripe. We do not store card details on our systems.',
      'Prices are subject to change without notice, but confirmed bookings will be honoured at the price quoted at time of booking.',
    ],
  },
  {
    heading: 'Vehicle Condition',
    body: [
      'Our services are designed for vehicles in a standard condition. Vehicles presenting excessive contamination, pet hair, mould, heavy staining, or biohazardous material may require an additional charge or may not be serviceable.',
      'We will advise you of any additional charges before commencing work where reasonably possible.',
      'We are not liable for pre-existing damage to paintwork, trim, glass, or interior surfaces. Any pre-existing damage noted at the time of service may be recorded.',
    ],
  },
  {
    heading: 'Liability & Warranty',
    body: [
      'We take care in delivering our services and use professional-grade products. However, to the maximum extent permitted by law, Pristine Detailers is not liable for any indirect, consequential, or incidental loss arising from our services.',
      'Our liability for any claim is limited to the value of the service provided.',
      'Nothing in these terms limits or excludes any rights you may have under the Australian Consumer Law, including any applicable consumer guarantees.',
      'If you believe our work has caused damage to your vehicle, please notify us within 48 hours of service completion so we can assess and address the issue fairly.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All content on the Pristine Detailers website — including text, images, branding, and design — is owned by or licensed to Pristine Detailers and is protected by Australian copyright law.',
      'You may not reproduce, copy, or redistribute any content from our website without our express written permission.',
    ],
  },
  {
    heading: 'Customer Portal & Account',
    body: [
      'To access certain features of our customer portal you must create an account. You are responsible for maintaining the confidentiality of your login credentials.',
      'You must notify us immediately if you suspect any unauthorised access to your account.',
      'We reserve the right to suspend or terminate accounts where misuse, fraudulent activity, or breach of these terms is identified.',
    ],
  },
  {
    heading: 'Privacy',
    body: [
      'Our collection and use of personal information is governed by our Privacy Policy, which forms part of these Terms & Conditions.',
      'By using our services, you consent to the practices described in our Privacy Policy.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may update these Terms & Conditions from time to time. The current version will always be available on this page with an updated effective date.',
      'Continued use of our services after changes are published constitutes your acceptance of the updated terms.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These Terms & Conditions are governed by the laws of Victoria, Australia.',
      'Any disputes arising from or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts of Victoria.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'If you have any questions about these terms, please contact us before booking.',
      'Email: info@pristinedetailers.com.au',
      'Phone: 0491 108 905',
    ],
  },
];

export function Terms() {
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
            Terms & Conditions
          </h1>
          <p style={{ fontSize: 14, color: '#7A7A76', marginBottom: 56 }}>
            Effective date: 1 May 2026 &nbsp;·&nbsp; Pristine Detailers, Melbourne VIC, Australia
          </p>

          <div style={{ display: 'grid', gap: 0 }}>
            {SECTIONS.map((section) => (
              <div key={section.heading} style={{ paddingBottom: 36, marginBottom: 36, borderBottom: '1px solid #E1DFD8' }}>
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

          <p style={{ marginTop: 16, fontSize: 13, color: '#7A7A76' }}>
            Questions about these terms?{' '}
            <Link href="/contact" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Contact us
            </Link>{' '}
            or read our{' '}
            <Link href="/privacy-policy" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Privacy Policy
            </Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
