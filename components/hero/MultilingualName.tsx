"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nameScripts } from "@/data/names";

const INTERVAL = 2600;

/** One Google Fonts request for every script, subset to just the glyphs in the name. */
function fontsHref() {
  const families = nameScripts
    .filter((s) => s.font)
    .map((s) => `family=${encodeURIComponent(s.font!)}:wght@500`)
    .join("&");
  const text = Array.from(new Set(nameScripts.map((s) => s.text).join(""))).join("");
  return `https://fonts.googleapis.com/css2?${families}&text=${encodeURIComponent(text)}&display=swap`;
}

/**
 * "Asmi Shaikh" moving through the scripts of India. One person, many
 * languages: the multidisciplinary idea, said without a word of jargon.
 *
 * - Screen readers always hear "Asmi Shaikh" (the rotating layer is aria-hidden).
 * - Pauses on hover, while the tab is hidden, and never auto-rotates for
 *   reduced-motion users (they can still click through).
 * - Script fonts load after the page is interactive (~44 KB total).
 */
export function MultilingualName({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  // Load the script subsets after first paint.
  useEffect(() => {
    const load = () => {
      if (document.getElementById("name-fonts")) return setReady(true);
      const link = document.createElement("link");
      link.id = "name-fonts";
      link.rel = "stylesheet";
      link.href = fontsHref();
      link.onload = () => setReady(true);
      link.onerror = () => setReady(true); // system fonts still render every script
      document.head.appendChild(link);
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(load);
    else setTimeout(load, 300);
  }, []);

  useEffect(() => {
    if (reduce || paused || !ready) return;
    const tick = () => {
      if (document.visibilityState === "visible") setI((n) => (n + 1) % nameScripts.length);
    };
    const t = setInterval(tick, i === 0 ? INTERVAL + 800 : INTERVAL);
    return () => clearInterval(t);
  }, [reduce, paused, ready, i]);

  const s = nameScripts[i];
  const latin = s.lang === "en";

  return (
    <div className={className}>
      <h1 className="sr-only">Asmi Shaikh</h1>
      <button
        type="button"
        onClick={() => setI((n) => (n + 1) % nameScripts.length)}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`Asmi Shaikh, shown in ${s.languages}. Show in another language.`}
        data-cursor="Next script"
        className="group block w-full text-left"
      >
        <span
          aria-hidden
          className="relative block h-[1.2em] text-display"
          style={{ lineHeight: 1.15 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={s.text}
              lang={s.lang}
              dir={s.dir}
              className={`absolute left-0 top-0 block whitespace-nowrap ${latin ? "font-display-soft tracking-[-0.03em]" : ""}`}
              style={{
                fontFamily: s.font ? `"${s.font}", var(--font-display)` : undefined,
                fontWeight: latin ? 400 : 500,
                fontSize: `${s.scale ?? 0.8}em`,
                lineHeight: 1.15,
                marginTop: s.shift ? `${s.shift}em` : undefined,
                transformOrigin: "left center",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.25em", filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.2em", filter: "blur(8px)" }}
              transition={{ duration: reduce ? 0 : 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {s.text}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
      <p aria-hidden className="meta mt-3 flex items-center gap-3 text-ink-mute">
        <span className="inline-block h-px w-8 bg-line" />
        <span className="tabular-nums">
          {s.languages}
          <span className="text-line"> · </span>
          {String(i + 1).padStart(2, "0")}/{nameScripts.length}
        </span>
      </p>
    </div>
  );
}
