import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBusinessInfo } from "@/lib/data";
import { waLink } from "@/lib/wa";

export const revalidate = 3600;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const info = await getBusinessInfo();
  const waHref = waLink(info.whatsapp_number, info.wa_greeting);

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        Lewati ke konten
      </a>

      <SiteHeader name={info.name} tagline={info.tagline} waHref={waHref} />
      <main id="konten" className="overflow-x-clip">
        {children}
      </main>
      <SiteFooter info={info} waHref={waHref} />
      <FloatingWhatsApp href={waHref} />
    </>
  );
}