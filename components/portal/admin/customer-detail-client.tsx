'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CustomerWithPlan } from '@/lib/types/database';
import { addAdminNote, updateCustomerMembership } from '@/actions/admin';
import StatusBadge from '@/components/portal/shared/status-badge';
import Topbar from '@/components/portal/layout/topbar';

interface AdminNote {
  id: string;
  note: string;
  created_at: string;
  profiles: { full_name: string } | null;
}

interface Booking {
  id: string;
  scheduled_start: string;
  status: string;
  price: number | null;
  services: { name: string } | null;
  job_details: { completion_notes: string | null } | null;
}

interface Props {
  customer: CustomerWithPlan;
  notes: AdminNote[];
  bookings: Booking[];
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminCustomerClient({ customer, notes: initialNotes, bookings }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const profile = customer.profiles as { full_name: string; email: string; phone: string | null; created_at: string } | null;
  const plan = customer.membership_plans as { name: string; price_monthly: number } | null;

  async function handleAddNote() {
    if (!noteText.trim()) return;
    setSaving(true);
    await addAdminNote(customer.id, noteText.trim());
    setNotes(prev => [{ id: Date.now().toString(), note: noteText.trim(), created_at: new Date().toISOString(), profiles: { full_name: 'You' } }, ...prev]);
    setNoteText('');
    setSaving(false);
  }

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateCustomerMembership(customer.id, e.target.value as 'active' | 'paused' | 'cancelled' | 'none');
  }

  return (
    <div>
      <Topbar
        title={profile?.full_name ?? 'Customer'}
        subtitle={profile?.email}
        action={
          <Link href="/admin/customers" style={{ fontSize: 14, color: '#6B6B6B', textDecoration: 'none' }}>← All Customers</Link>
        }
      />
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div>
          {/* Profile card */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', margin: '0 0 16px' }}>Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Name', profile?.full_name],
                ['Email', profile?.email],
                ['Phone', profile?.phone ?? '—'],
                ['Member since', profile?.created_at ? fmt(profile.created_at) : '—'],
                ['Total spent', `$${customer.total_spent.toFixed(2)}`],
                ['Lifetime visits', String(customer.lifetime_visits)],
              ].map(([label, val]) => (
                <div key={label as string}>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', margin: '0 0 16px' }}>Membership</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>{plan?.name ?? 'No plan'}</div>
                {plan?.price_monthly && <div style={{ fontSize: 13, color: '#6B6B6B' }}>${plan.price_monthly}/mo</div>}
              </div>
              <StatusBadge status={customer.membership_status} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>Change Status</label>
              <select
                defaultValue={customer.membership_status}
                onChange={handleStatusChange}
                style={{ padding: '8px 12px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, background: '#FAFAF8', outline: 'none' }}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          {/* Booking history */}
          {bookings.length > 0 && (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EDE8' }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', margin: 0 }}>Booking History</h3>
              </div>
              {bookings.map((b, i) => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderTop: i > 0 ? '1px solid #F0EDE8' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{b.services?.name ?? 'Service'}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{fmt(b.scheduled_start)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <StatusBadge status={b.status} />
                    {b.price && <span style={{ fontSize: 14, fontWeight: 600, color: '#C89B37' }}>${b.price}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — notes */}
        <div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', margin: '0 0 16px' }}>Admin Notes</h3>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Add a note…"
              rows={3}
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', background: '#FAFAF8', outline: 'none', marginBottom: 10 }}
            />
            <button
              onClick={handleAddNote}
              disabled={saving || !noteText.trim()}
              style={{ width: '100%', padding: '9px', background: saving || !noteText.trim() ? '#E5E0D8' : '#C89B37', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: saving || !noteText.trim() ? 'not-allowed' : 'pointer', marginBottom: 16 }}
            >
              {saving ? 'Saving…' : 'Add Note'}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notes.map(n => (
                <div key={n.id} style={{ background: '#FAFAF8', borderRadius: 8, padding: 12, border: '1px solid #F0EDE8' }}>
                  <p style={{ fontSize: 13, color: '#374151', margin: '0 0 8px', lineHeight: 1.5 }}>{n.note}</p>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>
                    {n.profiles?.full_name ?? 'Admin'} · {fmt(n.created_at)}
                  </div>
                </div>
              ))}
              {notes.length === 0 && <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0 }}>No notes yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
