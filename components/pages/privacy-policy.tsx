import Link from 'next/link';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Eyebrow } from '@/components/shared/atoms';

const SECTIONS = [
  {
    heading: 'Who We Are',
    body: [
      'Pristine Detailers ("we", "us", "our") is a mobile car detailing business operating in Melbourne, Victoria, Australia.',
      'This Privacy Policy explains how we collect, use, store, and disclose personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).',
      'By using our website or services, you consent to the practices described in this policy.',
    ],
  },
  {
    heading: 'Information We Collect',
    body: [
      'We collect information you provide directly when booking a service, creating an account, subscribing to a membership, or contacting us.',
      'This may include your name, email address, phone number, home or work address, vehicle make and model, and payment card details.',
      'When you visit our website we automatically collect usage data such as pages visited, time on site, browser type, IP address, and referring URL via Google Analytics and Google Tag Manager.',
      'We do not collect sensitive information (such as health information, government identifiers, or racial or ethnic origin) unless strictly necessary.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: [
      'To confirm and manage your bookings and communicate appointment reminders.',
      'To process payments and manage your membership subscription.',
      'To create and maintain your customer portal account.',
      'To respond to enquiries and provide customer support.',
      'To send service updates, promotions, and newsletters where you have opted in.',
      'To improve our website and services through analytics and performance monitoring.',
      'We will not use your personal information for any purpose that is unrelated to the above without your consent.',
    ],
  },
  {
    heading: 'Disclosure to Third Parties',
    body: [
      'We share personal information only with trusted third-party service providers that help us operate our business, including:',
      'Stripe — for secure payment processing and subscription billing. Your card details are held by Stripe and are never stored on our systems.',
      'Supabase — our database and authentication platform, used to manage your account and booking history.',
      'Setmore — our booking and scheduling platform, used to manage appointments.',
      'Google Analytics and Google Tag Manager — for website analytics and tracking visitor behaviour in aggregate.',
      'We do not sell, rent, or trade your personal information to any third party for marketing purposes.',
    ],
  },
  {
    heading: 'Data Storage & Security',
    body: [
      'Your personal information is stored securely on servers located in Australia or in overseas jurisdictions with equivalent data protection standards (such as the United States via Supabase and Stripe).',
      'We take reasonable steps to protect your information from misuse, interference, loss, unauthorised access, modification, or disclosure, including through access controls, encrypted communications (HTTPS), and secure third-party infrastructure.',
      'Despite our best efforts, no data transmission over the internet can be guaranteed as completely secure. Please notify us immediately if you suspect any unauthorised access.',
    ],
  },
  {
    heading: 'Cookies & Tracking',
    body: [
      'Our website uses cookies and similar tracking technologies to enhance your experience and collect usage analytics.',
      'Cookies may be set by Pristine Detailers or by third parties such as Google. You can disable cookies through your browser settings, but some site features may not function as intended.',
    ],
  },
  {
    heading: 'Your Rights',
    body: [
      'You have the right to request access to the personal information we hold about you.',
      'You may request correction of any inaccurate, incomplete, or out-of-date information.',
      'You may opt out of marketing communications at any time by clicking the unsubscribe link in any email, or by contacting us directly.',
      'You may request deletion of your account and associated data, subject to any legal obligations we may have to retain certain records.',
      'To exercise any of these rights, please contact us at info@pristinedetailers.com.au.',
    ],
  },
  {
    heading: 'Links to Other Websites',
    body: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.',
      'We encourage you to review the privacy policy of any external site you visit.',
    ],
  },
  {
    heading: 'Children\'s Privacy',
    body: [
      'Our services are not directed at children under the age of 18. We do not knowingly collect personal information from minors.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. The most recent version will always be available on this page, with the effective date noted below.',
      'Continued use of our website or services after any changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    heading: 'Contact & Complaints',
    body: [
      'If you have questions, concerns, or a complaint about how we handle your personal information, please contact us at:',
      'Email: info@pristinedetailers.com.au',
      'Phone: 0491 108 905',
      'If we are unable to resolve your concern, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au.',
    ],
  },
];

export function PrivacyPolicy() {
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
            Privacy Policy
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
            Questions about this policy?{' '}
            <Link href="/contact" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Contact us
            </Link>{' '}
            or see our{' '}
            <Link href="/terms" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Terms & Conditions
            </Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
