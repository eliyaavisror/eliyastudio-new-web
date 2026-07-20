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
  const heroImage = getHeroImage("visualizations") ?? "/images/projects/visualizations/exterior/FF03 copy.webp";
  const images = loadAllGalleryImages();
  return <Content heroImage={heroImage} images={images} />;
}

function Content({ heroImage, images }: { heroImage: string; images: GalleryImage[] }) {
  const t = useTranslations("visualizations");
  const locale = useLocale() as "he" | "en";

  const types = [
    {
      key: "exterior" as const,
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 36V17L19 5L34 17V36H4Z" />
          <path d="M14 36V25H24V36" />
          <path d="M9 19H15V25H9Z" />
          <path d="M23 19H29V25H23Z" />
        </svg>
      ),
    },
    {
      key: "interior" as const,
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 33V5H33" />
          <path d="M9 33H33V9" />
          <rect x="12" y="21" width="18" height="8" />
          <path d="M12 21V17H15" />
          <path d="M30 21V17H27" />
        </svg>
      ),
    },
    {
      key: "aerial" as const,
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="13" height="13" />
          <rect x="21" y="4" width="13" height="13" />
          <rect x="4" y="21" width="13" height="13" />
          <rect x="21" y="21" width="13" height="13" />
        </svg>
      ),
    },
  ];

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
            style={{ filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)", objectPosition: "center 75%" }}
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
            <div className="md:col-span-5 ticker text-ink-muted md:text-end">
              EXTERIOR / INTERIOR / AERIAL
            </div>
          </div>
        </div>
        <a
          href="#gallery"
          aria-label={locale === "he" ? "גללו לגלריה" : "Scroll to gallery"}
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

      {/* TYPES — dark inverted grid */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x">
          <div className="mb-8 md:mb-10">
            <p className="ticker text-paper/60 mb-3">{t("types.title")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/15">
            {types.map(({ key, icon }, i) => (
              <div key={key} className="bg-ink p-7 md:p-9 flex flex-col">
                <p className="ticker text-paper/45 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="text-paper/80 mb-4">{icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  {t(`types.${key}.title`)}
                </h3>
                <p className="text-paper/65 leading-relaxed text-sm flex-1">
                  {t(`types.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* GALLERY */}
      <section id="gallery" className="section-pad">
        <div className="container-x">
          <div className="pb-8 mb-14 border-b border-ink">
            <p className="ticker text-ink-muted">{t("gallery.title")}</p>
          </div>
          <VisualizationGallery images={images} locale={locale} />
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
