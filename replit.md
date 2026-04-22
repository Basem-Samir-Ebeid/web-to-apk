# Web to APK Converter

Next.js 14 (App Router) + Tailwind CSS web app deployable on Vercel. Replaces the
previous native Android project.

## Replit Setup

- **Workflow**: `Start application` → `npm run dev` (binds to `0.0.0.0:5000`).
- **Deployment**: Vercel (auto-detected). Replit's deployment also works (autoscale, `npm run build` → `npm run start`).

## Project Layout

- `app/page.tsx` — landing page
- `app/layout.tsx` — root layout
- `app/globals.css` — Tailwind directives + theme
- `app/api/generate/route.ts` — POST endpoint, returns demo JSON
- `components/ConverterForm.tsx` — client form with success/download UI
- `public/` — static assets
- `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `next.config.mjs`

## Scripts

```bash
npm run dev    # local dev on http://localhost:5000
npm run build  # production build
npm run start  # serve production build
```

## API

`POST /api/generate` — body: `{ url, appName, packageName? }`. Returns JSON with
`success`, `appName`, `url`, `packageName`, `size`, `generatedAt`, `downloadUrl`.
Demo only — does not actually compile an APK.
