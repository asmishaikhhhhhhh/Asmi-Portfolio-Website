# Asmi Shaikh — Portfolio: Experience & Architecture Proposal

Status: **proposal, awaiting sign-off**. Sources: the audit in `01-audit-current-site.md`, transcriptions of all 351 Behance slides in `sources/*.md`, and the resume Asmi supplied (`sources/resume.md`).

---

## 1. What the source material actually says

### Project inventory (verified)

| Project | Type | Team | Strongest evidence on the slides | Biggest gap |
|---|---|---|---|---|
| **Leapsters** | Capstone · play-based learning ecosystem (board game + app "Koko") | Solo (not stated) | 63 research participants (17 students, 14 teachers, 30 parents, 2 counsellors), classroom camera study, 30+ concept sketches → 3 shortlisted → 1, 122 user tests, honest negatives (game too long for younger kids, XP system not understood) | Role statement, year, mentor, the source for "70% of Grade 3 students…", what changed after testing |
| **Greenly** | Ecosystem/service design: hydroponic units + IoT + dashboards + consumer app + solar food truck | "We" on slides; Behance owner is Asmi alone | Double diamond, 6-layer system architecture, two physical prototypes, 4 personas each with journey map and usability findings, business model canvas, sensor spec | Team, role, research sample sizes, how testing was run, stat sources |
| **Fire Safe** | AR + hologram + VR firefighter training system | 4 people (with Anwesha Patnaik, Anushka K, Lyric Gupta) | 39 papers and 21 articles; 35 interviews (25 trainees, 10 officers); BMC ecosystem map; **3 concepts, 2 killed with stated reasons**; Unity VR prototype with 12 interactions | Asmi's individual contribution (not on any slide), year, testing method behind "8+" |
| **Clab** | Networking platform for students, professionals and companies | Asmi + "Adele p." | 63 lit sources, 35 survey responses, 30 interviews, 9 competitors, 2 personas, 3 role-based task flows, testing with 20 users | Adele's role, outcomes, what changed after testing, real secondary colours |
| **Netflix (mobile web)** | UX redesign + usability testing | Asmi + Deep Udeshi | **The only before/after metrics in the portfolio**: task success 50→80%, confusion 70→40%, rating 2→4/5, time 34→40s (got worse, and the slide explains why) | Split of work, number of participants |
| **Fiama** | Packaging redesign (ITC Fiama gel bar) | Asmi + Sarah Anil | Annotated audit of the existing pack, positioning and perceptual maps, before/after pairs for front, back and fine print | Split of work; the redesign was never tested |
| **Clap It** | Physical product: ergonomic board clip | Solo | Mind map → 9 sketches → foam and paperclip mock-ups → CAD → final; materials; 75 hours | Year, test results, learnings |
| **Adeiro** | Brand identity (fictional skincare brand) | Solo | Full brand manual: monogram construction, palette, type, stationery, packaging, physical prototypes | Moodboard/explorations; slide 28 shows a personal address and phone number, so **it will not be used** |
| **Celestial Influence** (Medium) | Ethnographic study | Solo | 16 interviews, 2 focus groups, content analysis; Believers / Enthusiasts / Sceptics typology | — |

Plus, from the resume: **5 roles** (Aistrike Cybersecurity, Quawd, Child Help Foundation, Dilatio & Co., Rotaract), an **Award of Excellence** (NMIMS Research Embedded Learning Symposium, Jan 2025) and a **published white paper** (IIP Series, 2024).

### What that tells me about Asmi as a designer

The pattern across the work is clear, and it's more specific than "multidisciplinary":

> **She designs systems, not screens.** Almost every project combines physical and digital parts (a board game plus an app, hydroponic units plus sensors plus dashboards, hologram plus AR plus VR), and almost every one starts from heavy primary research with real numbers.

That is a strong, rare positioning for a student portfolio, and the current site hides it behind "human-centered experiences that blend creativity with functionality." Her own line is the better one: *"connecting far-flung thoughts into a single theme."*

---

## 2. Where I'm pushing back on the brief

1. **"Don't reveal the Leapsters solution immediately" — partly.** A story-led case study is right for the curious visitor, but the brief's own audience (a recruiter reviewing many portfolios) often gives a case study a minute or two. **Proposal:** every case study opens with a collapsed **"60-second version"** card (problem → insight → solution → result, with one image). The full story underneath uses chapters and progressive disclosure. You get both kinds of reader, and offering the summary is itself a UX decision a design lead will notice.

2. **Nine filters for nine projects is a broken filter.** Most filters would show one card. **Proposal:** five filters derived from the data (All · Research · UX/UI · Systems & Service · Conceptualisation & Prototyping), with counts shown and empty filters hidden automatically. If you add projects later, filters can grow.

3. **The brief asks for a lot of interaction: hero toy, brain map, custom cursor, multilingual name, animated covers.** Together that's the "effects everywhere" problem the brief warns against. **Proposal:**
   - The **multilingual name** is the hero's only animated element. It isn't decorative: one person moving between many languages is a direct metaphor for "multidisciplinary".
   - The **"how I think" map** is the one deep interaction, and it's made meaningful (see §4.2).
   - **Motion covers** play only when a project is in view (mobile) or hovered (desktop), and never more than one at a time.
   - The **cursor** is a small dot that grows into a label ("View case") only over work. It's turned off on touch screens and for reduced motion.

4. **Fire Safe and Netflix are not "experiments".** Fire Safe has the most rigorous decision trail in the portfolio (two concepts killed for stated reasons). Netflix has the only quantitative before/after. Both get promoted.

5. **The chatbot should not pretend to be Asmi.** A bot that says "I'm available from June, I'd love to join you" is making promises you never made. **Proposal:** "Ask Asmi ✦" is the label (clear to recruiters), but the assistant speaks *about* Asmi in the third person as her portfolio guide, and it can only answer from verified data (see §6).

6. **Don't reuse slides as images.** Most Behance slides are text baked into JPEGs. On the new site every heading, quote, statistic and insight becomes real HTML, so it's accessible, searchable, translatable and readable on a phone. Slides are reused only for actual visuals: UI, renders, photos and sketches.

7. **Fix the source errors instead of copying them.** The transcriptions found duplicated persona names, wrong hex codes, a reversed slide order and typos baked into slides. These are listed in §9 for you to confirm.

---

## 3. Information architecture

```
/                       Home: the narrative
/work                   All work, filterable (no reload)
/work/leapsters         Flagship case study (chaptered)
/work/greenly
/work/fire-safe
/work/clab
/work/netflix-mobile    Focused case study
/work/fiama
/work/clap-it
/playground             Experiments: Adeiro, Celestial Influence, white paper, illustration
/about                  The person behind the pixels
/resume                 HTML resume + PDF download
/contact                Contact (also a section at the end of every page)
Ask Asmi ✦              Global, available on every page
```

Navigation: `Asmi` · Work · Playground · About · Resume · **Ask Asmi ✦** · Contact (button).
- **Desktop:** a slim floating bar that hides on scroll down and shows again on scroll up. The current section is marked.
- **Mobile:** a bottom-anchored bar with Work, About, Ask and Menu, within thumb reach, and a full-screen menu sheet.

### Visitor journey → what answers each question

| The visitor thinks… | Answered by |
|---|---|
| "Who is this?" | Hero: multilingual name, one-line positioning, availability, location |
| "What does she do?" | Hero line plus a proof strip (degree · 5 roles · award · published paper) |
| "Is the work interesting?" | Selected Work, directly below the hero (the first project peeks above the fold) |
| "How does she think?" | The "How I think" map, which links each way of thinking to the projects that prove it |
| "Does she really do research?" | The research and evidence chapters in every case study, with real numbers |
| "Who is she as a person?" | About page and the personality in the copy |
| "Can I ask something quickly?" | Ask Asmi ✦ |
| "How do I reach her?" | A persistent Contact button and the closing section on every page |

---

## 4. Homepage, section by section

### 4.1 Hero

```
 ┌─────────────────────────────────────────────────────────────┐
 │  अस्मी शेख़                                       ● Available │
 │  ── Hindi ·  2/12                                for 2026    │
 │                                                             │
 │  I connect far-flung ideas into                             │
 │  experiences that feel simple.                              │
 │                                                             │
 │  Multidisciplinary designer · B.Des Humanising Technology,  │
 │  NMIMS · Mumbai. I design systems: research, products,      │
 │  services and the screens in between.                       │
 │                                                             │
 │  [ Explore work ↓ ]   About me →   Resume ↗                 │
 │                                                             │
 │  ▔▔▔▔▔ first project's motion cover peeks in here ▔▔▔▔▔▔▔▔   │
 └─────────────────────────────────────────────────────────────┘
```

**The multilingual name.** "Asmi Shaikh" cycles through the scripts of India, roughly 2.6 seconds per script, with a soft blur crossfade. A small caption names the current language ("Marathi · 3/13"), which turns a pretty effect into a moment of discovery. Clicking or tapping advances to the next script.
- Scripts proposed: English, Hindi/Marathi (Devanagari), Urdu (Nastaliq), Gujarati, Bengali/Assamese, Gurmukhi (Punjabi), Odia, Tamil, Telugu, Kannada, Malayalam, Ol Chiki (Santali), Meitei Mayek (Manipuri).
- Languages that share a script are shown once. Hindi and Marathi share Devanagari, so the caption reads "Hindi · Marathi" rather than repeating the same glyphs.
- **Accessibility:** the heading's accessible name is always "Asmi Shaikh", and the rotating layer is hidden from screen readers. Reduced-motion users see the English name plus a static row of three scripts. The rotation pauses when the tab is in the background.
- **Performance:** each script loads a tiny font subset containing only the glyphs for "Asmi Shaikh". That's a few KB per script, loaded lazily *after* the page is interactive.
- ⚠️ **Spellings need a native-speaker check** before launch, especially Urdu (عاصمی vs اسمی depends on your name's origin), Ol Chiki and Meitei Mayek.

**Headline options** (pick one, or I'll keep iterating):
- A. *"I connect far-flung ideas into experiences that feel simple."* (your own value proposition, made active)
- B. *"Designing systems where people, products and screens make sense together."*
- C. *"Curious about people. Stubborn about simplicity."*

### 4.2 "How I think": the one deep interaction

Seven nodes: **People · Research · Systems · Play · Stories · Visuals · Technology**.
- **Hover or tap one node:** a one-line belief appears ("Research: I don't trust my first idea until 60 people have argued with it") plus **chips linking the projects where this was central**.
- **Pick two nodes:** a thread draws between them and the site shows **the project that lives at that intersection**. For example:
  - People × Technology → Fire Safe
  - Play × Research → Leapsters
  - Systems × People → Greenly
  - Visuals × Stories → Adeiro
- This is "connecting far-flung thoughts" as an interaction, and it doubles as a navigation tool.
- **Keyboard:** nodes are a toggle-button group; arrow keys move between them and Enter selects. **Mobile:** a 2-column grid of chips instead of a free-floating map.
- *The belief lines need your voice. I'll draft them, clearly marked `[DRAFT — Asmi to approve]`.*

### 4.3 Selected work: an editorial index, not a card grid

Four flagship projects as large editorial rows: Leapsters, Greenly, Fire Safe, Clab.

```
 01  Leapsters                                  [ motion cover ─────── ]
     Nurturing confidence through play          [                      ]
     Capstone · Research, Product, UX           [                      ]
     Board game + app for ages 5–12             [ ──────────────────── ]
     63 participants · 122 user tests  →  Read the case study
```

- **Desktop:** text column on the left, cover on the right, alternating sides. Hovering a row plays its cover and the cursor becomes "View case".
- **Mobile:** cover on top, title and metadata below. The cover plays when it's 60% visible.
- Each row shows **one proof point** (a real number from the slides), because that's what recruiters remember.
- Below the four rows, a compact **"More work" index** (Netflix, Fiama, Clap It) as text rows with a hover preview that follows the cursor. Then "See all work →".

### 4.4 Motion covers (your request, inspired by aruinthehouse.com)

On the reference site each cover is a ~100 KB looping MP4 with a still image shown first. I'll build the same capability, with one difference:

- **The cover system supports three types:** `video` (MP4/WebM plus poster), `motion` (a coded composition) and `image`. Switching a project to a video later means changing one line in its data file.
- **Initially every project gets a coded "living cover"** built from its *real* assets. Your projects don't have screen recordings yet, and coded motion stays crisp at any size and weighs almost nothing:
  - **Leapsters:** challenge cards deal onto the mat, Koko's app screen slides up beside them.
  - **Greenly:** sensor readings tick (pH, humidity), the dashboard updates, the food truck rolls in.
  - **Fire Safe:** the three training modes (hologram → AR → VR) step through, with a pulse marking the current mode.
  - **Clab:** the three role-based home screens fan out (company, professional, student).
  - **Netflix:** an old → new wipe on the browse screen, with the success-rate counter changing from 50% to 80%.
  - **Fiama:** an old → new pack wipe.
  - **Clap It:** sketch → foam mock-up → render, then a clip snaps onto a page.
  - **Adeiro:** the monogram draws in, then the palette and the product range.
- **Rules:**
  - Covers pause off-screen, and only one plays at a time.
  - With reduced motion, the cover shows a still frame.
  - If you later export real screen recordings, I'll provide a one-command script to compress them to ~100–300 KB loops with posters. (This needs ffmpeg, which isn't installed on your Mac yet.)

### 4.5 Proof strip, Playground teaser, Contact

- **Proof strip:** Award of Excellence (NMIMS RELS, 2025), Published white paper (IIP Series, 2024), and 5 roles (Aistrike, Quawd, Child Help Foundation, Dilatio & Co., Rotaract). These are facts, not "10+ projects".
- **Playground teaser:** a small pinboard whose cards are held up by **Clap It clips**, your own product used as the UI. The cards can be dragged.
- **Contact:** headline *"Got a messy problem? I like those."* (draft), with email (copy-to-clipboard), LinkedIn, Behance, Resume and a 3-field form.

---

## 5. Case study system

### 5.1 Template

Every case study is **data, not a page**: a typed list of content blocks rendered by one template.

```
Hero          title · one-liner · tags · year · role · duration · team · motion cover
60-second     collapsible: Problem → Insight → Solution → Result
Chapters      sticky chapter rail (desktop) / progress bar + chapter menu (mobile)
  Context · Problem · Research · Insights · Exploration · Solution · Validation · Reflection
My contribution  "What I did / What the team did", always shown and never buried
Next project  big link to the next case study, plus "View on Behance ↗" (secondary)
```

Block types (each a reusable component): `text`, `pullQuote`, `stat` and `statGroup`, `researchMethods` (an animated count-up of participants by group, readable without motion), `persona`, `journey`, `insightChain` (Observation → Insight → Opportunity, revealed one step at a time), `conceptFunnel` (30 sketches → 3 → 1, with reasons why ideas were killed), `beforeAfter` (a keyboard-accessible slider), `gallery`, `deviceShowcase`, `testingResults` (positives and negatives side by side), `callout`, `contentNeeded` (a visible placeholder, shown only in development builds).

### 5.2 Leapsters, the flagship arc

1. **The quiet kid.** Open on the emotional barrier, not the app.
2. **The gap.** The literacy statistic (once it has a source) and why fluency without confidence fails.
3. **63 people.** A research-methods block: students, teachers, parents, counsellors and the classroom camera study.
4. **What we heard.** Insight chains from the affinity maps.
5. **The opportunity.** The HMW statement.
6. **30 ideas, 3 survivors.** The concept funnel, with what killed the others.
7. **Reveal: the Leapsters ecosystem.** Board game plus Koko app, and how the two hand off to each other.
8. **122 tests later.** What worked, and what didn't (game length, the XP system).
9. **What I'd do next.** Reflection *(content needed)*.

A "Skip to the solution" chip is always available; it's progressive disclosure without hiding anything.

---

## 6. Ask Asmi ✦ — the chatbot

**Experience**
- A pill button at the bottom right reading "Ask Asmi ✦". The ✦ twinkles once on first load, then stays still.
- It opens a 380×560 panel on desktop and a near-full-height bottom sheet on mobile, which respects the on-screen keyboard and can be swiped down to close.
- **Starter questions** change by page. On /work/greenly it suggests "What was Asmi's role in Greenly?"
- Answers can include **deep-link buttons** ("Explore Leapsters →") and quick actions (copy email, open resume).
- **Accessibility:** focus is trapped while the panel is open and Esc closes it. Messages are in a log region that screen readers announce, and every control works from the keyboard.

**Grounding architecture (it can't invent things)**

```
data/portfolio.ts  ← single source of truth (profile, education, experience,
                     skills, tools, projects, recognition, contact, faq)
        │
        ├── renders the website
        └── lib/ask/knowledge.ts → compact knowledge pack
                 │
   /api/ask  ────┤  1. Claude (claude-haiku-4-5): system prompt = knowledge pack +
                 │     strict rules ("answer only from the data, otherwise say you
                 │     don't know and offer her email"). Returns JSON:
                 │     { answer, links: [slug] }. The server rejects any slug
                 │     that doesn't exist.
                 └── 2. Fallback: a local intent matcher over the same data,
                       used when there's no API key or the API fails.
                       Deterministic, free, cannot hallucinate.
```

- **Abuse protection:** rate-limited per IP, message length capped, responses short, nothing stored.
- **Cost estimate:** very low with Haiku (a few rupees per hundred conversations).
- **Needed from you:** an Anthropic API key, added to the host's environment settings. You never paste it into chat. Without a key it still works in fallback mode.

---

## 7. Visual system

| Token | Decision | Why |
|---|---|---|
| **Display font** | **Fraunces** (variable; uses the "soft" and "wonk" axes for personality at large sizes) | Editorial and warm, with a slightly playful quirk that matches the humour |
| **Text/UI font** | **Geist** (variable) | Neutral, very legible, good tabular numbers for metadata |
| Indic scripts | Noto Sans/Serif subsets, **for the name only** | The one justified exception to the two-font rule |
| Paper | `#F4F0E8` | Evolves the current cream |
| Ink | `#1A1916` | Strong contrast on Paper |
| Forest | `#1F4D3A` | The current green, deepened to pass contrast for text |
| Marigold | `#E3A23B` | A sparing accent: availability dot, "connection" lines, ✦ |
| Line | `#D8D1C4` | Hairlines and dividers |
| Each project | its own accent colour, used only inside its case study (e.g. Leapsters' crayon palette) | Projects keep their identity; the site stays calm |
| Type scale | Fluid with `clamp()`: Display 56–136 · H1 40–72 · H2 28–44 · H3 20–26 · Body 17–19 · Meta 13 (uppercase, tracked) · Label 12 | Sharp contrast between levels |
| Grid | 12 columns, 24px gutter on desktop · 8 columns on tablet · 4 columns, 16px gutter on mobile; max width 1440 | |
| Spacing | 4px base: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 | |
| Radius | 2 (tags) · 10 (inputs, buttons) · 20 (media) · full (pills) | Mostly sharp and editorial, softer on interactive elements |
| Shadow | One soft shadow, used only for floating UI (nav, chatbot) | No card shadows |
| Motion | Fast 160ms · Base 280ms · Slow 520ms · easing `cubic-bezier(.2,.8,.2,1)`; reduced motion turns off travel and keeps opacity changes | Fast, purposeful, subtle |
| Images | 20px radius, a slight warm cast on hover, alt text describing *what's shown* | |

---

## 8. Technical architecture

**Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · `@anthropic-ai/sdk` (chatbot only) · `sharp` (image build). No other runtime libraries. Recommended host: **Vercel**.

```
app/
  layout.tsx                 fonts, nav, chatbot, cursor, JSON-LD (Person)
  page.tsx                   home
  work/page.tsx              filterable index
  work/[slug]/page.tsx       case study (generateStaticParams + generateMetadata)
  playground/ about/ resume/ contact/
  api/ask/route.ts           chatbot
  api/contact/route.ts       contact form (Resend, or mailto fallback)
  sitemap.ts  robots.ts  opengraph-image.tsx (per-project OG images)
components/
  layout/   Nav, MobileNav, Footer, ContactSection, PageTransition
  hero/     MultilingualName, Hero
  home/     ThinkingMap, SelectedWork, WorkRow, MoreWorkIndex, ProofStrip, Pinboard
  case/     CaseHero, QuickRead, ChapterRail, ContributionPanel, NextProject
  blocks/   Stat, PullQuote, ResearchMethods, InsightChain, ConceptFunnel,
            BeforeAfter, Persona, Gallery, DeviceShowcase, TestingResults, …
  covers/   Cover (video | motion | image), compositions/LeapstersCover.tsx, …
  chat/     AskButton, ChatPanel, Message, SuggestedPrompts
  ui/       Button, MagneticButton, Tag, Cursor, Reveal, Filter
data/
  portfolio.ts               profile, education, experience, skills, tools, recognition, contact
  projects/leapsters.ts …    one file per case study (typed blocks)
  names.ts                   multilingual name strings and font subsets
lib/
  types.ts  ask/knowledge.ts  ask/fallback.ts  seo.ts  motion.ts
public/images/projects/<slug>/…   optimised WebP (already prepared: 351 images, 21 MB)
scripts/
  optimise-images.mjs  make-video-cover.sh
```

**Performance targets:** Lighthouse 95+ on mobile; under 120 KB of JavaScript on first load for the home page; images use responsive `srcset` and load lazily; covers pause off-screen; fonts are variable and subset.

**SEO:**
- Per-page titles: "Leapsters — Play-based English learning ecosystem · Asmi Shaikh".
- Descriptions, canonical URLs and Open Graph images (generated per project).
- JSON-LD structured data: `Person` on the home page, `CreativeWork` on each case study.
- `sitemap.xml` and `robots.txt`.
- Semantic headings: one `h1` per page.

---

## 9. Source errors to confirm (found during transcription)

- **Leapsters:**
  - The hex codes on slide 31 don't match their colours.
  - The Behance slide order is wrong (slides 23–26).
  - Slide 04 contains a leftover "Online Work Collaboration App" mind map, and slide 14 an unrelated "smoke simulation" note.
- **Fire Safe:**
  - Both personas are named "Arjun Kumar".
  - The officer persona says both "8 years" and "two decades" of experience.
  - The assessment stage is given as weeks 13–16 on one slide and 21–24 on another.
  - Many of the photos look like stock images.
- **Clab:**
  - The secondary hex codes duplicate the primary ones.
  - Persona "Arihant" is called "Alex" in his bio.
- **Greenly:**
  - Primary and secondary colours are both #96DE84.
  - The pH alert shows 7.8 while the card behind it shows 4.8.
  - Slide 70 shows a phone number and address, and slide 72 an email address. These will be blurred.
- **Adeiro:**
  - Slide 28 shows personal contact details (excluded).
  - Several mockups contain "Borcelle" template text.
  - Typos are baked into the slides.
- **Fiama:** the second persona is listed as a "Home maker" but described as a "travel writer and photographer".
- **Netflix:** two of the three personas have identical goals.

---

## 10. Content needed from Asmi (so far)

**Every team project** (Fire Safe, Clab, Netflix, Fiama, and Greenly if it was a team): *what you personally did*, in 3–5 bullets. This is the most important item for recruiters.

**Leapsters**
- Year and duration
- Guide or mentor
- Tools
- The source for the "70% of Grade 3 students" figure
- What the Fun / Simple / Adaptive percentages measure
- What changed after the 122 tests
- Your reflection

**Greenly**
- Team, duration and year
- Research sample sizes
- How testing was run, and with how many people
- Sources for the market statistics

**Fire Safe**
- Year and duration
- What "8+" on the testing slide means
- Whether the VR prototype was tested with trainees

**Clab**
- Adele's role
- Duration and year
- What changed after testing

**Netflix:** number of test participants, duration and year.

**Fiama:** duration, year and the brief (course? client?).

**Clap It:** year, plus any test feedback or learnings.

**Experience:** one or two lines on what you did at Aistrike, Quawd, Child Help Foundation and Dilatio & Co.

**Assets**
- The resume as a PDF
- Permission to use the photos from the current site (headshot, presenting shots, dog, food, parasailing)
- Any screen recordings or prototype videos (for video covers)

**Name:** check the spellings of "Asmi Shaikh" in each script, especially Urdu.

**Voice:** approve or edit the drafted "How I think" lines and the section headlines.

**Services/keys:** an Anthropic API key (chatbot), a Resend key or a preferred form service (contact), and the domain you want.
