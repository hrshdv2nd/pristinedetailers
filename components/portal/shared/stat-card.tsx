type Trend = 'up' | 'down' | 'neutral';
type Color = 'gold' | 'dark' | 'default';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: Trend;
  color?: Color;
}

export default function StatCard({ label, value, subtext, trend, color = 'default' }: StatCardProps) {
  const bg = color === 'gold' ? '#C89B37' : color === 'dark' ? '#0A0A0A' : '#fff';
  const fg = color === 'default' ? '#0A0A0A' : '#fff';
  const borderColor = color === 'default' ? '#E1DFD8' : 'transparent';

  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : null;
  const trendColor = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#7A7A76';

  return (
    <div style={{
      background: bg,
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding: '24px 24px 20px',
    }}>
      <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: color === 'default' ? '#7A7A76' : 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 600, color: fg, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </div>
      {(subtext || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
          {trend && trendIcon && (
            <span style={{ fontSize: 12, color: trendColor, fontWeight: 600 }}>{trendIcon}</span>
          )}
          {subtext && (
            <span style={{ fontSize: 12, color: color === 'default' ? '#7A7A76' : 'rgba(255,255,255,0.55)' }}>{subtext}</span>
          )}
        </div>
      )}
    </div>
  );
}
