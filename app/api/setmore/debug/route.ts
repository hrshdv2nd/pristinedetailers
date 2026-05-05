import { NextResponse } from 'next/server';

const BASE = 'https://developer.setmore.com/api/v1';

export async function GET() {
  const refreshToken = process.env.SETMORE_REFRESH_TOKEN ?? '';
  const out: Record<string, unknown> = { tokenSet: !!refreshToken, tokenLength: refreshToken.length };

  // 1. Get access token
  let accessToken = '';
  try {
    const r = await fetch(`${BASE}/o/oauth2/token?refreshToken=${refreshToken}`);
    const body = await r.json();
    out.auth = { status: r.status, response: body.response };
    accessToken = body?.data?.token?.access_token ?? '';
    out.gotAccessToken = !!accessToken;
  } catch (e) {
    out.authError = (e as Error).message;
    return NextResponse.json(out);
  }

  const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

  // 2. Get services
  try {
    const r = await fetch(`${BASE}/bookingapi/services`, { headers });
    const body = await r.json();
    out.services = { status: r.status, response: body.response, data: body.data };
  } catch (e) {
    out.servicesError = (e as Error).message;
  }

  // 3. Get staff
  try {
    const r = await fetch(`${BASE}/bookingapi/staff`, { headers });
    const body = await r.json();
    out.staff = { status: r.status, response: body.response, data: body.data };
  } catch (e) {
    out.staffError = (e as Error).message;
  }

  return NextResponse.json(out);
}
