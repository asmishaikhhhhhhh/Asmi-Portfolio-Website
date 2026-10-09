# Design system

Tokens live in `app/globals.css` (`@theme`). Tailwind utilities are generated from them (`bg-paper`, `text-ink-soft`, `rounded-media`, `text-h1`, `shadow-float`, `ease-out-soft`, …).

## Principles

1. **Calm surface, lively work.** The site is quiet paper and ink. Colour and motion belong to the projects (each case study gets its own `accent`).
2. **Motion explains.** Covers play only when you show interest (hover, or in view on touch). One plays at a time. Reduced motion shows composed still frames.
3. **Facts over adjectives.** Proof points and numbers come from the data, never from copywriting.

## Colour (contrast measured against Paper `#f4f0e8`)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| paper | `#f4f0e8` | page background | — |
| paper-deep | `#ebe5d9` | wells, tags, image placeholders | — |
| card | `#fbf9f4` | cards, inputs | — |
| ink | `#1a1916` | headings, primary text, primary buttons | 15.5:1 |
| ink-soft | `#4a4740` | body text | 8.2:1 |
| ink-mute | `#6e6a61` | metadata, captions | 4.7:1 |
| line | `#d8d1c4` | hairlines, borders | decorative |
| forest | `#1f4d3a` | emphasis, "what worked", focus ring | 8.5:1 |
| marigold | `#e3a23b` | ✦, availability dot, highlights. **Never text on paper** (1.9:1); ink on marigold is 8:1 | — |
| marigold-ink | `#8a5a0b` | marigold-family text | 5.2:1 |
| marigold-deep | `#b87a12` | marigold for **large** text only (≥24px), e.g. the key phrases in the home statement | 3.2:1 |
| night | `#15140f` | contact section, footer | paper on night 16:1 |

Project accents are darkened automatically for text (`lib/color.ts → readableOn`) to at least 4.5:1.

## Type

- **Display:** Fraunces (variable; `font-display-soft` = SOFT 100, `font-display-wonk` adds the playful WONK axis for italics and pull quotes).
- **Text/UI:** Geist (variable).
- **Indian scripts (hero name only):** Noto Serif/Sans subsets loaded per glyph via Google Fonts `text=` (~44 KB total, lazy).

| Token | Size (360 → 1440px) | Use |
|---|---|---|
| `text-display` | 56 → 136px, lh 0.92 | hero name, case-study titles |
| `text-h1` | 40 → 72px | page titles, chapter titles |
| `text-h2` | 28 → 44px | section titles |
| `text-h3` | 20 → 26px | card titles |
| `text-lede` | 20 → 28px | intros |
| `text-body` | 17 → 19px, lh 1.6 | body |
| `meta` | 13px, uppercase, +6% tracking | labels, metadata |

## Space, grid, shape

- 4px base; common steps 8, 12, 16, 24, 32, 48, 64, 96, 128.
- `container-page`: max 1440px; side padding 16 → 40px (fluid).
- Grid: 12 columns from `md`; work rows use 7/5 splits, alternating sides.
- Radius: `rounded-tag` 2px · `rounded-control` 10px · `rounded-media` 20px · pills `rounded-full`.
- Shadow: `shadow-float` only on floating UI (nav, chat, previews).

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(.2,.8,.2,1)` | entrances, hovers |
| `--ease-in-out-soft` | `cubic-bezier(.65,0,.35,1)` | loops, wipes |
| fast / base / slow | 160 / 280 / 520 ms | micro / standard / covers |

Reduced motion: all transitions collapse, name rotation stops (click to switch), covers stay on their composed still, drag is disabled.

## Components

| Component | File | Notes |
|---|---|---|
| Nav (desktop floating bar, mobile bottom bar) | `components/layout/Nav.tsx` | desktop bar from `lg` |
| MultilingualName | `components/hero/MultilingualName.tsx` | data in `data/names.ts` |
| Cover (motion / video / image) | `components/covers/Cover.tsx` | compositions in `compositions.tsx`; Leapsters uses `LeapstersShapes.tsx` |
| WorkRow, MoreWork, ThinkingMap | `components/home/` | |
| WorkExplorer (filters) | `components/work/WorkExplorer.tsx` | `?filter=` in URL |
| Case study: CaseHero, QuickRead, ChapterNav, Contribution, NextProject | `components/case/` | |
| Content blocks (17 types) | `components/blocks/Blocks.tsx` | typed in `lib/types.ts` |
| BeforeAfter | `components/blocks/BeforeAfter.tsx` | native range input |
| Ask Asmi | `components/chat/` + `app/api/ask/route.ts` | |
| Pinboard (Clap It clips) | `components/playground/Pinboard.tsx` | |
| Cursor, Magnetic, Reveal, Picture, Needed | `components/ui/` | |

## Voice & copy rules

Keep text consistent when you edit:

| Rule | Do | Don't |
|---|---|---|
| Headings | Sentence case, **no full stop**; question marks are fine | "Every Project, Inside Out." |
| Voice on the site | First person: "I design systems", "My contribution" | Mixing "Asmi does…" into page copy |
| Voice in case studies | **"I"** on solo projects, **"we"** on team projects; reflections stay "I" | "We" on a solo capstone |
| Chatbot | Third person about Asmi ("she…"); it's a guide, not Asmi | Speaking as Asmi |
| Opening a project | **Explore** ("Explore case study", "Explore Leapsters →") | Read / View / Open |
| Lists of things | **See all…** ("See all work →", "See the playground →") | "All work and filters" |
| Resume | **View resume** | "Resume →" |
| Contact | **Let's talk** | "Say hello", "Email me" |
| Arrows | → another page · ↗ leaves the site · ↓ jumps down this page | Arrows on plain text |
| Credits | "Solo project" / "Team project" | "Solo", "Team" |
| Discipline names | UX/UI · Research · Systems & Service · Conceptualisation & Prototyping | "UX / UI" |
| Chapter rail labels | Stage names: Context · Problem · Research · Personas · Insights · Opportunity · Exploration · Prototyping · System · Hardware · Solution · Validation · Reflection (brand and research projects may use Brief · Logo · Applications / Question · Method · Findings) | Story titles in the rail (those go in `title`) |
| Proof points | Lead with the number, no verb: "63 research participants · 122 user tests" | "Task 2 success rose from…" |
| Insight steps | Observation → Insight → Opportunity | "We saw / So we could" |
| Italics | `font-display-wonk italic` only | `font-display-soft italic` |
| Separators | Middle dot with spaces: "Capstone · Learning ecosystem" | "Capstone - Learning ecosystem" |
| Numbers & ranges | Numerals ("5 roles"), en dash for ranges ("2022–26", "ages 5–12") | Hyphen ranges |
