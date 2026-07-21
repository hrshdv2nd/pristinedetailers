export type Offer = {
  slug: string;
  badge: string;
  emoji: string;
  barText: string;
  headline: string;
  subhead: string;
  price: string;
  priceNote: string;
  expiresAt: string; // ISO date, e.g. '2026-08-31' — inclusive, offer is active through this whole day
  ctaHref: string;
};

export const currentOffer: Offer = {
  slug: 'ceramic-tint-2026-08',
  badge: 'Ceramic Coating Package',
  emoji: '🚗✨',
  barText: 'FREE window tinting with every Ceramic Coating Package — this month only',
  headline: 'Free Window Tinting',
  subhead: 'Receive a free window tinting on every Ceramic Coating Package — till the end of August.',
  price: 'From $999',
  priceNote: 'Ceramic Coating + Tinting Packages',
  expiresAt: '2026-08-31',
  ctaHref: '/promo',
};

export function isOfferActive(offer: Offer, now: Date = new Date()): boolean {
  return now <= new Date(`${offer.expiresAt}T23:59:59`);
}

export function formatExpiryDate(offer: Offer): string {
  return new Date(`${offer.expiresAt}T00:00:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
