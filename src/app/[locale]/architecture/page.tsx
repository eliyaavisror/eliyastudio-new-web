import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getArchProjects } from "@/data/projects";
import ArchProjectCard from "@/components/ArchProjectCard";
import { getHeroImage } from "@/lib/heroImage";
import ProcessAccordion from "@/components/ProcessAccordion";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "architecture.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function ArchitecturePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage =
    getHeroImage("architecture") ??
    "/images/projects/visualizations/exterior/A FINAL copy.webp";
  return <Content heroImage={heroImage} />;
}

const SPECIALTY_ICONS = [
  /* בתים פרטיים */
  <svg key="house" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>,
  /* מבני ציבור */
  <svg key="public" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/>
  </svg>,
  /* משרדים ומסחר */
  <svg key="office" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="18" rx="1"/>
    <path d="M8 3v18M2 9h6M2 15h6M14 9h6M14 15h6M14 3v18"/>
  </svg>,
  /* תוספות בנייה ושיפוצים */
  <svg key="renovation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>,
];

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("architecture");
  const locale = useLocale() as "he" | "en";
  const steps = t.raw("process.steps") as Array<{ number: string; title: string; body: string }>;
  const specialties = t.raw("specialties.items") as string[];

  return (
    <>
      {/* ══ HERO WITH BACKGROUND IMAGE ══ */}
      <section className="relative min-h-[40vh] md:min-h-[42vh] flex flex-col justify-end pt-24 md:pt-28 pb-7 md:pb-9 border-b border-ink/12">
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
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight leading-snug sm:whitespace-nowrap">
              {t("hero.title")}
            </h1>
            <p className="mt-2 text-base md:text-lg text-ink/90 leading-relaxed max-w-2xl">
              {t("hero.body")}
            </p>
          </div>

          {/* Compact Specialties Row — 2 rows on mobile, 1 row on desktop */}
          <div className="mt-6 pt-4 border-t border-ink/15">
            <ul className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:items-center gap-x-4 sm:gap-x-8 gap-y-2.5">
              {specialties.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-ink whitespace-nowrap"
                >
                  <span className="text-ink/75 shrink-0 scale-90">
                    {SPECIALTY_ICONS[i]}
                  </span>
                  <span className="text-xs sm:text-sm text-ink/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ SELECTED PROJECTS — Immediately visible on first screen ══ */}
      {getArchProjects().length > 0 && (
        <section id="projects" className="pt-10 md:pt-14 pb-20 md:pb-28 bg-paper">
          <div className="container-x">
            <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16">
              {getArchProjects().map((p) => (
                <ArchProjectCard
                  key={p.slug}
                  project={p}
                  locale={locale}
                />
              ))}

              {/* 6th card — "Our Next Project" blurred teaser card */}
              <article className="group">
                <Link
                  href="/contact"
                  className="block"
                  aria-label={locale === "he" ? "הפרויקט הבא שלנו" : "Our Next Project"}
                >
                  <div className="relative overflow-hidden bg-ink aspect-[16/10] flex items-center justify-center">
                    <Image
                      src="/images/projects/architecture/next-project.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover scale-105 blur-[3px] brightness-[0.72] transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:blur-[2px] group-hover:brightness-[0.8]"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 text-center px-6">
                      <span className="ticker text-[10px] text-paper/60 block mb-2">
                        {locale === "he" ? "בקרוב" : "Coming Soon"}
                      </span>
                      <p className="text-paper text-xl md:text-2xl font-semibold tracking-tight">
                        {locale === "he" ? "הפרויקט הבא שלנו" : "Our Next Project"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 md:pt-5 pb-2 border-b border-ink/15 flex items-baseline justify-between gap-4 transition-colors duration-300 group-hover:border-ink">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-muted group-hover:text-ink transition-colors truncate">
                      {locale === "he" ? "הפרויקט הבא שלנו" : "Our Next Project"}
                    </h3>
                    <div className="flex items-baseline gap-3 shrink-0">
                      <span className="text-ink-subtle text-xs md:text-sm">
                        {locale === "he" ? "בתכנון" : "In Progress"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-ink-muted text-xs transition-transform duration-300 group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
                      >
                        {locale === "he" ? "←" : "→"}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* ══ PROCESS ══ */}
      <section id="process" className="py-16 md:py-24 bg-paper-warm border-y border-ink/12">
        <div className="container-x">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink mb-8 md:mb-10">
            {t("process.title")}
          </h2>
          <ProcessAccordion steps={steps} />
        </div>
      </section>

      {/* ══ COMPACT PROPORTIONAL CONTACT STRIP ══ */}
      <section className="py-10 md:py-12 bg-paper text-ink">
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
            <span aria-hidden="true">{locale === "he" ? "←" : "→"}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
