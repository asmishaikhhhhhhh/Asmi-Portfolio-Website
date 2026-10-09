"use client";

import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";

export type LoopStage = {
  verb: string;
  label: string;
  blurb: string;
  skills: { name: string; links: { label: string; href: string; external?: boolean }[] }[];
};

// Loop geometry (viewBox 0 0 400 400): three stages on a circle, clockwise from the top.
const C = 200, R = 150;
const ANGLES = [-90, 30, 150];
const at = (deg: number, r = R) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)] as const;

/**
 * How I work, as a loop: research → conceptualise → experiment → iterate. Pick a
 * stage (click, hover or arrow keys) to see the skills behind it and where
 * they show up in the work. A dot keeps travelling the loop, because it never
 * really stops.
 */
export function ProcessLoop({ stages }: { stages: LoopStage[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const stage = stages[active];

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + stages.length) % stages.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
      {/* The loop */}
      <div className="relative mx-auto aspect-square w-full max-w-[26rem] md:col-span-5 md:max-w-none">
        <svg viewBox="0 0 400 400" className="pl-stage absolute inset-0 h-full w-full" aria-hidden>
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-line)" strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
          {/* Clockwise chevrons between the stages */}
          {ANGLES.map((a) => {
            const mid = a + 60;
            const [x, y] = at(mid);
            return (
              <path key={a} d="M-6 -8 L4 0 L-6 8" fill="none" stroke="var(--color-ink-mute)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" transform={`translate(${x} ${y}) rotate(${mid + 90})`} />
            );
          })}
          {/* Active stage: the arc from it to the next stage is drawn in */}
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="var(--color-forest)"
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={360}
            strokeDasharray="120 240"
            className="pl-arc"
            style={{ transform: `rotate(${ANGLES[active]}deg)`, transformOrigin: `${C}px ${C}px`, transformBox: "view-box" }}
          />
          <g className="pl-orbit">
            <circle cx={C} cy={C - R} r={7} fill="var(--color-marigold)" />
          </g>
        </svg>

        {/* Centre: the "then do it again" */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span aria-hidden className="pl-spin text-2xl text-marigold-ink">↻</span>
          <span className="font-display-wonk text-h3 italic text-forest">Iterate</span>
          <span className="meta mt-1 text-ink-mute">then do it again</span>
        </div>

        {/* Stage buttons sit on the loop */}
        <div role="tablist" aria-label="How I work" aria-orientation="horizontal" onKeyDown={onKey}>
          {stages.map((s, i) => {
            const [x, y] = at(ANGLES[i]);
            const on = i === active;
            return (
              <button
                key={s.verb}
                id={`${id}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                className={`absolute flex aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center shadow-float transition-[background-color,color,transform,border-color] duration-300 ${
                  on ? "scale-105 border-forest bg-forest text-paper" : "border-line bg-card text-ink hover:border-ink"
                }`}
                style={{ left: `${x / 4}%`, top: `${y / 4}%` }}
              >
                <span className={`meta text-[0.65rem] ${on ? "text-paper/70" : "text-ink-mute"}`}>0{i + 1}</span>
                <span className={`font-display-soft leading-tight ${s.verb.length > 10 ? "text-[clamp(0.7rem,0.5rem+0.55vw,1rem)]" : "text-[clamp(0.85rem,0.7rem+0.55vw,1.15rem)]"}`}>{s.verb}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The selected stage */}
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="md:col-span-7">
        <div key={active} className="pl-fade rounded-media border border-line bg-card p-6 md:p-10">
          <p className="meta text-ink-mute">
            Stage 0{active + 1} / 0{stages.length}
          </p>
          <h3 className="mt-3 font-display-soft text-h2">
            {stage.label.split(" & ")[0]}{" "}
            {stage.label.includes(" & ") && <span className="font-display-wonk italic text-forest">&amp; {stage.label.split(" & ")[1]}</span>}
          </h3>
          <p className="mt-3 max-w-[48ch] text-ink-soft">{stage.blurb}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {stage.skills.map((s) => (
              <li key={s.name} className="border-t border-line pt-4">
                <p className="font-medium">{s.name}</p>
                {s.links.length > 0 && (
                  <p className="mt-1 flex flex-wrap gap-x-3 text-sm">
                    <span className="text-ink-mute">See:</span>
                    {s.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="underline decoration-line underline-offset-4 hover:decoration-ink"
                      >
                        {l.label}
                        {l.external ? " ↗" : ""}
                      </Link>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
