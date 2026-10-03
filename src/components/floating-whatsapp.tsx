import { WhatsAppIcon } from "@/components/icons";

export function FloatingWhatsApp({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed right-4 bottom-4 md:hidden z-40 inline-flex items-center gap-2 rounded-full bg-[#12803f] px-4 py-3.5 font-medium text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:brightness-110 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}