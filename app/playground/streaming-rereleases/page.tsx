import type { Metadata } from "next";
import Link from "next/link";
import { ReleasesChart } from "@/components/playground/ReleasesChart";
import { description } from "@/data/rereleases2024";

export const metadata: Metadata = {
  title: "Streaming re-releases, 2024",
  description: "An interactive data visualisation by Asmi Shaikh: how Netflix, Amazon and others re-released movies through 2024, by month and IMDB rating.",
  alternates: { canonical: "/playground/streaming-rereleases" },
};

export default function Page() {
  return (
    <div className="container-page pb-28 pt-24 md:pt-28">
      <Link href="/playground" className="meta text-ink-mute hover:text-ink">← Playground</Link>
      <p className="meta mt-6 text-ink-mute">Data visualisation</p>
      <h1 className="mt-3 max-w-[20ch] font-display-soft text-h1">Streaming re-releases, 2024</h1>
      <p className="mt-5 max-w-[62ch] text-lede text-ink-soft">{description}</p>
      <div className="mt-12">
        <ReleasesChart />
      </div>
    </div>
  );
}
