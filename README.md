# POWER SLIME — lore site

Next.js + GSAP + Lenis, with a WebGL slime layer (`src/components/SlimeCanvas.tsx`).

```bash
npm install
npm run dev
```

## Editing lore / mint details

All copy, house data, mix rules and mint details live in `src/data/lore.ts`.

## Adding Slimearch art

Houses without art show an animated placeholder drop. To add art for a house:

1. Drop the image in `public/art/` (e.g. `public/art/pyros.jpg`).
2. Optional: drop a looping video in `public/video/` (e.g. `public/video/pyros.mp4`).
3. In `src/data/lore.ts`, add to that house:
   `art: { img: "/art/pyros.jpg", video: "/video/pyros.mp4" }`

Cards show the image; the dossier plays the video if one is set.

Current animated loops (Higgsfield, Seedance 2.5): `hero.mp4`, `crowd.mp4`, `pelagos.mp4`, `lysis.mp4`.
