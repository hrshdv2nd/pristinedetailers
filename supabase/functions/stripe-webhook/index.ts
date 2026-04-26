import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import {
  getAdminClient,
  corsHeaders,
  okJson,
  errJson,
} from '../_shared/supabase-admin.ts';

// ----------------------------------------------------------------
// Stripe Webhook receiver
// Endpoint: POST /functions/v1/stripe-webhook
//
// Register this URL in Stripe Dashboard → Webhooks.
// Enable events: payment_intent.succeeded, payment_intent.payment_failed,
//                customer.subscription.created, customer.subscription.updated,
//                customer.subscription.deleted, invoice.paid
// ----------------------------------------------------------------
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }

  const stripeSignature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const rawBody = await req.text();

  // Verify Stripe signature
  if (!stripeSignature || !webhookSecret) {
    return errJson('Missing Stripe signature', 400);
  }

  // Lightweight HMAC verification (production: use stripe-js/stripe-node)
  const isValid = await verifyStripeSignature(rawBody, stripeSignature, webhookSecret);
  if (!isValid) return errJson('Invalid Stripe signature', 401);

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return errJson('Invalid JSON', 400);
  }

  const supabase = getAdminClient();

  try {
    switch (event.type) {
      // ---- One-time payment succeeded ----
      case 'payment_intent.succeeded': {
        const pi = event.data.object as {
          id: string; amount: number; currency: string;
          metadata?: { customer_id?: string; booking_id?: string };
        };
        if (pi.metadata?.customer_id) {
          await supabase.from('payments').upsert(
            {
              customer_id:       pi.metadata.customer_id,
              booking_id:        pi.metadata.booking_id ?? null,
              amount:            pi.amount / 100,
              currency:          pi.currency.toUpperCase(),
              payment_type:      'one_time',
              status:            'succeeded',
              stripe_payment_id: pi.id,
            },
            { onConflict: 'stripe_payment_id' }
          );

          // Update booking total_spent on customer
          if (pi.metadata.booking_id) {
            await supabase.rpc('increment_customer_visits', {
              booking_id: pi.metadata.booking_id,
            });
          }
        }
        break;
      }

      // ---- One-time payment failed ----
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as {
          id: string; amount: number; currency: string;
          metadata?: { customer_id?: string };
        };
        if (pi.metadata?.customer_id) {
          await supabase.from('payments').upsert(
            {
              customer_id:       pi.metadata.customer_id,
              amount:            pi.amount / 100,
              currency:          pi.currency.toUpperCase(),
              payment_type:      'one_time',
              status:            'failed',
              stripe_payment_id: pi.id,
            },
            { onConflict: 'stripe_payment_id' }
          );
        }
        break;
      }

      // ---- Subscription invoice paid (recurring membership) ----
      case 'invoice.paid': {
        const inv = event.data.object as {
          id: string; amount_paid: number; currency: string;
          customer: string; subscription: string;
          lines: { data: Array<{ price: { id: string } }> };
        };

        // Find customer by stripe_customer_id
        const { data: customer } = await supabase
          .from('customers')
          .select('id, membership_plan_id')
          .eq('stripe_customer_id', inv.customer)
          .maybeSingle();

        if (customer) {
          await supabase.from('payments').insert({
            customer_id:        customer.id,
            membership_plan_id: customer.membership_plan_id,
            amount:             inv.amount_paid / 100,
            currency:           inv.currency.toUpperCase(),
            payment_type:       'subscription',
            status:             'succeeded',
            stripe_invoice_id:  inv.id,
          });

          // Extend membership renewal date by 1 month
          await supabase
            .from('customers')
            .update({
              membership_status:    'active',
              membership_renews_at: new Date(
                Date.now() + 31 * 24 * 60 * 60 * 1000
              ).toISOString(),
            })
            .eq('id', customer.id);
        }
        break;
      }

      // ---- Subscription cancelled ----
      case 'customer.subscription.deleted': {
        const sub = event.data.object as { customer: string };
        await supabase
          .from('customers')
          .update({ membership_status: 'cancelled' })
          .eq('stripe_customer_id', sub.customer);
        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return okJson({ received: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Stripe webhook error:', msg);
    return errJson(msg);
  }
});

// ----------------------------------------------------------------
// HMAC-SHA256 signature verification for Stripe webhooks
// ----------------------------------------------------------------
async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const sigParts = Object.fromEntries(
      signature.split(',').map((p) => p.split('=') as [string, string])
    );
    const timestamp = sigParts['t'];
    const sigHash   = sigParts['v1'];
    if (!timestamp || !sigHash) return false;

    const signedPayload = `${timestamp}.${payload}`;
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(signedPayload)
    );
    const computed = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return computed === sigHash;
  } catch {
    return false;
  }
}
