import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Heebo } from "next/font/google";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-sans",
  // ⬇ added 200 + 800 for Variation B (oversized index numerals + heavy display)
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: `${t("siteName")} — ${t("tagline")}`,
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    applicationName: t("siteName"),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    keywords: [
      "אדריכלות","הדמיות","תכנון אדריכלי","הדמיות תלת מימד",
      "architecture","3D visualization","architectural design","render",
    ],
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      url: locale === "he" ? siteConfig.url : `${siteConfig.url}/en`,
      siteName: t("siteName"),
      title: `${t("siteName")} — ${t("tagline")}`,
      description: t("description"),
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: t("siteName") }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.seo.twitterHandle,
      title: `${t("siteName")} — ${t("tagline")}`,
      description: t("description"),
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: locale === "he" ? siteConfig.url : `${siteConfig.url}/en`,
      languages: {
        he: siteConfig.url,
        en: `${siteConfig.url}/en`,
        "x-default": siteConfig.url,
      },
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "he" | "en")) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("nav");
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={heebo.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">{t("skipToMain")}</a>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <AccessibilityWidget />
          <WhatsAppFloat />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
