import { NextResponse } from 'next/server';

const BASE = 'https://developer.setmore.com/api/v1';
const token = process.env.SETMORE_REFRESH_TOKEN ?? '';

export async function GET() {
  const results: Record<string, unknown> = {
    tokenSet: !!token,
    tokenLength: token.length,
    tokenPrefix: token.slice(0, 6),
  };

  // Try POST with JSON body
  try {
    const r = await fetch(`${BASE}/o/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: token }),
    });
    const body = await r.text();
    results.post = { status: r.status, body: body.slice(0, 300) };
  } catch (e) {
    results.post = { error: (e as Error).message };
  }

  // Try GET with raw token (no encoding)
  try {
    const r = await fetch(`${BASE}/o/oauth2/token?refreshToken=${token}`);
    const body = await r.text();
    results.getNoEncode = { status: r.status, body: body.slice(0, 300) };
  } catch (e) {
    results.getNoEncode = { error: (e as Error).message };
  }

  // Try GET with encoded token
  try {
    const r = await fetch(`${BASE}/o/oauth2/token?refreshToken=${encodeURIComponent(token)}`);
    const body = await r.text();
    results.getEncoded = { status: r.status, body: body.slice(0, 300) };
  } catch (e) {
    results.getEncoded = { error: (e as Error).message };
  }

  return NextResponse.json(results);
}
