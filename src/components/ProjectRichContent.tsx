import Image from "next/image";
import type { ContentSection } from "@/data/projects";

interface Props {
  sections: ContentSection[];
  title: string;
  locale: "he" | "en";
}

export default function ProjectRichContent({ sections, title, locale }: Props) {
  return (
    <div>
      {sections.map((section, i) => {
        const num = String(i + 1).padStart(2, "0");
        const tinted = i % 2 === 1;
        const imageFirst = i % 2 === 1; // alternate image side

        return (
          <section
            key={section.id}
            className={`py-16 md:py-24 ${tinted ? "bg-paper-warm" : ""}`}
          >
            <div className="container-x grid items-center gap-10 lg:gap-16 lg:grid-cols-12">
              {/* ── Image ── */}
              {section.image && (
                <div
                  className={`relative aspect-[4/3] overflow-hidden bg-paper lg:col-span-7 ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={section.image}
                    alt={section.title?.[locale] ?? title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* ── Text ── */}
              <div
                className={
                  section.image
                    ? imageFirst
                      ? "lg:col-span-5 lg:order-2"
                      : "lg:col-span-5 lg:order-1"
                    : "lg:col-span-8 lg:col-start-3 text-center"
                }
              >
                {/* Number + accent rule */}
                <div
                  className={`flex items-baseline gap-4 mb-5 ${
                    section.image ? "" : "justify-center"
                  }`}
                >
                  <span
                    className="font-extralight leading-none text-accent/90"
                    style={{ fontSize: "clamp(2.75rem, 5vw, 4.25rem)", letterSpacing: "-0.04em" }}
                  >
                    {num}
                  </span>
                  <span className="h-px w-12 bg-accent/40 translate-y-[-0.6rem]" />
                </div>

                {section.title && (
                  <h2 className="text-display-lg font-bold tracking-tight mb-5">
                    {section.title[locale]}
                  </h2>
                )}

                <p
                  className={`text-base md:text-lg text-ink-soft leading-relaxed text-pretty ${
                    section.image ? "" : "max-w-[60ch] mx-auto"
                  }`}
                >
                  {section[locale]}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
