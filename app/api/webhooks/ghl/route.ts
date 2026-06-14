import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ghlUpsertContact, ghlTagContact, ghlSendEmail } from '@/lib/ghl';

// GHL webhook event types we care about
const HANDLED_EVENTS = ['ContactCreate', 'ContactUpdate', 'FormSubmit', 'AppointmentCreate'];

interface GHLWebhookPayload {
  type: string;
  locationId?: string;
  contact?: {
    id?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    source?: string;
    tags?: string[];
    customFields?: { id: string; value: string }[];
  };
  form?: {
    id?: string;
    name?: string;
    submissions?: Record<string, string>;
  };
  appointment?: {
    id?: string;
    title?: string;
    startTime?: string;
    status?: string;
  };
}

const CASEY_PROMPT = `You are Casey, Email & Retention specialist for Pristine Detailers — Melbourne's premium mobile car detailing service.

A new lead has come in via our website. Write a short, warm, expert follow-up email from the Pristine Detailers team.

Rules:
- Australian English
- 120–200 words max
- Expert tone, not salesy — like a trusted car care advisor reaching out
- Mention we're mobile — we come to them (home, office, car park)
- Include a clear CTA: book via pristinedetailers.com.au or reply to this email
- No generic opener like "I hope this email finds you well"
- Reference their source if it helps personalise (e.g. "You reached out via our chat widget")

Return a JSON object:
{
  "subject": "string — compelling but not clickbait, max 60 chars",
  "body": "string — plain text email body, use \\n for line breaks"
}`;

async function generateFollowUpEmail(contact: GHLWebhookPayload['contact'], eventType: string): Promise<{ subject: string; body: string } | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const name = contact?.firstName ?? contact?.name?.split(' ')[0] ?? 'there';
  const source = contact?.source ?? 'your website';

  const userMessage = [
    `Lead name: ${name}`,
    contact?.email ? `Email: ${contact.email}` : '',
    contact?.phone ? `Phone: ${contact.phone}` : '',
    `Source: ${source}`,
    `Event: ${eventType}`,
    contact?.tags?.length ? `Tags: ${contact.tags.join(', ')}` : '',
    '\nWrite the follow-up email.',
  ].filter(Boolean).join('\n');

  try {
    const anthropic = new Anthropic({ apiKey });
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: CASEY_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });
    const raw = (message.content[0] as { type: string; text: string }).text;
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(cleaned) as { subject: string; body: string };
  } catch (err) {
    console.error('[ghl-webhook] Casey generation failed:', err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  // Optional: validate GHL webhook secret
  const webhookSecret = process.env.GHL_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = req.headers.get('x-ghl-signature') ?? req.headers.get('x-hook-secret');
    if (signature !== webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  let payload: GHLWebhookPayload;
  try {
    payload = await req.json() as GHLWebhookPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { type, contact } = payload;

  // Ignore event types we don't handle
  if (!HANDLED_EVENTS.includes(type)) {
    return NextResponse.json({ received: true, action: 'ignored', type });
  }

  console.log(`[ghl-webhook] ${type} — contact: ${contact?.email ?? contact?.phone ?? 'unknown'}`);

  const results: Record<string, unknown> = { event: type };

  // Tag the contact as a website lead
  if (contact?.id) {
    const leadTag = type === 'AppointmentCreate' ? 'appointment-lead' : 'website-lead';
    const tagResult = await ghlTagContact(contact.id, [leadTag, 'pristine-website']).catch(() => null);
    results.tagged = tagResult?.ok ?? false;
  }

  // For new contacts or form submissions: generate + send a follow-up email
  if ((type === 'ContactCreate' || type === 'FormSubmit') && contact?.email) {
    const email = await generateFollowUpEmail(contact, type);

    if (email && contact.id) {
      const sendResult = await ghlSendEmail({
        contactId: contact.id,
        subject: email.subject,
        body: email.body.replace(/\n/g, '<br>'),
        fromName: 'Pristine Detailers',
      });
      results.followup_email = {
        subject: email.subject,
        sent: sendResult.ok,
        ghl_message_id: sendResult.data.id,
      };
    } else if (email) {
      // Contact has no ID yet — upsert first to get one
      const upserted = await ghlUpsertContact({
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        source: contact.source ?? 'website-widget',
        tags: ['website-lead', 'pristine-website'],
      });
      const newId = upserted.data.contact?.id ?? upserted.data.id;
      if (newId) {
        const sendResult = await ghlSendEmail({
          contactId: newId,
          subject: email.subject,
          body: email.body.replace(/\n/g, '<br>'),
          fromName: 'Pristine Detailers',
        });
        results.followup_email = {
          subject: email.subject,
          sent: sendResult.ok,
          ghl_message_id: sendResult.data.id,
        };
      }
    }
  }

  // For appointment bookings: tag as high-intent and trigger nurture workflow
  if (type === 'AppointmentCreate' && contact?.email) {
    const workflowId = process.env.GHL_APPOINTMENT_WORKFLOW_ID;
    if (workflowId) {
      const { ghlTriggerWorkflow } = await import('@/lib/ghl');
      const wfResult = await ghlTriggerWorkflow(workflowId, contact.email).catch(() => null);
      results.workflow_triggered = wfResult?.ok ?? false;
    }
  }

  return NextResponse.json({ received: true, ...results });
}
