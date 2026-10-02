import type { OpeningHour } from "@/lib/types";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// 22000 -> "Rp 22.000"
export function formatRupiah(value: number): string {
  return rupiah.format(value);
}
const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

// Jam buka hari ini menurut zona waktu usaha, bukan zona waktu server.
export function todayHours(hours: OpeningHour[], timeZone: string): OpeningHour | undefined {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone })
    .format(new Date());
  const index = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  return hours.find((h) => h.day === dayNames[index]);
}

// "08:00" + "22:00" -> "08.00–22.00" (format jam Indonesia)
export function formatHours(h: OpeningHour): string {
  if (h.closed) return "Tutup";
  return `${h.open.replace(":", ".")}–${h.close.replace(":", ".")}`;
}
