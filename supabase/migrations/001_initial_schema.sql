-- ============================================================
-- Pristine Detailers — Initial Schema
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role          as enum ('customer', 'detailer', 'admin');
create type booking_status     as enum ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
create type membership_status  as enum ('none', 'active', 'paused', 'cancelled');
create type payment_type       as enum ('one_time', 'subscription', 'refund');
create type payment_status     as enum ('pending', 'succeeded', 'failed', 'refunded');
create type referral_status    as enum ('pending', 'first_detail_completed');
create type review_req_status  as enum ('pending', 'sent', 'completed', 'skipped');

-- ============================================================
-- PROFILES (mirrors auth.users)
-- ============================================================
create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        user_role    not null default 'customer',
  full_name   text         not null default '',
  email       text         not null default '',
  phone       text,
  avatar_url  text,
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now()
);

-- Auto-create profile on sign-up
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- LOCATIONS
-- ============================================================
create table locations (
  id         uuid primary key default uuid_generate_v4(),
  name       text        not null,
  address    text,
  city       text,
  state      text        default 'VIC',
  postcode   text,
  phone      text,
  is_active  boolean     not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- SERVICE CATEGORIES & SERVICES
-- ============================================================
create table service_categories (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  description   text,
  display_order int  not null default 0
);

create table services (
  id                  uuid primary key default uuid_generate_v4(),
  setmore_service_id  text unique,
  category_id         uuid references service_categories(id) on delete set null,
  name                text    not null,
  description         text,
  base_price          numeric(10,2) not null default 0,
  duration_minutes    int     not null default 60,
  is_active           boolean not null default true,
  display_order       int     not null default 0,
  created_at          timestamptz not null default now()
);

-- ============================================================
-- MEMBERSHIP PLANS
-- ============================================================
create table membership_plans (
  id                     uuid primary key default uuid_generate_v4(),
  name                   text    not null,
  price_monthly          numeric(10,2) not null,
  description            text,
  benefits               jsonb   not null default '[]',
  max_bookings_per_month int,
  stripe_price_id        text unique,
  is_active              boolean not null default true,
  display_order          int     not null default 0,
  created_at             timestamptz not null default now()
);

-- ============================================================
-- CUSTOMERS
-- ============================================================
create table customers (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid unique references auth.users(id) on delete set null,
  membership_status     membership_status not null default 'none',
  membership_plan_id    uuid references membership_plans(id) on delete set null,
  membership_started_at timestamptz,
  membership_renews_at  timestamptz,
  stripe_customer_id    text unique,
  total_spent           numeric(10,2) not null default 0,
  lifetime_visits       int          not null default 0,
  notes                 text,
  referred_by           uuid references customers(id) on delete set null,
  created_at            timestamptz  not null default now(),
  updated_at            timestamptz  not null default now()
);

-- ============================================================
-- VEHICLES
-- ============================================================
create table vehicles (
  id            uuid primary key default uuid_generate_v4(),
  customer_id   uuid not null references customers(id) on delete cascade,
  make          text not null,
  model         text not null,
  year          int,
  color         text,
  license_plate text,
  vin           text,
  is_primary    boolean not null default false,
  notes         text,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- DETAILERS
-- ============================================================
create table detailers (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid unique references auth.users(id) on delete set null,
  setmore_staff_id text unique,
  location_id      uuid references locations(id) on delete set null,
  specialties      text[] not null default '{}',
  is_active        boolean not null default true,
  notes            text,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- BOOKINGS
-- ============================================================
create table bookings (
  id                   uuid primary key default uuid_generate_v4(),
  setmore_booking_id   text unique,
  customer_id          uuid references customers(id) on delete set null,
  detailer_id          uuid references detailers(id) on delete set null,
  service_id           uuid references services(id) on delete set null,
  vehicle_id           uuid references vehicles(id) on delete set null,
  location_id          uuid references locations(id) on delete set null,
  status               booking_status not null default 'pending',
  scheduled_start      timestamptz    not null,
  scheduled_end        timestamptz,
  price                numeric(10,2),
  is_membership_booking boolean       not null default false,
  customer_notes       text,
  payout_id            text,
  created_at           timestamptz    not null default now(),
  updated_at           timestamptz    not null default now()
);

create index bookings_customer_id_idx  on bookings(customer_id);
create index bookings_detailer_id_idx  on bookings(detailer_id);
create index bookings_status_idx       on bookings(status);
create index bookings_scheduled_idx    on bookings(scheduled_start);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger bookings_updated_at before update on bookings
  for each row execute procedure update_updated_at();

create trigger customers_updated_at before update on customers
  for each row execute procedure update_updated_at();

-- ============================================================
-- JOB DETAILS
-- ============================================================
create table job_details (
  id               uuid primary key default uuid_generate_v4(),
  booking_id       uuid unique not null references bookings(id) on delete cascade,
  started_at       timestamptz,
  completed_at     timestamptz,
  before_photos    text[] not null default '{}',
  after_photos     text[] not null default '{}',
  checklist        jsonb  not null default '{}',
  completion_notes text,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- PAYMENTS
-- ============================================================
create table payments (
  id                       uuid primary key default uuid_generate_v4(),
  customer_id              uuid references customers(id) on delete set null,
  booking_id               uuid references bookings(id) on delete set null,
  amount                   int    not null,
  currency                 text   not null default 'AUD',
  payment_type             payment_type   not null,
  status                   payment_status not null default 'pending',
  stripe_payment_intent_id text unique,
  created_at               timestamptz    not null default now()
);

create index payments_customer_id_idx on payments(customer_id);
create index payments_status_idx      on payments(status);

-- ============================================================
-- REVIEW REQUESTS
-- ============================================================
create table review_requests (
  id                uuid primary key default uuid_generate_v4(),
  booking_id        uuid unique references bookings(id) on delete cascade,
  customer_id       uuid references customers(id) on delete cascade,
  status            review_req_status not null default 'pending',
  scheduled_send_at timestamptz       not null,
  sent_at           timestamptz,
  completed_at      timestamptz,
  created_at        timestamptz       not null default now()
);

-- ============================================================
-- REFERRALS
-- ============================================================
create table referrals (
  id                   uuid primary key default uuid_generate_v4(),
  referrer_customer_id uuid not null references customers(id) on delete cascade,
  referred_user_id     uuid references auth.users(id) on delete set null,
  status               referral_status not null default 'pending',
  created_at           timestamptz     not null default now()
);

create index referrals_referrer_idx on referrals(referrer_customer_id);

-- ============================================================
-- ADMIN NOTES
-- ============================================================
create table admin_notes (
  id          uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references customers(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  note        text not null,
  created_at  timestamptz not null default now()
);

create index admin_notes_customer_idx on admin_notes(customer_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles       enable row level security;
alter table customers      enable row level security;
alter table vehicles       enable row level security;
alter table bookings       enable row level security;
alter table job_details    enable row level security;
alter table payments       enable row level security;
alter table review_requests enable row level security;
alter table referrals      enable row level security;
alter table admin_notes    enable row level security;
alter table detailers      enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin()
returns boolean language sql security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

-- Helper: is the current user a detailer?
create or replace function is_detailer()
returns boolean language sql security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'detailer');
$$;

-- Profiles: users see their own; admins see all
create policy "profiles_select" on profiles for select using (id = auth.uid() or is_admin());
create policy "profiles_update" on profiles for update using (id = auth.uid() or is_admin());

-- Customers: own row + admin
create policy "customers_select" on customers for select using (user_id = auth.uid() or is_admin());
create policy "customers_insert" on customers for insert with check (user_id = auth.uid() or is_admin());
create policy "customers_update" on customers for update using (user_id = auth.uid() or is_admin());

-- Vehicles: own vehicles + admin
create policy "vehicles_select" on vehicles for select using (
  customer_id in (select id from customers where user_id = auth.uid()) or is_admin()
);
create policy "vehicles_insert" on vehicles for insert with check (
  customer_id in (select id from customers where user_id = auth.uid()) or is_admin()
);
create policy "vehicles_update" on vehicles for update using (
  customer_id in (select id from customers where user_id = auth.uid()) or is_admin()
);

-- Bookings: customer sees own; detailer sees assigned; admin sees all
create policy "bookings_customer_select" on bookings for select using (
  customer_id in (select id from customers where user_id = auth.uid())
  or detailer_id in (select id from detailers where user_id = auth.uid())
  or is_admin()
);
create policy "bookings_insert" on bookings for insert with check (is_admin() or is_detailer());
create policy "bookings_update" on bookings for update using (
  detailer_id in (select id from detailers where user_id = auth.uid())
  or customer_id in (select id from customers where user_id = auth.uid())
  or is_admin()
);

-- Job details: detailer assigned + customer of booking + admin
create policy "job_details_select" on job_details for select using (
  booking_id in (
    select id from bookings where
      customer_id in (select id from customers where user_id = auth.uid())
      or detailer_id in (select id from detailers where user_id = auth.uid())
  ) or is_admin()
);
create policy "job_details_upsert" on job_details for insert with check (
  booking_id in (select id from bookings where detailer_id in (select id from detailers where user_id = auth.uid()))
  or is_admin()
);
create policy "job_details_update" on job_details for update using (
  booking_id in (select id from bookings where detailer_id in (select id from detailers where user_id = auth.uid()))
  or is_admin()
);

-- Payments: own + admin
create policy "payments_select" on payments for select using (
  customer_id in (select id from customers where user_id = auth.uid()) or is_admin()
);
create policy "payments_insert" on payments for insert with check (is_admin() or is_detailer());

-- Admin notes: admin only
create policy "admin_notes_all" on admin_notes for all using (is_admin());

-- Review requests: customer sees own + admin
create policy "review_requests_select" on review_requests for select using (
  customer_id in (select id from customers where user_id = auth.uid()) or is_admin()
);
create policy "review_requests_insert" on review_requests for insert with check (is_admin() or is_detailer());

-- Referrals: own + admin
create policy "referrals_select" on referrals for select using (
  referrer_customer_id in (select id from customers where user_id = auth.uid()) or is_admin()
);

-- Detailers: own + admin + customers (for booking display)
create policy "detailers_select" on detailers for select using (true);

-- Public read for lookup tables
alter table services          enable row level security;
alter table membership_plans  enable row level security;
alter table locations         enable row level security;
alter table service_categories enable row level security;

create policy "services_public_read"         on services           for select using (true);
create policy "membership_plans_public_read" on membership_plans   for select using (true);
create policy "locations_public_read"        on locations          for select using (true);
create policy "service_categories_public"    on service_categories for select using (true);
