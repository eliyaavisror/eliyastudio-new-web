"use client";

import { useEffect, useState, useCallback, useRef, useId } from "react";
import { useTranslations } from "next-intl";

type Setting =
  | "page-zoom"
  | "big-text"
  | "high-contrast"
  | "readable-font"
  | "bigger-cursor"
  | "pause-animations"
  | "highlight-headings"
  | "highlight-links"
  | "show-alt";

const STORAGE_KEY = "a11y-settings-v3";
const FOCUSABLE_QUERY =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/* Settings that map to a CSS class on <html>. show-alt is JS-only. */
const CSS_SETTINGS = new Set<Setting>([
  "page-zoom", "big-text", "high-contrast", "readable-font",
  "bigger-cursor", "pause-animations", "highlight-headings", "highlight-links",
]);

function applySettings(settings: Set<Setting>) {
  const html = document.documentElement;
  CSS_SETTINGS.forEach(k => html.classList.remove(`a11y-${k}`));
  settings.forEach(k => {
    if (CSS_SETTINGS.has(k)) html.classList.add(`a11y-${k}`);
  });
}

function loadSettings(): Set<Setting> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      const valid = new Set<Setting>(arr.filter(s =>
        ["page-zoom","big-text","high-contrast","readable-font","bigger-cursor",
         "pause-animations","highlight-headings","highlight-links","show-alt"]
        .includes(s)) as Setting[]);
      return valid;
    }
  } catch { /* ignore */ }
  return new Set();
}

function saveSettings(s: Set<Setting>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...s])); } catch { /* ignore */ }
}

/* ─── SVG Icons ─── */
function IcoZoom() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8.5 6v5M6 8.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IcoBigText() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <text x="1" y="12" fontSize="9" fontWeight="700" fill="currentColor" fontFamily="sans-serif">A</text>
      <text x="9" y="17" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="sans-serif">A</text>
    </svg>
  );
}
function IcoContrast() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2.5a7.5 7.5 0 0 1 0 15V2.5z" fill="currentColor"/>
    </svg>
  );
}
function IcoFont() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <text x="1.5" y="13" fontSize="9" fontWeight="400" fill="currentColor" fontFamily="sans-serif">A</text>
      <text x="9" y="16" fontSize="12" fontWeight="400" fill="currentColor" fontFamily="serif">a</text>
    </svg>
  );
}
function IcoCursor() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M4.5 3L4.5 14.5L7.5 11.5L9.5 16.5L11.5 15.5L9.5 10.5L14 10.5Z"
        fill="currentColor" stroke="currentColor" strokeWidth="0.4" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoPause() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <rect x="4.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
      <rect x="12" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
    </svg>
  );
}
function IcoHeadings() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 5v10M10 5v10M3 10h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <rect x="12" y="7" width="5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.25"/>
    </svg>
  );
}
function IcoLinks() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 12a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IcoAlt() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="6.5" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
      <path d="M4 13l3.5-4L10 12l2-2.5 4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 17h4M11 17h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export default function AccessibilityWidget() {
  const t = useTranslations("a11yWidget");
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Set<Setting>>(new Set());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Load persisted settings on mount */
  useEffect(() => {
    const s = loadSettings();
    setActive(s);
    applySettings(s);
  }, []);

  /* Focus trap + ESC key */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_QUERY);
    focusables[0]?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const els = panel.querySelectorAll<HTMLElement>(FOCUSABLE_QUERY);
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  /* ALT text overlays — JS-only, no CSS class on <html> */
  const showAlt = active.has("show-alt");
  useEffect(() => {
    const cleanup = () =>
      document.querySelectorAll(".a11y-alt-overlay").forEach(el => el.remove());

    if (!showAlt) { cleanup(); return cleanup; }

    const render = () => {
      cleanup();
      document.querySelectorAll<HTMLImageElement>("img").forEach(img => {
        const alt = (img.getAttribute("alt") ?? "").trim();
        if (!alt) return;
        const rect = img.getBoundingClientRect();
        if (rect.width < 20 || rect.height < 20) return;
        const div = document.createElement("div");
        div.className = "a11y-alt-overlay";
        div.textContent = alt;
        div.style.top  = `${Math.max(0, rect.bottom - 32)}px`;
        div.style.left = `${rect.left}px`;
        div.style.width = `${rect.width}px`;
        document.body.appendChild(div);
      });
    };

    render();
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", render, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", render);
    };
  }, [showAlt]);

  const update = useCallback((next: Set<Setting>) => {
    setActive(next);
    applySettings(next);
    saveSettings(next);
  }, []);

  const toggle = (key: Setting) => {
    const next = new Set(active);
    next.has(key) ? next.delete(key) : next.add(key);
    update(next);
  };

  const reset = () => update(new Set());
  const close = () => { setOpen(false); triggerRef.current?.focus(); };

  const features: Array<{ key: Setting; label: string; Icon: React.ComponentType }> = [
    { key: "page-zoom",          label: t("pageZoom"),          Icon: IcoZoom     },
    { key: "big-text",           label: t("bigText"),           Icon: IcoBigText  },
    { key: "high-contrast",      label: t("highContrast"),      Icon: IcoContrast },
    { key: "readable-font",      label: t("readableFont"),      Icon: IcoFont     },
    { key: "bigger-cursor",      label: t("biggerCursor"),      Icon: IcoCursor   },
    { key: "pause-animations",   label: t("pauseAnimations"),   Icon: IcoPause    },
    { key: "highlight-headings", label: t("highlightHeadings"), Icon: IcoHeadings },
    { key: "highlight-links",    label: t("highlightLinks"),    Icon: IcoLinks    },
    { key: "show-alt",           label: t("showAlt"),           Icon: IcoAlt      },
  ];

  return (
    <>
      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-haspopup="dialog"
        title={t("title")}
        className="fixed bottom-4 ltr:left-4 rtl:right-4 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink text-paper shadow-xl ring-2 ring-paper/80 hover:scale-105 transition-transform flex items-center justify-center focus-visible:outline-[3px] focus-visible:outline-paper focus-visible:outline-offset-2"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.25" fill="currentColor"/>
          <path d="M5 9h14M12 9v5.5M9 22l3-7.5 3 7.5M9 15h6"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ── Panel ── */}
      {open && (
        <>
          <div className="fixed inset-0 z-[59] md:hidden" aria-hidden="true" onClick={close}/>
          <div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed bottom-[4.5rem] ltr:left-4 rtl:right-4 z-[60] w-[calc(100vw-2rem)] max-w-[320px] bg-paper border border-paper-line shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-paper-line flex items-center justify-between bg-paper-warm">
              <h2 id={titleId} className="ticker">{t("title")}</h2>
              <button
                onClick={close}
                aria-label={t("close")}
                className="w-11 h-11 flex items-center justify-center rounded-sm hover:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* 3×3 feature grid */}
            <div className="p-3 grid grid-cols-3 gap-2">
              {features.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  aria-pressed={active.has(key)}
                  className={`h-[76px] border flex flex-col items-center justify-center gap-1.5 px-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                    active.has(key)
                      ? "bg-ink text-paper border-ink focus-visible:outline-paper"
                      : "bg-paper border-paper-line hover:border-ink text-ink focus-visible:outline-ink"
                  }`}
                >
                  <Icon />
                  <span className="ticker text-[8px] leading-tight text-center">{label}</span>
                </button>
              ))}
            </div>

            {/* Reset */}
            <div className="px-3 pb-3">
              <button
                onClick={reset}
                className="w-full h-11 border border-paper-line ticker text-ink-muted hover:border-ink hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-[-2px]"
              >
                {t("reset")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
