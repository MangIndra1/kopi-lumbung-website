export type OpeningHour = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

export type BusinessInfo = {
  id: number;
  name: string;
  tagline: string | null;
  hero_description: string | null;
  about_story: string | null;
  address: string | null;
  maps_embed_url: string | null;
  whatsapp_number: string;
  wa_greeting: string;
  opening_hours: OpeningHour[];
  instagram_url: string | null;
  tiktok_url: string | null;
  email: string | null;
  hero_image_url: string | null;
  about_image_url: string | null;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  author_name: string;
  content: string;
  rating: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

export type ProductGroup = {
  category: string;
  items: Product[];
};