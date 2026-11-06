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

/**
 * Reads public/images/about/ and returns the path of the portrait image found.
 * Drop any image into public/images/about/ and it will be used automatically.
 */
export function getAboutPortraitImage(): string {
  unstable_noStore();
  try {
    const dir = join(process.cwd(), "public", "images", "about");
    const file = readdirSync(dir).find((f) => EXTS.has(extname(f).toLowerCase()));
    return file ? `/images/about/${encodeURIComponent(file)}` : "/images/about/eliya-eidelman.png";
  } catch {
    return "/images/about/eliya-eidelman.png";
  }
}
