import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ThinkingMap } from "@/components/home/ThinkingMap";
import { ValueProposition } from "@/components/home/ValueProposition";
import { Pinboard } from "@/components/playground/Pinboard";
import { thinkingNodes } from "@/data/thinking";
import { playground } from "@/data/playground";
import { projectSummaries } from "@/lib/projects";

export default function Home() {
  const all = projectSummaries();
  const flagship = all.filter((p) => p.tier === "flagship");

  return (
    <>
      <Hero />
      <ThinkingMap nodes={thinkingNodes} />
      <SelectedWork flagship={flagship} />
      <ValueProposition />

      <section aria-labelledby="playground-heading" className="container-page py-24 md:py-36">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="meta text-ink-mute">Playground</p>
            <h2 id="playground-heading" className="mt-3 max-w-[20ch] font-display-soft text-h2">
              Side quests, held up by a clip I designed
            </h2>
            <p className="mt-4 max-w-[52ch] text-ink-soft">
              Interactive experiments and research, pinned with{" "}
              <Link href="/work/clap-it" className="underline underline-offset-4">
                Clap It
              </Link>
              , my board clip that doesn&rsquo;t poke holes in your paper. Go ahead, move them around.
            </p>
          </div>
          <Link href="/playground" className="font-medium underline decoration-line underline-offset-[6px] hover:decoration-ink">
            See the playground →
          </Link>
        </div>
        <Pinboard items={playground} />
      </section>
    </>
  );
}
