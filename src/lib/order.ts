import { formatRupiah } from "@/lib/format";

export type OrderType = "dine-in" | "takeaway";

export const orderTypeLabel: Record<OrderType, string> = {
  "dine-in": "Dine-in",
  takeaway: "Ambil di tempat",
};

export type OrderLine = {
  name: string;
  price: number;
  qty: number;
  note: string;
};

// Bentuk pesanan standar. Hari ini dikirim sebagai pesan WhatsApp;
// nanti bisa dikirim ke database tanpa mengubah keranjang.
export type Order = {
  customerName: string;
  type: OrderType;
  tableNumber: string;
  note: string;
  lines: OrderLine[];
};

export const orderTotal = (lines: { price: number; qty: number }[]) =>
  lines.reduce((sum, l) => sum + l.price * l.qty, 0);

export const cartCount = (lines: { qty: number }[]) =>
  lines.reduce((sum, l) => sum + l.qty, 0);

// Satu baris saja: cegah teks pengguna merusak format pesan.
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

export function buildOrderMessage(businessName: string, order: Order): string {
  const out: string[] = [];

  out.push(`Halo ${businessName}, saya mau pesan:`);
  out.push(`Nama: ${clean(order.customerName)}`);
  out.push(
    order.type === "dine-in"
      ? `Tipe: ${orderTypeLabel["dine-in"]} (Meja ${clean(order.tableNumber)})`
      : `Tipe: ${orderTypeLabel.takeaway}`,
  );
  out.push("");

  order.lines.forEach((line, i) => {
    out.push(`${i + 1}. ${line.name} x${line.qty} - ${formatRupiah(line.price * line.qty)}`);
    const note = clean(line.note);
    if (note) out.push(`   Catatan: ${note}`);
  });

  out.push("");
  const generalNote = clean(order.note);
  if (generalNote) out.push(`Catatan umum: ${generalNote}`);
  out.push(`Total: ${formatRupiah(orderTotal(order.lines))}`);
  out.push("", "Terima kasih!");

  return out.join("\n");
}