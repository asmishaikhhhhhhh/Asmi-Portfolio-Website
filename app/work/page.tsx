import type { Metadata } from "next";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { projectSummaries, workFilters } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies by Asmi Shaikh across research, UX/UI, service and systems design, packaging and product: Leapsters, Greenly, Fire Safe, Clab and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="container-page pb-24 pt-28 md:pb-36 md:pt-36">
      <p className="meta text-ink-mute">Work</p>
      <h1 className="mt-3 max-w-[18ch] font-display-soft text-h1">Every project, inside out</h1>
      <p className="mt-5 max-w-[56ch] text-lede text-ink-soft">
        Full case studies, from the first interview to the last iteration. Filter by the kind of thinking you&rsquo;re looking for.
      </p>
      <div className="mt-12">
        <WorkExplorer projects={projectSummaries()} filters={workFilters()} />
      </div>
    </div>
  );
}
