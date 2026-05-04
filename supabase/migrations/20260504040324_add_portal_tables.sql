-- ============================================================
-- MIGRATION — Portal tables (review_requests, admin_notes, referrals)
-- These tables are required by the My Portal feature.
-- ============================================================

-- Review request status enum (if not already defined)
do $$ begin
  create type review_req_status as enum ('pending', 'sent', 'completed', 'skipped');
exception when duplicate_object then null;
end $$;

-- Referral status enum (if not already defined)
do $$ begin
  create type referral_status as enum ('pending', 'first_detail_completed');
exception when duplicate_object then null;
end $$;

-- ============================================================
-- REVIEW REQUESTS
-- ============================================================
create table if not exists review_requests (
  id                uuid primary key default uuid_generate_v4(),
  booking_id        uuid unique references bookings(id) on delete cascade,
  customer_id       uuid references customers(id) on delete cascade,
  status            review_req_status not null default 'pending',
  scheduled_send_at timestamptz       not null,
  sent_at           timestamptz,
  completed_at      timestamptz,
  created_at        timestamptz       not null default now()
);

alter table review_requests enable row level security;

create policy "review_requests_select" on review_requests for select using (
  customer_id in (select id from customers where user_id = auth.uid())
  or exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "review_requests_insert" on review_requests for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'detailer'))
);

-- ============================================================
-- ADMIN NOTES
-- ============================================================
create table if not exists admin_notes (
  id          uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references customers(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  note        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists admin_notes_customer_idx on admin_notes(customer_id);

alter table admin_notes enable row level security;

create policy "admin_notes_all" on admin_notes for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- REFERRALS
-- ============================================================
create table if not exists referrals (
  id                   uuid primary key default uuid_generate_v4(),
  referrer_customer_id uuid not null references customers(id) on delete cascade,
  referred_user_id     uuid references auth.users(id) on delete set null,
  status               referral_status not null default 'pending',
  created_at           timestamptz     not null default now()
);

create index if not exists referrals_referrer_idx on referrals(referrer_customer_id);

alter table referrals enable row level security;

create policy "referrals_select" on referrals for select using (
  referrer_customer_id in (select id from customers where user_id = auth.uid())
  or exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- PAYOUT_ID column on bookings (add if missing)
-- ============================================================
alter table bookings add column if not exists payout_id text;
