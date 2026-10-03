"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MenuIcon } from "@/components/icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi utama" className="hidden md:block">
      <ul className="flex items-center gap-1 text-sm">
        {siteConfig.nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="rounded-full px-4 py-2 text-muted transition-colors hover:bg-latte/60 hover:text-ink aria-[current=page]:bg-latte aria-[current=page]:font-medium aria-[current=page]:text-ink"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative md:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full border border-line text-ink"
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
      </button>

      {open && (
        <ul
          id="menu-mobile"
          className="absolute right-0 mt-3 w-48 rounded-2xl border border-line bg-surface p-2 text-sm shadow-xl"
        >
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-latte/60 aria-[current=page]:bg-latte aria-[current=page]:font-medium"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}