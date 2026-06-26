import { NextRequest, NextResponse } from 'next/server';
import { ghlScheduleSocialPost } from '@/lib/ghl';
import { isAuthorizedAgent } from '@/lib/security';

interface PublishPayload {
  instagram_caption: string;
  facebook_caption: string;
  linkedin_caption: string;
  image_url?: string;
  scheduled_at?: string; // ISO 8601 — omit to post immediately
}

interface PlatformResult {
  success: boolean;
  postId?: string;
  id?: string;
  error?: string;
}

function ghlError(data: { error?: string; message?: string | string[] }): string | undefined {
  const message = Array.isArray(data.message) ? data.message.join('; ') : data.message;
  return message ?? data.error;
}


async function publishToFacebook(caption: string, imageUrl?: string): Promise<PlatformResult> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) {
    return { success: false, error: 'FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_PAGE_ID not set' };
  }

  try {
    const endpoint = imageUrl
      ? `https://graph.facebook.com/v19.0/${pageId}/photos`
      : `https://graph.facebook.com/v19.0/${pageId}/feed`;
    const body: Record<string, string> = { message: caption, access_token: token };
    if (imageUrl) body.url = imageUrl;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json() as { id?: string; error?: { message: string } };
    if (data.id) return { success: true, postId: data.id };
    return { success: false, error: data.error?.message ?? 'Unknown Facebook error' };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

async function publishToInstagram(caption: string, imageUrl?: string): Promise<PlatformResult> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const igId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !igId) {
    return { success: false, error: 'FACEBOOK_PAGE_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID not set' };
  }
  if (!imageUrl) {
    return { success: false, error: 'Instagram requires an image_url' };
  }

  try {
    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl, caption, access_token: token }),
    });
    const container = await containerRes.json() as { id?: string; error?: { message: string } };
    if (!container.id) {
      return { success: false, error: container.error?.message ?? 'Failed to create Instagram media container' };
    }

    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: container.id, access_token: token }),
    });
    const published = await publishRes.json() as { id?: string; error?: { message: string } };
    if (published.id) return { success: true, postId: published.id };
    return { success: false, error: published.error?.message ?? 'Failed to publish to Instagram' };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAgent(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: PublishPayload;
  try {
    body = await req.json() as PublishPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { instagram_caption, facebook_caption, linkedin_caption, image_url, scheduled_at } = body;

  if (!instagram_caption || !facebook_caption || !linkedin_caption) {
    return NextResponse.json(
      { error: 'Missing required fields: instagram_caption, facebook_caption, linkedin_caption' },
      { status: 400 }
    );
  }

  const ghlConfigured = !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
  const fbConfigured = !!(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.FACEBOOK_PAGE_ID);
  const igConfigured = !!(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID);

  const [facebook, instagram, ghlFbIg, ghlLinkedIn] = await Promise.all([
    fbConfigured
      ? publishToFacebook(facebook_caption, image_url)
      : Promise.resolve({ success: false, error: 'skipped — FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_PAGE_ID not set' }),

    igConfigured
      ? publishToInstagram(instagram_caption, image_url)
      : Promise.resolve({ success: false, error: 'skipped — FACEBOOK_PAGE_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID not set' }),

    ghlConfigured
      ? ghlScheduleSocialPost({
          caption: facebook_caption,
          imageUrl: image_url,
          // omit accountIds → defaults to GHL_FACEBOOK_ACCOUNT_ID + GHL_INSTAGRAM_ACCOUNT_ID
          scheduledDate: scheduled_at,
        })
          .then((r) => ({ success: r.ok, id: r.data.id, error: ghlError(r.data) }))
          .catch((e) => ({ success: false, error: String(e) }))
      : Promise.resolve({ success: false, error: 'skipped — GHL_API_KEY or GHL_LOCATION_ID not set' }),

    ghlConfigured
      ? ghlScheduleSocialPost({
          caption: linkedin_caption,
          accountIds: [process.env.GHL_LINKEDIN_ACCOUNT_ID].filter(Boolean) as string[],
          scheduledDate: scheduled_at,
        })
          .then((r) => ({ success: r.ok, id: r.data.id, error: ghlError(r.data) }))
          .catch((e) => ({ success: false, error: String(e) }))
      : Promise.resolve({ success: false, error: 'skipped — GHL_API_KEY or GHL_LOCATION_ID not set' }),
  ]);

  return NextResponse.json({
    success: true,
    results: {
      facebook_direct: facebook,
      instagram_direct: instagram,
      ghl_facebook_instagram: ghlFbIg,
      ghl_linkedin: ghlLinkedIn,
    },
  });
}
