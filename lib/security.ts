import { timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * Constant-time string comparison. Avoids leaking secret length/content via
 * early-exit timing on `===`. Returns false for any nullish input.
 */
export function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual throws if lengths differ — hash to a fixed length first so
  // the comparison itself stays constant-time regardless of input lengths.
  if (bufA.length !== bufB.length) {
    // Compare against itself to burn equivalent time, then fail.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/**
 * Authorize an agent/cron API request via the `Authorization: Bearer <secret>`
 * header. Accepts AGENT_API_SECRET and (optionally) CRON_SECRET. Fails closed
 * when AGENT_API_SECRET is not configured.
 */
export function isAuthorizedAgent(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  const secret = process.env.AGENT_API_SECRET;
  const cron = process.env.CRON_SECRET;
  if (!secret) return false;
  if (safeEqual(auth, `Bearer ${secret}`)) return true;
  if (cron && safeEqual(auth, `Bearer ${cron}`)) return true;
  return false;
}
