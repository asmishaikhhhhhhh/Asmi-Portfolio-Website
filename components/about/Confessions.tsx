"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Her own design jokes, one at a time, shuffled on demand. */
export function Confessions({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  return (
    <div className="rounded-media bg-[#fff6c9] p-8 shadow-[0_14px_30px_-16px_rgb(0_0_0/.35)] md:-rotate-1 md:p-12">
      <p className="meta text-ink-mute">Through my design lens · {i + 1}/{lines.length}</p>
      <div className="mt-5 min-h-[7.5rem] md:min-h-[6rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            className="font-display-wonk text-h2 italic"
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -2, y: 8 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            &ldquo;{lines[i]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => setI((n) => (n + 1) % lines.length)}
        className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
      >
        Another one
      </button>
    </div>
  );
}
