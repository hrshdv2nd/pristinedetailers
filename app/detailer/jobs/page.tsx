import type { Metadata } from 'next';
import Link from 'next/link';
import { getMyJobs } from '@/actions/detailer';
import Topbar from '@/components/portal/layout/topbar';
import StatusBadge from '@/components/portal/shared/status-badge';

export const metadata: Metadata = { title: 'My Jobs — Pristine Detailers' };

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default async function JobsPage() {
  const jobs = await getMyJobs();

  const today = jobs.filter(j => {
    const d = new Date(j.scheduled_start);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });
  const upcoming = jobs.filter(j => {
    const d = new Date(j.scheduled_start);
    const now = new Date();
    return d.toDateString() !== now.toDateString();
  });

  return (
    <div>
      <Topbar title="My Jobs" subtitle={`${jobs.length} upcoming`} />
      <div style={{ padding: 32 }}>
        {jobs.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, textAlign: 'center', border: '1px solid #F0EDE8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚗</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', margin: '0 0 8px' }}>No upcoming jobs</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', margin: 0 }}>Your schedule is clear.</p>
          </div>
        ) : (
          <>
            {today.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C89B37', marginBottom: 12 }}>Today</h2>
                <JobList jobs={today} />
              </div>
            )}
            {upcoming.length > 0 && (
              <div>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 12 }}>Upcoming</h2>
                <JobList jobs={upcoming} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function JobList({ jobs }: { jobs: Awaited<ReturnType<typeof getMyJobs>> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {jobs.map(job => {
        const svc = job.services as { name: string; duration_minutes: number } | null;
        const customer = job.customers as { notes: string | null; profiles: { full_name: string; phone: string | null } | null } | null;
        const vehicle = job.vehicles as { make: string; model: string; year: number | null; color: string | null } | null;

        return (
          <Link key={job.id} href={`/detailer/jobs/${job.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: '1px solid #F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>{customer?.profiles?.full_name ?? 'Customer'}</span>
                  <StatusBadge status={job.status} />
                </div>
                <div style={{ fontSize: 13, color: '#6B6B6B' }}>{svc?.name} · {fmt(job.scheduled_start)}</div>
                {vehicle && (
                  <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>
                    {vehicle.color} {vehicle.year} {vehicle.make} {vehicle.model}
                  </div>
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
