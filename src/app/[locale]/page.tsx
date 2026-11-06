import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getHeroImage } from "@/lib/heroImage";

export default async function HomePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage = getHeroImage("home") ?? "/images/hero/home/TO LR copy.webp";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("home");
  const locale = useLocale() as "he" | "en";
  const isHe = locale === "he";

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[92svh] flex flex-col pt-28 md:pt-36 pb-8 md:pb-10 text-paper">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(1.18) contrast(0.68) saturate(0)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/30 via-ink/55 to-ink/80" />
          <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-ink/70 to-transparent" />
        </div>

        {/* Main content — vertically centered */}
        <div className="container-x relative flex-1 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance max-w-[18ch] leading-tight">
            {t("hero.title")}
          </h1>

          <p className="mt-3.5 text-base sm:text-lg md:text-xl font-light text-paper/85 max-w-[46ch] leading-relaxed text-pretty">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Bottom architectural bar */}
        <div className="container-x relative pt-4 border-t border-paper/20 flex items-center justify-between text-xs text-paper/75">
          <span>{t("hero.eyebrow")}</span>
          <span className="tracking-widest">
            {isHe ? "↓ גלול" : "↓ Scroll"}
          </span>
        </div>
      </section>

      {/* ══ STUDIO IDENTITY — Concise Teaser Leading to About Page ══ */}
      <section className="py-12 md:py-16 bg-paper-warm text-ink border-b border-ink/12">
        <div className="container-x">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-snug">
                {t("intro.title")}
              </h2>
              <p className="mt-2.5 text-base md:text-lg font-light text-ink-soft leading-relaxed text-pretty">
                {t("intro.body")}
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-ink/30 text-ink text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper hover:border-ink transition-all duration-300 shrink-0 self-start lg:self-end"
            >
              <span>{isHe ? "על המשרד וגישת התכנון" : "About the Studio & Approach"}</span>
              <span aria-hidden="true">{isHe ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO — Minimalist Gateway Portals to Architecture & Visualizations ══ */}
      <section className="py-12 md:py-16 bg-paper text-ink border-b border-ink/12 w-full max-w-full overflow-hidden">
        <div className="container-x">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink mb-6 md:mb-8">
            {t("services.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            <ServiceCard
              href="/architecture"
              image="/images/projects/architecture/island-of-calm/הדמיה כללית.webp"
              icon={
                <svg width="34" height="34" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 34H34" />
                  <path d="M7 34V16L19 6L31 16V34" />
                  <path d="M14 34V22H24V34" />
                  <path d="M19 6V22" />
                </svg>
              }
              title={t("services.architecture.title")}
              body={t("services.architecture.body")}
              ctaText={isHe ? "לפרויקטים ולתהליך" : "Explore Architecture"}
            />
            <ServiceCard
              href="/visualizations"
              image="/images/projects/visualizations/exterior/renewal/01_SOL_OUT_01.webp"
              icon={
                <svg width="34" height="34" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="19 4 33 12 33 26 19 34 5 26 5 12 19 4" />
                  <polyline points="5 12 19 20 33 12" />
                  <line x1="19" y1="20" x2="19" y2="34" />
                </svg>
              }
              title={t("services.visualizations.title")}
              body={t("services.visualizations.body")}
              ctaText={isHe ? "לגלריית ההדמיות" : "Explore Visualizations"}
            />
          </div>
        </div>
      </section>

      {/* ══ COMPACT PROPORTIONAL CONTACT STRIP ══ */}
      <section className="py-10 md:py-12 bg-paper-warm text-ink">
        <div className="container-x flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
              {t("cta.title")}
            </h2>
            <p className="mt-1 text-sm md:text-base font-light text-ink-soft">
              {t("cta.body")}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-paper text-xs font-medium uppercase tracking-wider hover:bg-ink-soft transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{t("cta.button")}</span>
            <span aria-hidden="true">{isHe ? "←" : "→"}</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  href,
  image,
  icon,
  title,
  body,
  ctaText,
}: {
  href: string;
  image: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  ctaText: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-paper-warm/70 border border-ink/15 hover:border-ink/40 p-7 sm:p-10 transition-all duration-700 ease-out w-full max-w-full"
    >
      {/* Background project image — smoothly fades in on hover */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/75 via-ink/60 to-ink/50" />
      </div>

      <div className="relative z-10 flex items-start sm:items-center gap-5">
        <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-ink/15 group-hover:border-paper/35 bg-paper group-hover:bg-paper/10 backdrop-blur-[2px] text-ink group-hover:text-paper transition-all duration-700 ease-out">
          {icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink group-hover:text-paper transition-colors duration-700 ease-out">
            {title}
          </h3>
          <p className="mt-1 text-sm md:text-base font-light text-ink-soft group-hover:text-paper/85 transition-colors duration-700 ease-out">
            {body}
          </p>
        </div>
      </div>

      <span className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper group-hover:bg-paper group-hover:text-ink text-xs font-medium uppercase tracking-wider shrink-0 self-start sm:self-center transition-all duration-700 ease-out">
        <span>{ctaText}</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="rtl:rotate-180 transition-transform duration-500 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
