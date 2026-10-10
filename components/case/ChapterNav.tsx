"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

type Item = { id: string; label: string };

/**
 * Desktop: a sticky chapter rail beside the story, marking where you are.
 * Mobile: a slim progress bar plus a "Chapter 3/9" menu, so the rail doesn't
 * eat the screen.
 */
export function ChapterNav({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setCurrent(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const idx = Math.max(0, items.findIndex((i) => i.id === current));

  return (
    <>
      {/* Desktop rail */}
      <nav aria-label="Chapters" className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-auto lg:block">
        <p className="meta mb-4 text-ink-mute">Chapters</p>
        <ol className="space-y-1 border-l border-line">
          {items.map((it, i) => {
            const on = it.id === current;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`-ml-px flex gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                    on ? "border-[var(--accent)] font-medium text-ink" : "border-transparent text-ink-mute hover:text-ink"
                  }`}
                >
                  <span className="tabular-nums text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
                  {it.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile reading progress: pinned to the screen's top edge, above the
          header, so it never cuts across the text when the header hides */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left lg:hidden"
        style={{ scaleX: progress, background: "var(--accent)" }}
      />

      {/* Mobile chapter menu */}
      <div className="pointer-events-none fixed inset-x-0 top-16 z-30 lg:hidden [&_button]:pointer-events-auto [&_ol]:pointer-events-auto">
        <div className="flex justify-end px-3 pt-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="chapter-menu"
            className="meta rounded-full border border-line bg-paper/90 px-3 py-1.5 text-ink-soft shadow-float backdrop-blur"
          >
            Chapter {idx + 1}/{items.length} ▾
          </button>
        </div>
        {open && (
          <ol id="chapter-menu" className="mx-3 mt-2 rounded-media border border-line bg-paper p-2 shadow-float">
            {items.map((it, i) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex gap-3 rounded-control px-3 py-2.5 text-sm ${it.id === current ? "bg-paper-deep font-medium" : ""}`}
                >
                  <span className="tabular-nums text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
                  {it.label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
