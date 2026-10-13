"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ThinkingNodeInfo } from "@/data/thinking";
import type { ProjectSummary } from "@/lib/projects";
import type { ThinkingNode } from "@/lib/types";
import { askStore } from "@/lib/ask-store";

/* Irregular ring: "far-flung", but every node can reach every other. (% of the map box) */
const POS: Record<ThinkingNode, [number, number]> = {
  people: [18, 22],
  research: [52, 9],
  systems: [86, 26],
  technology: [90, 66],
  play: [58, 90],
  stories: [16, 78],
  visuals: [42, 50],
  business: [70, 46],
};

/** How many projects lean on a way of thinking, as dots, so it never reads as the item's number. */
function Pips({ n, on }: { n: number; on: boolean }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${n} project${n === 1 ? "" : "s"}`} role="img">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`h-[5px] w-[5px] rounded-full ${on ? "bg-marigold" : "bg-ink/35"}`} />
      ))}
    </span>
  );
}

const ord = (i: number) => String(i + 1).padStart(2, "0");

/**
 * "How I think": pick one way of thinking to see the belief and the projects
 * that prove it; pick two to see where they meet. Driven by each project's
 * `thinking` field, so it stays true as projects change.
 */
export function ThinkingMap({ nodes, projects }: { nodes: ThinkingNodeInfo[]; projects: ProjectSummary[] }) {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState<ThinkingNode[]>([]);

  const toggle = (id: ThinkingNode) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].slice(-2)));

  const matches = useMemo(
    () => (sel.length ? projects.filter((p) => sel.every((n) => p.thinking.includes(n))) : []),
    [sel, projects],
  );
  const counts = useMemo(() => {
    const c = {} as Record<ThinkingNode, number>;
    for (const n of nodes) c[n.id] = projects.filter((p) => p.thinking.includes(n.id)).length;
    return c;
  }, [nodes, projects]);

  const info = (id: ThinkingNode) => nodes.find((n) => n.id === id)!;
  const pairs = useMemo(() => {
    const out: [ThinkingNode, ThinkingNode][] = [];
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => out.push([a.id, b.id])));
    return out;
  }, [nodes]);

  return (
    <section aria-labelledby="think-heading" className="mt-24 bg-paper-deep/60 py-24 md:mt-36 md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="meta text-ink-mute">How I think</p>
          <h2 id="think-heading" className="mt-3 font-display-soft text-h2">
            Eight things I keep connecting
          </h2>
          <p className="mt-5 max-w-[42ch] text-ink-soft">
            Pick one to see what I believe about it. Pick two to find the project where they meet.
          </p>

          <div className="mt-10 min-h-[15rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel.join("+") || "empty"}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {sel.length === 0 && (
                  <p className="font-display-wonk text-h3 italic text-ink-mute">
                    Nothing selected yet. Start anywhere; that&rsquo;s how most of my projects begin.
                  </p>
                )}
                {sel.length === 1 && (
                  <>
                    <p className="meta text-forest">{info(sel[0]).label}</p>
                    <p className="mt-3 font-display-soft text-h3">&ldquo;{info(sel[0]).belief}&rdquo;</p>
                  </>
                )}
                {sel.length === 2 && (
                  <>
                    <p className="meta text-forest">
                      Where {info(sel[0]).label} meets {info(sel[1]).label}
                    </p>
                    <p className="mt-3 font-display-soft text-h3">
                      {matches.length
                        ? `${matches.length === 1 ? "This is" : "These are"} the project${matches.length === 1 ? "" : "s"} living at that intersection.`
                        : "No project sits exactly here yet, which sounds like a good brief."}
                    </p>
                  </>
                )}
                {sel.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {matches.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={p.href}
                          {...(p.external ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} aria-hidden />
                          {p.title} <span aria-hidden>{p.external ? "↗" : "→"}</span>
                        </Link>
                      </li>
                    ))}
                    {sel.length === 2 && matches.length === 0 && (
                      <li>
                        <button
                          type="button"
                          onClick={() => askStore.open(`What has Asmi done that combines ${info(sel[0]).label.toLowerCase()} and ${info(sel[1]).label.toLowerCase()}?`)}
                          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
                        >
                          Ask Asmi about it <span aria-hidden className="text-marigold">✦</span>
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {sel.length > 0 && (
            <button type="button" onClick={() => setSel([])} className="meta mt-6 text-ink-mute underline underline-offset-4 hover:text-ink">
              Clear selection
            </button>
          )}
        </div>

        <div className="md:col-span-7">
          {/* Map (tablet & desktop). Buttons sit over an SVG of connections. */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[36rem] sm:block" role="group" aria-label="Ways of thinking">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {pairs.map(([a, b]) => {
                const lit = sel.length === 2 && sel.includes(a) && sel.includes(b);
                const near = sel.length === 1 && (sel[0] === a || sel[0] === b);
                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={POS[a][0]}
                    y1={POS[a][1]}
                    x2={POS[b][0]}
                    y2={POS[b][1]}
                    stroke={lit ? "#e3a23b" : "#1a1916"}
                    strokeWidth={lit ? 0.7 : 0.18}
                    strokeDasharray={lit ? "0" : "0.6 1.2"}
                    initial={false}
                    animate={{ opacity: lit ? 1 : near ? 0.55 : sel.length ? 0.12 : 0.28 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </svg>
            {nodes.map((n, i) => {
              const on = sel.includes(n.id);
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(n.id)}
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.95rem] font-medium transition-[background,color,border-color,transform] duration-300 ease-out-soft hover:scale-105 ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/15 bg-card text-ink"
                  }`}
                  style={{ left: `${POS[n.id][0]}%`, top: `${POS[n.id][1]}%` }}
                >
                  <span className={`text-xs tabular-nums ${on ? "text-paper/60" : "text-ink-mute"}`}>{ord(i)}</span>
                  {n.label}
                  <Pips n={counts[n.id]} on={on} />
                </button>
              );
            })}
          </div>

          {/* Chips (mobile): same buttons, no spatial map to squint at. */}
          <div className="grid grid-cols-2 gap-2 sm:hidden" role="group" aria-label="Ways of thinking">
            {nodes.map((n, i) => {
              const on = sel.includes(n.id);
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(n.id)}
                  className={`flex flex-col items-start gap-1.5 rounded-control border px-4 py-3 text-left font-medium ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/15 bg-card"
                  }`}
                >
                  <span className="flex items-baseline gap-2">
                    <span className={`text-xs tabular-nums ${on ? "text-paper/60" : "text-ink-mute"}`}>{ord(i)}</span>
                    {n.label}
                  </span>
                  <Pips n={counts[n.id]} on={on} />
                </button>
              );
            })}
          </div>
          <p className="meta mt-4 text-center text-ink-mute">Dots show how many projects lean on each</p>
        </div>
      </div>
    </section>
  );
}
