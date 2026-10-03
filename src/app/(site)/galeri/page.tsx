import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";
import { getGallery } from "@/lib/data";
import { demoGallery } from "@/lib/placeholder";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Galeri",
  description: "Suasana, sajian, dan momen di kedai kami.",
};

export default async function GaleriPage() {
  const rows = await getGallery();

  const photos =
    rows.length > 0
      ? rows.map((g) => ({ key: g.id, src: g.image_url, alt: g.alt_text ?? "Foto kedai" }))
      : siteConfig.isDemo
        ? demoGallery.map((g, i) => ({ key: `demo-${i}`, src: g.image_url, alt: g.alt_text }))
        : [];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:pt-16">
      <SectionHeading
        as="h1"
        title="Galeri"
        note="sekilas suasana kami"
        centerOnMobile
      />

      {photos.length === 0 ? (
        <p className="mt-10 rounded-[1.5rem] border border-line bg-surface p-8 text-center text-muted">
          Foto belum tersedia. Silakan cek lagi nanti.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {photos.map((p, i) => (
            <li
              key={p.key}
              className={`relative overflow-hidden rounded-[1.25rem] bg-latte ${
                i % 5 === 0 ? "aspect-[4/5]" : "aspect-square"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 380px, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}