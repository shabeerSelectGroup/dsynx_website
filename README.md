# DSYNZ — Premium Corporate Website

Strategy-led technology partner website built with **HTML5**, **Tailwind CSS**, and **vanilla ES modules** (no React, no WordPress).

Brand aligned with **DSYNZ Logo 2026.pdf**: primary `#7C3AED`, Archivo Black headings, Montserrat body, dark-first aesthetic.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| Process | `process.html` |
| Careers | `careers.html` |
| Contact | `contact.html` |
| Blog | `blog.html` |
| 404 | `404.html` |

## Structure

```
assets/
  css/          input.css + dsynz-elite.css → main.css
  js/
    brand.js        Positioning & structured copy
    interactions.js Home service tabs, FAQ, process story toggles
    components.js   Nav, footer, forms, cards
    interactions.js Service stage, process, FAQ
    animations.js   Lenis + GSAP motion
    pages.js        Inner page bootstrap
    home.js         Homepage mount
    main.js, forms.js, seo.js
  favicon/      SVG favicon + web manifest
  images/       OG placeholder SVG
robots.txt
sitemap.xml
```

## Quick start

```bash
npm install
npm run build:css    # compile Tailwind after CSS changes
```

Serve locally (ES modules require HTTP):

```bash
npx serve .
# or: python -m http.server 8080
```

Open `http://localhost:3000` (or your port).

## Features

- Sticky glass navbar, dark/light theme toggle
- Lenis smooth scrolling + GSAP ScrollTrigger (reveals, counters, stagger)
- Magnetic CTAs, cursor glow (desktop), cinematic hero, page loader
- Reusable components: nav, footer, CTA, forms, newsletter
- Schema.org JSON-LD via `assets/js/seo.js`
- SEO: semantic HTML, meta/OG tags, canonical URLs, sitemap, robots.txt

## Production checklist

1. Run `npm run build` before deploy (`build:css` + `vendor:copy`)
2. Upload the **full** `assets/css/dsynz-elite.css` (~98 KB). If Network shows ~12 KB or `?v=34`, the server has an old file or stale cache — bump the `?v=` query in HTML after upload
3. Upload `assets/vendor/` (Three.js, GSAP, Lenis) — required for 3D and scroll animations
4. Export `assets/images/og-default.svg` to **1200×630 JPG** as `og-default.jpg` for social previews
5. Point domain in `sitemap.xml`, canonical tags, and `seo.js` base URL
6. Wire contact/newsletter forms to your backend or service (currently client-side UI)
7. Configure host **404** → `404.html`

## Brand copy

- Tagline: *We design unbeatable businesses.*
- Hero: *From clarity to growth, we design technology that helps businesses become unbeatable.*
- Descriptor: *Strategy-led technology partner for growing businesses.*

© DSYNZ
