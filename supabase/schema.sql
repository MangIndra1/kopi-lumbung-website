-- =========================================================
-- Kopi Lumbung / UMKM Website System — schema
-- Jalankan di Supabase Dashboard > SQL Editor
-- =========================================================

-- ---------- Helper: auto-update kolom updated_at ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- business_info (satu baris saja) ----------
create table public.business_info (
  id               int primary key default 1 check (id = 1),
  name             text not null,
  tagline          text,
  hero_description text,
  about_story      text,
  address          text,
  maps_embed_url   text,
  whatsapp_number  text not null check (whatsapp_number ~ '^[0-9]{8,15}$'),
  wa_greeting      text not null default 'Halo, saya mau tanya / pesan.',
  opening_hours    jsonb not null default '[]'::jsonb,
  instagram_url    text,
  tiktok_url       text,
  email            text,
  hero_image_url   text,
  about_image_url  text,
  updated_at       timestamptz not null default now()
);

create trigger trg_business_info_updated
before update on public.business_info
for each row execute function public.set_updated_at();

-- ---------- products ----------
create table public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  price        integer not null check (price >= 0),   -- rupiah, tanpa desimal
  category     text not null,
  image_url    text,
  is_featured  boolean not null default false,
  is_available boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index idx_products_category_sort on public.products (category, sort_order);
create index idx_products_featured on public.products (is_featured) where is_featured;

create trigger trg_products_updated
before update on public.products
for each row execute function public.set_updated_at();

-- ---------- gallery_images ----------
create table public.gallery_images (
  id         uuid primary key default gen_random_uuid(),
  image_url  text not null,
  alt_text   text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- testimonials ----------
create table public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  author_name  text not null,
  content      text not null,
  rating       smallint not null default 5 check (rating between 1 and 5),
  is_published boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

-- =========================================================
-- Row Level Security
-- Publik (anon)  : hanya boleh BACA
-- Admin (login)  : boleh baca + tulis
-- PENTING: matikan sign-up publik di Supabase Auth (lihat catatan)
-- =========================================================
alter table public.business_info  enable row level security;
alter table public.products       enable row level security;
alter table public.gallery_images enable row level security;
alter table public.testimonials   enable row level security;

-- business_info
create policy "business_info_public_read" on public.business_info
  for select to anon, authenticated using (true);
create policy "business_info_admin_write" on public.business_info
  for all to authenticated using (true) with check (true);

-- products
create policy "products_public_read" on public.products
  for select to anon, authenticated using (true);
create policy "products_admin_write" on public.products
  for all to authenticated using (true) with check (true);

-- gallery_images
create policy "gallery_public_read" on public.gallery_images
  for select to anon, authenticated using (true);
create policy "gallery_admin_write" on public.gallery_images
  for all to authenticated using (true) with check (true);

-- testimonials (publik hanya lihat yang published)
create policy "testimonials_public_read" on public.testimonials
  for select to anon using (is_published);
create policy "testimonials_admin_all" on public.testimonials
  for all to authenticated using (true) with check (true);

-- =========================================================
-- Storage bucket untuk foto (publik dibaca, admin yang upload)
-- =========================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "media_admin_all" on storage.objects
  for all to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');