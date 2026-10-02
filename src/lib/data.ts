import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/public";
import { siteConfig } from "@/config/site";
import type {
  BusinessInfo,
  GalleryImage,
  Product,
  ProductGroup,
  Testimonial,
} from "@/lib/types";

export const getBusinessInfo = cache(async (): Promise<BusinessInfo> => {
  const { data, error } = await supabasePublic
    .from("business_info")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw new Error(`getBusinessInfo: ${error.message}`);
  return data as BusinessInfo;
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await supabasePublic
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(`getProducts: ${error.message}`);
  return (data ?? []) as Product[];
});

export const getFeaturedProducts = cache(async (limit = 4): Promise<Product[]> => {
  const { data, error } = await supabasePublic
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) throw new Error(`getFeaturedProducts: ${error.message}`);
  return (data ?? []) as Product[];
});

export const getGallery = cache(async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabasePublic
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`getGallery: ${error.message}`);
  return (data ?? []) as GalleryImage[];
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const { data, error } = await supabasePublic
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`getTestimonials: ${error.message}`);
  return (data ?? []) as Testimonial[];
});

export function groupProductsByCategory(products: Product[]): ProductGroup[] {
  const map = new Map<string, Product[]>();
  for (const p of products) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }

  const order = siteConfig.categoryOrder;
  const rank = (c: string) => {
    const i = order.indexOf(c);
    return i === -1 ? order.length : i;
  };

  return [...map.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b, "id"))
    .map(([category, items]) => ({ category, items }));
}