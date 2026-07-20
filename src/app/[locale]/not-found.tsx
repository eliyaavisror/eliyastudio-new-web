import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <section className="min-h-[100svh] flex items-center justify-center pt-32 pb-20">
      <div className="container-x text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="text-display-2xl font-display font-light">404</h1>
        <p className="mt-8 text-lg text-ink-muted">—</p>
        <Link href="/" className="btn-primary mt-12 inline-flex">
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
