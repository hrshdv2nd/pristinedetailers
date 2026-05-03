'use client';

import { useState } from 'react';
import type { Service } from '@/lib/types/database';
import { getAvailableSlots, createBooking } from '@/actions/bookings';
import Topbar from '@/components/portal/layout/topbar';

interface Props {
  services: Service[];
}

function fmtSlot(iso: string) {
  return new Date(iso).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
}

function toDateInputValue(d: Date) {
  return d.toISOString().split('T')[0];
}

export default function BookingsClient({ services }: Props) {
  const [step, setStep] = useState<'service' | 'datetime' | 'confirm' | 'done'>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [date, setDate] = useState(toDateInputValue(new Date()));
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');

  const today = toDateInputValue(new Date());

  async function loadSlots(svcId: string, d: string) {
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    const result = await getAvailableSlots(svcId, d);
    setSlots(result);
    setLoadingSlots(false);
  }

  function selectService(svc: Service) {
    setSelectedService(svc);
    setStep('datetime');
    loadSlots(svc.id, date);
  }

  function changeDate(d: string) {
    setDate(d);
    if (selectedService) loadSlots(selectedService.id, d);
  }

  async function handleBook() {
    if (!selectedService || !selectedSlot) return;
    setBooking(true);
    setError('');
    const result = await createBooking({ serviceId: selectedService.id, slotTime: selectedSlot, notes: notes || undefined });
    if (result.error) {
      setError(result.error);
      setBooking(false);
    } else {
      setBookingId(result.bookingId ?? '');
      setStep('done');
    }
  }

  if (step === 'done') {
    return (
      <div>
        <Topbar title="Book a Service" />
        <div style={{ padding: 32, maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0A0A0A', margin: '0 0 8px' }}>Booking Confirmed!</h2>
          <p style={{ fontSize: 15, color: '#6B6B6B', margin: '0 0 24px' }}>
            Your {selectedService?.name} is booked for{' '}
            {new Date(selectedSlot!).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })} at {fmtSlot(selectedSlot!)}.
          </p>
          <a href="/dashboard" style={{ display: 'inline-block', padding: '10px 24px', background: '#C89B37', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Book a Service" subtitle="Select a service and time that works for you" />
      <div style={{ padding: 32, maxWidth: 640, margin: '0 auto' }}>
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Step: Service */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A', marginBottom: 12 }}>1. Choose a Service</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {services.map(svc => (
              <button
                key={svc.id}
                onClick={() => selectService(svc)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', background: selectedService?.id === svc.id ? '#0A0A0A' : '#fff',
                  border: `1.5px solid ${selectedService?.id === svc.id ? '#C89B37' : '#E5E0D8'}`,
                  borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: selectedService?.id === svc.id ? '#C89B37' : '#0A0A0A' }}>{svc.name}</div>
                  {svc.description && <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>{svc.description}</div>}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#C89B37' }}>${svc.base_price}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{svc.duration_minutes} min</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step: Date & Time */}
        {step !== 'service' && selectedService && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A', marginBottom: 12 }}>2. Select Date & Time</h3>
            <input
              type="date"
              value={date}
              min={today}
              onChange={e => changeDate(e.target.value)}
              style={{ padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 15, marginBottom: 16, background: '#FAFAF8', outline: 'none' }}
            />
            {loadingSlots ? (
              <p style={{ color: '#9CA3AF', fontSize: 14 }}>Loading available times…</p>
            ) : slots.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: 14 }}>No available slots for this date. Try another day.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {slots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => { setSelectedSlot(slot); setStep('confirm'); }}
                    style={{
                      padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                      background: selectedSlot === slot ? '#C89B37' : '#fff',
                      color: selectedSlot === slot ? '#fff' : '#0A0A0A',
                      border: `1.5px solid ${selectedSlot === slot ? '#C89B37' : '#E5E0D8'}`,
                    }}
                  >
                    {fmtSlot(slot)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && selectedService && selectedSlot && (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A', marginBottom: 12 }}>3. Confirm Booking</h3>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#6B6B6B', fontSize: 14 }}>Service</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{selectedService.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#6B6B6B', fontSize: 14 }}>Date</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{new Date(selectedSlot).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B6B6B', fontSize: 14 }}>Time</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{fmtSlot(selectedSlot)}</span>
              </div>
            </div>
            <textarea
              placeholder="Any notes for your detailer? (optional)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', background: '#FAFAF8', outline: 'none', marginBottom: 16 }}
            />
            <button
              onClick={handleBook}
              disabled={booking}
              style={{ width: '100%', padding: 14, background: booking ? '#9B7A28' : '#C89B37', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: booking ? 'not-allowed' : 'pointer' }}
            >
              {booking ? 'Booking…' : 'Confirm Booking'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
