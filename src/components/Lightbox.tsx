"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function CtrlBtn({
  onClick, disabled, label, children,
}: { onClick: () => void; disabled?: boolean; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors disabled:opacity-25"
    >
      {children}
    </button>
  );
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
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
  const touchRef = useRef<{ x: number; y: number; dist: number } | null>(null);

  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); setLoaded(false); }, []);
  const handlePrev = useCallback(() => { resetView(); onPrev(); }, [onPrev, resetView]);
  const handleNext = useCallback(() => { resetView(); onNext(); }, [onNext, resetView]);
  const handleClose = useCallback(() => { resetView(); onClose(); }, [onClose, resetView]);
  const zoomIn = useCallback(() => setZoom(z => Math.min(z + 0.75, 4)), []);
  const zoomOut = useCallback(() => setZoom(z => {
    const n = Math.max(z - 0.75, 1);
    if (n === 1) setPan({ x: 0, y: 0 });
    return n;
  }), []);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (document.fullscreenElement) document.exitFullscreen(); else handleClose(); return; }
      if (zoom === 1) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [handleClose, handlePrev, handleNext, zoomIn, zoomOut, zoom]);

  /* ── Mouse drag (pan when zoomed) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: dragStart.current.panX + e.clientX - dragStart.current.x, y: dragStart.current.panY + e.clientY - dragStart.current.y });
  };
  const onMouseUp = () => setIsDragging(false);

  /* ── Touch: swipe + pinch-to-zoom ── */
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dist: 0 };
    } else if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
      touchRef.current = { x: 0, y: 0, dist: d };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchRef.current?.dist) {
      e.preventDefault();
      const d = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
      const ratio = d / touchRef.current.dist;
      setZoom(z => { const n = Math.min(Math.max(z * ratio, 1), 4); if (n === 1) setPan({ x: 0, y: 0 }); return n; });
      touchRef.current.dist = d;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current && zoom === 1 && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchRef.current.x;
      if (Math.abs(dx) > 50) dx < 0 ? handleNext() : handlePrev();
    }
    touchRef.current = null;
  };

  if (!current) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.title ?? (isHe ? "תצוגת תמונה" : "Image viewer")}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] select-none"
      onClick={zoom === 1 ? handleClose : undefined}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Preload adjacent images */}
      <div className="sr-only" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[(index - 1 + images.length) % images.length].src} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[(index + 1) % images.length].src} alt="" />
      </div>

      {/* Counter */}
      <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest z-10 pointer-events-none">
        {index + 1} / {images.length}
      </p>

      {/* Controls — top right */}
      <div className="absolute top-2 right-2 flex items-center z-10" onClick={e => e.stopPropagation()}>
        <CtrlBtn onClick={zoomOut} disabled={zoom <= 1} label={isHe ? "הקטן תמונה" : "Zoom out"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/>
          </svg>
        </CtrlBtn>
        {zoom > 1 && (
          <span className="text-white/35 text-[11px] tabular-nums w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
        )}
        <CtrlBtn onClick={zoomIn} disabled={zoom >= 4} label={isHe ? "הגדל תמונה" : "Zoom in"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
        </CtrlBtn>
        <CtrlBtn onClick={toggleFullscreen} label={isFullscreen ? (isHe ? "צא ממסך מלא" : "Exit fullscreen") : (isHe ? "מסך מלא" : "Fullscreen")}>
          {isFullscreen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          )}
        </CtrlBtn>
        <CtrlBtn onClick={handleClose} label={isHe ? "סגור" : "Close"}>
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </CtrlBtn>
      </div>

      {/* Prev / Next (hidden when zoomed) */}
      {zoom === 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); handlePrev(); }} aria-label={isHe ? "תמונה קודמת" : "Previous image"}
            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28" aria-hidden="true">
              <path d="M17 6l-8 8 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={e => { e.stopPropagation(); handleNext(); }} aria-label={isHe ? "תמונה הבאה" : "Next image"}
            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28" aria-hidden="true">
              <path d="M11 6l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Image */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={e => { if (zoom > 1) e.stopPropagation(); }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        {/* Loading spinner */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 border-2 border-white/15 border-t-white/50 rounded-full animate-spin" />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isDragging ? "none" : "transform 0.15s ease",
          }}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.title ?? ""}
            fill
            sizes="100vw"
            className="object-contain"
            priority
            quality={90}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {/* Title */}
      {current.title && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest text-center px-10 z-10 pointer-events-none">
          {current.title}
        </p>
      )}
    </div>
  );
}
