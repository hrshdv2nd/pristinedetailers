'use client';

import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  read_time: string;
  author: string;
  published_at: string | null;
};

const CATEGORY_COLORS: Record<string, string> = {
  'Ceramic Coating': '#F3E8CD',
  'Paint Protection Film': '#E8EDF3',
  'Membership': '#E8F3EC',
  'Detailing': '#EBEAE5',
  'Melbourne': '#EDE8F3',
};

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Minimal markdown renderer — handles headings, images, bold, lists, paragraphs
function renderBody(markdown: string) {
  const blocks = markdown.split(/\n\n+/);

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // h2
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, color: '#0A0A0A', marginTop: 48, marginBottom: 16, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          {trimmed.slice(3)}
        </h2>
      );
    }

    // h3
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 600, color: '#0A0A0A', marginTop: 36, marginBottom: 12, lineHeight: 1.3 }}>
          {trimmed.slice(4)}
        </h3>
      );
    }

    // image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return (
        <figure key={i} style={{ margin: '40px 0', borderRadius: 16, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 520, objectFit: 'cover' }}
            loading="lazy"
          />
          {imgMatch[1] && (
            <figcaption style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76', marginTop: 8, textAlign: 'center' }}>
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
    }

    // unordered list
    if (trimmed.split('\n').every(l => l.startsWith('- ') || l.startsWith('* '))) {
      const items = trimmed.split('\n').map(l => l.slice(2));
      return (
        <ul key={i} style={{ margin: '20px 0', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, j) => (
            <li key={j} style={{ fontSize: 17, color: '#3A3A38', lineHeight: 1.7 }}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }

    // paragraph
    return (
      <p key={i} style={{ fontSize: 17, color: '#3A3A38', lineHeight: 1.75, margin: '20px 0' }}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

// Handles **bold** and inline text within a block
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 600, color: '#0A0A0A' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function JournalArticle({ post }: { post: Post }) {
  const categoryColor = CATEGORY_COLORS[post.category] ?? '#EBEAE5';

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 32px' }}>
          <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#7A7A76', fontSize: 13, textDecoration: 'none', marginBottom: 32 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}><Arrow /></span> Back to Blog
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ padding: '4px 12px', borderRadius: 999, background: categoryColor, color: '#3A3A38', fontSize: 11, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
              {post.category}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76' }}>
              {post.read_time}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76' }}>
              {formatDate(post.published_at)}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: 24 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: 19, color: '#3A3A38', lineHeight: 1.65, marginBottom: 40, borderBottom: '1px solid #E1DFD8', paddingBottom: 40 }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Body */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 32px' }}>
          {post.body ? renderBody(post.body) : (
            <p style={{ fontSize: 17, color: '#7A7A76', fontStyle: 'italic' }}>Full article coming soon.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0A0A0A', padding: '80px 32px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow style={{ color: 'rgba(255,255,255,0.4)' }}>Ready to protect your paint?</Eyebrow>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#fff', marginTop: 16, marginBottom: 24, lineHeight: 1.15 }}>
            Book a service in Melbourne.
          </h2>
          <a href="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C89B37', color: '#0A0A0A', padding: '14px 28px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            Book now <Arrow />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
