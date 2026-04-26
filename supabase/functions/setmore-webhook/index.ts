import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import {
  getAdminClient,
  corsHeaders,
  okJson,
  errJson,
} from '../_shared/supabase-admin.ts';
import { SETMORE_STATUS_MAP, buildDefaultChecklist } from '../_shared/setmore-client.ts';
import type { SetmoreWebhookEvent } from '../_shared/types.ts';

// ----------------------------------------------------------------
// Setmore Webhook receiver
// Endpoint: POST /functions/v1/setmore-webhook
//
// Register this URL in Setmore → Integrations → Webhooks.
// Setmore fires events for: BOOKING_CREATED, BOOKING_UPDATED,
// BOOKING_CANCELLED, BOOKING_DELETED.
// ----------------------------------------------------------------
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }

  // Verify webhook secret (set SETMORE_WEBHOOK_SECRET in Supabase secrets)
  const incomingSecret = req.headers.get('x-setmore-webhook-secret');
  const expectedSecret = Deno.env.get('SETMORE_WEBHOOK_SECRET');
  if (expectedSecret && incomingSecret !== expectedSecret) {
    return errJson('Unauthorized', 401);
  }

  let event: SetmoreWebhookEvent;
  try {
    event = await req.json();
  } catch {
    return errJson('Invalid JSON body', 400);
  }

  const supabase = getAdminClient();
  const booking = event?.data?.booking;
  if (!booking?.key) return errJson('Missing booking key', 400);

  console.log(`Webhook: ${event.type} → booking ${booking.key}`);

  try {
    switch (event.type) {
      case 'BOOKING_CREATED':
      case 'BOOKING_UPDATED': {
        // Resolve detailer
        const { data: detailer } = await supabase
          .from('detailers')
          .select('id')
          .eq('setmore_staff_id', booking.staff_key)
          .maybeSingle();

        // Resolve service
        const { data: service } = await supabase
          .from('services')
          .select('id, base_price, name')
          .eq('setmore_service_id', booking.service_key)
          .maybeSingle();

        // Resolve customer
        const customerId = await resolveCustomer(supabase, booking.customer);

        // Check for existing booking
        const { data: existing } = await supabase
          .from('bookings')
          .select('id, status')
          .eq('setmore_booking_id', booking.key)
          .maybeSingle();

        const incomingStatus = SETMORE_STATUS_MAP[booking.label] ?? 'confirmed';
        const resolvedStatus =
          existing?.status === 'in_progress' && incomingStatus === 'confirmed'
            ? 'in_progress'
            : incomingStatus;

        await supabase.from('bookings').upsert(
          {
            setmore_booking_id: booking.key,
            customer_id:        customerId,
            detailer_id:        detailer?.id ?? null,
            service_id:         service?.id ?? null,
            status:             resolvedStatus,
            scheduled_start:    booking.start_time,
            scheduled_end:      booking.end_time,
            price:              service?.base_price ?? null,
            customer_notes:     booking.comment ?? null,
            setmore_raw:        booking,
            synced_at:          new Date().toISOString(),
          },
          { onConflict: 'setmore_booking_id' }
        );

        // Seed job_details for new bookings
        if (!existing) {
          const { data: newBooking } = await supabase
            .from('bookings')
            .select('id')
            .eq('setmore_booking_id', booking.key)
            .single();

          if (newBooking) {
            await supabase.from('job_details').upsert(
              {
                booking_id: newBooking.id,
                checklist:  buildDefaultChecklist(service?.name),
              },
              { onConflict: 'booking_id', ignoreDuplicates: true }
            );
          }
        }
        break;
      }

      case 'BOOKING_CANCELLED':
      case 'BOOKING_DELETED': {
        await supabase
          .from('bookings')
          .update({
            status:    'cancelled',
            synced_at: new Date().toISOString(),
          })
          .eq('setmore_booking_id', booking.key);
        break;
      }

      default:
        console.warn(`Unhandled Setmore event type: ${event.type}`);
    }

    return okJson({ received: true, event: event.type });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Webhook processing error:', msg);
    return errJson(msg);
  }
});

async function resolveCustomer(
  supabase: ReturnType<typeof getAdminClient>,
  setmoreCustomer: SetmoreWebhookEvent['data']['booking']['customer']
): Promise<string | null> {
  if (!setmoreCustomer?.email_id) return null;

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

    const { data: newCustomer } = await supabase
      .from('customers')
      .insert({ user_id: profile.id })
      .select('id')
      .single();
    return newCustomer?.id ?? null;
  }

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
