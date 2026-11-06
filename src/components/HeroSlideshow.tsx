"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  intervalMs?: number;
}

export default function HeroSlideshow({ images, intervalMs = 7500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink" aria-hidden="true">
      {images.map((src, i) => {
        const isActive = i === index;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[8500ms] ease-out ${
                isActive ? "scale-100" : "scale-[1.04]"
              }`}
              style={{
                filter: "grayscale(1) brightness(1.18) contrast(0.68) saturate(0)",
              }}
            />
          </div>
        );
      })}
      {/* Reduced overall darkening so the architectural image shines through */}
      <div className="absolute inset-0 bg-ink/15" />
      <div className="absolute inset-x-0 top-0 h-28 md:h-36 bg-gradient-to-b from-ink/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/60 to-transparent" />
    </div>
  );
}
