"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

export type EcoIcon = "person" | "info" | "phone" | "store" | "bank" | "extinguisher" | "building" | "factory" | "helmet";
type Node = { title: string; icon: EcoIcon; notes: string[]; list?: { label: string; items: string[] } };

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const GLYPHS: Record<EcoIcon, ReactNode> = {
  person: (
    <>
      <circle {...P} cx="12" cy="8" r="3.5" />
      <path {...P} d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  info: (
    <>
      <circle {...P} cx="12" cy="12" r="8.5" />
      <path {...P} d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
  phone: <path {...P} d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7L16 13l4 1.5v3A2 2 0 0 1 17.8 20 15 15 0 0 1 4 6.2 2 2 0 0 1 6.5 4Z" />,
  store: (
    <>
      <path {...P} d="M4 9.5 5.5 4.5h13L20 9.5a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0 2.7 2.7 0 0 1-5.3 0Z" />
      <path {...P} d="M5.5 11.5v8h13v-8M10 19.5v-5h4v5" />
    </>
  ),
  bank: <path {...P} d="M3.5 9 12 4l8.5 5M5 9.5v8M9.5 9.5v8M14.5 9.5v8M19 9.5v8M3.5 20h17" />,
  extinguisher: (
    <>
      <rect {...P} x="8" y="8" width="7" height="12.5" rx="2.5" />
      <path {...P} d="M11.5 8V5.5M9 5.5h6l3-1.5M15 5.5l2.5 3" />
    </>
  ),
  building: (
    <>
      <rect {...P} x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path {...P} d="M9 7.5h.01M12 7.5h.01M15 7.5h.01M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M15 14.5h.01M10.5 20.5v-3h3v3" strokeWidth={2.2} />
    </>
  ),
  factory: <path {...P} d="M3.5 20.5V10l5 3V10l5 3V10l5 3V4.5h2v16Z" />,
  helmet: (
    <>
      <path {...P} d="M4 16a8 8 0 0 1 16 0" />
      <path {...P} d="M2.5 16h19v2.5h-19ZM12 8V5.5M9 9l-1-2.5M15 9l1-2.5" />
    </>
  ),
};

/**
 * An ecosystem map as a hub: the centre and the parts that connect to it.
 * Hover, tap or arrow-key through the nodes to read each relationship.
 */
export function Ecosystem({ heading, centre, centreNote, nodes, caption }: { heading?: string; centre: string; centreNote?: string; nodes: Node[]; caption?: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const n = nodes.length;
  const pos = (i: number) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
  };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + n) % n;
    setActive(next);
    document.getElementById(`${id}-node-${next}`)?.focus();
  };
  const cur = nodes[active];

  return (
    <div id="ecosystem-map" className="scroll-mt-24">
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="grid items-center gap-8 rounded-media border border-line bg-card p-6 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-8">
        <div className="relative mx-auto aspect-square w-full max-w-[30rem]" role="tablist" aria-label="Ecosystem" onKeyDown={onKey}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="50" cy="50" r="38" fill="none" strokeDasharray="0.6 1.4" strokeWidth="0.3" style={{ stroke: "var(--color-line)" }} />
            {nodes.map((_, i) => {
              const p = pos(i);
              const on = i === active;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  strokeWidth={on ? 0.7 : 0.3}
                  strokeDasharray={on ? undefined : "1 1.2"}
                  className="transition-all duration-300"
                  style={{ stroke: on ? "var(--accent)" : "var(--color-line)" }}
                />
              );
            })}
          </svg>
          {/* hub */}
          <div
            className="absolute left-1/2 top-1/2 grid aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-paper shadow-[0_10px_30px_rgba(0,0,0,.12)]"
            style={{ background: "var(--accent-ink)" }}
          >
            <span>
              <span className="block font-display-soft text-[clamp(1.2rem,0.9rem+1vw,1.7rem)] leading-none">{centre}</span>
              {centreNote && <span className="mt-1 block text-[0.7rem] text-paper/75">{centreNote}</span>}
            </span>
          </div>
          {nodes.map((nd, i) => {
            const p = pos(i);
            const on = i === active;
            return (
              <button
                key={nd.title}
                id={`${id}-node-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                onPointerEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span
                  className="grid aspect-square w-[62%] place-items-center rounded-full border transition-all duration-300"
                  style={
                    on
                      ? { background: "var(--accent)", borderColor: "var(--accent)", color: "#fbf9f4", transform: "scale(1.12)" }
                      : { background: "var(--color-paper)", borderColor: "var(--color-line)", color: "var(--accent-ink)" }
                  }
                >
                  <svg viewBox="0 0 24 24" className="h-[48%] w-[48%]" aria-hidden>
                    {GLYPHS[nd.icon]}
                  </svg>
                </span>
                <span className={`text-[0.68rem] leading-tight transition-colors md:text-[0.74rem] ${on ? "font-medium text-ink" : "text-ink-mute group-hover:text-ink"}`}>{nd.title}</span>
              </button>
            );
          })}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-live="polite" className="min-h-[16rem]">
          <p className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <p key={cur.title} className="pl-fade mt-2 font-display-soft text-h3 leading-tight">
            {cur.title}
          </p>
          <ul key={`${cur.title}-notes`} className="pl-fade mt-4 space-y-2.5">
            {cur.notes.map((x) => (
              <li key={x} className="flex gap-2.5 text-ink-soft">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                {x}
              </li>
            ))}
          </ul>
          {cur.list && (
            <div className="mt-5">
              <p className="meta text-ink-mute">{cur.list.label}</p>
              <ol className="mt-2 flex flex-wrap gap-1.5">
                {cur.list.items.map((x, i) => (
                  <li key={x} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
                    <span className="mr-1.5 tabular-nums text-ink-mute">{i + 1}</span>
                    {x}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      {caption && <p className="mt-3 text-sm text-ink-mute">{caption}</p>}
    </div>
  );
}
