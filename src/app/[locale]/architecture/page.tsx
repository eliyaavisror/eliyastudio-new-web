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
  const heroImage = getHeroImage("architecture") ?? "/images/projects/visualizations/exterior/A FINAL copy.webp";
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
      <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pt-28 md:pt-36 pb-10 md:pb-14">
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
          <div className="absolute inset-0 bg-gradient-to-t from-paper/20 via-paper/55 to-paper/85" />
        </div>
        <div className="container-x relative">
          <p className="ticker text-ink-muted mb-10">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-display-2xl font-bold text-balance max-w-[18ch]">
            {t("hero.title")}
          </h1>
          <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 max-w-[52ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("hero.body")}
            </p>
          </div>
        </div>
        <a
          href="#projects"
          aria-label={locale === "he" ? "גללו לפרויקטים" : "Scroll to projects"}
          className="absolute right-6 md:right-10 bottom-8 hidden md:flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300"
        >
          <span className="ticker text-ink text-[9px]" style={{ writingMode: "vertical-rl" }}>
            {locale === "he" ? "גללו" : "scroll"}
          </span>
          <div className="w-px h-12 bg-ink/35 mt-1" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" className="text-ink" aria-hidden="true">
            <path d="M1 1l4 4 4-4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* SPECIALTIES — dark inverted */}
      <section className="section-pad flex-1 bg-ink text-paper">
        <div className="container-x">
          <div className="mb-8 md:mb-10">
            <p className="ticker text-paper/60 mb-4">{t("specialties.title")}</p>
          </div>
          <ul className="grid grid-cols-4 gap-4 md:gap-16">
            {specialties.map((item, i) => (
              <li key={item} className="group flex flex-col items-center gap-3 md:gap-4 text-center [perspective:400px]">
                <span className="text-paper/70 [&>svg]:w-10 [&>svg]:h-10 md:[&>svg]:w-14 md:[&>svg]:h-14 transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(360deg)]">
                  {SPECIALTY_ICONS[i]}
                </span>
                <span className="text-xs md:text-base font-medium tracking-tight leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>

      {/* PROCESS */}
      <section className="pt-12 md:pt-16 pb-10 md:pb-14 border-t border-ink/10">
        <div className="container-x">
          <p className="ticker text-ink-muted mb-8 md:mb-10">{t("process.title")}</p>
          <ProcessAccordion steps={steps} />
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      {getArchProjects().length > 0 && (
        <section id="projects" className="pt-10 md:pt-14 pb-20 md:pb-32 lg:pb-40">
          <div className="container-x">
            <div className="pb-4 mb-8 border-b border-ink/20">
              <p className="ticker text-ink-muted mb-4">{locale === "he" ? "פרויקטים" : "Projects"}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {getArchProjects().map((p, i) => (
                <ArchProjectCard key={p.slug} project={p} locale={locale} index={i + 1} />
              ))}
            </div>
            <p className="mt-16 text-ink-muted text-sm ticker border-t border-ink/10 pt-8">
              {locale === "he"
                ? "בימים אלו אנו עובדים על עוד פרויקטים שיעלו לכאן בקרוב..."
                : "We are currently working on more projects that will be added here soon..."}
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x text-center max-w-3xl mx-auto">
          <h2 className="text-display-xl font-semibold text-balance">{t("cta.title")}</h2>
          <p className="mt-7 text-lg md:text-xl text-ink-soft text-pretty">{t("cta.body")}</p>
          <Link href="/contact" className="btn-primary mt-10">
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
