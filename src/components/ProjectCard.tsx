import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project, priority = false, index,
}: { project: Project; priority?: boolean; index?: number }) {
  const locale = useLocale() as "he" | "en";
  const num = typeof index === "number" ? String(index).padStart(2, "0") : undefined;

  return (
    <article className="group">
      <Link
        href={`/visualizations#${project.slug}`}
        className="block overflow-hidden bg-paper-warm"
        aria-label={`${project.title[locale]}, ${project.location[locale]}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.cover}
            alt={`${project.title[locale]} — ${project.location[locale]}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            priority={priority}
          />
        </div>
      </Link>
      <div className="mt-4 pt-4 border-t border-ink flex items-baseline justify-between gap-4">
        <div>
          {num && (
            <p className="ticker text-ink-muted text-[10px] mb-2">
              {num} {project.category ? `/ ${categoryLabel(project.category, locale)}` : ""}
            </p>
          )}
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            {project.title[locale]}
          </h3>
        </div>
        <p className="ticker text-ink-muted whitespace-nowrap">
          {project.location[locale]} · {project.year}
        </p>
      </div>
    </article>
  );
}

function categoryLabel(c: string, locale: "he" | "en") {
  const map: Record<string, { he: string; en: string }> = {
    exterior:     { he: "חוץ",       en: "Exterior" },
    interior:     { he: "פנים",      en: "Interior" },
    aerial:       { he: "אוויר",     en: "Aerial" },
    architecture: { he: "אדריכלות",  en: "Architecture" },
  };
  return map[c]?.[locale] ?? c;
}
