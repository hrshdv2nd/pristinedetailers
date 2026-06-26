import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { isAuthorizedAgent } from '@/lib/security';

const SYSTEM_PROMPT = `You are Jordan, Chief Marketing Officer of Pristine Detailers — Melbourne's premium mobile car detailing business.

Services: ceramic coating, paint protection film (PPF), interior care, membership-based maintenance plans.
Service area: Greater Melbourne, with a focus on South East suburbs (Clyde North, Berwick, Cranbourne, Narre Warren, Dandenong) and inner suburbs (Toorak, South Yarra, Brighton).

Your job: write one high-quality, SEO-optimised blog article to attract Melbourne car owners.

Rules:
- Write in Australian English
- 700–1000 words
- Use ## (h2) and ### (h3) headings to structure the post
- Educational and genuinely useful — not salesy
- Naturally mention Melbourne and relevant suburbs where it adds value
- End with one short call-to-action paragraph mentioning Pristine Detailers
- Target real search queries (e.g. "ceramic coating cost Melbourne", "mobile car detailing near me")
- Pick a topic NOT already covered by existing articles (listed below)
- Do NOT include any image markdown (![...](...)). Text only — images are handled separately.

Categories (pick one): Ceramic Coating | Paint Protection Film | Membership | Detailing

Return ONLY a valid JSON object — no markdown fences, no commentary, just the JSON:
{
  "title": "string — compelling SEO title",
  "slug": "string — lowercase-kebab-case, max 60 chars, no special chars",
  "excerpt": "string — 1–2 sentences, max 160 chars, describe what the reader will learn",
  "category": "string — one of the four categories above",
  "read_time": "string — e.g. '6 min read'",
  "body": "string — full article in markdown, ## and ### for headings, double newline between sections"
}`;

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getExistingTitles(): Promise<string[]> {
  try {
    const { data } = await supabaseAdmin()
      .from('blog_posts')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(30);
    return (data ?? []).map((r: { title: string }) => r.title);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAgent(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 });
  }

  // Optionally allow caller to pass a topic hint
  let topicHint = '';
  try {
    const body = await req.json().catch(() => ({}));
    topicHint = body.topic ?? '';
  } catch { /* no body */ }

  const existingTitles = await getExistingTitles();

  const userMessage = [
    existingTitles.length > 0
      ? `Existing articles (do NOT repeat these topics):\n${existingTitles.map(t => `- ${t}`).join('\n')}`
      : '',
    topicHint ? `Topic hint from editor: ${topicHint}` : '',
    'Write the next article for Pristine Detailers.',
  ].filter(Boolean).join('\n\n');

  const anthropic = new Anthropic({ apiKey });

  let raw: string;
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });
    raw = (message.content[0] as { type: string; text: string }).text;
  } catch (err) {
    console.error('[jordan] Claude error:', err);
    return NextResponse.json({ error: 'Claude generation failed' }, { status: 502 });
  }

  let post: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    read_time: string;
    body: string;
  };

  try {
    // Strip any accidental markdown fences before parsing
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    post = JSON.parse(cleaned);
  } catch (err) {
    console.error('[jordan] JSON parse error:', err, '\nRaw:', raw);
    return NextResponse.json({ error: 'Failed to parse Claude response as JSON' }, { status: 500 });
  }

  const row = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    category: post.category,
    read_time: post.read_time,
    agent_name: 'Jordan_CMO',
    status: 'published',
    published_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin()
    .from('blog_posts')
    .upsert(row, { onConflict: 'slug' })
    .select()
    .single();

  if (error) {
    console.error('[jordan] Supabase insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${post.slug}`);

  return NextResponse.json({ success: true, post: data });
}

// Vercel cron hits GET
export async function GET(req: NextRequest) {
  return POST(req);
}
