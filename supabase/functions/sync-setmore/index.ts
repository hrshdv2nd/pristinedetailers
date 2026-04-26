import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import {
  getAdminClient,
  corsHeaders,
  okJson,
  errJson,
} from '../_shared/supabase-admin.ts';
import {
  fetchSetmoreBookings,
  SETMORE_STATUS_MAP,
  buildDefaultChecklist,
} from '../_shared/setmore-client.ts';
import type { SetmoreBooking, SyncType } from '../_shared/types.ts';

// ----------------------------------------------------------------
// Entry point
// Triggered by: pg_cron (every 15 min / nightly) or manual POST
// Body: { syncType?: "incremental" | "full_historical" }
// ----------------------------------------------------------------
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }

  const supabase = getAdminClient();
  let body: { syncType?: SyncType } = {};
  try { body = await req.json(); } catch { /* cron sends no body */ }

  const syncType: SyncType = body.syncType ?? 'incremental';

  // Record this sync run
  const { data: logEntry, error: logErr } = await supabase
    .from('setmore_sync_log')
    .insert({ sync_type: syncType, triggered_by: 'cron' })
    .select('id')
    .single();

  if (logErr || !logEntry) {
    return errJson('Failed to create sync log entry');
  }
  const logId: string = logEntry.id;

  try {
    const now = new Date();

    // Date range: historical goes back 5 years; incremental covers last 7 days + next 90
    const fromDate = syncType === 'full_historical'
      ? new Date(now.getFullYear() - 5, 0, 1).toISOString().split('T')[0]
      : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const toDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    const bookings = await fetchSetmoreBookings(fromDate, toDate);

    let created = 0;
    let updated = 0;
    const errors: string[] = [];

    for (const sb of bookings) {
      try {
        const wasCreated = await upsertBooking(supabase, sb);
        if (wasCreated) created++;
        else updated++;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        errors.push(`[${sb.key}] ${msg}`);
        console.error(`Sync error for booking ${sb.key}:`, msg);
      }
    }

    await supabase.from('setmore_sync_log').update({
      status:           'success',
      completed_at:     new Date().toISOString(),
      bookings_created: created,
      bookings_updated: updated,
      errors,
    }).eq('id', logId);

    return okJson({ syncType, total: bookings.length, created, updated, errors });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from('setmore_sync_log').update({
      status:       'failed',
      completed_at: new Date().toISOString(),
      errors:       [msg],
    }).eq('id', logId);
    return errJson(msg);
  }
});

// ----------------------------------------------------------------
// Upsert a single Setmore booking into Supabase.
// Returns true if the row was newly created, false if updated.
// ----------------------------------------------------------------
async function upsertBooking(
  supabase: ReturnType<typeof getAdminClient>,
  sb: SetmoreBooking
): Promise<boolean> {

  // 1. Resolve detailer by setmore_staff_id
  const { data: detailer } = await supabase
    .from('detailers')
    .select('id')
    .eq('setmore_staff_id', sb.staff_key)
    .maybeSingle();

  // 2. Resolve service by setmore_service_id
  const { data: service } = await supabase
    .from('services')
    .select('id, base_price, name')
    .eq('setmore_service_id', sb.service_key)
    .maybeSingle();

  // 3. Resolve or ghost-create customer by email
  const customerId = await resolveOrCreateCustomer(supabase, sb.customer);

  // 4. Check if booking already exists
  const { data: existing } = await supabase
    .from('bookings')
    .select('id, status')
    .eq('setmore_booking_id', sb.key)
    .maybeSingle();

  const isNew = !existing;

  // Don't overwrite manually-set in_progress status with Setmore's confirmed
  const incomingStatus = SETMORE_STATUS_MAP[sb.label] ?? 'confirmed';
  const resolvedStatus =
    existing?.status === 'in_progress' && incomingStatus === 'confirmed'
      ? 'in_progress'
      : incomingStatus;

  // 5. Upsert booking
  const { error: upsertErr } = await supabase.from('bookings').upsert(
    {
      setmore_booking_id:    sb.key,
      customer_id:           customerId,
      detailer_id:           detailer?.id ?? null,
      service_id:            service?.id ?? null,
      status:                resolvedStatus,
      scheduled_start:       sb.start_time,
      scheduled_end:         sb.end_time,
      price:                 service?.base_price ?? null,
      customer_notes:        sb.comment ?? null,
      setmore_raw:           sb,
      synced_at:             new Date().toISOString(),
    },
    { onConflict: 'setmore_booking_id' }
  );
  if (upsertErr) throw new Error(upsertErr.message);

  // 6. Auto-create job_details shell for new bookings (trigger handles this,
  //    but we also seed checklist from service name here for new rows)
  if (isNew) {
    const { data: booking } = await supabase
      .from('bookings')
      .select('id')
      .eq('setmore_booking_id', sb.key)
      .single();

    if (booking) {
      await supabase.from('job_details').upsert(
        {
          booking_id: booking.id,
          checklist:  buildDefaultChecklist(service?.name),
        },
        { onConflict: 'booking_id', ignoreDuplicates: true }
      );
    }
  }

  return isNew;
}

// ----------------------------------------------------------------
// Find profile by email, or create a ghost profile (no auth user)
// so the booking can be stored before the customer ever signs up.
// ----------------------------------------------------------------
async function resolveOrCreateCustomer(
  supabase: ReturnType<typeof getAdminClient>,
  setmoreCustomer: SetmoreBooking['customer']
): Promise<string | null> {
  if (!setmoreCustomer?.email_id) return null;

  // 1. Match existing profile by email
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', setmoreCustomer.email_id.toLowerCase())
    .maybeSingle();

  if (profile) {
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', profile.id)
      .maybeSingle();
    if (customer) return customer.id;

    // Profile exists but no customers row — create it
    const { data: newCustomer } = await supabase
      .from('customers')
      .insert({ user_id: profile.id })
      .select('id')
      .single();
    return newCustomer?.id ?? null;
  }

  // 2. No profile found — create ghost profile (no auth.users entry)
  //    When this person signs up, the email match in handle_new_user
  //    will link their auth record to this profile.
  const ghostId = crypto.randomUUID();
  await supabase.from('profiles').insert({
    id:        ghostId,
    email:     setmoreCustomer.email_id.toLowerCase(),
    full_name: `${setmoreCustomer.first_name ?? ''} ${setmoreCustomer.last_name ?? ''}`.trim(),
    phone:     setmoreCustomer.cell_phone ?? null,
    role:      'customer',
  });

  const { data: newCustomer } = await supabase
    .from('customers')
    .insert({ user_id: ghostId })
    .select('id')
    .single();

  return newCustomer?.id ?? null;
}
