'use client';

import { useMemo, useState, useEffect } from 'react';
import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Placeholder } from '@/components/shared/placeholder';
import { BlobImage } from '@/components/shared/blob-image';
import { Arrow } from '@/components/shared/atoms';

const SERVICES = [
  { id: 'essential-detail', name: 'Essential Detail', price: 120, duration: '3 hrs' },
  { id: 'revitalise-detail', name: 'Revitalise Detail', price: 300, duration: '5 hrs', popular: true },
  { id: 'ceramic-3yr', name: 'Ceramic Coating', price: 750, duration: '2 days' },
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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getUpcomingDates(count = 14): Date[] {
  const dates: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (dates.length < count) {
    if (d.getDay() !== 0) dates.push(new Date(d)); // skip Sundays
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function toSetmoreDate(d: Date): string {
  // Setmore slots API expects MM/dd/yyyy
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getFullYear()}`;
}

function toSetmoreDateTime(d: Date, time24: string): string {
  // Setmore appointment API expects dd/MM/yyyy HH:mm
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()} ${time24}`;
}

function slotTo24hr(slot: string): string {
  if (!slot.includes('AM') && !slot.includes('PM')) return slot;
  const [timePart, period] = slot.split(' ');
  let [h, m] = timePart.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function slotToDisplay(slot: string): string {
  const t24 = slotTo24hr(slot);
  const [h, m] = t24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function addMinutes(d: Date, time24: string, mins: number): string {
  const [h, m] = time24.split(':').map(Number);
  const end = new Date(d);
  end.setHours(h, m + mins, 0, 0);
  const hh = String(end.getHours()).padStart(2, '0');
  const mm = String(end.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

interface SetmoreServiceData { key: string; service_name: string; duration: number }
interface SetmoreStaffData { key: string; first_name: string; last_name: string }

export function Booking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [addOns, setAddOns] = useState<string[]>([]);
  const [upsell, setUpsell] = useState(false);

  // Setmore data
  const [setmoreMap, setSetmoreMap] = useState<Record<string, string>>({});
  const [durationMap, setDurationMap] = useState<Record<string, number>>({});
  const [staffKey, setStaffKey] = useState('');
  const [staffName, setStaffName] = useState('');

  // Schedule state (lifted from StepSchedule)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [address, setAddress] = useState('');

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Submission
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Load services + staff from Setmore once
  useEffect(() => {
    fetch('/api/setmore/services')
      .then((r) => r.json())
      .then(({ services, staff }: { services: SetmoreServiceData[]; staff: SetmoreStaffData[] }) => {
        console.log('[Setmore] services:', services.map(s => ({ name: s.service_name, key: s.key })));
        console.log('[Setmore] staff:', staff.map(s => ({ name: `${s.first_name} ${s.last_name}`, key: s.key })));
        const sMap: Record<string, string> = {};
        const dMap: Record<string, number> = {};
        SERVICES.forEach((local) => {
          const lname = local.name.toLowerCase().replace(/[·\s]+/g, ' ').trim();
          const match = services.find((sm) => {
            const sname = sm.service_name.toLowerCase();
            const localWords = lname.split(' ').filter((w) => w.length > 3);
            return localWords.some((w) => sname.includes(w));
          });
          if (match) {
            sMap[local.id] = match.key;
            dMap[local.id] = match.duration;
          }
        });
        setSetmoreMap(sMap);
        setDurationMap(dMap);
        if (staff.length > 0) {
          setStaffKey(staff[0].key);
          setStaffName(`${staff[0].first_name} ${staff[0].last_name}`);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch slots when service + date changes
  useEffect(() => {
    const serviceKey = setmoreMap[service];
    if (!serviceKey || !staffKey || !selectedDate) {
      setSlots([]);
      return;
    }
    setSlotsLoading(true);
    setSelectedTime('');
    const dateStr = toSetmoreDate(selectedDate);
    fetch(`/api/setmore/slots?staffKey=${staffKey}&serviceKey=${serviceKey}&date=${dateStr}`)
      .then((r) => r.json())
      .then(({ slots: s }: { slots: string[] }) => setSlots(s ?? []))
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [service, selectedDate, setmoreMap, staffKey]);

  const sel = useMemo(() => SERVICES.find((s) => s.id === service) ?? null, [service]);
  const addTotal = useMemo(
    () => addOns.reduce((t, id) => t + (ADD_ON_LIST.find((a) => a.id === id)?.price ?? 0), 0),
    [addOns],
  );
  const upsellCost = upsell ? 1890 : 0;
  const total = (sel?.price ?? 0) + addTotal + upsellCost;

  const canContinueSchedule = !!selectedDate && !!selectedTime && !!customerName && !!customerEmail;

  async function handleConfirm() {
    if (!sel || !selectedDate || !selectedTime || !customerName || !customerEmail) return;
    setBookingLoading(true);
    setBookingError('');

    const [firstName, ...rest] = customerName.trim().split(' ');
    const lastName = rest.join(' ') || '-';
    const time24 = slotTo24hr(selectedTime);
    const startTime = toSetmoreDateTime(selectedDate, time24);
    const durationMins = durationMap[service] ?? 120;
    const endTime24 = addMinutes(selectedDate, time24, durationMins);
    const endTime = toSetmoreDateTime(selectedDate, endTime24);

    const commentParts = [
      address && `Address: ${address}`,
      addOns.length > 0 &&
        `Add-ons: ${addOns.map((id) => ADD_ON_LIST.find((a) => a.id === id)?.name).join(', ')}`,
      upsell && 'Upgrade: Ceramic 3yr',
    ].filter(Boolean);

    const res = await fetch('/api/setmore/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email: customerEmail,
        phone: customerPhone,
        serviceKey: setmoreMap[service],
        staffKey,
        startTime,
        endTime,
        comment: commentParts.join(' | '),
      }),
    });

    const data = await res.json();
    if (data.error) setBookingError(data.error);
    else setBookingSuccess(true);
    setBookingLoading(false);
  }

  const steps = ['Service', 'Upgrades', 'Schedule', 'Confirm'];

  const selectedDateDisplay = selectedDate
    ? `${DAYS[selectedDate.getDay()]} ${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]}`
    : null;

  if (bookingSuccess) {
    return (
      <div className="pd-page">
        <Nav active="booking" />
        <section style={{ padding: '80px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div className="pd-container" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--navy-soft)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 24px',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>
            <h2 style={{ fontSize: 48, fontWeight: 500, margin: '0 0 12px' }}>Booking confirmed!</h2>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              You&apos;ll receive a confirmation email at <strong>{customerEmail}</strong>. We&apos;ll text you when
              your technician is 30 minutes out.
            </p>
            {selectedDateDisplay && selectedTime && (
              <div
                style={{
                  marginTop: 32,
                  padding: '20px 24px',
                  background: '#fff',
                  borderRadius: 14,
                  border: '1px solid var(--line)',
                  display: 'inline-block',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Your appointment</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{sel?.name}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4 }}>
                  {selectedDateDisplay} · {slotToDisplay(selectedTime)}
                </div>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
              {step === 2 && (
                <StepSchedule
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  slots={slots}
                  slotsLoading={slotsLoading}
                  hasServiceKey={!!setmoreMap[service]}
                  address={address}
                  setAddress={setAddress}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  customerEmail={customerEmail}
                  setCustomerEmail={setCustomerEmail}
                  customerPhone={customerPhone}
                  setCustomerPhone={setCustomerPhone}
                />
              )}
              {step === 3 && sel && (
                <StepConfirm
                  service={sel}
                  addOns={addOns}
                  ADD_ON_LIST={ADD_ON_LIST}
                  upsell={upsell}
                  selectedDateDisplay={selectedDateDisplay}
                  selectedTime={selectedTime}
                  address={address}
                  customerName={customerName}
                  staffName={staffName}
                  total={total}
                  bookingError={bookingError}
                />
              )}

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
                    disabled={(step === 0 && !sel) || (step === 2 && !canContinueSchedule)}
                    style={{
                      opacity: (step === 0 && !sel) || (step === 2 && !canContinueSchedule) ? 0.4 : 1,
                      cursor: (step === 0 && !sel) || (step === 2 && !canContinueSchedule) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Continue <Arrow />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="pd-btn pd-btn-primary"
                    onClick={handleConfirm}
                    disabled={bookingLoading}
                    style={{ opacity: bookingLoading ? 0.6 : 1, cursor: bookingLoading ? 'not-allowed' : 'pointer' }}
                  >
                    {bookingLoading ? 'Confirming…' : `Confirm & pay $${total.toLocaleString()}`} <Arrow />
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

function StepService({
  services,
  service,
  setService,
}: {
  services: Array<{ id: string; name: string; price: number; duration: string; popular?: boolean }>;
  service: string;
  setService: (value: string) => void;
}) {
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

function StepAddons({
  ADD_ON_LIST,
  addOns,
  setAddOns,
  upsell,
  setUpsell,
}: {
  ADD_ON_LIST: Array<{ id: string; name: string; price: number }>;
  addOns: string[];
  setAddOns: (value: string[]) => void;
  upsell: boolean;
  setUpsell: (value: boolean) => void;
}) {
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
            Since we&apos;re polishing anyway, lock in 3 years of hydrophobic protection for an extra $1,890.
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

interface StepScheduleProps {
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
  slots: string[];
  slotsLoading: boolean;
  hasServiceKey: boolean;
  address: string;
  setAddress: (v: string) => void;
  customerName: string;
  setCustomerName: (v: string) => void;
  customerEmail: string;
  setCustomerEmail: (v: string) => void;
  customerPhone: string;
  setCustomerPhone: (v: string) => void;
}

function StepSchedule({
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime,
  slots, slotsLoading, hasServiceKey,
  address, setAddress,
  customerName, setCustomerName,
  customerEmail, setCustomerEmail,
  customerPhone, setCustomerPhone,
}: StepScheduleProps) {
  const dates = useMemo(() => getUpcomingDates(14), []);

  return (
    <div>
      <h2 style={{ fontSize: 56, fontWeight: 500 }}>
        When are we <span className="pd-hl">coming</span> over?
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 16 }}>Mobile service · anywhere in greater Melbourne.</p>

      {/* Date picker */}
      <div style={{ marginTop: 40 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Date</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {dates.map((d) => {
            const isSelected = selectedDate?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setSelectedDate(d)}
                style={{
                  padding: '12px 8px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  background: isSelected ? 'var(--ink)' : '#fff',
                  color: isSelected ? '#fff' : 'var(--ink)',
                  border: `1px solid ${isSelected ? 'var(--ink)' : 'var(--line)'}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 10, opacity: 0.6, fontFamily: 'var(--f-mono)', letterSpacing: '0.08em' }}>{DAYS[d.getDay()].toUpperCase()}</div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, marginTop: 4 }}>{d.getDate()}</div>
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>{MONTHS[d.getMonth()]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div style={{ marginTop: 32 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          Time slot{selectedDate ? '' : ' · select a date first'}
        </div>
        {!selectedDate ? null : slotsLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ height: 48, borderRadius: 12, background: '#F0EDE8', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : !hasServiceKey ? (
          <div style={{ fontSize: 14, color: 'var(--ink-3)', padding: '16px 0' }}>
            Service not yet linked to Setmore — please call us to book this service.
          </div>
        ) : slots.length === 0 ? (
          <div style={{ fontSize: 14, color: 'var(--ink-3)', padding: '16px 0' }}>
            No availability on this date. Please choose another day.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {slots.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                style={{
                  padding: '14px 10px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  background: selectedTime === t ? 'var(--navy)' : '#fff',
                  color: selectedTime === t ? '#fff' : 'var(--ink)',
                  border: `1px solid ${selectedTime === t ? 'var(--navy)' : 'var(--line)'}`,
                  fontFamily: 'var(--f-mono)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                }}
              >
                {slotToDisplay(t)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Address */}
      <div style={{ marginTop: 32 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Address</div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="12 Punt Rd, South Yarra VIC 3141"
          style={inputStyle}
        />
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
          Mobile service · greater Melbourne
        </div>
      </div>

      {/* Customer info */}
      <div style={{ marginTop: 40 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Your details</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Full name *</label>
              <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Alex Smith" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="04xx xxx xxx" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepConfirm({
  service,
  addOns,
  ADD_ON_LIST,
  upsell,
  selectedDateDisplay,
  selectedTime,
  address,
  customerName,
  staffName,
  total,
  bookingError,
}: {
  service: { name: string; duration: string };
  addOns: string[];
  ADD_ON_LIST: Array<{ id: string; name: string; price: number }>;
  upsell: boolean;
  selectedDateDisplay: string | null;
  selectedTime: string;
  address: string;
  customerName: string;
  staffName: string;
  total: number;
  bookingError: string;
}) {
  const whenStr = selectedDateDisplay && selectedTime
    ? `${selectedDateDisplay} · ${slotToDisplay(selectedTime)}`
    : '—';

  return (
    <div>
      <h2 style={{ fontSize: 56, fontWeight: 500 }}>
        Nearly <span className="pd-hl">pristine.</span>
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 16 }}>Review and confirm — we&apos;ll text you when your technician is 30 mins out.</p>

      <div className="pd-card" style={{ marginTop: 40, padding: 0, overflow: 'hidden' }}>
        {[
          ['Service', service.name],
          ['When', whenStr],
          ['Technician', staffName || 'To be assigned'],
          ['Address', address || '—'],
          ['Est. duration', service.duration],
          ['Add-ons', addOns.map((id) => ADD_ON_LIST.find((a) => a.id === id)?.name).filter(Boolean).join(', ') || 'None'],
          ...(upsell ? [['Upgrade', 'Ceramic 3yr coating']] : []),
          ['Name', customerName || '—'],
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

      {bookingError && (
        <div style={{ marginTop: 16, padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: 14 }}>
          {bookingError}
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid var(--line)',
  borderRadius: 12,
  background: '#fff',
  fontSize: 15,
  fontFamily: 'var(--f-sans)',
  color: 'var(--ink)',
  boxSizing: 'border-box',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--ink-3)',
  marginBottom: 6,
};
