import fs from "fs";
import path from "path";
import {
  VIZ_PROJECTS,
  VIZ_CATEGORIES,
  type VizProject,
  type VizCategoryMeta,
} from "@/data/visualization-projects";

const GALLERY_URL_BASE = "/images/projects/visualizations/gallery";
const GALLERY_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "projects",
  "visualizations",
  "gallery"
);

const PREFERRED_CATEGORY_ORDER = [
  "בתים פרטיים",
  "מגורים והתחדשות עירונית",
  "ציבורי ומסחרי",
  "ישובים ושכונות",
  "מתחמים ונוף",
];

const EN_CATEGORY_NAMES: Record<string, string> = {
  "בתים פרטיים": "Private Homes",
  "מגורים והתחדשות עירונית": "Residential & Urban Renewal",
  "ציבורי ומסחרי": "Public & Commercial",
  "ישובים ושכונות": "Communities & Neighborhoods",
  "מתחמים ונוף": "Complexes & Landscape",
};

const EN_TITLES: Record<string, string> = {
  "מתחם מגורים SOL": "SOL Residential Complex",
  "וילה מודרנית": "Modern Villa",
  "מכללת אפקה": "Afeka College",
  "אקדמיה וחינוך": "Academia & Education",
  "מתחמי התחדשות עירונית": "Urban Renewal Complexes",
  "מרכז מסחרי": "Commercial Center",
  "דירת יוקרה 405": "Luxury Apartment 405",
  "ישובים ושכונות": "Communities & Neighborhoods",
  "פנטהאוס ומרפסת בעיר": "Urban Penthouse & Terrace",
  "מלון כפרי ומתחם אירוח": "Rural Hotel & Hospitality",
  "רחוב התחדשות עירונית": "Urban Renewal Streetscape",
  "עיצוב פנים סלון וחצר": "Living Room & Courtyard Interior",
  "משרדים": "Workspaces & Offices",
  "התחדשות עירונית יפו": "Jaffa Urban Renewal",
  "מטבח וחללי מגורים": "Kitchen & Living Spaces",
  "בית פרטי מודרני": "Modern Private Residence",
  "בית פרטי כפרי": "Rural Private Residence",
  "בית מדברי": "Desert Residence",
};

const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|avif)$/i;

/** Extract leading number from folder/file name, e.g. "01_וילה מודרנית" → 1 */
function extractOrder(name: string): number {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

/** Strip leading number prefix from folder name, e.g. "01_מתחם מגורים SOL" → "מתחם מגורים SOL" */
function cleanName(folderName: string, dict: Record<string, string>): { he: string; en: string } {
  const stripped = folderName.replace(/^\d+[\s._-]*/, "").trim();
  if (stripped.includes("__")) {
    const [he, en] = stripped.split("__").map((s) => s.trim());
    return { he: he || stripped, en: en || he || stripped };
  }
  const he = stripped || folderName;
  const en = dict[he] ?? he;
  return { he, en };
}

export function loadVizGalleryFromDisk(): {
  categories: VizCategoryMeta[];
  projects: VizProject[];
} {
  if (!fs.existsSync(GALLERY_DIR)) {
    return { categories: VIZ_CATEGORIES, projects: VIZ_PROJECTS };
  }

  const catEntries = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .sort((a, b) => {
      const oa = extractOrder(a.name);
      const ob = extractOrder(b.name);
      if (oa !== ob) return oa - ob;
      const cleanA = a.name.replace(/^\d+[\s._-]*/, "").trim();
      const cleanB = b.name.replace(/^\d+[\s._-]*/, "").trim();
      const ia = PREFERRED_CATEGORY_ORDER.indexOf(cleanA);
      const ib = PREFERRED_CATEGORY_ORDER.indexOf(cleanB);
      if (ia !== -1 || ib !== -1) {
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      }
      return cleanA.localeCompare(cleanB, "he");
    });

  const categories: VizCategoryMeta[] = [{ id: "all", he: "הכל", en: "All" }];
  const loaded: Array<VizProject & { order: number }> = [];

  for (const catEntry of catEntries) {
    const catFolder = catEntry.name;
    const catPath = path.join(GALLERY_DIR, catFolder);
    const catMeta = cleanName(catFolder, EN_CATEGORY_NAMES);
    const categoryId = catFolder;

    const projEntries = fs
      .readdirSync(catPath, { withFileTypes: true })
      .filter((e) => e.isDirectory());

    let hasProjects = false;

    for (const entry of projEntries) {
      const projDir = path.join(catPath, entry.name);
      const imageFiles = fs
        .readdirSync(projDir)
        .filter((f) => IMAGE_EXTS.test(f))
        .sort((a, b) => {
          const oa = extractOrder(a);
          const ob = extractOrder(b);
          if (oa !== ob) return oa - ob;
          return a.localeCompare(b, "he");
        });

      if (imageFiles.length === 0) continue;
      hasProjects = true;

      const urls = imageFiles.map(
        (file) =>
          `${GALLERY_URL_BASE}/${encodeURIComponent(catFolder)}/${encodeURIComponent(
            entry.name
          )}/${encodeURIComponent(file)}`
      );

      const order = extractOrder(entry.name);
      const title = cleanName(entry.name, EN_TITLES);

      loaded.push({
        id: `${categoryId}-${entry.name}`,
        category: categoryId,
        title,
        cover: urls[0],
        images: urls,
        order,
      });
    }

    if (hasProjects) {
      categories.push({
        id: categoryId,
        he: catMeta.he,
        en: catMeta.en,
      });
    }
  }

  if (loaded.length === 0) {
    return { categories: VIZ_CATEGORIES, projects: VIZ_PROJECTS };
  }

  loaded.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.he.localeCompare(b.title.he, "he");
  });

  return {
    categories,
    projects: loaded.map(({ order: _order, ...proj }) => proj),
  };
}
