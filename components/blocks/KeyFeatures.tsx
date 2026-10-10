"use client";

import { useId, useState, type KeyboardEvent } from "react";

export type KeyFeatureIcon = "collaborate" | "portfolio" | "community";
type Item = { title: string; body: string; icon: KeyFeatureIcon };

function Glyph({ name }: { name: KeyFeatureIcon }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 32 32" className="h-[42%] w-[42%]" aria-hidden>
      {name === "collaborate" && (
        <>
          {/* two puzzle pieces meeting */}
          <path {...p} d="M5 9h6a2.5 2.5 0 1 1 5 0h0v6a2.5 2.5 0 1 0 0 5v3H5Z" />
          <path {...p} d="M16 15h3a2.5 2.5 0 1 1 5 0h3v12H16v-4a2.5 2.5 0 1 0 0-5" />
        </>
      )}
      {name === "portfolio" && (
        <>
          <rect {...p} x="5" y="4" width="15" height="20" rx="2" />
          <path {...p} d="M9 9h7M9 13h7M9 17h4" />
          <rect {...p} x="15" y="17" width="12" height="10" rx="2" />
          <path {...p} d="M19 17v-2h4v2M15 21.5h12" />
        </>
      )}
      {name === "community" && (
        <>
          <circle {...p} cx="16" cy="16" r="12" strokeDasharray="2 3.2" />
          <circle {...p} cx="16" cy="12" r="2.6" />
          <path {...p} d="M11.5 21.5a4.5 4.5 0 0 1 9 0" />
          <circle {...p} cx="9.5" cy="15" r="1.9" />
          <circle {...p} cx="22.5" cy="15" r="1.9" />
        </>
      )}
    </svg>
  );
}

// Satellites spaced evenly around the hub (as % of the stage), clear of it
const SPOTS = [-150, -30, 90].map((deg) => ({
  x: 50 + 34 * Math.cos((deg * Math.PI) / 180),
  y: 50 + 34 * Math.sin((deg * Math.PI) / 180),
}));

/**
 * Key features as a hub with orbiting features. Hover, tap or arrow-key through
 * them; the active satellite fills with the accent and its text opens on the right.
 */
export function KeyFeatures({ heading, centre, items }: { heading?: string; centre: string; items: Item[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + items.length) % items.length;
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  };

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="grid items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
        {/* Hub and satellites */}
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[26rem]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            {SPOTS.slice(0, items.length).map((s, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={s.x}
                y2={s.y}
                strokeDasharray="1.2 1.6"
                strokeWidth={i === active ? 0.6 : 0.35}
                className="transition-all duration-300"
                style={{ stroke: i === active ? "var(--accent)" : "var(--color-line)" }}
              />
            ))}
          </svg>
          {/* hub */}
          <div
            className="absolute left-1/2 top-1/2 grid aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)" }}
          >
            <div className="text-center">
              <p className="font-display-soft text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-none" style={{ color: "var(--accent-ink)" }}>
                {centre}
              </p>
              <p className="meta mt-2 text-ink-mute">0{active + 1} / 0{items.length}</p>
            </div>
          </div>
          {/* satellites */}
          {items.map((f, i) => {
            const on = i === active;
            const s = SPOTS[i];
            return (
              <button
                key={f.title}
                type="button"
                tabIndex={-1}
                onPointerEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="absolute grid aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-paper shadow-float transition-all duration-300"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  background: on ? "var(--accent-ink)" : "var(--color-card)",
                  color: on ? "#fbf9f4" : "var(--accent-ink)",
                  transform: `translate(-50%, -50%) scale(${on ? 1.12 : 1})`,
                }}
              >
                <Glyph name={f.icon} />
              </button>
            );
          })}
        </div>

        {/* Feature list */}
        <div role="tablist" aria-orientation="vertical" aria-label="Key features" onKeyDown={onKey} className="space-y-2.5">
          {items.map((f, i) => {
            const on = i === active;
            return (
              <button
                key={f.title}
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
                  <span className="font-display-soft text-[1.2rem] leading-tight">{f.title}</span>
                </span>
                <span
                  className="grid transition-[grid-template-rows,opacity] duration-300"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-3 text-[0.95rem] leading-snug text-ink-soft">{f.body}</span>
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
