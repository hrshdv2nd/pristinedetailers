export interface SetmoreService {
  key: string;
  service_name: string;
  duration: number;
  price: number;
  description?: string;
}

export interface SetmoreStaff {
  key: string;
  first_name: string;
  last_name: string;
  email: string;
  image_url?: string;
}

export interface SetmoreCustomer {
  key: string;
  first_name: string;
  last_name: string;
  email: string;
  cell_phone?: string;
}

export interface SetmoreAppointment {
  key: string;
  service_key: string;
  staff_key: string;
  customer_key: string;
  start_time: string;
  end_time: string;
  label: string;
  status: string;
}

export interface CreateCustomerParams {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone?: string;
}

export interface CreateAppointmentParams {
  staff_key: string;
  service_key: string;
  customer_key: string;
  start_time: string; // "dd/MM/yyyy HH:mm"
  end_time?: string;  // "dd/MM/yyyy HH:mm" — Setmore infers from service duration if omitted
  comment?: string;
}

const BASE = 'https://developer.setmore.com/api/v1';

let _token: string | null = null;
let _tokenExpiry = 0;

async function getToken(): Promise<string> {
  if (_token && Date.now() < _tokenExpiry) return _token;
  const res = await fetch(
    `${BASE}/o/oauth2/token?refreshToken=${encodeURIComponent(process.env.SETMORE_REFRESH_TOKEN!)}`,
    { cache: 'no-store' },
  );
  if (!res.ok) throw new Error(`Setmore auth failed: ${res.status}`);
  const json = await res.json();
  _token = json.data.token.access_token as string;
  _tokenExpiry = Date.now() + 55 * 60 * 1000;
  return _token;
}

async function req(path: string, options?: RequestInit) {
  const token = await getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Setmore ${options?.method ?? 'GET'} ${path}: ${res.status}`);
  return res.json();
}

export async function getServices(): Promise<SetmoreService[]> {
  const json = await req('/bookingapi/services');
  return json.data?.services ?? [];
}

export async function getStaff(): Promise<SetmoreStaff[]> {
  const json = await req('/bookingapi/staff');
  return json.data?.staffs ?? [];
}

// date: "MM/dd/yyyy"
export async function getSlots(staffKey: string, serviceKey: string, date: string): Promise<string[]> {
  const json = await req(
    `/bookingapi/slots?staffKey=${staffKey}&serviceKey=${serviceKey}&selectedDate=${date}&double_booking=true`,
  );
  return json.data?.slots ?? [];
}

export async function createCustomer(params: CreateCustomerParams): Promise<SetmoreCustomer> {
  const json = await req('/bookingapi/customer/create', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return json.data.customer;
}

export async function createAppointment(params: CreateAppointmentParams): Promise<SetmoreAppointment> {
  const json = await req('/bookingapi/appointment/create', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return json.data.appointment;
}

export async function cancelAppointment(key: string): Promise<void> {
  await req(`/bookingapi/appointment/delete/${key}`, { method: 'DELETE' });
}

export async function getAppointment(key: string): Promise<SetmoreAppointment | null> {
  try {
    const json = await req(`/bookingapi/appointment/${key}`);
    return json.data?.appointment ?? null;
  } catch {
    return null;
  }
}
