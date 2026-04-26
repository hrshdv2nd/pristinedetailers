import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

// Protected route prefixes and which roles may access them
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/dashboard': ['customer', 'admin'],
  '/detailer':  ['detailer', 'admin'],
  '/admin':     ['admin'],
};

export async function middleware(request: NextRequest) {
  // 1. Refresh the session cookie on every request (Supabase SSR requirement)
  const { supabase, supabaseResponse } = createClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 2. Role-based route protection
  for (const [prefix, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (!pathname.startsWith(prefix)) continue;

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<{ role: string }>();

    const role = profile?.role ?? 'customer';

    if (!allowedRoles.includes(role)) {
      const dashboardMap: Record<string, string> = {
        customer: '/dashboard',
        detailer: '/detailer/jobs',
        admin:    '/admin',
      };
      const url = request.nextUrl.clone();
      url.pathname = dashboardMap[role] ?? '/';
      return NextResponse.redirect(url);
    }

    break;
  }

  // 3. Always return the Supabase response so cookies are forwarded
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)',
  ],
};
