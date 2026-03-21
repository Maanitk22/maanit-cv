-- Run this in: supabase.com → your project → SQL Editor → New query

-- Create the contact submissions table
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now(),
  read        boolean not null default false
);

-- Index for fast lookups by email and date
create index on contact_submissions (email);
create index on contact_submissions (created_at desc);

-- Row Level Security: only the service role can read/write
-- (your anon key can INSERT but not SELECT — keeps submissions private)
alter table contact_submissions enable row level security;

create policy "Allow public insert"
  on contact_submissions for insert
  to anon
  with check (true);

create policy "Only service role can read"
  on contact_submissions for select
  to service_role
  using (true);

-- Optional: view to see latest submissions in the Supabase dashboard
create or replace view latest_submissions as
  select
    id,
    name,
    email,
    subject,
    left(message, 80) || '...' as message_preview,
    created_at,
    read
  from contact_submissions
  order by created_at desc;
