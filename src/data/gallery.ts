export type GalleryParent = "exterior" | "interior";

export interface GalleryCategory {
  id: string;
  parent: GalleryParent;
  folder: string;
  he: string;
  en: string;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: "exterior-urban-plans", parent: "exterior", folder: "exterior/urban-plans", he: "תכניות אורבניות", en: "Urban Plans" },
  { id: "exterior-public",      parent: "exterior", folder: "exterior/public",      he: "ציבורי",          en: "Public" },
  { id: "exterior-private",     parent: "exterior", folder: "exterior/private",     he: "פרטי",            en: "Private" },
  { id: "exterior-renewal",     parent: "exterior", folder: "exterior/renewal",     he: "התחדשות עירונית", en: "Urban Renewal" },
  { id: "interior-public",      parent: "interior", folder: "interior/public",      he: "ציבורי",          en: "Public" },
  { id: "interior-private",     parent: "interior", folder: "interior/private",     he: "פרטי",            en: "Private" },
];

export interface GalleryImage {
  src: string;
  categoryId: string;
  parent: GalleryParent;
  title?: string;
}

export type GalleryImagesByCategory = Record<string, GalleryImage[]>;
