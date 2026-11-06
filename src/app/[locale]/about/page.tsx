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
          label: "השכלה אקדמית",
          value: "בוגר בצלאל (B.Arch)",
          sub: "המחלקה לארכיטקטורה, האקדמיה לאמנות ועיצוב בצלאל ירושלים",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 5L3 12L16 19L29 12L16 5Z" />
              <path d="M7 14.5V22.5C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 22.5V14.5" />
            </svg>
          ),
        },
        {
          label: "הסמכה מקצועית",
          value: "אדריכל רשוי",
          sub: "רישוי מלא לתכנון, הגשה להיתרים ופיקוח עליון בפרויקטים מורכבים",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="16" cy="13" r="7" />
              <path d="M11.5 18.5L9 28L16 24.5L23 28L20.5 18.5" />
            </svg>
          ),
        },
        {
          label: "ניסיון רב תחומי",
          value: "תכנון והדמיות קצה לקצה",
          sub: "הובלת פרויקטי מגורים, מבני ציבור, מתחמי תיירות ובינוי עירוני",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 28H28" />
              <path d="M7 28V14L16 6L25 14V28" />
              <path d="M13 28V19H19V28" />
            </svg>
          ),
        },
      ]
    : [
        {
          label: "Academic Degree",
          value: "Bezalel Graduate (B.Arch)",
          sub: "Department of Architecture, Bezalel Academy of Arts and Design, Jerusalem",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 5L3 12L16 19L29 12L16 5Z" />
              <path d="M7 14.5V22.5C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 22.5V14.5" />
            </svg>
          ),
        },
        {
          label: "Professional License",
          value: "Licensed Architect",
          sub: "Full certification for architectural planning, permits, and supreme supervision",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="16" cy="13" r="7" />
              <path d="M11.5 18.5L9 28L16 24.5L23 28L20.5 18.5" />
            </svg>
          ),
        },
        {
          label: "Multidisciplinary Experience",
          value: "Architecture & 3D Studio",
          sub: "Leading residential projects, public buildings, hospitality complexes, and masterplans",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              {/* Outer drafting circle */}
              <circle cx="36" cy="36" r="28" strokeWidth="1" strokeDasharray="3 3" className=" opacity-35" />
              {/* Spatial frame */}
              <rect x="16" y="16" width="40" height="40" strokeWidth="1" className="opacity-30" />
              {/* Human / Spatial proportion */}
              <circle cx="36" cy="25" r="5.5" strokeWidth="1.5" />
              <path d="M23 50C23 42.5 28.8 36.5 36 36.5C43.2 36.5 49 42.5 49 50" strokeWidth="1.5" strokeLinecap="round" />
              {/* Axis ticks */}
              <line x1="36" y1="4" x2="36" y2="10" strokeWidth="1" className="opacity-45" />
              <line x1="36" y1="62" x2="36" y2="68" strokeWidth="1" className="opacity-45" />
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
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="36" cy="36" r="28" strokeWidth="1" strokeDasharray="3 3" className="opacity-35" />
              <rect x="16" y="16" width="40" height="40" strokeWidth="1" className="opacity-30" />
              <circle cx="36" cy="25" r="5.5" strokeWidth="1.5" />
              <path d="M23 50C23 42.5 28.8 36.5 36 36.5C43.2 36.5 49 42.5 49 50" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="36" y1="4" x2="36" y2="10" strokeWidth="1" className="opacity-45" />
              <line x1="36" y1="62" x2="36" y2="68" strokeWidth="1" className="opacity-45" />
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
          {/* Top Row: Story Narrative + Editorial Portrait */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="md:col-span-7 lg:col-span-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                {t("story.title")}
              </h2>
              <div className="mt-4 space-y-4 text-base md:text-lg font-light text-ink-soft leading-relaxed text-pretty max-w-[60ch]">
                <p>
                  {isHe
                    ? "משרד אידלמן אדריכלים הוקם ומובל על ידי אליה אידלמן, אדריכל רשוי ובוגר האקדמיה לאמנות ועיצוב בצלאל (B.Arch)."
                    : "Eidelman Architects was founded and is led by Eliya Eidelman, a licensed architect and graduate of the Bezalel Academy of Arts and Design (B.Arch)."}
                </p>
                <p>
                  {isHe
                    ? "המשרד משלב ניסיון עשיר בתכנון אדריכלי של בתים פרטיים, מבני ציבור, מתחמי תיירות ובינוי, יחד עם מומחיות עמוקה בהדמיות תלת ממד וטכנולוגיות תכנון מתקדמות המעניקות מענה ארכיטקטוני שלם, מותאם אישית ומדויק."
                    : "The practice combines extensive architectural experience in private homes, public buildings, hospitality complexes, and masterplans with deep expertise in 3D visualization and advanced design technologies."}
                </p>
              </div>
            </div>

            {/* Editorial Portrait — Cropped to focus on Eliya with subtle architectural offset frame */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative max-w-xs sm:max-w-sm mx-auto md:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2.5 sm:-inset-3 bg-paper-warm border border-ink/10 -z-10 translate-x-2.5 translate-y-2.5 rtl:-translate-x-2.5"
                />
                <div className="relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden bg-paper-warm border border-ink/15 shadow-sm">
                  <Image
                    src="/images/about/eliya-eidelman.jpg"
                    alt={isHe ? "אדריכל אליה אידלמן" : "Architect Eliya Eidelman"}
                    fill
                    sizes="(max-width: 768px) 90vw, 35vw"
                    className="object-cover"
                    style={{ objectPosition: "68% center" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Full-Width 3 Open Credential Items */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-ink/12 grid md:grid-cols-3 gap-8 md:gap-12">
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="flex items-start gap-4"
              >
                <span className="text-ink/70 shrink-0 pt-1">{cred.icon}</span>
                <div>
                  <span className="block text-xs font-light text-ink-muted mb-0.5">
                    {cred.label}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
                    {cred.value}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm font-light text-ink-soft leading-relaxed">
                    {cred.sub}
                  </p>
                </div>
              </div>
            ))}
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
