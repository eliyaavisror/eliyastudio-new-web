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
import SketchPaperSheet from "@/components/SketchPaperSheet";
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
  const allProjects = getArchProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[currentIndex] ?? getArchProjectBySlug(slug)!;
  const nextProject =
    allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;
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

          {/* Meta rows — status on its own line, location/client/year on separate clean row */}
          <div className="mt-5 md:mt-6 space-y-4 text-paper">
            {status && (
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium ticker bg-paper/10 text-paper backdrop-blur-md border border-paper/20 rounded-full">
                  <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                  <span>{status[locale]}</span>
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 pt-1">
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
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
              {locale === "he" ? "על הפרויקט" : "About the project"}
            </h2>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed text-pretty max-w-[85ch] mx-auto">
              {project.description[locale]}
            </p>
            {project.credit && (
              <p className="mt-6 text-sm md:text-base text-ink-muted max-w-[85ch] mx-auto">
                <RichText text={project.credit[locale]} />
              </p>
            )}
          </div>
        </section>
      )}

      {/* ══ SECTIONS ══ */}
      {project.sections ? (
        <ProjectRichContent
          sections={project.sections}
          title={project.title[locale]}
          locale={locale}
        />
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

      {/* ══ SKETCHBOOK SECTION ══ */}
      {project.sketches && project.sketches.length > 0 && (
        <section className="py-16 md:py-24 bg-paper-warm border-t border-ink/10">
          <div className="container-x">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {locale === "he" ? "מתוך ספר הסקיצות" : "From the Sketchbook"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              {project.sketches.map((src, i) => {
                const isWide = i === 0 && project.sketches!.length % 2 === 1;
                return (
                  <div
                    key={src}
                    className={isWide ? "md:col-span-2 max-w-4xl mx-auto w-full" : ""}
                  >
                    <SketchPaperSheet
                      src={src}
                      alt={`${project.title[locale]} — ${locale === "he" ? "סקיצה" : "Sketch"} ${i + 1}`}
                      sizes={isWide ? "(max-width: 1024px) 100vw, 80vw" : "(max-width: 768px) 100vw, 50vw"}
                      tilt={i % 2 === 0 ? "left" : "right"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ PROJECT NAVIGATION (ALL PROJECTS + NEXT PROJECT) ══ */}
      <section className="py-14 md:py-20 border-t border-ink/15 bg-paper">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
            {/* Back to all projects */}
            <Link
              href="/architecture#projects"
              className="group inline-flex items-center gap-3 text-ink-muted hover:text-ink transition-colors self-start md:self-center"
            >
              <span className="w-10 h-10 border border-ink/20 group-hover:border-ink group-hover:bg-ink group-hover:text-paper flex items-center justify-center transition-all duration-300">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="ltr:rotate-180"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="ticker text-[10px] text-ink-subtle">
                  {locale === "he" ? "חזרה לרשימה" : "Back to list"}
                </span>
                <span className="text-base md:text-lg font-semibold text-ink">
                  {locale === "he" ? "כל הפרויקטים" : "All Projects"}
                </span>
              </span>
            </Link>

            {/* Next project card */}
            {nextProject && (
              <Link
                href={`/architecture/${nextProject.slug}`}
                className="group flex items-center justify-between md:justify-end gap-5 sm:gap-6 p-3 sm:p-4 border border-ink/15 hover:border-ink bg-paper-warm/50 hover:bg-paper-warm transition-all duration-300 md:min-w-[360px]"
              >
                <div className="relative w-24 sm:w-28 aspect-[16/10] overflow-hidden bg-paper-warm shrink-0">
                  <Image
                    src={nextProject.cover}
                    alt={nextProject.title[locale]}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="ticker text-[10px] text-accent-dark mb-1">
                    {locale === "he" ? "הפרויקט הבא" : "Next Project"}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-ink truncate">
                    {nextProject.title[locale]}
                  </span>
                  <span className="text-xs text-ink-muted truncate mt-0.5">
                    {nextProject.location[locale]}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="w-9 h-9 flex items-center justify-center text-ink-muted group-hover:text-ink transition-transform duration-300 group-hover:-translate-x-1 ltr:group-hover:translate-x-1 shrink-0"
                >
                  {locale === "he" ? "←" : "→"}
                </span>
              </Link>
            )}
          </div>
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
