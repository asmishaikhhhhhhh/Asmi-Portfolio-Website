"use client";

import { Inter } from "next/font/google";
import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

// The product's own typeface, for the type specimen
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"] });

/* ───────────────────────── Role and tools ───────────────────────── */

export type ToolIcon = "photoshop" | "illustrator" | "figma" | "jira";

const TOOL_ICONS: Record<ToolIcon, { label: string; icon: ReactNode }> = {
  photoshop: {
    label: "Photoshop",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <circle cx="24" cy="24" r="24" fill="#001e36" />
        <text x="24" y="31" textAnchor="middle" fontSize="20" fontWeight="700" fill="#31a8ff" style={{ fontFamily: "var(--font-sans)" }}>
          Ps
        </text>
      </svg>
    ),
  },
  illustrator: {
    label: "Illustrator",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <circle cx="24" cy="24" r="24" fill="#330000" />
        <text x="24" y="31" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ff9a00" style={{ fontFamily: "var(--font-sans)" }}>
          Ai
        </text>
      </svg>
    ),
  },
  figma: {
    label: "Figma",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <circle cx="24" cy="24" r="24" fill="#2c2c2c" />
        <g transform="translate(17 11)">
          <path d="M3.5 0H7v7H3.5a3.5 3.5 0 0 1 0-7Z" fill="#f24e1e" />
          <path d="M7 0h3.5a3.5 3.5 0 0 1 0 7H7Z" fill="#ff7262" />
          <path d="M3.5 7H7v7H3.5a3.5 3.5 0 0 1 0-7Z" fill="#a259ff" />
          <circle cx="10.5" cy="10.5" r="3.5" fill="#1abcfe" />
          <path d="M3.5 14H7v3.5A3.5 3.5 0 1 1 3.5 14Z" fill="#0acf83" />
        </g>
      </svg>
    ),
  },
  jira: {
    label: "Jira",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <circle cx="24" cy="24" r="23.25" fill="#fff" stroke="var(--color-line)" strokeWidth="1.5" />
        <g transform="translate(13 13)">
          <path d="M21.5 0H11a4.7 4.7 0 0 0 4.7 4.7h1.9v1.9a4.7 4.7 0 0 0 4.7 4.7V.8a.8.8 0 0 0-.8-.8Z" fill="#2684ff" />
          <path d="M16.3 5.2H5.8a4.7 4.7 0 0 0 4.7 4.7h1.9v1.9a4.7 4.7 0 0 0 4.7 4.7V6a.8.8 0 0 0-.8-.8Z" fill="#1d72f2" />
          <path d="M11 10.5H.5a4.7 4.7 0 0 0 4.7 4.7h1.9v1.9a4.7 4.7 0 0 0 4.7 4.7V11.3a.8.8 0 0 0-.8-.8Z" fill="#0052cc" />
        </g>
      </svg>
    ),
  },
};

/** The role, the tools behind it and the skills it used, as one card. */
export function RoleCard({ title, items, tools, skills }: { title: string; items: string[]; tools: ToolIcon[]; skills: string[] }) {
  return (
    <div className="grid overflow-hidden rounded-media border border-line bg-card md:grid-cols-[1.15fr_1fr]">
      <div className="p-6 md:p-9">
        <p className="meta font-semibold" style={{ color: "var(--accent-ink)" }}>
          My role
        </p>
        <p className="mt-2 font-display-soft text-h3 italic">{title}</p>
        <ul className="mt-6 space-y-3">
          {items.map((x, i) => (
            <li key={x} className="flex gap-3 text-ink-soft">
              <span className="meta mt-[0.2rem] shrink-0 tabular-nums" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line p-6 md:border-l md:border-t-0 md:p-9" style={{ background: "color-mix(in oklab, var(--accent) 6%, #fbf9f4)" }}>
        <p className="meta font-semibold" style={{ color: "var(--accent-ink)" }}>
          Tools used
        </p>
        <ul className="mt-4 flex flex-wrap gap-4">
          {tools.map((t) => (
            <li key={t} className="group flex flex-col items-center gap-1.5">
              <span className="block h-14 w-14 transition-transform duration-300 group-hover:-translate-y-1">{TOOL_ICONS[t].icon}</span>
              <span className="text-[0.75rem] text-ink-mute">{TOOL_ICONS[t].label}</span>
            </li>
          ))}
        </ul>
        <p className="meta mt-8 font-semibold" style={{ color: "var(--accent-ink)" }}>
          Skills
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((s) => (
            <li key={s} className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────────────────────── Process as overlapping circles ───────────────────────── */

type Item = { label: string; phases: number[]; x: number; y: number };

// Three circles in a 1740 × 690 frame, as on the internship deck
const C = [345, 870, 1393].map((cx) => ({ cx, cy: 348, r: 323 }));

/**
 * The process as three overlapping circles. Steps that sit on an overlap
 * belong to both phases. Hover or tap a phase, or a step, to trace it.
 */
export function VennProcess({ heading, phases, items }: { heading?: string; phases: string[]; items: Item[] }) {
  const [phase, setPhase] = useState<number | null>(null);
  const [item, setItem] = useState<number | null>(null);
  const id = useId().replace(/:/g, "");
  const litPhases = item !== null ? items[item].phases : phase !== null ? [phase] : [];
  const litItem = (i: number) => (item !== null ? i === item : phase !== null ? items[i].phases.includes(phase) : true);
  const quiet = phase !== null || item !== null;
  const clear = () => (setPhase(null), setItem(null));

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}

      {/* Desktop: the diagram */}
      <div className="@container relative hidden rounded-media border border-line bg-card px-4 py-6 sm:block md:px-8" onPointerLeave={clear}>
        <div className="relative" style={{ aspectRatio: "1740 / 690" }}>
          <svg viewBox="0 0 1740 690" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              {C.map((c, i) => (
                <clipPath key={i} id={`${id}-in-${i}`}>
                  {C.filter((_, j) => j !== i).map((o, j) => (
                    <circle key={j} cx={o.cx} cy={o.cy} r={o.r} />
                  ))}
                </clipPath>
              ))}
              {C.map((c, i) => (
                <mask key={i} id={`${id}-out-${i}`}>
                  <rect x="-20" y="-20" width="1780" height="730" fill="#fff" />
                  {C.filter((_, j) => j !== i).map((o, j) => (
                    <circle key={j} cx={o.cx} cy={o.cy} r={o.r} fill="#000" />
                  ))}
                </mask>
              ))}
            </defs>
            {C.map((c, i) => {
              const on = litPhases.includes(i);
              return (
                <g key={i}>
                  <circle cx={c.cx} cy={c.cy} r={c.r} fill="var(--accent)" style={{ fillOpacity: on ? 0.1 : 0, transition: "fill-opacity 300ms" }} />
                  <circle
                    cx={c.cx}
                    cy={c.cy}
                    r={c.r}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={on ? 4.5 : 3}
                    mask={`url(#${id}-out-${i})`}
                    style={{ opacity: quiet && !on ? 0.35 : 1, transition: "opacity 300ms" }}
                  />
                  <circle
                    cx={c.cx}
                    cy={c.cy}
                    r={c.r}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={on ? 4 : 2.6}
                    strokeDasharray="12 12"
                    clipPath={`url(#${id}-in-${i})`}
                    className={on ? "gv-flow" : ""}
                    style={{ opacity: quiet && !on ? 0.35 : 1, transition: "opacity 300ms" }}
                  />
                </g>
              );
            })}
          </svg>

          {phases.map((p, i) => {
            const on = litPhases.includes(i);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={phase === i}
                onPointerEnter={(e) => e.pointerType === "mouse" && (setItem(null), setPhase(i))}
                onClick={() => (setItem(null), setPhase(i))}
                className="absolute -translate-x-1/2 -translate-y-1/2 font-display-soft text-[2.6cqw] italic leading-none transition-colors"
                style={{ left: `${(C[i].cx / 1740) * 100}%`, top: "14%", color: on ? "var(--accent-ink)" : "var(--color-ink)" }}
              >
                {p}
              </button>
            );
          })}

          {items.map((it, i) => {
            const lit = litItem(i);
            const on = item === i;
            return (
              <button
                key={it.label}
                type="button"
                aria-pressed={on}
                aria-label={`${it.label}: ${it.phases.map((k) => phases[k]).join(" and ")}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && (setPhase(null), setItem(i))}
                onClick={() => (setPhase(null), setItem(i))}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-[1.5cqw] py-[0.6cqw] text-[1.4cqw] transition-[background,color,opacity,transform,box-shadow] duration-300"
                style={{
                  left: `${it.x}%`,
                  top: `${it.y}%`,
                  background: on || (lit && quiet) ? "var(--accent-ink)" : "#4b5361",
                  color: "#fbf9f4",
                  opacity: lit ? 1 : 0.28,
                  transform: `translate(-50%, -50%) scale(${on ? 1.08 : 1})`,
                  boxShadow: on ? "0 8px 20px -6px rgb(26 25 22 / .35)" : undefined,
                }}
              >
                {it.label}
                {it.phases.length > 1 && <span aria-hidden className="ml-[0.5cqw] inline-block h-[0.6cqw] w-[0.6cqw] rounded-full align-middle" style={{ background: "var(--accent)" }} />}
              </button>
            );
          })}
        </div>
        <p className="mt-2 flex items-center justify-center gap-2 text-sm text-ink-mute">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          Sits across two phases. Hover a phase or a step to trace it.
        </p>
      </div>

      {/* Mobile: phases stacked */}
      <ol className="space-y-3 sm:hidden">
        {phases.map((p, i) => (
          <li key={p} className="rounded-media border p-5" style={{ borderColor: "var(--accent)" }}>
            <p className="font-display-soft text-[1.4rem] italic">{p}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {items
                .filter((it) => it.phases.includes(i))
                .map((it) => (
                  <li key={it.label} className="rounded-full px-3 py-1.5 text-sm text-paper" style={{ background: it.phases.length > 1 ? "var(--accent-ink)" : "#4b5361" }}>
                    {it.label}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────────────────────── Module stories ───────────────────────── */

type Module = {
  num: string;
  name: string;
  kicker?: string;
  headline?: string;
  body?: string;
  /** Labels for the pictures in `media`, in the same order. */
  shots: { label: string; views?: string[] }[];
  chips?: string[];
  challenge?: string[];
  approach?: string[];
  impact?: string[];
};

const STEPS = [
  { key: "challenge", label: "The challenge", d: "M12 4 3 20h18L12 4Zm0 6v4.5m0 3v.01" },
  { key: "approach", label: "Design approach", d: "M4 20l4-1 11-11-3-3L5 16l-1 4Zm10-13 3 3" },
  { key: "impact", label: "My impact", d: "M4 16l5-5 4 4 7-8m0 0h-5m5 0v5" },
] as const;

/**
 * A module of the product as one story: what it is, its screens, and the
 * challenge → approach → impact behind it. Several modules become tabs.
 * `media[m][s]` is the rendered picture for module m, shot s.
 */
export function ModuleStory({ modules, media }: { modules: Module[]; media: ReactNode[][] }) {
  const [tab, setTab] = useState(0);
  const [shot, setShot] = useState(0);
  const [step, setStep] = useState(0);
  const id = useId();
  const m = modules[tab];
  const steps = STEPS.filter((s) => m[s.key]?.length);
  const st = steps[Math.min(step, steps.length - 1)];
  const pick = (i: number) => {
    setTab(i);
    setShot(0);
    setStep(0);
  };
  const onTabKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (tab + d + modules.length) % modules.length;
    pick(next);
    document.getElementById(`${id}-t-${next}`)?.focus();
  };

  return (
    <div>
      {modules.length > 1 && (
        <div role="tablist" aria-label="Modules" onKeyDown={onTabKey} className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {modules.map((x, i) => {
            const on = i === tab;
            return (
              <button
                key={x.name}
                id={`${id}-t-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${id}-p`}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                className={`rounded-media border px-4 py-3 text-left transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
                style={on ? { background: "var(--color-night)" } : undefined}
              >
                <span className="meta block tabular-nums" style={{ color: on ? "var(--accent)" : "var(--accent-ink)" }}>
                  {x.num}
                </span>
                <span className="mt-0.5 block font-medium leading-tight">{x.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <div id={`${id}-p`} role={modules.length > 1 ? "tabpanel" : undefined} aria-labelledby={modules.length > 1 ? `${id}-t-${tab}` : undefined} className="overflow-hidden rounded-media border border-line bg-card">
        {/* header */}
        <div key={`h-${tab}`} className="pl-fade grid gap-4 p-6 md:grid-cols-[1fr_1.1fr] md:gap-10 md:p-9">
          <div>
            <p className="meta font-semibold" style={{ color: "var(--accent-ink)" }}>
              {m.num} · {m.kicker ?? m.name}
            </p>
            {m.headline && <p className="mt-2 font-display-soft text-h3 leading-tight">{m.headline}</p>}
          </div>
          <div className="self-end">
            {m.body && <p className="text-[0.98rem] leading-relaxed text-ink-soft">{m.body}</p>}
            {m.chips && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {m.chips.map((c) => (
                  <li key={c} className="rounded-full border border-line px-3 py-1 text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* screens, on one dark stage so every module frames the same way */}
        <div className="relative mx-3 overflow-hidden rounded-[14px] md:mx-5" style={{ background: "#0b0e12" }}>
          <div key={`s-${tab}-${shot}`} className="pl-fade relative aspect-[16/10] w-full">
            {media[tab]?.[shot]}
          </div>
          {m.shots.length > 1 && (
            <div className="absolute left-3 top-3 flex gap-1 rounded-full bg-black/55 p-1 backdrop-blur" role="group" aria-label="Screens">
              {m.shots.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={i === shot}
                  onClick={() => setShot(i)}
                  className={`rounded-full px-3 py-1 text-[0.8rem] transition-colors ${i === shot ? "bg-white text-ink" : "text-white/80 hover:text-white"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {m.shots[shot]?.views && (
          <ul key={`v-${tab}-${shot}`} className="pl-fade mx-3 mt-3 flex flex-wrap items-center gap-1.5 md:mx-5" aria-label="Views shown">
            <li className="meta mr-1 text-ink-mute">Views</li>
            {m.shots[shot].views!.map((v) => (
              <li key={v} className="rounded-full px-2.5 py-0.5 text-[0.8rem]" style={{ background: "color-mix(in oklab, var(--accent) 12%, #fbf9f4)", color: "var(--accent-ink)" }}>
                {v}
              </li>
            ))}
          </ul>
        )}

        {/* challenge → approach → impact */}
        {st && (
          <div className="grid gap-5 p-6 md:grid-cols-[15rem_1fr] md:gap-10 md:p-9">
            <ol className="flex gap-1.5 md:flex-col" aria-label="Story">
              {steps.map((s, i) => {
                const on = s.key === st.key;
                return (
                  <li key={s.key} className="flex-1 md:flex-none">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setStep(i)}
                      className={`flex w-full items-center gap-2.5 rounded-control px-3 py-2.5 text-left text-sm transition-colors ${on ? "text-paper" : "text-ink-soft hover:bg-paper"}`}
                      style={on ? { background: "var(--accent-ink)" } : undefined}
                    >
                      <svg viewBox="0 0 24 24" className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={s.d} />
                      </svg>
                      <span className="font-medium">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div aria-live="polite">
              <ul key={`${tab}-${st.key}`} className="space-y-3">
                {m[st.key]!.map((x, i) => (
                  <li key={x} className="gv-rise flex gap-3 text-[1.02rem] leading-snug" style={{ animationDelay: `${i * 80}ms` }}>
                    <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                    {x}
                  </li>
                ))}
              </ul>
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((steps.indexOf(st) + 1) % steps.length)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  style={{ color: "var(--accent-ink)" }}
                >
                  {steps.indexOf(st) === steps.length - 1 ? `Back to ${steps[0].label.toLowerCase()}` : `Next: ${steps[steps.indexOf(st) + 1].label.toLowerCase()}`}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M5 12h14m-5-5 5 5-5 5" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        {!st && <div className="h-6" />}
      </div>
    </div>
  );
}

/* ───────────────────────── Type and spacing specimen ───────────────────────── */

type TypeRow = { name: string; size: number; line?: number; weight: number; italic?: boolean };

/** The type scale and spacing ladder as live tokens: pick a step to try it. */
export function SystemSpecimen({ family, scale, tracking, spacing }: { family: string; scale: TypeRow[]; tracking?: string; spacing: number[] }) {
  const [row, setRow] = useState(0);
  const [space, setSpace] = useState(Math.min(3, spacing.length - 1));
  const r = scale[row];
  const s = spacing[space];
  const max = Math.max(...spacing);
  // "-2%" in the deck means -0.02em
  const ls = tracking?.endsWith("%") ? `${parseFloat(tracking) / 100}em` : tracking;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-media border border-line bg-card p-6 md:p-8">
        <p className="meta font-semibold" style={{ color: "var(--accent-ink)" }}>
          {family} scale{tracking ? ` · letter spacing ${tracking}` : ""}
        </p>
        <div className="mt-4 flex h-28 items-center overflow-hidden rounded-control px-4" style={{ background: "#0b0e12", color: "#f4f0e8" }}>
          <p
            key={row}
            className="pl-fade truncate"
            style={{ fontFamily: family === "Inter" ? inter.style.fontFamily : family, fontSize: `${r.size}px`, lineHeight: r.line ? `${r.line}px` : 1.3, fontWeight: r.weight, fontStyle: r.italic ? "italic" : undefined, letterSpacing: r.name.startsWith("Header") ? ls : undefined }}
          >
            Alert triage
          </p>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {scale.map((t, i) => {
            const on = i === row;
            return (
              <li key={t.name}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setRow(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setRow(i)}
                  className={`flex w-full items-center justify-between gap-3 px-2 py-2.5 text-left text-sm transition-colors ${on ? "font-medium text-ink" : "text-ink-soft"}`}
                  style={on ? { boxShadow: "inset 3px 0 0 var(--accent)" } : undefined}
                >
                  <span>{t.name}</span>
                  <span className="tabular-nums text-ink-mute">
                    {t.size}px{t.line ? ` / ${t.line}px` : ""} · {t.weight === 300 ? "Light" : t.weight === 500 ? "Medium" : "Regular"}
                    {t.italic ? " Italic" : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-media border border-line bg-card p-6 md:p-8">
        <p className="meta font-semibold" style={{ color: "var(--accent-ink)" }}>
          Spacing · {spacing[0]}–{spacing[1]} px scale
        </p>
        {/* a card laid out with the chosen step */}
        <div className="mt-4 flex h-28 items-center justify-center rounded-control" style={{ background: "#0b0e12" }}>
          <div className="flex rounded-[10px] border border-white/15 transition-[padding,gap] duration-300" style={{ padding: s, gap: s, background: "#161b22" }}>
            {[0, 1, 2].map((k) => (
              <span key={k} className="block h-8 w-8 rounded-md" style={{ background: k ? "#2b323c" : "var(--accent)" }} />
            ))}
          </div>
        </div>
        <ul className="mt-4 space-y-1">
          {spacing.map((v, i) => {
            const on = i === space;
            return (
              <li key={v}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`${v} px`}
                  onClick={() => setSpace(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setSpace(i)}
                  className="flex w-full items-center gap-3 rounded-md px-2 py-1 text-left"
                >
                  <span className={`w-12 shrink-0 text-sm tabular-nums ${on ? "font-medium text-ink" : "text-ink-mute"}`}>{v} px</span>
                  <span className="h-3 rounded-sm transition-colors" style={{ width: `${(v / max) * 100}%`, background: on ? "var(--accent)" : "color-mix(in oklab, var(--accent) 22%, #fbf9f4)" }} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ───────────────────────── Learnings ───────────────────────── */

type Learning = { title: string; lead: string; points: string[] };

/** Learnings as cards; open one to read the thinking behind it. */
export function Learnings({ items }: { items: Learning[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {items.map((it, i) => {
        const on = i === open;
        return (
          <li key={it.title}>
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
              className={`flex h-full min-h-[17rem] w-full flex-col rounded-media border p-6 text-left transition-[background,color,border-color] duration-300 md:p-7 ${on ? "border-transparent text-paper" : "border-line bg-card"}`}
              style={on ? { background: "var(--color-night)" } : undefined}
            >
              <span className="meta tabular-nums" style={{ color: on ? "var(--accent)" : "var(--accent-ink)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 font-display-soft text-[1.5rem] italic leading-tight">{it.title}</span>
              <span className={`mt-3 text-[0.98rem] leading-snug ${on ? "text-paper/85" : "text-ink-soft"}`}>{it.lead}</span>
              {on && (
                <span className="mt-auto block pt-5">
                  {it.points.map((p, k) => (
                    <span key={p} className="gv-rise mt-2 block border-l-2 pl-3 text-[0.9rem] leading-snug text-paper/80" style={{ borderColor: "var(--accent)", animationDelay: `${k * 90}ms` }}>
                      {p}
                    </span>
                  ))}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
