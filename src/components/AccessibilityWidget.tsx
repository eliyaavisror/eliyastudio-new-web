"use client";

import { useEffect, useState, useCallback, useRef, useId } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Setting =
  | "big-text"
  | "page-zoom"
  | "high-contrast"
  | "dark-contrast"
  | "monochrome"
  | "readable-font"
  | "highlight-links"
  | "highlight-headings"
  | "focus-highlight"
  | "bigger-cursor"
  | "pause-animations"
  | "show-alt";

const ALL_SETTINGS: Setting[] = [
  "big-text",
  "page-zoom",
  "high-contrast",
  "dark-contrast",
  "monochrome",
  "readable-font",
  "highlight-links",
  "highlight-headings",
  "focus-highlight",
  "bigger-cursor",
  "pause-animations",
  "show-alt",
];

const STORAGE_KEY = "a11y-settings-v4";
const FOCUSABLE_QUERY =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/* Settings that map to a CSS class on <html>. show-alt is JS-only. */
const CSS_SETTINGS = new Set<Setting>(
  ALL_SETTINGS.filter((s) => s !== "show-alt")
);

function applySettings(settings: Set<Setting>) {
  const html = document.documentElement;
  CSS_SETTINGS.forEach((k) => html.classList.remove(`a11y-${k}`));
  settings.forEach((k) => {
    if (CSS_SETTINGS.has(k)) html.classList.add(`a11y-${k}`);
  });
}

function loadSettings(): Set<Setting> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      const valid = new Set<Setting>(
        arr.filter((s) => ALL_SETTINGS.includes(s as Setting)) as Setting[]
      );
      return valid;
    }
  } catch {
    /* ignore */
  }
  return new Set();
}

function saveSettings(s: Set<Setting>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
  } catch {
    /* ignore */
  }
}

/* ─── SVG Icons ─── */
function IcoBigText() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path d="M2.5 16L6.5 6L10.5 16M3.8 13H9.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17L16.2 6.5L20.4 17M13.4 13.8H19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoZoom() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="9.5" cy="9.5" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 14L18.5 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 6.8v5.4M6.8 9.5h5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IcoContrast() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 3a8 8 0 0 1 0 16V3z" fill="currentColor" />
    </svg>
  );
}
function IcoDarkContrast() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M17.5 14.2A7.5 7.5 0 0 1 7.8 4.5a7.5 7.5 0 1 0 9.7 9.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IcoMonochrome() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8.5" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13.5" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}
function IcoFont() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 6h14M11 6v11M8 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoLinks() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 13a3.5 3.5 0 0 0 5 0l2.2-2.2a3.5 3.5 0 0 0-5-5L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 9a3.5 3.5 0 0 0-5 0L5.8 11.2a3.5 3.5 0 0 0 5 5L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 19h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IcoHeadings() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 5.5v11M11 5.5v11M4 11h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="13.5" y="7.5" width="5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}
function IcoFocus() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M14 4h3a1 1 0 0 1 1 1v3M18 14v3a1 1 0 0 1-1 1h-3M8 18H5a1 1 0 0 1-1-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="11" r="2.5" fill="currentColor" />
    </svg>
  );
}
function IcoCursor() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5.5 3.5L5.5 16L8.8 12.7L11 18L13.2 17L11 11.7L15.8 11.7Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IcoPause() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <rect x="5.5" y="4.5" width="3.8" height="13" rx="1" fill="currentColor" />
      <rect x="12.7" y="4.5" width="3.8" height="13" rx="1" fill="currentColor" />
    </svg>
  );
}
function IcoAlt() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <rect x="2.5" y="3.5" width="17" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="8" r="1.5" fill="currentColor" opacity="0.7" />
      <path d="M4.5 14l3.8-4.2L11 13l2.2-2.7 4.3 3.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 18.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  /* ALT text overlays — JS-only, shows image descriptions on screen */
  const showAlt = active.has("show-alt");
  useEffect(() => {
    const cleanup = () =>
      document.querySelectorAll(".a11y-alt-overlay").forEach((el) => el.remove());

    if (!showAlt) {
      cleanup();
      return cleanup;
    }

    const render = () => {
      cleanup();
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (img.closest('[aria-hidden="true"]')) return;
        const alt = (img.getAttribute("alt") ?? "").trim();
        if (!alt) return;
        const rect = img.getBoundingClientRect();
        if (rect.width < 32 || rect.height < 32) return;
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const div = document.createElement("div");
        div.className = "a11y-alt-overlay";
        div.setAttribute("aria-hidden", "true");
        div.textContent = alt;
        div.style.top = `${Math.max(4, Math.min(window.innerHeight - 36, rect.bottom - 30))}px`;
        div.style.left = `${Math.max(4, rect.left)}px`;
        div.style.maxWidth = `${Math.min(rect.width, window.innerWidth - 8)}px`;
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
    if (next.has(key)) {
      next.delete(key);
    } else {
      /* High contrast and Dark contrast are mutually exclusive */
      if (key === "high-contrast") next.delete("dark-contrast");
      if (key === "dark-contrast") next.delete("high-contrast");
      next.add(key);
    }
    update(next);
  };

  const reset = () => update(new Set());
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const features: Array<{ key: Setting; label: string; Icon: React.ComponentType }> = [
    { key: "big-text",           label: t("bigText"),           Icon: IcoBigText      },
    { key: "page-zoom",          label: t("pageZoom"),          Icon: IcoZoom         },
    { key: "high-contrast",      label: t("highContrast"),      Icon: IcoContrast     },
    { key: "dark-contrast",      label: t("darkContrast"),      Icon: IcoDarkContrast },
    { key: "monochrome",         label: t("monochrome"),        Icon: IcoMonochrome   },
    { key: "readable-font",      label: t("readableFont"),      Icon: IcoFont         },
    { key: "highlight-links",    label: t("highlightLinks"),    Icon: IcoLinks        },
    { key: "highlight-headings", label: t("highlightHeadings"), Icon: IcoHeadings     },
    { key: "focus-highlight",    label: t("focusHighlight"),    Icon: IcoFocus        },
    { key: "bigger-cursor",      label: t("biggerCursor"),      Icon: IcoCursor       },
    { key: "pause-animations",   label: t("pauseAnimations"),   Icon: IcoPause        },
    { key: "show-alt",           label: t("showAlt"),           Icon: IcoAlt          },
  ];

  const activeCount = active.size;

  return (
    <div id="a11y-widget-root">
      {/* ── Trigger Button ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-haspopup="dialog"
        title={t("title")}
        className="fixed bottom-4 ltr:left-4 rtl:right-4 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink text-paper shadow-xl ring-2 ring-paper/90 hover:scale-105 transition-transform flex items-center justify-center focus-visible:outline-[3px] focus-visible:outline-ink focus-visible:outline-offset-4"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.25" fill="currentColor" />
          <path
            d="M5 9h14M12 9v5.5M9 22l3-7.5 3 7.5M9 15h6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {activeCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-[#0055cc] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-paper"
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Panel ── */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[59] bg-ink/10"
            aria-hidden="true"
            onClick={close}
          />
          <div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed bottom-[4.75rem] ltr:left-4 rtl:right-4 z-[60] w-[calc(100vw-2rem)] max-w-[360px] bg-paper text-ink border border-ink/20 shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-paper-line flex items-center justify-between bg-paper-warm">
              <div className="flex items-center gap-2">
                <h2 id={titleId} className="text-sm font-semibold tracking-wide">
                  {t("title")}
                </h2>
                {activeCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-medium bg-ink text-paper rounded-full">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={t("close")}
                className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-ink/5 transition-colors focus-visible:outline-2 focus-visible:outline-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 3×4 feature grid */}
            <div className="p-3 grid grid-cols-3 gap-2 max-h-[65vh] overflow-y-auto">
              {features.map(({ key, label, Icon }) => {
                const isOn = active.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    aria-pressed={isOn}
                    className={`min-h-[76px] border flex flex-col items-center justify-center gap-2 px-1.5 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                      isOn
                        ? "bg-ink text-paper border-ink font-semibold focus-visible:outline-paper"
                        : "bg-paper border-paper-line hover:border-ink/60 text-ink focus-visible:outline-ink"
                    }`}
                  >
                    <Icon />
                    <span className="text-[11px] leading-tight text-center">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer: Reset + Accessibility Statement Link */}
            <div className="px-3 pb-3 pt-1 flex flex-col gap-2 border-t border-paper-line/60 bg-paper-warm/40">
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={reset}
                  disabled={activeCount === 0}
                  className="h-10 border border-paper-line text-xs font-medium text-ink-soft hover:border-ink hover:text-ink disabled:opacity-40 disabled:pointer-events-none transition-colors focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-[-2px]"
                >
                  {t("reset")}
                </button>
                <Link
                  href="/accessibility"
                  onClick={() => setOpen(false)}
                  className="h-10 border border-paper-line text-xs font-medium text-ink-soft hover:border-ink hover:text-ink flex items-center justify-center text-center transition-colors focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-[-2px]"
                >
                  {t("statement")}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
