"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const COOKIE_NAME = "eliya-cookie-consent";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

export default function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) {
      const id = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(id);
    }
  }, []);

  const accept = () => { setCookie(COOKIE_NAME, "accepted", 365); setShow(false); };
  const decline = () => { setCookie(COOKIE_NAME, "declined", 30); setShow(false); };

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      aria-hidden={!show}
      inert={!show}
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-500 ease-out ${
        show ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="p-4 md:p-5">
        <div className="max-w-5xl mx-auto bg-ink text-paper px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 shadow-2xl">
          <p className="text-sm text-paper/70 leading-relaxed flex-1">
            {t("text")}{" "}
            <Link
              href="/privacy"
              className="text-paper underline underline-offset-2 hover:text-paper/70 transition-colors"
            >
              {t("privacyLink")}
            </Link>
            {t("textAfterLink")}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={accept}
              className="btn-on-dark"
            >
              {t("accept")}
            </button>
            <button
              onClick={decline}
              className="ticker text-paper/50 hover:text-paper/90 px-2 py-2 transition-colors"
              aria-label={t("declineLabel")}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
