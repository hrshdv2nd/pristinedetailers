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
  return (
    <div
      className="pd-eyebrow"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        fontWeight: '500',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#7A7A76',
        ...style,
      }}
    >
      {children}
    </div>
  );
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
