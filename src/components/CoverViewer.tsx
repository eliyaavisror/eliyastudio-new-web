"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  aspect: number;
  locale: "he" | "en";
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

export default function CoverViewer({ src, alt, aspect, locale }: Props) {
  const isHe = locale === "he";
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const touchRef = useRef<{ x: number; y: number; dist: number } | null>(null);

  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); setLoaded(false); }, []);

  const close = useCallback(() => {
    resetView();
    setOpen(false);
  }, [resetView]);

  const zoomIn  = useCallback(() => setZoom(1.75), []);
  const zoomOut = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (document.fullscreenElement) document.exitFullscreen(); else close(); return; }
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, zoomIn, zoomOut]);

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

  /* ── Touch: pinch-to-zoom ── */
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
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
  const onTouchEnd = () => { touchRef.current = null; };

  return (
    <>
      <div
        className="group relative w-full overflow-hidden bg-paper-warm cursor-zoom-in"
        style={{ aspectRatio: aspect }}
        role="button"
        tabIndex={0}
        aria-label={isHe ? `${alt} — לחץ להגדלה` : `${alt} — click to expand`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1408px) 100vw, 1408px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          priority
        />
        <div className="absolute bottom-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-ink/55 backdrop-blur-sm rounded px-2.5 py-1.5 flex items-center gap-1.5 pointer-events-none">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="text-paper">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
          <span className="ticker text-paper text-[10px]">{isHe ? "הגדל" : "Expand"}</span>
        </div>
      </div>

      {open && (
        <div
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          aria-label={isHe ? "תצוגת תמונה מורחבת" : "Expanded image view"}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] select-none"
          onClick={zoom === 1 ? close : undefined}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
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
            <CtrlBtn onClick={close} label={isHe ? "סגור" : "Close"}>
              <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </CtrlBtn>
          </div>

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
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                quality={95}
                onLoad={() => setLoaded(true)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
