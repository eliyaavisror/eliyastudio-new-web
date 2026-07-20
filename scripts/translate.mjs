/**
 * Syncs messages/en.json from messages/he.json via Claude API.
 * Run: npm run translate
 * Requires ANTHROPIC_API_KEY in .env.local or environment.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local if present
try {
  readFileSync(join(ROOT, ".env.local"), "utf8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([^#=][^=]*)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    });
} catch { /* no .env.local */ }

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("❌  ANTHROPIC_API_KEY is not set.");
  console.error("    Add it to .env.local:  ANTHROPIC_API_KEY=sk-ant-...");
  process.exit(1);
}

const he = JSON.parse(readFileSync(join(ROOT, "messages/he.json"), "utf8"));

console.log("⏳  Translating he.json → en.json via Claude...");

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content: `You are a professional translator specialising in architecture and design.
Translate all Hebrew string values in the JSON below to natural, professional English.

Rules:
- Keep every JSON key exactly as-is (do not translate keys).
- Do NOT translate: brand names (e.g. "ELIYA Studio"), email addresses, phone numbers, coordinates, URLs, or strings that are already in English.
- Preserve escaped quotes (\\"...\\" stays as \\").
- Return ONLY valid JSON — no markdown fences, no commentary.

${JSON.stringify(he, null, 2)}`,
      },
    ],
  }),
});

if (!res.ok) {
  console.error("❌  API error:", await res.text());
  process.exit(1);
}

const raw = (await res.json()).content[0].text.trim();

let en;
try {
  en = JSON.parse(raw);
} catch {
  // strip accidental code fences
  const m = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? raw.match(/(\{[\s\S]*\})/);
  if (!m) { console.error("❌  Could not parse response:\n", raw); process.exit(1); }
  en = JSON.parse(m[1]);
}

writeFileSync(join(ROOT, "messages/en.json"), JSON.stringify(en, null, 2) + "\n", "utf8");
console.log("✅  messages/en.json updated.");
