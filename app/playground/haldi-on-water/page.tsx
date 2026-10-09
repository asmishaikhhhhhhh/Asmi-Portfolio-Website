import type { Metadata } from "next";
import Link from "next/link";
import { SurfaceTension } from "@/components/playground/SurfaceTension";

export const metadata: Metadata = {
  title: "Haldi on water",
  description: "An interactive Marangoni-effect experiment by Asmi Shaikh: drop soap or pigment on water and watch surface tension pull it apart.",
  alternates: { canonical: "/playground/haldi-on-water" },
};

export default function Page() {
  return (
    <div className="container-page pb-28 pt-24 md:pt-28">
      <Link href="/playground" className="meta text-ink-mute hover:text-ink">← Playground</Link>
      <h1 className="mt-6 max-w-[16ch] font-display-soft text-h1">Haldi on water</h1>
      <p className="mt-5 max-w-[56ch] text-lede text-ink-soft">
        The pepper-and-soap trick from every school science class, done with a kitchen palette. Tap the bowl to drop soap, pick a pigment to bloom colour, and drag to stir.
      </p>
      <div className="mt-12">
        <SurfaceTension />
      </div>
    </div>
  );
}
