import Link from 'next/link';
import { currentOffer, isOfferActive } from '@/lib/offers';

export function OfferBar() {
  if (!isOfferActive(currentOffer)) return null;

  return (
    <Link
      href={currentOffer.ctaHref}
      style={{
        display: 'block',
        background: '#0A0A0A',
        color: '#F4F4F2',
        textAlign: 'center',
        padding: '10px 16px',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.01em',
        textDecoration: 'none',
      }}
    >
      <span style={{ marginRight: 8 }}>{currentOffer.emoji}</span>
      {currentOffer.barText}
      <span style={{ marginLeft: 8, color: '#C89B37', fontWeight: 600 }}>See offer →</span>
    </Link>
  );
}
