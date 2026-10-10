"use client";

import { useId, useState } from "react";
import type { Img } from "@/lib/types";

/**
 * Before/after comparison. The handle is a native range input, so it works with
 * keyboard (arrows, Home/End), screen readers and touch out of the box.
 */
export function BeforeAfter({ before, after, bare = false }: { before: Img; after: Img; bare?: boolean }) {
  const id = useId();
  const [pos, setPos] = useState(50);
  // bare: cut-out images (e.g. a phone) with no backdrop; the labels sit underneath
  if (bare) {
    return (
      <div className="mx-auto w-full max-w-[21rem]">
        <div className="relative select-none" data-cursor="Drag">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={after.src} alt={after.alt} className="block h-auto w-full" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={before.src} alt={before.alt} className="block h-full w-full" draggable={false} />
          </div>
          <div aria-hidden className="pointer-events-none absolute -inset-y-3 w-0.5" style={{ left: `${pos}%`, background: "var(--accent)" }}>
            <span
              className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-paper shadow-float"
              style={{ background: "var(--accent-ink)" }}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 5l-4 5 4 5M13 5l4 5-4 5" />
              </svg>
            </span>
          </div>
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
        <div className="meta mt-6 flex justify-between">
          <span className={`transition-colors ${pos > 50 ? "text-ink" : "text-ink-mute"}`}>← {before.caption ?? "Before"}</span>
          <span className="transition-colors" style={{ color: pos <= 50 ? "var(--accent-ink)" : "var(--color-ink-mute)" }}>{after.caption ?? "After"} →</span>
        </div>
      </div>
    );
  }
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
