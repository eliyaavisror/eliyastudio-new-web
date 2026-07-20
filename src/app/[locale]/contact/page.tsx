import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";
import { getHeroImage } from "@/lib/heroImage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function ContactPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage = getHeroImage("contact") ?? "/images/projects/visualizations/exterior/Shazap view 01 copy.webp";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
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
          <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end min-h-20">
            <p className="md:col-span-7 max-w-[52ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("hero.body")}
            </p>
            <div className="md:col-span-5 ticker text-ink-muted md:text-end">
              N34.7818 / E32.0853
            </div>
          </div>
        </div>
        <a
          href="#contact-grid"
          aria-label={locale === "he" ? "גללו לפרטי קשר" : "Scroll to contact"}
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

      {/* CONTACT GRID */}
      <section id="contact-grid" className="section-pad border-t border-ink">
        <div className="container-x grid md:grid-cols-12 gap-12 md:gap-16">
          <aside className="md:col-span-4">
            <p className="ticker text-ink-muted mb-8">{locale === "he" ? "פרטי התקשרות" : "Contact details"}</p>

            {/* Contact rows */}
            <div className="divide-y divide-ink/12 border-y border-ink/12">

              {/* Phone */}
              <div className="py-5 flex items-center gap-4">
                <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-ink text-paper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="ticker text-ink-muted text-[10px] mb-0.5">{t("info.phoneLabel")}</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="py-5 flex items-center gap-4">
                <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-ink text-paper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m2 7 10 7 10-7"/>
                  </svg>
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="ticker text-ink-muted text-[10px] mb-0.5">{t("info.emailLabel")}</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-sm break-all hover:opacity-70 transition-opacity">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="py-5 flex items-center gap-4">
                <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-ink text-paper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="ticker text-ink-muted text-[10px] mb-0.5">{t("info.hoursLabel")}</span>
                  <p className="font-medium text-sm">{t("info.hoursValue")}</p>
                </div>
              </div>

            </div>

            {/* Social + WhatsApp */}
            <div className="mt-8 flex items-center gap-3">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram — ${tCommon("newTab")}`}
                  className="w-11 h-11 flex items-center justify-center border border-ink/20 rounded-full hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook — ${tCommon("newTab")}`}
                  className="w-11 h-11 flex items-center justify-center border border-ink/20 rounded-full hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp — ${tCommon("newTab")}`}
                className="w-11 h-11 flex items-center justify-center border border-ink/20 rounded-full hover:bg-ink hover:text-paper hover:border-ink transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </aside>

          <div className="md:col-span-8">
            <h2 className="text-display-lg font-semibold mb-10">
              {t("form.title")}
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-7 border-b last:border-b-0 border-ink/15">
      <dt className="ticker text-ink-muted mb-3">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
