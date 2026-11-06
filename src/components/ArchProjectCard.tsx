import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";

export default function ArchProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: "he" | "en";
}) {
  return (
    <article className="group">
      <Link
        href={`/architecture/${project.slug}`}
        className="block"
        aria-label={project.title[locale]}
      >
        {/* Pure, unobstructed image frame */}
        <div className="relative overflow-hidden bg-paper-warm aspect-[16/10]">
          <Image
            src={project.cover}
            alt={`${project.title[locale]} — ${project.location[locale]}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.04]" />
        </div>

        {/* Clean editorial metadata bar below image */}
        <div className="pt-4 md:pt-5 pb-2 border-b border-ink/15 flex items-baseline justify-between gap-4 transition-colors duration-300 group-hover:border-ink">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink truncate">
            {project.title[locale]}
          </h3>

          <div className="flex items-baseline gap-3 md:gap-5 shrink-0">
            <span className="text-ink-muted text-xs md:text-sm">
              {project.location[locale]}
            </span>
            {project.year && (
              <span className="text-ink-subtle text-[11px] ticker tabular-nums hidden sm:inline">
                {project.year}
              </span>
            )}
            <span
              aria-hidden="true"
              className="text-ink-muted text-xs transition-transform duration-300 group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
            >
              {locale === "he" ? "←" : "→"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
