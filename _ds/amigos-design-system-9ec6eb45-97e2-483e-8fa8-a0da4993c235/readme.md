# Amigos Design System

Digital design system for **Amigos a gyerekekért Alapítvány** (amigos.hu) — the "Amigos grew up" evolution of the existing identity. Not a rebrand: same logo, same green, same characters; a more editorial, typographic and spacious digital expression with a distinctive graphic signature.

## Context

Amigos is a Hungarian nonprofit founded in 2014 by 11 friends, now 300+ university-student volunteers ("Amigók") in 6 cities and 20 hospital units. Amigók visit hospitalised children weekly and play, learn languages and befriend them. Vision: *Legyen minden beteg gyerek mellett egy Amigo!* Slogan: *A barátság csodákra képes.* Secondary: *Legyen profi a nonprofit!*

Audiences of amigos.hu: prospective student volunteers (recruitment), private and corporate donors (donation, adó 1%), institutions and press (impact, transparency), children and parents (Kalandozz!, Amigos Mini, TanulTablet).

### Sources
- `uploads/2025_Amigos Brandbook Kisokos.pdf` — 15-page internal brandbook (2019, updated 2025). Text extracted to `guidelines/brandbook-text.md`; images to `assets/`. **Source of truth** for logo, colors, characters, tone rules.
- GitHub `https://github.com/vizyk003/amigos` — contains only `Amigos logó.svg` (bitmap-in-SVG; pixels not retrievable via API — logo PNGs come from the brandbook instead). See `github.md`.
- amigos.hu (live site, Sept 2026) — copy, navigation labels, statistics, bank details.
- Four uploaded screenshots of the character set (`assets/characters/`).
- The project brief in the chat request (objectives, brand architecture, out-of-scope list).

### Scope
This is the visual foundation only (tokens, type, color, graphic language, core UI primitives). No website or screens are part of the system — those belong to the later UX/UI phase and are built by consuming projects.

- **Master brand** — editorial, typographic, no characters.
- **Sub-brands** (Amigos Mini, TanulTablet, Amigos Online / Kalandozz!) — where characters, Amatic and the brush ribbons live; assets in `assets/sub-brands/` and `assets/characters/`.

## Content fundamentals

- **Language**: Hungarian first. Informal second person singular *Te* ("Legyél Te is Amigo", "Támogasd a munkánkat"), capital *Te* in CTAs. Organisation speaks as *mi* ("Célunk, hogy…", "vagyunk").
- **Names**: *Amigos a gyerekekért Alapítvány* or short *Amigos*; avoid "Alapítvány" unless formal. Volunteers: *Amigo* / *Amigók* — always capitalised, long ó when inflected. Compounds hyphenated: *Amigo-felelős*. Special forms: *Amigos Akadémia, Amigos felvételi, Senior Amigo, Amigos Familia, Amigo Avató*. Never "gyermekekért".
- **LEGO**: always uppercase, never inflected ("LEGO kockákkal", not "legóztunk").
- **Tone**: kedves, közvetlen, érzelmes, tömör. Storytelling, plain language (no internal acronyms). Every donation ask ends in a clear CTA ("Segíts te is a beteg gyerekeknek!") and shows the bank account.
- **Child dignity**: never name or identify children; photos only with parental consent; no pity framing. Emotional core: *a sick child should not be alone; children stay children in hospital*.
- **Emoji**: brandbook sanctions emoji on social posts (💚 CÍM 💚). **Not used in the web UI** or master-brand digital design.
- **Numbers**: Hungarian thousands with a space ("20 770"), Ft after the amount ("5 000 Ft"), dates "2026. szeptember". Prefer time-stable figures (hány Amigo, hány gyerek).
- **Headline style**: sentence case, short, concrete ("Egy beteg gyerek se legyen egyedül."). Eyebrows in caps label style.

## Visual foundations

**Colors** — Brand: green-700 `#437613` (primary), green-500 `#6DA834` (decorative only, 2.9:1), green-200 `#B2C7A3` (pale field), purple `#993166` (donation accent). Derived tonal ramp green-50…900, purple-50/100/700. Warm neutrals (paper `#FAFAF6`, ink `#171C12`). Functional colors are separate (error/warning/info/success) and always paired with an icon or word. Rule: one green field per screen; purple does one job per page; brush red/yellow are sub-brand only. Contrast tests in `guidelines/colors-contrast.html`.

**Type** — Familjen Grotesk 600 for display/headings (tight −0.02em, leading ≈1.0), Instrument Sans for body/UI (17/1.55, 64ch), Instrument Serif italic for pull quotes only. Amatic SC survives only inside the logo and kids' sub-brands. Full scale in `tokens/typography.css` (hero/H1–H5/body L-M-S/caption/label/nav/button/stat/quote) with clamp() desktop→mobile. Alternatives explored: Bricolage Grotesque (B), Schibsted Grotesk + Source Serif 4 (C).

**Shape** — The logo's circle is the only shape: image masks, ring bullets, pagination, radio, accordion toggle, cropped tonal discs. Radius: 0 for sections/fields, 12px cards/images/buttons/inputs, 24px dialogs, pill for tags only. Don't round everything.

**Graphic signature** — "Kör + betű": (1) circle motifs, (2) oversized cropped display type in tonal green (green-800 on green-700, green-300 on green-200, green-100 on white), (3) "kötés" 2px connection arcs for maps/timelines, (4) brush texture tamed into a circle or edge band. Components `TypePattern`, `CircleMotif`. Never behind body text.

**Layout** — 12-col, container 1280 (narrow 840), gutter clamp(20,4vw,48), section rhythm clamp(64,9vw,128). Asymmetric splits (7/5, 5/6), hairline lists instead of card grids, sticky left columns for long content. Breakpoints 640/840/1120/1440; grid 4/6/12 cols.

**Backgrounds** — Paper page; one flat color field (green-700, green-900, green-200 or purple) per screen with a tonal motif. No gradients. Brush textures only as cropped accents.

**Photography** — Real Amigók and children together, mid-activity, natural color, circle or 4:5 crops. Never sad-hospital, never "helper above patient". No usable photos were provided; cards use neutral green-100 placeholders.

**Characters** — Not part of the master brand. Aladár, Abigél and the lineup are sub-brand assets (Amigos Mini, TanulTablet, Kalandozz!) on purple/yellow fields. No component takes a character prop.

**Elevation & borders** — Flat. 1px `--am-line` borders; 2px brand border for emphasis and all controls; shadow (`--shadow-float`) only on dialogs/menus. No card shadows.

**Motion & states** — 120–200ms ease-out. Hover: filled buttons darken one step (700→800), outline buttons fill green-50, links thicken underline, cards underline title + 2% image scale. Press: 1px translate. Focus: 2px green outline + 3px green-200 ring. Selection: green-200/green-900.

**Transparency/blur** — none, except 12% white hover on inverse-outline buttons and a 50% ink scrim under dialogs.

## Iconography

The current site uses WordPress/Divi defaults and no icon system; the brandbook has hand-drawn graphics (sun, heart, astronauts) but no UI icons. **Substitution: Lucide** (CDN `https://unpkg.com/lucide@latest`), 1.5–2px stroke, 20/24px, ink or brand green — matches the hairline grammar. Components ship with the few inline glyphs they need (chevron, check, plus). Status uses a filled circle + glyph, never colour alone. No emoji in UI. Unicode arrows (→) are used in text links. Brand graphics in `assets/graphics/` are campaign/merch assets, not icons.

## Expression dial
1 · Master quiet (impact, donation, documents): paper, hairlines, one small tonal circle.
2 · Master loud (recruitment, campaigns): green field, oversized type pattern, inverse buttons. Still no characters.
3 · Sub-brand (Mini, TanulTablet, Kalandozz!): purple/yellow fields, Amatic title, characters, brush ribbons.

## Index

Root: `styles.css` (imports) · `tokens/` (fonts, colors, typography, spacing, base) · `assets/` · `components/` · `guidelines/` · `thumbnail.html` · `SKILL.md` · `github.md`

### Components (`window.AmigosDesignSystem_9ec6eb`)
- core/: Button, Tag, Badge, Card, Stat
- forms/: Field, Input, Select, Checkbox, Radio, RadioGroup, AmountPicker
- navigation/: SiteHeader, SiteFooter, Tabs, Breadcrumbs, Pagination
- feedback/: Alert, Dialog, Accordion
- sections/: Hero, SectionHeader, CtaBand, ImageBlock, Quote, TypePattern, CircleMotif

Intentional additions (no source component library exists): AmountPicker (donation flow), TypePattern/CircleMotif (graphic signature), Quote (editorial accent).

### Guidelines cards
- Colors: primary, accent, neutrals, semantic, fields, contrast
- Type: display, headings, body, editorial, data, UI, legacy mark
- Spacing: scale, grid, radius, elevation
- Brand: logo, backgrounds, photography rules
- Sub-brands: characters, sub-brand marks, legacy hand-drawn graphics
- Graphic Language: circle, type pattern, lines, brush, expression dial
- Directions: three explored directions (A developed)

### Assets
- `assets/logo/` — alap, inverz, outline, értékes, kontakt, mini (transparent PNG from brandbook)
- `assets/characters/` — lineup, Aladár & Abigél (sub-brand use only)
- `assets/sub-brands/` — Amigos Mini, TanulTablet, Amigos Online, Kalandor
- `assets/backgrounds/` — brush green/purple/red · `assets/graphics/` · `assets/merch/`

## Caveats
- Fonts load from Google Fonts (no binaries in repo). Amatic SC included for the logo face only.
- Logo is raster PNG (484px) — a vector master is needed for print.
- No usable photography was provided; supply real consented photos before applying the system.
