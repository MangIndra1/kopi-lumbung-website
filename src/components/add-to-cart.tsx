"use client";

import { PlusIcon } from "@/components/icons";
import { QtyStepper } from "@/components/qty-stepper";
import { siteConfig } from "@/config/site";
import { addItem, useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

type Props = {
  product: Pick<Product, "id" | "name" | "price">;
  tone?: "dark" | "light";
};

export function AddToCart({ product, tone = "dark" }: Props) {
  const { lines } = useCart();
  if (siteConfig.orderMode !== "cart") return null;

  const line = lines.find((l) => l.productId === product.id);

  if (line) {
    return <QtyStepper productId={product.id} name={product.name} qty={line.qty} tone={tone} />;
  }

  const style =
    tone === "dark"
      ? "bg-espresso text-cream"
      : "bg-cream text-espresso hover:bg-latte";

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      aria-label={`Tambah ${product.name} ke pesanan`}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${style}`}
    >
      <PlusIcon className="size-4" />
      Tambah
    </button>
  );
}