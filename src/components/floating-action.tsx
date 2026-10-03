"use client";

import { BagIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { openCart, useCart } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { cartCount, orderTotal } from "@/lib/order";

// Hanya tampil di HP (di bawah md).
// Keranjang kosong -> tombol chat WhatsApp. Ada isi -> bilah "Pesanan Saya".
export function FloatingAction({ waHref }: { waHref: string }) {
  const { lines } = useCart();
  const count = cartCount(lines);

  if (siteConfig.orderMode === "cart" && count > 0) {
    return (
      <button
        type="button"
        onClick={openCart}
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-3 rounded-full bg-espresso px-5 py-3.5 text-cream shadow-lg shadow-black/25 md:hidden"
      >
        <span className="flex items-center gap-2.5 font-medium">
          <BagIcon className="size-5" />
          Pesanan Saya ({count})
        </span>
        <span className="font-semibold tabular-nums">{formatRupiah(orderTotal(lines))}</span>
      </button>
    );
  }

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#12803f] text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:brightness-110 md:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}