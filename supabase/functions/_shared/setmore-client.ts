import { getAdminClient } from './supabase-admin.ts';
import type { SetmoreBooking, BookingStatus } from './types.ts';

const BASE = 'https://developer.setmore.com/api/v1';

// ----------------------------------------------------------------
// Status mapping: Setmore label → our BookingStatus
// ----------------------------------------------------------------
export const SETMORE_STATUS_MAP: Record<string, BookingStatus> = {
  BOOKING_LABEL_UPCOMING:   'confirmed',
  BOOKING_LABEL_IN_PROGRESS:'in_progress',
  BOOKING_LABEL_COMPLETED:  'completed',
  BOOKING_LABEL_CANCELLED:  'cancelled',
  BOOKING_LABEL_NOSHOW:     'no_show',
};

// ----------------------------------------------------------------
// Token management (stored in Supabase Vault)
// ----------------------------------------------------------------
async function getStoredToken(name: string): Promise<string> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('vault.secrets')
    .select('secret')
    .eq('name', name)
    .single();
  if (error || !data) throw new Error(`Token "${name}" not found in Vault`);
  return data.secret;
}

async function storeToken(name: string, value: string): Promise<void> {
  const supabase = getAdminClient();
  // upsert via vault RPC
  await supabase.rpc('vault_upsert_secret', { p_name: name, p_secret: value });
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = await getStoredToken('setmore_refresh_token');
  const res = await fetch(
    `https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=${refreshToken}`,
    { method: 'GET' }
  );
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  const json = await res.json();
  const accessToken: string = json.data.token.access_token;
  await storeToken('setmore_access_token', accessToken);
  return accessToken;
}

// ----------------------------------------------------------------
// Core request helper — auto-refreshes on 401
// ----------------------------------------------------------------
export async function setmoreRequest<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = await getStoredToken('setmore_access_token');
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 401 && retry) {
    await refreshAccessToken();
    return setmoreRequest<T>(path, options, false);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Setmore ${path} → ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ----------------------------------------------------------------
// Fetch bookings for a date range (YYYY-MM-DD strings)
// ----------------------------------------------------------------
export async function fetchSetmoreBookings(
  fromDate: string,
  toDate: string
): Promise<SetmoreBooking[]> {
  const data = await setmoreRequest<{
    data: { bookings: SetmoreBooking[] };
  }>(`/bookingapi/bookings?startDate=${fromDate}&endDate=${toDate}`);
  return data?.data?.bookings ?? [];
}

// ----------------------------------------------------------------
// Build default checklist per service name
// ----------------------------------------------------------------
export function buildDefaultChecklist(serviceName?: string | null): object[] {
  const base = [
    { item: 'Vehicle inspection & pre-wash documentation', checked: false },
    { item: 'Rinse & foam pre-wash',                       checked: false },
    { item: 'Two-bucket hand wash',                        checked: false },
    { item: 'Clay bar decontamination',                    checked: false },
    { item: 'Iron & tar removal',                          checked: false },
    { item: 'Panel wipe-down (IPA)',                       checked: false },
    { item: 'Final inspection & customer walkthrough',     checked: false },
  ];

  const name = (serviceName ?? '').toLowerCase();

  if (name.includes('ceramic') || name.includes('ppf') || name.includes('coating')) {
    base.splice(5, 0,
      { item: 'Paint thickness measurement', checked: false },
      { item: 'Machine polish / paint correction', checked: false },
      { item: 'Coating / film application', checked: false },
      { item: 'Cure check', checked: false },
    );
  }

  if (name.includes('interior')) {
    base.push(
      { item: 'Interior vacuum (seats, carpets, boot)', checked: false },
      { item: 'Leather / fabric treatment', checked: false },
      { item: 'Dashboard & trim wipe-down', checked: false },
    );
  }

  return base;
}
