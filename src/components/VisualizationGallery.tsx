"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  VIZ_CATEGORIES,
  type VizCategoryMeta,
  type VizProject,
  type VizProjectCategory,
} from "@/data/visualization-projects";
import Lightbox from "./Lightbox";

const DEFAULT_PAGE_SIZE = 9; // 3 cols × 3 rows on desktop
type Filter = string;

/* ── Single Project Card ──────────────────────────────────────────────── */
function VizProjectCard({
  project,
  categoryLabel,
  locale,
  index,
  onOpen,
}: {
  project: VizProject;
  categoryLabel: string;
  locale: "he" | "en";
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const isHe = locale === "he";
  const count = project.images.length;
  const countLabel = isHe
    ? count === 1
      ? "תמונה 1"
      : `${count} תמונות`
    : count === 1
    ? "1 image"
    : `${count} images`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${(index % 6) * 0.06}s, transform 0.5s ease ${(index % 6) * 0.06}s`,
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={
          isHe
            ? `פתיחת גלריית הפרויקט ${project.title.he} (${countLabel})`
            : `Open project gallery ${project.title.en} (${countLabel})`
        }
        className="group block w-full text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
      >
        {/* Cover Image — B&W to Color on Hover */}
        <div className="gallery-img-wrap relative aspect-[16/10] w-full overflow-hidden bg-paper-warm">
          <Image
            src={project.cover}
            alt={project.title[locale]}
            fill
            quality={92}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="gallery-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading={index < 6 ? "eager" : "lazy"}
          />

          {/* Subtle photo count badge */}
          <span className="absolute bottom-3 end-3 z-10 px-3 py-1 rounded-full bg-paper/90 backdrop-blur-sm text-ink text-[11px] font-medium tracking-wide border border-ink/10 transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
            {countLabel}
          </span>
        </div>

        {/* Card Caption: Project Title & Category */}
        <div className="pt-3.5 pb-2 border-b border-ink/15 flex items-baseline justify-between gap-4 transition-colors duration-300 group-hover:border-ink">
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink truncate">
            {project.title[locale]}
          </h3>
          <span className="text-xs text-ink-muted shrink-0">
            {categoryLabel}
          </span>
        </div>
      </button>
    </article>
  );
}

/* ── Main Gallery Component ───────────────────────────────────────────── */
interface Props {
  projects: VizProject[];
  categories?: VizCategoryMeta[];
  locale: "he" | "en";
}

export default function VisualizationGallery({
  projects,
  categories = VIZ_CATEGORIES,
  locale,
}: Props) {
  const isHe = locale === "he";
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [activeProject, setActiveProject] = useState<VizProject | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePageSize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setPageSize(9); // 3 columns × 3 rows
      } else if (w >= 640) {
        setPageSize(8); // 2 columns × 4 rows
      } else {
        setPageSize(6); // 1 column × 6 rows
      }
    };
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageProjects = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const getCategoryLabel = useCallback(
    (catId: VizProjectCategory) =>
      categories.find((c) => c.id === catId)?.[locale] ?? "",
    [categories, locale]
  );

  const handleFilterChange = (nextFilter: Filter) => {
    setFilter(nextFilter);
    setPage(1);
    setActiveProject(null);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === safePage) return;
    setPage(nextPage);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openProject = useCallback((proj: VizProject) => {
    setActiveProject(proj);
    setSlideIndex(0);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  const prevSlide = useCallback(() => {
    if (!activeProject) return;
    const len = activeProject.images.length;
    setSlideIndex((i) => (i - 1 + len) % len);
  }, [activeProject]);

  const nextSlide = useCallback(() => {
    if (!activeProject) return;
    const len = activeProject.images.length;
    setSlideIndex((i) => (i + 1) % len);
  }, [activeProject]);

  const lightboxSlides = useMemo(
    () =>
      activeProject
        ? activeProject.images.map((src) => ({
            src,
            title: activeProject.title[locale],
          }))
        : [],
    [activeProject, locale]
  );

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* ── Filter Bar by Project Type ──────────────────────────────── */}
      <div
        role="group"
        aria-label={isHe ? "סינון לפי סוג פרויקט" : "Filter by project type"}
        className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-2 mb-10 border-b border-ink/12 pb-3"
      >
        {categories.map((cat) => {
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterChange(cat.id)}
              className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm transition-all duration-300 border-b-2 -mb-[13px] ${
                isActive
                  ? "border-ink text-ink font-semibold"
                  : "border-transparent text-ink/55 hover:text-ink hover:border-ink/30"
              }`}
            >
              {cat[locale]}
            </button>
          );
        })}
      </div>

      {/* ── Projects Grid (12 per page, 3 columns on desktop, 2 on tablet) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10 md:gap-y-12">
        {pageProjects.map((proj, i) => (
          <VizProjectCard
            key={proj.id}
            project={proj}
            categoryLabel={getCategoryLabel(proj.category)}
            locale={locale}
            index={i}
            onOpen={() => openProject(proj)}
          />
        ))}
      </div>

      {pageProjects.length === 0 && (
        <p className="text-center py-20 text-ink-muted">
          {isHe
            ? "אין פרויקטים בקטגוריה זו עדיין."
            : "No projects in this category yet."}
        </p>
      )}

      {/* ── Pagination Bar (Page numbers + Next/Prev) ───────────────── */}
      {totalPages > 1 && (
        <nav
          aria-label={isHe ? "ניווט בין עמודי הגלריה" : "Gallery pagination"}
          className="mt-14 pt-8 border-t border-ink/12 flex items-center justify-center gap-2"
        >
          {safePage > 1 && (
            <button
              type="button"
              onClick={() => handlePageChange(safePage - 1)}
              className="h-10 px-4 border border-ink/20 text-xs font-medium text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors"
            >
              {isHe ? "הקודם" : "Previous"}
            </button>
          )}

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => {
            const isCurrent = num === safePage;
            return (
              <button
                key={num}
                type="button"
                onClick={() => handlePageChange(num)}
                aria-current={isCurrent ? "page" : undefined}
                className={`w-10 h-10 border text-xs font-medium tabular-nums transition-colors ${
                  isCurrent
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-ink border-ink/20 hover:border-ink"
                }`}
              >
                {num}
              </button>
            );
          })}

          {safePage < totalPages && (
            <button
              type="button"
              onClick={() => handlePageChange(safePage + 1)}
              className="h-10 px-4 border border-ink/20 text-xs font-medium text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors inline-flex items-center gap-1.5"
            >
              <span>{isHe ? "הבא" : "Next"}</span>
              <span aria-hidden="true">{isHe ? "←" : "→"}</span>
            </button>
          )}
        </nav>
      )}

      {/* ── Project Lightbox Modal ──────────────────────────────────── */}
      {activeProject && (
        <Lightbox
          images={lightboxSlides}
          index={slideIndex}
          projectTitle={activeProject.title[locale]}
          projectCategory={getCategoryLabel(activeProject.category)}
          onClose={closeProject}
          onPrev={prevSlide}
          onNext={nextSlide}
          onSelect={setSlideIndex}
        />
      )}
    </div>
  );
}
