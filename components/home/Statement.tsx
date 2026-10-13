"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

type Segment = { text: string; link?: string; theme?: boolean };

/* Deterministic pseudo-random in [-1, 1] so server and client agree. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

function Word({
  children,
  i,
  progress,
  spread,
}: {
  children: React.ReactNode;
  i: number;
  progress: MotionValue<number>;
  spread: number;
}) {
  // Far-flung start: scattered offset, tilt and faintness, all gathering to 0 together.
  // Rounded so the server and browser render identical transforms (no hydration warning).
  const ox = Math.round(rand(i, 1) * 360 * spread);
  const oy = Math.round(rand(i, 2) * 240 * spread);
  const r = Math.round(rand(i, 3) * 24);
  const x = useTransform(progress, [0, 1], [ox, 0]);
  const y = useTransform(progress, [0, 1], [oy, 0]);
  const rotate = useTransform(progress, [0, 1], [r, 0]);
  const opacity = useTransform(progress, [0, 0.6, 1], [0.18, 0.7, 1]);
  return (
    <motion.span className="inline-block will-change-transform" style={{ x, y, rotate, opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * Asmi's statement, said the way she works: the words start far-flung across the
 * page and gather into one sentence as you scroll, then a thread connects the
 * key phrases. With `connectTo` (an element id), the thread then drops down to
 * that element and, as it arrives, pours marigold into it (via the `--fill`
 * CSS variable, 0 → 1, which the element styles itself with).
 *
 * Reduced motion: the sentence is simply there, with the thread drawn.
 */
export function Statement({ segments, connectTo }: { segments: Segment[]; connectTo?: string }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const keyRefs = useRef<(HTMLElement | null)[]>([]);
  const [path, setPath] = useState<string>("");
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);
  const [drop, setDrop] = useState<{ d: string; end: { x: number; y: number } } | null>(null);
  const [spread, setSpread] = useState(1);

  const { scrollYProgress } = useScroll({ target: box, offset: ["start 0.95", "start 0.45"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const still = useMotionValue(1);
  const progress = reduce ? still : smooth;
  const thread = useTransform(progress, [0.82, 1], [0, 1]);

  // the drop to the button follows once the sentence has nearly left the middle of the screen
  const { scrollYProgress: dropRaw } = useScroll({ target: box, offset: ["end 0.72", "end 0.42"] });
  const dropSmooth = useSpring(dropRaw, { stiffness: 120, damping: 30, mass: 0.4 });
  const dropProgress = reduce ? still : dropSmooth;
  const dropLine = useTransform(dropProgress, [0, 0.75], [0, 1]);
  const dropShow = useTransform(dropLine, [0, 0.02], [0, 1]);
  const fill = useTransform(dropProgress, [0.72, 1], [0, 1]);
  useMotionValueEvent(fill, "change", (v) => {
    if (connectTo) document.getElementById(connectTo)?.style.setProperty("--fill", v.toFixed(3));
  });
  useEffect(() => {
    if (connectTo) document.getElementById(connectTo)?.style.setProperty("--fill", fill.get().toFixed(3));
  }, [connectTo, fill]);

  // Smaller scatter on small screens so words never fly off-canvas.
  useEffect(() => {
    const update = () => setSpread(Math.min(1, (box.current?.offsetWidth ?? 1200) / 1200));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Measure where the key phrases land (their resting place) and thread them together.
  useLayoutEffect(() => {
    const measure = () => {
      const host = box.current;
      if (!host) return;
      const hb = host.getBoundingClientRect();
      // Anchor under each green phrase. The phrase's own line boxes aren't moved by
      // the scattered (transformed) words inside it, so these are its resting spots.
      // For a phrase that wraps, use its widest line fragment.
      const pts = keyRefs.current.filter(Boolean).map((el) => {
        const rects = Array.from(el!.getClientRects());
        const r = rects.reduce((best, x) => (x.width > best.width ? x : best), rects[0]);
        return { x: r.left - hb.left + r.width / 2, y: r.bottom - hb.top + 4 };
      });
      setDots(pts);

      // from the last phrase, down to the top of the target, as a loose S
      const target = connectTo ? document.getElementById(connectTo) : null;
      const last = pts[pts.length - 1];
      if (target && last) {
        const t = target.getBoundingClientRect();
        const end = { x: t.left - hb.left + t.width / 2, y: t.top - hb.top - 2 };
        const k = Math.max(40, (end.y - last.y) * 0.55);
        setDrop({ d: `M ${last.x} ${last.y} C ${last.x} ${last.y + k} ${end.x} ${end.y - k} ${end.x} ${end.y}`, end });
      } else setDrop(null);

      if (pts.length < 2) return setPath("");
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const mx = (a.x + b.x) / 2;
        const my = Math.max(a.y, b.y) + 26; // dip below the line, like a loose thread
        d += ` Q ${mx} ${my} ${b.x} ${b.y}`;
      }
      setPath(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [connectTo]);

  let wordIndex = 0;
  let keyIndex = 0;

  return (
    <div ref={box} className="relative">
      <p className="relative z-10 font-display-soft text-[clamp(2rem,1.2rem+3.4vw,4.25rem)] leading-[1.12] tracking-[-0.015em]">
        {segments.map((seg, si) => {
          const words = seg.text.split(/(\s+)/);
          const rendered = words.map((w, wi) =>
            /^\s+$/.test(w) || w === "" ? (
              w
            ) : (
              <Word key={`${si}-${wi}`} i={wordIndex++} progress={progress} spread={spread}>
                {w}
              </Word>
            ),
          );

          if (seg.link) {
            const k = keyIndex++;
            return (
              <span
                key={si}
                ref={(el) => {
                  keyRefs.current[k] = el;
                }}
                className="relative inline font-display-wonk italic text-forest"
              >
                {rendered}
              </span>
            );
          }
          if (seg.theme) {
            const k = keyIndex++;
            return (
              <span
                key={si}
                ref={(el) => {
                  keyRefs.current[k] = el;
                }}
                className="relative inline font-display-wonk italic"
              >
                {rendered}
              </span>
            );
          }
          return <span key={si}>{rendered}</span>;
        })}
      </p>

      {/* The thread that connects the far-flung phrases once they've gathered */}
      {path && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
          <motion.path
            d={path}
            fill="none"
            stroke="var(--color-marigold)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="1 0"
            style={{ pathLength: thread }}
          />
          {dots.map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r={4.5} fill="var(--color-marigold)" style={{ opacity: thread }} />
          ))}
          {drop && (
            <>
              <motion.path
                d={drop.d}
                fill="none"
                stroke="var(--color-marigold)"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ pathLength: dropLine, opacity: dropShow }}
              />
              <motion.circle cx={drop.end.x} cy={drop.end.y} r={4.5} fill="var(--color-marigold)" style={{ opacity: fill }} />
            </>
          )}
        </svg>
      )}
    </div>
  );
}
