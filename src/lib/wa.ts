export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

export function waLink(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizePhone(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productOrderMessage(businessName: string, productName: string) {
  return `Halo ${businessName}, saya mau pesan ${productName}. Terima kasih!`;
}