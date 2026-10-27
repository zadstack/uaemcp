# README visual provenance

Generated on 2026-07-18 for the Open Emirates package release.

## Deterministic visuals

`bun scripts/generate-readme-visuals.ts` generates the README hero, identity
system, package architecture and every product motion SVG. Exact product names,
counts and evidence boundaries come from the repository contracts and README;
no generative image model is used for factual text or data.

## Live product captures

The files in `screenshots/` were captured from `https://uaemcp.zad.tools` using
headless Chromium after network idle and Dubai Font readiness. Desktop, mobile,
Arabic RTL, product-registry and evidence-product states are represented.

`oei-motion.gif` is assembled from six live Chromium frames covering the public
gateway, product catalogue, MCP tool explorer and Trade Flow Radar. The final
GIF is a deterministic 960 × 540 export with a bounded 128-colour palette.

## Brand contract

- Dubai Font for public product typography.
- Forest, union red, sand, paper and ink palette.
- Sharp grid composition; no gradients, glass effects or invented claims.
- Independent open-source initiative disclaimer retained in the hero.

## Ledger README set (light and dark)

`bun scripts/generate-readme-ledger.ts` writes `docs/assets/readme/`: the hero,
coverage strip, architecture diagram, quick-start terminal and section divider,
each in a `-light` and `-dark` variant selected by `<picture>` and
`prefers-color-scheme`. Counts are read from `coverageSummary()` and
`docs/mcp-tools.json`; `bun run check:readme-ledger` (part of `bun run check`)
fails when they drift. Animations are CSS inside the SVG, run only under
`prefers-reduced-motion: no-preference`, and use no external fonts or scripts.
The palette and type follow DESIGN.md: civic forest, archive ivory, evidence
ink, signal red, registry green and seal gold; Dubai and IBM Plex Mono with
system fallbacks; square corners and ruled surfaces.
