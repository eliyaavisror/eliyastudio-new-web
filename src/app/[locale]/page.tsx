import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getArchProjects } from "@/data/projects";
import HeroSlideshow from "@/components/HeroSlideshow";

export default async function HomePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImages = getArchProjects()
    .filter((p) => p.slug !== "office-building")
    .map((p) => p.cover);
  return <Content heroImages={heroImages} />;
}

function Content({ heroImages }: { heroImages: string[] }) {
  const t = useTranslations("home");
  const locale = useLocale() as "he" | "en";
  const isHe = locale === "he";

  const studioIcons = isHe
    ? [
        {
          title: "רגישות לאדם ולמקום",
          desc: "תכנון קשוב לאור, לטבע ולאורח החיים",
          icon: (
            <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="36" cy="34" r="26" strokeWidth="1.2" className="opacity-50" />
              <rect x="15" y="17" width="42" height="42" strokeWidth="1.2" className="opacity-40" />
              <circle cx="36" cy="23.5" r="3.2" strokeWidth="1.4" />
              <path d="M18 21.5L32.8 29M54 21.5L39.2 29" strokeWidth="1.2" className="opacity-65" />
              <line x1="15" y1="29" x2="57" y2="29" strokeWidth="1.4" />
              <path d="M32.8 29L33.8 41.5H38.2L39.2 29" strokeWidth="1.4" />
              <path d="M34.2 41.5L24.5 56.5M37.8 41.5L47.5 56.5" strokeWidth="1.2" className="opacity-65" />
              <path d="M34.6 41.5V59M37.4 41.5V59" strokeWidth="1.4" />
            </svg>
          ),
        },
        {
          title: "טכנולוגיית BIM & AI",
          desc: "מודל חכם, סימולציות ודיוק בביצוע",
          icon: (
            <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <polygon points="36 13 57 25 57 49 36 61 15 49 15 25 36 13" strokeWidth="1.5" strokeLinejoin="round" />
              <polyline points="15 25 36 37 57 25" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="36" y1="37" x2="36" y2="61" strokeWidth="1.3" />
              <polyline points="15 49 36 37 57 49" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-40" />
              <circle cx="36" cy="13" r="2.3" fill="currentColor" />
              <circle cx="57" cy="25" r="2.3" fill="currentColor" />
              <circle cx="15" cy="25" r="2.3" fill="currentColor" />
              <circle cx="36" cy="37" r="2.6" fill="currentColor" />
            </svg>
          ),
        },
        {
          title: "הדמיות פוטוריאליסטיות",
          desc: "לחוות את המרחב לפני תחילת הבנייה",
          icon: (
            <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="13" y="17" width="46" height="38" strokeWidth="1.5" />
              <rect x="26" y="27" width="20" height="18" strokeWidth="1.2" className="opacity-65" />
              <line x1="13" y1="17" x2="26" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="59" y1="17" x2="46" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="13" y1="55" x2="26" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="59" y1="55" x2="46" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: "Human & Site Sensitivity",
          desc: "Design attuned to light, nature and lifestyle",
          icon: (
            <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="36" cy="34" r="26" strokeWidth="1.2" className="opacity-50" />
              <rect x="15" y="17" width="42" height="42" strokeWidth="1.2" className="opacity-40" />
              <circle cx="36" cy="23.5" r="3.2" strokeWidth="1.4" />
              <path d="M18 21.5L32.8 29M54 21.5L39.2 29" strokeWidth="1.2" className="opacity-65" />
              <line x1="15" y1="29" x2="57" y2="29" strokeWidth="1.4" />
              <path d="M32.8 29L33.8 41.5H38.2L39.2 29" strokeWidth="1.4" />
              <path d="M34.2 41.5L24.5 56.5M37.8 41.5L47.5 56.5" strokeWidth="1.2" className="opacity-65" />
              <path d="M34.6 41.5V59M37.4 41.5V59" strokeWidth="1.4" />
            </svg>
          ),
        },
        {
          title: "BIM & AI Technology",
          desc: "Smart modeling, simulations and precision",
          icon: (
            <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <polygon points="36 13 57 25 57 49 36 61 15 49 15 25 36 13" strokeWidth="1.5" strokeLinejoin="round" />
              <polyline points="15 25 36 37 57 25" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="36" y1="37" x2="36" y2="61" strokeWidth="1.3" />
              <polyline points="15 49 36 37 57 49" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-40" />
              <circle cx="36" cy="13" r="2.3" fill="currentColor" />
              <circle cx="57" cy="25" r="2.3" fill="currentColor" />
              <circle cx="15" cy="25" r="2.3" fill="currentColor" />
              <circle cx="36" cy="37" r="2.6" fill="currentColor" />
            </svg>
          ),
        },
        {
          title: "Photorealistic 3D",
          desc: "Experience the space before construction begins",
          icon: (
            <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="13" y="17" width="46" height="38" strokeWidth="1.5" />
              <rect x="26" y="27" width="20" height="18" strokeWidth="1.2" className="opacity-65" />
              <line x1="13" y1="17" x2="26" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="59" y1="17" x2="46" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="13" y1="55" x2="26" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="59" y1="55" x2="46" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
            </svg>
          ),
        },
      ];

  return (
    <>
      {/* ══ HERO — Full Viewport Height + Centered Gently Bouncing Scroll Hint ══ */}
      <section className="relative min-h-[100svh] flex flex-col pt-28 md:pt-36 pb-8 md:pb-10 text-paper">
        <HeroSlideshow images={heroImages} />

        {/* Spacer to push scroll indicator to the bottom */}
        <div className="flex-1" />

        {/* Centered gently bouncing scroll indicator */}
        <div className="container-x relative pt-5 flex justify-center">
          <span className="animate-gentle-bounce inline-flex items-center gap-1.5 text-xs sm:text-sm font-light tracking-[0.2em] text-paper/90">
            <span>↓</span>
            <span>{isHe ? "גלול" : "Scroll"}</span>
          </span>
        </div>
      </section>

      {/* ══ STUDIO IDENTITY — Iconic Summary + Centered Borderless Link ══ */}
      <section className="py-16 md:py-24 bg-paper-warm text-ink border-b border-ink/12">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-tight text-ink leading-snug">
              {isHe ? (
                <>
                  <span className="block">המטרה שלנו היא להגשים את החלום שלכם,</span>
                  <span className="block">לא את החלומות שלנו דרככם</span>
                </>
              ) : (
                <>
                  <span className="block">Our goal is to realize your dream,</span>
                  <span className="block">not our own dreams through you</span>
                </>
              )}
            </h1>
            <p className="mt-3 text-base md:text-lg font-light text-ink-soft leading-relaxed">
              {isHe
                ? "כך אנו הופכים את החזון שלכם למציאות בנויה בסטודיו:"
                : "How we turn your vision into built reality at the studio:"}
            </p>
          </div>

          {/* 3 Iconic Pillars */}
          <div className="mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12 max-w-4xl mx-auto">
            {studioIcons.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center text-center"
              >
                <div className="text-ink/80 group-hover:text-ink group-hover:scale-105 transition-all duration-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-light text-ink-soft max-w-[22ch] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Centered borderless button */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm md:text-base font-medium text-ink link-underline pb-1 transition-opacity hover:opacity-80"
            >
              <span>{isHe ? "על הסטודיו וגישת התכנון" : "About the Studio & Approach"}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
              >
                {isHe ? "←" : "→"}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO — Centered Content & Elevated Buttons + Smooth Hover Image ══ */}
      <section className="py-16 md:py-24 bg-paper text-ink border-b border-ink/12 w-full max-w-full overflow-hidden">
        <div className="container-x">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink text-center mb-10 md:mb-12">
            {t("services.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ServiceCard
              href="/architecture"
              image="/images/projects/architecture/island-of-calm/הדמיה כללית.webp"
              icon={
                <svg width="52" height="52" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 46H48" />
                  <path d="M13 46V23L28 11L43 23V46" />
                  <path d="M22 46V31H34V46" />
                  <path d="M28 11V31" strokeDasharray="2.5 2.5" className="opacity-50" />
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
                <svg width="52" height="52" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="28 8 46 18.5 46 39.5 28 50 10 39.5 10 18.5 28 8" />
                  <polyline points="10 18.5 28 29 46 18.5" />
                  <line x1="28" y1="29" x2="28" y2="50" />
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
      <section className="py-12 md:py-16 bg-paper-warm text-ink">
        <div className="container-x flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
            {t("cta.title")}
          </h2>
          <p className="mt-1.5 text-sm md:text-base font-light text-ink-soft">
            {t("cta.body")}
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2.5 px-7 py-2.5 border border-ink text-ink bg-transparent hover:bg-ink hover:text-paper text-xs font-medium uppercase tracking-wider transition-all duration-300"
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
      className="group relative overflow-hidden flex flex-col items-center text-center justify-between bg-paper-warm/70 border border-ink/15 hover:border-ink/40 px-8 py-12 sm:py-14 transition-all duration-700 ease-out w-full max-w-full"
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
        <div className="absolute inset-0 bg-ink/65" />
      </div>

      {/* Centered Icon + Title + Subtitle */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-ink/75 group-hover:text-paper group-hover:scale-105 transition-all duration-700 ease-out mb-5">
          {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink group-hover:text-paper transition-colors duration-700 ease-out">
          {title}
        </h3>
        <p className="mt-2 text-sm md:text-base font-light text-ink-soft group-hover:text-paper/85 max-w-[30ch] transition-colors duration-700 ease-out">
          {body}
        </p>
      </div>

      {/* Refined Centered Button */}
      <span className="relative z-10 mt-8 inline-flex items-center gap-2.5 px-7 py-3 border border-ink/35 bg-transparent text-ink group-hover:bg-paper group-hover:text-ink group-hover:border-paper text-xs font-medium uppercase tracking-wider transition-all duration-500 ease-out">
        <span>{ctaText}</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
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
