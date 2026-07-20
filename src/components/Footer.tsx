import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-paper/70 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="block text-paper/80 hover:text-paper transition-colors link-underline"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-paper/80 hover:text-paper transition-colors link-underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.3em] text-paper/70 font-medium mb-5">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-paper/80 hover:text-paper transition-colors">{t("nav.home")}</Link></li>
              <li><Link href="/architecture" className="text-paper/80 hover:text-paper transition-colors">{t("nav.architecture")}</Link></li>
              <li><Link href="/visualizations" className="text-paper/80 hover:text-paper transition-colors">{t("nav.visualizations")}</Link></li>
              <li><Link href="/about" className="text-paper/80 hover:text-paper transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="text-paper/80 hover:text-paper transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-paper/70 font-medium mb-5">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/accessibility" className="text-paper/80 hover:text-paper transition-colors">{t("footer.accessibility")}</Link></li>
              <li><Link href="/privacy" className="text-paper/80 hover:text-paper transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-paper/70 font-medium mb-5">
              {t("footer.follow")}
            </h3>
            <ul className="space-y-3 text-sm">
              {siteConfig.social.instagram && (
                <li>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram — ${t("common.newTab")}`} className="text-paper/80 hover:text-paper transition-colors">
                    Instagram
                  </a>
                </li>
              )}
              {siteConfig.social.facebook && (
                <li>
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Facebook — ${t("common.newTab")}`} className="text-paper/80 hover:text-paper transition-colors">
                    Facebook
                  </a>
                </li>
              )}
              {siteConfig.social.linkedin && (
                <li>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn — ${t("common.newTab")}`} className="text-paper/80 hover:text-paper transition-colors">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-paper/65">
          <p>© {year} {siteConfig.name}. {t("footer.rights")}.</p>
          <p>{t("footer.designedBy")}</p>
        </div>
      </div>
    </footer>
  );
}
