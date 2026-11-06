import Image from "next/image";
import { useId } from "react";

interface Props {
  src: string;
  alt: string;
  sizes?: string;
  tilt?: "left" | "right";
}

export default function SketchPaperSheet({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 58vw",
  tilt = "left",
}: Props) {
  const rawId = useId();
  const filterId = `torn-edge-${rawId.replace(/:/g, "")}`;

  const rotateClass =
    tilt === "left"
      ? "-rotate-[0.45deg] hover:rotate-0"
      : "rotate-[0.45deg] hover:rotate-0";

  return (
    <div className={`relative py-2 ${rotateClass} transition-transform duration-500`}>
      {/* Hidden SVG filter for natural organic torn sketchbook paper edge */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative aspect-[4/3] drop-shadow-[0_14px_28px_rgba(20,20,20,0.11)] drop-shadow-[0_3px_8px_rgba(20,20,20,0.06)]">
        {/* Crisp white sketchbook sheet with organic torn edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white"
          style={{ filter: `url(#${filterId})` }}
        />

        {/* Subtle fine-grain white paper sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-1 pointer-events-none z-10 shadow-[inset_0_0_24px_rgba(0,0,0,0.025)]"
        />

        {/* Sharp sketch image blended cleanly onto the white torn sheet */}
        <div className="relative w-full h-full p-2 sm:p-3">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
