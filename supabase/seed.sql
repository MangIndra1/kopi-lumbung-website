-- =========================================================
-- Seed data dummy — Kopi Lumbung
-- =========================================================

insert into public.business_info
  (id, name, tagline, hero_description, about_story, address,
   whatsapp_number, wa_greeting, opening_hours, instagram_url, email)
values (
  1,
  'Kopi Lumbung',
  'Kopi lokal Bali, diseduh pelan.',
  'Biji kopi pilihan dari petani Kintamani, disangrai segar setiap minggu dan diseduh sepenuh hati. Mampir, duduk, dan nikmati pelan-pelan.',
  'Kopi Lumbung berawal dari satu meja kecil dan keinginan sederhana: menyajikan kopi Bali yang jujur dan terjangkau. Kami bekerja langsung dengan petani lokal, menyangrai dalam batch kecil, dan menyajikannya di ruang yang nyaman untuk bekerja, bertemu teman, atau sekadar menepi dari keramaian.',
  'Jl. Contoh Raya No. 12, Ubud, Gianyar, Bali 80571',
  '6281234567890',
  'Halo Kopi Lumbung, saya mau tanya / pesan.',
  '[
    {"day":"Senin","open":"08:00","close":"22:00","closed":false},
    {"day":"Selasa","open":"08:00","close":"22:00","closed":false},
    {"day":"Rabu","open":"08:00","close":"22:00","closed":false},
    {"day":"Kamis","open":"08:00","close":"22:00","closed":false},
    {"day":"Jumat","open":"08:00","close":"23:00","closed":false},
    {"day":"Sabtu","open":"08:00","close":"23:00","closed":false},
    {"day":"Minggu","open":"09:00","close":"21:00","closed":false}
  ]'::jsonb,
  'https://instagram.com/kopilumbung',
  'halo@kopilumbung.example'
)
on conflict (id) do nothing;

insert into public.products
  (name, description, price, category, is_featured, sort_order)
values
  -- Kopi
  ('Kopi Susu Lumbung', 'Signature kami: espresso, susu segar, dan sedikit gula aren.', 24000, 'Kopi', true, 1),
  ('Espresso', 'Double shot dari biji Kintamani, pekat dan bersih.', 18000, 'Kopi', false, 2),
  ('Americano', 'Espresso panjang yang ringan dan segar.', 20000, 'Kopi', false, 3),
  ('Cappuccino', 'Espresso, susu steam, dan busa lembut.', 25000, 'Kopi', false, 4),
  ('V60 Kintamani', 'Seduh manual, nuansa citrus dan manis madu.', 28000, 'Kopi', true, 5),
  -- Non-Kopi
  ('Matcha Latte', 'Matcha pilihan dengan susu segar, bisa panas atau dingin.', 28000, 'Non-Kopi', false, 1),
  ('Cokelat Panas', 'Cokelat pekat dengan susu hangat.', 24000, 'Non-Kopi', false, 2),
  ('Es Teh Serai', 'Teh dingin dengan aroma serai, segar dan ringan.', 18000, 'Non-Kopi', false, 3),
  -- Makanan
  ('Nasi Goreng Kampung', 'Nasi goreng bumbu rumahan dengan telur dan kerupuk.', 35000, 'Makanan', true, 1),
  ('Roti Bakar Cokelat Keju', 'Roti tebal bakar, cokelat leleh, dan parutan keju.', 22000, 'Makanan', false, 2),
  -- Camilan
  ('Pisang Goreng Madu', 'Pisang kepok goreng renyah dengan siraman madu.', 20000, 'Camilan', true, 1),
  ('Croissant Mentega', 'Croissant renyah berlapis, cocok untuk teman kopi.', 22000, 'Camilan', false, 2);

insert into public.testimonials (author_name, content, rating, sort_order)
values
  ('Ayu P.', 'Kopi susunya pas banget, tempatnya nyaman buat kerja seharian.', 5, 1),
  ('Made R.', 'Harga bersahabat, V60-nya enak. Pasti balik lagi.', 5, 2),
  ('Dewi S.', 'Pisang gorengnya juara. Pelayanannya ramah.', 5, 3);