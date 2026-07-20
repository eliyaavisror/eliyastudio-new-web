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
    <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] rounded-2xl overflow-hidden shadow-xl bg-ink">
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
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

      {/* Text per step */}
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`absolute bottom-0 inset-x-0 p-8 ps-20 md:p-12 md:ps-20 transition-all duration-500 ${
            i === openIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <h3 className="text-paper text-xl md:text-2xl lg:text-[1.75rem] font-semibold tracking-tight leading-snug text-balance mb-3">
            {step.title}
          </h3>
          <p className="text-paper/80 text-sm md:text-base leading-relaxed max-w-[55ch]">
            {step.body}
          </p>
        </div>
      ))}

      {/* Circular step buttons — right side, vertically centered */}
      <div className="absolute top-1/2 -translate-y-1/2 start-4 md:start-6 flex flex-col gap-2.5 md:gap-3">
        {steps.map((step, i) => {
          const isActive = i === openIndex;
          return (
            <button
              key={step.number}
              onClick={() => setOpenIndex(i)}
              aria-label={step.title}
              aria-pressed={isActive}
              className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[11px] md:text-xs tabular-nums tracking-widest transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-paper/50 ${
                isActive
                  ? "bg-paper text-ink font-semibold shadow-lg scale-110"
                  : "bg-ink/40 text-paper/70 hover:bg-ink/60 hover:text-paper backdrop-blur-sm"
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
