"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

type Method = {
  name: string;
  value: number;
  unit: string;
  detail: string;
  icon: ReactNode;
  viz: "docs" | "people" | "map";
  parts?: { label: string; value: number }[];
  chips?: string[];
  link?: { label: string; href: string };
};

/**
 * Research methods as tabs, each with a picture of its scale: documents for a
 * literature review, people for interviews. Hover a legend to highlight a group.
 */
export function ResearchExplorer({ heading, methods }: { heading?: string; methods: Method[] }) {
  const [active, setActive] = useState(0);
  const [group, setGroup] = useState<number | null>(null);
  const id = useId();
  const m = methods[active];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + methods.length) % methods.length;
    setActive(next);
    setGroup(null);
    document.getElementById(`${id}-t-${next}`)?.focus();
  };
  const tones = ["var(--accent)", "var(--accent-ink)", "color-mix(in oklab, var(--accent) 30%, #fbf9f4)"];

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div role="tablist" aria-label="Research methods" onKeyDown={onKey} className="grid gap-3 sm:grid-cols-3">
        {methods.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.name}
              id={`${id}-t-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${id}-p`}
              tabIndex={on ? 0 : -1}
              onClick={() => {
                setActive(i);
                setGroup(null);
              }}
              className={`flex items-center gap-4 rounded-media border p-6 text-left transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/25"}`}
              style={on ? { background: "var(--accent-ink)" } : undefined}
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                style={on ? { background: "rgba(251,249,244,.14)", color: "#fbf9f4" } : { background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}
              >
                {x.icon}
              </span>
              <span>
                <span className={`meta block ${on ? "text-paper/70" : "text-ink-mute"}`}>{x.name}</span>
                <span className="mt-0.5 block font-display-soft text-[1.5rem] leading-none tabular-nums">
                  {x.viz === "map" ? "1" : x.value} <span className="text-[0.6em]">{x.unit}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t-${active}`} className="mt-3 rounded-media border border-line bg-card p-6 md:p-8">
        <div key={active} className="pl-fade grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="font-display-soft text-h3 leading-tight">{m.detail}</p>
            {m.parts && (
              <ul className="mt-5 space-y-2">
                {m.parts.map((p, i) => (
                  <li key={p.label}>
                    <button
                      type="button"
                      onPointerEnter={() => setGroup(i)}
                      onPointerLeave={() => setGroup(null)}
                      onFocus={() => setGroup(i)}
                      onBlur={() => setGroup(null)}
                      className={`flex items-center gap-3 text-left transition-opacity ${group === null || group === i ? "opacity-100" : "opacity-45"}`}
                    >
                      <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: tones[i % tones.length] }} />
                      <span className="font-medium tabular-nums">{p.value}</span>
                      <span className="text-ink-soft">{p.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {m.chips && (
              <div className="mt-6">
                <p className="meta text-ink-mute">Themes</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.chips.map((c) => (
                    <span key={c} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {m.link && (
              <a href={m.link.href} className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90" style={{ background: "var(--accent-ink)" }}>
                {m.link.label}
                <span aria-hidden>↓</span>
              </a>
            )}
          </div>

          {/* the picture of scale */}
          <div aria-hidden className="flex flex-wrap content-start gap-1.5">
            {m.viz !== "map" &&
              (m.parts ?? [{ label: "", value: m.value }]).flatMap((p, gi) =>
                Array.from({ length: p.value }, (_, k) => {
                  const lit = group === null || group === gi;
                  return m.viz === "people" ? (
                    <svg key={`${gi}-${k}`} viewBox="0 0 24 24" className="h-7 w-7 transition-[opacity,transform] duration-300 md:h-8 md:w-8" style={{ color: tones[gi % tones.length], opacity: lit ? 1 : 0.18, transform: lit && group === gi ? "scale(1.08)" : undefined }} fill="currentColor">
                      <circle cx="12" cy="7.5" r="3.5" />
                      <path d="M5 20.5a7 7 0 0 1 14 0Z" />
                    </svg>
                  ) : (
                    <span
                      key={`${gi}-${k}`}
                      className="h-8 w-6 rounded-[3px] transition-[opacity,transform] duration-300"
                      style={{ background: tones[gi % tones.length], opacity: lit ? 1 : 0.18, transform: lit && group === gi ? "translateY(-2px)" : undefined }}
                    />
                  );
                }),
              )}
            {m.viz === "map" && (
              <svg viewBox="0 0 200 120" className="w-full max-w-sm">
                <circle cx="100" cy="60" r="20" style={{ fill: "var(--accent-ink)" }} />
                {Array.from({ length: 9 }, (_, i) => {
                  const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
                  const x = 100 + 72 * Math.cos(a);
                  const y = 60 + 48 * Math.sin(a);
                  return (
                    <g key={i}>
                      <line x1="100" y1="60" x2={x} y2={y} strokeDasharray="2 3" style={{ stroke: "var(--color-line)" }} />
                      <circle cx={x} cy={y} r="8" style={{ fill: "color-mix(in oklab, var(--accent) 22%, #fbf9f4)", stroke: "var(--accent)" }} />
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
