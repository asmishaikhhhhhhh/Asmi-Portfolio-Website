import type { Metadata } from "next";
import { Pinboard } from "@/components/playground/Pinboard";
import { playground } from "@/data/playground";
import { Needed } from "@/components/ui/Needed";

export const metadata: Metadata = {
  title: "Playground",
  description: "Smaller explorations by Asmi Shaikh: brand identity, ethnographic research, illustration, writing and experiments.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  const pending = playground.filter((p) => p.needs);
  return (
    <div className="container-page pb-24 pt-28 md:pt-36">
      <p className="meta text-ink-mute">Playground</p>
      <h1 className="mt-3 max-w-[18ch] font-display-soft text-h1">Side quests, pinned up properly</h1>
      <p className="mt-5 max-w-[56ch] text-lede text-ink-soft">
        Interactive experiments and research. Every card is held up by Clap It, a board clip I designed so pins stop poking holes in things. Drag them around if you like.
      </p>
      <div className="mt-14">
        <Pinboard items={playground} />
      </div>
      {pending.length > 0 && (
        <Needed>
          <ul className="list-disc pl-5">
            {pending.map((p) => (
              <li key={p.id}>
                <strong>{p.title}:</strong> {p.needs}
              </li>
            ))}
          </ul>
        </Needed>
      )}
    </div>
  );
}
