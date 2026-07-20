# ELIYA Studio — אתר תדמית

אתר תדמית דו-לשוני (עברית/אנגלית) לסטודיו ELIYA — תכנון אדריכלי והדמיות תלת-ממד.

## טכנולוגיות

- **Next.js 16** (App Router, Turbopack)
- **React 19** · **TypeScript 5**
- **Tailwind CSS 3.4**
- **next-intl 4** — תמיכה מלאה ב-RTL/LTR והרבה שפות
- **Heebo + Fraunces** — פונטים מ-Google Fonts (Heebo לעברית/לטיני, Fraunces ל-display)

## הפעלה

```bash
npm install        # התקנה ראשונית
npm run dev        # שרת פיתוח על http://localhost:3000
npm run build      # בנייה לפרודקשן
npm start          # הרצת build
npm run lint       # ESLint
npm run type-check # TypeScript בדיקה
```

## מבנה האתר

| נתיב | תיאור |
|---|---|
| `/` | בית — hero גדול, סקירת שירותים, פרויקטים נבחרים |
| `/architecture` | תכנון אדריכלי — תהליך עבודה, תחומי התמחות |
| `/visualizations` | הדמיות — סוגים, גלריה עם פילטרים |
| `/about` | אודות — סיפור, ערכים, סטטיסטיקה |
| `/contact` | צור קשר — טופס (Formspree), טל'/מייל, WhatsApp |
| `/accessibility` | הצהרת נגישות — לפי WCAG 2.2 רמה AA + ת״י 5568 |
| `/privacy` | מדיניות פרטיות — לפי תיקון 13 לחוק הגנת הפרטיות |

באנגלית הכל זמין תחת `/en/...`

## איפה לערוך תוכן

### 1. פרטי קשר ופרטי הסטודיו
`src/data/site.ts` — טלפון, מייל, WhatsApp, רשתות חברתיות, ת״ז של הסטודיו, רכז נגישות

### 2. טקסטים בעברית ואנגלית
`messages/he.json` ו-`messages/en.json` — כל הטקסטים באתר. מבנה זהה בשתי השפות.

### 3. פרויקטים בגלריה
`src/data/projects.ts` — מערך פרויקטים. שדות:
```ts
{
  slug: 'unique-slug',
  category: 'exterior' | 'interior' | 'aerial' | 'architecture',
  type: 'architecture' | 'visualization',
  featured: true,                 // אם להופיע בעמוד הבית
  year: 2025,
  title: { he: 'עברית', en: 'English' },
  location: { he: 'מיקום', en: 'Location' },
  description: { he: '...', en: '...' },
  cover: '/images/projects/visualizations/my-image.jpg',
  images: ['/images/projects/...']
}
```

### 4. תמונות
- `public/images/projects/architecture/` — תוכניות וצילומי תכנון
- `public/images/projects/visualizations/` — רנדרים תלת-ממד
- `public/images/about/` — תמונות לעמוד אודות
- `public/images/og/` — תמונת OG (1200×630) לשיתוף ברשתות

ה-placeholders SVG הם זמניים — להחליף בתמונות אמיתיות באותם שמות (או לעדכן ב-`projects.ts`).

## הגדרות שצריך לעדכן לפני העלייה

ב-`src/data/site.ts`:
- [ ] `contact.phone` ו-`contact.phoneDisplay` — מספר טלפון אמיתי
- [ ] `contact.email` — מייל אמיתי
- [ ] `contact.whatsapp` — מספר WA בלי `+` (למשל `972501234567`)
- [ ] `contact.address` ו-`addressEn` — כתובת אמיתית
- [ ] `social.instagram`, `social.facebook`, וכו'
- [ ] `business.taxId` — ח.פ./ע.מ.
- [ ] `formspree.endpoint` — להירשם ב-formspree.io ולהדביק ה-endpoint

ב-`src/app/[locale]/layout.tsx`:
- אם הדומיין משתנה — לעדכן `metadataBase` ב-`src/app/layout.tsx`

## נגישות (WCAG 2.2 רמה AA)

- ניווט מלא במקלדת (Tab/Shift+Tab/Enter/Esc)
- אינדיקטור focus נראה (`outline: 2px solid #0A0A0A`)
- skip-to-main link
- ARIA labels על כל הכפתורים והקישורים
- contrast 4.5:1 מינימום
- min-target-size 44×44 (רוב 48×48)
- Widget נגישות עם 9 התאמות אישיות (נשמר ב-localStorage)
- תמיכה ב-`prefers-reduced-motion`
- כיווניות RTL/LTR אוטומטית

## פרסום (Deployment)

ל-**Vercel** (מומלץ — נבנה במיוחד ל-Next.js):

1. דחיפת הקוד ל-GitHub
2. ייבוא הריפו ב-Vercel.com
3. `Production deploy` יקבל URL זמני כמו `eliya-studio-web.vercel.app`
4. כשמוכן — ב-Domains: להוסיף `eliyastudio.com` ולשנות DNS

ב-`.env.local` אם צריך:
```
NEXT_PUBLIC_SITE_URL=https://eliyastudio.com
```

## בעיות ידועות

- ה-placeholders SVG הם זמניים. להחליף בתמונות אמיתיות לפני go-live.
- Formspree endpoint זקוק לעדכון לפי החשבון.
- אם הדומיין שונה מ-`eliyastudio.com` — לעדכן `siteConfig.url` ב-`src/data/site.ts`.

## רישיון

© 2026 ELIYA Studio. כל הזכויות שמורות.
