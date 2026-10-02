# UMKM Website System — Ringkasan Brainstorm Project Portfolio

> Dokumen ini hasil diskusi strategi di project "Digital Product Mang In". Tujuannya: jadi referensi awal untuk chat baru yang akan menangani pembangunan teknis.

---

## 1. Latar Belakang & Why

**Problem yang dijawab:**
UMKM kecil (warung/cafe, toko retail, jasa) butuh online presence, tapi opsi yang ada saat ini tidak ideal:
- Template Canva/Wix statis — klien tidak bisa update konten sendiri, harus balik ke desainer tiap ada perubahan harga/menu
- Jasa desain custom mahal — tidak terjangkau untuk UMKM skala kecil
- Keduanya umumnya tidak terintegrasi dengan cara jualan real UMKM (chat WhatsApp)

**Customer target:**
Pemilik UMKM kecil — awalnya warung/cafe, non-technical, budget terbatas, berbasis Bali.

**Posisi dalam portfolio:**
Melengkapi project yang sudah ada:
- **AsKul** — personal productivity dashboard (B2C)
- **Nexus Keuangan** — AI automation + Telegram bot (personal finance)
- **WashFlow** — business ops dashboard untuk UMKM (sisi backend/ops)
- **UMKM Website System** (project ini) — sisi customer-facing/marketing untuk UMKM

WashFlow membuktikan kemampuan bangun sistem ops. Project ini membuktikan kemampuan bangun sisi customer-facing — dua sisi yang sering dibutuhkan bareng oleh klien UMKM real.

**Kenapa worth it (bukan AI Agent dulu):**
AI Agent expertise itu Tier 3-4 (differentiated, effort tinggi), sementara tujuan saat ini adalah dapat klien freelance pertama secepat mungkin — itu Tier 1 Cash Flow. Website UMKM lebih align dengan tujuan itu dan reuse stack yang sudah dikuasai (Next.js, Tailwind, Supabase dari AsKul).

---

## 2. Model Bisnis yang Dipilih

**Bukan** generic multi-tenant SaaS (terlalu berat — butuh billing, tenant isolation, onboarding otomatis; belum ada validasi klien real untuk itu).

**Yang dipilih:** Reusable internal template/starter kit → di-reskin dan di-deploy **single-tenant per klien** (pola sama seperti WashFlow — kamu yang setup manual tiap onboarding klien baru, bukan self-signup platform).

- Yang **reusable**: struktur kode, komponen, logic WA generator, struktur database, setup SEO/schema
- Yang **per-klien**: data di Supabase (menu, harga, foto), warna/font brand (via config/theme), copy/teks, domain + deploy terpisah

Evaluasi ulang ke arah SaaS (Model A) baru masuk akal setelah ada 5-10 klien real dengan pola kebutuhan yang jelas berulang — bukan keputusan sekarang.

---

## 3. Niche Portfolio Demo Pertama

**Warung/Cafe kecil (dummy: "Coffeeshop")**

Alasan: beda visual dari WashFlow (menu, galeri, testimoni vs order tracking), niche paling umum diminta klien UMKM pemula, dan reskinnable ke niche lain nanti (toko retail, jasa).

Fungsi dummy ini:
1. Demo yang bisa ditunjukkan ke calon klien ("ini contoh yang bisa saya buat untuk bisnis Anda")
2. Starting point/cetakan waktu ada klien real — tinggal reskin, bukan build dari nol

---

## 4. Struktur Halaman (Core — wajib ada)

| Halaman | Isi |
|---|---|
| **Home** | Hero (nama usaha + value prop + CTA), highlight 3-4 produk unggulan, testimoni singkat, CTA WA |
| **Menu/Produk** | List lengkap, kategori, harga, foto, deskripsi singkat |
| **Tentang** | Cerita usaha, lokasi (embed Google Maps), jam operasional |
| **Galeri** | Foto tempat/produk (social proof) |
| **Kontak** | Nomor WA (tombol `wa.me`), alamat, jam buka, link sosmed |

---

## 5. Fitur

### Inti (MVP — wajib)
| Fitur | Fungsi |
|---|---|
| CMS ringan (Supabase) | Klien update sendiri harga/menu/foto tanpa hubungi developer |
| WA CTA otomatis | Tombol order/tanya → buka WA dengan pesan pre-filled |
| Google Maps embed | Lokasi jelas, penting untuk local SEO |
| SEO dasar | Meta tag, Open Graph, LocalBusiness schema |
| Mobile-first responsive | Mayoritas customer akses dari HP |
| Fast load (SSG) | Next.js static generation |

Fitur-fitur inilah diferensiator utama — **bukan** desain visual. Design harus rapi & modern (minimum bar), tapi strategi menang bukan "landing page paling cantik" (di situ kalah lawan Canva/Wix/graphic designer murni). Menangnya di: self-service editing + integrasi jualan real (WA) + performa teknis (load speed, SEO) + reusability (bisa deliver lebih cepat/murah dari kompetitor yang build dari nol tiap klien).

### Opsional (upsell per klien, bukan di MVP dummy pertama)
- Form pre-order/reservasi
- Kalkulator ongkir sederhana
- Multi-bahasa (ID/EN) — relevan untuk area turis
- Rating/review section

---

## 6. Stack Teknis

- **Next.js (App Router) + Tailwind** — reuse dari AsKul
- **Supabase** — data menu/produk yang bisa diedit klien (tabel `products`, `business_info`)
- **Vercel** — deploy cepat, custom domain per klien

---

## 7. Batasan Scope MVP

Jangan tambah halaman/fitur di luar yang tercantum di Section 4 & 5 (Inti) untuk dummy pertama — scope creep di portfolio piece adalah waktu terbuang tanpa nilai tambah. Fitur opsional baru ditawarkan sebagai upsell/paket tambahan saat pitching ke klien real.

---

## 8. Status & Next Step

Ide sudah divalidasi di layer strategi (problem, customer, why, model bisnis, struktur, fitur) — siap dieksekusi secara teknis.

**Next step di chat baru:**
1. Setup repo baru (reuse struktur AsKul sebagai starting point)
2. Buat Supabase table `products` (nama, harga, kategori, foto_url, deskripsi) dan `business_info`
3. Build Home + Menu page dulu, baru lanjut ke halaman lain
