import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CupIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";

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

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-muted transition-colors hover:bg-latte/60 hover:text-ink aria-[current=page]:bg-latte aria-[current=page]:font-medium aria-[current=page]:text-ink"
                  aria-current={item.href === "/" ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-ink transition hover:brightness-110"
          >
            <WhatsAppIcon className="size-4" />
            <span>Pesan</span>
          </a>

          {/* Menu mobile tanpa JavaScript */}
          <details className="group relative md:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-line text-ink [&::-webkit-details-marker]:hidden">
              <MenuIcon className="size-5" />
              <span className="sr-only">Buka menu</span>
            </summary>
            <ul className="absolute right-0 mt-3 w-48 rounded-2xl border border-line bg-surface p-2 text-sm shadow-xl">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-xl px-3 py-2.5 hover:bg-latte/60">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
