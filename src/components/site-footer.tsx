import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatHours } from "@/lib/format";
import type { BusinessInfo } from "@/lib/types";
import { CupIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";

type Props = {
  info: BusinessInfo;
  waHref: string;
};

export function SiteFooter({ info, waHref }: Props) {
  return (
    <footer className="mt-24 border-t border-line bg-latte/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-espresso text-latte">
              <CupIcon className="size-5" />
            </span>
            <span className="font-serif text-xl font-semibold">{info.name}</span>
          </div>
          {info.tagline && <p className="mt-3 max-w-xs text-sm text-muted">{info.tagline}</p>}
          {info.address && <p className="mt-4 max-w-xs text-sm text-muted">{info.address}</p>}

          <div className="mt-5 flex gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink hover:border-primary hover:text-primary"
            >
              <WhatsAppIcon className="size-5" />
              <span className="sr-only">WhatsApp</span>
            </a>
            {info.instagram_url && (
              <a
                href={info.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="size-5" />
                <span className="sr-only">Instagram</span>
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide uppercase">Jam buka</h2>
          <dl className="mt-4 space-y-1.5 text-sm">
            {info.opening_hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 text-muted">
                <dt>{h.day}</dt>
                <dd className="tabular-nums">{formatHours(h)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide uppercase">Jelajahi</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 pt-5 pb-24 text-center text-xs text-muted sm:pb-5">
        <p>
          © {new Date().getFullYear()} {info.name}. Semua hak dilindungi.
        </p>
        {siteConfig.isDemo && (
          <p className="mt-1">
            Situs demo untuk portofolio. Bisnis, ulasan, dan data di sini fiktif.
          </p>
        )}
      </div>
    </footer>
  );
}
