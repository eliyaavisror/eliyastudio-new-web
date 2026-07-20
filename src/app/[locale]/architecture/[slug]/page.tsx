import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getArchProjects, getArchProjectBySlug, type ProjectStatus } from "@/data/projects";
import ProjectImageTabs from "@/components/ProjectImageTabs";
import ProjectRichContent from "@/components/ProjectRichContent";
import RichText from "@/components/RichText";
import CoverViewer from "@/components/CoverViewer";
import HeroVideo from "@/components/HeroVideo";
import type { Metadata } from "next";

const STATUS_MAP: Record<ProjectStatus, { he: string; en: string; dot: string }> = {
  planning:     { he: "תכנון ראשוני",  en: "Initial Planning",   dot: "bg-amber-400" },
  licensing:    { he: "בשלב רישוי",    en: "Licensing",          dot: "bg-blue-400" },
  construction: { he: "בשלבי ביצוע",  en: "Under Construction", dot: "bg-orange-400" },
  completed:    { he: "הושלם",         en: "Completed",          dot: "bg-green-500" },
};

export async function generateStaticParams() {
  return getArchProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getArchProjectBySlug(slug);
  if (!project) return {};
  const l = locale === "en" ? "en" : "he";
  return { title: project.title[l], description: project.description?.[l] };
}

export default async function ArchProjectPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getArchProjectBySlug(slug);
  if (!project) notFound();
  return <Content slug={slug} />;
}

function Content({ slug }: { slug: string }) {
  const locale = useLocale() as "he" | "en";
  const project = getArchProjectBySlug(slug)!;
  const status = project.status ? STATUS_MAP[project.status] : null;

  return (
    <>
      {/* ══ HERO ══ title over background image ══ */}
      <section className="relative isolate flex min-h-[40vh] md:min-h-[52vh] flex-col justify-end overflow-hidden bg-ink">
        {project.heroVideo ? (
          <HeroVideo src={project.heroVideo} />
        ) : project.titleBackground && (
          <Image
            src={project.titleBackground}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-90"
            priority
          />
        )}
        {/* Tonal overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

        <div className="container-x relative z-10 pb-8 md:pb-12 pt-32 md:pt-40">
          <Link
            href="/architecture"
            className="ticker text-paper/70 hover:text-paper transition-colors text-[10px] mb-6 inline-flex items-center gap-2"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "he" ? "תכנון אדריכלי" : "Architecture"}
          </Link>

          <h1 className="text-display-lg font-bold text-paper text-balance leading-[0.95]">
            {project.title[locale]}
          </h1>

          {/* Meta row — status + location + client + year, all inline */}
          <div className="mt-5 md:mt-6 flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-3 text-paper">
            {status && (
              <span className="inline-flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                <span className="text-sm font-medium">{status[locale]}</span>
              </span>
            )}
            {status && <Divider />}

            <HeroFact label={locale === "he" ? "מיקום" : "Location"} value={project.location[locale]} />
            {project.client && (
              <>
                <Divider />
                <HeroFact label={locale === "he" ? "יזם" : "Client"} value={project.client[locale]} />
              </>
            )}
            <Divider />
            <HeroFact label={locale === "he" ? "שנה" : "Year"} value={String(project.year)} />
          </div>
        </div>
      </section>

      {/* ══ COVER ══ full-width project visualization, uncropped ══ */}
      <section className="pt-10 md:pt-14">
        <div className="container-x">
          <CoverViewer
            src={project.cover}
            alt={project.title[locale]}
            aspect={project.coverAspect ?? 16 / 9}
            locale={locale}
          />
        </div>
      </section>

      {/* ══ ABOUT ══ tinted band, centered ══ */}
      {project.description && (
        <section className="bg-paper-warm mt-10 md:mt-14 py-14 md:py-20">
          <div className="container-x text-center">
            <h2 className="text-display-lg font-bold tracking-tight mb-6">
              {locale === "he" ? "על הפרויקט" : "About the project"}
            </h2>
            <p className="text-base md:text-xl font-light text-ink-soft leading-relaxed text-pretty max-w-[90ch] mx-auto">
              {project.description[locale]}
            </p>
            {project.credit && (
              <p className="mt-6 text-sm md:text-base text-ink-muted max-w-[90ch] mx-auto">
                <RichText text={project.credit[locale]} />
              </p>
            )}
          </div>
        </section>
      )}

      {/* ══ NUMBERED SECTIONS ══ */}
      {project.sections ? (
        <>
          {/* Bridge heading — introduces the design principles */}
          <section className="pt-16 md:pt-24 text-center">
            <div className="container-x">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-accent" />
                <span className="ticker text-[10px] text-accent-dark">
                  {locale === "he" ? "התכנון" : "The design"}
                </span>
                <span className="h-px w-8 bg-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-display-lg font-bold tracking-tight">
                {locale === "he"
                  ? "העקרונות המרכזיים בתכנון הפרויקט"
                  : "The core principles behind the project's design"}
              </h2>
            </div>
          </section>

          <ProjectRichContent
            sections={project.sections}
            title={project.title[locale]}
            locale={locale}
          />
        </>
      ) : (project.imageGroups || project.images.length > 0) && (
        <section className="pt-12 pb-20 md:pb-32">
          <div className="container-x">
            {project.imageGroups ? (
              <ProjectImageTabs
                groups={project.imageGroups}
                title={project.title[locale]}
                locale={locale}
              />
            ) : (
              <div className="grid gap-3">
                {project.images.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden bg-paper-warm ${
                      i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title[locale]} — ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 75vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ BACK CTA ══ */}
      <section className="py-12 md:py-16 border-t border-ink/10">
        <div className="container-x flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8">
          <Link
            href="/architecture"
            className="ticker link-underline text-ink-muted hover:text-ink transition-colors"
          >
            ← {locale === "he" ? "כל הפרויקטים" : "All projects"}
          </Link>
          <Link href="/contact" className="btn-secondary self-start sm:self-auto">
            {locale === "he" ? "בואו נדבר על הפרויקט שלכם" : "Let's talk about your project"}
          </Link>
        </div>
      </section>
    </>
  );
}

function Divider() {
  return <span aria-hidden className="hidden sm:inline-block h-4 w-px bg-paper/25" />;
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex flex-col gap-0.5">
      <span className="ticker text-[9px] text-paper/55">{label}</span>
      <span className="text-sm font-medium text-paper">{value}</span>
    </span>
  );
}
