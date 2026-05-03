export interface SetmoreAppointment {
  key: string;
  service_key: string;
  staff_key: string;
  customer_key: string;
  start_time: string;
  end_time: string;
  label: string;
  status: string;
  location_id?: string;
}

export interface SetmoreStaff {
  key: string;
  first_name: string;
  last_name: string;
  email: string;
  image_url?: string;
}

export interface SetmoreService {
  key: string;
  service_name: string;
  duration: number;
  price: number;
  description?: string;
}

export interface CreateAppointmentParams {
  staff_key: string;
  service_key: string;
  customer_key: string;
  start_time: string;
  comment?: string;
}

const BASE = 'https://developer.setmore.com/api/v1';

let _token: string | null = null;
let _tokenExpiry = 0;

async function getToken(): Promise<string> {
  if (_token && Date.now() < _tokenExpiry) return _token;

  const res = await fetch(`${BASE}/o/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: process.env.SETMORE_REFRESH_TOKEN }),
  });

  if (!res.ok) throw new Error(`Setmore auth failed: ${res.status}`);
  const data = await res.json() as { data: { token: { access_token: string } } };
  _token = data.data.token.access_token;
  _tokenExpiry = Date.now() + 55 * 60 * 1000;
  return _token;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) throw new Error(`Setmore ${options?.method ?? 'GET'} ${path} failed: ${res.status}`);
  const json = await res.json() as { data: T };
  return json.data;
}

export async function getAppointments(from: string, to: string): Promise<SetmoreAppointment[]> {
  return request<SetmoreAppointment[]>(`/bookings?from=${from}&to=${to}`);
}

export async function getAppointment(key: string): Promise<SetmoreAppointment | null> {
  try {
    return await request<SetmoreAppointment>(`/bookings/${key}`);
  } catch {
    return null;
  }
}

export async function getAvailableSlots(staffKey: string, serviceKey: string, date: string): Promise<string[]> {
  return request<string[]>(`/bookings/slots?staff_key=${staffKey}&service_key=${serviceKey}&date=${date}`);
}

export async function createAppointment(params: CreateAppointmentParams): Promise<SetmoreAppointment> {
  return request<SetmoreAppointment>('/bookings', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function cancelAppointment(key: string): Promise<void> {
  await request(`/bookings/${key}`, { method: 'DELETE' });
}

export async function getStaff(): Promise<SetmoreStaff[]> {
  return request<SetmoreStaff[]>('/staffs');
}

export async function getServices(): Promise<SetmoreService[]> {
  return request<SetmoreService[]>('/services');
}
