# Audit — asmishaikh.framer.website (Oct 2026)

Sources: raw HTML of `/` and `/about-me`, rendered screenshots at 1440×900, every image on the site.

## What the site is today

| Page | Sections |
|---|---|
| Home | Nav → Hero ("Design that resonates beyond visuals.") with folder illustration, "10+ projects / 2025 / Available for work" → tool icons → "Unfolding My 'Designed' Life" photo strip → Selected projects (Greenly, Clab, Leapsters) → My Design Experiments (Netflix, Fire Safe, Ethnography, Adeiro, Clap It) → "What I can help with" (9 skills) → Value proposition → Contact + form + footer |
| About | "Who I am" stats (counters) → 5 trait chips → "Pixeling with Purpose" bio → Tools (8 cards) → "Through my design lens" (7 jokes) → contact → "I love animals / food / adventure" |

## What works — keep it

1. **The value proposition is genuinely distinctive.** *"Inclined towards connecting far-flung thoughts into a single theme."* It's the truest line on the site, and it matches the work (an ecosystem for farmers, a play-plus-app learning system, AR/VR/hologram training, packaging ergonomics). It's buried near the footer, so the redesign should **build the whole site around it.**
2. **The humour is real and specific.** "My Figma files have more versions than Marvel movies" and "Iterations stack faster than Zomato bills" are local, self-aware and sound like a person, not a template. Keep the voice, but use less of it, put it in better places and make it more grown-up.
3. **The intro to "Selected projects" is the right instinct.** *"Picked not for how they look, but for the lives they touched…"* That's a product-designer framing; the redesign should actually deliver on it.
4. **There are real photos of Asmi presenting work** (research poster, product board, lamp prototypes, a certificate). These are worth more than any illustration, because they show her doing the work.
5. **The palette is calm and recognisable**: cream paper with forest green. It's worth evolving rather than throwing away.

## What doesn't work

### Information architecture
- **Every "Works" link and every project card leaves the site for Behance.** The nav item "Works" goes straight to behance.net. This is the single biggest problem: a portfolio's main job (showing how you think) is handed to a platform where the story is flattened into 40–80 JPEG slides with the text baked in. That text can't be searched, read by screen readers or indexed, and it's unreadable on a phone.
- **Leapsters, the capstone, sits third** and says "Case Study Soon", yet a full case study is already published on Behance.
- The **"Selected projects" and "Experiments" split is unclear**: Fire Safe (a 4-person AR/VR/hologram system) is labelled an "experiment", while Netflix (a redesign exercise) sits next to it.
- **The contact block is repeated three times** in the DOM (Framer breakpoint variants). That's harmless visually but noisy for SEO and screen readers.
- **The About page duplicates the home page footer** and ends with "Go to home" instead of a next step.

### Content
- **There's leftover template copy on the live homepage**: *"Product Copy — Writing concise, persuasive descriptions that showcase the benefits and features of your products or services. [order now]"*. Please remove it now, even before the new site launches.
- **The animated counters show "0+ Passion Projects" and "0.5 GPA/4"** to anyone whose browser doesn't run the animation: crawlers, reduced-motion users, screenshots, link previews. A GPA showing as 0.5 is actively harmful.
- **The page title is "Portfolio"**, with no name, so search results and browser tabs don't say who this is.
- The **skills list is 9 equal-weight labels** with no evidence attached ("Data Visualization", "System Design"); nothing connects a skill to a project.
- The **headline "Design that resonates beyond visuals"** is pleasant but could belong to anyone. It describes design in general rather than Asmi.
- The **hero copy repeats "human-centered experiences that blend creativity with functionality"**, which is the most common sentence on designer portfolios.
- **Image alt text is stock-photo leftover** ("A woman typing content in her laptop", "Women working with laptop in a dark red and black background") and doesn't describe what's actually shown.

### Visual hierarchy
- The **hero illustration (folder plus cursor) competes with the headline** and says "files", not "thinking".
- **Project cards are mockup-on-flat-colour tiles.** The "iOS and desktop concept" label is the most prominent text on the Greenly card, more prominent than the problem it solves.
- **Experiments use a 3×2 grid** where image cells and text cells alternate, so it reads as a template.
- **CTAs are inconsistent**: "View Design", "VIEW PROJECT", "Let's Read", "View Product", "VIEW MORE PROJECT". There are five labels for the same action, in mixed case, and all of them leave the site.

### UX and technical issues
- **The resume link is broken for visitors.** Opening it in a clean browser redirects to a Google sign-in page, so a recruiter clicking "RESUME" may hit a login wall. Check the Drive sharing setting today: it should be "Anyone with the link".
- The **contact form posts to Framer**, giving no confirmation context and no fallback.
- There's a **"Made in Framer" badge** fixed over the content on every screen.
- There's **no project-level SEO**, because the projects don't exist on the domain.

## Keep / redesign summary

| Keep | Redesign | Remove |
|---|---|---|
| Value-prop line ("far-flung thoughts…") → becomes the site concept | Hero, so it says what she does and for whom | "Product Copy / order now" template residue |
| Humour, with fewer, sharper lines placed where they reward curiosity | Work showcase → internal case studies | Counters that render as 0 |
| Cream and green palette, evolved | Skills → grouped, each linked to proof | Tool-logo wall, which carries no signal for recruiters |
| Real photos of Asmi working | About → narrative, not stat counters | Triple-duplicated contact blocks |
| "I love animals / food / adventure" → humanising, kept small | Resume → native page plus PDF | "Made in Framer" badge, stock alt text |
