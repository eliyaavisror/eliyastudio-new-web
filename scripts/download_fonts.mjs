import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS_DIR = join(ROOT, "public", "fonts");

const fonts = {
  "ProductSans-Thin.woff2": "https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts/ProductSans-Thin.woff2",
  "ProductSans-Light.woff2": "https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts/ProductSans-Light.woff2",
  "ProductSans-Regular.woff2": "https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts/ProductSans-Regular.woff2",
  "ProductSans-Medium.woff2": "https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts/ProductSans-Medium.woff2",
  "ProductSans-Bold.woff2": "https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts/ProductSans-Bold.woff2",
  "ProductSans-Black.woff2": "https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts/ProductSans-Black.woff2"
};

try {
  mkdirSync(FONTS_DIR, { recursive: true });
} catch (e) {}

async function download() {
  for (const [name, url] of Object.entries(fonts)) {
    console.log(`Downloading ${name} from ${url}...`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to download ${name}: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(FONTS_DIR, name), buffer);
    console.log(`Saved ${name} successfully.`);
  }
  console.log("All fonts downloaded successfully!");
}

download().catch(err => {
  console.error(err);
  process.exit(1);
});
