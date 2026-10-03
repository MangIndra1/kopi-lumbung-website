import { useSyncExternalStore } from "react";
import type { OrderType } from "@/lib/order";

export type CartLine = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  note: string;
};

export type CartState = {
  lines: CartLine[];
  customerName: string;
  type: OrderType;
  tableNumber: string;
  note: string;
};

const STORAGE_KEY = "umkm-cart.v1";
const MAX_AGE_MS = 12 * 60 * 60 * 1000; // keranjang basi dibuang setelah 12 jam
const MAX_QTY = 20;

const EMPTY: CartState = {
  lines: [],
  customerName: "",
  type: "dine-in",
  tableNumber: "",
  note: "",
};

// ── Store sederhana di luar React (dibaca lewat useSyncExternalStore) ──
let state: CartState | null = null; // dimuat malas dari localStorage
let open = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((l) => l());
}

// localStorage bisa dimanipulasi / rusak: validasi bentuknya.
function sanitize(raw: unknown): CartState {
  if (typeof raw !== "object" || raw === null) return EMPTY;
  const r = raw as Record<string, unknown>;

  const lines: CartLine[] = Array.isArray(r.lines)
    ? r.lines.flatMap((l): CartLine[] => {
        if (typeof l !== "object" || l === null) return [];
        const x = l as Record<string, unknown>;
        if (
          typeof x.productId !== "string" ||
          typeof x.name !== "string" ||
          typeof x.price !== "number" ||
          typeof x.qty !== "number" ||
          !Number.isFinite(x.price) ||
          x.price < 0
        ) {
          return [];
        }
        return [
          {
            productId: x.productId,
            name: x.name,
            price: x.price,
            qty: Math.min(MAX_QTY, Math.max(1, Math.floor(x.qty))),
            note: typeof x.note === "string" ? x.note.slice(0, 80) : "",
          },
        ];
      })
    : [];

  return {
    lines,
    customerName: typeof r.customerName === "string" ? r.customerName.slice(0, 40) : "",
    type: r.type === "takeaway" ? "takeaway" : "dine-in",
    tableNumber: typeof r.tableNumber === "string" ? r.tableNumber.slice(0, 10) : "",
    note: typeof r.note === "string" ? r.note.slice(0, 200) : "",
  };
}

function load(): CartState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as { savedAt?: unknown; state?: unknown };
    if (typeof parsed.savedAt !== "number" || Date.now() - parsed.savedAt > MAX_AGE_MS) {
      return EMPTY;
    }
    return sanitize(parsed.state);
  } catch {
    return EMPTY;
  }
}

function getState(): CartState {
  if (state === null) state = load();
  return state;
}

function commit(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), state: next }));
  } catch {
    // penyimpanan penuh / diblokir: keranjang tetap jalan di memori
  }
  emit();
}

// ── Hooks ──────────────────────────────────────────────────────────────
export function useCart(): CartState {
  return useSyncExternalStore(subscribe, getState, () => EMPTY);
}

export function useCartOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => open,
    () => false,
  );
}

// ── Aksi ───────────────────────────────────────────────────────────────
export function addItem(product: { id: string; name: string; price: number }) {
  const s = getState();
  const existing = s.lines.find((l) => l.productId === product.id);
  const lines = existing
    ? s.lines.map((l) =>
        l.productId === product.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l,
      )
    : [
        ...s.lines,
        { productId: product.id, name: product.name, price: product.price, qty: 1, note: "" },
      ];
  commit({ ...s, lines });
}

export function changeQty(productId: string, delta: number) {
  const s = getState();
  const lines = s.lines.flatMap((l) => {
    if (l.productId !== productId) return [l];
    const qty = Math.min(MAX_QTY, l.qty + delta);
    return qty <= 0 ? [] : [{ ...l, qty }];
  });
  commit({ ...s, lines });
}

export function setLineNote(productId: string, note: string) {
  const s = getState();
  commit({
    ...s,
    lines: s.lines.map((l) => (l.productId === productId ? { ...l, note } : l)),
  });
}

export function setField<K extends "customerName" | "type" | "tableNumber" | "note">(
  key: K,
  value: CartState[K],
) {
  commit({ ...getState(), [key]: value });
}

export function clearCart() {
  const s = getState();
  commit({ ...EMPTY, customerName: s.customerName, type: s.type, tableNumber: s.tableNumber });
}

export function openCart() {
  if (open) return;
  open = true;
  emit();
}

export function closeCart() {
  if (!open) return;
  open = false;
  emit();
}