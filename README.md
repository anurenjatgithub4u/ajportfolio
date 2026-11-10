# Anurenj — Portfolio

Portfolio site for a mobile app developer and UX designer. Live at https://anurenj.vercel.app

Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.

## Editing content

All text, apps and case studies live in `lib/data.ts`.

- Screenshots: `public/apps/<app>/`, listed in each app's `screenshots`
- Case studies: apps with `featured: true` and a `caseStudy` get a page at `/work/<slug>`
- Hero phones: `heroScreens`
- CV: `public/cv.pdf`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Every push to `main` deploys to Vercel automatically.
