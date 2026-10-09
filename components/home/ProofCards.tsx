"use client";

import Link from "next/link";
import { useState } from "react";
import { ProofMotif, type MotifKind } from "@/components/home/ProofMotif";

/** A soft tint per card, from the site palette; the wash grows when the card opens. */
const TONES = {
  forest: "bg-forest-soft",
  marigold: "bg-[#f6e3bd]",
  paper: "bg-paper-deep",
  sage: "bg-[#e3e8dc]",
} as const;

export type ProofCard = {
  key: string;
  label: string;
  big: string;
  title: string;
  sub: string;
  details: string[];
  href?: string;
  hrefLabel?: string;
  /** Opens in a new tab, and the whole card becomes clickable. */
  external?: boolean;
  motif: MotifKind;
  tone: keyof typeof TONES;
  /** For the "stack" motif: how many cards to draw. */
  count?: number;
};

/**
 * Four facts as cards. On desktop, hovering or focusing a card widens it and
 * reveals the detail (the others narrow); on touch it's a swipeable row with the
 * detail always visible. Content is always in the DOM for screen readers.
 */
export function ProofCards({ cards }: { cards: ProofCard[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <ul
      className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:gap-3 lg:overflow-visible lg:px-0"
      onPointerLeave={() => setActive(null)}
      aria-label="At a glance"
    >
      {cards.map((c, i) => {
        const on = active === c.key;
        const dim = active !== null && !on;
        return (
          <li
            key={c.key}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(c.key)}
            onFocus={() => setActive(c.key)}
            onBlur={() => setActive(null)}
            tabIndex={c.href ? undefined : 0}
            data-cursor={c.external ? "" : undefined}
            data-on={on ? "true" : undefined}
            className={`group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-media border bg-card p-6 outline-none transition-[flex-grow,background-color,border-color,opacity] duration-500 ease-out-soft focus-visible:border-forest sm:w-[46%] lg:w-auto lg:min-w-0 lg:flex-1 lg:p-7 ${
              on ? "border-ink/30 lg:flex-[1.9]" : "border-line"
            } ${dim ? "lg:opacity-70" : ""}`}
          >
            {/* Tinted wash that rises when the card opens */}
            <span
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-full origin-bottom ${TONES[c.tone]} transition-transform duration-700 ease-out-soft ${on ? "scale-y-100" : "scale-y-[0.18] lg:scale-y-0"}`}
            />

            {/* Label + emblem */}
            <div className="relative flex items-start justify-between gap-4">
              <p className="meta pt-1 text-ink-mute">
                <span className="tabular-nums text-ink-mute/60">{String(i + 1).padStart(2, "0")} · </span>
                {c.label}
              </p>
              <ProofMotif kind={c.motif} count={c.count} />
            </div>

            {/* The big number/word: the thing to remember */}
            <p
              className={`relative mt-4 font-display-wonk leading-none tracking-[-0.03em] transition-colors duration-500 ${on ? "text-forest" : "text-ink"}`}
              style={{ fontSize: "clamp(2.75rem, 1.8rem + 2.4vw, 4.5rem)" }}
            >
              {c.big}
            </p>
            <p className="relative mt-3 font-medium leading-snug">{c.title}</p>
            <p className="relative mt-1 text-sm text-ink-mute">{c.sub}</p>

            {/* Detail: always visible on touch, revealed on desktop */}
            <div
              className={`relative grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft lg:grid-rows-[0fr] lg:opacity-0 ${
                on ? "lg:grid-rows-[1fr] lg:opacity-100" : ""
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm text-ink-soft">
                  {c.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-marigold" />
                      {d}
                    </li>
                  ))}
                </ul>
                {c.href && !c.external && (
                  <Link href={c.href} className="mt-4 inline-block text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink">
                    {c.hrefLabel ?? "See more"} →
                  </Link>
                )}
                {c.href && c.external && (
                  <span className="mt-4 inline-block text-sm font-medium underline decoration-line underline-offset-4 group-hover:decoration-ink">
                    {c.hrefLabel ?? "Open"} ↗
                  </span>
                )}
              </div>
            </div>

            {/* External cards: the whole card is the link (stretched over everything) */}
            {c.href && c.external && (
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10 rounded-media"
                aria-label={`${c.title}: ${c.hrefLabel ?? "open"} (opens in a new tab)`}
              />
            )}

          </li>
        );
      })}
    </ul>
  );
}
