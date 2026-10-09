# Asmi Shaikh — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Claude (Ask Asmi)

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (must pass before deploying)
```

## Deploy (Vercel recommended)

1. Push this folder to a GitHub repo and import it in Vercel.
2. Add environment variables (Project → Settings → Environment Variables):

| Variable | Needed for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | SEO, sitemap, social cards | e.g. `https://asmishaikh.com` |
| `ANTHROPIC_API_KEY` | Ask Asmi (AI answers) | Without it the bot uses its local, data-only matcher |
| `ASK_MODEL` | optional | Defaults to `claude-haiku-4-5` |
| `RESEND_API_KEY` | Contact form | Without it the form offers a prefilled email instead |
| `CONTACT_FROM` | Contact form | A sender on a domain verified in Resend, e.g. `Portfolio <hello@asmishaikh.com>` |
| `CONTACT_TO` | optional | Defaults to `shaikhasmi003@gmail.com` |
| `SHOW_CONTENT_NEEDED` | optional | `1` shows the dashed "content needed" boxes in production (for previews) |

Never paste keys into code or chat; set them in the host's settings only.

## Edit content (no component changes needed)

| What | Where |
|---|---|
| Name, bio, availability, contact, education, experience, skills, tools, recognition | `data/portfolio.ts` |
| A case study | `data/projects/<slug>.ts` (typed by `lib/types.ts`) |
| Add a project | copy a project file → import it in `data/projects/index.ts` |
| Name in Indian scripts (hero) | `data/names.ts` |
| "How I think" beliefs | `data/thinking.ts` |
| Playground cards | `data/playground.ts` |

Everything flows from `/data`: the pages, work filters, the "How I think" map, the sitemap and the **Ask Asmi** chatbot's knowledge. Update a file and the bot knows.

Unknown facts are written as `needed("…")`. They render as dashed boxes in development and disappear in production. Run `npm run needed` to regenerate the checklist at `docs/05-content-needed.md`.

## Images

- Project images: `public/images/projects/<slug>/NN.webp` (numbered like the Behance slides).
- Cover layers for the animated covers: `public/images/projects/<slug>/cover/`.
- After adding or replacing images, run `npm run images` (updates `data/image-manifest.json` so layouts never jump).

### Use a real video as a project cover

Covers support `motion` (coded), `video` and `image`. To switch a project to a screen recording:

```bash
brew install ffmpeg
```

```bash
ffmpeg -i input.mov -t 6 -vf "scale=1280:-2,fps=24" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart public/images/projects/leapsters/cover.mp4
```

```bash
ffmpeg -i public/images/projects/leapsters/cover.mp4 -frames:v 1 public/images/projects/leapsters/cover-poster.jpg
```

Then in the project file: `cover: { type: "video", src: "/images/projects/leapsters/cover.mp4", poster: { src: "…/cover-poster.jpg", alt: "…" } }`. Aim for under 300 KB.

## Resume PDF

Put it at `public/asmi-shaikh-resume.pdf`. The Download button appears automatically once the file exists. (The resume page itself is HTML, so it's readable without the PDF.)

## Docs

- `docs/01-audit-current-site.md`: audit of the Framer site
- `docs/02-proposal.md`: experience, IA and architecture proposal
- `docs/03-design-system.md`: tokens and components
- `docs/04-fact-check-log.md`: every content correction made against the sources
- `docs/05-content-needed.md`: what Asmi still needs to supply
- `docs/sources/`: transcriptions of every Behance slide, the capstone deck and the resume
