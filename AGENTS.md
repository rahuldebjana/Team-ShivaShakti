# AGENTS.md — Beteswar Shiva Mandir Website

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

Official website for **Beteswar Shiva Mandir** (बेतेश्वर शिव मंदिर), a sacred Hindu temple dedicated to Lord Shiva. Features temple information, gallery, 80G tax benefit guide, and a Netlify Forms contact form. Built with TanStack Start and deployed on Netlify.

## Design Conventions

- **Color palette** (CSS variables in `styles.css`):
  - `--saffron: #FF6B00`, `--gold: #D4A017`, `--maroon: #8B0000`
  - `--cream: #FFF8F0`, `--brown-dark: #2D1B00`
- **Typography**: Georgia serif for headings and nav; system-ui for body
- **Inline styles** are used for gradient backgrounds (Tailwind can't express these without config extension)
- **Gallery** uses real `<img>` tags from `public/gallery/`

## Netlify Forms

The contact form (`/contact`) uses Netlify Forms via AJAX fetch:
- Static skeleton at `public/contact-form.html` — **must include all field names** (Netlify detects forms at build time from static HTML)
- React component posts to `/contact-form.html` (NOT `/`)
- If you add fields, update **both** the React component and the static skeleton

## Security

- Security headers are defined in `public/_headers` (CSP, X-Frame-Options, HSTS is provided by Netlify)
- Contact form validates field lengths and subject whitelist client-side before submission
- Keep `@tanstack/react-start`, `vite`, and `@netlify/vite-plugin-tanstack-start` up to date (SSR runtime)

## Non-Obvious Decisions

- Inline `style` props over Tailwind: saffron/maroon gradient palette requires full Tailwind config extension
- `public/contact-form.html`: TanStack Start renders React; Netlify can't detect forms in JS bundles — the static file is the required workaround
- `om-glow` CSS animation: defined in `styles.css` with `@keyframes glow` — gold pulse on the ॐ symbol

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── _headers              # Netlify security headers (CSP, X-Frame-Options, etc.)
│   ├── contact-form.html     # Netlify form skeleton (build-time detection)
│   └── gallery/              # Temple photo assets
├── src
│   ├── data
│   │   └── location.ts       # Temple address and Google Maps URLs
│   ├── routes
│   │   ├── __root.tsx        # Root layout: navbar, footer, SEO head
│   │   ├── index.tsx         # Home page
│   │   ├── about.tsx         # Temple history and mission
│   │   ├── gallery.tsx       # Photo gallery with category filters
│   │   ├── tax-benefit.tsx   # 80G tax exemption guide
│   │   └── contact.tsx       # Contact form, address, map
│   ├── router.tsx            # TanStack Router setup
│   └── styles.css            # Global styles and CSS variables
├── netlify.toml              # Netlify build and deploy config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `about.tsx`, `gallery.tsx`, `tax-benefit.tsx`, `contact.tsx` - Feature pages

### Component Architecture

Layout (navbar, footer) lives in `src/routes/__root.tsx`. Each route file is a self-contained page component.

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `public/_headers` | Security headers served by Netlify |
| `styles.css` | Tailwind imports + temple color CSS variables |

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
```

> **Note:** Netlify Forms do not work in local development. Test form submissions on a Netlify deploy preview.

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- CSS variables for theme tokens in `styles.css`
- Inline `style` props for gradient backgrounds

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Type-only imports with `type` keyword

### State Management
- React hooks for local state only
