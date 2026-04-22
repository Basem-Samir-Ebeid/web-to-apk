# Web to APK Converter

A minimal Next.js 14 (App Router) + Tailwind CSS web app that takes a URL and
returns a (demo) APK build. Deployable on Vercel out of the box.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Vercel-ready

## Local development

```bash
npm install
npm run dev
# open http://localhost:5000
```

## Project structure

```
app/
  api/generate/route.ts   # POST endpoint, returns demo JSON
  globals.css             # Tailwind directives + theme
  layout.tsx              # Root layout
  page.tsx                # Home page
components/
  ConverterForm.tsx       # Client form with success + download UI
public/                   # Static assets
package.json
tailwind.config.ts
next.config.mjs
```

## API

`POST /api/generate`

```json
{
  "url": "https://example.com",
  "appName": "My App",
  "packageName": "com.example.myapp"
}
```

Returns a JSON object with `success`, `downloadUrl`, `appName`, `packageName`, `size`, `generatedAt`.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the repo on [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no extra settings needed.
