'use client';

import { useMemo, useState } from 'react';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Placeholder } from '@/components/shared/placeholder';
import { BlobImage } from '@/components/shared/blob-image';
import { Arrow } from '@/components/shared/atoms';

const SERVICES = [
  { id: 'essential-detail', name: 'Essential Detail', price: 120, duration: '3 hrs' },
  { id: 'revitalise-detail', name: 'Revitalise Detail', price: 300, duration: '5 hrs', popular: true },
  { id: 'ceramic-3yr', name: 'Ceramic Coating ', price: 750, duration: '2 days' },
  { id: 'ppf-full-front', name: 'PPF · Full Front', price: 2999, duration: '3 days' },
  { id: 'ppf-full-car', name: 'PPF · Full Car', price: 7549, duration: '7 days' },

];

const ADD_ON_LIST = [
  { id: 'engine', name: 'Engine Bay Detail', price: 70 },
  { id: 'leather-ceramic', name: 'Leather Ceramic Coating', price: 250 },
  { id: 'wheel-ceramic', name: 'Wheel Ceramic Coating', price: 200 },
  { id: 'glass-ceramic', name: 'Glass Ceramic Coating', price: 150 },
  { id: 'pet', name: 'Pet Hair Removal', price: 50 },
];

export function Booking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [addOns, setAddOns] = useState<string[]>([]);
  const [upsell, setUpsell] = useState(false);
  const [slot, setSlot] = useState('2026-04-24-10');

  const sel = useMemo(() => SERVICES.find((s) => s.id === service) ?? null, [service]);
  const addTotal = useMemo(
    () => addOns.reduce((total, id) => total + (ADD_ON_LIST.find((a) => a.id === id)?.price || 0), 0),
    [addOns]
  );
  const upsellCost = upsell ? 1890 : 0;
  const total = (sel?.price ?? 0) + addTotal + upsellCost;

  const steps = ['Service', 'Upgrades', 'Schedule', 'Confirm'];

  return (
    <div className="pd-page">
      <Nav active="booking" />

      <section style={{ padding: '40px 0 80px', minHeight: '80vh' }}>
        <div className="pd-container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 4, background: '#fff', borderRadius: 999, padding: 6, border: '1px solid var(--line)' }}>
              {steps.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    background: i === step ? 'var(--ink)' : 'transparent',
                    color: i === step ? '#fff' : i < step ? 'var(--ink)' : 'var(--ink-3)',
                    cursor: i <= step ? 'pointer' : 'not-allowed',
                    border: 'none',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, opacity: 0.6 }}>0{i + 1}</span>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-two-col pd-two-col-1-6" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              {step === 0 && <StepService services={SERVICES} service={service} setService={setService} />}
              {step === 1 && <StepAddons ADD_ON_LIST={ADD_ON_LIST} addOns={addOns} setAddOns={setAddOns} upsell={upsell} setUpsell={setUpsell} />}
              {step === 2 && <StepSchedule slot={slot} setSlot={setSlot} />}
              {step === 3 && sel && <StepConfirm service={sel} addOns={addOns} ADD_ON_LIST={ADD_ON_LIST} upsell={upsell} slot={slot} total={total} />}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
                <button
                  type="button"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className="pd-btn pd-btn-ghost"
                  style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
                >
                  ← Back
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="pd-btn pd-btn-dark"
                    disabled={step === 0 && !sel}
                    style={{ opacity: step === 0 && !sel ? 0.4 : 1, cursor: step === 0 && !sel ? 'not-allowed' : 'pointer' }}
                  >
                    Continue <Arrow />
                  </button>
                ) : (
                  <button type="button" className="pd-btn pd-btn-primary">
                    Confirm & pay ${total.toLocaleString()} <Arrow />
                  </button>
                )}
              </div>
            </div>

            <aside className="pd-aside-sticky" style={{ position: 'sticky', top: 100 }}>
              <div className="pd-card" style={{ padding: 28 }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Your order</div>
                <h3 style={{ fontSize: 26, fontWeight: 500, marginTop: 10 }}>{sel ? sel.name : 'No service selected'}</h3>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>{sel ? `Est. ${sel.duration}` : 'Choose a service to begin'}</div>

                <div style={{ margin: '24px 0', padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                  {sel && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0' }}>
                    <span>{sel.name}</span>
                    <span>${sel.price.toLocaleString()}</span>
                  </div>
                  )}
                  {addOns.map((id) => {
                    const addOn = ADD_ON_LIST.find((x) => x.id === id);
                    return addOn ? (
                      <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', color: 'var(--ink-2)' }}>
                        <span>+ {addOn.name}</span>
                        <span>${addOn.price}</span>
                      </div>
                    ) : null;
                  })}
                  {upsell && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', color: 'var(--navy)', fontWeight: 600 }}>
                      <span>+ Ceramic 3yr</span>
                      <span>$1,890</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Total</span>
                  <span style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em' }}>${total.toLocaleString()}</span>
                </div>

                <div style={{ marginTop: 20, padding: 16, background: 'var(--navy-soft)', borderRadius: 12, display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.45, color: 'var(--navy-deep)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>
                  <span>Becoming a <b>Signature member</b> saves $78 on this booking.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StepService({ services, service, setService }: { services: Array<{ id: string; name: string; price: number; duration: string; popular?: boolean }>; service: string; setService: (value: string) => void; }) {
  return (
    <div>
      <h2 style={{ fontSize: 56, fontWeight: 500 }}>
        What are we <span className="pd-hl">caring</span> for?
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 16 }}>Pick a service. You can add upgrades next.</p>
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setService(s.id)}
            className="pd-card"
            style={{
              textAlign: 'left',
              padding: 24,
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: 24,
              alignItems: 'center',
              background: service === s.id ? 'var(--ink)' : '#fff',
              color: service === s.id ? '#fff' : 'var(--ink)',
              borderColor: service === s.id ? 'var(--ink)' : 'var(--line)',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{s.name}</h3>
                {s.popular && (
                  <span className="pd-tag" style={{ background: 'var(--navy)', color: '#0A0A0A', border: 'none', fontSize: 10, fontWeight: 700 }}>
                    Popular
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>{s.duration}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, opacity: 0.5, fontFamily: 'var(--f-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Starting from</div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500 }}>${s.price.toLocaleString()}</div>
              </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: `2px solid ${service === s.id ? '#fff' : 'var(--line)'}`,
                background: service === s.id ? '#fff' : 'transparent',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {service === s.id && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepAddons({ ADD_ON_LIST, addOns, setAddOns, upsell, setUpsell }: { ADD_ON_LIST: Array<{ id: string; name: string; price: number }>; addOns: string[]; setAddOns: (value: string[]) => void; upsell: boolean; setUpsell: (value: boolean) => void; }) {
  const toggle = (id: string) => {
    setAddOns(addOns.includes(id) ? addOns.filter((x) => x !== id) : [...addOns, id]);
  };

  return (
    <div>
      <h2 style={{ fontSize: 56, fontWeight: 500 }}>
        Care to go <span className="pd-hl">further?</span>
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 16 }}>Add to the job. Only what you need.</p>

      <div
        style={{
          marginTop: 40,
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 20,
          padding: 28,
          display: 'flex',
          gap: 24,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BlobImage variant="c" size={120} rotate={-8} color="#C89B37">
          <Placeholder label="CERAMIC" tone="navy" style={{ width: '100%', height: '100%' }} />
        </BlobImage>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--navy-soft)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Recommended upgrade · save $200
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 500, marginTop: 8 }}>Add Ceramic 3yr to this booking</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 6, maxWidth: 460 }}>
            Since we're polishing anyway, lock in 3 years of hydrophobic protection for an extra $1,890.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setUpsell(!upsell)}
          className="pd-btn"
          style={{
            background: upsell ? '#fff' : 'transparent',
            color: upsell ? 'var(--ink)' : '#fff',
            border: upsell ? 'none' : '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {upsell ? '✓ Added' : 'Add'}
        </button>
      </div>

      <h4 style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 40, marginBottom: 16, fontWeight: 500 }}>
        Add-ons
      </h4>
      <div className="pd-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {ADD_ON_LIST.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => toggle(a.id)}
            style={{
              padding: 20,
              background: addOns.includes(a.id) ? 'var(--navy-soft)' : '#fff',
              border: `1px solid ${addOns.includes(a.id) ? 'var(--navy)' : 'var(--line)'}`,
              borderRadius: 14,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{a.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>+${a.price}</div>
            </div>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: `2px solid ${addOns.includes(a.id) ? 'var(--navy)' : 'var(--line)'}`,
                background: addOns.includes(a.id) ? 'var(--navy)' : 'transparent',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
              }}
            >
              {addOns.includes(a.id) && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepSchedule({ slot, setSlot }: { slot: string; setSlot: (value: string) => void }) {
  const dates = [
    { d: '24', day: 'Fri', mo: 'Apr', full: 'Fri 24 Apr' },
    { d: '25', day: 'Sat', mo: 'Apr', full: 'Sat 25 Apr' },
    { d: '27', day: 'Mon', mo: 'Apr', full: 'Mon 27 Apr' },
    { d: '28', day: 'Tue', mo: 'Apr', full: 'Tue 28 Apr' },
    { d: '29', day: 'Wed', mo: 'Apr', full: 'Wed 29 Apr' },
    { d: '30', day: 'Thu', mo: 'Apr', full: 'Thu 30 Apr' },
  ];
  const times = ['08:00', '10:00', '12:00', '14:00', '16:00'];
  const [selDate, setSelDate] = useState('24');
  const [selTime, setSelTime] = useState('10:00');

  return (
    <div>
      <h2 style={{ fontSize: 56, fontWeight: 500 }}>
        When are we <span className="pd-hl">coming</span> over?
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 16 }}>Mobile service · anywhere in greater Melbourne.</p>

      <div style={{ marginTop: 40 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Date</div>
        <div className="pd-date-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {dates.map((d) => (
            <button
              key={d.d}
              type="button"
              onClick={() => setSelDate(d.d)}
              style={{
                padding: 16,
                borderRadius: 14,
                cursor: 'pointer',
                background: selDate === d.d ? 'var(--ink)' : '#fff',
                color: selDate === d.d ? '#fff' : 'var(--ink)',
                border: `1px solid ${selDate === d.d ? 'var(--ink)' : 'var(--line)'}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.6, fontFamily: 'var(--f-mono)', letterSpacing: '0.1em' }}>{d.day.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500, marginTop: 4 }}>{d.d}</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{d.mo}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Time slot</div>
        <div className="pd-time-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {times.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelTime(t)}
              style={{
                padding: '14px 10px',
                borderRadius: 12,
                cursor: 'pointer',
                background: selTime === t ? 'var(--navy)' : '#fff',
                color: selTime === t ? '#fff' : 'var(--ink)',
                border: `1px solid ${selTime === t ? 'var(--navy)' : 'var(--line)'}`,
                fontFamily: 'var(--f-mono)',
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Address</div>
        <input
          type="text"
          defaultValue="12 Punt Rd, South Yarra VIC 3141"
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: 14,
            border: '1px solid var(--line)',
            background: '#fff',
            fontSize: 15,
            fontFamily: 'var(--f-sans)',
            color: 'var(--ink)',
          }}
        />
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
          In service area · standard call-out fee waived
        </div>
      </div>
    </div>
  );
}

function StepConfirm({ service, addOns, ADD_ON_LIST, upsell, slot, total }: { service: { name: string; duration: string }; addOns: string[]; ADD_ON_LIST: Array<{ id: string; name: string; price: number }>; upsell: boolean; slot: string; total: number }) {
  return (
    <div>
      <h2 style={{ fontSize: 56, fontWeight: 500 }}>
        Nearly <span className="pd-hl">pristine.</span>
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 16 }}>Review and confirm — we'll text you when your technician is 30 mins out.</p>

      <div className="pd-card" style={{ marginTop: 40, padding: 0, overflow: 'hidden' }}>
        {[
          ['Service', service.name],
          ['When', 'Fri 24 Apr · 10:00 AM'],
          ['Technician', 'Jake M. · Ceramic Pro certified'],
          ['Address', '12 Punt Rd, South Yarra VIC 3141'],
          ['Est. duration', service.duration],
          ['Add-ons', addOns.map((id) => ADD_ON_LIST.find((a) => a.id === id)?.name).filter(Boolean).join(', ') || 'None'],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '20px 28px', borderBottom: '1px solid var(--line)', fontSize: 15 }}
          >
            <span style={{ color: 'var(--ink-3)' }}>{label}</span>
            <span style={{ fontWeight: 500 }}>{value}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '24px 28px', background: 'var(--bg)', fontSize: 15, alignItems: 'center' }}>
          <span style={{ color: 'var(--ink-3)' }}>Total</span>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500 }}>${total.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ marginTop: 28, padding: 20, background: 'var(--navy-soft)', borderRadius: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
        <input type="checkbox" id="tos" defaultChecked style={{ width: 18, height: 18, accentColor: 'var(--navy)' }} />
        <label htmlFor="tos" style={{ fontSize: 13, color: 'var(--navy-deep)', lineHeight: 1.5 }}>
          I agree to the service terms and 24h cancellation policy. A 20% deposit is charged now; the balance post-service.
        </label>
      </div>
    </div>
  );
}
