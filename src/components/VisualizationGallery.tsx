"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  GALLERY_CATEGORIES,
  type GalleryImage,
  type GalleryParent,
} from "@/data/gallery";
import Lightbox from "./Lightbox";

type Filter = "all" | GalleryParent | string;
type OpenDropdown = null | "exterior" | "interior";

/* ── Masonry item ─────────────────────────────────────────────────────── */
function MasonryItem({
  src,
  index,
  onClick,
}: {
  src: string;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="masonry-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${(index % 8) * 0.06}s, transform 0.55s ease ${(index % 8) * 0.06}s`,
      }}
    >
      <button
        onClick={onClick}
        aria-label="פתח תמונה"
        className="group relative block w-full overflow-hidden bg-paper-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
      >
        <div className="gallery-img-wrap relative w-full">
          <Image
            src={src}
            alt=""
            width={800}
            height={600}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="gallery-img w-full h-auto block"
            loading={index < 12 ? "eager" : "lazy"}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300"
          />
        </div>
      </button>
    </div>
  );
}

/* ── Chevron icon ─────────────────────────────────────────────────────── */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="6" viewBox="0 0 10 6"
      fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

/* ── Dropdown panel ───────────────────────────────────────────────────── */
function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute end-0 top-full mt-1 z-50 min-w-[180px] bg-paper border border-ink/15 shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1">
      {children}
    </div>
  );
}

function DropdownItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-start px-4 py-2.5 text-sm flex items-center justify-between gap-4 transition-colors hover:bg-paper-warm ${
        active ? "font-semibold text-ink" : "text-ink-soft"
      }`}
    >
      <span>{label}</span>
      {active && (
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" stroke="currentColor"
          strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 5l4 4 7-8" />
        </svg>
      )}
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
interface Props {
  images: GalleryImage[];
  locale: "he" | "en";
}

export default function VisualizationGallery({ images, locale }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const exteriorRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);

  const exteriorCats = GALLERY_CATEGORIES.filter((c) => c.parent === "exterior");
  const interiorCats = GALLERY_CATEGORIES.filter((c) => c.parent === "interior");

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!openDropdown) return;
    const ref = openDropdown === "exterior" ? exteriorRef : interiorRef;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  /* Close dropdown on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return images;
    if (filter === "exterior" || filter === "interior")
      return images.filter((img) => img.parent === filter);
    return images.filter((img) => img.categoryId === filter);
  }, [images, filter]);

  const changeFilter = useCallback((f: Filter) => {
    setFilter(f);
    setLightboxIndex(null);
    setOpenDropdown(null);
  }, []);

  const handleParentClick = useCallback(
    (parent: "exterior" | "interior") => {
      if (openDropdown === parent) {
        setOpenDropdown(null);
      } else {
        setFilter(parent);
        setOpenDropdown(parent);
      }
    },
    [openDropdown]
  );

  const isParentActive = (parent: "exterior" | "interior") => {
    if (filter === parent) return true;
    const cats = parent === "exterior" ? exteriorCats : interiorCats;
    return cats.some((c) => c.id === filter);
  };

  const getSubLabel = (parent: "exterior" | "interior") => {
    const cats = parent === "exterior" ? exteriorCats : interiorCats;
    return cats.find((c) => c.id === filter)?.[locale] ?? null;
  };

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length),
    [filtered.length]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length),
    [filtered.length]
  );

  const btnBase =
    "min-h-[44px] px-5 py-2.5 text-sm font-medium tracking-wide border transition-colors flex items-center gap-2";
  const btnOn = "bg-ink text-paper border-ink";
  const btnOff = "bg-transparent text-ink border-paper-line hover:border-ink";

  return (
    <>
      {/* ── Filter bar ──────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label={locale === "he" ? "סינון לפי קטגוריה" : "Filter by category"}
        className="flex gap-2 mb-10"
      >
        {/* הכל */}
        <button
          role="tab"
          aria-selected={filter === "all"}
          onClick={() => changeFilter("all")}
          className={`${btnBase} ${filter === "all" ? btnOn : btnOff}`}
        >
          {locale === "he" ? "הכל" : "All"}
        </button>

        {/* חוץ ▾ */}
        <div ref={exteriorRef} className="relative">
          <button
            role="tab"
            aria-selected={isParentActive("exterior")}
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "exterior"}
            onClick={() => handleParentClick("exterior")}
            className={`${btnBase} ${isParentActive("exterior") ? btnOn : btnOff}`}
          >
            <span>
              {locale === "he" ? "חוץ" : "Exterior"}
              {getSubLabel("exterior") && (
                <span className="ms-1 text-xs opacity-70">
                  — {getSubLabel("exterior")}
                </span>
              )}
            </span>
            <Chevron open={openDropdown === "exterior"} />
          </button>

          {openDropdown === "exterior" && (
            <DropdownPanel>
              <DropdownItem
                label={locale === "he" ? "הכל" : "All"}
                active={filter === "exterior"}
                onClick={() => changeFilter("exterior")}
              />
              {exteriorCats.map((cat) => (
                <DropdownItem
                  key={cat.id}
                  label={cat[locale]}
                  active={filter === cat.id}
                  onClick={() => changeFilter(cat.id)}
                />
              ))}
            </DropdownPanel>
          )}
        </div>

        {/* פנים ▾ */}
        <div ref={interiorRef} className="relative">
          <button
            role="tab"
            aria-selected={isParentActive("interior")}
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "interior"}
            onClick={() => handleParentClick("interior")}
            className={`${btnBase} ${isParentActive("interior") ? btnOn : btnOff}`}
          >
            <span>
              {locale === "he" ? "פנים" : "Interior"}
              {getSubLabel("interior") && (
                <span className="ms-1 text-xs opacity-70">
                  — {getSubLabel("interior")}
                </span>
              )}
            </span>
            <Chevron open={openDropdown === "interior"} />
          </button>

          {openDropdown === "interior" && (
            <DropdownPanel>
              <DropdownItem
                label={locale === "he" ? "הכל" : "All"}
                active={filter === "interior"}
                onClick={() => changeFilter("interior")}
              />
              {interiorCats.map((cat) => (
                <DropdownItem
                  key={cat.id}
                  label={cat[locale]}
                  active={filter === cat.id}
                  onClick={() => changeFilter(cat.id)}
                />
              ))}
            </DropdownPanel>
          )}
        </div>
      </div>

      {/* ── Masonry grid ──────────────────────────────────────────────── */}
      <div className="masonry">
        {filtered.map((img, i) => (
          <MasonryItem
            key={img.src}
            src={img.src}
            index={i}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-20 text-ink-muted">
          {locale === "he"
            ? "אין תמונות בקטגוריה זו עדיין."
            : "No images in this category yet."}
        </p>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
