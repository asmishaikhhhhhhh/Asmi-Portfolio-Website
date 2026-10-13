import type { Metadata } from "next";
import Link from "next/link";
import { Confessions } from "@/components/about/Confessions";
import { PhotoTicker } from "@/components/about/PhotoTicker";
import { ProcessLoop } from "@/components/about/ProcessLoop";
import { CurrentRole } from "@/components/ui/CurrentRole";
import { Picture } from "@/components/ui/Picture";
import { MaybeText } from "@/components/ui/Needed";
import { Reveal } from "@/components/ui/Reveal";
import { atWork, designConfessions, education, experience, offScreen, profile, recognition, skills, tools } from "@/data/portfolio";
import { getProject, projectHref } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Asmi Shaikh is a multidisciplinary designer from Mumbai (B.Des Humanising Technology, NMIMS). Background, experience, how she works, tools, and life off-screen.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pb-24 pt-28 md:pt-36">
      {/* Intro */}
      <section className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="meta text-ink-mute">About</p>
          <CurrentRole className="mt-5" />
          <h1 className="mt-5 font-display-soft text-h1">
            A little more about the person <em className="font-display-wonk italic text-forest">behind the pixels</em>
          </h1>
          <div className="mt-8 max-w-[52ch] space-y-4 text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] leading-[1.5] text-ink-soft">
            <blockquote className="border-l-2 border-marigold pl-5 font-display-wonk text-[1.2em] italic leading-snug text-forest">
              &ldquo;{profile.aboutQuote}&rdquo;
            </blockquote>
            {profile.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/resume" className="rounded-full bg-ink px-5 py-3 font-medium text-paper">View resume</Link>
            <a href="/contact" className="rounded-full border border-ink/20 px-5 py-3 font-medium hover:border-ink">Let&rsquo;s talk</a>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          {/* Spans the full height of the text column, from the eyebrow to the buttons */}
          <figure className="relative md:flex md:h-full md:flex-col">
            <Picture img={profile.photo} size="third" priority className="aspect-[2/3] object-cover md:aspect-auto md:min-h-0 md:flex-1" />
            <figcaption className="meta absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1.5 text-ink">{profile.location}</figcaption>
          </figure>
        </div>
      </section>

      {/* Path */}
      <section aria-labelledby="path" className="container-page mt-28 grid gap-10 md:mt-36 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="meta text-ink-mute">The path so far</p>
          <h2 id="path" className="mt-3 font-display-soft text-h2">Design school, six roles and a lot of side quests</h2>
        </div>
        <ol className="relative border-l border-line md:col-span-7 md:col-start-6">
          {[
            ...experience.map((x) => ({ k: x.start ? `${x.start} – ${x.end}` : x.end, t: x.role, o: x.org, l: x.location, s: x.summary, now: !!x.current })),
            { k: education[0].period, t: education[0].qualification, o: education[0].institution, l: education[0].location ?? "", s: undefined, now: false },
          ].map((e) =>
            e.now ? (
              // the current role: a lit card with a live dot on the line
              <Reveal as="li" key={e.t + e.o} className="relative pb-10 pl-8">
                <span aria-hidden className="absolute -left-[7px] top-6 inline-flex h-3.5 w-3.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-forest/40 motion-reduce:hidden" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-paper bg-forest" />
                </span>
                <div className="rounded-media border border-forest/25 bg-forest-soft/60 p-5 md:p-6">
                  <p className="meta flex items-center gap-2 text-forest">
                    <span className="rounded-full bg-forest px-2 py-0.5 text-paper">Current</span>
                    {e.k}
                  </p>
                  <p className="mt-2 font-display-soft text-h3">{e.t}</p>
                  <p className="font-medium text-forest">{e.o}{e.l ? ` · ${e.l}` : ""}</p>
                  {e.s && <p className="mt-2 text-sm text-ink-soft"><MaybeText value={e.s} /></p>}
                </div>
              </Reveal>
            ) : (
              <Reveal as="li" key={e.t + e.o} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-marigold" />
                <p className="meta text-ink-mute">{e.k}</p>
                <p className="mt-1 font-display-soft text-h3">{e.t}</p>
                <p className="text-ink-soft">{e.o}{e.l ? ` · ${e.l}` : ""}</p>
                {e.s && <p className="mt-2 text-sm text-ink-soft"><MaybeText value={e.s} /></p>}
              </Reveal>
            ),
          )}
        </ol>
      </section>

      {/* At work: "Unfolding my designed life" */}
      <section aria-labelledby="unfolding" className="mt-28 md:mt-36">
        <div className="container-page">
          <h2 id="unfolding" className="max-w-[24ch] font-display-soft text-h2">
            Unfolding my <span className="font-display-wonk italic text-forest">&ldquo;designed&rdquo;</span> life
          </h2>
        </div>
        <div className="mt-8 md:mt-10">
          <PhotoTicker photos={atWork} />
        </div>
      </section>

      {/* How I work */}
      <section aria-labelledby="how" className="container-page mt-28 md:mt-36">
        <p className="meta text-ink-mute">How I work</p>
        <h2 id="how" className="mt-3 max-w-[26ch] font-display-soft text-h2">
          Research, conceptualise, experiment, <span className="font-display-wonk italic text-forest">then iterate</span>
        </h2>
        <div className="mt-12 md:mt-16">
          <ProcessLoop
            stages={skills.map((g) => ({
              verb: g.verb,
              label: g.label,
              blurb: g.blurb,
              skills: g.skills.map((s) => ({
                name: s.name,
                links: [
                  ...(s.evidence ?? []).flatMap((slug) => {
                    const p = getProject(slug);
                    if (!p) return [];
                    const { href, external } = projectHref(p);
                    return [{ label: p.title, href, external }];
                  }),
                  ...(s.links ?? []),
                ],
              })),
            }))}
          />
        </div>

        {/* Tools, set like a type specimen: the more she uses it, the bigger and darker it's set */}
        <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-12">
          <h3 className="meta text-ink-mute md:col-span-3">Tools</h3>
          <dl className="md:col-span-9">
            {(
              [
                ["Every day", tools.daily, "full", "font-display-soft text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-[1.15] text-ink"],
                ["Regularly", tools.also, "half", "font-display-soft text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] leading-snug text-ink-soft"],
                ["Getting comfortable with", tools.basic, "ring", "font-display-wonk italic text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] leading-snug text-ink-mute"],
              ] as const
            ).map(([k, list, dot, type], i) => (
              <div key={k} className={`grid gap-3 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8 ${i ? "border-t border-line" : "pt-0"}`}>
                <dt className="meta flex items-center gap-2.5 self-start text-ink-mute sm:pt-[0.6em]">
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 shrink-0 rounded-full border border-forest ${dot === "full" ? "bg-forest" : dot === "half" ? "bg-[linear-gradient(90deg,var(--color-forest)_50%,transparent_50%)]" : ""}`}
                  />
                  {k}
                </dt>
                <dd className={`flex flex-wrap gap-x-[0.85em] gap-y-[0.1em] ${type}`}>
                  {list.map((t) => (
                    <span key={t} className="whitespace-nowrap decoration-marigold decoration-2 underline-offset-[0.2em] transition-colors hover:text-ink hover:underline">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Recognition */}
      <section aria-labelledby="recognition" className="container-page mt-28 md:mt-36">
        <h2 id="recognition" className="meta text-ink-mute">Recognition</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {recognition.map((r) => (
            <li key={r.title} className="grid gap-2 py-6 md:grid-cols-12">
              <p className="font-display-soft text-h3 md:col-span-4">{r.title}</p>
              <p className="text-ink-soft md:col-span-6">{r.detail}</p>
              <p className="meta text-ink-mute md:col-span-2 md:text-right">{r.date}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Personality */}
      <section aria-labelledby="offscreen" className="container-page mt-28 grid gap-12 md:mt-36 md:grid-cols-12">
        <div className="md:col-span-5">
          <Confessions lines={designConfessions} />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="meta text-ink-mute">Off-screen</p>
          <h2 id="offscreen" className="mt-3 font-display-soft text-h2">More than just a designer</h2>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {offScreen.map((o) => (
              <li key={o.label}>
                <Picture img={o.image} size="third" className="aspect-square object-cover" />
                <p className="mt-3 font-medium">{o.label}</p>
                <p className="text-sm text-ink-soft">{o.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
