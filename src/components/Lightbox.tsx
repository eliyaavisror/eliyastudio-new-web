"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

export interface LightboxSlide {
  src: string;
  title?: string;
}

interface Props {
  images: LightboxSlide[];
  index: number;
  projectTitle?: string;
  projectCategory?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect?: (index: number) => void;
}

function CtrlBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-25"
    >
      {children}
    </button>
  );
}

export default function Lightbox({
  images,
  index,
  projectTitle,
  projectCategory,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: Props) {
  const locale = useLocale();
  const isHe = locale === "he";
  const current = images[index];
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const touchRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
    dist: number;
    pinched: boolean;
  } | null>(null);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    resetView();
    onPrev();
  }, [onPrev, resetView]);

  const handleNext = useCallback(() => {
    resetView();
    onNext();
  }, [onNext, resetView]);

  const handleSelect = useCallback(
    (idx: number) => {
      if (idx === index) return;
      resetView();
      onSelect?.(idx);
    },
    [index, onSelect, resetView]
  );

  const handleClose = useCallback(() => {
    resetView();
    onClose();
  }, [onClose, resetView]);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.75, 4)), []);
  const zoomOut = useCallback(
    () =>
      setZoom((z) => {
        const n = Math.max(z - 0.75, 1);
        if (n === 1) setPan({ x: 0, y: 0 });
        return n;
      }),
    []
  );

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await rootRef.current?.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const root = rootRef.current;
    const firstBtn = root?.querySelector<HTMLElement>("button");
    firstBtn?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen();
        else handleClose();
        return;
      }
      if (e.key === "Tab" && root) {
        const focusables = root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus({ preventScroll: true });
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus({ preventScroll: true });
          }
        }
        return;
      }
      if (zoom === 1 && images.length > 1) {
        if (e.key === "ArrowLeft") isHe ? handleNext() : handlePrev();
        if (e.key === "ArrowRight") isHe ? handlePrev() : handleNext();
      }
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [handleClose, handlePrev, handleNext, zoomIn, zoomOut, zoom, images.length, isHe]);

  /* ── Mouse drag (pan when zoomed) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: dragStart.current.panX + e.clientX - dragStart.current.x,
      y: dragStart.current.panY + e.clientY - dragStart.current.y,
    });
  };
  const onMouseUp = () => setIsDragging(false);

  /* ── Touch: swipe, 1-finger pan when zoomed, + pinch-to-zoom ── */
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (zoom > 1) setIsDragging(true);
      touchRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y,
        dist: 0,
        pinched: false,
      };
    } else if (e.touches.length === 2) {
      setIsDragging(true);
      const d = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      touchRef.current = {
        x: 0,
        y: 0,
        panX: pan.x,
        panY: pan.y,
        dist: d,
        pinched: true,
      };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchRef.current && zoom > 1 && !touchRef.current.pinched) {
      setPan({
        x: touchRef.current.panX + (e.touches[0].clientX - touchRef.current.x),
        y: touchRef.current.panY + (e.touches[0].clientY - touchRef.current.y),
      });
    } else if (e.touches.length === 2 && touchRef.current?.dist) {
      const d = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      const ratio = d / touchRef.current.dist;
      setZoom((z) => {
        const n = Math.min(Math.max(z * ratio, 1), 4);
        if (n === 1) setPan({ x: 0, y: 0 });
        return n;
      });
      touchRef.current.dist = d;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y,
        dist: 0,
        pinched: false,
      };
      return;
    }
    setIsDragging(false);
    if (
      touchRef.current &&
      !touchRef.current.pinched &&
      zoom === 1 &&
      e.changedTouches.length === 1 &&
      images.length > 1
    ) {
      const dx = e.changedTouches[0].clientX - touchRef.current.x;
      if (Math.abs(dx) > 45) {
        dx < 0 ? handleNext() : handlePrev();
      }
    }
    touchRef.current = null;
  };

  if (!current) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={projectTitle ?? current.title ?? (isHe ? "תצוגת פרויקט" : "Project gallery")}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-paper select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Preload adjacent images */}
      {images.length > 1 && (
        <div className="sr-only" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[(index - 1 + images.length) % images.length].src} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[(index + 1) % images.length].src} alt="" />
        </div>
      )}

      {/* ── Top Bar: Project Title + Counter + Controls ── */}
      <div
        className="relative z-20 px-4 sm:px-8 py-3 border-b border-ink/10 bg-paper/95 backdrop-blur-sm flex items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          {projectTitle && (
            <h2 className="text-sm sm:text-base font-semibold tracking-tight text-ink truncate">
              {projectTitle}
            </h2>
          )}
          {projectCategory && (
            <p className="text-[11px] text-ink-muted truncate">{projectCategory}</p>
          )}
        </div>

        {/* Counter in center */}
        <p
          dir="ltr"
          className="text-ink/70 text-xs font-medium tracking-widest tabular-nums shrink-0"
        >
          {index + 1} / {images.length}
        </p>

        {/* Controls */}
        <div className="flex items-center">
          <CtrlBtn onClick={zoomOut} disabled={zoom <= 1} label={isHe ? "הקטן תמונה" : "Zoom out"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35M8 11h6" />
            </svg>
          </CtrlBtn>
          {zoom > 1 && (
            <span className="text-ink/60 text-[11px] tabular-nums w-9 text-center font-medium">
              {Math.round(zoom * 100)}%
            </span>
          )}
          <CtrlBtn onClick={zoomIn} disabled={zoom >= 4} label={isHe ? "הגדל תמונה" : "Zoom in"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </CtrlBtn>
          <CtrlBtn
            onClick={toggleFullscreen}
            label={
              isFullscreen
                ? isHe
                  ? "צא ממסך מלא"
                  : "Exit fullscreen"
                : isHe
                ? "מסך מלא"
                : "Fullscreen"
            }
          >
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </CtrlBtn>
          <CtrlBtn onClick={handleClose} label={isHe ? "סגירה" : "Close"}>
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </CtrlBtn>
        </div>
      </div>

      {/* ── Main Image Stage ── */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-16 py-4 touch-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        {/* Prev / Next arrows (when multiple images & not zoomed) */}
        {zoom === 1 && images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                isHe ? handleNext() : handlePrev();
              }}
              aria-label={isHe ? "תמונה הבאה" : "Previous image"}
              className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-paper/85 border border-ink/15 shadow-sm flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink transition-all z-20"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 28 28" aria-hidden="true">
                <path d="M17 6l-8 8 8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                isHe ? handlePrev() : handleNext();
              }}
              aria-label={isHe ? "תמונה קודמת" : "Next image"}
              className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-paper/85 border border-ink/15 shadow-sm flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink transition-all z-20"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 28 28" aria-hidden="true">
                <path d="M11 6l8 8-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Loading spinner */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 border-2 border-ink/15 border-t-ink/60 rounded-full animate-spin" />
          </div>
        )}

        <div
          className="relative w-full h-full max-w-[90vw] max-h-[72vh]"
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isDragging ? "none" : "transform 0.15s ease",
          }}
        >
          {images.map((slide, i) => {
            const isActive = i === index;
            const isAdjacent =
              Math.abs(i - index) <= 1 ||
              (index === 0 && i === images.length - 1) ||
              (index === images.length - 1 && i === 0);
            return (
              <div
                key={slide.src}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  isActive
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={
                    isActive
                      ? projectTitle
                        ? `${projectTitle} (${i + 1}/${images.length})`
                        : slide.title ??
                          (isHe ? `הדמיה (${i + 1})` : `Visualization (${i + 1})`)
                      : ""
                  }
                  fill
                  unoptimized
                  sizes="90vw"
                  className="object-contain"
                  priority={isActive || isAdjacent}
                  onLoad={() => {
                    if (isActive) setLoaded(true);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Thumbnail Strip ── */}
      {images.length > 1 && (
        <div
          className="relative z-20 px-4 py-3 border-t border-ink/10 bg-paper-warm/70 flex items-center justify-center gap-2 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => {
            const active = i === index;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => handleSelect(i)}
                aria-label={isHe ? `תמונה ${i + 1}` : `Image ${i + 1}`}
                aria-current={active ? "true" : undefined}
                className={`relative w-16 h-11 sm:w-20 sm:h-14 overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                  active
                    ? "border-ink opacity-100 scale-105 shadow-sm"
                    : "border-transparent opacity-50 hover:opacity-85"
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
