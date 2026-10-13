"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
// the fields Asmi works across, in her words
const DISCIPLINES = ["Research", "UX/UI", "Systems & Service", "UX Strategy"];
const INTERVAL = 2400;

/**
 * The hero name: "Asmi Shaikh", readable from the first frame. The letters rise
 * in once (CSS, ~0.6s, nothing waits on it). Anything passed as children sits
 * under the name. A real <h1>, so it is the page's first, largest text.
 */
export function IntroName({ name, className = "", children }: { name: string; className?: string; children?: React.ReactNode }) {
  let k = 0;
  return (
    <div className={className}>
      <h1 className="font-display-soft text-display tracking-[-0.03em]" style={{ fontSize: "calc(var(--text-display) * 0.82)", lineHeight: 1.15 }}>
        <span className="sr-only">{name}</span>
        <span aria-hidden className="whitespace-nowrap">
          {name.split(" ").map((word, w) => (
            <span key={w} className="inline-block whitespace-nowrap">
              {w > 0 && <span className="inline-block">&nbsp;</span>}
              {Array.from(word).map((ch) => (
                <span key={k} className="intro-letter inline-block" style={{ animationDelay: `${(k++) * 38}ms` }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>
      {children}
    </div>
  );
}

/**
 * "Designing across" + the fields she works across, one at a time. Pauses on
 * hover and while the tab is hidden; with reduced motion it lists every field.
 */
export function Disciplines({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible") setI((n) => (n + 1) % DISCIPLINES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    // wraps on narrow screens so the longest field name is never clipped
    <p
      className={`meta flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-mute ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <span>Designing across</span>
      {reduce ? (
        <span className="text-ink-soft">{DISCIPLINES.join(" · ")}</span>
      ) : (
        <>
          <span className="sr-only">{DISCIPLINES.join(", ")}</span>
          <span aria-hidden className="relative inline-block h-[1.35em] overflow-hidden align-bottom">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={DISCIPLINES[i]}
                className="block whitespace-nowrap text-forest"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {DISCIPLINES[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </>
      )}
    </p>
  );
}
