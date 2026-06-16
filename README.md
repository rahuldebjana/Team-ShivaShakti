# Beteswar Shiva Mandir — Official Temple Website

A beautifully designed, production-grade website for **Beteswar Shiva Mandir** (बेतेश्वर शिव मंदिर), a sacred Hindu temple dedicated to Lord Shiva. Built with a devotional saffron-gold-maroon color scheme, the site serves as the digital presence for the temple, offering information, gallery, 80G tax benefit guidance, and a contact form.

## Key Technologies

- **TanStack Start** — SSR-capable React meta-framework
- **TanStack Router** — Type-safe file-based routing
- **Tailwind CSS v4** — Utility-first styling
- **Netlify Forms** — Serverless contact form handling with 80G enquiry support
- **Vite** — Fast build tooling

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, quick info, services, 80G callout, gallery preview |
| `/about` | Temple history, mission, vision, traditions |
| `/gallery` | Photo gallery with category filters |
| `/tax-benefit` | 80G Income Tax exemption details and how-to guide |
| `/contact` | Contact form, temple address, hours, social links |

## Running Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

> **Note:** Netlify Forms do not work in local development. Test form submissions on a Netlify deploy preview.

## Deployment

Deploy to Netlify. The project is pre-configured with `netlify.toml` for TanStack Start SSR.
