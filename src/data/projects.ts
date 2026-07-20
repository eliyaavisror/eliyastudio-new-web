export type ProjectCategory = "exterior" | "interior" | "aerial" | "architecture";
export type ProjectStatus = "planning" | "licensing" | "construction" | "completed";

export interface ImageGroup {
  id: string;
  he: string;
  en: string;
  images: string[];
}

export interface ContentSection {
  id: string;
  title?: { he: string; en: string };
  he: string;
  en: string;
  image?: string;
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  type: "architecture" | "visualization";
  featured?: boolean;
  year: number;
  title: { he: string; en: string };
  location: { he: string; en: string };
  client?: { he: string; en: string };
  status?: ProjectStatus;
  description?: { he: string; en: string };
  cover: string;
  coverAspect?: number;
  titleBackground?: string;
  heroVideo?: string;
  credit?: { he: string; en: string };
  images: string[];
  imageGroups?: ImageGroup[];
  sections?: ContentSection[];
}

import fs from "fs";
import path from "path";
import { getImageSize } from "@/lib/imageSize";

const EXT = "/images/projects/visualizations/exterior";
const INT = "/images/projects/visualizations/interior";
const ARCH = "/images/projects/architecture";
const ARCH_DIR = path.join(process.cwd(), "public/images/projects/architecture");

function encodePath(relativePath: string): string {
  return relativePath.split("/").map((p) => encodeURIComponent(p)).join("/");
}

type ImageGroupJSON = { id: string; he: string; en: string; images: string[] };
type ContentSectionJSON = {
  id: string;
  title?: { he: string; en: string };
  he: string;
  en: string;
  image?: string;
};

type ProjectJSON = {
  slug: string;
  year: number;
  status: string;
  title: { he: string; en: string };
  location: { he: string; en: string };
  client?: { he: string; en: string };
  description?: { he: string; en: string };
  credit?: { he: string; en: string };
  cover?: string;
  titleBackground?: string;
  heroVideo?: string;
  images?: string[];
  imageGroups?: ImageGroupJSON[];
  sections?: ContentSectionJSON[];
};

function loadArchProjects(): Project[] {
  const entries = fs.readdirSync(ARCH_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .flatMap((e) => {
      const jsonPath = path.join(ARCH_DIR, e.name, "project.json");
      if (!fs.existsSync(jsonPath)) return [];
      const data: ProjectJSON = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      const base = `${ARCH}/${e.name}`;

      const imageGroups: ImageGroup[] | undefined = data.imageGroups?.map((g) => ({
        id: g.id,
        he: g.he,
        en: g.en,
        images: g.images.map((f) => `${base}/${encodePath(f)}`),
      }));

      const sections: ContentSection[] | undefined = data.sections?.map((s) => ({
        id: s.id,
        title: s.title,
        he: s.he,
        en: s.en,
        image: s.image ? `${base}/${encodePath(s.image)}` : undefined,
      }));

      const images = imageGroups
        ? imageGroups.flatMap((g) => g.images)
        : sections
        ? sections.flatMap((s) => (s.image ? [s.image] : []))
        : (data.images ?? []).map((f) => `${base}/${encodePath(f)}`);

      // Read description.txt only when no sections defined (avoid overriding meta with long text)
      const descTxtPath = path.join(ARCH_DIR, e.name, "description.txt");
      const shouldUseTxt = !data.sections && fs.existsSync(descTxtPath);
      const descHe = shouldUseTxt
        ? fs.readFileSync(descTxtPath, "utf-8").trim()
        : data.description?.he;
      const description = descHe
        ? { he: descHe, en: data.description?.en ?? descHe }
        : data.description;

      const fallback = `${ARCH}/placeholder-house-1.svg`;
      const cover = (data.cover ? `${base}/${encodePath(data.cover)}` : null)
        ?? images[0]
        ?? fallback;
      const titleBackground = data.titleBackground
        ? `${base}/${encodePath(data.titleBackground)}`
        : undefined;

      // Real aspect ratio of the cover so it renders uncropped
      let coverAspect: number | undefined;
      if (data.cover) {
        const dim = getImageSize(path.join(ARCH_DIR, e.name, data.cover));
        if (dim && dim.height > 0) coverAspect = dim.width / dim.height;
      }

      const project: Project = {
        slug: data.slug,
        category: "architecture",
        type: "architecture",
        year: data.year,
        status: data.status as ProjectStatus,
        title: data.title,
        location: data.location,
        client: data.client,
        description,
        credit: data.credit,
        cover,
        coverAspect,
        titleBackground,
        heroVideo: data.heroVideo ? `${base}/${encodePath(data.heroVideo)}` : undefined,
        images: images.length ? images : [fallback],
        imageGroups,
        sections,
      };
      return [project];
    });
}

export function getArchProjects(): Project[] {
  return loadArchProjects();
}

// ── Visualization projects (dynamic) ──────────────────────────────────────────

const VIZ_DIR = path.join(process.cwd(), "public/images/projects/visualizations");
const VIZ_EXCLUDED = new Set(["exterior", "interior", "aerial"]);

type VisProjJSON = {
  slug: string;
  year: number;
  category: string;
  featured?: boolean;
  title: { he: string; en: string };
  location: { he: string; en: string };
  description?: { he: string; en: string };
  images: string[];
};

function loadVisProjects(): Project[] {
  const entries = fs.readdirSync(VIZ_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !VIZ_EXCLUDED.has(e.name))
    .flatMap((e) => {
      const jsonPath = path.join(VIZ_DIR, e.name, "project.json");
      if (!fs.existsSync(jsonPath)) return [];
      const data: VisProjJSON = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      const base = `/images/projects/visualizations/${e.name}`;
      const images = data.images.map((f) =>
        f.startsWith("/") ? f : `${base}/${f}`
      );
      return [{
        slug: data.slug,
        category: data.category as ProjectCategory,
        type: "visualization" as const,
        featured: data.featured ?? false,
        year: data.year,
        title: data.title,
        location: data.location,
        description: data.description,
        cover: images[0] ?? "",
        images,
      } as Project];
    });
}

export function getVisProjects(): Project[] {
  return loadVisProjects();
}

// keep `projects` as alias for backward compat with any existing imports
export const projects: Project[] = [
  {
    slug: "villa-moderna",
    category: "exterior",
    type: "visualization",
    featured: true,
    year: 2025,
    title: { he: "וילה מודרנית", en: "Modern Villa" },
    location: { he: "מרכז הארץ", en: "Central Israel" },
    description: {
      he: "הדמיית חוץ לוילה פרטית בסגנון מודרני מינימליסטי — חזית, גינון ובריכה.",
      en: "Exterior visualization for a private minimalist-modern villa — facade, landscaping and pool.",
    },
    cover: `${EXT}/וילה מודרנית.webp`,
    images: [`${EXT}/וילה מודרנית.webp`, `${EXT}/02.webp`, `${EXT}/1122.webp`],
  },
  {
    slug: "penthouse-view",
    category: "exterior",
    type: "visualization",
    featured: true,
    year: 2025,
    title: { he: "פנטהאוס — מבט חוץ", en: "Penthouse Exterior" },
    location: { he: "גוש דן", en: "Greater Tel Aviv" },
    description: {
      he: "הדמיות חוץ לפרויקט פנטהאוס יוקרתי — מבט מרחפן ותצפיות ייחודיות.",
      en: "Exterior visualization for a luxury penthouse project — aerial view and panoramic vantage points.",
    },
    cover: `${EXT}/מבט פנטהאוס copy.webp`,
    images: [`${EXT}/מבט פנטהאוס copy.webp`, `${EXT}/03-2.webp`, `${EXT}/04-2.webp`],
  },
  {
    slug: "rural-hotel",
    category: "exterior",
    type: "visualization",
    featured: true,
    year: 2024,
    title: { he: "מלון כפרי", en: "Rural Hotel" },
    location: { he: "הצפון", en: "Northern Israel" },
    description: {
      he: "הדמיית חוץ למלון בוטיק כפרי — אדריכלות מקומית משולבת בנוף.",
      en: "Exterior visualization for a rural boutique hotel — local architecture blended into the landscape.",
    },
    cover: `${EXT}/מלון כפרי.webp`,
    images: [`${EXT}/מלון כפרי.webp`],
  },
  {
    slug: "shavot-commercial",
    category: "exterior",
    type: "visualization",
    year: 2024,
    title: { he: "מרכז מסחרי — שבות", en: "Shavot Commercial Center" },
    location: { he: "גוש עציון", en: "Gush Etzion" },
    description: {
      he: "הדמיות חוץ למרכז מסחרי — חזיתות, כניסות ואווירת יום.",
      en: "Exterior visualization for a commercial center — facades, entrances and daytime atmosphere.",
    },
    cover: `${EXT}/מסחרי שבות1.webp`,
    images: [`${EXT}/מסחרי שבות1.webp`, `${EXT}/מסחרי שבות2.webp`, `${EXT}/מסחרי שבות3.webp`],
  },
  {
    slug: "shazap",
    category: "exterior",
    type: "visualization",
    year: 2025,
    title: { he: "מגרש שזף", en: "Shazap Project" },
    location: { he: "ישראל", en: "Israel" },
    description: {
      he: "הדמיית חוץ לפרויקט מגורים — חזית נקייה ומינימליסטית.",
      en: "Exterior visualization for a residential project — clean and minimalist facade.",
    },
    cover: `${EXT}/Shazap view 01 copy.webp`,
    images: [`${EXT}/Shazap view 01 copy.webp`],
  },
  {
    slug: "hospital",
    category: "exterior",
    type: "visualization",
    year: 2025,
    title: { he: "מבנה ציבורי", en: "Public Building" },
    location: { he: "ישראל", en: "Israel" },
    description: {
      he: "הדמיית חוץ למבנה ציבורי — כניסה ראשית, חללים ירוקים ועצים בוגרים.",
      en: "Exterior visualization for a public building — main entrance, green spaces and mature trees.",
    },
    cover: `${EXT}/Hospital_Export_05-people1.webp`,
    images: [`${EXT}/Hospital_Export_05-people1.webp`, `${EXT}/בניין .webp`],
  },
  {
    slug: "afeka-college",
    category: "interior",
    type: "visualization",
    featured: true,
    year: 2025,
    title: { he: "מכללת אפקה", en: "Afeka College" },
    location: { he: "תל אביב", en: "Tel Aviv" },
    description: {
      he: "הדמיות פנים לחללים ציבוריים במכללת אפקה — לובי ראשי, ספריה וקפיטריה.",
      en: "Interior visualization for public spaces at Afeka College — main lobby, library and cafeteria.",
    },
    cover: `${INT}/מכללת אפקה - לובי.webp`,
    images: [
      `${INT}/מכללת אפקה - לובי.webp`,
      `${INT}/מכללת אפקה - ספריה.webp`,
      `${INT}/מכללת אפקה - קפיטריה.webp`,
    ],
  },
  {
    slug: "apartment-405",
    category: "interior",
    type: "visualization",
    year: 2025,
    title: { he: "דירת יוקרה — פרויקט 405", en: "Luxury Apartment — Project 405" },
    location: { he: "מרכז הארץ", en: "Central Israel" },
    description: {
      he: "הדמיות פנים לדירת יוקרה — סלון, מטבח, חדרי שינה ושירותים.",
      en: "Interior visualization for a luxury apartment — living room, kitchen, bedrooms and bathrooms.",
    },
    cover: `${INT}/405-1-.webp`,
    images: [
      `${INT}/405-1-.webp`,
      `${INT}/405-2 copy.webp`,
      `${INT}/405-5B-gigapixel-redefine-2x copy.webp`,
      `${INT}/406-4.webp`,
    ],
  },
  {
    slug: "aclub",
    category: "interior",
    type: "visualization",
    year: 2024,
    title: { he: "A-Club", en: "A-Club" },
    location: { he: "ישראל", en: "Israel" },
    description: {
      he: "הדמיות פנים למועדון יוקרתי — חלל כניסה ואזורי ישיבה.",
      en: "Interior visualization for a luxury club — entrance hall and seating areas.",
    },
    cover: `${INT}/a-club 1.webp`,
    images: [`${INT}/a-club 1.webp`, `${INT}/a-club 2.webp`],
  },
  {
    slug: "kitchen-designs",
    category: "interior",
    type: "visualization",
    year: 2025,
    title: { he: "עיצוב מטבחים ופנים", en: "Kitchen & Interior Design" },
    location: { he: "גוש דן", en: "Greater Tel Aviv" },
    description: {
      he: "הדמיות פנים לסלונים ומטבחים בסגנון עכשווי — חומרים איכותיים ותאורה מתוכננת.",
      en: "Interior visualization for living rooms and kitchens in a contemporary style — quality materials and planned lighting.",
    },
    cover: `${INT}/Kitchen.webp`,
    images: [
      `${INT}/Kitchen.webp`,
      `${INT}/סלון copy.webp`,
      `${INT}/סלון מטבח-gigapixel-redefine-1x copy.webp`,
      `${INT}/מטבח 4.webp`,
    ],
  },
  {
    slug: "offices",
    category: "interior",
    type: "visualization",
    year: 2024,
    title: { he: "חללי עבודה ומשרדים", en: "Workspaces & Offices" },
    location: { he: "ישראל", en: "Israel" },
    description: {
      he: "הדמיות פנים לחללי עבודה ומשרדים — מטבח משרדי, חדרי ישיבות ואזורי עבודה פתוחים.",
      en: "Interior visualization for workspaces and offices — office kitchen, meeting rooms and open work areas.",
    },
    cover: `${INT}/משרדים.webp`,
    images: [`${INT}/משרדים.webp`, `${INT}/מטבח משרדי.webp`],
  },
  {
    slug: "residential-abc",
    category: "exterior",
    type: "visualization",
    year: 2024,
    title: { he: "פרויקט מגורים A-B-C", en: "Residential Project A-B-C" },
    location: { he: "ישראל", en: "Israel" },
    description: {
      he: "הדמיות חוץ לפרויקט מגורים — שלוש חזיתות ואווירת ערב.",
      en: "Exterior visualization for a residential project — three facades and evening atmosphere.",
    },
    cover: `${EXT}/A FINAL copy.webp`,
    images: [`${EXT}/A FINAL copy.webp`, `${EXT}/B_copy.webp`, `${EXT}/C NEW copy.webp`],
  },
];

export const getFeaturedProjects = () => getVisProjects().filter((p) => p.featured);
export const getProjectsByType = (type: Project["type"]) => getVisProjects().filter((p) => p.type === type);
export const getProjectsByCategory = (category: ProjectCategory) =>
  getVisProjects().filter((p) => p.category === category);
export const getProjectBySlug = (slug: string) =>
  getArchProjects().find((p) => p.slug === slug) ?? getVisProjects().find((p) => p.slug === slug);
export const getArchProjectBySlug = (slug: string) => getArchProjects().find((p) => p.slug === slug);
