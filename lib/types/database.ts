// ============================================================
// Supabase Database type definitions
// Generated manually — replace with `supabase gen types typescript`
// once your Supabase project is connected.
// ============================================================

export type UserRole        = 'customer' | 'detailer' | 'admin';
export type BookingStatus   = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
export type MembershipStatus= 'none' | 'active' | 'paused' | 'cancelled';
export type PaymentType     = 'one_time' | 'subscription' | 'refund';
export type PaymentStatus   = 'pending' | 'succeeded' | 'failed' | 'refunded';

// ----------------------------------------------------------------
// Row shapes (what you get back from SELECT)
// ----------------------------------------------------------------
export interface Profile {
  id:         string;
  role:       UserRole;
  full_name:  string;
  email:      string;
  phone:      string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id:         string;
  name:       string;
  address:    string | null;
  city:       string | null;
  state:      string | null;
  postcode:   string | null;
  phone:      string | null;
  is_active:  boolean;
  created_at: string;
}

export interface ServiceCategory {
  id:            string;
  name:          string;
  description:   string | null;
  display_order: number;
}

export interface Service {
  id:                 string;
  setmore_service_id: string | null;
  category_id:        string | null;
  name:               string;
  description:        string | null;
  base_price:         number;
  duration_minutes:   number;
  is_active:          boolean;
  display_order:      number;
  created_at:         string;
}

export interface MembershipPlan {
  id:                     string;
  name:                   string;
  price_monthly:          number;
  description:            string | null;
  benefits:               BenefitItem[];
  max_bookings_per_month: number | null;
  stripe_price_id:        string | null;
  is_active:              boolean;
  display_order:          number;
  created_at:             string;
}

export interface BenefitItem {
  label: string;
  icon?: string;
}

export interface Customer {
  id:                    string;
  user_id:               string | null;
  membership_status:     MembershipStatus;
  membership_plan_id:    string | null;
  membership_started_at: string | null;
  membership_renews_at:  string | null;
  stripe_customer_id:    string | null;
  total_spent:           number;
  lifetime_visits:       number;
  notes:                 string | null;
  referred_by:           string | null;
  created_at:            string;
  updated_at:            string;
}

export interface Vehicle {
  id:            string;
  customer_id:   string;
  make:          string;
  model:         string;
  year:          number | null;
  color:         string | null;
  license_plate: string | null;
  vin:           string | null;
  is_primary:    boolean;
  notes:         string | null;
  created_at:    string;
}

export interface Detailer {
  id:               string;
  user_id:          string | null;
  setmore_staff_id: string | null;
  location_id:      string | null;
  specialties:      string[];
  is_active:        boolean;
  notes:            string | null;
  created_at:       string;
}

export interface Booking {
  id:                    string;
  setmore_booking_id:    string | null;
  customer_id:           string | null;
  detailer_id:           string | null;
  service_id:            string | null;
  vehicle_id:            string | null;
  location_id:           string | null;
  status:                BookingStatus;
  scheduled_start:       string;
  scheduled_end:         string;
  price:                 number | null;
  is_membership_booking: boolean;
  customer_notes:        string | null;
  internal_notes:        string | null;
  setmore_raw:           Record<string, unknown> | null;
  synced_at:             string | null;
  created_at:            string;
  updated_at:            string;
}

export interface ChecklistItem {
  item:    string;
  checked: boolean;
}

export interface JobDetail {
  id:               string;
  booking_id:       string;
  checklist:        ChecklistItem[];
  before_photos:    string[];
  after_photos:     string[];
  issues_found:     string | null;
  completion_notes: string | null;
  started_at:       string | null;
  completed_at:     string | null;
  updated_at:       string;
}

export interface Payment {
  id:                 string;
  customer_id:        string;
  booking_id:         string | null;
  membership_plan_id: string | null;
  amount:             number;
  currency:           string;
  payment_type:       PaymentType;
  status:             PaymentStatus;
  stripe_payment_id:  string | null;
  stripe_invoice_id:  string | null;
  created_at:         string;
}

// ----------------------------------------------------------------
// Joined / enriched types used in UI components
// ----------------------------------------------------------------
export interface BookingWithRelations extends Booking {
  services:   Pick<Service, 'name' | 'duration_minutes'> | null;
  vehicles:   Pick<Vehicle, 'make' | 'model' | 'year' | 'color'> | null;
  detailers:  { profiles: Pick<Profile, 'full_name'> | null } | null;
  locations:  Pick<Location, 'name' | 'address' | 'city'> | null;
  job_details:Pick<JobDetail, 'before_photos' | 'after_photos' | 'completion_notes' | 'checklist'> | null;
}

export interface DetailerJobWithRelations extends Booking {
  services:  Pick<Service, 'name' | 'duration_minutes'> | null;
  vehicles:  Pick<Vehicle, 'make' | 'model' | 'year' | 'color' | 'license_plate' | 'notes'> | null;
  customers: {
    notes:    string | null;
    profiles: Pick<Profile, 'full_name' | 'phone'> | null;
  } | null;
  job_details: JobDetail | null;
}

export interface CustomerWithPlan extends Customer {
  membership_plans: Pick<MembershipPlan, 'name' | 'price_monthly' | 'benefits'> | null;
}

// ----------------------------------------------------------------
// Supabase Database type for createClient<Database>()
// ----------------------------------------------------------------
export type Database = {
  public: {
    Tables: {
      profiles:               { Row: Profile;        Insert: Partial<Profile>;        Update: Partial<Profile>        };
      locations:              { Row: Location;        Insert: Partial<Location>;        Update: Partial<Location>        };
      service_categories:     { Row: ServiceCategory; Insert: Partial<ServiceCategory>; Update: Partial<ServiceCategory> };
      services:               { Row: Service;         Insert: Partial<Service>;         Update: Partial<Service>         };
      membership_plans:       { Row: MembershipPlan;  Insert: Partial<MembershipPlan>;  Update: Partial<MembershipPlan>  };
      customers:              { Row: Customer;        Insert: Partial<Customer>;        Update: Partial<Customer>        };
      vehicles:               { Row: Vehicle;         Insert: Partial<Vehicle>;         Update: Partial<Vehicle>         };
      detailers:              { Row: Detailer;        Insert: Partial<Detailer>;        Update: Partial<Detailer>        };
      bookings:               { Row: Booking;         Insert: Partial<Booking>;         Update: Partial<Booking>         };
      job_details:            { Row: JobDetail;       Insert: Partial<JobDetail>;       Update: Partial<JobDetail>       };
      payments:               { Row: Payment;         Insert: Partial<Payment>;         Update: Partial<Payment>         };
    };
    Functions: {
      get_my_role:          { Args: Record<never, never>; Returns: UserRole  };
      get_my_customer_id:   { Args: Record<never, never>; Returns: string    };
      get_my_detailer_id:   { Args: Record<never, never>; Returns: string    };
      increment_customer_visits: { Args: { booking_id: string }; Returns: void };
    };
  };
};
