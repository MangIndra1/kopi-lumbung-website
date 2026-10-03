import { PinIcon } from "@/components/icons";

const EMBED_PREFIX = "https://www.google.com/maps/embed";

type Props = {
  embedUrl: string | null;
  address: string | null;
  name: string;
};

export function MapEmbed({ embedUrl, address, name }: Props) {
  const valid = embedUrl?.startsWith(EMBED_PREFIX) ? embedUrl : null;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address ?? name,
  )}`;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface">
      {valid ? (
        <iframe
          src={valid}
          title={`Peta lokasi ${name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="aspect-[4/3] w-full border-0 sm:aspect-[16/9]"
        />
      ) : (
        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 text-center text-muted sm:aspect-[16/9]">
          <PinIcon className="size-8 text-primary" />
          <p className="text-sm">Peta belum diatur untuk lokasi ini.</p>
        </div>
      )}
      <div className="border-t border-line p-4 text-center sm:text-left">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <PinIcon className="size-4" />
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}