import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function createStripeCustomer(
  email: string,
  name: string,
  metadata: Record<string, string>
): Promise<string> {
  const customer = await stripe.customers.create({ email, name, metadata });
  return customer.id;
}

export async function createMembershipCheckout(
  stripeCustomerId: string,
  stripePriceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: stripePriceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: { trial_period_days: 0 },
  });
  return session.url!;
}

export async function createBillingPortalSession(
  stripeCustomerId: string,
  returnUrl: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });
  return session.url;
}

export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription | null> {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch {
    return null;
  }
}

export async function getCustomerInvoices(
  stripeCustomerId: string,
  limit = 20
): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({ customer: stripeCustomerId, limit });
  return invoices.data;
}

export function constructWebhookEvent(
  payload: string,
  sig: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, sig, secret);
}
