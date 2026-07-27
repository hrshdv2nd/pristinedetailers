import { NextRequest, NextResponse } from 'next/server';
import { ghlScheduleSocialPost } from '@/lib/ghl';
import { isAuthorizedAgent } from '@/lib/security';

interface PublishPayload {
  instagram_caption: string;
  facebook_caption: string;
  linkedin_caption: string;
  image_url?: string;
}

interface GHLPublishResult {
  success: boolean;
  id?: string;
  error?: string;
}

function ghlError(data: { error?: string; message?: string | string[] }): string | undefined {
  const message = Array.isArray(data.message) ? data.message.join('; ') : data.message;
  return message ?? data.error;
}

// Always saves as a draft in GHL Social Planner — never posts live or auto-schedules.
// A human must open GHL and publish/schedule it themselves.
async function draftToGHL(caption: string, accountId: string | undefined, imageUrl?: string): Promise<GHLPublishResult> {
  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    return { success: false, error: 'skipped — GHL_API_KEY or GHL_LOCATION_ID not set' };
  }
  if (!accountId) {
    return { success: false, error: 'skipped — account not configured' };
  }
  try {
    const result = await ghlScheduleSocialPost({
      caption,
      imageUrl,
      accountIds: [accountId],
      // no scheduledDate → GHL saves it as a draft, not scheduled/published
    });
    return { success: result.ok, id: result.data.id, error: result.ok ? undefined : ghlError(result.data) };
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

  const { instagram_caption, facebook_caption, linkedin_caption, image_url } = body;

  if (!instagram_caption || !facebook_caption || !linkedin_caption) {
    return NextResponse.json(
      { error: 'Missing required fields: instagram_caption, facebook_caption, linkedin_caption' },
      { status: 400 }
    );
  }

  const [facebook, instagram, linkedin] = await Promise.all([
    draftToGHL(facebook_caption, process.env.GHL_FACEBOOK_ACCOUNT_ID, image_url),
    draftToGHL(instagram_caption, process.env.GHL_INSTAGRAM_ACCOUNT_ID, image_url),
    draftToGHL(linkedin_caption, process.env.GHL_LINKEDIN_ACCOUNT_ID),
  ]);

  return NextResponse.json({
    success: true,
    results: { facebook, instagram, linkedin },
  });
}
