"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function useNarrow(px = 640) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${px - 1}px)`);
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [px]);
  return narrow;
}

type Turn = { dir: 1 | -1; from: number };

/**
 * A document as a book: the cover on its own, then two-page spreads that
 * turn with a 3D leaf. Click a page or its corner, drag, or use the arrows.
 * On narrow screens it shows one page at a time. `pages[i]` is page i rendered.
 */
export function FlipBook({ title, pages, ratio }: { title: string; pages: ReactNode[]; ratio: number }) {
  const n = pages.length;
  const narrow = useNarrow();
  // Spread 0 is the cover alone on the right; then [1,2], [3,4]…; a last odd page sits alone on the left
  const spreads: [number | null, number | null][] = [[null, 0]];
  for (let i = 1; i < n; i += 2) spreads.push([i, i + 1 < n ? i + 1 : null]);
  const [s, setS] = useState(0);
  const [one, setOne] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [seen, setSeen] = useState(false);
  const drag = useRef<number | null>(null);

  const settle = (t: Turn) => {
    setS(t.from + t.dir);
    setTurn(null);
  };
  // Settle the turn even if animationend never fires (e.g. a background tab)
  useEffect(() => {
    if (!turn) return;
    const t = window.setTimeout(() => settle(turn), 1000);
    return () => window.clearTimeout(t);
  }, [turn]);

  const go = (d: 1 | -1) => {
    setSeen(true);
    if (narrow) {
      setOne((p) => Math.max(0, Math.min(n - 1, p + d)));
      return;
    }
    if (turn) return;
    const to = s + d;
    if (to < 0 || to >= spreads.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setS(to);
    else setTurn({ dir: d, from: s });
  };
  const jump = (page: number) => {
    setSeen(true);
    setTurn(null);
    if (narrow) setOne(page);
    else setS(page === 0 ? 0 : Math.ceil(page / 2));
  };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    go(d);
  };
  const down = (e: PointerEvent) => {
    drag.current = e.clientX;
  };
  const up = (e: PointerEvent, side: 0 | 1 | null) => {
    const x0 = drag.current;
    drag.current = null;
    if (x0 === null) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    else if (side !== null) go(side ? 1 : -1);
  };

  const cur = spreads[turn ? turn.from : s];
  const next = turn ? spreads[turn.from + turn.dir] : null;
  // What lies flat while a leaf turns: forward shows the new right page underneath, back the new left
  const left = turn && turn.dir < 0 ? next![0] : cur[0];
  const right = turn && turn.dir > 0 ? next![1] : cur[1];
  const at = turn ? turn.from + turn.dir : s;
  // Centre the book when only one side has a page
  const shift = spreads[at][0] === null ? -25 : spreads[at][1] === null ? 25 : 0;
  const shown = spreads[at].filter((x): x is number => x !== null).map((x) => x + 1);
  const label = narrow ? `Page ${one + 1} of ${n}` : at === 0 ? `Cover · 1 of ${n}` : `${shown.length > 1 ? "Pages" : "Page"} ${shown.join("–")} of ${n}`;

  const face = (i: number | null, side: "l" | "r") =>
    i === null ? null : (
      <div className="absolute inset-0 overflow-hidden bg-white">
        {pages[i]}
        {/* gutter shading toward the spine */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 w-10" style={{ [side === "l" ? "right" : "left"]: 0, background: `linear-gradient(to ${side === "l" ? "left" : "right"}, rgb(0 0 0 / .16), transparent)` }} />
      </div>
    );

  return (
    <div>
      <div className="rounded-media border border-line px-3 py-8 md:px-8 md:py-12" style={{ background: "radial-gradient(90% 70% at 50% 45%, #fbf9f4, var(--color-paper-deep))" }}>
        {narrow ? (
          <div
            className="relative mx-auto w-[82%] overflow-hidden rounded-[6px] shadow-[0_24px_50px_-20px_rgb(26_25_22/.5)] outline-none"
            style={{ aspectRatio: ratio }}
            onPointerDown={down}
            onPointerUp={(e) => up(e, null)}
            tabIndex={0}
            role="region"
            aria-roledescription="book"
            aria-label={`${title}, ${label}`}
            onKeyDown={onKey}
          >
            <div key={one} className="pl-fade absolute inset-0 bg-white">
              {pages[one]}
            </div>
          </div>
        ) : (
          <div
            className="relative mx-auto w-full max-w-[760px] outline-none"
            style={{ aspectRatio: ratio * 2, perspective: "2200px" }}
            tabIndex={0}
            role="region"
            aria-roledescription="book"
            aria-label={`${title}, ${label}. Use the arrow keys to turn pages.`}
            onKeyDown={onKey}
          >
            <div className="absolute inset-0 transition-transform duration-700" style={{ transform: `translateX(${shift}%)`, transitionTimingFunction: "var(--ease-in-out-soft)", transformStyle: "preserve-3d" }}>
              <span aria-hidden className="absolute inset-y-[3%] rounded-[6px] shadow-[0_30px_60px_-24px_rgb(26_25_22/.55)] transition-[left,right] duration-700" style={{ left: shift < 0 ? "50%" : "0", right: shift > 0 ? "50%" : "0" }} />
              <div className="absolute inset-y-0 left-0 w-1/2 cursor-pointer" onPointerDown={down} onPointerUp={(e) => up(e, 0)} aria-hidden>
                {face(left, "l")}
              </div>
              <div className="group absolute inset-y-0 right-0 w-1/2 cursor-pointer" onPointerDown={down} onPointerUp={(e) => up(e, 1)} aria-hidden>
                {face(right, "r")}
                {/* corner curl: a nudge that the page turns */}
                {right !== null && !turn && at < spreads.length - 1 && (
                  <span className={`pointer-events-none absolute bottom-0 right-0 block h-12 w-12 origin-bottom-right transition-transform duration-300 group-hover:scale-125 ${seen ? "" : "fb-curl"}`}>
                    <span className="absolute inset-0" style={{ background: "linear-gradient(225deg, var(--color-paper-deep) 50%, #f2efe8 50%, #d9d4c8 100%)", boxShadow: "-3px -3px 8px rgb(0 0 0 / .12)", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
                  </span>
                )}
              </div>
              {shift === 0 && <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/15" />}

              {/* the turning leaf */}
              {turn && next && (
                <div
                  className={`absolute inset-y-0 w-1/2 ${turn.dir > 0 ? "right-0 origin-left fb-turn-fwd" : "left-0 origin-right fb-turn-back"}`}
                  style={{ transformStyle: "preserve-3d" }}
                  onAnimationEnd={() => settle(turn)}
                  aria-hidden
                >
                  <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                    {face(turn.dir > 0 ? cur[1] : cur[0], turn.dir > 0 ? "r" : "l")}
                    <span className="fb-shade pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to ${turn.dir > 0 ? "left" : "right"}, rgb(0 0 0 / .25), transparent 60%)` }} />
                  </div>
                  <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    {face(turn.dir > 0 ? next[0] : next[1], turn.dir > 0 ? "l" : "r")}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous page" onClick={() => go(-1)} disabled={narrow ? one === 0 : at === 0} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card transition-colors hover:border-ink/30 disabled:opacity-35">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path {...P} d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <p className="meta min-w-[10rem] text-center tabular-nums text-ink-soft" aria-live="polite">
            {label}
          </p>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => go(1)}
            disabled={narrow ? one === n - 1 : at === spreads.length - 1}
            className="grid h-11 w-11 place-items-center rounded-full text-paper transition-[filter] hover:brightness-110 disabled:opacity-35"
            style={{ background: "var(--accent)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path {...P} d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        {!seen && <p className="mt-3 text-center text-sm text-ink-mute">Click a page, drag it, or use the arrows to turn</p>}
      </div>

      <ol className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Pages">
        {pages.map((p, i) => {
          const on = narrow ? i === one : spreads[at].includes(i);
          return (
            <li key={i} className="shrink-0">
              <button
                type="button"
                aria-label={`Go to page ${i + 1}`}
                aria-current={on}
                onClick={() => jump(i)}
                className={`relative block w-12 overflow-hidden rounded-[3px] bg-white transition-[box-shadow,opacity] md:w-14 ${on ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                style={{ aspectRatio: ratio, boxShadow: on ? "0 0 0 2px var(--accent)" : "0 0 0 1px var(--color-line)" }}
              >
                {p}
                <span className="absolute bottom-0.5 right-1 text-[0.6rem] font-semibold tabular-nums text-ink/60">{i + 1}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
