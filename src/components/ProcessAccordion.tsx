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
    <div className="relative min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[580px] rounded-2xl overflow-hidden shadow-2xl bg-ink flex flex-col justify-end">
      {/* Background images */}
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`absolute inset-0 transition-opacity duration-700 ease-smooth ${
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
            style={{ filter: "grayscale(1) brightness(0.75) contrast(0.8) saturate(0)" }}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/30" />

      {/* Step selector buttons — Horizontal on Mobile, Vertical on Desktop */}
      <div className="absolute top-5 inset-x-4 lg:top-1/2 lg:-translate-y-1/2 lg:inset-x-auto lg:start-6 flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-2.5 md:gap-3 z-10">
        {steps.map((step, i) => {
          const isActive = i === openIndex;
          return (
            <button
              key={step.number}
              onClick={() => setOpenIndex(i)}
              aria-label={step.title}
              aria-pressed={isActive}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-xs tabular-nums tracking-widest transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-paper/50 ${
                isActive
                  ? "bg-paper text-ink font-bold shadow-lg scale-110"
                  : "bg-ink/60 text-paper/70 hover:bg-ink/80 hover:text-paper backdrop-blur-md border border-paper/10"
              }`}
            >
              {step.number}
            </button>
          );
        })}
      </div>

      {/* Text per step */}
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`relative z-10 p-6 pt-20 pb-8 md:p-10 lg:p-14 lg:ps-24 transition-all duration-500 ${
            i === openIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0 bottom-0"
          }`}
        >
          <div className="ticker text-xs text-paper/60 mb-2">
            {step.number} / {String(steps.length).padStart(2, "0")}
          </div>
          <h3 className="text-paper text-xl md:text-2xl lg:text-[1.75rem] font-semibold tracking-tight leading-snug text-balance mb-3">
            {step.title}
          </h3>
          <p className="text-paper/85 text-sm md:text-base leading-relaxed max-w-[55ch]">
            {step.body}
          </p>
        </div>
      ))}
    </div>
  );
}
