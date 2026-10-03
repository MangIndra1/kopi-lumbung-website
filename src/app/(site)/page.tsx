import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getBusinessInfo, getFeaturedProducts, getTestimonials } from "@/lib/data";
import { formatHours, formatRupiah, todayHours } from "@/lib/format";
import { aboutImage, demoImages, heroImage, productImage } from "@/lib/placeholder";
import { AddToCart } from "@/components/add-to-cart";
import { waLink } from "@/lib/wa";
import { SectionHeading } from "@/components/section-heading";
import {
  ArrowRightIcon,
  BeanIcon,
  ClockIcon,
  FlameIcon,
  PinIcon,
  SeatIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/icons";

export const revalidate = 3600;

const highlightIcons = { bean: BeanIcon, flame: FlameIcon, seat: SeatIcon };

export default async function Home() {
  const [info, featured, testimonials] = await Promise.all([
    getBusinessInfo(),
    getFeaturedProducts(4),
    getTestimonials(),
  ]);

  const waHref = waLink(info.whatsapp_number, info.wa_greeting);
  const today = todayHours(info.opening_hours, siteConfig.timeZone);
  const avgRating = testimonials.length
    ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
    : null;
  const { home } = siteConfig;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-32 -z-10 size-[34rem] rounded-[45%_55%_60%_40%/55%_45%_55%_45%] bg-latte/70 blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="absolute top-72 -left-40 -z-10 size-[26rem] rounded-[60%_40%_45%_55%/50%_60%_40%_50%] bg-caramel/15"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted">
              <span className="size-1.5 rounded-full bg-secondary" />
              {home.eyebrow}
            </p>

            <h1 className="mt-6 text-4xl leading-[1.02] font-semibold min-[420px]:text-5xl sm:text-6xl lg:text-7xl">
              {info.name}
            </h1>
            {info.tagline && (
              <p className="mt-3 font-serif text-2xl text-primary italic sm:text-3xl">
                {info.tagline}
              </p>
            )}
            {info.hero_description && (
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                {info.hero_description}
              </p>
            )}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full bg-espresso px-6 py-3.5 font-medium text-cream shadow-lg shadow-espresso/20 transition hover:-translate-y-0.5 sm:w-auto"
              >
                <WhatsAppIcon className="size-5" />
                Pesan via WhatsApp
              </a>
              <Link
                href="/menu"
                className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-medium transition hover:border-ink/40 sm:w-auto"
              >
                Lihat Menu
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>

            {avgRating !== null && (
              <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
                <div className="flex -space-x-2.5">
                  {testimonials.slice(0, 3).map((t) => (
                    <span
                      key={t.id}
                      className="grid size-10 place-items-center rounded-full border-2 border-cream bg-latte font-serif text-sm font-semibold"
                    >
                      {t.author_name.charAt(0)}
                    </span>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="flex items-center gap-1 font-semibold">
                    <StarIcon className="size-4 text-accent" />
                    {avgRating.toFixed(1)}
                    <span className="font-normal text-muted">/ 5</span>
                  </p>
                  <p className="text-muted">rata-rata ulasan pelanggan</p>
                </div>
              </div>
            )}
          </div>

          {/* Visual: foto berbentuk lengkung */}
          <div className="relative mx-auto w-full max-w-md">
            <p
              aria-hidden="true"
              className="absolute -top-6 -right-2 z-10 rotate-6 font-hand text-2xl leading-none text-primary sm:-right-10 sm:text-3xl"
            >
              {home.heroNote} ♡
            </p>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] border-[10px] border-surface bg-latte shadow-[0_30px_60px_-25px_rgb(58_35_24/0.45)]">
              <Image
                src={heroImage(info)}
                alt={`Kopi di ${info.name}`}
                fill
                preload
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>

            {today && (
              <div className="absolute -bottom-6 -left-2 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl sm:-left-10">
                <span className="grid size-10 place-items-center rounded-full bg-secondary/15 text-secondary">
                  <ClockIcon className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted">Buka hari ini</p>
                  <p className="font-semibold tabular-nums">{formatHours(today)}</p>
                </div>
              </div>
            )}

            {featured[0] && (
              <div className="absolute top-1/2 -right-2 hidden w-44 rounded-2xl border border-line bg-surface p-3 shadow-xl sm:block lg:-right-8">
                <p className="text-xs text-muted">Favorit kami</p>
                <p className="mt-0.5 font-serif font-semibold">{featured[0].name}</p>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {formatRupiah(featured[0].price)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Highlight ─────────────────────────────────────── */}
      <section aria-label="Kenapa mampir" className="mx-auto max-w-6xl px-4">
        <ul className="grid gap-3 rounded-[2rem] border border-line bg-surface p-3 sm:grid-cols-3">
          {home.highlights.map((h) => {
            const Icon = highlightIcons[h.icon as keyof typeof highlightIcons];
            return (
              <li key={h.title} className="flex items-start gap-4 rounded-3xl bg-latte/45 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-espresso text-latte">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-base font-semibold">{h.title}</p>
                  <p className="mt-1 text-sm text-muted">{h.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Menu andalan: carousel di HP, grid di layar lebar ─ */}
      {featured.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:mt-28">
          <SectionHeading
            title="Menu Andalan"
            note="yang paling sering dipesan"
            centerOnMobile
            action={{ href: "/menu", label: "Semua menu" }}
          />

          <ul className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {featured.map((p) => (
              <li key={p.id} className="relative w-[78%] shrink-0 snap-start pt-20 sm:w-auto">
                <div className="absolute top-0 left-1/2 z-10 size-40 -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-cream bg-latte shadow-xl">
                  <Image
                    src={productImage(p)}
                    alt={p.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <article className="flex h-full flex-col rounded-[2rem] rounded-t-[5rem] bg-gradient-to-b from-[#6e4128] to-espresso px-6 pt-24 pb-6 text-cream">
                  <p className="text-xs tracking-wide text-latte/70 uppercase">{p.category}</p>
                  <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
                  {p.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-latte/80">
                      {p.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-lg font-semibold">{formatRupiah(p.price)}</span>
                    <AddToCart product={p} tone="light" />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Tentang (teaser ke /tentang) ──────────────────── */}
      <section className="mx-auto mt-20 grid max-w-6xl items-stretch gap-6 px-4 sm:mt-28 lg:grid-cols-2">
        <div className="flex flex-col rounded-[2rem] bg-latte/55 p-8 sm:p-10">
          <SectionHeading title="Cerita Kami" note="dari satu meja kecil" />
          <div aria-hidden="true" className="mt-6 flex gap-1.5">
            <span className="h-1.5 w-12 rounded-full bg-primary" />
            <span className="h-1.5 w-6 rounded-full bg-caramel" />
            <span className="h-1.5 w-3 rounded-full bg-caramel/50" />
          </div>
          {info.about_story && (
            <p className="mt-6 leading-relaxed text-muted">{info.about_story}</p>
          )}

          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            {info.address && (
              <div className="flex gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-semibold">Lokasi</dt>
                  <dd className="text-muted">{info.address}</dd>
                </div>
              </div>
            )}
            {today && (
              <div className="flex gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-semibold">Hari ini</dt>
                  <dd className="text-muted tabular-nums">{formatHours(today)}</dd>
                </div>
              </div>
            )}
          </dl>

          <Link
            href="/tentang"
            className="group mt-auto inline-flex items-center gap-2 self-start pt-8 font-medium text-primary"
          >
            Kenalan lebih jauh
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] lg:min-h-0">
          <Image
            src={aboutImage(info)}
            alt={`Suasana di ${info.name}`}
            fill
            sizes="(min-width: 1024px) 36rem, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 bottom-4 hidden aspect-square w-36 overflow-hidden rounded-3xl border-[6px] border-cream bg-latte shadow-xl sm:block">
            <Image
              src={demoImages.aboutSecondary}
              alt=""
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Testimoni ─────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:mt-28">
          <SectionHeading title="Kata Mereka" note="cerita dari meja sebelah" centerOnMobile />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.id}>
                <figure className="flex h-full flex-col rounded-[2rem] border border-line bg-surface p-7">
                  <div className="flex gap-0.5 text-accent" aria-label={`${t.rating} dari 5 bintang`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className={`size-4 ${i < t.rating ? "" : "opacity-25"}`} />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 font-serif text-lg leading-snug">
                    “{t.content}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 text-sm">
                    <span className="grid size-9 place-items-center rounded-full bg-latte font-serif font-semibold">
                      {t.author_name.charAt(0)}
                    </span>
                    <span className="font-medium">{t.author_name}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── CTA WhatsApp ──────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:mt-28">
        <div className="relative grid overflow-hidden rounded-[2rem] bg-espresso text-cream md:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10 p-8 sm:p-12">
            <h2 className="text-3xl font-semibold sm:text-4xl">Mampir, atau pesan duluan.</h2>
            <p className="mt-3 max-w-md text-latte/80">
              Chat kami di WhatsApp untuk pesan antar, ambil di tempat, atau tanya-tanya soal
              menu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-ink transition hover:brightness-110"
              >
                <WhatsAppIcon className="size-5" />
                Chat WhatsApp
              </a>
              <span className="font-hand text-2xl text-latte">balas cepat, tanpa ribet</span>
            </div>
          </div>
          <div className="relative min-h-48 md:min-h-full">
            <Image
              src={demoImages.beans}
              alt=""
              fill
              sizes="(min-width: 768px) 28rem, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/30 to-transparent md:bg-gradient-to-r" />
          </div>
        </div>
      </section>
    </>
  );
}