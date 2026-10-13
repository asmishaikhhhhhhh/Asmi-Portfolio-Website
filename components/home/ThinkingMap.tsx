"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import type { ThinkingNodeInfo } from "@/data/thinking";

const ord = (i: number) => String(i + 1).padStart(2, "0");

/* The eight sit evenly on a ring (viewBox units, 0–100), starting at the top. */
const R = 40;
const at = (i: number, n: number): [number, number] => {
  const a = (-90 + (360 / n) * i) * (Math.PI / 180);
  return [50 + R * Math.cos(a), 50 + R * Math.sin(a)];
};

/** A thread between two points, bowed slightly towards the centre. */
const thread = ([ax, ay]: [number, number], [bx, by]: [number, number]) => {
  const mx = (ax + bx) / 2, my = (ay + by) / 2;
  return `M ${ax} ${ay} Q ${mx + (50 - mx) * 0.3} ${my + (50 - my) * 0.3} ${bx} ${by}`;
};

/** The belief for the chosen way of thinking. */
function Belief({ node, i, small = false }: { node: ThinkingNodeInfo; i: number; small?: boolean }) {
  return (
    <div>
      <p className="meta text-forest">
        {ord(i)} · {node.label}
      </p>
      <p className={`mt-3 font-display-soft leading-snug ${small ? "text-[clamp(0.95rem,0.7rem+0.55vw,1.2rem)]" : "text-[1.2rem]"}`}>&ldquo;{node.belief}&rdquo;</p>
    </div>
  );
}

/**
 * "How I think": eight ways of thinking on a ring, every one threaded to every
 * other. The chosen one pulls its threads tight and its belief shows in the
 * middle. Until someone picks, it slowly walks round the ring by itself.
 *
 * Small screens: the belief card, then the eight as a grid of buttons.
 * Reduced motion: no walking, no drawing; the first one is simply shown.
 */
export function ThinkingMap({ nodes }: { nodes: ThinkingNodeInfo[] }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLElement>(null);
  const inView = useInView(box, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // walk round the ring while it's on screen and nobody has picked yet
  useEffect(() => {
    if (touched || reduce || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % nodes.length), 3600);
    return () => clearInterval(t);
  }, [touched, reduce, inView, nodes.length]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const pts = nodes.map((_, i) => at(i, nodes.length));

  return (
    <section ref={box} aria-labelledby="think-heading" className="mt-24 bg-paper-deep/60 py-24 md:mt-36 md:py-32">
      <div className="container-page grid items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="meta text-ink-mute">How I think</p>
          <h2 id="think-heading" className="mt-3 font-display-soft text-h2">
            Eight things I keep connecting
          </h2>
          <p className="mt-5 max-w-[40ch] text-ink-soft">
            Every project pulls on a few of these at once. Pick one to see what I believe about it.
          </p>

          {/* Small screens: the belief sits here, above the buttons */}
          <div className="mt-8 min-h-[9.5rem] rounded-card border border-line bg-card p-5 sm:hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <Belief node={nodes[active]} i={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="md:col-span-7">
          {/* The ring (tablet & desktop) */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[36rem] sm:block" role="group" aria-label="Ways of thinking">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {/* the ring itself, with a soft dashed orbit */}
              <circle cx="50" cy="50" r={R} fill="none" stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="0.25" strokeDasharray="0.5 1.2" />
              {/* string art: every one connected to every other, faintly */}
              {pts.flatMap((a, i) =>
                pts.slice(i + 1).map((b, j) => (
                  <path key={`${i}-${i + 1 + j}`} d={thread(a, b)} fill="none" stroke="var(--color-ink)" strokeOpacity="0.09" strokeWidth="0.2" />
                )),
              )}
              {/* the chosen one's threads, pulled tight in marigold */}
              <g key={active}>
                {pts.map((b, j) =>
                  j === active ? null : (
                    <motion.path
                      key={j}
                      d={thread(pts[active], b)}
                      fill="none"
                      stroke="var(--color-marigold)"
                      strokeWidth="0.45"
                      strokeLinecap="round"
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: j * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ),
                )}
                {pts.map((b, j) => (j === active ? null : <circle key={`d${j}`} cx={b[0]} cy={b[1]} r="0.9" fill="var(--color-marigold)" />))}
              </g>
            </svg>

            {/* the belief, in a disc at the centre */}
            <div
              className="absolute left-1/2 top-1/2 flex h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-line bg-paper p-[8%] text-center shadow-[0_24px_60px_-30px_rgb(26_25_22/.35)]"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Belief node={nodes[active]} i={active} small />
                </motion.div>
              </AnimatePresence>
            </div>

            {nodes.map((n, i) => {
              const on = i === active;
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[0.95rem] font-medium shadow-[0_6px_18px_-12px_rgb(26_25_22/.4)] transition-[background-color,color,border-color,scale] duration-300 ease-out-soft ${
                    on ? "scale-105 border-ink bg-ink text-paper" : "border-ink/15 bg-card text-ink hover:border-ink/40"
                  }`}
                  style={{ left: `${pts[i][0]}%`, top: `${pts[i][1]}%` }}
                >
                  <span className={`text-xs tabular-nums ${on ? "text-marigold" : "text-ink-mute"}`}>{ord(i)}</span>
                  {n.label}
                </button>
              );
            })}
          </div>

          {/* Small screens: the same eight as buttons */}
          <div className="grid grid-cols-2 gap-2 sm:hidden" role="group" aria-label="Ways of thinking">
            {nodes.map((n, i) => {
              const on = i === active;
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(i)}
                  className={`flex items-baseline gap-2 rounded-control border px-4 py-3 text-left font-medium transition-colors ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/15 bg-card"
                  }`}
                >
                  <span className={`text-xs tabular-nums ${on ? "text-marigold" : "text-ink-mute"}`}>{ord(i)}</span>
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
