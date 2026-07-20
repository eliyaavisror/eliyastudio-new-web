"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageGroup } from "@/data/projects";

interface Props {
  groups: ImageGroup[];
  title: string;
  locale: "he" | "en";
}

export default function ProjectImageTabs({ groups, title, locale }: Props) {
  const [activeId, setActiveId] = useState(groups[0].id);
  const current = groups.find((g) => g.id === activeId) ?? groups[0];

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-6 border-b border-ink/10 mb-6">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveId(g.id)}
            className={`pb-3 text-sm font-medium tracking-wide border-b-2 -mb-px transition-colors ${
              activeId === g.id
                ? "border-ink text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {g[locale]}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid gap-3">
        {current.images.map((src, i) => (
          <div
            key={src}
            className={`relative overflow-hidden bg-paper-warm ${
              i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={src}
              alt={`${title} — ${current[locale]} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </>
  );
}
