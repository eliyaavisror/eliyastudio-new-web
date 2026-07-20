import { readdirSync } from "fs";
import { extname, join } from "path";
import { unstable_noStore } from "next/cache";

const EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

/**
 * Reads public/images/hero/{page}/ and returns the path of the first image found.
 * Drop any image into that folder and it will be used automatically.
 * Returns null if the folder is empty or missing.
 */
export function getHeroImage(page: string): string | null {
  unstable_noStore();
  try {
    const dir = join(process.cwd(), "public", "images", "hero", page);
    const file = readdirSync(dir).find(f => EXTS.has(extname(f).toLowerCase()));
    return file ? `/images/hero/${page}/${file}` : null;
  } catch {
    return null;
  }
}
