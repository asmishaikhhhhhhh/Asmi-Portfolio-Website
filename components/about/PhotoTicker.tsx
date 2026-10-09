"use client";

import Image from "next/image";
import { useState } from "react";
import manifest from "@/data/image-manifest.json";
import type { Img } from "@/lib/types";

const dims = manifest as Record<string, { w: number; h: number }>;

/**
 * "Unfolding my designed life": a strip of photos that drifts sideways on a
 * loop. The list is rendered twice and the track slides by half its width, so
 * the loop is seamless. Hover or focus pauses it, and the Pause button stops it
 * for good (moving content longer than 5s needs a way to stop it). With reduced
 * motion it is a plain strip you scroll yourself.
 */
export function PhotoTicker({ photos }: { photos: Img[] }) {
  const [paused, setPaused] = useState(false);
  const set = (copy: number) =>
    photos.map((img, i) => {
      const d = dims[img.src] ?? { w: 4, h: 3 };
      return (
        <li key={`${copy}-${img.src}`} aria-hidden={copy > 0 || undefined} className="shrink-0 pr-4 md:pr-5">
          <Image
            src={img.src}
            alt={copy > 0 ? "" : img.alt}
            width={d.w}
            height={d.h}
            sizes="(min-width: 768px) 420px, 300px"
            className="pt-photo h-[15rem] w-auto rounded-media bg-paper-deep object-cover md:h-[19rem]"
            style={{ aspectRatio: `${d.w} / ${d.h}`, ["--tilt" as string]: `${i % 2 ? 1.2 : -1.2}deg` }}
            draggable={false}
          />
        </li>
      );
    });

  return (
    <div className="relative">
      <div className="pt-viewport no-scrollbar overflow-hidden" data-paused={paused || undefined}>
        <ul className="pt-track flex w-max py-4" aria-label="Photos of Asmi at work">
          {set(0)}
          {set(1)}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="pt-toggle meta container-page mt-3 flex items-center gap-2 text-ink-mute hover:text-ink"
      >
        <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
