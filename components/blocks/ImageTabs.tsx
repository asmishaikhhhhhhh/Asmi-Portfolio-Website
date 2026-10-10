"use client";

import { useId, useState, type KeyboardEvent } from "react";

type Item = { label: string; image: string; alt: string; caption?: string };

/**
 * A set of related images browsed one at a time: a list of labels beside a
 * large view. Hover, tap or arrow-key through them.
 */
export function ImageTabs({ heading, intro, items, dark }: { heading?: string; intro?: string; items: Item[]; dark?: boolean }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const cur = items[active];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + items.length) % items.length;
    setActive(next);
    document.getElementById(`${id}-i-${next}`)?.focus();
  };
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="-mt-2 mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="grid gap-4 rounded-media border border-line bg-card p-4 md:grid-cols-[minmax(0,15rem)_1fr] md:p-5">
        <ol role="tablist" aria-orientation="vertical" aria-label={heading ?? "Images"} onKeyDown={onKey} className="no-scrollbar flex gap-1.5 overflow-x-auto md:flex-col md:overflow-visible">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.label} className="shrink-0">
                <button
                  id={`${id}-i-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`${id}-v`}
                  tabIndex={on ? 0 : -1}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-left text-sm transition-colors ${on ? "text-paper" : "text-ink-soft hover:bg-paper-deep"}`}
                  style={on ? { background: "var(--accent-ink)" } : undefined}
                >
                  <span className={`tabular-nums ${on ? "text-paper/70" : "text-ink-mute"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap md:whitespace-normal">{it.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <figure id={`${id}-v`} role="tabpanel" aria-labelledby={`${id}-i-${active}`} className="min-w-0">
          <div className={`relative aspect-[16/9] overflow-hidden rounded-[calc(var(--radius-media)-6px)] ${dark ? "bg-[#111]" : "bg-paper-deep"}`}>
            {items.map((it, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={it.image}
                src={it.image}
                alt={i === active ? it.alt : ""}
                aria-hidden={i !== active}
                loading={i < 2 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
            <span className="text-ink-soft">{cur.caption ?? cur.label}</span>
            <span className="meta shrink-0 tabular-nums text-ink-mute">
              {active + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
