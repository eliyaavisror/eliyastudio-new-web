"use client";

import React, { useState } from "react";

export interface PrincipleItem {
  title: string;
  tag: string;
  desc: string;
  icon: React.ReactNode;
}

export default function PrinciplesInteractive({
  items,
}: {
  items: PrincipleItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-14 items-start">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => toggle(idx)}
            aria-expanded={isOpen}
            className="group text-start w-full bg-transparent focus:outline-none"
          >
            {/* Open, box-free icon + title header */}
            <div className="flex items-start gap-4 pb-4 border-b border-ink/15 group-hover:border-ink transition-colors duration-500">
              {/* Free-floating sculptural icon (no square box) */}
              <div
                className={`shrink-0 pt-0.5 transition-all duration-500 ease-out ${
                  isOpen
                    ? "text-ink scale-110"
                    : "text-ink/55 group-hover:text-ink group-hover:scale-105"
                }`}
              >
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <span className="block text-xs font-light text-ink-muted mb-0.5">
                  {item.tag}
                </span>
                <h3
                  className={`text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                    isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Minimalist +/- indicator */}
              <span
                aria-hidden="true"
                className={`mt-1 text-ink-muted group-hover:text-ink transition-transform duration-500 ease-out shrink-0 ${
                  isOpen ? "rotate-45 text-ink" : ""
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </div>

            {/* Smoothly unfolding text on click — no box, just a clean architectural line */}
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 pt-4"
                  : "grid-rows-[0fr] opacity-0 pt-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm md:text-base font-light text-ink-soft leading-relaxed text-pretty border-s border-ink/30 ps-4">
                  {item.desc}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
