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

A floating **Temple Assistant** chatbot is available on all pages (powered by Llama 3.1 via Groq). Set `GROQ_API_KEY` in Netlify environment variables for production.

## Temple Chatbot

A floating **Temple Assistant** chatbot (bottom-right on every page) powered by [Llama 3.1 8B](https://llama.meta.com/) via the free [Groq](https://groq.com/) API. It answers questions about temple timings, rituals, 80G donations, and directions using a curated knowledge base.

### Setup (required for production)

Use **either** provider below (Hugging Face is often easier to sign up for):

#### Option A — Hugging Face (recommended if Groq login fails)

1. Sign up at [huggingface.co](https://huggingface.co/) (GitHub or Google login works reliably)
2. Go to [Settings → Access Tokens](https://huggingface.co/settings/tokens) → **Create new token**
3. Choose **Fine-grained**, enable **"Make calls to Inference Providers"**
4. In Netlify → **Site settings → Environment variables**, add:
   - `HF_TOKEN` = your Hugging Face token (starts with `hf_`)
5. Redeploy the site

Uses **Llama 3.1 8B** (open-source) via Hugging Face's free inference credits.

#### Option B — Groq

1. Sign up at [console.groq.com](https://console.groq.com/) — use **GitHub/Google** sign-in (not email magic links on mobile)
2. If you see "login link expired", request a **fresh link** and open it only once in Chrome/Safari (not WhatsApp/Telegram in-app browser)
3. In Netlify → **Site settings → Environment variables**, add:
   - `GROQ_API_KEY` = your Groq API key
4. Redeploy the site

If both `HF_TOKEN` and `GROQ_API_KEY` are set, Groq is tried first, then Hugging Face as fallback.

Without either key, the chat UI appears but requests return a friendly configuration message.

## Running Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

> **Note:** Netlify Forms do not work in local development. Test form submissions on a Netlify deploy preview.

## Deployment

Deploy to Netlify. The project is pre-configured with `netlify.toml` for TanStack Start SSR.
