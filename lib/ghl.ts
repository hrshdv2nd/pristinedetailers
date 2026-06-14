const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function headers() {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error('GHL_API_KEY not set');
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Version: GHL_VERSION,
  };
}

function locationId() {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error('GHL_LOCATION_ID not set');
  return id;
}

export interface GHLContact {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  tags?: string[];
  source?: string;
  customFields?: { id: string; value: string }[];
}

export interface GHLSocialPostPayload {
  caption: string;
  imageUrl?: string;
  platforms: ('facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'twitter')[];
  scheduledAt?: string; // ISO 8601 — omit to post immediately
}

// Post to GHL Social Planner
export async function ghlScheduleSocialPost(payload: GHLSocialPostPayload) {
  const locId = locationId();
  const body: Record<string, unknown> = {
    type: 'post',
    status: payload.scheduledAt ? 'scheduled' : 'draft',
    platforms: payload.platforms,
    ...(payload.scheduledAt ? { scheduledAt: payload.scheduledAt } : {}),
    content: {
      message: payload.caption,
      ...(payload.imageUrl ? { imageUrl: payload.imageUrl } : {}),
    },
  };

  const res = await fetch(`${GHL_BASE}/social-media-posting/${locId}/posts`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  const data = await res.json() as { id?: string; error?: string; message?: string };
  return { ok: res.ok, status: res.status, data };
}

// Trigger a GHL workflow for a contact by email
export async function ghlTriggerWorkflow(workflowId: string, contactEmail: string) {
  const locId = locationId();

  const res = await fetch(`${GHL_BASE}/workflows/${workflowId}/subscribe`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ locationId: locId, email: contactEmail }),
  });

  const data = await res.json() as { id?: string; error?: string; message?: string };
  return { ok: res.ok, status: res.status, data };
}

// Create or update a contact in GHL CRM
export async function ghlUpsertContact(contact: GHLContact) {
  const locId = locationId();

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ locationId: locId, ...contact }),
  });

  const data = await res.json() as { contact?: { id: string }; id?: string; error?: string; message?: string };
  return { ok: res.ok, status: res.status, data };
}

// Add tags to a contact by ID
export async function ghlTagContact(contactId: string, tags: string[]) {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ tags }),
  });

  const data = await res.json() as { tags?: string[]; error?: string };
  return { ok: res.ok, status: res.status, data };
}

// Send an internal note/email to a contact via GHL conversations
export async function ghlSendEmail(payload: {
  contactId: string;
  subject: string;
  body: string;
  fromName?: string;
}) {
  const locId = locationId();

  const res = await fetch(`${GHL_BASE}/conversations/messages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      type: 'Email',
      locationId: locId,
      contactId: payload.contactId,
      subject: payload.subject,
      html: payload.body,
      ...(payload.fromName ? { fromName: payload.fromName } : {}),
    }),
  });

  const data = await res.json() as { id?: string; error?: string; message?: string };
  return { ok: res.ok, status: res.status, data };
}
