import Image from "next/image";
import type { ContentSection } from "@/data/projects";
import SketchPaperSheet from "@/components/SketchPaperSheet";

interface Props {
  sections: ContentSection[];
  title: string;
  locale: "he" | "en";
}

export default function ProjectRichContent({ sections, title, locale }: Props) {
  return (
    <div>
      {sections.map((section, i) => {
        const tinted = i % 2 === 1;
        const imageFirst = i % 2 === 1; // alternate image side

        return (
          <section
            key={section.id}
            className={`py-14 md:py-20 ${tinted ? "bg-paper-warm" : ""}`}
          >
            <div className="container-x grid items-center gap-10 lg:gap-16 lg:grid-cols-12">
              {/* ── Image ── */}
              {section.image && (
                section.imageStyle === "paper" ? (
                  <div
                    className={`relative lg:col-span-7 ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <SketchPaperSheet
                      src={section.image}
                      alt={section.title?.[locale] ?? title}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      tilt={imageFirst ? "left" : "right"}
                    />
                  </div>
                ) : (
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
                )
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
                {section.title && (
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
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
