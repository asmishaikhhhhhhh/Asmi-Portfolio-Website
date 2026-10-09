"use client";

import { useId, useState } from "react";
import type { Img } from "@/lib/types";

/**
 * Before/after comparison. The handle is a native range input, so it works with
 * keyboard (arrows, Home/End), screen readers and touch out of the box.
 */
export function BeforeAfter({ before, after }: { before: Img; after: Img }) {
  const id = useId();
  const [pos, setPos] = useState(50);
  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative select-none overflow-hidden rounded-media bg-paper-deep" data-cursor="Drag">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.src} alt={after.alt} className="block h-auto w-full" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before.src} alt={before.alt} className="block h-full w-full object-cover" draggable={false} />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper shadow-[0_0_0_1px_rgb(0_0_0/.15)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-sm font-semibold text-ink shadow-float">
            ↔
          </span>
        </div>
        <span className="meta absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-paper">{before.caption ?? "Before"}</span>
        <span className="meta absolute right-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-ink">{after.caption ?? "After"}</span>
        <label htmlFor={id} className="sr-only">
          Compare {before.caption ?? "before"} and {after.caption ?? "after"}. {pos}% shows the {before.caption ?? "before"} version.
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
