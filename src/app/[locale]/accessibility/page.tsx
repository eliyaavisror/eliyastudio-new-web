import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accessibility" });
  return { title: t("title") };
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("accessibility");
  const locale = useLocale();
  const items = t.raw("compliance.items") as string[];

  const date = new Date(siteConfig.accessibility.lastUpdated).toLocaleDateString(
    locale === "he" ? "he-IL" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="pt-40 md:pt-48 pb-32">
      <div className="container-x max-w-3xl">
        <p className="eyebrow mb-6">{t("title")}</p>
        <h1 className="text-display-lg font-display font-light mb-6">{t("title")}</h1>
        <p className="text-sm text-ink-muted mb-16">
          {t("lastUpdated")}: {date}
        </p>

        <Section title={t("intro.title")}>
          <p>{t("intro.body")}</p>
        </Section>

        <Section title={t("compliance.title")}>
          <p>{t("compliance.body")}</p>
          <ul className="mt-4 space-y-2 list-disc ltr:pl-6 rtl:pr-6 marker:text-ink-muted">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title={t("widget.title")}>
          <p>{t("widget.body")}</p>
        </Section>

        <Section title={t("limitations.title")}>
          <p>{t("limitations.body")}</p>
        </Section>

        <Section title={t("feedback.title")}>
          <p>{t("feedback.body")}</p>
          <div className="mt-6 p-6 bg-paper-warm border border-paper-line">
            <p className="font-medium">{t("feedback.coordinator")}</p>
            <p className="mt-2 text-sm">{siteConfig.accessibility.coordinatorName}</p>
            <p className="text-sm">
              <a href={`tel:${siteConfig.accessibility.coordinatorPhone}`} className="link-underline">
                {siteConfig.contact.phoneDisplay}
              </a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${siteConfig.accessibility.coordinatorEmail}`} className="link-underline">
                {siteConfig.accessibility.coordinatorEmail}
              </a>
            </p>
            <p className="mt-3 text-xs text-ink-muted">{t("feedback.responseTime")}</p>
          </div>
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-display font-medium mb-5">{title}</h2>
      <div className="text-ink-soft leading-relaxed text-lg space-y-3">{children}</div>
    </section>
  );
}
