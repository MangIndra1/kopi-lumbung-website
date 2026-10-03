import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

type Props = {
  title: string;
  note?: string;
  action?: { href: string; label: string };
  as?: "h1" | "h2";
  centerOnMobile?: boolean;
};

export function SectionHeading({
  title,
  note,
  action,
  as: Tag = "h2",
  centerOnMobile = false,
}: Props) {
  return (
    <div
      className={`flex flex-wrap items-end gap-4 ${
        centerOnMobile ? "justify-center text-center sm:justify-between sm:text-left" : "justify-between"
      }`}
    >
      <div>
        <Tag className="text-4xl font-semibold sm:text-5xl">{title}</Tag>
        {note && <p className="mt-1 font-hand text-2xl text-primary">{note}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium transition hover:border-ink/40"
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}