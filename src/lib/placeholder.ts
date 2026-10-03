import type { BusinessInfo, Product } from "@/lib/types";

// Foto demo dari Unsplash, dipakai HANYA saat kolom gambar di Supabase masih kosong.
// Untuk klien real: isi image_url / hero_image_url / about_image_url di database.
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;

export const demoImages = {
  hero: unsplash("photo-1541167760496-1628856ab772"),
  about: unsplash("photo-1453614512568-c4024d13c247"),
  aboutSecondary: unsplash("photo-1495474472287-4d71bcdd2085"),
  beans: unsplash("photo-1447933601403-0c6688de566e"),
};

// Dicocokkan ke nama produk (huruf kecil, "contains"), lalu ke kategori.
const byKeyword: [string, string][] = [
  ["v60", "photo-1442512595331-e89e73853f31"],
  ["kopi susu", "photo-1517701604599-bb29b565090c"],
  ["espresso", "photo-1559496417-e7f25cb247f3"],
  ["americano", "photo-1514432324607-a09d9b4aefdd"],
  ["cappuccino", "photo-1509042239860-f550ce710b93"],
  ["matcha", "photo-1515823064-d6e0c04616a7"],
  ["cokelat panas", "photo-1542990253-0d0f5be5f0ed"],
  ["teh", "photo-1556679343-c7306c1976bc"],
  ["nasi goreng", "photo-1603133872878-684f208fb84b"],
  ["pisang", "photo-1484723091739-30a097e8f929"],
  ["roti", "photo-1484723091739-30a097e8f929"],
  ["croissant", "photo-1555507036-ab1f4038808a"],
];

const byCategory: Record<string, string> = {
  Kopi: "photo-1509042239860-f550ce710b93",
  "Non-Kopi": "photo-1542990253-0d0f5be5f0ed",
  Makanan: "photo-1603133872878-684f208fb84b",
  Camilan: "photo-1558961363-fa8fdf82db35",
};

export function productImage(p: Product): string {
  if (p.image_url) return p.image_url;
  const name = p.name.toLowerCase();
  const hit = byKeyword.find(([k]) => name.includes(k));
  return unsplash(hit?.[1] ?? byCategory[p.category] ?? byCategory.Kopi);
}

export function heroImage(info: BusinessInfo): string {
  return info.hero_image_url ?? demoImages.hero;
}

export function aboutImage(info: BusinessInfo): string {
  return info.about_image_url ?? demoImages.about;
}

export const demoGallery: { image_url: string; alt_text: string }[] = [
  { image_url: demoImages.about, alt_text: "Suasana kedai" },
  { image_url: demoImages.aboutSecondary, alt_text: "Secangkir kopi di meja kayu" },
  { image_url: demoImages.beans, alt_text: "Biji kopi sangrai" },
  { image_url: demoImages.hero, alt_text: "Kopi susu dingin" },
  { image_url: unsplash("photo-1442512595331-e89e73853f31"), alt_text: "Seduh manual V60" },
  { image_url: unsplash("photo-1509042239860-f550ce710b93"), alt_text: "Cappuccino dengan latte art" },
];