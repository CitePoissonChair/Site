# AGENTS.md

## Stack

React 19 + TypeScript 6 + Vite 8, deployed as a static SPA on Netlify.
Package manager: **npm** (use `npm`, not `pnpm` or `yarn`). Node: **20** (`.node-version`).

## Commands

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # tsc -b && vite build — TypeScript check runs first
npm run lint       # eslint
npm run preview    # serve the dist/ build locally
```

- **No test runner** is installed. There are no tests.
- `build` will fail on TypeScript errors before Vite runs. Fix TS errors before assuming a Vite issue.
- To use a different port: `npm run dev -- --port 3000`

## Architecture

```
src/
  main.tsx          # entrypoint
  App.tsx           # router — all routes defined here, flat list
  pages/            # one file per route
  components/       # shared UI components (Sidebar, CoverImage, Logo, etc.)
  styles/           # plain CSS files, one per page/component
  index.css         # stub; real globals are in styles/global.css
public/
  _redirects        # Netlify SPA redirect rule — do not delete
  fonts/            # custom fonts loaded via @font-face in styles/global.css
  images/           # site images referenced as /images/...
  prestationscontenu/  # images for the prestations page
OldSite/            # legacy static HTML site — reference only, not part of the build
```

## Conventions

- **Named exports** for all pages and components. Only `App` uses a default export.
- **Plain CSS** (not CSS Modules). Each page/component has a corresponding file in `src/styles/`.
- Custom fonts (`yatra_one`, `harmattan`, `harmattan-bold`) are declared in `src/styles/global.css` and loaded from `/fonts/`. Always reference public assets with an absolute path starting with `/`.
- **Routes** are registered in `src/App.tsx` only. Add new routes there.
- Content language is **French**.

## TypeScript strictness

`tsconfig.app.json` enforces:
- `noUnusedLocals` / `noUnusedParameters` — unused variables/params are errors
- `erasableSyntaxOnly` — no TypeScript enums, no parameter properties (use plain objects/union types)
- `noFallthroughCasesInSwitch`

## Deployment (Netlify)

- Build command: `npm run build`, publish dir: `dist`
- `public/_redirects` contains `/* /index.html 200` — **required** for React Router to work on direct URL loads. Do not remove this file.
- `netlify.toml` also sets the redirect rule as a fallback.

## OldSite

`OldSite/` is the previous plain-HTML version of the site. It is not compiled or served — keep it as reference only and do not modify it.
