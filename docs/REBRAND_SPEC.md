# Portfolio visual spec — glass in living light

Current look of lukemcmeans.com (branch `jul26-rebrand`). This is a **description of what shipped**, not an implementation playbook.

**Aesthetic:** frosted glass panels floating over a slow, route-tinted ambient field. Cool brand greens/cyans dominate; warm accents only on Education. No photo background.

---

## Stack and tree

- **Next.js 15.1.4**, **App Router**, React 18, plain JS, no Tailwind, no styled-components.
- **framer-motion ^11** for page enter only (`PageTransition`). Exit variants exist but do not run (no `AnimatePresence`).
- App lives at the **git root**. Run `npm run dev` / `npm run build` from `.`.
- Vercel **Root Directory** must be `.`.

```
app/
  layout.js                 # Public Sans, metadata, globals + ambient CSS
  not-found.js              # 404 with site chrome
  (site)/layout.js          # AmbientBackground + SiteChrome
  (site)/page.js            # /
  (site)/{projects,experience,education,resume,contact}/page.js
  loggd-redirect/page.js    # no chrome, own visual language
components/                 # AmbientBackground, SiteChrome, PageTransition, ResumeFrame, LoggdRedirect
content/                    # copy/data
lib/                        # nav items, motion variants
styles/globals.css          # tokens + chrome + pages
styles/ambient.css          # blob engine
```

`/loggd-redirect` is excluded from the site chrome (same as before).

---

## Type and color

**Type:** Public Sans variable (`public/fonts/PublicSans.woff2`) via `next/font/local`, weight axis `100 900`, exposed as `--font-public-sans` / `--pagefont`.

**Theme:** OS `prefers-color-scheme` only. Tokens live on `:root`; dark values override inside `@media (prefers-color-scheme: dark)`. No JS class toggle, no user theme switch.

**Favicon / mark:** `app/icon.png` + `public/favicon.ico` from the rounded `lm` icon. Header wordmark is `public/images/lm-mark.png` with `.mono-logo` (forced black in light mode, natural in dark).

### Tokens (as in `styles/globals.css`)

```css
:root {
  --pagefont: var(--font-public-sans), system-ui, -apple-system, 'Segoe UI', sans-serif;

  --brand: #01714B;
  --brand-teal: #0fb389;
  --brand-cyan: #22c9d6;
  --brand-aqua: #4fe0d0;
  --brand-sky: #4aa8ff;
  --brand-azure: #2f7bff;
  --brand-royal: #2b52e0;
  --brand-violet: #7b5cff;
  --brand-indigo: #4634d1;
  --brand-magenta: #c94fe0;
  --accent-coral: #ff7a6b;
  --accent-peach: #ffb27a;
  --accent-orange: #ff9445;

  --page-bg: #eef2f7;
  --glass-bg: rgba(255,255,255,0.55);
  --glass-bg-strong: rgba(255,255,255,0.62);
  --glass-bg-soft: rgba(255,255,255,0.42);
  --glass-border: rgba(255,255,255,0.65);
  --glass-highlight: rgba(255,255,255,0.9);
  --glass-blur: 22px;
  --glass-blur-strong: 34px;
  --glass-blur-nav: 40px;

  --text: #16202b;
  --text-soft: #47586b;
  --text-invert: #ffffff;

  --shadow-soft: 0 4px 20px rgba(31, 70, 110, 0.10), 0 1px 2px rgba(255,255,255,0) inset;
  --shadow-card: 0 8px 30px rgba(31, 70, 110, 0.14), 0 1px 2px rgba(255,255,255,0.6) inset;
  --shadow-lift: 0 16px 44px rgba(31, 70, 110, 0.20), 0 1px 2px rgba(255,255,255,0.7) inset;
  --shadow-nav: 0 10px 40px rgba(31, 70, 110, 0.16);

  --r-panel: 22px;
  --r-card: 20px;
  --r-btn: 16px;
  --dur-hover: 220ms;
  --ease-glass: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Dark `:root` overrides: `--page-bg: #070c14`, darker glass alphas, `--text: #eaf1f8`, `--text-soft: #a7b6c7`, black-based shadows with a faint inset highlight.

---

## Ambient field

`components/AmbientBackground.js` + `styles/ambient.css`.

- Fixed, `z-index: -1`, `pointer-events: none`. Eight CSS blobs (not a photo, not canvas).
- Shared **geometry**; **color** comes from a per-route palette (cycles across the eight blobs):

| Route | Palette tokens |
|---|---|
| `/` | teal, aqua, cyan, sky |
| `/projects` | azure, sky, royal, cyan |
| `/experience` | teal, cyan, aqua, azure |
| `/education` | orange, peach, coral, teal |
| `/resume` | violet, indigo, magenta, sky |
| `/contact` | cyan, aqua, sky, teal |
| anything else (404) | same as `/` |

- Morph via `blobMorph` (40–90s, `alternate`). Blend `screen` in light, `lighten` in dark.
- Cursor parallax ±8px, rAF-throttled; off under `prefers-reduced-motion`.
- Pauses while the tab is hidden, during pinch-zoom, and briefly on pathname change. Zoom also drops blob blur (`ambient-root--zoomed`) and disables `backdrop-filter` on glass (`body.is-pinch-zooming`).
- Fine grain overlay at 4% opacity.

---

## Glass material

| Class | Role |
|---|---|
| `.glass-panel` | Home tagline + hero, resume frame, 404 |
| `.glass-card` | Contact rows |
| `.glass-btn` | Resume / project action buttons |
| `.activity-tab` | Projects / experience / education cards — same glass recipe, **no** sheen pseudo |
| `.header` | Full-width glass bar (tokens, not `.glass-nav`) |

**Sheen:** `.glass-panel` / `.glass-card` / `.glass-nav` use a top-edge `::before` (`mix-blend-mode: screen`, fade out by 22%). The panel is `isolation: isolate`; the pseudo is `z-index: 0` and children are `z-index: 1` so the highlight tints the **glass**, not the type. Do not put `z-index: -1` on the sheen (`backdrop-filter` already creates a stacking context).

**Hover:**
- Cards / buttons: `translateY(-2px)`, stronger shadow. `.glass-card` also `scale(1.01)`.
- Activity tabs are informational — **no lift/scale**, only a slightly stronger (brand-tinted) shadow.
- Brand glow on tabs: `--shadow-soft` plus a colored `0 0 40px` (loggd blue, top8s navy, timmons green, etc.).

`.glass-nav` exists in CSS but is unused.

---

## Chrome

**Header** — fixed, 114px tall (50px on viewports ≤868px). Logo + “Luke McMeans”. No per-route gradient, no scroll-shrink.

**Nav** — desktop: left column, six tabs (Home, Projects, Experience, Education, Resume, Contact) with inline SVG icons (icons hidden until mobile). Hover / current chip is `color-mix(in srgb, var(--text) 8%/12%, transparent)` so it reads in both themes. Light mode: no tab text-shadow. Mobile (≤868px): icon-only bar under the header; dark mode only keeps a light text-shadow.

**Footer** — “Created by Luke McMeans (2026)” in `--footercolor`, desktop only.

**Content column** — 716px, scrolls inside a masked pane (`100vh - 114px`). Body itself does not scroll.

**Logos:**
- Home: full-color Timmons icon + UVA pair (`<picture>` for light/dark).
- Experience / education / Loggd project mark: `.mono-logo` (black in light, untouched in dark).
- Top8s project mark: color, no mono filter.

That split is intentional. Do not force one treatment.

---

## Pages

Routes and copy are unchanged.

| Route | Presentation |
|---|---|
| `/` | Tagline panel + hero panel (role, UVA line, summary, Resume button, socials) |
| `/projects` | Loggd + Charlottesville Top8s cards; title is a `<p>` beside the mark (default `<p>` margins + loggd/top8s title offsets) |
| `/experience` | Timmons, Carahsoft, TLN cards |
| `/education` | UVA card |
| `/resume` | Download button + PDF iframe with skeleton, then fade-in |
| `/contact` | Three `glass-card` rows (mail, LinkedIn, GitHub) |
| 404 | Glass panel, cat WebP (`/images/maxwell-cat.webp`) |
| `/loggd-redirect` | Separate blue gradient + self-hosted Lexend; UA redirect to store |

Page enter: opacity 0 → 1, `y: 20 → 0`, spring (`lib/variants.js`).

---

## Motion and a11y

- `prefers-reduced-motion`: blobs static, no parallax, resume shimmer off.
- Focus: `outline: 2px solid var(--brand-cyan)` on links, buttons, tabs, contact rows.
- Ambient root is `aria-hidden="true"`.
- `<html>` has `suppressHydrationWarning` so browser extensions that stamp attributes on `<html>` do not trip the overlay.

---

## What this is not

These were in the original phase spec and **did not ship** (do not re-add unless deliberately redesigning):

- Header scroll-shrink / `header--scrolled`
- `AnimatePresence` exit transitions
- JS `body.dark-mode-colors`
- Nested `portfolio-website/portfolio-website/` app root
- Pages Router (`pages/layout.js` as a public route, `navbar.js`, `starter-index.js`)
- Photo background (`pitt.jpg`)
- styled-components

---

## Run

```bash
npm run dev      # from repo root
npm run build
```
