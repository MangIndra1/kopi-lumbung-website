"use client";

import Image from "next/image";
import { useState } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { formatRupiah } from "@/lib/format";
import { productImage } from "@/lib/placeholder";
import type { Product, ProductGroup } from "@/lib/types";

const ALL = "Semua";

type Props = {
  groups: ProductGroup[];
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function MenuBrowser({ groups }: Props) {
  const [active, setActive] = useState<string>(ALL);
  const categories = [ALL, ...groups.map((g) => g.category)];
  const visible = active === ALL ? groups : groups.filter((g) => g.category === active);

  return (
    <div className="mt-8">
      <div className="sticky top-20 z-30 -mx-4 bg-cream/90 px-4 py-3 backdrop-blur-md">
        <div
          role="group"
          aria-label="Filter kategori menu"
          className="flex gap-2 overflow-x-auto [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className="shrink-0 rounded-full border border-line bg-surface px-5 py-2 text-sm font-medium transition hover:border-ink/40 aria-pressed:border-espresso aria-pressed:bg-espresso aria-pressed:text-cream"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-14">
        {visible.map((g) => (
          <section key={g.category} aria-labelledby={`kategori-${slugify(g.category)}`}>
            <h2
              id={`kategori-${slugify(g.category)}`}
              className="text-3xl font-semibold"
            >
              {g.category}
            </h2>
            <ul className="mt-6 grid gap-4 lg:grid-cols-2">
              {g.items.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function ProductRow({ product: p }: { product: Product }) {
  return (
    <li className="flex gap-4 rounded-[1.5rem] border border-line bg-surface p-3 sm:p-4">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-latte sm:size-28">
        <Image
          src={productImage(p)}
          alt={p.name}
          fill
          sizes="112px"
          className={`object-cover ${p.is_available ? "" : "grayscale"}`}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight font-semibold">{p.name}</h3>
          <span className="shrink-0 font-semibold text-primary">{formatRupiah(p.price)}</span>
        </div>

        {p.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">{p.description}</p>
        )}

        <div className="mt-auto pt-3">
          {p.is_available ? (
            <AddToCart product={p} />
          ) : (
            <span className="inline-block rounded-full bg-latte px-3 py-1 text-xs font-medium text-muted">
              Habis
            </span>
          )}
        </div>
      </div>
    </li>
  );
}