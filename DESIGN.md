# Design System: Chronos Atelier No. 01

## 1. Overview & Creative Vision
Chronos is an emotional and microscopic journey into independent haute horlogerie. It translates the obsessive craftsmanship of Philippe Dufour, Kari Voutilainen, and Greubel Forsey into a digital storytelling experience. The visual language evokes dark slate watchmaking workbenches, cold surgical 904L cryogenic steel, flame-blued titanium heat treatments, synthetic corundum sapphire prisms, and warm lamplight illuminating micro-anglage bevels.

## 2. Color Tokens & Materials
- **Canvas Base (`--color-obsidian-950`)**: `#07090c` — Deepest matte charcoal slate.
- **Surface Elevation (`--color-obsidian-900`)**: `#0d1117` — Elevated component backdrop with 1px border.
- **Surface Elevated Plus (`--color-obsidian-850`)**: `#141a24` — Interactive cards, loupe dials.
- **Metal Specular (`--color-steel-100`)**: `#f1f5f9` — High-reflection 904L steel specular highlights.
- **German Silver (`--color-maillechort`)**: `#e2d9cc` — Warm raw untreated nickel-silver alloy.
- **Flame Blue (`--color-flame-blue`)**: `#2563eb` / `#38bdf8` — 300°C thermally blued screws and hands.
- **Synthetic Ruby (`--color-ruby`)**: `#e11d48` — Anti-friction jewel pivots.
- **Artisan Gold (`--color-gold`)**: `#d4af37` — Free-sprung balance wheel and chaton rims.
- **Damascus Smoke (`--color-damascus`)**: `#334155` — Folded metallurgical grain.

## 3. Typography & Hierarchy
- **Display Serif / Heritage**: Cormorant Garamond / Playfair Display / Serif — for authoritative horological headings, series numbers, and craftsmanship statements.
- **Technical & Metric Sans**: Inter / JetBrains Mono (tabular figures) — for frequency, tolerances, microns, jewel counts, and reservation serials (`font-variant-numeric: tabular-nums`).
- **Scale Rules**:
  - Hero Display: `3.5rem` to `5rem` (`tracking-tight`), uppercase, confident, no generic gradient text.
  - Section Headings: `2rem` to `2.75rem`, clear contrast, breathing room above and below.
  - Micro-Data Readouts: `0.75rem` to `0.875rem`, uppercase, tracked `0.08em` for engineering rigor.

## 4. Layout & Spacing
- **Negative Space**: Generous vertical rhythm (`py-28` to `py-36`) to grant each horological achievement isolated focus.
- **Card Discipline**: Single-layer physical cards with crisp 1px borders (`border-white/10` or `border-white/15`). No noisy drop-shadow stacks or nested cards.
- **Parallax Hierarchy**:
  - Layer 0: Background dark radial ambient lighting.
  - Layer 1: Macro horological photography and visual assets.
  - Layer 2: Floating technical metric calipers and annotation pins.
  - Layer 3: Narrative copy and reservation triggers.

## 5. Signature Micro-Interactions
- **Interactive Watchmaker Loupe**: 3.5x real-time magnification lens over the Calibre movement, revealing mirror anglage and jewel chatons.
- **Interactive Calibre Beating Simulator**: Live tick-tack 4 Hz (28,800 vph) escapement pulse with toggleable acoustic heartbeat.
- **Tactile Bespoke Configurator**: Live switcher across 904L Steel, Damascus Steel, and 18K Rose Gold with updated specs and real-time serial allocation.
- **Numbered Pre-Order Allocation**: Limited allocation of 25 serialized slots worldwide with dynamic reservation form, certificate preview, and reservation confirmation.
