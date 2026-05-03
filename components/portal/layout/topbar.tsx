'use client';

interface TopbarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function Topbar({ title, subtitle, action }: TopbarProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 32px',
      borderBottom: '1px solid #F0EDE8',
      background: '#FAFAF8',
    }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: '#0A0A0A', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 14, color: '#6B6B6B', margin: '4px 0 0' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
