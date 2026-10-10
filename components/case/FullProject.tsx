import { Needed } from "@/components/ui/Needed";
import { contact } from "@/data/portfolio";
import type { Project } from "@/lib/types";

/**
 * The last word of every case study: where to see the project in full. Links
 * to the project's own Behance gallery, or to the Behance profile until one is
 * published (flagged in dev).
 */
export function FullProject({ p }: { p: Project }) {
  const gallery = p.links?.behance;
  const href = gallery ?? contact.behance;
  return (
    <section aria-labelledby="full-project" className="mt-20 md:mt-28">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-cursor="Behance"
        className="group relative block overflow-hidden rounded-media border border-line bg-card p-8 transition-colors hover:border-ink/30 md:p-12"
      >
        <span
          aria-hidden
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 transition-transform duration-700 ease-out-soft group-hover:scale-150"
          style={{ background: "var(--accent)" }}
        />
        <p className="meta relative text-ink-mute">The detailed project</p>
        <h2 id="full-project" className="relative mt-3 max-w-[22ch] font-display-soft text-h2">
          {gallery ? (
            <>
              See every slide of {p.title} <span className="font-display-wonk italic text-forest">on Behance</span>
            </>
          ) : (
            <>
              See more of my work <span className="font-display-wonk italic text-forest">on Behance</span>
            </>
          )}
        </h2>
        <p className="relative mt-4 max-w-[52ch] text-ink-soft">
          The full presentation, with every sketch, screen and iteration behind this story.
        </p>
        <span className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform group-hover:-translate-y-0.5">
          {gallery ? "View on Behance" : "Visit my Behance"} <span aria-hidden>↗</span>
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {!gallery && <Needed>Behance gallery link for {p.title}, if it&rsquo;s published there.</Needed>}
    </section>
  );
}
