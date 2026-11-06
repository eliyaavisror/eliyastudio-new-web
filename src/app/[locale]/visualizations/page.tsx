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
        <svg width="34" height="34" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        <svg width="34" height="34" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        <svg width="34" height="34" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        </div>
      </section>

      {/* ══ GALLERY — Immediately visible on first screen ══ */}
      <section id="gallery" className="pt-10 md:pt-14 pb-20 md:pb-28 bg-paper">
        <div className="container-x">
          <VisualizationGallery images={images} locale={locale} />
        </div>
      </section>

      {/* ══ TYPES — Light Swiss Architectural Grid ══ */}
      <section className="section-pad bg-paper-warm text-ink border-y border-ink/12">
        <div className="container-x">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              {t("types.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {types.map(({ key, icon }) => (
              <div key={key} className="bg-paper p-7 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-end mb-6">
                    <span className="text-ink/75">{icon}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink mb-3">
                    {t(`types.${key}.title`)}
                  </h3>
                </div>
                <p className="text-ink-soft text-sm md:text-base leading-relaxed text-pretty">
                  {t(`types.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
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
