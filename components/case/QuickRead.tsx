import { MaybeText } from "@/components/ui/Needed";
import type { Project } from "@/lib/types";

/**
 * The 60-second version, for the reader with 60 seconds. Closed until clicked;
 * the full story below is for everyone who wants to understand how I got there.
 */
export function QuickRead({ p, solutionChapter }: { p: Project; solutionChapter?: string }) {
  const rows = [
    { k: "Problem", v: p.quickRead.problem },
    { k: "Insight", v: p.quickRead.insight },
    { k: "Solution", v: p.quickRead.solution },
    { k: "Result", v: p.quickRead.result },
  ] as const;
  return (
    <section aria-labelledby="quick-read" className="container-page mt-16 md:mt-24">
      <details className="group rounded-media border border-line bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:px-10 md:py-7 [&::-webkit-details-marker]:hidden">
          <span>
            <span id="quick-read" className="font-display-soft text-h3">The 60-second version</span>
            <span className="ml-3 hidden text-sm text-ink-mute sm:inline">For when you&rsquo;re reviewing twenty portfolios today.</span>
          </span>
          <span aria-hidden className="meta text-ink-mute transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="grid gap-px border-t border-line bg-line md:grid-cols-4">
          {rows.map((r) => (
            <div key={r.k} className="bg-card p-6 md:p-8">
              <p className="meta text-ink-mute">{r.k}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed">
                {typeof r.v === "string" ? r.v : <MaybeText value={r.v} fallback="Concept stage; see the full story below." />}
              </p>
            </div>
          ))}
        </div>
        {solutionChapter && (
          <div className="flex justify-end border-t border-line px-6 py-4 md:px-10">
            <a href={`#${solutionChapter}`} className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink">
              Skip to the solution ↓
            </a>
          </div>
        )}
      </details>
    </section>
  );
}
