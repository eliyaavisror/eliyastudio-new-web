"use client";

import { useState } from "react";
import Image from "next/image";

type Step = { number: string; title: string; body: string };

const STEP_IMAGES = [
  "/images/process/step-01.webp",
  "/images/process/step-02.webp",
  "/images/process/step-03.webp",
  "/images/process/step-04.webp",
  "/images/process/step-05.webp",
];

export default function ProcessAccordion({ steps }: { steps: Step[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="relative min-h-[440px] md:min-h-[520px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-xl bg-ink">
      {/* Background images */}
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === openIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={STEP_IMAGES[i] ?? STEP_IMAGES[0]}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(0.85) contrast(0.75) saturate(0)" }}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

      {/* Text per step */}
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`absolute bottom-0 inset-x-0 p-5 ps-14 sm:ps-16 md:p-12 md:ps-24 transition-all duration-500 ${
            i === openIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <h3 className="text-paper text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-semibold tracking-tight leading-snug text-balance mb-2 md:mb-3">
            {step.title}
          </h3>
          <p className="text-paper/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-[55ch]">
            {step.body}
          </p>
        </div>
      ))}

      {/* Circular step buttons — vertical side layout with responsive sizing */}
      <div className="absolute top-1/2 -translate-y-1/2 start-3 sm:start-4 md:start-6 flex flex-col gap-1.5 sm:gap-2 md:gap-3 z-10">
        {steps.map((step, i) => {
          const isActive = i === openIndex;
          return (
            <button
              key={step.number}
              onClick={() => setOpenIndex(i)}
              aria-label={step.title}
              aria-pressed={isActive}
              className={`w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] md:text-xs tabular-nums tracking-widest transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-paper/50 ${
                isActive
                  ? "bg-paper text-ink font-semibold shadow-lg scale-110"
                  : "bg-ink/50 text-paper/70 hover:bg-ink/70 hover:text-paper backdrop-blur-sm border border-paper/10"
              }`}
            >
              {step.number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
