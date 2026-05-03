import type { Metadata } from 'next';
import { getPastBookings } from '@/actions/bookings';
import Topbar from '@/components/portal/layout/topbar';
import StatusBadge from '@/components/portal/shared/status-badge';

export const metadata: Metadata = { title: 'Job History — Pristine Detailers' };

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function HistoryPage() {
  const bookings = await getPastBookings(50);

  return (
    <div>
      <Topbar title="Job History" subtitle={`${bookings.length} past services`} />
      <div style={{ padding: 32 }}>
        {bookings.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, textAlign: 'center', border: '1px solid #F0EDE8' }}>
            <p style={{ color: '#6B6B6B' }}>No past bookings yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bookings.map(b => {
              const svc = b.services as { name: string } | null;
              const det = b.detailers as { profiles: { full_name: string } | null } | null;
              const jd = b.job_details as { before_photos?: string[]; after_photos?: string[]; completion_notes?: string } | null;
              return (
                <div key={b.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', overflow: 'hidden' }}>
                  <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>{svc?.name ?? 'Service'}</div>
                      <div style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4 }}>{fmt(b.scheduled_start)}</div>
                      {det?.profiles?.full_name && (
                        <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>by {det.profiles.full_name}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <StatusBadge status={b.status} />
                      {b.price && <span style={{ fontSize: 14, fontWeight: 600, color: '#C89B37' }}>${b.price}</span>}
                    </div>
                  </div>
                  {jd?.completion_notes && (
                    <div style={{ borderTop: '1px solid #F0EDE8', padding: '14px 20px', background: '#FAFAF8' }}>
                      <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}><strong>Notes:</strong> {jd.completion_notes}</p>
                    </div>
                  )}
                  {(jd?.before_photos?.length || jd?.after_photos?.length) ? (
                    <div style={{ borderTop: '1px solid #F0EDE8', padding: '14px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {jd.before_photos?.map((url, i) => (
                        <img key={`b${i}`} src={url} alt="Before" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #E5E0D8' }} />
                      ))}
                      {jd.after_photos?.map((url, i) => (
                        <img key={`a${i}`} src={url} alt="After" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, border: '2px solid #C89B37' }} />
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
