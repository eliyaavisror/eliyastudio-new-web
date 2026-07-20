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
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("privacy");
  const locale = useLocale();

  const date = new Date(siteConfig.privacy.lastUpdated).toLocaleDateString(
    locale === "he" ? "he-IL" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const collection = t.raw("collection.items") as string[];
  const purposes = t.raw("purposes.items") as string[];
  const sharing = t.raw("sharing.items") as string[];
  const rights = t.raw("rights.items") as string[];

  return (
    <article className="pt-40 md:pt-48 pb-32">
      <div className="container-x max-w-3xl">
        <p className="eyebrow mb-6">{t("title")}</p>
        <h1 className="text-display-lg font-display font-light mb-6">{t("title")}</h1>
        <p className="text-sm text-ink-muted mb-16">
          {t("lastUpdated")}: {date}
        </p>

        <Block><p>{t("intro.body")}</p></Block>

        <Section title={t("controller.title")}><p>{t("controller.body")}</p></Section>

        <Section title={t("collection.title")}>
          <p>{t("collection.body")}</p>
          <Bullets items={collection} />
        </Section>

        <Section title={t("purposes.title")}>
          <p>{t("purposes.body")}</p>
          <Bullets items={purposes} />
        </Section>

        <Section title={t("legalBasis.title")}><p>{t("legalBasis.body")}</p></Section>

        <Section title={t("sharing.title")}>
          <p>{t("sharing.body")}</p>
          <Bullets items={sharing} />
        </Section>

        <Section title={t("retention.title")}><p>{t("retention.body")}</p></Section>

        <Section title={t("security.title")}><p>{t("security.body")}</p></Section>

        <Section title={t("rights.title")}>
          <p>{t("rights.body")}</p>
          <Bullets items={rights} />
          <p className="mt-4">{t("rights.exercise")}</p>
        </Section>

        <Section title={t("cookies.title")}><p>{t("cookies.body")}</p></Section>

        <Section title={t("minors.title")}><p>{t("minors.body")}</p></Section>

        <Section title={t("complaints.title")}><p>{t("complaints.body")}</p></Section>

        <Section title={t("changes.title")}><p>{t("changes.body")}</p></Section>

        <Section title={t("contact.title")}><p>{t("contact.body")}</p></Section>
      </div>
    </article>
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-ink-soft leading-relaxed text-lg space-y-3 mb-12 p-6 bg-paper-warm border-l-2 rtl:border-l-0 rtl:border-r-2 border-ink">
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-display font-medium mb-4">{title}</h2>
      <div className="text-ink-soft leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 list-disc ltr:pl-6 rtl:pr-6 marker:text-ink-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
