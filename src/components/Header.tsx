"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Focus management + ESC key for mobile menu */
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusables = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusables[0]?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      setMobileOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const isHe = locale === "he";

  const navItems = [
    {
      href: "/architecture",
      label: t("architecture"),
      sub: isHe ? "בתים פרטיים, מבני ציבור ומתחמים" : "Private homes, public buildings & complexes",
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 27H28" />
          <path d="M7 27V14L16 6L25 14V27" />
          <path d="M13 27V18H19V27" />
        </svg>
      ),
    },
    {
      href: "/visualizations",
      label: t("visualizations"),
      sub: isHe ? "הדמיות חוץ, פנים ותצלומי אוויר" : "Exterior, interior & aerial 3D renders",
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="16 4 27 10.5 27 23.5 16 30 5 23.5 5 10.5 16 4" />
          <polyline points="5 10.5 16 17 27 10.5" />
          <line x1="16" y1="17" x2="16" y2="30" />
        </svg>
      ),
    },
    {
      href: "/about",
      label: t("about"),
      sub: isHe ? "הסיפור שלנו וגישת התכנון בסטודיו" : "Our story and architectural approach",
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="16" cy="16" r="11" className="opacity-60" />
          <rect x="8" y="8" width="16" height="16" className="opacity-45" />
          <circle cx="16" cy="11.5" r="1.8" />
          <line x1="8" y1="14.5" x2="24" y2="14.5" />
          <path d="M14.5 14.5V24M17.5 14.5V24" />
        </svg>
      ),
    },
    {
      href: "/contact",
      label: t("contact"),
      sub: isHe ? "תיאום פגישת היכרות וייעוץ" : "Schedule an introductory consultation",
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="7" width="24" height="18" rx="1" />
          <polyline points="4 8 16 17 28 8" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHome = pathname === "/";
  // Architecture project detail pages (/architecture/<slug>) open with a dark hero
  const isArchProject = /^\/architecture\/[^/]+$/.test(pathname);
  const darkHero = isHome || isArchProject;
  const useLight = darkHero && !scrolled && !mobileOpen;

  const headerBg = mobileOpen
    ? "bg-paper"
    : scrolled
    ? "bg-paper/95 backdrop-blur-md border-b border-paper-line"
    : "bg-transparent";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-smooth ${headerBg}`}>
        <div className="container-x">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" aria-label={"אידלמן אדריכלים — " + t("home")} className="block">
              <Logo variant={useLight ? "light" : "dark"} />
            </Link>

            {/* Desktop nav — Variation B: uppercase, tracked-out */}
            <nav aria-label={locale === "he" ? "ניווט ראשי" : "Primary navigation"} className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ticker link-underline transition-opacity ${
                    useLight ? "text-paper" : "text-ink"
                  } ${isActive(item.href) ? "opacity-100" : "opacity-90 hover:opacity-100"}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher colorClass={useLight ? "text-paper" : "text-ink"} />

              <button
                ref={triggerRef}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? t("close") : t("openMenu")}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="lg:hidden min-h-[48px] min-w-[48px] inline-flex items-center justify-center"
              >
                <span className="relative flex flex-col gap-[5px] w-6">
                  <span className={`block h-[1.5px] transition-all duration-300 ${useLight ? "bg-paper" : "bg-ink"} ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
                  <span className={`block h-[1.5px] transition-all duration-300 ${useLight ? "bg-paper" : "bg-ink"} ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                  <span className={`block h-[1.5px] transition-all duration-300 ${useLight ? "bg-paper" : "bg-ink"} ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — Clean, minimal iconic links without lines or contact box */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-paper/98 backdrop-blur-md" />
        <nav
          aria-label={t("menu")}
          className="relative container-x pt-28 pb-12 h-full flex flex-col justify-center overflow-y-auto"
        >
          <ul className="flex flex-col gap-7">
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group inline-flex items-center gap-4 transition-all duration-500 ${
                      mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${active ? "text-ink" : "text-ink/60 hover:text-ink"}`}
                    style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
