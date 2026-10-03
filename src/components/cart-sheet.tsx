"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/icons";
import { QtyStepper } from "@/components/qty-stepper";
import {
  clearCart,
  closeCart,
  setField,
  setLineNote,
  useCart,
  useCartOpen,
} from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { buildOrderMessage, orderTotal, orderTypeLabel, type OrderType } from "@/lib/order";
import { waLink } from "@/lib/wa";

type Props = {
  businessName: string;
  whatsappNumber: string;
};

const input =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-muted/70 focus:border-primary";

export function CartSheet({ businessName, whatsappNumber }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useCartOpen();
  const cart = useCart();
  const [tried, setTried] = useState(false);

  // <dialog> bawaan browser: fokus terkunci, Esc menutup, ada backdrop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const nameOk = cart.customerName.trim().length > 0;
  const tableOk = cart.type === "takeaway" || cart.tableNumber.trim().length > 0;
  const canSend = cart.lines.length > 0 && nameOk && tableOk;

  const href = waLink(
    whatsappNumber,
    buildOrderMessage(businessName, {
      customerName: cart.customerName,
      type: cart.type,
      tableNumber: cart.tableNumber,
      note: cart.note,
      lines: cart.lines,
    }),
  );

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="judul-pesanan"
      onClose={closeCart}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-[2rem] bg-cream p-0 text-ink backdrop:bg-espresso/50 backdrop:backdrop-blur-sm md:mt-0 md:ml-auto md:h-dvh md:max-h-none md:w-[28rem] md:rounded-l-[2rem] md:rounded-tr-none"
    >
      <div className="flex max-h-[92dvh] flex-col md:h-dvh md:max-h-none">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="judul-pesanan" className="text-2xl font-semibold">
            Pesanan Saya
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="grid size-10 place-items-center rounded-full border border-line hover:bg-latte/60"
          >
            <CloseIcon className="size-5" />
            <span className="sr-only">Tutup</span>
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-14 text-center">
            <p className="text-muted">Belum ada menu yang dipilih.</p>
            <Link
              href="/menu"
              onClick={closeCart}
              className="rounded-full bg-espresso px-6 py-3 text-sm font-medium text-cream"
            >
              Lihat menu
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <ul className="space-y-4">
                {cart.lines.map((line) => (
                  <li key={line.productId} className="rounded-2xl border border-line bg-surface p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif font-semibold">{line.name}</p>
                        <p className="text-sm text-muted tabular-nums">
                          {formatRupiah(line.price)} × {line.qty}
                        </p>
                      </div>
                      <QtyStepper productId={line.productId} name={line.name} qty={line.qty} />
                    </div>
                    <input
                      type="text"
                      value={line.note}
                      maxLength={80}
                      onChange={(e) => setLineNote(line.productId, e.target.value)}
                      placeholder="Catatan (mis. es sedikit, tanpa gula)"
                      aria-label={`Catatan untuk ${line.name}`}
                      className={`${input} mt-3`}
                    />
                  </li>
                ))}
              </ul>

              <fieldset>
                <legend className="mb-2 text-sm font-semibold">Tipe pesanan</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(orderTypeLabel) as OrderType[]).map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input
                        type="radio"
                        name="tipe-pesanan"
                        value={t}
                        checked={cart.type === t}
                        onChange={() => setField("type", t)}
                        className="peer sr-only"
                      />
                      <span className="block rounded-xl border border-line bg-surface px-3 py-2.5 text-center text-sm font-medium peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                        {orderTypeLabel[t]}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={`grid gap-4 ${cart.type === "dine-in" ? "sm:grid-cols-2" : ""}`}>
                <div>
                  <label htmlFor="nama-pemesan" className="mb-1.5 block text-sm font-semibold">
                    Nama
                  </label>
                  <input
                    id="nama-pemesan"
                    type="text"
                    value={cart.customerName}
                    maxLength={40}
                    autoComplete="name"
                    onChange={(e) => setField("customerName", e.target.value)}
                    placeholder="Nama Anda"
                    aria-invalid={tried && !nameOk}
                    className={input}
                  />
                  {tried && !nameOk && (
                    <p className="mt-1 text-xs text-primary">Isi nama dulu ya.</p>
                  )}
                </div>

                {cart.type === "dine-in" && (
                  <div>
                    <label htmlFor="nomor-meja" className="mb-1.5 block text-sm font-semibold">
                      Nomor meja
                    </label>
                    <input
                      id="nomor-meja"
                      type="text"
                      value={cart.tableNumber}
                      maxLength={10}
                      onChange={(e) => setField("tableNumber", e.target.value)}
                      placeholder="mis. 5"
                      aria-invalid={tried && !tableOk}
                      className={input}
                    />
                    {tried && !tableOk && (
                      <p className="mt-1 text-xs text-primary">Isi nomor meja.</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="catatan-umum" className="mb-1.5 block text-sm font-semibold">
                  Catatan untuk pesanan <span className="font-normal text-muted">(opsional)</span>
                </label>
                <textarea
                  id="catatan-umum"
                  value={cart.note}
                  maxLength={200}
                  rows={2}
                  onChange={(e) => setField("note", e.target.value)}
                  placeholder="mis. tolong dibungkus terpisah"
                  className={input}
                />
              </div>
            </div>

            <div className="border-t border-line bg-surface px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">Total</span>
                <span className="text-xl font-semibold tabular-nums">
                  {formatRupiah(orderTotal(cart.lines))}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">Harga final dikonfirmasi kasir.</p>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canSend}
                onClick={(e) => {
                  if (!canSend) {
                    e.preventDefault();
                    setTried(true);
                  }
                }}
                className={`mt-4 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-medium text-white transition ${
                  canSend ? "bg-[#12803f] hover:brightness-110" : "bg-[#12803f]/60"
                }`}
              >
                <WhatsAppIcon className="size-5" />
                Kirim pesanan via WhatsApp
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full text-center text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Kosongkan pesanan
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}