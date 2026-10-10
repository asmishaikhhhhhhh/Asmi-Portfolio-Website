"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

// A winding path (viewBox 1000 × 420): three rows joined by a right and a left
// turn. Each step sits at a known distance along it so the fill can stop there.
const ROW = [70, 220, 370];
const PATH = `M80 ${ROW[0]} H780 A75 75 0 0 1 780 ${ROW[1]} H180 A75 75 0 0 0 180 ${ROW[2]} H900`;
const LEN = 700 + Math.PI * 75 + 600 + Math.PI * 75 + 720;
const ARC = Math.PI * 75;

// Slots in path order: [x, y, distance along the path, label side]
const SLOTS: [number, number, number, "up" | "down" | "right" | "left"][] = [
  [80, ROW[0], 0, "up"],
  [300, ROW[0], 220, "up"],
  [500, ROW[0], 420, "up"],
  [700, ROW[0], 620, "up"],
  [855, (ROW[0] + ROW[1]) / 2, 700 + ARC / 2, "right"],
  [700, ROW[1], 700 + ARC + 80, "down"],
  [500, ROW[1], 700 + ARC + 280, "down"],
  [300, ROW[1], 700 + ARC + 480, "down"],
  [105, (ROW[1] + ROW[2]) / 2, 700 + ARC + 600 + ARC / 2, "left"],
  [300, ROW[2], 700 + 2 * ARC + 600 + 120, "down"],
  [500, ROW[2], 700 + 2 * ARC + 600 + 320, "down"],
  [700, ROW[2], 700 + 2 * ARC + 600 + 520, "down"],
  [900, ROW[2], LEN, "down"],
];

/**
 * The design process as a path you can walk. Hover, tap or arrow-key through
 * the steps, or press play; the line fills up to the current step.
 */
export function ProcessPath({ heading, steps, caption }: { heading?: string; steps: string[]; caption?: string }) {
  const n = Math.min(steps.length, SLOTS.length);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const id = useId();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a >= n - 1) {
          setPlaying(false);
          return a;
        }
        return a + 1;
      });
    }, 900);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, n]);

  const go = (i: number) => {
    setPlaying(false);
    setActive(Math.max(0, Math.min(n - 1, i)));
  };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(n - 1, active + d));
    go(next);
    document.getElementById(`${id}-step-${next}`)?.focus();
  };
  const togglePlay = () => {
    if (playing) return setPlaying(false);
    if (active >= n - 1) setActive(0);
    setPlaying(true);
  };

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}

      <div className="rounded-media border border-line bg-card p-5 md:p-8">
        {/* Desktop: the winding path */}
        <svg viewBox="0 0 1000 440" className="hidden w-full overflow-visible md:block" role="group" aria-label="Design process steps" onKeyDown={onKey}>
          <path d={PATH} fill="none" strokeWidth="10" strokeLinecap="round" style={{ stroke: "var(--color-paper-deep)" }} />
          <path
            d={PATH}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            pathLength={LEN}
            strokeDasharray={LEN}
            strokeDashoffset={LEN - SLOTS[active][2]}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
            style={{ stroke: "var(--accent)" }}
          />
          {steps.slice(0, n).map((s, i) => {
            const [x, y, , side] = SLOTS[i];
            const done = i <= active;
            const on = i === active;
            const words = s.split(" ");
            // Two lines for longer labels
            const lines = s.length > 14 && words.length > 1 ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")] : [s];
            const lx = side === "right" ? x + 34 : side === "left" ? x + 34 : x;
            const anchor = side === "right" || side === "left" ? "start" : "middle";
            const ly = side === "up" ? y - 34 - (lines.length - 1) * 22 : side === "down" ? y + 46 : y - (lines.length - 1) * 11 + 6;
            return (
              <g
                key={s}
                id={`${id}-step-${i}`}
                tabIndex={on ? 0 : -1}
                role="button"
                aria-label={`Step ${i + 1}: ${s}`}
                aria-pressed={on}
                onPointerEnter={() => go(i)}
                onClick={() => go(i)}
                onFocus={() => go(i)}
                className="cursor-pointer outline-none"
              >
                <circle cx={x} cy={y} r="30" fill="transparent" />
                {on && <circle cx={x} cy={y} r="27" style={{ fill: "color-mix(in oklab, var(--accent) 22%, transparent)" }} />}
                <circle
                  cx={x}
                  cy={y}
                  r={on ? 18 : 15}
                  className="transition-all duration-300"
                  style={{ fill: done ? "var(--accent-ink)" : "var(--color-card)", stroke: done ? "var(--accent-ink)" : "var(--color-line)", strokeWidth: 3 }}
                />
                <text x={x} y={y + 5} textAnchor="middle" className="font-sans text-[13px] font-semibold tabular-nums" style={{ fill: done ? "#fbf9f4" : "var(--color-ink-mute)" }}>
                  {i + 1}
                </text>
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  className="font-sans text-[19px] transition-colors"
                  style={{ fill: on ? "var(--accent-ink)" : done ? "var(--color-ink)" : "var(--color-ink-mute)", fontWeight: on ? 600 : 400 }}
                >
                  {lines.map((l, k) => (
                    <tspan key={k} x={lx} dy={k ? 23 : 0}>
                      {l}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Mobile: a stepped list */}
        <ol className="space-y-1 md:hidden">
          {steps.slice(0, n).map((s, i) => {
            const done = i <= active;
            return (
              <li key={s}>
                <button type="button" onClick={() => go(i)} className="flex w-full items-center gap-3 rounded-control px-2 py-1.5 text-left">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold tabular-nums"
                    style={{ background: done ? "var(--accent-ink)" : "var(--color-paper-deep)", color: done ? "#fbf9f4" : "var(--color-ink-mute)" }}
                  >
                    {i + 1}
                  </span>
                  <span className={i === active ? "font-medium" : "text-ink-soft"} style={i === active ? { color: "var(--accent-ink)" } : undefined}>
                    {s}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-sm text-ink-soft" aria-live="polite">
            <span className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
              Step {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span className="ml-3 font-medium text-ink">{steps[active]}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous step" className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/30 disabled:opacity-40">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-paper transition-opacity hover:opacity-90"
              style={{ background: "var(--accent-ink)" }}
            >
              {playing ? (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><rect x="3.5" y="3" width="3" height="10" rx="1" /><rect x="9.5" y="3" width="3" height="10" rx="1" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M4.5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.4 2.7a.6.6 0 0 0-.9.5Z" /></svg>
              )}
              {playing ? "Pause" : active >= n - 1 ? "Replay" : "Play"}
            </button>
            <button type="button" onClick={() => go(active + 1)} disabled={active >= n - 1} aria-label="Next step" className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/30 disabled:opacity-40">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
            </button>
          </div>
        </div>
      </div>
      {caption && <p className="mt-3 text-sm text-ink-mute">{caption}</p>}
    </div>
  );
}
