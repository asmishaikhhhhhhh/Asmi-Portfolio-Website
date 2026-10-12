"use client";

import { Inter } from "next/font/google";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

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
  /** bands: horizontal rows of the picture (top/height in %) that can be picked; ratio = picture width / height. */
  shots?: { label: string; views?: string[]; nda?: boolean; ratio?: number; bands?: { label: string; top: number; height: number }[] }[];
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
  // Rows start lit and step through on their own until someone picks one, so it reads as interactive
  const [band, setBand] = useState<number | null>(modules[0].shots?.[0]?.bands ? 0 : null);
  const [touched, setTouched] = useState(false);
  const id = useId();
  const m = modules[tab];
  const shots = m.shots ?? [];
  const sh = shots[shot];
  const nBands = sh?.bands?.length ?? 0;
  useEffect(() => {
    if (!nBands || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setBand((b) => ((b ?? -1) + 1) % nBands), 2600);
    return () => window.clearInterval(t);
  }, [nBands, touched]);
  const steps = STEPS.filter((s) => m[s.key]?.length);
  const st = steps[Math.min(step, steps.length - 1)];
  const pick = (i: number) => {
    setTab(i);
    setShot(0);
    setStep(0);
    setBand(modules[i].shots?.[0]?.bands ? 0 : null);
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
        {sh && (
          <div className="relative mx-3 overflow-hidden rounded-[14px] md:mx-5" style={{ background: "#0b0e12" }}>
            {/* one screen: the frame takes the picture's own shape; several: a shared 16:10 so toggling doesn't jump */}
            <div key={`s-${tab}-${shot}`} className="pl-fade relative w-full" style={{ aspectRatio: shots.length === 1 && sh.ratio ? sh.ratio : 1.6 }}>
              {sh.bands && sh.ratio ? (
                <div className="relative mx-auto h-full" style={{ aspectRatio: sh.ratio }}>
                  {media[tab]?.[shot]}
                  {/* the picked row stays lit, everything else dims */}
                  {band !== null && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-[20%] right-0 rounded-md transition-[top,height] duration-500"
                      style={{
                        top: `${sh.bands[band].top}%`,
                        height: `${sh.bands[band].height}%`,
                        boxShadow: "0 0 0 2px var(--accent), 0 0 0 9999px rgb(11 14 18 / .72)",
                      }}
                    />
                  )}
                  <span className="pointer-events-none absolute left-[1.5%] top-[2.5%] inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[clamp(0.6rem,1.1vw,0.75rem)] text-white/85 backdrop-blur">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "var(--accent)" }} />
                      <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    </span>
                    Interactive · tap a flow
                  </span>
                  {sh.bands.map((b, i) => {
                    const on = band === i;
                    return (
                      <button
                        key={b.label}
                        type="button"
                        aria-pressed={on}
                        onClick={() => (setTouched(true), setBand(i))}
                        className={`group absolute left-[1%] w-[18.5%] -translate-y-1/2 cursor-pointer px-1 py-1 text-right text-[clamp(0.62rem,1.3vw,0.88rem)] font-medium transition-colors ${on ? "text-white" : "text-white/75 hover:text-white"}`}
                        style={{ top: `${b.top + b.height / 2}%` }}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 transition-[background,border-color,transform] duration-200 group-hover:-translate-x-0.5 ${on ? "border-transparent" : "border-white/20 bg-white/[0.06] group-hover:border-white/50 group-hover:bg-white/10"}`}
                          style={on ? { background: "var(--accent)" } : undefined}
                        >
                          {b.label}
                          <svg viewBox="0 0 24 24" className={`h-3 w-3 shrink-0 transition-opacity ${on ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                media[tab]?.[shot]
              )}
              {sh.nda && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/45 py-2.5 pl-3 pr-5 text-white shadow-[0_10px_40px_-10px_rgb(0_0_0/.6)] backdrop-blur-md">
                    <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--accent)" }}>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="10.5" width="14" height="10" rx="2.2" />
                        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
                      </svg>
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold">Confidential</span>
                      <span className="block text-[0.78rem] text-white/70">Under NDA · not live yet</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
            {shots.length > 1 && (
              <div className="absolute left-3 top-3 flex gap-1 rounded-full bg-black/55 p-1 backdrop-blur" role="group" aria-label="Screens">
                {shots.map((x, i) => (
                  <button
                    key={x.label}
                    type="button"
                    aria-pressed={i === shot}
                    onClick={() => (setShot(i), setBand(x.bands ? 0 : null))}
                    className={`rounded-full px-3 py-1 text-[0.8rem] transition-colors ${i === shot ? "bg-white text-ink" : "text-white/80 hover:text-white"}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {sh?.bands && (
          <p className="mx-3 mt-3 text-sm text-ink-mute md:mx-5">Tap a flow on the left to follow it through the prototype.</p>
        )}
        {sh?.views && (
          <ul key={`v-${tab}-${shot}`} className="pl-fade mx-3 mt-3 flex flex-wrap items-center gap-1.5 md:mx-5" aria-label="Views shown">
            <li className="meta mr-1 text-ink-mute">Views</li>
            {sh.views.map((v) => (
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

/* ───────────────────────── Design tokens, live ───────────────────────── */

type Swatch = { name: string; hex: string };

const ICON_PATHS = [
  "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  "M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z",
  "M12 4 3 20h18L12 4Zm0 6v4.5m0 3v.01",
  "M4 8h16v11H4zM9 8V5h6v3",
  "M6 6a2 2 0 1 0 0 .01M18 6a2 2 0 1 0 0 .01M12 18a2 2 0 1 0 0 .01M7.5 7.5 11 16M16.5 7.5 13 16",
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3M3 12h3m12 0h3",
];

/**
 * The product's design tokens rebuilt as live parts: swatches you can copy,
 * and components you can click, coloured from the same tokens.
 */
export function DesignTokens({ neutrals, brand, severity }: { neutrals: Swatch[]; brand: Swatch[]; severity: Swatch[] }) {
  const [hover, setHover] = useState<Swatch | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [nav, setNav] = useState(2);
  const [open, setOpen] = useState<number | null>(0);
  const [findings, setFindings] = useState(2);
  const tok = (n: string) => [...neutrals, ...brand, ...severity].find((x) => x.name === n)?.hex ?? "#000";
  const copy = (s: Swatch) => {
    navigator.clipboard?.writeText(s.hex).catch(() => {});
    setCopied(s.hex);
    window.setTimeout(() => setCopied((c) => (c === s.hex ? null : c)), 1400);
  };
  const shown = hover ?? brand[1];
  const chip = (s: Swatch, big?: boolean) => (
    <button
      key={s.name}
      type="button"
      onClick={() => copy(s)}
      onPointerEnter={() => setHover(s)}
      onFocus={() => setHover(s)}
      aria-label={`${s.name} ${s.hex}, copy`}
      className={`group relative block w-full rounded-[10px] border border-black/5 transition-transform duration-200 hover:-translate-y-1 ${big ? "h-16" : "h-12"}`}
      style={{ background: s.hex }}
    >
      {copied === s.hex && (
        <span className="pl-fade absolute inset-0 grid place-items-center text-[0.7rem] font-semibold" style={{ color: parseInt(s.hex.slice(1), 16) > 0x888888 ? "#1a1916" : "#fff" }}>
          Copied
        </span>
      )}
    </button>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr]">
      {/* tokens */}
      <div className="rounded-media border border-line bg-card p-6 md:p-8" onPointerLeave={() => setHover(null)}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="meta font-semibold" style={{ color: "var(--accent-ink)" }}>
            Colour tokens
          </p>
          <p className="text-sm tabular-nums text-ink-mute" aria-live="polite">
            <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: shown.hex }} />
            {shown.name} · {shown.hex}
          </p>
        </div>

        <p className="meta mt-6 text-ink-mute">Base neutrals</p>
        <div className="mt-2 grid grid-cols-11 gap-1">
          {neutrals.map((s) => chip(s))}
        </div>
        <div className="mt-1.5 flex justify-between text-[0.7rem] text-ink-mute">
          <span>{neutrals[0].name}</span>
          <span>{neutrals[neutrals.length - 1].name}</span>
        </div>

        <p className="meta mt-6 text-ink-mute">Base brand</p>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {brand.map((s) => (
            <div key={s.name}>
              {chip(s, true)}
              <p className="mt-1.5 text-[0.78rem] leading-tight">{s.name}</p>
            </div>
          ))}
        </div>

        <p className="meta mt-6 text-ink-mute">Severity</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {severity.map((s) => (
            <div key={s.name}>
              {chip(s)}
              <p className="mt-1.5 text-[0.78rem] leading-tight">{s.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-mute">Tap a swatch to copy its hex.</p>
      </div>

      {/* components built from the tokens */}
      <div className="overflow-hidden rounded-media border border-line" style={{ background: tok("Gray 0") }}>
        <p className="meta px-6 pt-6 font-semibold md:px-8" style={{ color: tok("Cyan") }}>
          Components, live
        </p>
        <div className="flex gap-4 p-6 md:p-8">
          {/* sidebar */}
          <div className="flex flex-col gap-2 rounded-[12px] p-2" style={{ background: tok("Gray 10") }} role="group" aria-label="Sidebar states">
            <span className="mb-1 grid h-9 w-9 place-items-center" style={{ color: tok("Orange") }}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M12 3v6m0 0a3 3 0 1 0 0 .01M5 13l7-2 7 2M8 21l4-8 4 8" />
              </svg>
            </span>
            {ICON_PATHS.map((d, i) => {
              const on = i === nav;
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  aria-label={`Sidebar item ${i + 1}`}
                  onClick={() => setNav(i)}
                  className="grid h-9 w-9 place-items-center rounded-[9px] transition-colors"
                  style={{ background: on ? tok("Cyan") : "transparent", color: on ? tok("Gray 0") : tok("Gray 500") }}
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={d} />
                  </svg>
                </button>
              );
            })}
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="rounded-[8px] px-3.5 py-2 text-[0.82rem] font-medium transition-[filter] hover:brightness-110 active:brightness-95" style={{ background: tok("Cyan"), color: tok("Gray 0") }}>
                + New Case
              </button>
              {findings > 0 ? (
                <span className="flex items-center gap-2 rounded-[8px] border px-3 py-1.5 text-[0.8rem]" style={{ borderColor: tok("Gray 200"), color: tok("Gray 400") }}>
                  {findings} {findings === 1 ? "finding" : "findings"} applied
                  <button type="button" aria-label="Remove a finding" onClick={() => setFindings((f) => f - 1)} className="leading-none hover:text-white">
                    ×
                  </button>
                </span>
              ) : (
                <button type="button" onClick={() => setFindings(2)} className="text-[0.8rem] underline underline-offset-2" style={{ color: tok("Cyan") }}>
                  Reset filters
                </button>
              )}
            </div>

            {/* accordion: default, hover, clicked */}
            <div className="overflow-hidden rounded-[10px] border" style={{ borderColor: tok("Gray 100") }}>
              {["Alert details", "Investigation", "Remediation"].map((t, i) => {
                const on = open === i;
                return (
                  <div key={t} className="border-b last:border-b-0" style={{ borderColor: tok("Gray 100") }}>
                    <button
                      type="button"
                      aria-expanded={on}
                      onClick={() => setOpen(on ? null : i)}
                      className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[0.82rem] transition-colors hover:brightness-125"
                      style={{ background: on ? tok("Cyan") : tok("Gray 25"), color: on ? tok("Gray 0") : tok("Gray 400") }}
                    >
                      {t}
                      <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${on ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {on && (
                      <div className="pl-fade space-y-1.5 px-3.5 py-3" style={{ background: tok("Gray 10") }}>
                        {[0.9, 0.7, 0.8].map((w, k) => (
                          <span key={k} className="block h-1.5 rounded-full" style={{ width: `${w * 100}%`, background: tok("Gray 100") }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* severity tags, as used in the tables */}
            <div className="flex flex-wrap gap-1.5">
              {severity.map((s) => (
                <span
                  key={s.name}
                  className="rounded-[6px] px-2.5 py-1 text-[0.75rem] font-semibold"
                  style={{ background: s.hex, color: s.name === "Low" || s.name === "Medium" ? "#1a1916" : "#fff" }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="px-6 pb-6 text-[0.78rem] md:px-8" style={{ color: tok("Gray 500") }}>
          Rebuilt from the tokens: the sidebar, the accordion and the filter chip all respond.
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── Terminology mind map ───────────────────────── */

type Term = { term: string; def: string };
type Branch = { name: string; module?: string; terms: Term[] };

/**
 * The domain vocabulary as a mind map: a core, branches around it, terms on
 * each branch. Pick a term to read what it means and where it shows up.
 */
export function TermMap({ heading, intro, centre, branches }: { heading?: string; intro?: string; centre: string; branches: Branch[] }) {
  const [sel, setSel] = useState<{ b: number; t: number }>({ b: 0, t: 0 });
  const [q, setQ] = useState("");
  const [hoverB, setHoverB] = useState<number | null>(null);
  const total = branches.reduce((n, b) => n + b.terms.length, 0);
  const match = (t: Term) => !q || t.term.toLowerCase().includes(q.toLowerCase()) || t.def.toLowerCase().includes(q.toLowerCase());
  const cur = branches[sel.b];
  const term = cur.terms[sel.t];
  const half = Math.ceil(branches.length / 2);
  const sides = [branches.slice(0, half).map((b, i) => ({ b, i })), branches.slice(half).map((b, i) => ({ b, i: i + half }))];
  const litB = hoverB ?? sel.b;

  const card = (b: Branch, i: number, side: 0 | 1) => {
    const on = i === litB;
    const hits = b.terms.filter(match).length;
    return (
      <div
        key={b.name}
        onPointerEnter={() => setHoverB(i)}
        onPointerLeave={() => setHoverB(null)}
        className={`relative rounded-media border p-4 transition-[border-color,box-shadow,opacity] duration-300 md:p-5 ${q && !hits ? "opacity-40" : ""}`}
        style={{ borderColor: on ? "var(--accent)" : "var(--color-line)", background: "#fbf9f4", boxShadow: on ? "0 10px 30px -14px rgb(26 25 22 / .35)" : undefined }}
      >
        {/* connector stub toward the core */}
        <span aria-hidden className={`absolute top-1/2 hidden h-px w-6 lg:block ${side ? "-left-6" : "-right-6"}`} style={{ background: on ? "var(--accent)" : "var(--color-line)" }} />
        <span aria-hidden className={`absolute top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 lg:block ${side ? "-left-[5px]" : "-right-[5px]"}`} style={{ borderColor: on ? "var(--accent)" : "var(--color-line)", background: "#fbf9f4" }} />
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display-soft text-[1.15rem] leading-tight">{b.name}</p>
          <span className="meta tabular-nums text-ink-mute">{q ? `${hits}/` : ""}{b.terms.length}</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {b.terms.map((t, k) => {
            const picked = sel.b === i && sel.t === k;
            const hit = match(t);
            return (
              <li key={t.term}>
                <button
                  type="button"
                  aria-pressed={picked}
                  onClick={() => setSel({ b: i, t: k })}
                  className="rounded-full border px-2.5 py-1 text-[0.8rem] transition-[background,color,border-color,opacity]"
                  style={{
                    opacity: hit ? 1 : 0.3,
                    background: picked ? "var(--accent-ink)" : q && hit ? "color-mix(in oklab, var(--accent) 16%, #fbf9f4)" : "transparent",
                    borderColor: picked ? "transparent" : "var(--color-line)",
                    color: picked ? "#fbf9f4" : undefined,
                  }}
                >
                  {t.term}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="rounded-media border border-line p-4 md:p-6" style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent) 9%, #f4f0e8), #f4f0e8 70%)" }}>
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(15rem,0.85fr)_1fr] lg:gap-12">
          <div className="order-2 space-y-4 lg:order-1">
            {sides[0].map(({ b, i }) => card(b, i, 0))}
          </div>

          {/* core and the picked term */}
          <div className="order-1 flex flex-col items-center justify-center gap-5 lg:order-2">
            <div className="relative grid h-36 w-36 place-items-center rounded-full text-center text-paper" style={{ background: "var(--color-night)" }}>
              <span aria-hidden className="gv-ping absolute inset-0 rounded-full" />
              <span className="px-4">
                <span className="block font-display-soft text-[1.15rem] leading-tight">{centre}</span>
                <span className="meta mt-1 block tabular-nums" style={{ color: "var(--accent)" }}>
                  {total} terms
                </span>
              </span>
            </div>
            <label className="flex w-full max-w-[18rem] items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink-mute" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms" aria-label="Search terms" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-mute" />
            </label>
            <div key={`${sel.b}-${sel.t}`} className="pl-fade w-full rounded-media p-5 text-paper" style={{ background: "var(--color-night)" }} aria-live="polite">
              <p className="meta" style={{ color: "var(--accent)" }}>
                {cur.name}
              </p>
              <p className="mt-1.5 font-display-soft text-[1.4rem] leading-tight">{term.term}</p>
              <p className="mt-2 text-[0.92rem] leading-snug text-paper/80">{term.def}</p>
              {cur.module && (
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[0.75rem] text-paper/85">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                  Shows up in {cur.module}
                </p>
              )}
            </div>
          </div>

          <div className="order-3 space-y-4">
            {sides[1].map(({ b, i }) => card(b, i, 1))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Problems as an alert feed ───────────────────────── */

type Issue = { title: string; body: string; module: string; fix: string[] };

/**
 * The design problems written up like the alerts the product deals with: one
 * row each, open one to see how it was addressed.
 */
export function IssueFeed({ heading, items }: { heading?: string; items: Issue[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const C = { bg: "#080B0C", row: "#0E1216", line: "#1D2126", text: "#BABABA", mute: "#889398", cyan: "#49C6A8", red: "#DD4736" };
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="overflow-hidden rounded-media" style={{ background: C.bg, color: C.text }}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 md:px-7" style={{ borderColor: C.line }}>
          <p className="flex items-center gap-2.5 text-[0.95rem]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: C.red }} />
              <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: C.red }} />
            </span>
            <span style={{ color: C.cyan }}>Design issues ({items.length})</span>
            <span style={{ color: C.mute }}>· found before designing</span>
          </p>
          <p className="text-[0.8rem]" style={{ color: C.mute }}>
            Open one to see how it was addressed
          </p>
        </div>
        <ul>
          {items.map((it, i) => {
            const on = open === i;
            return (
              <li key={it.title} className="border-b last:border-b-0" style={{ borderColor: C.line, background: on ? C.row : undefined }}>
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] md:grid-cols-[auto_1fr_auto_auto] md:px-7">
                  <span className="h-8 w-1 rounded-full" style={{ background: on ? C.cyan : C.red }} />
                  <span>
                    <span className="block font-medium text-white">{it.title}</span>
                    <span className="mt-0.5 block text-[0.88rem] leading-snug" style={{ color: C.mute }}>
                      {it.body}
                    </span>
                  </span>
                  <span className="hidden rounded-[6px] px-2.5 py-1 text-[0.75rem] md:inline" style={{ background: "#1E4661", color: "#cfe3f1" }}>
                    {it.module}
                  </span>
                  <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${on ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {on && (
                  <div className="pl-fade grid gap-3 px-5 pb-5 md:grid-cols-[auto_1fr] md:gap-4 md:px-7 md:pl-[3.25rem]">
                    <span className="inline-flex h-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-medium" style={{ background: "color-mix(in oklab, #49C6A8 18%, transparent)", color: C.cyan }}>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                        <path d="m5 12 4 4 10-10" />
                      </svg>
                      Addressed
                    </span>
                    <ul className="space-y-1.5 text-[0.9rem]">
                      {it.fix.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span aria-hidden style={{ color: C.cyan }}>→</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ───────────────────────── Phone carousel ───────────────────────── */

type Slide = { kind: string; title: string };

/**
 * Phone screenshots inside an iPhone frame: swipe or drag to move between
 * them, or pick one from the list. `media[i]` is the rendered picture for slide i.
 */
export function PhoneCarousel({ heading, intro, slides, media }: { heading?: string; intro?: string; slides: Slide[]; media: ReactNode[] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const n = slides.length;
  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const k = (i + n) % n;
    el.scrollTo({ left: k * el.clientWidth, behavior: "smooth" });
    setActive(k);
  };
  const onScroll = () => {
    const el = track.current;
    if (el && !drag.current) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  // Mouse drag; touch already scrolls natively
  const down = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const move = (e: PointerEvent) => {
    if (!drag.current || !track.current) return;
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const up = (e: PointerEvent) => {
    if (!drag.current || !track.current) return;
    const el = track.current;
    const dx = e.clientX - drag.current.x;
    const from = Math.round(drag.current.left / el.clientWidth);
    drag.current = null;
    setDragging(false);
    go(Math.abs(dx) > el.clientWidth * 0.15 ? from - Math.sign(dx) : from);
  };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    go(active + d);
  };

  return (
    <div
      className="grid items-center gap-8 overflow-hidden rounded-media border border-line p-6 md:grid-cols-[1fr_auto] md:gap-12 md:p-10"
      style={{ background: "radial-gradient(120% 90% at 85% 50%, color-mix(in oklab, var(--accent) 16%, #f4f0e8), #fbf9f4 65%)" }}
    >
      <div className="order-2 md:order-1">
        {heading && <h3 className="font-display-soft text-h3">{heading}</h3>}
        {intro && <p className="mt-2 max-w-[44ch] text-ink-soft">{intro}</p>}
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-mute">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: "#0a66c2" }} />
            <span className="relative h-2 w-2 rounded-full" style={{ background: "#0a66c2" }} />
          </span>
          Live on AiStrike&rsquo;s LinkedIn page
        </p>
        <ol className="mt-5 space-y-1">
          {slides.map((x, i) => {
            const on = i === active;
            return (
              <li key={x.title}>
                <button
                  type="button"
                  aria-current={on}
                  onClick={() => go(i)}
                  className={`flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-left transition-colors ${on ? "text-paper" : "hover:bg-paper"}`}
                  style={on ? { background: "var(--color-night)" } : undefined}
                >
                  <span className="meta tabular-nums" style={{ color: on ? "var(--accent)" : "var(--accent-ink)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`meta block ${on ? "text-paper/60" : "text-ink-mute"}`}>{x.kind}</span>
                    <span className="block truncate text-[0.95rem]">{x.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* the phone */}
      <div className="order-1 mx-auto flex flex-col items-center md:order-2">
        <div className="relative rounded-[3.1rem] bg-[#141414] p-[11px] shadow-[0_40px_80px_-30px_rgb(26_25_22/.55),inset_0_0_0_1.5px_#3a3a3a]">
          {/* side buttons */}
          <span aria-hidden className="absolute -left-[3px] top-[22%] h-8 w-[3px] rounded-l bg-[#2a2a2a]" />
          <span aria-hidden className="absolute -left-[3px] top-[31%] h-14 w-[3px] rounded-l bg-[#2a2a2a]" />
          <span aria-hidden className="absolute -right-[3px] top-[27%] h-20 w-[3px] rounded-r bg-[#2a2a2a]" />
          <div className="relative w-[min(72vw,290px)] overflow-hidden rounded-[2.45rem] bg-white" style={{ aspectRatio: "739 / 1600" }}>
            <div
              ref={track}
              role="region"
              aria-roledescription="carousel"
              aria-label="LinkedIn posts"
              tabIndex={0}
              onScroll={onScroll}
              onKeyDown={onKey}
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
              className={`no-scrollbar flex h-full w-full overflow-x-auto outline-none ${dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"}`}
            >
              {slides.map((x, i) => (
                <div key={x.title} className="relative h-full w-full shrink-0 snap-center [&_img]:pointer-events-none" aria-label={`${i + 1} of ${n}: ${x.title}`} role="group" aria-roledescription="slide">
                  {media[i]}
                </div>
              ))}
            </div>
            {/* dynamic island */}
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-[1.1%] h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button type="button" aria-label="Previous post" onClick={() => go(active - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card hover:border-ink/30">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="flex gap-1.5" aria-hidden>
            {slides.map((x, i) => (
              <span key={x.title} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === active ? 22 : 6, background: i === active ? "var(--accent)" : "var(--color-line)" }} />
            ))}
          </div>
          <button type="button" aria-label="Next post" onClick={() => go(active + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card hover:border-ink/30">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-[0.8rem] text-ink-mute">Swipe or drag the screen</p>
      </div>
    </div>
  );
}
