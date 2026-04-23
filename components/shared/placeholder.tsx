'use client';

export function Placeholder({
  label,
  tone = 'light',
  className = '',
  style = {},
}: {
  label: string;
  tone?: 'light' | 'dark' | 'navy';
  className?: string;
  style?: React.CSSProperties;
}) {
  const toneClass = {
    dark: 'pd-ph-dark',
    navy: 'pd-ph-navy',
    light: '',
  }[tone];

  return (
    <div
      className={`pd-ph ${toneClass} ${className}`}
      style={{
        position: 'relative',
        background:
          tone === 'dark'
            ? 'repeating-linear-gradient(135deg, #1A1A1A 0 14px, #232323 14px 28px)'
            : tone === 'navy'
            ? 'repeating-linear-gradient(135deg, #C89B37 0 14px, #B0862C 14px 28px)'
            : 'repeating-linear-gradient(135deg, #D9D6CE 0 14px, #CFCCC3 14px 28px)',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        color: tone === 'light' ? 'rgba(10,10,10,0.55)' : 'rgba(255,255,255,0.9)',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background:
            tone === 'light'
              ? 'rgba(244,244,242,0.85)'
              : 'rgba(0,0,0,0.3)',
          padding: '6px 12px',
          borderRadius: '999px',
          backdropFilter: 'blur(6px)',
          color: tone === 'light' ? 'rgba(10,10,10,0.55)' : 'rgba(255,255,255,0.9)',
        }}
      >
        {label}
      </span>
    </div>
  );
}
