import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJobDetail } from '@/actions/detailer';
import JobExecutionClient from '@/components/portal/detailer/job-execution-client';

export const metadata: Metadata = { title: 'Job Details — Pristine Detailers' };

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobDetail(id);
  if (!job) notFound();
  return <JobExecutionClient job={job} />;
}
