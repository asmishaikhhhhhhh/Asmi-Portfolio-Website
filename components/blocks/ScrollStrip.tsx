"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * A horizontal strip of figures with cues that it scrolls: arrows and a
 * counter, a fade on the side that has more, a one-time peek when it first
 * comes into view, and mouse drag on desktop.
 */
export function ScrollStrip({ label, count, children }: { label: string; count: number; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lead = useRef(0);

  const measure = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const end = el.scrollLeft > max - 4;
    setEdge({ start: el.scrollLeft < 4, end });
    const kids = [...el.children] as HTMLElement[];
    const i = kids.findIndex((k) => k.offsetLeft + k.offsetWidth / 2 > el.scrollLeft + 1);
    // At the far end the last figure is in view, even if it doesn't lead
    lead.current = Math.max(0, i);
    setIndex(end ? kids.length - 1 : lead.current);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    // Peek once: slide a little to show there's more, then settle back
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (el.scrollLeft > 0) return;
        window.setTimeout(() => el.scrollBy({ left: 90, behavior: "smooth" }), 400);
        window.setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 1100);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = (d: number) => {
    const el = track.current;
    if (!el) return;
    const kids = [...el.children] as HTMLElement[];
    const target = kids[Math.min(kids.length - 1, Math.max(0, lead.current + d))];
    el.scrollTo({ left: target.offsetLeft - (kids[0]?.offsetLeft ?? 0), behavior: "smooth" });
  };

  const down = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const move = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || !track.current) return;
    if (!d.moved && Math.abs(e.clientX - d.x) > 4) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const up = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-end gap-3">
        <span className="meta tabular-nums text-ink-mute" aria-live="polite">
          {Math.min(index + 1, count)} / {count}
        </span>
        {[-1, 1].map((d) => {
          const off = d < 0 ? edge.start : edge.end;
          return (
            <button
              key={d}
              type="button"
              aria-label={d < 0 ? "Previous" : "Next"}
              disabled={off}
              onClick={() => step(d)}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors disabled:opacity-35 ${!off && d > 0 ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
              style={!off && d > 0 ? { background: "var(--accent-ink)" } : undefined}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label={`${label}, scrollable`}
          onScroll={measure}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
          className={`no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:-mx-0 md:px-0 [&_img]:pointer-events-none ${dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"}`}
        >
          {children}
        </div>
        {/* fades show which side has more */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 transition-opacity duration-300"
          style={{ background: "linear-gradient(to right, var(--color-paper), transparent)", opacity: edge.start ? 0 : 1 }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 transition-opacity duration-300"
          style={{ background: "linear-gradient(to left, var(--color-paper), transparent)", opacity: edge.end ? 0 : 1 }}
        />
      </div>
      <p className="meta mt-3 flex items-center gap-2 text-ink-mute">
        <svg viewBox="0 0 24 24" className="gv-nudge h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14m-5-5 5 5-5 5" />
        </svg>
        Scroll, drag or use the arrows
      </p>
    </div>
  );
}
