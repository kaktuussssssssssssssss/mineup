# MINEUP — Alpha 0.1

Minecraft-themed item upgrader simulator. This is stage 1: a responsive React UI, case catalogue, language/theme preferences and settings saved in localStorage. No accounts, live drops, gambling, ads, backend, 3D item rotation or in-game currency transactions yet.

## Develop locally

```bash
npm install
npm run dev
```

## Cloudflare Workers static assets

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: leave default `npx wrangler preview` for now if Cloudflare requires one.
- `wrangler.jsonc` points Workers static assets to the `dist` folder.

Cloudflare's Git integration builds from the root of this repository. The Vite build creates `dist`. Never commit `node_modules` or `dist`.

## Structure

- `src/App.jsx`: React interface / page navigation
- `src/style.css`: styles / responsive design / themes
- `public/items/`: pixel art sample assets from the user's texture pack
- `wrangler.jsonc`: Workers static asset deployment

## Stage 2

Catalogue of Minecraft items with real 3D previews, then Supabase-backed accounts and server-validated inventory and chances. Local storage here holds only appearance preferences.
