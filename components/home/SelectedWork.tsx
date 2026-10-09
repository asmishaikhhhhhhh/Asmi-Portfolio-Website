import Link from "next/link";
import type { ProjectSummary } from "@/lib/projects";
import { WorkRow } from "./WorkRow";

export function SelectedWork({ flagship }: { flagship: ProjectSummary[] }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="container-page scroll-mt-20 pt-24 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="meta text-ink-mute">Selected work · {flagship.length} case studies</p>
          <h2 id="work-heading" className="mt-3 font-display-soft text-h2 max-w-[22ch]">
            Research-led work, from first insight to tested prototype
          </h2>
        </div>
        <Link href="/work" className="font-medium underline decoration-line underline-offset-[6px] hover:decoration-ink">
          See all work →
        </Link>
      </div>
      <ol className="divide-y divide-line">
        {flagship.map((p, i) => (
          <WorkRow key={p.slug} p={p} index={i} flip={i % 2 === 1} />
        ))}
      </ol>
    </section>
  );
}
