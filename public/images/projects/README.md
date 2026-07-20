# Project images

Place your project images here, organized by category:

- `architecture/` — Architectural design projects (plans, photos, sketches)
- `visualizations/` — 3D visualization renders

## Naming convention

Use kebab-case with descriptive names. Add a 2-digit prefix to control order:

```
01-villa-herzliya-exterior.jpg
02-villa-herzliya-living-room.jpg
03-office-tlv-aerial.jpg
```

## Recommended formats

- **JPG** for photographs and renders (quality 85)
- **AVIF / WebP** preferred for production (Next.js will auto-convert)
- Max width: 2400px (Next.js will resize as needed)

## After adding images

Edit `src/data/projects.ts` to register them in the gallery.
