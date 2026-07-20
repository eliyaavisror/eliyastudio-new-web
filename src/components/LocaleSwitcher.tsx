"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher({ colorClass = "text-ink" }: { colorClass?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("nav");

  const switchTo = locale === "he" ? "en" : "he";
  const label = switchTo === "en" ? "EN" : "עב";

  const handleClick = () => {
    startTransition(() => {
      router.replace(pathname, { locale: switchTo });
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={`${t("language")}: ${switchTo === "en" ? "English" : "עברית"}`}
      className={`text-xs uppercase tracking-[0.2em] font-bold hover:opacity-60 transition-opacity disabled:opacity-40 min-h-[44px] min-w-[44px] inline-flex items-center justify-center ${colorClass}`}
    >
      {label}
    </button>
  );
}
