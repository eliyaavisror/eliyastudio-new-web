import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ClientsCarousel from "@/components/ClientsCarousel";
import { clientLogos } from "@/data/clients";
import { getHeroImage } from "@/lib/heroImage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function AboutPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage =
    getHeroImage("about") ??
    "/images/projects/visualizations/exterior/01-VIEW.jpg";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("about");
  const locale = useLocale() as "he" | "en";
  const isHe = locale === "he";

  const credentials = isHe
    ? [
        {
          value: "בוגר בצלאל (B.Arch)",
          icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 5L3 12L16 19L29 12L16 5Z" />
              <path d="M7 14.5V22.5C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 22.5V14.5" />
            </svg>
          ),
        },
        {
          value: "אדריכל רשוי",
          icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="16" cy="13" r="7" />
              <path d="M11.5 18.5L9 28L16 24.5L23 28L20.5 18.5" />
            </svg>
          ),
        },
        {
          value: "תכנון והובלת פרויקטים",
          icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 28H28" />
              <path d="M7 28V14L16 6L25 14V28" />
              <path d="M13 28V19H19V28" />
            </svg>
          ),
        },
      ]
    : [
        {
          value: "Bezalel Graduate (B.Arch)",
          icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 5L3 12L16 19L29 12L16 5Z" />
              <path d="M7 14.5V22.5C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 22.5V14.5" />
            </svg>
          ),
        },
        {
          value: "Licensed Architect",
          icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="16" cy="13" r="7" />
              <path d="M11.5 18.5L9 28L16 24.5L23 28L20.5 18.5" />
            </svg>
          ),
        },
        {
          value: "Project Leadership",
          icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 28H28" />
              <path d="M7 28V14L16 6L25 14V28" />
              <path d="M13 28V19H19V28" />
            </svg>
          ),
        },
      ];

  const archPrinciples = isHe
    ? [
        {
          title: "אדם וחוויה",
          desc: "תכנון שמתחיל באורח החיים ובתחושת המרחב",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {/* Vitruvian Circle */}
              <circle cx="36" cy="34" r="28" strokeWidth="1.2" className="opacity-55" />
              {/* Vitruvian Square (base tangent to bottom of circle at y=62) */}
              <rect x="13" y="16" width="46" height="46" strokeWidth="1.2" className="opacity-45" />
              {/* Head */}
              <circle cx="36" cy="22.5" r="3.5" strokeWidth="1.4" />
              {/* Raised arms (touching circle/square corners) */}
              <path d="M16 20.5L32.5 28.5M56 20.5L39.5 28.5" strokeWidth="1.2" className="opacity-65" />
              {/* Horizontal arms (touching square sides) */}
              <line x1="13" y1="28.5" x2="59" y2="28.5" strokeWidth="1.4" />
              {/* Torso */}
              <path d="M32.5 28.5L33.5 42H38.5L39.5 28.5" strokeWidth="1.4" />
              {/* Spread legs (touching circle) */}
              <path d="M34 42L23.5 58.5M38 42L48.5 58.5" strokeWidth="1.2" className="opacity-65" />
              {/* Straight legs (touching bottom of square at y=62) */}
              <path d="M34.5 42V62M37.5 42V62" strokeWidth="1.4" />
            </svg>
          ),
        },
        {
          title: "מקום וטבע",
          desc: "הרמוניה של אור טבעי, אוויר וטופוגרפיה",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Sun path arc */}
              <path d="M10 46A26 26 0 0 1 62 46" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
              {/* Sun */}
              <circle cx="26" cy="24" r="5.5" strokeWidth="1.5" />
              {/* Topography / landscape lines */}
              <path d="M8 50C18 42 28 42 38 48C46 52.5 55 51 64 45" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 57C22 51 34 51 44 56C51 59.5 58 58 64 54" strokeWidth="1.2" strokeLinecap="round" className="opacity-55" />
            </svg>
          ),
        },
        {
          title: "BIM & AI",
          desc: "מודל תלת ממדי חכם ובינה מלאכותית",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Isometric 3D BIM Cube */}
              <polygon points="36 12 58 24.5 58 49.5 36 62 14 49.5 14 24.5 36 12" strokeWidth="1.5" strokeLinejoin="round" />
              <polyline points="14 24.5 36 37 58 24.5" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="36" y1="37" x2="36" y2="62" strokeWidth="1.3" />
              {/* Internal wireframe dashed lines */}
              <polyline points="14 49.5 36 37 58 49.5" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-40" />
              {/* AI / Data nodes */}
              <circle cx="36" cy="12" r="2.5" fill="currentColor" />
              <circle cx="58" cy="24.5" r="2.5" fill="currentColor" />
              <circle cx="14" cy="24.5" r="2.5" fill="currentColor" />
              <circle cx="36" cy="37" r="2.8" fill="currentColor" />
            </svg>
          ),
        },
        {
          title: "מהסקיצה לביצוע",
          desc: "ליווי הדוק מהרעיון ועד לפרט האחרון",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Drafting construction lines */}
              <line x1="10" y1="56" x2="62" y2="56" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="12" x2="16" y2="60" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
              {/* Architectural elevation structure */}
              <path d="M16 56V30L36 16L56 30V56" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M36 16V56" strokeWidth="1" strokeDasharray="3 3" className="opacity-45" />
              <rect x="28" y="38" width="16" height="18" strokeWidth="1.3" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: "Human & Space",
          desc: "Design rooted in lifestyle and spatial experience",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="36" cy="34" r="28" strokeWidth="1.2" className="opacity-55" />
              <rect x="13" y="16" width="46" height="46" strokeWidth="1.2" className="opacity-45" />
              <circle cx="36" cy="22.5" r="3.5" strokeWidth="1.4" />
              <path d="M16 20.5L32.5 28.5M56 20.5L39.5 28.5" strokeWidth="1.2" className="opacity-65" />
              <line x1="13" y1="28.5" x2="59" y2="28.5" strokeWidth="1.4" />
              <path d="M32.5 28.5L33.5 42H38.5L39.5 28.5" strokeWidth="1.4" />
              <path d="M34 42L23.5 58.5M38 42L48.5 58.5" strokeWidth="1.2" className="opacity-65" />
              <path d="M34.5 42V62M37.5 42V62" strokeWidth="1.4" />
            </svg>
          ),
        },
        {
          title: "Site & Nature",
          desc: "Harmony of natural light, airflow and topography",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M10 46A26 26 0 0 1 62 46" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
              <circle cx="26" cy="24" r="5.5" strokeWidth="1.5" />
              <path d="M8 50C18 42 28 42 38 48C46 52.5 55 51 64 45" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 57C22 51 34 51 44 56C51 59.5 58 58 64 54" strokeWidth="1.2" strokeLinecap="round" className="opacity-55" />
            </svg>
          ),
        },
        {
          title: "BIM & AI",
          desc: "Smart 3D modeling and artificial intelligence",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <polygon points="36 12 58 24.5 58 49.5 36 62 14 49.5 14 24.5 36 12" strokeWidth="1.5" strokeLinejoin="round" />
              <polyline points="14 24.5 36 37 58 24.5" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="36" y1="37" x2="36" y2="62" strokeWidth="1.3" />
              <polyline points="14 49.5 36 37 58 49.5" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-40" />
              <circle cx="36" cy="12" r="2.5" fill="currentColor" />
              <circle cx="58" cy="24.5" r="2.5" fill="currentColor" />
              <circle cx="14" cy="24.5" r="2.5" fill="currentColor" />
              <circle cx="36" cy="37" r="2.8" fill="currentColor" />
            </svg>
          ),
        },
        {
          title: "Sketch to Build",
          desc: "Close guidance from first concept to final detail",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <line x1="10" y1="56" x2="62" y2="56" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="12" x2="16" y2="60" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
              <path d="M16 56V30L36 16L56 30V56" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M36 16V56" strokeWidth="1" strokeDasharray="3 3" className="opacity-45" />
              <rect x="28" y="38" width="16" height="18" strokeWidth="1.3" />
            </svg>
          ),
        },
      ];

  const vizFeatures = isHe
    ? [
        {
          title: "דיוק אדריכלי",
          desc: "נאמנות מוחלטת לתוכניות ולפרטי הבניין",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Floorplan base grid */}
              <polygon points="36 40 60 50 36 60 12 50 36 40" strokeWidth="1.2" className="opacity-45" />
              {/* Rising 3D volume */}
              <path d="M22 46V22L36 16L50 22V46" strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="36" y1="16" x2="36" y2="48" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" />
              <polyline points="22 22 36 28 50 22" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          ),
        },
        {
          title: "אור וחומריות",
          desc: "סימולציה טבעית של תאורה וטקסטורות",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Light rays */}
              <line x1="14" y1="14" x2="28" y2="28" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-45" />
              <line x1="24" y1="10" x2="34" y2="24" strokeWidth="1" strokeDasharray="2 2" className="opacity-35" />
              {/* Material sphere */}
              <circle cx="40" cy="40" r="18" strokeWidth="1.5" />
              {/* Equator & meridian shading arcs */}
              <path d="M22 40C28 46 52 46 58 40" strokeWidth="1.1" className="opacity-40" />
              <path d="M40 22C47 28 47 52 40 58" strokeWidth="1.1" className="opacity-40" />
              {/* Highlight dot */}
              <circle cx="33" cy="33" r="2.5" fill="currentColor" />
            </svg>
          ),
        },
        {
          title: "חוויה מוחשית",
          desc: "להרגיש את החלל לפני תחילת הבנייה",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Outer perspective frame */}
              <rect x="12" y="16" width="48" height="40" strokeWidth="1.5" />
              {/* Inner vanishing frame */}
              <rect x="26" y="27" width="20" height="18" strokeWidth="1.2" className="opacity-65" />
              {/* Perspective vanishing lines */}
              <line x1="12" y1="16" x2="26" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="60" y1="16" x2="46" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="12" y1="56" x2="26" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="60" y1="56" x2="46" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
            </svg>
          ),
        },
        {
          title: "שיווק והחלטות",
          desc: "כלי מרכזי ליזמים, אדריכלים וועדות",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Framing corner marks */}
              <path d="M14 24V14H24" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M58 24V14H48" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 48V58H24" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M58 48V58H48" strokeWidth="1.5" strokeLinecap="round" />
              {/* Central architectural towers */}
              <rect x="24" y="28" width="12" height="22" strokeWidth="1.4" />
              <path d="M36 34H48V50H36" strokeWidth="1.4" />
              <line x1="20" y1="50" x2="52" y2="50" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: "Architectural Fidelity",
          desc: "Complete accuracy to plans and building details",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <polygon points="36 40 60 50 36 60 12 50 36 40" strokeWidth="1.2" className="opacity-45" />
              <path d="M22 46V22L36 16L50 22V46" strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="36" y1="16" x2="36" y2="48" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" />
              <polyline points="22 22 36 28 50 22" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          ),
        },
        {
          title: "Light & Material",
          desc: "Natural simulation of lighting and textures",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <line x1="14" y1="14" x2="28" y2="28" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-45" />
              <line x1="24" y1="10" x2="34" y2="24" strokeWidth="1" strokeDasharray="2 2" className="opacity-35" />
              <circle cx="40" cy="40" r="18" strokeWidth="1.5" />
              <path d="M22 40C28 46 52 46 58 40" strokeWidth="1.1" className="opacity-40" />
              <path d="M40 22C47 28 47 52 40 58" strokeWidth="1.1" className="opacity-40" />
              <circle cx="33" cy="33" r="2.5" fill="currentColor" />
            </svg>
          ),
        },
        {
          title: "Tangible Experience",
          desc: "Feel the space before construction begins",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="12" y="16" width="48" height="40" strokeWidth="1.5" />
              <rect x="26" y="27" width="20" height="18" strokeWidth="1.2" className="opacity-65" />
              <line x1="12" y1="16" x2="26" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="60" y1="16" x2="46" y2="27" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="12" y1="56" x2="26" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
              <line x1="60" y1="56" x2="46" y2="45" strokeWidth="1" strokeDasharray="2.5 2.5" className="opacity-45" />
            </svg>
          ),
        },
        {
          title: "Marketing & Decisions",
          desc: "Essential tool for developers and architects",
          icon: (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M14 24V14H24" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M58 24V14H48" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 48V58H24" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M58 48V58H48" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="24" y="28" width="12" height="22" strokeWidth="1.4" />
              <path d="M36 34H48V50H36" strokeWidth="1.4" />
              <line x1="20" y1="50" x2="52" y2="50" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          ),
        },
      ];

  return (
    <>
      {/* ══ HERO WITH BACKGROUND IMAGE ══ */}
      <section className="relative min-h-[38vh] md:min-h-[40vh] flex flex-col justify-end pt-24 md:pt-28 pb-7 md:pb-9 border-b border-ink/12">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/85 via-paper/70 to-paper/55" />
        </div>

        <div className="container-x relative">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-snug sm:whitespace-nowrap">
              {t("hero.title")}
            </h1>
            <p className="mt-2 text-base md:text-lg text-ink/90 leading-relaxed max-w-2xl">
              {t("hero.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1: ABOUT ELIYA EIDELMAN — Background, Degree, Experience & Portrait ══ */}
      <section id="about-more" className="py-14 md:py-20 bg-paper text-ink border-b border-ink/12">
        <div className="container-x">
          {/* Top Row: Editorial Portrait + Compact Credentials (Right in RTL) + Story Narrative (Left in RTL) */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
            {/* Editorial Portrait + Compact Icons Strip Underneath */}
            <div className="md:col-span-5 lg:col-span-5">
              <div className="max-w-xs sm:max-w-sm mx-auto md:max-w-none">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2.5 sm:-inset-3 bg-paper-warm border border-ink/10 -z-10 -translate-x-2.5 translate-y-2.5 ltr:translate-x-2.5"
                  />
                  <div className="relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden bg-paper-warm border border-ink/15 shadow-sm">
                    <Image
                      src="/images/about/eliya-eidelman.jpg"
                      alt={isHe ? "אדריכל אליה אידלמן" : "Architect Eliya Eidelman"}
                      fill
                      sizes="(max-width: 768px) 90vw, 40vw"
                      className="object-cover"
                      style={{ objectPosition: "68% center" }}
                    />
                  </div>
                </div>

                {/* Stacked 3 Credentials directly under the portrait */}
                <ul className="mt-6 pt-4 border-t border-ink/15 flex flex-col gap-3">
                  {credentials.map((cred) => (
                    <li
                      key={cred.value}
                      className="flex items-center gap-3 text-ink"
                    >
                      <span className="text-ink/75 shrink-0">{cred.icon}</span>
                      <span className="text-sm md:text-base font-medium text-ink/90">
                        {cred.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-7 lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                {t("story.title")}
              </h2>
              <div className="mt-4 space-y-4 text-base md:text-lg font-light text-ink-soft leading-relaxed text-justify">
                <p>
                  {isHe
                    ? "הסטודיו הוקם ומובל על ידי אליה אידלמן, אדריכל רשוי, בעל תואר ראשון בארכיטקטורה B.Arch ובוגר המחלקה לארכיטקטורה באקדמיה לאומנות ועיצוב בצלאל."
                    : "The studio was founded and is led by Eliya Eidelman, a licensed architect holding a B.Arch degree and graduate of the Department of Architecture at the Bezalel Academy of Arts and Design."}
                </p>
                <p>
                  {isHe
                    ? "לאורך שנות עבודתו במשרדי אדריכלים צבר אליה ניסיון מעמיק בתכנון ובהובלת פרויקטים מגוונים, ופועל מתוך תשוקה עמוקה לאדריכלות וליצירה. הסטודיו מקיים שיתופי פעולה מקצועיים עם אדריכלים מובילים ומשלב יכולות מתקדמות לתכנון שלם ומדויק."
                    : "Throughout his years working in architecture firms, Eliya gained deep experience planning and leading diverse projects, driven by a profound passion for architecture and creation. The studio collaborates professionally with leading architects and integrates advanced capabilities for complete and precise design."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: ARCHITECTURAL DESIGN PRINCIPLES — Pure Iconic Quartet ══ */}
      <section className="py-16 md:py-24 bg-paper-warm text-ink border-b border-ink/12">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              {isHe ? "עקרונות התכנון האדריכלי" : "Architectural Design Principles"}
            </h2>
            <p className="mt-2 text-base md:text-lg font-light text-ink-soft">
              {isHe
                ? "רגישות אנושית וסביבתית לצד מתודולוגיית BIM ובינה מלאכותית"
                : "Human and environmental sensitivity alongside BIM and AI methodology"}
            </p>
          </div>

          {/* 4 Monumental Iconic Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10">
            {archPrinciples.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center text-center"
              >
                <div className="text-ink/80 group-hover:text-ink group-hover:scale-105 transition-all duration-500 mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-light text-ink-soft max-w-[22ch] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: THE VISUALIZATION STUDIO + INTEGRATED CLIENTS STRIP — Same Pure Iconic Language ══ */}
      <section className="py-16 md:py-24 bg-paper text-ink border-b border-ink/12">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              {t("viz.title")}
            </h2>
            <p className="mt-2 text-base md:text-lg font-light text-ink-soft">
              {isHe
                ? "שפה אמנותית שמחברת בין רעיון למציאות ומפיחה חיים בחזון התכנוני"
                : "An artistic language bridging concept and reality to bring design visions to life"}
            </p>
          </div>

          {/* 4 Monumental Iconic Visualization Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10">
            {vizFeatures.map((feat) => (
              <div
                key={feat.title}
                className="group flex flex-col items-center text-center"
              >
                <div className="text-ink/80 group-hover:text-ink group-hover:scale-105 transition-all duration-500 mb-5">
                  {feat.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
                  {feat.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-light text-ink-soft max-w-[22ch] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Clients Carousel Seamlessly Integrated Below the Visualization Icons */}
          <div className="mt-14 md:mt-20 pt-10 border-t border-ink/10">
            <ClientsCarousel logos={clientLogos} title={t("clientsTitle")} embedded />
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
