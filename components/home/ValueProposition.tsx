"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { profile } from "@/data/portfolio";

/* Where each skill sits around the statement (% of the stage), in profile.helpWith order. */
const POS: [number, number, number][] = [
  // x, y, tilt
  [15, 15, -7],
  [45, 7, -4],
  [80, 13, 6],
  [89, 42, -5],
  [83, 78, 8],
  [57, 92, -3],
  [23, 86, 5],
  [10, 64, -6],
  [10, 38, 4],
];

/** One thread from a skill to the centre. It follows the pill while it's dragged. */
function Thread({
  from,
  to,
  x,
  y,
  on,
  i,
  reduce,
}: {
  from: [number, number];
  to: [number, number];
  x: MotionValue<number>;
  y: MotionValue<number>;
  on: boolean;
  i: number;
  reduce: boolean;
}) {
  const d = useTransform([x, y], ([dx, dy]: number[]) => {
    const ax = from[0] + dx, ay = from[1] + dy;
    // bow each thread a little to one side, like loose yarn pulled to a knot
    const mx = (ax + to[0]) / 2 + (ay - to[1]) * 0.18;
    const my = (ay + to[1]) / 2 - (ax - to[0]) * 0.18;
    return `M ${ax} ${ay} Q ${mx} ${my} ${to[0]} ${to[1]}`;
  });
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--color-marigold)"
      strokeLinecap="round"
      initial={reduce ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ strokeWidth: on ? 2 : 1.25, opacity: on ? 1 : 0.45, transition: "opacity .25s, stroke-width .25s" }}
    />
  );
}

function Pill({
  label,
  pos,
  i,
  x,
  y,
  stage,
  reduce,
  onActive,
}: {
  label: string;
  pos: [number, number, number];
  i: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  stage: React.RefObject<HTMLDivElement | null>;
  reduce: boolean;
  onActive: (on: boolean) => void;
}) {
  return (
    <li className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos[0]}%`, top: `${pos[1]}%` }}>
      <motion.div
        drag
        dragConstraints={stage}
        dragElastic={0.15}
        dragMomentum={false}
        onHoverStart={() => onActive(true)}
        onHoverEnd={() => onActive(false)}
        onDragStart={() => onActive(true)}
        onDragEnd={() => onActive(false)}
        style={{ x, y }}
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.07 }}
        className="cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <span
          className="block whitespace-nowrap rounded-full border border-paper/15 bg-paper/[0.07] px-5 py-2.5 text-[0.95rem] text-paper/90 backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out-soft hover:!rotate-0 hover:border-marigold hover:bg-marigold hover:text-ink"
          style={{ transform: `rotate(${pos[2]}deg)` }}
        >
          {label}
        </span>
      </motion.div>
    </li>
  );
}

/** The statement, with its two key phrases set apart. */
function Line() {
  const text = profile.valueProposition;
  const parts = text.split(/(far-flung thoughts|a single theme)/);
  return (
    <>
      {parts.map((p, k) =>
        p === "far-flung thoughts" ? (
          <em key={k} className="whitespace-nowrap font-display-wonk italic text-marigold">
            {p}
          </em>
        ) : p === "a single theme" ? (
          <em key={k} className="whitespace-nowrap font-display-wonk italic">
            {p}
          </em>
        ) : (
          p
        ),
      )}
    </>
  );
}

/**
 * "My value proposition", from Asmi's first portfolio, said the way it reads:
 * the things she can help with float far apart, and threads pull them into one
 * theme at the centre. Pills can be dragged; their threads follow.
 *
 * Small screens: the statement, then the skills as a loose pile (no threads).
 * Reduced motion: everything is simply in place.
 */
export function ValueProposition() {
  const reduce = !!useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<number | null>(null);

  // one pair of drag offsets per pill, shared with its thread
  const mx = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const my = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const skills = profile.helpWith.slice(0, POS.length);
  const knot: [number, number] = [size.w / 2, size.h / 2];

  return (
    <section aria-label="My value proposition" className="container-page py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2rem] bg-night px-6 py-16 text-paper md:px-10 md:py-10">
        {/* soft glow where the threads meet */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 38% 34% at 50% 50%, rgb(227 162 59 / 0.12), transparent 70%)" }}
        />

        {/* Small screens: statement first, skills below */}
        <div className="relative md:hidden">
          <p className="meta text-paper/60">My value proposition</p>
          <h2 className="mt-4 font-display-soft text-h2">
            <Line />
          </h2>
          <p className="meta mt-10 text-paper/60">What I can help with</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {skills.map((s, i) => (
              <li
                key={s}
                className="rounded-full border border-paper/15 bg-paper/[0.07] px-4 py-2 text-sm text-paper/90"
                style={{ transform: `rotate(${POS[i][2] * 0.4}deg)` }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Larger screens: skills orbit the statement, threaded to its centre */}
        <div ref={stage} className="relative hidden h-[40rem] select-none md:block lg:h-[42rem]">
          {size.w > 0 && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              // threads fade out before they reach the words, as if they disappear into them
              style={{ maskImage: "radial-gradient(ellipse 30% 26% at 50% 50%, transparent 45%, #000 100%)" }}
            >
              {skills.map((s, i) => (
                <Thread
                  key={s}
                  i={i}
                  from={[(POS[i][0] / 100) * size.w, (POS[i][1] / 100) * size.h]}
                  to={knot}
                  x={mx[i]}
                  y={my[i]}
                  on={active === i}
                  reduce={reduce}
                />
              ))}
            </svg>
          )}

          <div className="absolute left-1/2 top-1/2 w-[min(34rem,52%)] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="meta text-paper/60">My value proposition</p>
            <h2 className="mt-4 font-display-soft text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">
              <Line />
            </h2>
            <p className="meta mt-6 text-paper/45">Drag the pieces around</p>
          </div>

          <ul aria-label="What I can help with">
            {skills.map((s, i) => (
              <Pill key={s} label={s} pos={POS[i]} i={i} x={mx[i]} y={my[i]} stage={stage} reduce={reduce} onActive={(on) => setActive((a) => (on ? i : a === i ? null : a))} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
