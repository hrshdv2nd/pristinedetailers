'use client';

import Image from 'next/image';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';
import { Placeholder } from '@/components/shared/placeholder';

type GalleryItem = { label: string; src: string | null; h: number; tone?: string };

const ITEMS: GalleryItem[] = [
  { label: 'Ceramic Coating - Classic Build', src: '/images/20250217_125148.jpg', h: 480 },
  { label: 'Full Detail - Red Sports Car', src: '/images/20250525_093249.jpg', h: 360 },
  { label: 'PPF Full Front - Satin', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/VNP04687.jpg', h: 380 },
  { label: 'Interior Detail - Alcantara', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20240822_100032.jpg', h: 340 },
  { label: 'Ceramic - Obsidian Black', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/scratch-repair.jpg', h: 420 },
  { label: 'PPF - Partial Hood', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20240905_124152.jpg', h: 300 },
  { label: 'Wheel Detail', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20250217_125148.jpg', h: 360 },
  { label: 'Graphene Coating', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/VNP04687.jpg', h: 400 },
  { label: 'PPF - Full Vehicle', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20240822_100032.jpg', h: 360 },
  { label: 'Engine Bay - Detailed & Dressed', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20240811_092247.jpg', h: 380 },
  { label: 'Ceramic Coating - Mirror Finish', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20241029_131638.jpg', h: 420 },
  { label: 'Full Detail - Showroom Ready', src: 'https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/20241029_132327.jpg', h: 340 },
];

export function Gallery() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Gallery</Eyebrow>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginTop: 20,
              maxWidth: 800,
            }}
          >
            Our{' '}
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              gallery.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 24, maxWidth: 560, lineHeight: 1.6 }}>
            Every car we touch. Ceramic coatings, PPF installs, full details, and engine bays - all documented.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#0A0A0A', padding: '24px 0' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div className="pd-four-col" style={{ gap: 0, textAlign: 'center' }}>
            {[
              { value: '2,400+', label: 'Cars detailed' },
              { value: '4.9★', label: 'Reviews' },
              { value: '8yr', label: 'Max warranty' },
              { value: '6 yrs', label: 'In Melbourne' },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '8px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 500, color: '#C89B37', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          {/* Masonry grid */}
          <div className="pd-gallery-columns" style={{ columnCount: 3, columnGap: 20 } as React.CSSProperties}>
            {ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  breakInside: 'avoid' as React.CSSProperties['breakInside'],
                  marginBottom: 20,
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  height: item.h,
                }}
              >
                {item.src ? (
                  <Image src={item.src} alt={item.label} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <Placeholder
                    label={item.label.toUpperCase()}
                    tone={(item.tone ?? 'dark') as 'dark' | 'navy' | 'light'}
                    style={{ height: item.h }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd-sect-sm" style={{ background: '#EBEAE5' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}>
            Want results like these?
          </h2>
          <p style={{ fontSize: 17, color: '#3A3A38', marginTop: 16, marginBottom: 40 }}>
            Book online in 90 seconds. We&apos;ll confirm your slot and technician within the hour.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://link.upscalerhq.com/booking/pristine-detailers" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
              Book a detail <Arrow />
            </a>
            <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 6, background: 'transparent', color: '#0A0A0A', fontSize: 14, fontWeight: 500, border: '1px solid #E1DFD8', textDecoration: 'none' }}>
              View services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
