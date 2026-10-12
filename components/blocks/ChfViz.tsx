"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ───────────────────────── App coverflow ───────────────────────── */

type Screen = { title: string; tag?: string; body: string };

/**
 * App screens as a coverflow of phones on the brand colour, with the
 * journey across the top. Pick a step, a phone, swipe or use the arrows.
 */
export function AppCoverflow({ heading, intro, screens, media, ink = "#0E2E51", highlight = "#D9A93A" }: { heading?: string; intro?: string; screens: Screen[]; media: ReactNode[]; ink?: string; highlight?: string }) {
  const [active, setActive] = useState(0);
  const x0 = useRef<number | null>(null);
  const n = screens.length;
  const go = (i: number) => setActive(Math.max(0, Math.min(n - 1, i)));
  const cur = screens[active];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    go(active + d);
  };

  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="overflow-hidden rounded-media border border-line" style={{ color: ink, background: `radial-gradient(70% 55% at 50% 50%, #ffffff, color-mix(in oklab, ${ink} 6%, #fbf9f4))` }}>
        {/* journey rail */}
        <ol className="relative grid px-4 pt-6 md:px-8 md:pt-8" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }} aria-label="Journey">
          <span aria-hidden className="absolute left-[10%] right-[10%] top-[calc(1.5rem+9px)] h-px md:top-[calc(2rem+9px)]" style={{ background: `color-mix(in oklab, ${ink} 18%, transparent)` }} />
          <span
            aria-hidden
            className="absolute left-[10%] top-[calc(1.5rem+9px)] h-[2px] transition-[width] duration-500 md:top-[calc(2rem+9px)]"
            style={{ width: `${(active / (n - 1)) * 80}%`, background: highlight }}
          />
          {screens.map((x, i) => {
            const on = i === active;
            const past = i < active;
            return (
              <li key={x.title} className="relative flex flex-col items-center">
                <button type="button" onClick={() => go(i)} aria-current={on} className="group flex flex-col items-center gap-2 text-center">
                  <span
                    className="grid h-[19px] w-[19px] place-items-center rounded-full border-2 text-[0.6rem] font-bold transition-[background,border-color,transform] duration-300 group-hover:scale-110"
                    style={{ borderColor: on || past ? highlight : `color-mix(in oklab, ${ink} 30%, transparent)`, background: on ? highlight : past ? highlight : "#fff", color: on ? ink : "transparent" }}
                  >
                    {on ? i + 1 : ""}
                  </span>
                  <span className={`hidden text-[0.8rem] leading-tight transition-colors sm:block ${on ? "font-medium" : "opacity-55 group-hover:opacity-100"}`}>{x.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="px-4 pb-8 pt-2 md:px-8">
          {/* phones */}
          <div
            className="relative mx-auto h-[380px] w-full select-none overflow-hidden outline-none md:h-[460px]"
            style={{ perspective: "1400px" }}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={`App screens, ${active + 1} of ${n}: ${cur.title}`}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              x0.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (x0.current === null) return;
              const dx = e.clientX - x0.current;
              x0.current = null;
              if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
            }}
          >
            {media.map((m, i) => {
              const o = i - active;
              const a = Math.abs(o);
              return (
                <button
                  key={i}
                  type="button"
                  tabIndex={-1}
                  aria-hidden={o !== 0}
                  onClick={() => go(i)}
                  className="absolute left-1/2 top-1/2 h-[94%] transition-[transform,opacity,filter] duration-500"
                  style={{
                    aspectRatio: "0.49",
                    transform: `translate(-50%, -50%) translateX(${o * 62}%) translateZ(${-a * 140}px) rotateY(${o * -22}deg) scale(${1 - a * 0.1})`,
                    opacity: a > 2 ? 0 : 1 - a * 0.3,
                    filter: a ? `saturate(${1 - a * 0.25}) drop-shadow(0 10px 18px rgb(14 46 81 / .12))` : "drop-shadow(0 28px 36px rgb(14 46 81 / .28))",
                    zIndex: 10 - a,
                    transitionTimingFunction: "var(--ease-out-soft)",
                    pointerEvents: a > 2 ? "none" : undefined,
                  }}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {/* the step */}
          <div aria-live="polite" className="mx-auto mt-4 max-w-[46ch] text-center">
            <div key={active} className="pl-fade">
              <p className="meta tabular-nums" style={{ color: "var(--color-marigold-ink)" }}>
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                {cur.tag && <span className="ml-2 rounded-full px-2 py-0.5 normal-case tracking-normal" style={{ background: `color-mix(in oklab, ${ink} 8%, transparent)`, color: ink }}>{cur.tag}</span>}
              </p>
              <p className="mt-3 font-display-soft text-[1.75rem] leading-tight">{cur.title}</p>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{cur.body}</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button type="button" aria-label="Previous screen" onClick={() => go(active - 1)} disabled={active === 0} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white transition-colors hover:border-ink/30 disabled:opacity-30">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path {...P} d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next screen"
                onClick={() => go(active + 1)}
                disabled={active === n - 1}
                className="flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-[filter] hover:brightness-110 disabled:opacity-30"
                style={{ background: highlight, color: ink }}
              >
                {active === n - 1 ? "End of flow" : `Next: ${screens[active + 1].title}`}
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path {...P} d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-[0.8rem] text-ink-mute">Tap a phone or a step, swipe, or use the arrow keys.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
