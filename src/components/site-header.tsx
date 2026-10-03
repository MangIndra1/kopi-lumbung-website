import Link from "next/link";
import { CupIcon, WhatsAppIcon } from "@/components/icons";
import { DesktopNav, MobileNav } from "@/components/site-nav";

type Props = {
  name: string;
  tagline: string | null;
  waHref: string;
};

export function SiteHeader({ name, tagline, waHref }: Props) {
  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-line/80 bg-surface/85 py-2 pr-2 pl-4 shadow-[0_8px_30px_-12px_rgb(58_35_24/0.25)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-espresso text-latte">
            <CupIcon className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold whitespace-nowrap">{name}</span>
            {tagline && (
              <span className="hidden text-[11px] text-muted sm:block">{tagline}</span>
            )}
          </span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-ink transition hover:brightness-110 md:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            <span>Pesan</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}