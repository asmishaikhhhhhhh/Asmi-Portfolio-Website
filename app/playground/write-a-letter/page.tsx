import type { Metadata } from "next";
import Link from "next/link";
import { Typewriter } from "@/components/playground/Typewriter";
import { handFace, typewriterFace } from "@/components/playground/typewriter-fonts";

export const metadata: Metadata = {
  title: "Write a letter today",
  description: "Write a letter to someone on a typewriter, keys clacking, then download it as a PDF. An experiment by Asmi Shaikh.",
  alternates: { canonical: "/playground/write-a-letter" },
};

export default function Page() {
  return (
    <div className={`container-page pb-28 pt-24 md:pt-28 ${typewriterFace.variable} ${handFace.variable}`}>
      <Link href="/playground" className="meta text-ink-mute hover:text-ink">← Playground</Link>
      <h1 className="sr-only">Write a letter today</h1>
      <div className="mt-6">
        <Typewriter />
      </div>
    </div>
  );
}
