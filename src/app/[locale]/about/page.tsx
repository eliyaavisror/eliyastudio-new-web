import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ClientsCarousel from "@/components/ClientsCarousel";
import PrinciplesInteractive from "@/components/PrinciplesInteractive";
import { clientLogos } from "@/data/clients";
import { getHeroImage } from "@/lib/heroImage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function AboutPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage =
    getHeroImage("about") ??
    "/images/projects/visualizations/exterior/01-VIEW.jpg";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("about");
  const locale = useLocale() as "he" | "en";
  const isHe = locale === "he";

  const credentials = isHe
    ? [
        {
          label: "השכלה אקדמית",
          value: "בוגר בצלאל (B.Arch)",
          sub: "המחלקה לארכיטקטורה, האקדמיה לאמנות ועיצוב בצלאל ירושלים",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 5L3 12L16 19L29 12L16 5Z" />
              <path d="M7 14.5V22.5C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 22.5V14.5" />
            </svg>
          ),
        },
        {
          label: "הסמכה מקצועית",
          value: "אדריכל רשוי",
          sub: "רישוי מלא לתכנון, הגשה להיתרים ופיקוח עליון בפרויקטים מורכבים",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="16" cy="13" r="7" />
              <path d="M11.5 18.5L9 28L16 24.5L23 28L20.5 18.5" />
            </svg>
          ),
        },
        {
          label: "ניסיון רב תחומי",
          value: "תכנון והדמיות קצה לקצה",
          sub: "הובלת פרויקטי מגורים, מבני ציבור, מתחמי תיירות ובינוי עירוני",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 28H28" />
              <path d="M7 28V14L16 6L25 14V28" />
              <path d="M13 28V19H19V28" />
            </svg>
          ),
        },
      ]
    : [
        {
          label: "Academic Degree",
          value: "Bezalel Graduate (B.Arch)",
          sub: "Department of Architecture, Bezalel Academy of Arts and Design, Jerusalem",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 5L3 12L16 19L29 12L16 5Z" />
              <path d="M7 14.5V22.5C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 22.5V14.5" />
            </svg>
          ),
        },
        {
          label: "Professional License",
          value: "Licensed Architect",
          sub: "Full certification for architectural planning, permits, and supreme supervision",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="16" cy="13" r="7" />
              <path d="M11.5 18.5L9 28L16 24.5L23 28L20.5 18.5" />
            </svg>
          ),
        },
        {
          label: "Multidisciplinary Experience",
          value: "Architecture & 3D Studio",
          sub: "Leading residential projects, public buildings, hospitality complexes, and masterplans",
          icon: (
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 28H28" />
              <path d="M7 28V14L16 6L25 14V28" />
              <path d="M13 28V19H19V28" />
            </svg>
          ),
        },
      ];

  const archPrinciples = isHe
    ? [
        {
          title: "האדם במרכז התכנון",
          tag: "פרוגרמה וחוויה",
          desc: "התכנון מתחיל באדם, בצרכים, בתחושות ובאורח החיים, מתוך מטרה ליצור מרחבים שמרגישים נכונים ומתפקדים היטב לאורך שנים.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="11" r="5" />
              <path d="M8 30C8 24.5 12.5 20 18 20C23.5 20 28 24.5 28 30" />
            </svg>
          ),
        },
        {
          title: "דיאלוג עם המקום והטבע",
          tag: "אור, אוויר וחומר",
          desc: "הטבע הוא שותף מלא ליצירה דרך ניצול חכם של אור טבעי, זרימת אוויר, טופוגרפיה וחומריות טבעית המשתלבת בהרמוניה בסביבה.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M4 28L13 18L20 25L26 19L32 28H4Z" />
            </svg>
          ),
        },
        {
          title: "מתודולוגיית BIM מתקדמת",
          tag: "דיוק וסנכרון מערכות",
          desc: "עבודה במודל תלת ממדי חכם ומבוסס מידע המאפשר רמת דיוק מרבית, תיאום מלא מול יועצי הפרויקט ושמירה על מסגרת התקציב.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="18 4 31 11.5 31 24.5 18 32 5 24.5 5 11.5 18 4" />
              <polyline points="5 11.5 18 19 31 11.5" />
              <line x1="18" y1="19" x2="18" y2="32" />
            </svg>
          ),
        },
        {
          title: "אינטגרציה של כלי AI",
          tag: "חדשנות תכנונית",
          desc: "רתימת כלי בינה מלאכותית פורצי דרך לחידוד רעיונות, בחינת חלופות תכנוניות בזמן אמת ופיצוח חכם של מורכבויות הפרויקט.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 4V10M18 26V32M4 18H10M26 18H32" />
              <circle cx="18" cy="18" r="6" />
              <path d="M8.5 8.5L13 13M23 23L27.5 27.5M27.5 8.5L23 13M13 23L8.5 27.5" />
            </svg>
          ),
        },
        {
          title: "סימולציה וראייה מרחבית",
          tag: "מהסקיצה לתלת ממד",
          desc: "שילוב סימולציות ויזואליות לאורך כל שלבי התכנון, המעניקות ללקוח וליזם ודאות מלאה לגבי נראות ותחושת המרחב עוד לפני הבנייה.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="7" width="26" height="22" rx="2" />
              <path d="M5 14H31" />
              <path d="M14 14V29" />
            </svg>
          ),
        },
        {
          title: "ליווי אישי עד לפרט האחרון",
          tag: "ייזום, רישוי וביצוע",
          desc: "ניהול מוקפד של כלל שלבי הפרויקט, משלב הפרוגרמה והרישוי ועד להפקת תוכניות עבודה מפורטות ופיקוח עליון צמוד בשטח.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 29L29 7" />
              <path d="M18 7H29V18" />
              <path d="M7 15V29H21" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: "Human Centered Design",
          tag: "Program & Experience",
          desc: "Design begins with the person, their needs, feelings, and lifestyle to create spaces that feel right and endure over time.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="11" r="5" />
              <path d="M8 30C8 24.5 12.5 20 18 20C23.5 20 28 24.5 28 30" />
            </svg>
          ),
        },
        {
          title: "Dialogue with Site & Nature",
          tag: "Light, Air & Material",
          desc: "Nature is a full partner in our work through smart use of natural light, airflow, topography, and honest materials.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M4 28L13 18L20 25L26 19L32 28H4Z" />
            </svg>
          ),
        },
        {
          title: "Advanced BIM Methodology",
          tag: "Precision & Coordination",
          desc: "Data-driven 3D BIM modeling enabling maximum precision, full consultant synchronization, and budget control.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="18 4 31 11.5 31 24.5 18 32 5 24.5 5 11.5 18 4" />
              <polyline points="5 11.5 18 19 31 11.5" />
              <line x1="18" y1="19" x2="18" y2="32" />
            </svg>
          ),
        },
        {
          title: "AI Tool Integration",
          tag: "Design Innovation",
          desc: "Harnessing cutting-edge artificial intelligence to sharpen concepts, test design alternatives, and solve complex spatial challenges.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 4V10M18 26V32M4 18H10M26 18H32" />
              <circle cx="18" cy="18" r="6" />
              <path d="M8.5 8.5L13 13M23 23L27.5 27.5M27.5 8.5L23 13M13 23L8.5 27.5" />
            </svg>
          ),
        },
        {
          title: "Spatial Simulation",
          tag: "From Sketch to 3D",
          desc: "Continuous visual simulations throughout the planning stages, giving clients complete confidence in the space before construction.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="7" width="26" height="22" rx="2" />
              <path d="M5 14H31" />
              <path d="M14 14V29" />
            </svg>
          ),
        },
        {
          title: "End-to-End Guidance",
          tag: "Permits to Execution",
          desc: "Close guidance from initial programming and licensing through detailed working drawings and site supervision.",
          icon: (
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 29L29 7" />
              <path d="M18 7H29V18" />
              <path d="M7 15V29H21" />
            </svg>
          ),
        },
      ];

  const vizFeatures = isHe
    ? [
        {
          title: "נאמנות אדריכלית מלאה",
          desc: "הדמיות המבוססות על קריאה מקצועית של תוכניות אדריכליות ומשקפות כל פרט, חומר ומידה בדיוק מרבי.",
        },
        {
          title: "אור ואווירה פוטוריאליסטיים",
          desc: "סימולציה מדויקת של תאורה טבעית, חומריות וטקסטורות המעוררת השראה ומפיחה חיים בחזון התכנוני.",
        },
        {
          title: "כלי החלטה ושיווק ליזמים ואדריכלים",
          desc: "המחשה מוחשית של הפרויקט עוד לפני הנחת הלבנה הראשונה, לטובת שיווק נדל״ן, ועדות תכנון וקבלת החלטות.",
        },
      ]
    : [
        {
          title: "Full Architectural Fidelity",
          desc: "Visualizations grounded in professional architectural reading of plans, reflecting every detail and material accurately.",
        },
        {
          title: "Photorealistic Light & Atmosphere",
          desc: "Precise simulation of natural lighting, materiality, and textures that breathes life into the design vision.",
        },
        {
          title: "Decision & Marketing Tool",
          desc: "Tangible experience of the project before construction begins, built for developers, architects, and planning committees.",
        },
      ];

  return (
    <>
      {/* ══ HERO WITH BACKGROUND IMAGE ══ */}
      <section className="relative min-h-[38vh] md:min-h-[40vh] flex flex-col justify-end pt-24 md:pt-28 pb-7 md:pb-9 border-b border-ink/12">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/85 via-paper/70 to-paper/55" />
        </div>

        <div className="container-x relative">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-snug sm:whitespace-nowrap">
              {t("hero.title")}
            </h1>
            <p className="mt-2 text-base md:text-lg text-ink/90 leading-relaxed max-w-2xl">
              {t("hero.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1: ABOUT ELIYA EIDELMAN — Background, Degree, Experience & Portrait ══ */}
      <section id="about-more" className="py-14 md:py-20 bg-paper text-ink border-b border-ink/12">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Story & Credentials */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                {t("story.title")}
              </h2>
              <p className="mt-3 text-base md:text-lg font-light text-ink-soft leading-relaxed text-pretty max-w-2xl">
                {isHe
                  ? "משרד אידלמן אדריכלים הוקם ומובל על ידי אליה אידלמן, אדריכל רשוי ובוגר האקדמיה לאמנות ועיצוב בצלאל (B.Arch). המשרד משלב ניסיון עשיר בתכנון אדריכלי של בתים פרטיים, מבני ציבור, מתחמי תיירות ובינוי, יחד עם מומחיות עמוקה בהדמיות תלת ממד וטכנולוגיות תכנון מתקדמות."
                  : "Eidelman Architects was founded and is led by Eliya Eidelman, a licensed architect and graduate of the Bezalel Academy of Arts and Design (B.Arch). The practice combines extensive architectural experience with deep expertise in 3D visualization and advanced design technologies."}
              </p>

              {/* 3 Open Box-Free Credential Items */}
              <div className="mt-10 pt-8 border-t border-ink/12 grid sm:grid-cols-3 gap-6 md:gap-8">
                {credentials.map((cred) => (
                  <div
                    key={cred.label}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-ink/70 shrink-0">{cred.icon}</span>
                      <span className="text-xs font-light text-ink-muted">
                        {cred.label}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink">
                      {cred.value}
                    </h3>
                    <p className="text-xs sm:text-sm font-light text-ink-soft leading-relaxed">
                      {cred.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portrait Image */}
            <div className="lg:col-span-5">
              <figure className="relative">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-paper-warm border border-ink/12">
                  <Image
                    src="/images/about/eliya-eidelman.jpg"
                    alt={isHe ? "אדריכל אליה אידלמן" : "Architect Eliya Eidelman"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs font-light text-ink-muted">
                  {isHe ? "אדריכל אליה אידלמן" : "Architect Eliya Eidelman"}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: ARCHITECTURAL DESIGN PRINCIPLES — Graphic Icon Grid (BIM, AI, Human & Nature) ══ */}
      <section className="py-14 md:py-20 bg-paper-warm text-ink border-b border-ink/12">
        <div className="container-x">
          <div className="max-w-3xl mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              {isHe ? "עקרונות התכנון האדריכלי" : "Architectural Design Principles"}
            </h2>
            <p className="mt-2.5 text-base md:text-lg font-light text-ink-soft leading-relaxed text-pretty">
              {isHe
                ? "שילוב בין רגישות אנושית וסביבתית לבין מתודולוגיית BIM וכלי הבינה המלאכותית המתקדמים ביותר."
                : "Combining human and environmental sensitivity with advanced BIM and AI design methodologies."}
            </p>
          </div>

          {/* Interactive Graphic Principles — Icons + Title, expands to text on click */}
          <PrinciplesInteractive items={archPrinciples} />
        </div>
      </section>

      {/* ══ SECTION 3: THE VISUALIZATION STUDIO + INTEGRATED CLIENTS STRIP ══ */}
      <section className="py-14 md:py-20 bg-paper text-ink border-b border-ink/12">
        <div className="container-x">
          {/* Single Unified Frame so Clients are visually part of the Visualization Studio */}
          <div className="border border-ink/15 bg-paper-warm/40 p-7 sm:p-10 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                {t("viz.title")}
              </h2>
              <p className="mt-2.5 text-base md:text-lg font-light text-ink-soft leading-relaxed text-pretty">
                {t("viz.body1")}
              </p>
            </div>

            {/* 3 Concise Visualization Highlights */}
            <div className="mt-8 pt-8 border-t border-ink/12 grid md:grid-cols-3 gap-6 md:gap-8">
              {vizFeatures.map((feat) => (
                <div key={feat.title} className="flex flex-col">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-sm md:text-base font-light text-ink-soft leading-relaxed text-pretty">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Clients Carousel Embedded Inside the Visualization Studio Box */}
            <div className="mt-10 pt-8 border-t border-ink/12 bg-paper p-6 sm:p-8 border border-ink/10">
              <ClientsCarousel logos={clientLogos} title={t("clientsTitle")} embedded />
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPACT PROPORTIONAL CONTACT STRIP ══ */}
      <section className="py-10 md:py-12 bg-paper-warm text-ink">
        <div className="container-x flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
              {t("cta.title")}
            </h2>
            <p className="mt-1 text-sm md:text-base font-light text-ink-soft">
              {t("cta.body")}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-paper text-xs font-medium uppercase tracking-wider hover:bg-ink-soft transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{t("cta.button")}</span>
            <span aria-hidden="true">{isHe ? "←" : "→"}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
