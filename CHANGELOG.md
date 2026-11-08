# RAVORA Clothes & Dry Clean — Upgrade Changelog

## Animation Tuning
All animation timings, easings, and spring parameters are centralized in [`/src/lib/motion.ts`](file:///c:/Documents/Desktop/clothes/src/lib/motion.ts) (and [`/src/lib/motion.js`](file:///c:/Documents/Desktop/clothes/src/lib/motion.js)):
- **`EASE_OUT`**: `[0.22, 1, 0.36, 1]` — For natural entrances, button hovers, and reveals.
- **`EASE_IN_OUT`**: `[0.76, 0, 0.24, 1]` — Editorial luxury cubic-bezier for masks and slide transitions.
- **`DURATION`**: `fast: 0.4s`, `normal: 0.8s`, `slow: 1.2s`.
- **`SPRINGS`**: Smooth, snappy, and magnetic spring configurations.

---

## Phase 1 — Bug Fixes & Brand Foundations (COMPLETED)
- **Brand Palette Setup**:
  - Deep green: `#0B5D3B`
  - Darker green: `#06301F`
  - Gold: `#D9B23C`
  - Cream: `#FAF6EA`
  - Ink: `#0F1A14`
  - Maroon: `#7A1230` (offers only)
  - Pure black and pure white backgrounds completely removed across theme.
- **Typography**:
  - Headings: Playfair Display with tight tracking (`-0.02em`) and leading (`1.02`).
  - Body: Inter.
  - Microcopy / Badges / Numbers: JetBrains Mono (uppercase, `tracking: 0.14em`, 11–12px).
- **Hero Overlap Bug**:
  - Structured the right-column media container with explicit z-index hierarchy (`z-0` main image, `z-10` caption card, `z-20` small floating card & chips).
  - Positioned the small floating card at top-left (`-top-5 -left-4 sm:-top-7 sm:-left-7`) and caption card bottom-anchored, eliminating all overlap at all viewport widths (375px, 768px, 1024px, 1440px, 1920px).
- **Headline Clipping**:
  - Added dynamic top padding `pt-[calc(var(--header-h,80px)+2rem)]` and `min-h-[100svh]`.
  - Applied clamp sizing `text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em]`. Headline is never obscured under the sticky navbar.
- **Trust Badges**:
  - Converted into clean `flex flex-wrap gap-x-6 gap-y-3` row with gold icons and micro-capsule borders.
- **Responsiveness**:
  - Tested at 375, 768, 1024, 1440, and 1920px. Zero horizontal scroll and zero text overlap.
- **Subtle Film Grain Texture**:
  - Added global fixed non-interactive grain overlay (`2.5% opacity`).

---

## Upcoming Phases:
- **Phase 2**: Global experience layer (floating SectionPill progress ring, custom cursor states, preloader curve exit, magnetic interactions).
- **Phase 3**: Section-by-section editorial upgrades (Marquee scroll velocity, services hairline glow grid, 3D tilt offers, drawing progress line, particle booking submit).
- **Phase 4**: Attractiveness & trust extras (Before/After stain slider, FAQ accordion, Why Ravora tiles, floating ripple WhatsApp).
- **Phase 5**: Full performance, SEO, accessibility verification and polish.
