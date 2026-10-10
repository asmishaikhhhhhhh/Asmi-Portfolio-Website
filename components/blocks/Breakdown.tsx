"use client";

import { useState, type ReactNode } from "react";

type Part = { value: number; label: string; icon?: ReactNode };

/**
 * A total and the parts it's made of: a card per part with its share, and one
 * proportional bar underneath. Hovering a part highlights it everywhere.
 */
export function Breakdown({ heading, unit, total, parts }: { heading?: string; unit: string; total: { value: number; label: string }; parts: Part[] }) {
  const [on, setOn] = useState<number | null>(null);
  const sum = parts.reduce((n, p) => n + p.value, 0) || 1;
  const tones = ["var(--accent)", "color-mix(in oklab, var(--accent) 50%, #fbf9f4)", "color-mix(in oklab, var(--accent) 24%, #fbf9f4)"];
  const pct = (v: number) => Math.round((v / sum) * 100);
  const hover = (i: number) => ({
    onPointerEnter: () => setOn(i),
    onPointerLeave: () => setOn(null),
    onFocus: () => setOn(i),
    onBlur: () => setOn(null),
  });
  const dim = (i: number) => (on === null || on === i ? 1 : 0.45);
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* total */}
        <section className="flex flex-col justify-between rounded-media p-6 text-paper md:p-8" style={{ background: "var(--accent-ink)" }}>
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-paper/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
          </svg>
          <p className="mt-8">
            <span className="block font-display-soft text-[clamp(3rem,2.4rem+2.4vw,4.5rem)] leading-none tabular-nums">
              {total.value}
              <span className="ml-1 text-[0.45em]">{unit}</span>
            </span>
            <span className="mt-2 block text-paper/75">{total.label}</span>
          </p>
        </section>
        {/* parts */}
        {parts.map((p, i) => (
          <section
            key={p.label}
            tabIndex={0}
            {...hover(i)}
            className="flex flex-col rounded-media border border-line bg-card p-6 outline-none transition-[opacity,transform,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:p-8"
            style={{ opacity: dim(i), transform: on === i ? "translateY(-4px)" : undefined, boxShadow: on === i ? "0 14px 30px rgba(0,0,0,.08)" : undefined }}
          >
            <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}>
              {p.icon}
            </span>
            <p className="mt-6 font-display-soft text-[2.4rem] leading-none tabular-nums" style={{ color: "var(--accent-ink)" }}>
              {p.value}
              <span className="ml-1 text-[0.5em]">{unit}</span>
            </p>
            <p className="mt-2 leading-snug">{p.label}</p>
            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between text-xs text-ink-mute">
                <span>Share of training</span>
                <span className="tabular-nums">{pct(p.value)}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${pct(p.value)}%`, background: tones[i % tones.length] }} />
              </div>
            </div>
          </section>
        ))}
      </div>
      {/* combined bar */}
      <div className="mt-4 flex h-3 gap-1" aria-hidden>
        {parts.map((p, i) => (
          <span
            key={p.label}
            {...hover(i)}
            className="rounded-full transition-[opacity,flex-grow] duration-500"
            style={{ flexGrow: p.value, flexBasis: 0, background: tones[i % tones.length], opacity: dim(i) }}
          />
        ))}
      </div>
    </div>
  );
}
