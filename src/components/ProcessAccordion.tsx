"use client";

import { useState } from "react";
import Image from "next/image";

type Step = { number: string; title: string; body: string };

const STEP_IMAGES = [
  "/images/process/step-01.webp",
  "/images/process/step-02.webp",
  "/images/process/step-03.png",
  "/images/process/step-04.png",
  "/images/process/step-05.webp",
];

export default function ProcessAccordion({ steps }: { steps: Step[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="relative w-full min-h-[430px] sm:min-h-[540px] md:min-h-[660px] lg:min-h-[740px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-ink">
      {/* Background images — clear, crisp display */}
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
            style={{ filter: "grayscale(1) brightness(1.12) contrast(0.86)" }}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Dark gradient confined strictly to the bottom text area */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] sm:h-[45%] md:h-[38%] min-h-[210px] md:min-h-[220px] bg-gradient-to-t from-ink/95 via-ink/80 to-transparent z-10 pointer-events-none" />

      {/* Circular step buttons — horizontal top row on mobile, vertical side column on sm+ */}
      <div className="absolute top-4 inset-x-4 flex flex-row justify-center gap-2.5 sm:inset-x-auto sm:top-1/2 sm:-translate-y-1/2 sm:start-5 md:start-8 lg:start-10 sm:flex-col sm:gap-2.5 md:gap-3 lg:gap-4 z-30">
        {steps.map((step, i) => {
          const isActive = i === openIndex;
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={step.title}
              aria-pressed={isActive}
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-xs md:text-sm lg:text-base tabular-nums tracking-widest transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-paper/50 ${
                isActive
                  ? "bg-white/95 text-ink font-bold backdrop-blur-xl shadow-2xl scale-110 border border-white"
                  : "bg-black/35 text-paper/90 hover:bg-black/55 hover:text-white backdrop-blur-xl border border-white/25 shadow-lg"
              }`}
            >
              {step.number}
            </button>
          );
        })}
      </div>

      {/* Text per step — positioned at the bottom with dark gradient background */}
      {steps.map((step, i) => {
        const isActive = i === openIndex;
        return (
          <div
            key={step.number}
            aria-hidden={!isActive}
            className={`absolute bottom-0 inset-x-0 p-5 pb-6 sm:p-8 sm:ps-20 md:p-12 md:pb-12 md:ps-28 lg:p-14 lg:pb-14 lg:ps-36 transition-all duration-500 z-20 ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <h3 className="text-paper text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug text-balance mb-2 md:mb-4">
              {step.title}
            </h3>
            <p className="text-paper/85 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-[58ch]">
              {step.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
