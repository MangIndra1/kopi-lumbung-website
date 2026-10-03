import { siteConfig } from "@/config/site";
import { formatHours, todayHours } from "@/lib/format";
import type { OpeningHour } from "@/lib/types";

export function HoursList({ hours }: { hours: OpeningHour[] }) {
  const today = todayHours(hours, siteConfig.timeZone);

  return (
    <ul className="divide-y divide-line text-sm">
      {hours.map((h) => {
        const isToday = today?.day === h.day;
        return (
          <li
            key={h.day}
            className={`flex items-center justify-between gap-4 py-2.5 ${
              isToday ? "font-semibold text-ink" : "text-muted"
            }`}
          >
            <span className="flex items-center gap-2">
              {h.day}
              {isToday && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-primary-ink">
                  Hari ini
                </span>
              )}
            </span>
            <span className={h.closed ? "text-primary" : ""}>{formatHours(h)}</span>
          </li>
        );
      })}
    </ul>
  );
}