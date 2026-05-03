import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const stripeCustomerId = sub.customer as string;
      const status = sub.status === 'active' ? 'active' : sub.status === 'paused' ? 'paused' : 'cancelled';

      await supabase.from('customers').update({
        membership_status: status,
        membership_renews_at: new Date((sub as Stripe.Subscription & { current_period_end: number }).current_period_end * 1000).toISOString(),
      }).eq('stripe_customer_id', stripeCustomerId);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from('customers').update({ membership_status: 'cancelled' }).eq('stripe_customer_id', sub.customer as string);
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice & { customer: string; amount_paid: number };
      const { data: customer } = await supabase.from('customers').select('id').eq('stripe_customer_id', invoice.customer).single<{ id: string }>();
      if (customer) {
        await supabase.from('payments').insert({
          customer_id: customer.id,
          amount: invoice.amount_paid,
          currency: invoice.currency,
          payment_type: 'subscription',
          status: 'succeeded',
        });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice & { customer: string; amount_due: number };
      const { data: customer } = await supabase.from('customers').select('id').eq('stripe_customer_id', invoice.customer).single<{ id: string }>();
      if (customer) {
        await supabase.from('payments').insert({
          customer_id: customer.id,
          amount: invoice.amount_due,
          currency: invoice.currency,
          payment_type: 'subscription',
          status: 'failed',
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
