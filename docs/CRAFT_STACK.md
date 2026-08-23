# Craft revamp — stack decision

Branch `aug26-craft-revamp`. This is the architecture for the next visual pass: more human, more made-by-hand, without stacking more GPU on the current glass field.

The current shipped look is documented in `docs/REBRAND_SPEC.md`. This file is what we are changing and what we are not.

## Verdict

**Keep Next.js App Router.** Do not migrate to Astro, SvelteKit, Remix, or a Three.js SPA.

The glitches are not a router problem. They come from always-on CSS blur (eight blobs + several `backdrop-filter` layers), a `position: fixed` / `overflow: hidden` shell with a nested scroller, and Framer Motion page wrappers whose **exit variants never run**.

Craft and performance move in the same direction if atmosphere becomes one cheap surface (image, CSS, or a single WebGL quad) instead of a stack of live filters.

## Layers (budget, top to bottom)

1. **Site shell — Next.js App Router** (already here)
   - Persistent chrome in `app/(site)/layout.js`.
   - Per-page structure in each route. Outliers keep their own group (`/loggd-redirect`).
   - Later: Next 16 + React 19 for first-class `ViewTransition` and `Link transitionTypes`. This repo still pins React 18.3.1, so that bump is a gated step, not this commit.

2. **Route motion — CSS View Transitions**
   - Primary enter/exit and shared-element morphs (header stays, content pane / cards morph).
   - CSS lives in `styles/view-transitions.css` now; it is inert until Next starts a view transition.
   - Reduced-motion: durations go to 0.

3. **In-page motion — CSS first, Motion second**
   - Hover, grain, layout, `@starting-style`.
   - `motion/react` (Framer Motion’s successor) only for springs, layout animation, or gesture. Lazy-load. Do not wrap every page.
   - GSAP only if a future page is actually a timed story. Not for six static routes.

4. **Atmosphere / 3D — at most one WebGL context**
   - Replace the eight-blob CSS engine. Do not draw a canvas *on top of* it.
   - R3F + drei is allowed for **one** crafted object or a full-screen shader quad.
   - Rules: mount when the route needs it, `frameloop="demand"` unless it is on screen and moving, cap DPR, pause when the tab is hidden, skip when `prefers-reduced-motion` or Save-Data.
   - Prefer Rive or still images if the craft is illustration rather than sculpture.
   - No Spline runtime.

## What not to add

- Framer Motion `AnimatePresence` as the long-term page-transition system (App Router unmounts too fast; View Transitions snapshot both pages).
- Extra glass blur, extra blend modes, extra grain techniques that paint every frame.
- A 3D scene on every route “for consistency.”
- A new layout library. Nested layouts + CSS Grid are the layout framework.

## Order of work

1. Unlock document scroll (drop `body` `overflow: hidden` + nested `.content` scroller; use sticky header + `dvh`). This is the structural glitch source.
2. Replace `AmbientBackground` blobs with one cheaper field.
3. Enable View Transitions (Next 16 bump) and retire `PageTransition` Framer wrappers.
4. Restyle toward craft (type, materials, irregular layout).
5. Add one 3D object only if a page still needs mass.

## This branch (prep)

- `app/(site)/template.js` — page enter remounts in one place; route files are server components again.
- `styles/view-transitions.css` — named header, no pointer capture, reduced-motion kill switch.
- `lib/capabilities.js` — shared feature gates for later ambient / 3D code.
- Framer enter still runs in the template so the site does not regress before the Next 16 bump.
