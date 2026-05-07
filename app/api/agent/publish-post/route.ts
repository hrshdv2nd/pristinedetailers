import { NextRequest, NextResponse } from 'next/server';

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  const secret = process.env.AGENT_API_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Server misconfigured: missing Supabase credentials' }, { status: 500 });
  }

  const body = await request.json();
  const { slug, title, excerpt, body: postBody, category, read_time, agent_name, status = 'published' } = body;

  if (!slug || !title || !excerpt || !category) {
    return NextResponse.json({ error: 'Missing required fields: slug, title, excerpt, category' }, { status: 400 });
  }

  const row = {
    slug,
    title,
    excerpt,
    body: postBody ?? '',
    category,
    read_time: read_time ?? '5 min read',
    agent_name,
    status,
    ...(status === 'published' ? { published_at: new Date().toISOString() } : {}),
  };

  // Use raw fetch to bypass SDK so we see the exact Supabase REST response
  const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts?on_conflict=slug`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(row),
  });

  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json({ error: text, status: res.status }, { status: 500 });
  }

  const data = JSON.parse(text);
  return NextResponse.json({ success: true, post: data[0] ?? data });
}
