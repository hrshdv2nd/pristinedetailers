// ============================================================
// Shared types for all Edge Functions
// ============================================================

export type UserRole = 'customer' | 'detailer' | 'admin';
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

// ----------------------------------------------------------------
// Setmore API shapes (v1)
// ----------------------------------------------------------------
export interface SetmoreCustomer {
  key: string;
  first_name: string;
  last_name: string;
  email_id: string;
  cell_phone: string;
  address?: string;
}

export interface SetmoreBooking {
  key: string;                     // booking ID — our setmore_booking_id
  staff_key: string;               // maps to detailers.setmore_staff_id
  service_key: string;             // maps to services.setmore_service_id
  appointment_key?: string;
  label: string;                   // status label from Setmore
  start_time: string;              // ISO 8601
  end_time: string;                // ISO 8601
  comment?: string;                // customer notes
  customer: SetmoreCustomer;
}

export interface SetmoreTokenResponse {
  data: {
    token: {
      access_token: string;
      refresh_token: string;
    };
  };
}

export type SyncType = 'incremental' | 'full_historical';

// ----------------------------------------------------------------
// Resolved booking ready to upsert into Supabase
// ----------------------------------------------------------------
export interface ResolvedBooking {
  setmore_booking_id: string;
  customer_id: string | null;
  detailer_id: string | null;
  service_id: string | null;
  status: BookingStatus;
  scheduled_start: string;
  scheduled_end: string;
  price: number | null;
  customer_notes: string | null;
  setmore_raw: SetmoreBooking;
  synced_at: string;
}

// ----------------------------------------------------------------
// Setmore webhook event payloads
// ----------------------------------------------------------------
export type SetmoreEventType =
  | 'BOOKING_CREATED'
  | 'BOOKING_UPDATED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_DELETED';

export interface SetmoreWebhookEvent {
  type: SetmoreEventType;
  data: {
    booking: SetmoreBooking;
  };
}

// ----------------------------------------------------------------
// Stripe webhook event (minimal — expand as needed)
// ----------------------------------------------------------------
export interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}
