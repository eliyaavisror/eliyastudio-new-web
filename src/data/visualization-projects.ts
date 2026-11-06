export type VizProjectCategory = string;

export interface VizCategoryMeta {
  id: string;
  he: string;
  en: string;
}

export const VIZ_CATEGORIES: VizCategoryMeta[] = [
  { id: "all",         he: "הכל",                     en: "All" },
  { id: "private",     he: "בתים פרטיים",             en: "Private Homes" },
  { id: "residential", he: "מגורים והתחדשות עירונית", en: "Residential & Urban Renewal" },
  { id: "public",      he: "ציבורי ומסחרי",           en: "Public & Commercial" },
  { id: "urban",       he: "ישובים ושכונות",          en: "Communities & Neighborhoods" },
];

export interface VizProject {
  id: string;
  category: VizProjectCategory;
  title: {
    he: string;
    en: string;
  };
  cover: string;
  images: string[];
}

const BASE = "/images/projects/visualizations";

function enc(relPath: string): string {
  return (
    BASE +
    "/" +
    relPath
      .split("/")
      .map((seg) => encodeURIComponent(seg))
      .join("/")
  );
}

/**
 * סדר הפרויקטים ברשימה זו קובע את סדר ההופעה בגלריה.
 * הפרויקטים החזקים ביותר מופיעים בראש הרשימה (עמוד 1).
 */
export const VIZ_PROJECTS: VizProject[] = [
  // ── 1. מתחם מגורים SOL ──
  {
    id: "sol-residential",
    category: "residential",
    title: { he: "מתחם מגורים SOL", en: "SOL Residential Complex" },
    cover: enc("exterior/renewal/01_SOL_OUT_01.webp"),
    images: [
      enc("exterior/renewal/01_SOL_OUT_01.webp"),
      enc("exterior/renewal/02_SOL_OUT_02.webp"),
      enc("exterior/renewal/03_SOL_OUT_03.webp"),
      enc("exterior/renewal/04_SOL_OUT_04.webp"),
      enc("exterior/renewal/03fine קרקע.jpg"),
    ],
  },

  // ── 2. וילה מודרנית ──
  {
    id: "modern-villa",
    category: "private",
    title: { he: "וילה מודרנית", en: "Modern Villa" },
    cover: enc("exterior/private/01_וילה מודרנית.webp"),
    images: [
      enc("exterior/private/01_וילה מודרנית.webp"),
      enc("exterior/private/02_וילה מודרנית.webp"),
      enc("exterior/private/כללי ערב.webp"),
      enc("exterior/private/כניסה ערב copy.webp"),
    ],
  },

  // ── 3. מכללת אפקה ──
  {
    id: "afeka-college",
    category: "public",
    title: { he: "מכללת אפקה", en: "Afeka College" },
    cover: enc("interior/public/מכללת אפקה - לובי.webp"),
    images: [
      enc("interior/public/מכללת אפקה - לובי.webp"),
      enc("interior/public/מכללת אפקה - ספריה.webp"),
      enc("interior/public/מכללת אפקה - קפיטריה.webp"),
    ],
  },

  // ── 4. התחדשות עירונית — מגדלי מגורים ──
  {
    id: "urban-renewal-towers",
    category: "residential",
    title: { he: "מתחם התחדשות עירונית", en: "Urban Renewal Towers" },
    cover: enc("exterior/renewal/11_01_copy.webp"),
    images: [
      enc("exterior/renewal/11_01_copy.webp"),
      enc("exterior/renewal/12_01_VIEW.jpg"),
      enc("exterior/renewal/13_01.webp"),
      enc("exterior/renewal/14_010101_copy.webp"),
      enc("exterior/renewal/15_02_VIEW.webp"),
    ],
  },

  // ── 5. בית משפחתי פרטי ──
  {
    id: "family-residence",
    category: "private",
    title: { he: "בית משפחתי פרטי", en: "Private Family Residence" },
    cover: enc("exterior/private/בית משפחתי_01.webp"),
    images: [
      enc("exterior/private/בית משפחתי_01.webp"),
      enc("exterior/private/בית משפחתי_02.webp"),
      enc("exterior/private/בית משפחתי_03.webp"),
    ],
  },

  // ── 6. מרכז מסחרי שבות רחל ──
  {
    id: "shvut-rachel-commercial",
    category: "public",
    title: { he: "מרכז מסחרי שבות רחל", en: "Shvut Rachel Commercial Center" },
    cover: enc("exterior/public/מסחרי שבות1.webp"),
    images: [
      enc("exterior/public/מסחרי שבות1.webp"),
      enc("exterior/public/מסחרי שבות2.webp"),
      enc("exterior/urban-plans/03_מסחרי שבות רחל.webp"),
      enc("exterior/urban-plans/03_שבות רחל.jpg"),
    ],
  },

  // ── 7. דירת יוקרה 405 ──
  {
    id: "luxury-apartment-405",
    category: "private",
    title: { he: "דירת יוקרה 405", en: "Luxury Apartment 405" },
    cover: enc("interior/private/405-1-.webp"),
    images: [
      enc("interior/private/405-1-.webp"),
      enc("interior/private/405-2 copy.webp"),
      enc("interior/private/406-4.webp"),
      enc("interior/private/406-5A.png"),
    ],
  },

  // ── 8. קומפלקס מגורים A·B·C ──
  {
    id: "residential-abc",
    category: "residential",
    title: { he: "קומפלקס מגורים A·B·C", en: "Residential Complex A·B·C" },
    cover: enc("exterior/renewal/A FINAL copy.webp"),
    images: [
      enc("exterior/renewal/A FINAL copy.webp"),
      enc("exterior/renewal/B_copy.webp"),
      enc("exterior/renewal/C NEW copy.webp"),
    ],
  },

  // ── 9. וילה פרטית עם חצר ובריכה ──
  {
    id: "courtyard-villa",
    category: "private",
    title: { he: "וילה פרטית וחצר", en: "Courtyard Private Villa" },
    cover: enc("exterior/private/01_002 copy.webp"),
    images: [
      enc("exterior/private/01_002 copy.webp"),
      enc("exterior/private/02_002 copy.webp"),
      enc("exterior/private/03_002 copy.webp"),
      enc("exterior/private/SF1_02_002.webp"),
      enc("exterior/private/TF2_02_002.webp"),
    ],
  },

  // ── 10. תכנון אורבני — מבוא חורון ──
  {
    id: "mevo-horon-urban",
    category: "urban",
    title: { he: "רובע מגורים מבוא חורון", en: "Mevo Horon Masterplan" },
    cover: enc("exterior/urban-plans/01_מבוא חורון.webp"),
    images: [
      enc("exterior/urban-plans/01_מבוא חורון.webp"),
      enc("exterior/public/מגורים בכפר.webp"),
    ],
  },

  // ── 11. פנטהאוס ומרפסות בעיר ──
  {
    id: "urban-penthouse",
    category: "private",
    title: { he: "פנטהאוס ומרפסת בעיר", en: "Urban Penthouse & Terrace" },
    cover: enc("interior/private/פנטהאוס בעיר פנורמה.webp"),
    images: [
      enc("interior/private/פנטהאוס בעיר פנורמה.webp"),
      enc("interior/private/02_מרפסת בעיר.webp"),
      enc("interior/private/מרפסת בעיר.webp"),
      enc("interior/private/מרפסת1.webp"),
      enc("exterior/renewal/מבט פנטהאוס copy.webp"),
    ],
  },

  // ── 12. מלון כפרי ודיור מוגן ──
  {
    id: "rural-hotel-complex",
    category: "urban",
    title: { he: "מלון כפרי ומתחם אירוח", en: "Rural Hotel & Hospitality" },
    cover: enc("exterior/public/מלון כפרי.webp"),
    images: [
      enc("exterior/public/מלון כפרי.webp"),
      enc("exterior/public/דיור מוגן.webp"),
      enc("exterior/public/לאתרx.webp"),
    ],
  },

  // ══ עמוד 2 (פרויקטים 13–20) ══

  // ── 13. מתחם מגורים שזף ──
  {
    id: "shazap-residence",
    category: "residential",
    title: { he: "מתחם מגורים שזף", en: "Shazap Residential Project" },
    cover: enc("exterior/renewal/Shazap view 01 copy.webp"),
    images: [
      enc("exterior/renewal/Shazap view 01 copy.webp"),
      enc("exterior/renewal/FF03 copy.webp"),
      enc("exterior/renewal/view 03_V3 copy fg3y.webp"),
      enc("exterior/renewal/view 04_V3 copy 3.webp"),
    ],
  },

  // ── 14. עיצוב פנים — סלון וחצר ──
  {
    id: "living-courtyard-interior",
    category: "private",
    title: { he: "עיצוב פנים — סלון וחצר", en: "Living Room & Courtyard Interior" },
    cover: enc("interior/private/01_סלון וחצר.webp"),
    images: [
      enc("interior/private/01_סלון וחצר.webp"),
      enc("interior/private/סלון מודרני.webp"),
      enc("interior/private/סלון ומטבח.webp"),
      enc("interior/private/סלון copy.webp"),
      enc("interior/private/סלון.webp"),
    ],
  },

  // ── 15. מועדון A-Club ומתחם משרדים ──
  {
    id: "aclub-offices",
    category: "public",
    title: { he: "מועדון A-Club ומתחם עבודה", en: "A-Club & Executive Workspaces" },
    cover: enc("interior/public/a-club 1.webp"),
    images: [
      enc("interior/public/a-club 1.webp"),
      enc("interior/public/a-club 2.webp"),
      enc("interior/public/משרדים.webp"),
      enc("interior/private/מטבח משרדי.webp"),
      enc("interior/public/image copy.webp"),
      enc("interior/public/image copy2.webp"),
    ],
  },

  // ── 16. בית פרטי — סדרת Image ──
  {
    id: "private-villa-series",
    category: "private",
    title: { he: "וילה פרטית בנוף", en: "Landscape Private Villa" },
    cover: enc("exterior/private/Image01 copy.webp"),
    images: [
      enc("exterior/private/Image01 copy.webp"),
      enc("exterior/private/Image02 copy.webp"),
      enc("exterior/private/Image03 copy.webp"),
    ],
  },

  // ── 17. התחדשות עירונית יפו ──
  {
    id: "jaffa-urban-renewal",
    category: "residential",
    title: { he: "התחדשות עירונית יפו", en: "Jaffa Urban Renewal" },
    cover: enc("exterior/renewal/יפו 2 copy.webp"),
    images: [
      enc("exterior/renewal/יפו 2 copy.webp"),
      enc("exterior/renewal/final.jpg"),
      enc("exterior/renewal/מבט כללי5.jpg"),
    ],
  },

  // ── 18. עיצוב מטבחים וחללי מגורים ──
  {
    id: "kitchen-and-suites",
    category: "private",
    title: { he: "מטבח וחללי מגורים", en: "Kitchen & Private Suites" },
    cover: enc("interior/private/Kitchen.webp"),
    images: [
      enc("interior/private/Kitchen.webp"),
      enc("interior/private/מטבח 4.webp"),
      enc("interior/private/חדר שינה.webp"),
      enc("interior/private/חדר עבודה.webp"),
      enc("interior/private/שולחן עבודה.webp"),
      enc("interior/private/כיור שירותים.webp"),
      enc("interior/private/שירותים copy.webp"),
    ],
  },

  // ── 19. בית פרטי V2 ──
  {
    id: "private-home-v2",
    category: "private",
    title: { he: "בית פרטי מודרני", en: "Contemporary Private Home" },
    cover: enc("exterior/private/01_image_V2 copy.webp"),
    images: [
      enc("exterior/private/01_image_V2 copy.webp"),
      enc("exterior/private/02_image_V2 copy.webp"),
      enc("exterior/private/02 copy.webp"),
      enc("exterior/private/vilaq3.webp"),
      enc("exterior/private/03-2.webp"),
      enc("exterior/private/04-2.webp"),
      enc("exterior/private/בניין .webp"),
    ],
  },

  // ── 20. גשר הירקון ופיתוח נופי ──
  {
    id: "yarkon-bridge-landscape",
    category: "urban",
    title: { he: "גשר הירקון ופיתוח נופי", en: "Yarkon Bridge & Landscape" },
    cover: enc("exterior/public/גשר הירקון.webp"),
    images: [
      enc("exterior/public/גשר הירקון.webp"),
    ],
  },
];
