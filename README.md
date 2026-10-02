# Vrit Services Section (Next.js + Tailwind)

Built from the provided Figma screenshot: intro + service list, draggable image carousel with a custom "Drag" cursor and scroll progress bar, and a partners row.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy (free, gives the live demo URL)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → "Add New Project" → import the repo → Deploy.

## Replace placeholder assets
Images in `public/images/` were cropped from a screenshot, so they are low-res.
Export the originals from Figma (right-click layer → Export, 2x) and overwrite:
- `work-1.png`, `work-2.png` (carousel; add more in `components/Services.tsx`)
- `partner-*.png` (or export as SVG)

## Notes
- Font: Hanken Grotesk (closest match to the design). Change it in `app/layout.tsx` and `tailwind.config.ts` once you check the real font in Figma.
- Breakpoints: single column under 640px, two columns from 640px up.
