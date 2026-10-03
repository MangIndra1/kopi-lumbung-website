import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon, PinIcon } from "@/components/icons";
import { HoursList } from "@/components/hours-list";
import { MapEmbed } from "@/components/map-embed";
import { SectionHeading } from "@/components/section-heading";
import { getBusinessInfo } from "@/lib/data";
import { aboutImage } from "@/lib/placeholder";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tentang",
  description: "Cerita, jam buka, dan lokasi kedai kami.",
};

export default async function TentangPage() {
  const info = await getBusinessInfo();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:pt-16">
      <SectionHeading
        as="h1"
        title="Tentang Kami"
        note="dari satu meja kecil"
        centerOnMobile
      />

      <section className="mt-10 grid items-center gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-latte">
          <Image
            src={aboutImage(info)}
            alt={`Suasana ${info.name}`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="text-center lg:text-left">
          <div aria-hidden="true" className="flex justify-center gap-1.5 lg:justify-start">
            <span className="h-1.5 w-12 rounded-full bg-primary" />
            <span className="h-1.5 w-6 rounded-full bg-caramel" />
            <span className="h-1.5 w-3 rounded-full bg-caramel/50" />
          </div>
          {info.about_story ? (
            <p className="mt-6 whitespace-pre-line leading-relaxed text-muted">
              {info.about_story}
            </p>
          ) : (
            <p className="mt-6 text-muted">Cerita kami segera hadir.</p>
          )}
          <Link
            href="/menu"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-ink transition hover:opacity-90"
          >
            Lihat menu
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2 sm:mt-24">
        <div className="rounded-[2rem] bg-latte/55 p-6 sm:p-8">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold lg:justify-start">
            <ClockIcon className="size-5 text-primary" />
            Jam Buka
          </h2>
          <div className="mt-4">
            <HoursList hours={info.opening_hours} />
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center justify-center gap-2 text-2xl font-semibold lg:justify-start">
            <PinIcon className="size-5 text-primary" />
            Lokasi
          </h2>
          {info.address && (
            <p className="mb-4 text-center text-muted lg:text-left">{info.address}</p>
          )}
          <MapEmbed
            embedUrl={info.maps_embed_url}
            address={info.address}
            name={info.name}
          />
        </div>
      </section>
    </div>
  );
}