import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project, ProjectStatus } from "@/data/projects";

const STATUS_MAP: Record<ProjectStatus, { he: string; en: string; color: string }> = {
  planning:     { he: "תכנון ראשוני",    en: "Initial Planning",    color: "bg-amber-100 text-amber-800" },
  licensing:    { he: "בשלב רישוי",      en: "Licensing",           color: "bg-blue-100 text-blue-800" },
  construction: { he: "בשלבי ביצוע",    en: "Under Construction",  color: "bg-orange-100 text-orange-800" },
  completed:    { he: "הושלם",           en: "Completed",           color: "bg-green-100 text-green-800" },
};

export default function ArchProjectCard({
  project,
  locale,
  index,
}: { project: Project; locale: "he" | "en"; index?: number }) {
  const status = project.status ? STATUS_MAP[project.status] : null;

  return (
    <article className="group">
      <Link
        href={`/architecture/${project.slug}`}
        className="block overflow-hidden rounded-xl bg-paper-warm relative aspect-[16/10]"
        aria-label={project.title[locale]}
      >
        <Image
          src={project.cover}
          alt={`${project.title[locale]} — ${project.location[locale]}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />

        {/* Status badge */}
        {status && (
          <span className={`absolute top-3 ltr:left-3 rtl:right-3 px-3 py-1 text-[10px] font-medium uppercase tracking-wider rounded-sm ${status.color}`}>
            {status[locale]}
          </span>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

        {/* Text overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
          <h3 className="text-paper text-lg md:text-xl font-semibold tracking-tight leading-snug">
            {project.title[locale]}
          </h3>
          <div className="flex items-center gap-4 mt-1.5">
            <span className="text-paper/65 text-sm">{project.location[locale]}</span>
            {project.year && (
              <span className="text-paper/45 text-xs ticker">{project.year}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
