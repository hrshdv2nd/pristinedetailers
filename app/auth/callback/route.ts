import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  // In production behind Vercel's reverse proxy, use the forwarded host
  const forwardedHost = request.headers.get('x-forwarded-host');
  const baseUrl = process.env.NODE_ENV === 'production' && forwardedHost
    ? `https://${forwardedHost}`
    : origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single<{ role: string }>();
        const dest = profile?.role === 'admin' ? '/admin' : profile?.role === 'detailer' ? '/detailer/jobs' : '/dashboard';
        return NextResponse.redirect(`${baseUrl}${dest}`);
      }
    }
  }

  return NextResponse.redirect(`${baseUrl}/login?error=auth_failed`);
}
