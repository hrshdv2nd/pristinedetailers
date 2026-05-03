const XERO_TOKEN_URL = 'https://identity.xero.com/connect/token';
const XERO_API_BASE  = 'https://api.xero.com/api.xro/2.0';

let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires_at - 60_000) {
    return cachedToken.access_token;
  }

  const params = new URLSearchParams({
    grant_type:    'client_credentials',
    client_id:     process.env.XERO_CLIENT_ID!,
    client_secret: process.env.XERO_CLIENT_SECRET!,
    scope:         'accounting.transactions accounting.contacts',
  });

  const res = await fetch(XERO_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) throw new Error(`Xero token error: ${res.status}`);
  const data = await res.json() as { access_token: string; expires_in: number };
  cachedToken = { access_token: data.access_token, expires_at: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function xeroFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const token = await getToken();
  const tenantId = process.env.XERO_TENANT_ID!;
  const res = await fetch(`${XERO_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Xero-Tenant-Id': tenantId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`Xero API error ${res.status}: ${await res.text()}`);
  return res.json();
}

export interface XeroContact {
  ContactID: string;
  Name: string;
  EmailAddress: string;
}

export async function upsertXeroContact(params: { name: string; email: string; phone?: string }): Promise<string> {
  const body = {
    Contacts: [{
      Name: params.name,
      EmailAddress: params.email,
      Phones: params.phone ? [{ PhoneType: 'MOBILE', PhoneNumber: params.phone }] : [],
    }],
  };
  const data = await xeroFetch('/Contacts', { method: 'POST', body: JSON.stringify(body) }) as { Contacts: XeroContact[] };
  return data.Contacts[0].ContactID;
}

export interface XeroInvoiceParams {
  contactId: string;
  description: string;
  amount: number;
  currency?: string;
  dueDate?: string;
  reference?: string;
}

export async function createXeroInvoice(params: XeroInvoiceParams): Promise<string> {
  const due = params.dueDate ?? new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
  const body = {
    Invoices: [{
      Type: 'ACCREC',
      Contact: { ContactID: params.contactId },
      DueDate: due,
      Reference: params.reference ?? '',
      CurrencyCode: params.currency ?? 'AUD',
      LineItems: [{
        Description: params.description,
        Quantity: 1,
        UnitAmount: params.amount,
        AccountCode: '200',
      }],
    }],
  };
  const data = await xeroFetch('/Invoices', { method: 'POST', body: JSON.stringify(body) }) as { Invoices: Array<{ InvoiceID: string }> };
  return data.Invoices[0].InvoiceID;
}

export async function getXeroInvoices(contactId: string): Promise<unknown[]> {
  const data = await xeroFetch(`/Invoices?ContactIDs=${contactId}&Status=AUTHORISED,PAID`) as { Invoices: unknown[] };
  return data.Invoices ?? [];
}
