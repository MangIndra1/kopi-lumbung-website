export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id-ID",
  // Zona waktu usaha, untuk menentukan jam buka "hari ini" (Bali = WITA).
  timeZone: "Asia/Makassar",
  isDemo: true,
  orderMode: "cart" as "cart" | "none",

  // Seberapa sering halaman statis disegarkan (detik).
  revalidateSeconds: 3600,

  // Urutan kategori di halaman Menu. Kategori yang tidak terdaftar
  // di sini tampil setelahnya, urut abjad.
  categoryOrder: ["Kopi", "Non-Kopi", "Makanan", "Camilan"] as string[],

  nav: [
    { label: "Beranda", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Tentang", href: "/tentang" },
    { label: "Galeri", href: "/galeri" },
    { label: "Kontak", href: "/kontak" },
  ],

  // Copy halaman Home yang jarang berubah (diganti saat reskin per klien).
  home: {
    eyebrow: "Kedai kopi lokal · Ubud, Bali",
    heroNote: "Diseduh pelan, dinikmati santai",
    highlights: [
      {
        icon: "bean",
        title: "Biji Kintamani",
        text: "Langsung dari petani lokal, tanpa perantara.",
      },
      {
        icon: "flame",
        title: "Sangrai tiap minggu",
        text: "Batch kecil supaya rasa selalu segar.",
      },
      {
        icon: "seat",
        title: "Ruang yang nyaman",
        text: "Wi-Fi kencang, colokan di tiap meja.",
      },
    ],
  },

  // Dipakai hanya jika data business_info belum terisi.
  fallback: {
    name: "Kopi Lumbung",
    tagline: "Kopi lokal Bali, diseduh pelan.",
  },
};