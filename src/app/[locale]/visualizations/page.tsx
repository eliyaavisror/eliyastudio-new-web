import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import VisualizationGallery from "@/components/VisualizationGallery";
import { getHeroImage } from "@/lib/heroImage";
import { loadAllGalleryImages } from "@/lib/gallery-loader";
import type { GalleryImage } from "@/data/gallery";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visualizations.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function VisualizationsPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage =
    getHeroImage("visualizations") ??
    "/images/projects/visualizations/exterior/FF03 copy.webp";
  const images = loadAllGalleryImages();
  return <Content heroImage={heroImage} images={images} />;
}

function Content({
  heroImage,
  images,
}: {
  heroImage: string;
  images: GalleryImage[];
}) {
  const t = useTranslations("visualizations");
  const locale = useLocale() as "he" | "en";

  const types = [
    {
      key: "exterior" as const,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21V10.5L12 3l9 7.5V21H3Z" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
    },
    {
      key: "interior" as const,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 20V4h18" />
          <path d="M6 20h15V7" />
          <rect x="8" y="13" width="11" height="5" />
        </svg>
      ),
    },
    {
      key: "aerial" as const,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7.5" height="7.5" />
          <rect x="13.5" y="3" width="7.5" height="7.5" />
          <rect x="3" y="13.5" width="7.5" height="7.5" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" />
        </svg>
      ),
    },
  ];

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
            style={{
              filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)",
              objectPosition: "center 75%",
            }}
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

          {/* Compact Visualization Types Row — minimal strip under the heading like Architecture page */}
          <div className="mt-6 pt-4 border-t border-ink/15">
            <ul className="flex flex-wrap sm:flex-nowrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5">
              {types.map(({ key, icon }) => (
                <li
                  key={key}
                  className="flex items-center gap-2 text-ink whitespace-nowrap"
                >
                  <span className="text-ink/75 shrink-0 scale-90">
                    {icon}
                  </span>
                  <span className="text-xs sm:text-sm text-ink/90">
                    {t(`types.${key}.title`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ GALLERY — Immediately visible on first screen ══ */}
      <section id="gallery" className="pt-10 md:pt-14 pb-20 md:pb-28 bg-paper border-b border-ink/12">
        <div className="container-x">
          <VisualizationGallery images={images} locale={locale} />
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
            <span aria-hidden="true">{locale === "he" ? "←" : "→"}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
