"use client";

import { useId, useState, type KeyboardEvent, type PointerEvent } from "react";

type Ring = { name: string; members: string[] };

// Ring diameters as % of the stage, innermost first
const SIZE = [40, 70, 100];

/**
 * Stakeholder map as concentric rings, innermost first. Hover or tap a ring
 * (or arrow-key through the list) to light it up and see who sits in it.
 */
export function StakeholderRings({ heading, centre, rings }: { heading?: string; centre?: string; rings: Ring[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const sizes = SIZE.slice(SIZE.length - rings.length);
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + rings.length) % rings.length;
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  };
  // Inner rings sit on top, so the innermost ring under the pointer wins
  const hover = (i: number) => (e: PointerEvent) => {
    e.stopPropagation();
    if (i !== active) setActive(i);
  };

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="grid items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[26rem]">
          {rings
            .map((r, i) => ({ r, i }))
            .reverse()
            .map(({ r, i }) => {
              const on = i === active;
              const d = sizes[i];
              // Lighter towards the edge, like distance from the core
              const mix = [30, 18, 9][i + (3 - rings.length)];
              return (
                <div
                  key={r.name}
                  onPointerMove={hover(i)}
                  onClick={() => setActive(i)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border transition-[background,border-color,box-shadow] duration-300"
                  style={{
                    width: `${d}%`,
                    height: `${d}%`,
                    background: on ? `color-mix(in oklab, var(--accent) ${mix + 18}%, #fbf9f4)` : `color-mix(in oklab, var(--accent) ${mix}%, #fbf9f4)`,
                    borderColor: on ? "var(--accent)" : "transparent",
                    boxShadow: on ? "0 0 0 4px color-mix(in oklab, var(--accent) 18%, transparent)" : "none",
                  }}
                >
                  {i > 0 && (
                    <span
                      className="meta absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-colors"
                      style={{ top: `${((d - sizes[i - 1]) / d) * 25}%`, color: on ? "var(--accent-ink)" : "var(--color-ink-mute)" }}
                    >
                      {r.name}
                    </span>
                  )}
                  {i === 0 && (
                    <span className="absolute inset-0 grid place-items-center p-4 text-center">
                      <span>
                        <span className="block font-display-soft text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-tight" style={{ color: "var(--accent-ink)" }}>
                          {centre ?? r.name}
                        </span>
                        {centre && <span className="meta mt-1 block text-ink-mute">{r.name}</span>}
                      </span>
                    </span>
                  )}
                </div>
              );
            })}
        </div>

        <div role="tablist" aria-orientation="vertical" aria-label="Stakeholder rings" onKeyDown={onKey} className="space-y-2.5">
          {rings.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={r.name}
                id={`${id}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                className={`block w-full rounded-media border p-5 text-left transition-colors md:p-6 ${on ? "border-transparent" : "border-line bg-card hover:border-ink/25"}`}
                style={on ? { background: "color-mix(in oklab, var(--accent) 11%, #fbf9f4)" } : undefined}
              >
                <span className="flex items-center gap-3">
                  <span className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display-soft text-[1.2rem] leading-tight">{r.name}</span>
                  <span className="meta tabular-nums text-ink-mute">{r.members.length}</span>
                </span>
                <span className="grid transition-[grid-template-rows,opacity] duration-300" style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}>
                  <span className="overflow-hidden">
                    <span className="flex flex-wrap gap-2 pt-4">
                      {r.members.map((m) => (
                        <span key={m} className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm">
                          {m}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
