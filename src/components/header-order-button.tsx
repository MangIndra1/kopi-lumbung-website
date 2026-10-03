"use client";

import { BagIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { openCart, useCart } from "@/lib/cart-store";
import { cartCount } from "@/lib/order";

// Hanya tampil di layar md ke atas. Di HP, tombol melayang yang dipakai.
export function HeaderOrderButton({ waHref }: { waHref: string }) {
  const { lines } = useCart();
  const count = cartCount(lines);

  if (siteConfig.orderMode !== "cart") {
    return (
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-ink transition hover:brightness-110 md:inline-flex"
      >
        <WhatsAppIcon className="size-4" />
        Pesan
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-ink transition hover:brightness-110 md:inline-flex"
    >
      <BagIcon className="size-4" />
      Pesanan
      {count > 0 && (
        <span className="grid min-w-5 place-items-center rounded-full bg-cream px-1.5 text-xs font-semibold text-espresso tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}