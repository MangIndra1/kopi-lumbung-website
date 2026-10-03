import type { Metadata } from "next";
import { HoursList } from "@/components/hours-list";
import { InstagramIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { MapEmbed } from "@/components/map-embed";
import { SectionHeading } from "@/components/section-heading";
import { getBusinessInfo } from "@/lib/data";
import { waLink } from "@/lib/wa";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi kami lewat WhatsApp, media sosial, atau datang langsung ke kedai.",
};

export default async function KontakPage() {
  const info = await getBusinessInfo();
  const wa = waLink(info.whatsapp_number, info.wa_greeting);

  const links = [
    info.instagram_url && { label: "Instagram", href: info.instagram_url, icon: InstagramIcon },
    info.tiktok_url && { label: "TikTok", href: info.tiktok_url, icon: null },
    info.email && { label: info.email, href: `mailto:${info.email}`, icon: null },
  ].filter(Boolean) as {
    label: string;
    href: string;
    icon: typeof InstagramIcon | null;
  }[];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:pt-16">
      <SectionHeading
        as="h1"
        title="Kontak"
        note="mampir atau sapa kami"
        centerOnMobile
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] bg-espresso p-6 text-center text-latte sm:p-8 lg:text-left">
            <h2 className="text-2xl font-semibold text-cream">Chat lewat WhatsApp</h2>
            <p className="mt-2 text-sm text-latte/80">
              Tanya menu, reservasi meja, atau pesan untuk acara. Kami balas di jam buka.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-ink transition hover:opacity-90"
            >
              <WhatsAppIcon className="size-5" />
              Chat sekarang
            </a>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
            {info.address && (
              <div className="flex gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h2 className="font-semibold">Alamat</h2>
                  <p className="text-sm text-muted">{info.address}</p>
                </div>
              </div>
            )}

            {links.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition hover:border-ink/40"
                    >
                      {l.icon && <l.icon className="size-4" />}
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-[2rem] bg-latte/55 p-6 sm:p-8">
            <h2 className="mb-2 text-center text-2xl font-semibold lg:text-left">Jam Buka</h2>
            <HoursList hours={info.opening_hours} />
          </div>
        </div>

        <div>
          <MapEmbed
            embedUrl={info.maps_embed_url}
            address={info.address}
            name={info.name}
          />
        </div>
      </div>
    </div>
  );
}