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
    <div className="relative min-h-[480px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[720px] rounded-2xl overflow-hidden shadow-2xl bg-ink">
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

      {/* Rich dark gradient coming from the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/75 to-transparent z-10 pointer-events-none" />

      {/* Circular step buttons — vertical side layout */}
      <div className="absolute top-1/2 -translate-y-1/2 start-3 sm:start-5 md:start-8 lg:start-10 flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 z-30">
        {steps.map((step, i) => {
          const isActive = i === openIndex;
          return (
            <button
              key={step.number}
              onClick={() => setOpenIndex(i)}
              aria-label={step.title}
              aria-pressed={isActive}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-[11px] sm:text-xs md:text-sm lg:text-base tabular-nums tracking-widest transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-paper/50 ${
                isActive
                  ? "bg-paper text-ink font-bold shadow-xl scale-110"
                  : "bg-ink/50 text-paper/75 hover:bg-ink/70 hover:text-paper backdrop-blur-sm border border-paper/15"
              }`}
            >
              {step.number}
            </button>
          );
        })}
      </div>

      {/* Text per step — positioned at the bottom with dark gradient background */}
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`absolute bottom-0 inset-x-0 p-6 pb-7 ps-16 sm:ps-20 md:p-12 md:pb-12 md:ps-28 lg:p-14 lg:pb-14 lg:ps-36 transition-all duration-500 z-20 ${
            i === openIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <h3 className="text-paper text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug text-balance mb-2.5 md:mb-4">
            {step.title}
          </h3>
          <p className="text-paper/85 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-[58ch]">
            {step.body}
          </p>
        </div>
      ))}
    </div>
  );
}
