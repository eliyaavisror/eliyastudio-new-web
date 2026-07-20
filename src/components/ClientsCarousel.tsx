"use client";

import Image from "next/image";

interface Props {
  logos: string[];
  title: string;
}

export default function ClientsCarousel({ logos, title }: Props) {
  if (logos.length === 0) return null;

  // triple-duplicate so the loop has enough content at any screen width
  const items = [...logos, ...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="container-x mb-10">
        <p className="eyebrow">{title}</p>
      </div>

      {/* dir=ltr forces consistent left-to-right layout in RTL context */}
      <div className="relative overflow-hidden" dir="ltr">
        {/* Fade left edge */}
        <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-paper to-transparent pointer-events-none" />
        {/* Fade right edge */}
        <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-paper to-transparent pointer-events-none" />

        <div
          className="flex items-center gap-20 w-max"
          style={{
            animation: "marquee 70s linear infinite",
            willChange: "transform",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 relative h-16 w-48 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image src={src} alt="" fill sizes="192px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
