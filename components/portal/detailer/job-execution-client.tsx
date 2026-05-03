'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { DetailerJobWithRelations } from '@/lib/types/database';
import { startJob, uploadJobPhotos, completeJob } from '@/actions/detailer';
import Topbar from '@/components/portal/layout/topbar';
import StatusBadge from '@/components/portal/shared/status-badge';

interface Props {
  job: DetailerJobWithRelations;
}

export default function JobExecutionClient({ job }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(job.status);
  const [uploading, setUploading] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [notes, setNotes] = useState('');
  const [paymentType, setPaymentType] = useState<'membership' | 'card' | 'cash'>('membership');
  const [cashAmount, setCashAmount] = useState('');
  const [error, setError] = useState('');
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const svc = job.services as { name: string; duration_minutes: number } | null;
  const customer = job.customers as { notes: string | null; profiles: { full_name: string; phone: string | null } | null } | null;
  const vehicle = job.vehicles as { make: string; model: string; year: number | null; color: string | null; license_plate: string | null; notes: string | null } | null;
  const jd = job.job_details as { before_photos?: string[]; after_photos?: string[]; started_at?: string } | null;

  async function handleStart() {
    await startJob(job.id);
    setStatus('in_progress');
  }

  async function handleUpload(type: 'before' | 'after', files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('bookingId', job.id);
      fd.append('type', type);
      const res = await fetch('/api/upload-job-photo', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) urls.push(data.url);
    }
    if (urls.length > 0) await uploadJobPhotos(job.id, type, urls);
    setUploading(false);
    router.refresh();
  }

  async function handleComplete() {
    if (!notes.trim()) { setError('Please add completion notes'); return; }
    setCompleting(true);
    setError('');
    const result = await completeJob(job.id, {
      notes,
      paymentType,
      cashAmount: paymentType === 'cash' ? parseFloat(cashAmount) : undefined,
    });
    if (result.error) {
      setError(result.error);
      setCompleting(false);
    } else {
      router.push('/detailer/jobs');
    }
  }

  return (
    <div>
      <Topbar
        title={svc?.name ?? 'Job Details'}
        subtitle={customer?.profiles?.full_name}
        action={<StatusBadge status={status} />}
      />
      <div style={{ padding: 32, maxWidth: 640, margin: '0 auto' }}>
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Customer & Vehicle */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', margin: '0 0 12px' }}>Customer</h3>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#0A0A0A' }}>{customer?.profiles?.full_name}</div>
          {customer?.profiles?.phone && <div style={{ fontSize: 14, color: '#6B6B6B', marginTop: 4 }}>📞 {customer.profiles.phone}</div>}
          {customer?.notes && <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 8, fontStyle: 'italic' }}>{customer.notes}</div>}
        </div>

        {vehicle && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', margin: '0 0 12px' }}>Vehicle</h3>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#0A0A0A' }}>{vehicle.color} {vehicle.year} {vehicle.make} {vehicle.model}</div>
            {vehicle.license_plate && <div style={{ fontSize: 14, color: '#6B6B6B', marginTop: 4 }}>Plate: {vehicle.license_plate}</div>}
            {vehicle.notes && <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 8, fontStyle: 'italic' }}>{vehicle.notes}</div>}
          </div>
        )}

        {/* Start Job */}
        {status === 'confirmed' || status === 'pending' ? (
          <button
            onClick={handleStart}
            style={{ width: '100%', padding: 14, background: '#C89B37', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 20 }}
          >
            Start Job
          </button>
        ) : null}

        {/* Photo upload */}
        {(status === 'in_progress' || status === 'completed') && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', margin: '0 0 16px' }}>Photos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {(['before', 'after'] as const).map(type => {
                const photos = type === 'before' ? jd?.before_photos : jd?.after_photos;
                return (
                  <div key={type}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8, textTransform: 'capitalize' }}>{type} Photos</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                      {(photos ?? []).map((url, i) => (
                        <img key={i} src={url} alt={type} style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 6, border: type === 'after' ? '2px solid #C89B37' : '1px solid #E5E0D8' }} />
                      ))}
                    </div>
                    <input
                      ref={type === 'before' ? beforeRef : afterRef}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={e => handleUpload(type, e.target.files)}
                    />
                    <button
                      onClick={() => (type === 'before' ? beforeRef : afterRef).current?.click()}
                      disabled={uploading}
                      style={{ padding: '6px 14px', background: '#FAFAF8', border: '1.5px dashed #C8C5BC', borderRadius: 8, fontSize: 13, cursor: 'pointer', color: '#6B6B6B' }}
                    >
                      {uploading ? 'Uploading…' : '+ Add Photos'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Job */}
        {status === 'in_progress' && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', margin: '0 0 16px' }}>Complete Job</h3>
            <textarea
              placeholder="Completion notes (required)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', background: '#FAFAF8', outline: 'none', marginBottom: 16 }}
            />
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Payment Method</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['membership', 'card', 'cash'] as const).map(pt => (
                  <button
                    key={pt}
                    onClick={() => setPaymentType(pt)}
                    style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', background: paymentType === pt ? '#0A0A0A' : '#fff', color: paymentType === pt ? '#C89B37' : '#374151', border: `1.5px solid ${paymentType === pt ? '#C89B37' : '#E5E0D8'}`, textTransform: 'capitalize' }}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>
            {paymentType === 'cash' && (
              <input
                type="number"
                placeholder="Cash amount (AUD)"
                value={cashAmount}
                onChange={e => setCashAmount(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 15, boxSizing: 'border-box', background: '#FAFAF8', outline: 'none', marginBottom: 16 }}
              />
            )}
            <button
              onClick={handleComplete}
              disabled={completing}
              style={{ width: '100%', padding: 14, background: completing ? '#9B7A28' : '#C89B37', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: completing ? 'not-allowed' : 'pointer' }}
            >
              {completing ? 'Completing…' : 'Mark as Complete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
