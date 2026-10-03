"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";
import { changeQty } from "@/lib/cart-store";

type Props = {
  productId: string;
  name: string;
  qty: number;
  tone?: "dark" | "light";
};

export function QtyStepper({ productId, name, qty, tone = "dark" }: Props) {
  const btn =
    tone === "dark"
      ? "bg-espresso text-cream hover:brightness-125"
      : "bg-cream text-espresso hover:bg-latte";

  return (
    <div role="group" aria-label={`Jumlah ${name}`} className="inline-flex items-center gap-2.5">
      <button
        type="button"
        aria-label={`Kurangi ${name}`}
        onClick={() => changeQty(productId, -1)}
        className={`grid size-8 place-items-center rounded-full transition ${btn}`}
      >
        <MinusIcon className="size-4" />
      </button>
      <span aria-live="polite" className="min-w-5 text-center font-semibold tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Tambah ${name}`}
        onClick={() => changeQty(productId, 1)}
        className={`grid size-8 place-items-center rounded-full transition ${btn}`}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}