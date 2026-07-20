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
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col pt-28 md:pt-36 pb-8 md:pb-10 text-paper">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill priority sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/25 via-ink/50 to-ink/75" />
          <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-ink/70 to-transparent" />
        </div>

        {/* Main content — vertically centered in remaining viewport space */}
        <div className="container-x relative flex-1 flex flex-col justify-center">
          <p className="ticker text-paper mb-8">
            {t("hero.eyebrow")}
          </p>

          <h1 className="text-display-2xl font-bold text-balance max-w-[16ch]">
            {t("hero.title")}
          </h1>

        </div>

        {/* Scroll hint — centered */}
        <div className="container-x relative pt-5 border-t border-paper/20 flex justify-center">
          <span className="ticker text-paper text-sm tracking-widest">{isHe ? "↓ גלול" : "↓ Scroll"}</span>
        </div>
      </section>

      {/* SERVICES — dark inverted grid, 2 cards */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-14 md:mb-16 border-b border-paper/20">
            <div>
              <h2 className="text-display-lg font-semibold">{t("services.title")}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ServiceCard
              href="/architecture"
              icon={
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <path d="M9 21V12h6v9"/>
                </svg>
              }
              title={t("services.architecture.title")} body={t("services.architecture.body")}
              tags={isHe ? ["בתים","ציבור","משרדים"] : ["Homes","Public","Offices"]} />
            <ServiceCard
              href="/visualizations"
              icon={
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              }
              title={t("services.visualizations.title")} body={t("services.visualizations.body")}
              tags={isHe ? ["חוץ","פנים","אווירה"] : ["Exterior","Interior","Atmosphere"]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x text-center max-w-3xl mx-auto">
          <h2 className="text-display-xl font-semibold text-balance">{t("cta.title")}</h2>
          <p className="mt-7 text-lg md:text-xl text-ink-soft text-pretty max-w-[42ch] mx-auto">
            {t("cta.body")}
          </p>
          <div className="mt-10 flex justify-center gap-2 flex-wrap">
            <Link href="/contact" className="btn-primary">{t("cta.button")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ href, icon, title, body, tags }: { href: string; icon: React.ReactNode; title: string; body: string; tags: string[] }) {
  return (
    <Link
      href={href}
      className="group bg-ink rounded-2xl p-10 md:p-12 lg:p-14 min-h-[380px] flex flex-col
        ring-1 ring-inset ring-paper/10
        transition-all duration-200
        hover:ring-paper/20
        hover:shadow-[inset_0_4px_14px_rgba(0,0,0,0.45)]
        hover:scale-[0.992]
        active:scale-[0.985]
        active:shadow-[inset_0_6px_20px_rgba(0,0,0,0.55)]"
    >
      <div className="mb-8 text-paper/80">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h3>
      <p className="text-paper/65 leading-relaxed text-sm md:text-base flex-1">{body}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="ticker text-[10px] text-paper/55 border border-paper/25 px-2.5 py-1.5">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
