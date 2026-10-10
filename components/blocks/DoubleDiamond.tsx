"use client";

import { useId, useState, type KeyboardEvent } from "react";

type Phase = { name: string; mode: string; steps: string[] };

// Geometry (viewBox 960 × 300): two diamonds between A and B, each split into
// a diverging half and a converging half. One half per phase.
const MID = 150, TOP = 22, BOT = 278;
const X = [130, 307.5, 485, 662.5, 840];
const half = (i: number) =>
  i % 2 === 0
    ? `${X[i]},${MID} ${X[i + 1]},${TOP} ${X[i + 1]},${BOT}` // diverge
    : `${X[i]},${TOP} ${X[i + 1]},${MID} ${X[i]},${BOT}`; // converge
const centre = (i: number) => (i % 2 === 0 ? X[i] + (X[i + 1] - X[i]) * 0.62 : X[i] + (X[i + 1] - X[i]) * 0.38);

/**
 * The double diamond, drawn rather than pictured. Hover, tap or arrow-key
 * through the four phases; the active half lights up in the project's accent
 * and its steps appear below.
 */
export function DoubleDiamond({ heading, from, to, phases }: { heading?: string; from: string; to: string; phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + phases.length) % phases.length;
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  };

  return (
    <div className="space-y-6">
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}

      <svg viewBox="0 0 960 300" className="w-full overflow-visible" role="img" aria-label={`Double diamond from ${from} to ${to}: ${phases.map((p) => p.name).join(", ")}`}>
        {/* A and B */}
        <text x="62" y={MID - 6} textAnchor="middle" className="fill-ink-mute font-sans text-[15px] max-sm:hidden">{from}</text>
        <text x="62" y={MID + 30} textAnchor="middle" className="fill-ink font-display-soft text-[34px]">A</text>
        <text x="900" y={MID - 6} textAnchor="middle" className="fill-ink-mute font-sans text-[15px] max-sm:hidden">{to}</text>
        <text x="900" y={MID + 30} textAnchor="middle" className="fill-ink font-display-soft text-[34px]">B</text>

        {phases.map((p, i) => {
          const on = i === active;
          return (
            <g
              key={p.name}
              onPointerEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="cursor-pointer"
              aria-hidden
            >
              <polygon
                points={half(i)}
                strokeLinejoin="round"
                className="transition-[fill,stroke] duration-300"
                style={{
                  fill: on ? "color-mix(in oklab, var(--accent) 22%, transparent)" : "transparent",
                  stroke: on ? "var(--accent)" : "var(--color-line)",
                  strokeWidth: on ? 2.5 : 1.5,
                }}
              />
              <text
                x={centre(i)}
                y={MID - 4}
                textAnchor="middle"
                className="font-display-soft text-[26px] transition-colors duration-300"
                style={{ fill: on ? "var(--accent-ink)" : "var(--color-ink)" }}
              >
                {p.name}
              </text>
              <text x={centre(i)} y={MID + 22} textAnchor="middle" className="fill-ink-mute font-sans text-[15px] max-sm:hidden">
                {p.mode}
              </text>
            </g>
          );
        })}
        {/* Diverge / converge cue under each diamond */}
        <text x={X[1]} y={BOT + 22} textAnchor="middle" className="fill-ink-mute font-sans text-[13px] uppercase tracking-[0.18em] max-sm:hidden">
          explore · focus
        </text>
        <text x={X[3]} y={BOT + 22} textAnchor="middle" className="fill-ink-mute font-sans text-[13px] uppercase tracking-[0.18em] max-sm:hidden">
          explore · focus
        </text>
      </svg>

      {/* Phase tabs + the steps of the active phase */}
      <div role="tablist" aria-label="Design process phases" onKeyDown={onKey} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {phases.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.name}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              className={`rounded-control border px-4 py-3 text-left transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
              style={on ? { background: "var(--accent-ink)" } : undefined}
            >
              <span className={`meta block ${on ? "text-paper/70" : "text-ink-mute"}`}>0{i + 1} · {p.mode}</span>
              <span className="mt-1 block font-display-soft text-[1.15rem]">{p.name}</span>
            </button>
          );
        })}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="rounded-media border border-line bg-card p-6 md:p-8">
        <ol key={active} className="pl-fade flex flex-wrap gap-2.5">
          {phases[active].steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 rounded-full border border-line bg-paper px-4 py-2 text-[0.95rem]">
              <span className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
