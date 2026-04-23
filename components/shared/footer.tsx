'use client';

export function Footer() {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        color: '#fff',
        padding: '80px 0 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: '600',
                fontSize: '22px',
                marginBottom: '20px',
              }}
            >
              <img src="/logo-flag.png" alt="Logo" style={{ width: 34, height: 34 }} />
              <span>
                Pristine<span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.55 }}>·</span>Detailers
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', maxWidth: '340px', lineHeight: 1.6, marginBottom: '28px' }}>
              Melbourne's premium mobile detailing service. Ceramic coating, paint protection film, and membership care.
            </p>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                color: '#fff',
              }}
            >
              ★ 4.9 · 240 reviews
            </div>
          </div>

          {[
            {
              title: 'Services',
              links: ['Full Detail', 'Ceramic Coating', 'Paint Protection Film', 'Interior Care', 'Add-ons'],
            },
            {
              title: 'Membership',
              links: ['Plans', 'Member Perks', 'Savings Calculator', 'Priority Booking'],
            },
            {
              title: 'Company',
              links: ['About', 'Melbourne Service Area', 'Gallery', 'Journal', 'Contact'],
            },
            {
              title: 'Portals',
              links: ['Customer', 'Detailer', 'Admin'],
            },
          ].map((section, i) => (
            <div key={i}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>{section.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.links.map((link, j) => (
                  <a
                    key={j}
                    href="#"
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <span>© 2026 Pristine Detailers · Melbourne, Australia · ABN 00 000 000 000</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>0491 108 905 · hello@pristinedetailers.com.au</span>
        </div>
      </div>
    </footer>
  );
}
