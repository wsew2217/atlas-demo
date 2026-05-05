-- atlas-demo: schema for the public showcase fixtures.
-- Tables are read-only via the anon key. Writes (replies, milestone advances)
-- continue to live in browser cookies for per-visitor isolation.
--
-- Run this in the Supabase SQL Editor.

drop table if exists demo_activity cascade;
drop table if exists demo_messages cascade;
drop table if exists demo_milestones cascade;
drop table if exists demo_order_batches cascade;
drop table if exists demo_batches cascade;
drop table if exists demo_line_items cascade;
drop table if exists demo_orders cascade;
drop table if exists demo_brands cascade;

create table demo_brands (
  slug          text primary key,
  name          text not null,
  primary_color text not null,
  contact       text not null,
  contact_email text not null
);

create table demo_orders (
  id           text primary key,
  code         text not null,
  brand_slug   text not null references demo_brands(slug),
  ship_by      date not null,
  total_units  integer not null,
  status       text not null check (status in ('received','in_production','shipped','closed','on_hold')),
  created_at   date not null
);

create table demo_line_items (
  id          text primary key,
  order_id    text not null references demo_orders(id) on delete cascade,
  sku         text not null,
  description text not null,
  size        text not null,
  color       text not null,
  units       integer not null,
  seq         integer not null
);
create index demo_line_items_order_idx on demo_line_items (order_id, seq);

create table demo_batches (
  id      text primary key,
  code    text not null,
  factory text not null,
  units   integer not null
);

create table demo_order_batches (
  order_id text not null references demo_orders(id)  on delete cascade,
  batch_id text not null references demo_batches(id) on delete cascade,
  seq      integer not null,
  primary key (order_id, batch_id)
);

create table demo_milestones (
  id        text not null,
  batch_id  text not null references demo_batches(id) on delete cascade,
  label     text not null,
  state     text not null check (state in ('done','in_progress','todo','blocked')),
  date      date,
  note      text,
  seq       integer not null,
  primary key (batch_id, id)
);
create index demo_milestones_batch_idx on demo_milestones (batch_id, seq);

create table demo_messages (
  id          text primary key,
  order_id    text not null references demo_orders(id) on delete cascade,
  at          timestamptz not null,
  author_role text not null check (author_role in ('manufacturer','brand','system')),
  author_name text not null,
  body        text not null
);
create index demo_messages_order_idx on demo_messages (order_id, at);

create table demo_activity (
  id         text primary key,
  at         timestamptz not null,
  actor      text not null,
  is_system  boolean not null,
  body       text not null,
  brand_slug text references demo_brands(slug),
  order_id   text references demo_orders(id) on delete cascade
);
create index demo_activity_at_idx on demo_activity (at desc);

-- RLS: read-only for anon. No public writes.
alter table demo_brands       enable row level security;
alter table demo_orders       enable row level security;
alter table demo_line_items   enable row level security;
alter table demo_batches      enable row level security;
alter table demo_order_batches enable row level security;
alter table demo_milestones   enable row level security;
alter table demo_messages     enable row level security;
alter table demo_activity     enable row level security;

create policy "demo public read" on demo_brands       for select using (true);
create policy "demo public read" on demo_orders       for select using (true);
create policy "demo public read" on demo_line_items   for select using (true);
create policy "demo public read" on demo_batches      for select using (true);
create policy "demo public read" on demo_order_batches for select using (true);
create policy "demo public read" on demo_milestones   for select using (true);
create policy "demo public read" on demo_messages     for select using (true);
create policy "demo public read" on demo_activity     for select using (true);
