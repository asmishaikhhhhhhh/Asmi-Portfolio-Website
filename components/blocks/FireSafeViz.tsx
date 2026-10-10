"use client";

import { useId, useState, type KeyboardEvent } from "react";

/* ---------------- Training staircase ---------------- */

type Stage = { title: string; image: string; ours?: { label: string; body: string; weeks?: string[]; photo?: string } };

/**
 * A programme as a staircase of stages. Ours are marked; hover, tap or
 * arrow-key a step to read what happens there.
 */
export function StageStairs({ heading, stages, mark }: { heading?: string; stages: Stage[]; mark: string }) {
  const first = Math.max(0, stages.findIndex((s) => s.ours));
  const [active, setActive] = useState(first);
  const id = useId();
  const n = stages.length;
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(n - 1, active + d));
    setActive(next);
    document.getElementById(`${id}-s-${next}`)?.focus();
  };
  const cur = stages[active];
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-mute">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
          {mark}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-line bg-paper" />
          Existing training
        </span>
      </div>

      {/* Desktop staircase */}
      <div role="tablist" aria-label="Training stages" onKeyDown={onKey} className="relative mt-8 hidden md:block" style={{ height: `${n * 96 + 110}px` }}>
        {stages.map((s, i) => {
          const on = i === active;
          const left = `${(i / n) * 100}%`;
          const top = i * 96;
          return (
            <button
              key={s.title}
              id={`${id}-s-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onPointerEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group absolute text-left"
              style={{ left, top, width: `${100 / n}%` }}
            >
              {/* tread and riser: the line runs just under this step's photo, and drops from the step before */}
              <span
                aria-hidden
                className={`pointer-events-none absolute left-0 right-0 top-[18px] h-[96px] border-b transition-colors ${i > 0 ? "border-l" : ""}`}
                style={{ borderColor: on ? "var(--accent)" : "var(--color-line)" }}
              />
              <span className="relative block pl-3 pr-2">
                <span
                  title={s.title}
                  className={`line-clamp-3 block h-[3.9em] text-[0.78rem] leading-[1.3] transition-colors ${on ? "font-medium text-ink" : "text-ink-mute group-hover:text-ink"}`}
                >
                  {s.title}
                </span>
                <span className="mt-1.5 flex items-center gap-2">
                  <span
                    className="block h-10 w-[min(6rem,100%)] shrink-0 overflow-hidden rounded-full transition-[transform,box-shadow] duration-300"
                    style={on ? { boxShadow: "0 0 0 3px var(--accent)", transform: "scale(1.06)" } : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt="" className="h-full w-full object-cover" />
                  </span>
                  {s.ours && <span aria-label={mark} className="h-3 w-3 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />}
                </span>
              </span>
            </button>
          );
        })}
        {/* detail, tucked into the empty corner of the staircase */}
        <div className="absolute right-0 top-0 w-[42%] rounded-media border border-line bg-card p-6" aria-live="polite">
          <Detail i={active} n={n} cur={cur} mark={mark} />
        </div>
      </div>

      {/* Mobile list */}
      <div className="mt-6 space-y-4 md:hidden">
        <ol className="space-y-2">
          {stages.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full items-center gap-3 rounded-media border p-2.5 text-left ${i === active ? "border-transparent bg-card shadow-[0_0_0_2px_var(--accent)]" : "border-line"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" className="h-9 w-16 rounded-full object-cover" />
                <span className="flex-1 text-sm">{s.title}</span>
                {s.ours && <span aria-label={mark} className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />}
              </button>
            </li>
          ))}
        </ol>
        <div className="rounded-media border border-line bg-card p-6" aria-live="polite">
          <Detail i={active} n={n} cur={cur} mark={mark} />
        </div>
      </div>
    </div>
  );
}

function Detail({ i, n, cur, mark }: { i: number; n: number; cur: Stage; mark: string }) {
  return (
    <div key={i} className="pl-fade">
      <div className="flex items-start gap-4">
        {cur.ours?.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cur.ours.photo} alt="" className="hidden h-16 w-28 shrink-0 rounded-full object-cover lg:block" />
        )}
        <div>
          <p className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
            Stage {i + 1} of {n}
          </p>
          <p className="mt-1.5 font-display-soft text-[1.3rem] leading-tight">{cur.title}</p>
        </div>
      </div>
      {cur.ours ? (
        <>
          {cur.ours.weeks && (
            <ol className="mt-4 space-y-1 text-[0.9rem] text-ink-soft">
              {cur.ours.weeks.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ol>
          )}
          <p className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium" style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}>
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            {mark}: {cur.ours.label}
          </p>
          <p className="mt-2.5 text-[0.9rem] leading-snug text-ink-soft">{cur.ours.body}</p>
        </>
      ) : (
        <p className="mt-3 text-[0.95rem] leading-snug text-ink-mute">Part of the existing programme. FireSafe doesn't add a module here.</p>
      )}
    </div>
  );
}

/* ---------------- Findings → opportunities ---------------- */

type Chain = { observation: string; insight: string; opportunity: string };

/** Each finding as a three-step flow, from what we saw to what we could do. */
export function InsightFlow({ heading, items }: { heading?: string; items: Chain[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const cur = items[active];
  const steps = [
    { k: "Observation", v: cur.observation, tone: "var(--color-card)", ink: "var(--color-ink)" },
    { k: "Insight", v: cur.insight, tone: "color-mix(in oklab, var(--accent) 12%, #fbf9f4)", ink: "var(--color-ink)" },
    { k: "Opportunity", v: cur.opportunity, tone: "var(--accent-ink)", ink: "#fbf9f4" },
  ];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + items.length) % items.length;
    setActive(next);
    document.getElementById(`${id}-t-${next}`)?.focus();
  };
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div role="tablist" aria-label="Findings" onKeyDown={onKey} className="flex flex-wrap gap-2">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={i}
              id={`${id}-t-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${id}-p`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
              style={on ? { background: "var(--accent-ink)" } : undefined}
            >
              <span className="tabular-nums opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-[16rem] truncate">{it.opportunity}</span>
            </button>
          );
        })}
      </div>
      <div id={`${id}-p`} role="tabpanel" className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        {steps.map((s, i) => (
          <div key={`${active}-${s.k}`} className="contents">
            <section
              className="pl-fade flex flex-col rounded-media border p-6 md:p-8"
              style={{ background: s.tone, color: s.ink, borderColor: i === 2 ? "transparent" : "var(--color-line)", animationDelay: `${i * 90}ms` }}
            >
              <p className="meta" style={{ color: i === 2 ? "color-mix(in oklab, #fbf9f4 75%, transparent)" : "var(--accent-ink)" }}>
                0{i + 1} · {s.k}
              </p>
              <p className={`mt-3 leading-snug ${i === 2 ? "font-display-soft text-[1.35rem]" : "text-[0.98rem]"}`}>{s.v}</p>
            </section>
            {i < 2 && (
              <span aria-hidden className="grid place-items-center text-ink-mute max-md:rotate-90">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-mute">
        Finding {active + 1} of {items.length}. Use the tabs or arrow keys to step through.
      </p>
    </div>
  );
}

/* ---------------- What we heard ---------------- */

/** Interview takeaways as speech bubbles. */
export function HeardBubbles({ heading, items, source }: { heading?: string; items: { title: string; body: string }[]; source?: string }) {
  const bg = "color-mix(in oklab, var(--accent) 9%, #fbf9f4)";
  const edge = "color-mix(in oklab, var(--accent) 35%, transparent)";
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <ul className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.title} className="flex">
            <figure
              className="relative flex w-full flex-col rounded-media border p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,.08)] md:p-8"
              style={{ background: bg, borderColor: edge }}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" style={{ color: "var(--accent)" }} fill="currentColor">
                <path d="M9.5 6C6.5 6.6 4.5 9 4.5 12.2V18h5.6v-5.6H7.4c0-1.7 1-3 2.6-3.6Zm9 0c-3 .6-5 3-5 6.2V18h5.6v-5.6h-2.7c0-1.7 1-3 2.6-3.6Z" />
              </svg>
              <p className="mt-3 font-display-soft text-[1.25rem] leading-tight">{it.title}</p>
              <p className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{it.body}</p>
              {/* bubble tail */}
              <span aria-hidden className="absolute -bottom-[9px] left-8 h-4 w-4 rotate-45 border-b border-r" style={{ background: bg, borderColor: edge }} />
            </figure>
          </li>
        ))}
      </ul>
      {source && <p className="mt-2 text-sm text-ink-mute">{source}</p>}
    </div>
  );
}

/* ---------------- Concept comparison ---------------- */

type Concept = { name: string; verdict: "kept" | "dropped"; columns: { label: string; items: string[] }[] };

/** Concepts explored, one at a time: a ghost title over concept, value and why it stayed or went. */
export function ConceptTabs({ heading, concepts, footnote }: { heading?: string; concepts: Concept[]; footnote?: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const c = concepts[active];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + concepts.length) % concepts.length;
    setActive(next);
    document.getElementById(`${id}-c-${next}`)?.focus();
  };
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div role="tablist" aria-label="Concepts" onKeyDown={onKey} className="flex flex-wrap gap-2">
        {concepts.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.name}
              id={`${id}-c-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${id}-cp`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
              style={on ? { background: "var(--accent-ink)" } : undefined}
            >
              <span className="tabular-nums opacity-70">0{i + 1}</span>
              {x.name}
              <span
                aria-label={x.verdict === "kept" ? "carried forward" : "dropped"}
                className="h-2 w-2 rounded-full"
                style={{ background: x.verdict === "kept" ? "#3fae5f" : on ? "rgba(251,249,244,.4)" : "var(--color-line)" }}
              />
            </button>
          );
        })}
      </div>
      <section id={`${id}-cp`} role="tabpanel" aria-labelledby={`${id}-c-${active}`} className="relative mt-4 overflow-hidden rounded-media border border-line bg-card p-6 md:p-8">
        <div key={active} className="pl-fade">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p aria-hidden className="font-display-soft text-[clamp(4rem,2.6rem+6vw,8.5rem)] leading-[0.9] text-ink/10">
              {c.name}
            </p>
            <span
              className="mt-2 rounded-full px-3.5 py-1.5 text-sm font-medium"
              style={c.verdict === "kept" ? { background: "#e3f5e7", color: "#1f6b33" } : { background: "var(--color-paper-deep)", color: "var(--color-ink-mute)" }}
            >
              {c.verdict === "kept" ? "Carried forward" : "Dropped"}
            </span>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-0">
            {c.columns.map((col, i) => (
              <div key={col.label} className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l-2"} ${i === c.columns.length - 1 ? "md:pr-0" : ""}`} style={i ? { borderColor: "var(--accent)" } : undefined}>
                <p className="meta" style={{ color: "var(--accent-ink)" }}>
                  {col.label}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {col.items.map((x) => (
                    <li key={x} className="leading-snug text-ink-soft">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {footnote && <p className="mt-4 text-ink-soft">{footnote}</p>}
    </div>
  );
}
