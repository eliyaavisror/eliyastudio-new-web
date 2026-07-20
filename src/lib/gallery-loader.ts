import fs from "fs";
import path from "path";
import { GALLERY_CATEGORIES, type GalleryImage } from "@/data/gallery";

const BASE_URL = "/images/projects/visualizations";
const BASE_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "projects",
  "visualizations"
);
const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|avif)$/i;

/** Extract leading number from filename for sorting, e.g. "03_villa.webp" → 3 */
function sortKey(filename: string): number {
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

export function loadAllGalleryImages(): GalleryImage[] {
  return GALLERY_CATEGORIES.flatMap((cat) => {
    const dir = path.join(BASE_DIR, cat.folder);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTS.test(f))
      .sort((a, b) => sortKey(a) - sortKey(b))
      .map((f) => ({
        src: `${BASE_URL}/${cat.folder}/${encodeURIComponent(f)}`,
        categoryId: cat.id,
        parent: cat.parent,
      }));
  });
}
