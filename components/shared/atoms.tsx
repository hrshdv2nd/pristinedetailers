'use client';

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function Eyebrow({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return null;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: '500',
          fontSize: '48px',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '14px', color: '#7A7A76', marginTop: '8px' }}>{label}</div>
    </div>
  );
}

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pristine.detailers/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/pristine.detailers20',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
];

export function SocialLinks({
  style = {},
  iconStyle = {},
}: {
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}) {
  return (
    <div style={{ display: 'flex', gap: '12px', ...style }}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.8)',
            transition: 'color 0.2s, border-color 0.2s',
            ...iconStyle,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#fff';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
