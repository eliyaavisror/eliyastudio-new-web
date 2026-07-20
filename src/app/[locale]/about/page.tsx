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
  const heroImage = getHeroImage("about") ?? "/images/projects/visualizations/exterior/01-VIEW.jpg";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("about");
  const locale = useLocale() as "he" | "en";

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
          <h1 className="text-display-2xl font-bold text-balance max-w-[16ch]">
            {t("hero.title")}
          </h1>
          <div className="mt-12 md:mt-14 h-20" aria-hidden="true" />
        </div>
        <a
          href="#about-more"
          aria-label={locale === "he" ? "גללו לפרטים נוספים" : "Scroll for more"}
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

      {/* STORY */}
      <section id="about-more" className="section-pad bg-ink text-paper">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <h2 className="text-display-lg font-semibold">{t("story.title")}</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 max-w-[60ch]">
            <p className="text-lg md:text-xl text-paper/75 leading-relaxed text-pretty">{t("story.body1")}</p>
            <p className="text-lg text-paper/75 leading-relaxed text-pretty">{t("story.body2")}</p>
          </div>
        </div>
      </section>
      </div>

      {/* ARCHITECTURE */}
      <section className="section-pad">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <h2 className="text-display-lg font-semibold">{t("arch.title")}</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 max-w-[60ch]">
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("arch.body1")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("arch.body2")}</p>
          </div>
        </div>
      </section>

      {/* VISUALIZATION + clients carousel — all one section */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <h2 className="text-display-lg font-semibold">{t("viz.title")}</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 max-w-[60ch]">
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("viz.body1")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("viz.body2")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("viz.body3")}</p>
            <p className="ticker text-ink-muted mt-2">{t("viz.clients")}</p>
          </div>
        </div>

        {/* Client logos carousel — part of the viz section */}
        <div className="mt-20 md:mt-28">
          <ClientsCarousel logos={clientLogos} title={t("clientsTitle")} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x text-center max-w-3xl mx-auto">
          <h2 className="text-display-xl font-semibold text-balance">{t("cta.title")}</h2>
          <p className="mt-7 text-lg md:text-xl text-paper/70 text-pretty">{t("cta.body")}</p>
          <Link href="/contact" className="btn-on-dark mt-10">
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="px-6 py-16 md:py-20 text-center">
      <p className="text-[clamp(4rem,9vw,8rem)] font-extralight tracking-tightest leading-none tabular-nums">
        {number}
      </p>
      <p className="mt-5 ticker text-paper/55">{label}</p>
    </div>
  );
}
