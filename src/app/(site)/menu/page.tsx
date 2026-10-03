import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu-browser";
import { SectionHeading } from "@/components/section-heading";
import { getBusinessInfo, getProducts, groupProductsByCategory } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Daftar lengkap menu kopi, non-kopi, makanan, dan camilan beserta harganya. Pesan langsung lewat WhatsApp.",
};

export default async function MenuPage() {
  const [info, products] = await Promise.all([getBusinessInfo(), getProducts()]);
  const groups = groupProductsByCategory(products);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:pt-16">
      <SectionHeading
        as="h1"
        title="Menu"
        note="pilih, lalu pesan lewat WhatsApp"
        centerOnMobile
      />

      {groups.length === 0 ? (
        <p className="mt-10 rounded-[1.5rem] border border-line bg-surface p-8 text-center text-muted">
          Menu belum tersedia. Silakan cek lagi nanti.
        </p>
      ) : (
        <MenuBrowser
          groups={groups}
          businessName={info.name}
          whatsappNumber={info.whatsapp_number}
        />
      )}
    </section>
  );
}