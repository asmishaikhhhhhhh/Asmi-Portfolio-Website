"use client";

import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/** **bold** spans in data strings (a client-side copy of Blocks' Rich). */
function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

const P = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ───────────────────────── Surface gaps and root insights ───────────────────────── */

type Gap = { title: string; body: string };
type Root = {
  title: string;
  observation: string;
  insight: string;
  opportunity: string;
};

/**
 * Secondary research as what shows above the soil, primary research as the
 * roots underneath. Pick a leaf to read a gap, pick a root to follow it from
 * what we saw to what we could do.
 */
export function SurfaceRoots({
  heading,
  gaps,
  roots,
}: {
  heading?: string;
  gaps: Gap[];
  roots: Root[];
}) {
  const [gap, setGap] = useState(0);
  const [root, setRoot] = useState(0);
  const id = useId();
  const arrows =
    (n: number, cur: number, set: (i: number) => void, key: string) =>
    (e: KeyboardEvent) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      const next = (cur + d + n) % n;
      set(next);
      document.getElementById(`${id}-${key}-${next}`)?.focus();
    };
  const r = roots[root];

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="overflow-hidden rounded-media border border-line bg-card">
        {/* ── above the soil ── */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <p className="meta font-semibold text-ink">
            Secondary research · what shows on the surface
          </p>
          <div
            role="tablist"
            aria-label="Secondary gaps"
            onKeyDown={arrows(gaps.length, gap, setGap, "g")}
            className="mt-5 grid grid-cols-3 gap-2 md:gap-4"
          >
            {gaps.map((g, i) => {
              const on = i === gap;
              return (
                <button
                  key={g.title}
                  id={`${id}-g-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`${id}-gp`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setGap(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setGap(i)}
                  className="group flex flex-col items-center text-center"
                >
                  <svg
                    viewBox="0 0 80 64"
                    className={`h-14 w-auto transition-transform duration-500 md:h-16 ${on ? "-translate-y-1 scale-110" : "group-hover:-translate-y-0.5"}`}
                    aria-hidden
                  >
                    <path
                      d="M40 64V30"
                      stroke="var(--accent-ink)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M40 38C28 38 16 30 14 14c14 0 24 8 26 24Z"
                      fill={
                        on
                          ? "var(--accent)"
                          : "color-mix(in oklab, var(--accent) 22%, #fbf9f4)"
                      }
                      stroke="var(--accent-ink)"
                      strokeWidth="1.4"
                      className="transition-colors duration-300"
                    />
                    <path
                      d="M40 30c2-14 12-24 28-24-2 16-14 24-28 24Z"
                      fill={
                        on
                          ? "var(--accent-ink)"
                          : "color-mix(in oklab, var(--accent) 34%, #fbf9f4)"
                      }
                      stroke="var(--accent-ink)"
                      strokeWidth="1.4"
                      className="transition-colors duration-300"
                    />
                  </svg>
                  <span
                    className={`mt-2 text-sm font-medium transition-colors md:text-base ${on ? "text-ink" : "text-ink-mute group-hover:text-ink"}`}
                  >
                    {g.title}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            id={`${id}-gp`}
            role="tabpanel"
            aria-labelledby={`${id}-g-${gap}`}
            aria-live="polite"
            className="mx-auto mt-4 min-h-[4.5rem] max-w-[46ch] text-center text-[0.98rem] leading-snug text-ink-soft"
          >
            <p key={gap} className="pl-fade">
              <Bold text={gaps[gap].body} />
            </p>
          </div>
        </div>

        {/* ── soil line and roots ── */}
        <div
          className="relative mt-4"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--accent-ink) 10%, #fbf9f4), #fbf9f4 85%)",
          }}
        >
          <svg
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
            className="block h-2 w-full"
            aria-hidden
          >
            <path
              d="M0 2 Q12.5 0 25 2 T50 2 T75 2 T100 2"
              fill="none"
              stroke="var(--accent-ink)"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="px-6 pb-6 md:px-8 md:pb-8">
            {/* one root under each leaf column, same grid as the leaves */}
            <div aria-hidden className="grid grid-cols-3 gap-2 md:gap-4">
              {roots.map((_, i) => {
                const on = i === root;
                const w = i % 2 ? -1 : 1;
                return (
                  <svg
                    key={`${i}-${on}`}
                    viewBox="0 0 60 80"
                    className="mx-auto -mt-1 block h-20 w-auto overflow-visible"
                  >
                    <path
                      d={`M30 0 C${30 + 8 * w} 22 ${30 - 8 * w} 44 30 80`}
                      fill="none"
                      stroke={on ? "var(--accent-ink)" : "var(--color-line)"}
                      strokeWidth={on ? 3 : 1.8}
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                      className={on ? "gv-draw" : ""}
                    />
                    <path
                      d={`M${30 + 3 * w} 22 q${10 * w} 4 ${16 * w} 14 M${30 - 2 * w} 46 q${-10 * w} 4 ${-15 * w} 13 M${30 + 2 * w} 34 q${-7 * w} 2 ${-11 * w} 9`}
                      fill="none"
                      stroke={on ? "var(--accent-ink)" : "var(--color-line)"}
                      strokeWidth={on ? 1.8 : 1.2}
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                      className={on ? "gv-draw" : ""}
                      style={on ? { animationDelay: "350ms" } : undefined}
                    />
                  </svg>
                );
              })}
            </div>
            <p className="meta mb-3 mt-1 font-semibold text-ink">
              Primary research · why it happens
            </p>
            <div
              role="tablist"
              aria-label="Primary insights"
              onKeyDown={arrows(roots.length, root, setRoot, "r")}
              className="grid grid-cols-3 gap-2 md:gap-4"
            >
              {roots.map((it, i) => {
                const on = i === root;
                return (
                  <button
                    key={it.title}
                    id={`${id}-r-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`${id}-rp`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setRoot(i)}
                    className={`rounded-full border px-3 py-2 text-[0.82rem] transition-colors md:text-sm ${on ? "border-transparent text-paper" : "border-line bg-card text-ink-soft hover:border-ink/30"}`}
                    style={on ? { background: "var(--accent-ink)" } : undefined}
                  >
                    <span className="tabular-nums opacity-70">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {it.title}
                  </button>
                );
              })}
            </div>

            <div
              id={`${id}-rp`}
              role="tabpanel"
              aria-labelledby={`${id}-r-${root}`}
              className="mt-6"
            >
              <ol key={root} className="grid gap-3 md:grid-cols-3">
                {(
                  [
                    ["Seed", "What we observed", r.observation, "seed"],
                    ["Root", "What it means", r.insight, "root"],
                    ["Sprout", "What we could do", r.opportunity, "sprout"],
                  ] as const
                ).map(([k, label, body, glyph], i) => (
                  <li
                    key={k}
                    className="gv-rise relative rounded-media border p-5"
                    style={{
                      animationDelay: `${i * 140}ms`,
                      borderColor:
                        i === 2 ? "transparent" : "var(--color-line)",
                      background:
                        i === 2
                          ? "var(--accent-ink)"
                          : i === 1
                            ? "color-mix(in oklab, var(--accent) 10%, #fbf9f4)"
                            : "#fbf9f4",
                      color: i === 2 ? "#fbf9f4" : undefined,
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <GrowthGlyph stage={glyph} />
                      <span
                        className={`meta font-semibold ${i === 2 ? "text-paper" : "text-ink"}`}
                      >
                        {label}
                      </span>
                    </span>
                    <p
                      className={`mt-3 text-[0.95rem] leading-snug ${i === 2 ? "" : "text-ink-soft"}`}
                    >
                      {body}
                    </p>
                    {i < 2 && (
                      <span
                        aria-hidden
                        className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 place-items-center rounded-full border border-line bg-card text-ink-mute md:grid"
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3">
                          <path {...P} d="M9 6l6 6-6 6" />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowthGlyph({ stage }: { stage: "seed" | "root" | "sprout" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      {stage === "seed" && (
        <ellipse
          {...P}
          cx="12"
          cy="13"
          rx="4.5"
          ry="6"
          transform="rotate(-25 12 13)"
        />
      )}
      {stage === "root" && (
        <path
          {...P}
          d="M12 3v8m0 0c0 4-4 4-4 9m4-9c0 4 4 4 4 9m-4-5v5M4 11h16"
        />
      )}
      {stage === "sprout" && (
        <path
          {...P}
          d="M12 21v-9m0 0c0-4-3-6-7-6 0 4 3 6 7 6Zm0-2c0-4 3-7 7-7 0 4-3 7-7 7Z"
        />
      )}
    </svg>
  );
}

/* ───────────────────────── Value map ───────────────────────── */

export type CoreValue =
  | "reliability"
  | "transparency"
  | "efficiency"
  | "networking"
  | "sustainability";
export type LeapstersValue = "trust" | "transparency" | "adaptivity" | "wellbeing" | "clarity";
type Actor = "supplier" | "customer" | "farmer" | "logistics" | "teachers" | "counsellor" | "kids" | "parents";
type Edge = { from: Actor; to: Actor; values: (CoreValue | LeapstersValue)[] };

const VALUES: Record<
  string,
  { label: string; colour: string; ink: string; glyph: ReactNode }
> = {
  reliability: {
    label: "Reliability",
    colour: "#ec8a1f",
    ink: "#9a5208",
    glyph: (
      <path
        {...P}
        d="M7 11v8H4.5v-8Zm0 0 3.5-7c1.6 0 2.4 1 2 2.6L12 10h5.6a1.8 1.8 0 0 1 1.8 2.2l-1.4 5.4A1.8 1.8 0 0 1 16.2 19H7"
      />
    ),
  },
  transparency: {
    label: "Transparency",
    colour: "#e6b52c",
    ink: "#80620a",
    glyph: (
      <>
        <circle {...P} cx="10.5" cy="10.5" r="6" />
        <path {...P} d="M15 15l4.5 4.5M8 10.6l1.8 1.8 3.2-3.4" />
      </>
    ),
  },
  efficiency: {
    label: "In-time efficiency",
    colour: "#93b52a",
    ink: "#55700d",
    glyph: (
      <path
        {...P}
        d="M19.5 11A8 8 0 1 0 12 20M12 7.5V12l2.5 1.5M17 14v6m-2.5-3.5L17 14l2.5 2.5"
      />
    ),
  },
  networking: {
    label: "Networking",
    colour: "#25b896",
    ink: "#0f6b55",
    glyph: (
      <>
        <circle {...P} cx="7" cy="17" r="2.2" />
        <circle {...P} cx="12" cy="11" r="2.2" />
        <circle {...P} cx="9" cy="5" r="2" />
        <path {...P} d="M8.4 15.3 10.6 12.7M11 9.2l-1.2-2.3M14.2 10.6 19.5 9" />
      </>
    ),
  },
  sustainability: {
    label: "Sustainability",
    colour: "#2fa9d6",
    ink: "#0d6489",
    glyph: (
      <path
        {...P}
        d="M12 20v-8m0 0c0-4-3-6-7-6 0 4 3 6 7 6Zm0-1c0-4 3-6 7-6 0 4-3 6-7 6Z"
      />
    ),
  },
};

const SPOT: Record<string, { x: number; y: number; label: string }> = {
  supplier: { x: 400, y: 56, label: "Supplier" },
  customer: { x: 112, y: 250, label: "Customer" },
  farmer: { x: 688, y: 250, label: "Farmer" },
  logistics: { x: 400, y: 444, label: "Logistics" },
};
// Leapsters' value map: same layout, its own people and values (deck slide "Value mapping")
const L_VALUES: typeof VALUES = {
  trust: { label: "Trust", colour: "#F28A1E", ink: "#9a5208", glyph: VALUES.reliability.glyph },
  transparency: { label: "Transparency", colour: "#F2C14E", ink: "#80620a", glyph: VALUES.transparency.glyph },
  adaptivity: { label: "Adaptivity", colour: "#A9C23F", ink: "#55700d", glyph: <path {...P} d="M12 4.5 15 9H9Zm-6 9.5h5v5H6Zm11.5 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM8 12.5a6.5 6.5 0 0 1 2.6-4.2M16.6 10a6.5 6.5 0 0 1 .4 4M14 19.6a6.6 6.6 0 0 1-3 .2" /> },
  wellbeing: { label: "Well-being", colour: "#52D8C0", ink: "#0f6b55", glyph: <path {...P} d="M3.5 12h3l2-5 3 9 1.7-4H15m1.5 7.5s-3.5-2.2-3.5-4.6a2 2 0 0 1 3.5-1.3 2 2 0 0 1 3.5 1.3c0 2.4-3.5 4.6-3.5 4.6Z" /> },
  clarity: { label: "Clarity", colour: "#46C1EC", ink: "#0d6489", glyph: <path {...P} d="M4 13.5c2-3 4.8-4.5 8-4.5s6 1.5 8 4.5M12 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 3.5v2.5M6.5 5.5 8 7.6M17.5 5.5 16 7.6" /> },
};
const L_SPOT: typeof SPOT = {
  teachers: { x: 400, y: 56, label: "Teachers" },
  counsellor: { x: 112, y: 250, label: "Counsellor" },
  kids: { x: 688, y: 250, label: "Kids" },
  parents: { x: 400, y: 444, label: "Parents" },
};

const BOX = { w: 164, h: 56 };

/** Where a line from a box's centre towards (tx, ty) leaves the box. */
function exit(c: { x: number; y: number }, tx: number, ty: number, pad = 8) {
  const dx = tx - c.x;
  const dy = ty - c.y;
  const s = Math.min(
    dx ? (BOX.w / 2 + pad) / Math.abs(dx) : Infinity,
    dy ? (BOX.h / 2 + pad) / Math.abs(dy) : Infinity,
  );
  return { x: c.x + dx * s, y: c.y + dy * s };
}

/**
 * What each relationship in the system has to deliver. Filter by a core value
 * or focus on one actor; the arrows that carry it light up and flow.
 */
export function ValueMap({
  heading,
  edges,
  caption,
  cast = "greenly",
}: {
  heading?: string;
  edges: Edge[];
  caption?: string;
  cast?: keyof typeof CASTS;
}) {
  const { values: V, spots: S, label: mapLabel } = CASTS[cast];
  const [value, setValue] = useState<string | null>(null);
  const [actor, setActor] = useState<Actor | null>(null);
  const live = (e: Edge) =>
    (!value || (e.values as string[]).includes(value)) &&
    (!actor || e.from === actor || e.to === actor);
  const shown = edges.filter(live);
  const counts = (v: string) =>
    edges.filter((e) => (e.values as string[]).includes(v)).length;

  // Pairs that run both ways get pulled apart so both arrows read
  const geo = edges.map((e) => {
    const a = S[e.from];
    const b = S[e.to];
    const twin = edges.some((o) => o.from === e.to && o.to === e.from);
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const nx = (-(b.y - a.y) / len) * (twin ? 13 : 0);
    const ny = ((b.x - a.x) / len) * (twin ? 13 : 0);
    const s = exit(a, b.x, b.y);
    const t = exit(b, a.x, a.y, 14);
    const p1 = { x: s.x + nx, y: s.y + ny };
    const p2 = { x: t.x + nx, y: t.y + ny };
    // Straight pairs cross in the middle, so their badges sit a third of the way along instead
    const k = twin && (a.x === b.x || a.y === b.y) ? 0.3 : 0.5;
    const mid = {
      x: p1.x + (p2.x - p1.x) * k + nx * 1.9,
      y: p1.y + (p2.y - p1.y) * k + ny * 1.9,
    };
    return { p1, p2, mid, dir: { x: (b.x - a.x) / len, y: (b.y - a.y) / len } };
  });

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="rounded-media border border-line bg-card p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="meta mr-1 text-ink-mute">Core values</span>
          {Object.keys(V).map((k) => {
            const v = V[k];
            const on = value === k;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => setValue(on ? null : k)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-[background,border-color,color] duration-200"
                style={
                  on
                    ? {
                        background: v.colour,
                        borderColor: v.colour,
                        color: "#1a1916",
                      }
                    : { borderColor: "var(--color-line)", color: v.ink }
                }
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  {v.glyph}
                </svg>
                {v.label}
                <span className="tabular-nums opacity-60">{counts(k)}</span>
              </button>
            );
          })}
          {(value || actor) && (
            <button
              type="button"
              onClick={() => (setValue(null), setActor(null))}
              className="ml-auto text-sm text-ink-mute underline underline-offset-4 hover:text-ink"
            >
              Show all
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center">
          <svg
            viewBox="25 20 750 460"
            className="h-auto w-full"
            role="group"
            aria-label={mapLabel}
          >
            <defs>
              <marker
                id="gv-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  d="M1 1l8 4-8 4"
                  fill="none"
                  stroke="context-stroke"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            {edges.map((e, i) => {
              const g = geo[i];
              const on = live(e);
              const tint = value ? V[value].colour : "var(--accent-ink)";
              return (
                <g
                  key={i}
                  style={{
                    opacity: on ? 1 : 0.14,
                    transition: "opacity 300ms",
                  }}
                >
                  <line
                    x1={g.p1.x}
                    y1={g.p1.y}
                    x2={g.p2.x}
                    y2={g.p2.y}
                    stroke={on && (value || actor) ? tint : "#a39d91"}
                    strokeWidth={on && (value || actor) ? 2.4 : 1.6}
                    markerEnd="url(#gv-arrow)"
                    style={{ transition: "stroke 300ms" }}
                  />
                  {on && (value || actor) && (
                    <line
                      x1={g.p1.x}
                      y1={g.p1.y}
                      x2={g.p2.x}
                      y2={g.p2.y}
                      stroke="#fbf9f4"
                      strokeWidth="2.6"
                      strokeDasharray="3 14"
                      className="gv-flow"
                    />
                  )}
                  {e.values.map((k, j) => {
                    const off = (j - (e.values.length - 1) / 2) * 36;
                    const cx = g.mid.x + g.dir.x * off;
                    const cy = g.mid.y + g.dir.y * off;
                    const dim = value && value !== k;
                    return (
                      <g
                        key={k}
                        transform={`translate(${cx - 17} ${cy - 17})`}
                        style={{
                          opacity: dim ? 0.3 : 1,
                          transition: "opacity 300ms",
                        }}
                      >
                        <circle
                          cx="17"
                          cy="17"
                          r="17"
                          fill="#fbf9f4"
                          stroke={V[k].colour}
                          strokeWidth="1.8"
                        />
                        <svg
                          x="5"
                          y="5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          style={{ color: V[k].ink }}
                        >
                          {V[k].glyph}
                        </svg>
                      </g>
                    );
                  })}
                </g>
              );
            })}
            {(Object.keys(S) as Actor[]).map((k) => {
              const s = S[k];
              const on = actor === k;
              const touched = shown.some((e) => e.from === k || e.to === k);
              return (
                <g
                  key={k}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`Focus on ${s.label}`}
                  onClick={() => setActor(on ? null : k)}
                  onKeyDown={(ev) =>
                    (ev.key === "Enter" || ev.key === " ") &&
                    (ev.preventDefault(), setActor(on ? null : k))
                  }
                  className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[3]"
                  style={{
                    opacity: touched || on ? 1 : 0.4,
                    transition: "opacity 300ms",
                  }}
                >
                  <rect
                    x={s.x - BOX.w / 2}
                    y={s.y - BOX.h / 2}
                    width={BOX.w}
                    height={BOX.h}
                    rx="28"
                    fill={on ? "var(--accent-ink)" : "#fbf9f4"}
                    stroke="var(--accent-ink)"
                    strokeWidth="1.5"
                    style={{ transition: "fill 250ms" }}
                  />
                  <text
                    x={s.x}
                    y={s.y + 7}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="500"
                    fill={on ? "#fbf9f4" : "#1a1916"}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div aria-live="polite">
            <p className="meta text-ink-mute">
              {actor
                ? `${S[actor].label}'s relationships`
                : value
                  ? `Carried by ${V[value].label.toLowerCase()}`
                  : "Every relationship"}{" "}
              · {shown.length}
            </p>
            <ul
              key={`${value}-${actor}`}
              className="mt-3 divide-y divide-line border-y border-line"
            >
              {shown.map((e, i) => (
                <li
                  key={i}
                  className="pl-fade flex items-center justify-between gap-3 py-2.5 text-[0.92rem]"
                >
                  <span>
                    <button
                      type="button"
                      onClick={() => setActor(e.from)}
                      className="hover:underline"
                    >
                      {S[e.from].label}
                    </button>
                    <span aria-label="to" className="mx-1.5 text-ink-mute">
                      →
                    </span>
                    <button
                      type="button"
                      onClick={() => setActor(e.to)}
                      className="hover:underline"
                    >
                      {S[e.to].label}
                    </button>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    {e.values.map((k) => (
                      <span
                        key={k}
                        title={V[k].label}
                        className="grid h-6 w-6 place-items-center rounded-full border"
                        style={{
                          borderColor: V[k].colour,
                          color: V[k].ink,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          aria-label={V[k].label}
                        >
                          {V[k].glyph}
                        </svg>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-mute">
              Tap an actor to focus on it, or a value to see where it travels.
            </p>
          </div>
        </div>
      </div>
      {caption && (
        <p className="mx-auto mt-3 max-w-[64ch] text-center text-sm text-ink-mute">
          {caption}
        </p>
      )}
    </div>
  );
}

const CASTS = {
  greenly: { values: VALUES, spots: SPOT, label: "Value map of supplier, customer, farmer and logistics" },
  leapsters: { values: L_VALUES, spots: L_SPOT, label: "Value map of teachers, counsellor, kids and parents" },
};

/* ───────────────────────── Tech plan ───────────────────────── */

type Flow = {
  name: string;
  body: string;
  steps: { lane: number; label: string; via?: string }[];
};

/**
 * The tech plan as swimlanes, one per part of the system. Pick a flow and it
 * traces its path from lane to lane, step by step.
 */
export function TechPlan({
  heading,
  lanes,
  flows,
  image,
}: {
  heading?: string;
  lanes: string[];
  flows: Flow[];
  image?: { src: string; alt: string };
}) {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [full, setFull] = useState(false);
  const id = useId();
  const f = flows[active];
  const n = f.steps.length;
  const R = lanes.length;
  const pick = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };
  const onKey = (e: KeyboardEvent) => {
    const d =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + flows.length) % flows.length;
    pick(next);
    document.getElementById(`${id}-t-${next}`)?.focus();
  };
  // Measured in pixels so the stroke and its draw-in animation stay undistorted
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const cx = (c: number) => ((c + 0.5) / n) * size.w;
  const cy = (r: number) => ((r + 0.5) / R) * size.h;
  const path = f.steps
    .map((s, i) => {
      if (!i) return `M${cx(0)} ${cy(s.lane)}`;
      const p = f.steps[i - 1];
      const mx = (cx(i - 1) + cx(i)) / 2;
      return p.lane === s.lane
        ? `L${cx(i)} ${cy(s.lane)}`
        : `L${mx} ${cy(p.lane)} L${mx} ${cy(s.lane)} L${cx(i)} ${cy(s.lane)}`;
    })
    .join(" ");
  const STEP_MS = 260;

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="space-y-3">
        <div
          role="tablist"
          aria-label="Data flows"
          onKeyDown={onKey}
          className="flex flex-wrap gap-2"
        >
          {flows.map((x, i) => {
            const on = i === active;
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
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
                style={on ? { background: "var(--accent-ink)" } : undefined}
              >
                <span className="tabular-nums opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {x.name}
              </button>
            );
          })}
        </div>

        <div
          id={`${id}-p`}
          role="tabpanel"
          aria-labelledby={`${id}-t-${active}`}
          className="min-w-0 rounded-media border border-line bg-card p-5 md:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p
              key={active}
              className="pl-fade max-w-[52ch] text-[0.98rem] leading-snug text-ink-soft"
            >
              {f.body}
            </p>
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-ink/30 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                <path {...P} d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" />
              </svg>
              Replay
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-[6.5rem_1fr]">
              {/* lane labels */}
              <div
                className="grid"
                style={{ gridTemplateRows: `repeat(${R}, 4.25rem)` }}
              >
                {lanes.map((l, r) => {
                  const used = f.steps.some((s) => s.lane === r);
                  return (
                    <div
                      key={l}
                      className={`meta flex items-center border-b border-dashed border-line pr-2 transition-colors last:border-b-0 ${used ? "text-ink" : "text-ink-mute/60"}`}
                    >
                      {l}
                    </div>
                  );
                })}
              </div>
              {/* lanes with the traced flow */}
              <div
                ref={box}
                className="relative grid"
                style={{
                  gridTemplateRows: `repeat(${R}, 4.25rem)`,
                  gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                }}
              >
                {lanes.map((l, r) => (
                  <div
                    key={l}
                    className="pointer-events-none border-b border-dashed border-line last:border-b-0"
                    style={{ gridRow: r + 1, gridColumn: `1 / span ${n}` }}
                  />
                ))}
                {size.w > 0 && (
                  <svg
                    key={`${active}-${run}`}
                    viewBox={`0 0 ${size.w} ${size.h}`}
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <path
                      d={path}
                      fill="none"
                      stroke="color-mix(in oklab, var(--accent) 26%, #fbf9f4)"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d={path}
                      fill="none"
                      stroke="var(--accent-ink)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                      className="gv-draw"
                      style={{
                        animationDuration: `${n * STEP_MS}ms`,
                        animationTimingFunction: "linear",
                      }}
                    />
                  </svg>
                )}
                {f.steps.map((s, i) => (
                  <div
                    key={`${active}-${run}-${i}`}
                    className="relative z-10 flex items-center justify-center px-1"
                    style={{ gridRow: s.lane + 1, gridColumn: i + 1 }}
                  >
                    <div
                      className="gv-pop rounded-control border bg-card px-2.5 py-1.5 text-center text-[0.78rem] leading-tight shadow-[0_1px_2px_rgb(26_25_22/0.06)]"
                      style={{
                        animationDelay: `${i * STEP_MS}ms`,
                        borderColor:
                          i === 0 || i === n - 1
                            ? "var(--accent-ink)"
                            : "var(--color-line)",
                        background:
                          i === n - 1 ? "var(--accent-ink)" : undefined,
                        color: i === n - 1 ? "#fbf9f4" : undefined,
                      }}
                    >
                      {s.label}
                      {s.via && (
                        <span className="mt-0.5 block text-[0.68rem] opacity-70">
                          <svg
                            viewBox="0 0 24 24"
                            className="mr-0.5 inline h-3 w-3 align-[-2px]"
                            aria-hidden
                          >
                            <path
                              {...P}
                              d="M4.5 10a11 11 0 0 1 15 0M7.5 13.2a6.5 6.5 0 0 1 9 0M12 17h.01"
                            />
                          </svg>
                          {s.via}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ol className="sr-only">
            {f.steps.map((s, i) => (
              <li key={i}>
                {lanes[s.lane]}: {s.label}
                {s.via ? ` (via ${s.via})` : ""}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {image && (
        <div className="mt-4">
          <button
            type="button"
            aria-expanded={full}
            onClick={() => setFull(!full)}
            className="flex items-center gap-2 text-sm text-ink-mute hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform ${full ? "rotate-90" : ""}`}
              aria-hidden
            >
              <path {...P} d="M9 6l6 6-6 6" />
            </svg>
            {full ? "Hide" : "See"} the full tech plan diagram
          </button>
          {full && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.src}
              alt={image.alt}
              className="pl-fade mt-4 w-full rounded-media border border-line bg-white p-4"
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Testing as a growing rack ───────────────────────── */

export type NoteTone = "worked" | "fix" | "learned";
type Tier = { title: string; notes: { tone: NoteTone; text: string }[] };

const TONES: Record<NoteTone, { label: string; colour: string; ink: string }> =
  {
    worked: {
      label: "Worked",
      colour: "var(--accent)",
      ink: "var(--accent-ink)",
    },
    fix: { label: "To fix", colour: "#e3a23b", ink: "#8a5a0b" },
    learned: { label: "Learned", colour: "#5b8fa8", ink: "#2f5b70" },
  };

/**
 * Usability feedback grown on the four-tier rack: one channel per
 * stakeholder, one plant per note. Healthy plants worked, drooping ones need
 * fixing, seedlings are things we learned about the context.
 */
export function TestRack({
  heading,
  tiers,
}: {
  heading?: string;
  tiers: Tier[];
}) {
  const all = tiers.flatMap((t, ti) =>
    t.notes.map((n, ni) => ({ ...n, ti, ni })),
  );
  const [active, setActive] = useState(0);
  const [tone, setTone] = useState<NoteTone | null>(null);
  const id = useId();
  const cur = all[active];
  const go = (d: number) => {
    let next = active;
    for (let k = 0; k < all.length; k++) {
      next = (next + d + all.length) % all.length;
      if (!tone || all[next].tone === tone) break;
    }
    setActive(next);
    return next;
  };
  const onKey = (e: KeyboardEvent) => {
    const d =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!d) return;
    e.preventDefault();
    document.getElementById(`${id}-n-${go(d)}`)?.focus();
  };
  const count = (t: NoteTone) => all.filter((x) => x.tone === t).length;

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(TONES) as NoteTone[]).map((k) => {
          const on = tone === k;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => {
                const nt = on ? null : k;
                setTone(nt);
                if (nt && all[active].tone !== nt)
                  setActive(all.findIndex((x) => x.tone === nt));
              }}
              className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors"
              style={
                on
                  ? {
                      background: TONES[k].ink,
                      borderColor: TONES[k].ink,
                      color: "#fbf9f4",
                    }
                  : { borderColor: "var(--color-line)" }
              }
            >
              <Plant tone={k} className="h-5 w-4" />
              {TONES[k].label}
              <span className="tabular-nums opacity-60">{count(k)}</span>
            </button>
          );
        })}
        <span className="meta ml-auto text-ink-mute">
          {all.length} notes · 4 stakeholders
        </span>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        {/* the rack */}
        <div
          role="listbox"
          aria-label="Feedback notes"
          onKeyDown={onKey}
          className="relative rounded-media border border-line p-5 md:p-7"
          style={{
            background:
              "linear-gradient(to bottom, #fbf9f4, color-mix(in oklab, var(--accent) 8%, #fbf9f4))",
          }}
        >
          {/* rack posts */}
          <span
            aria-hidden
            className="absolute bottom-5 left-4 top-5 w-[3px] rounded-full bg-ink/70 md:left-5"
          />
          <span
            aria-hidden
            className="absolute bottom-5 right-4 top-5 w-[3px] rounded-full bg-ink/70 md:right-5"
          />
          <div className="space-y-5">
            {tiers.map((t, ti) => (
              <div key={t.title} className="relative px-3 md:px-4">
                <p className="meta mb-1 text-ink-mute">
                  Tier {ti + 1} · <span className="text-ink">{t.title}</span>
                </p>
                <div className="relative z-10 flex items-end justify-around gap-1">
                  {t.notes.map((nt, ni) => {
                    const idx = all.findIndex(
                      (x) => x.ti === ti && x.ni === ni,
                    );
                    const on = idx === active;
                    const dim = tone && nt.tone !== tone;
                    return (
                      <button
                        key={ni}
                        id={`${id}-n-${idx}`}
                        type="button"
                        role="option"
                        aria-selected={on}
                        aria-label={`${t.title}, ${TONES[nt.tone].label}: ${nt.text}`}
                        tabIndex={on ? 0 : -1}
                        disabled={!!dim}
                        onClick={() => setActive(idx)}
                        onPointerEnter={(e) =>
                          e.pointerType === "mouse" && !dim && setActive(idx)
                        }
                        className="gv-plant group relative flex flex-col items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-default"
                        style={{
                          opacity: dim ? 0.25 : 1,
                          transition: "opacity 300ms",
                        }}
                      >
                        <span
                          className="gv-grow block origin-bottom"
                          style={{ animationDelay: `${(ti * 4 + ni) * 70}ms` }}
                        >
                          <Plant
                            tone={nt.tone}
                            className={`h-11 w-9 transition-transform duration-300 md:h-12 md:w-10 ${on ? "scale-[1.18]" : ""}`}
                          />
                        </span>
                        {/* planting hole */}
                        <span
                          aria-hidden
                          className="-mt-1 block h-2.5 w-7 rounded-[50%] transition-shadow"
                          style={{
                            background: "#2b2a25",
                            boxShadow: on
                              ? `0 0 0 3px ${TONES[nt.tone].colour}`
                              : undefined,
                          }}
                        />
                        <span
                          aria-hidden
                          className="mt-1 text-[0.65rem] tabular-nums text-ink-mute"
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {/* the channel, with water running through it */}
                <div
                  aria-hidden
                  className="relative -mt-[1.6rem] h-4 overflow-hidden rounded-full border border-ink/15 bg-white shadow-[inset_0_-3px_0_rgb(26_25_22/0.06)]"
                >
                  <span
                    className="gv-water absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, #7fb6d1 0 10px, transparent 10px 22px)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="mx-2 mt-4 h-5 rounded-b-[10px] rounded-t-[4px] bg-ink/80 md:mx-3"
          />
          <p aria-hidden className="meta mt-1 text-center text-ink-mute">
            Reservoir
          </p>
        </div>

        {/* the note */}
        <div
          className="flex flex-col rounded-media border border-line bg-card p-6 md:p-8"
          aria-live="polite"
        >
          <div key={active} className="pl-fade flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="meta text-ink-mute">
                {tiers[cur.ti].title} · note {active + 1} of {all.length}
              </p>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.78rem] font-medium"
                style={{
                  background: `color-mix(in oklab, ${TONES[cur.tone].colour} 18%, #fbf9f4)`,
                  color: TONES[cur.tone].ink,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: TONES[cur.tone].colour }}
                />
                {TONES[cur.tone].label}
              </span>
            </div>
            <p className="mt-5 font-display-soft text-[1.35rem] leading-snug md:text-[1.5rem]">
              <span aria-hidden style={{ color: TONES[cur.tone].colour }}>
                “
              </span>
              {cur.text}
              <span aria-hidden style={{ color: TONES[cur.tone].colour }}>
                ”
              </span>
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {(
              [
                [-1, "Previous note", "M15 6l-6 6 6 6"],
                [1, "Next note", "M9 6l6 6-6 6"],
              ] as const
            ).map(([d, label, dPath]) => (
              <button
                key={d}
                type="button"
                aria-label={label}
                onClick={() => go(d)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-soft hover:border-ink/30 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path {...P} d={dPath} />
                </svg>
              </button>
            ))}
            <div className="ml-auto flex gap-1" aria-hidden>
              {tiers.map((t, ti) => (
                <span
                  key={t.title}
                  className="h-1.5 w-6 rounded-full transition-colors"
                  style={{
                    background:
                      ti === cur.ti ? "var(--accent-ink)" : "var(--color-line)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plant({ tone, className }: { tone: NoteTone; className?: string }) {
  const c = TONES[tone];
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      {tone === "worked" && (
        <>
          <path
            d="M20 48V18"
            stroke={c.ink}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 30C10 30 4 23 3 12c10 0 16 6 17 18Z"
            fill={c.colour}
            stroke={c.ink}
            strokeWidth="1.2"
          />
          <path d="M20 24c1-11 7-18 17-18-1 11-7 17-17 18Z" fill={c.ink} />
          <path
            d="M20 16c-3-5-2-10 0-14 2 4 3 9 0 14Z"
            fill={c.colour}
            stroke={c.ink}
            strokeWidth="1.2"
          />
        </>
      )}
      {tone === "fix" && (
        <>
          <path
            d="M20 48V28c0-6 4-10 9-11"
            fill="none"
            stroke={c.ink}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M29 17c5 1 8 5 8 11-5-1-8-5-8-11Z"
            fill={c.colour}
            stroke={c.ink}
            strokeWidth="1.2"
          />
          <path
            d="M20 36c-6 0-11 3-13 9 6 0 11-3 13-9Z"
            fill={c.colour}
            stroke={c.ink}
            strokeWidth="1.2"
          />
        </>
      )}
      {tone === "learned" && (
        <>
          <path
            d="M20 48V30"
            stroke={c.ink}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 34c-7 0-11-4-12-10 7 0 11 4 12 10Z"
            fill={c.colour}
            stroke={c.ink}
            strokeWidth="1.2"
          />
          <path
            d="M20 32c1-6 5-10 12-10-1 6-5 10-12 10Z"
            fill={c.colour}
            stroke={c.ink}
            strokeWidth="1.2"
          />
          <circle cx="20" cy="26" r="2.6" fill={c.ink} />
        </>
      )}
    </svg>
  );
}

/* ───────────────────────── Dashboard tour ───────────────────────── */

type Spot = { x: number; y: number; title: string; body: string };
type Screen = {
  name: string;
  lede: string;
  image: { src: string; alt: string; width: number; height: number };
  spots: Spot[];
};

/**
 * Each stakeholder's dashboards as a guided tour: numbered pins on the
 * screens; pick one and the view zooms into that part of the dashboard.
 */
export function ScreenTour({
  heading,
  screens,
}: {
  heading?: string;
  screens: Screen[];
}) {
  const [tab, setTab] = useState(0);
  const [spot, setSpot] = useState<number | null>(null);
  const id = useId();
  const sc = screens[tab];
  const cur = spot === null ? null : sc.spots[spot];
  const Z = 2.4;
  const z = cur ? Z : 1;
  const pickTab = (i: number) => {
    setTab(i);
    setSpot(null);
  };
  const onTabKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (tab + d + screens.length) % screens.length;
    pickTab(next);
    document.getElementById(`${id}-t-${next}`)?.focus();
  };
  const step = (d: number) =>
    setSpot(
      (s) => ((s ?? (d > 0 ? -1 : 0)) + d + sc.spots.length) % sc.spots.length,
    );

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div
        role="tablist"
        aria-label="Stakeholder dashboards"
        onKeyDown={onTabKey}
        className="flex flex-wrap gap-2"
      >
        {screens.map((x, i) => {
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
              onClick={() => pickTab(i)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
              style={on ? { background: "var(--accent-ink)" } : undefined}
            >
              {x.name}
              <span className="ml-2 tabular-nums opacity-60">
                {x.spots.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-p`}
        role="tabpanel"
        aria-labelledby={`${id}-t-${tab}`}
        className="mt-3 overflow-hidden rounded-media border border-line bg-card"
      >
        <p
          key={`l-${tab}`}
          className="pl-fade px-5 pt-5 text-[0.98rem] text-ink-soft md:px-7 md:pt-6"
        >
          {sc.lede}
        </p>

        {/* the screens, zoomable */}
        <div
          className="relative mx-3 mt-4 overflow-hidden rounded-[14px] bg-white md:mx-5"
          style={{ aspectRatio: `${sc.image.width} / ${sc.image.height}` }}
        >
          <div key={`i-${tab}`} className="pl-fade absolute inset-0">
            <div
              className="absolute inset-0 transition-transform duration-700"
              style={{
                transform: `scale(${z})`,
                transformOrigin: cur ? `${cur.x}% ${cur.y}%` : "50% 50%",
                transitionTimingFunction: "var(--ease-in-out-soft)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sc.image.src}
                alt={sc.image.alt}
                className="h-full w-full object-contain"
              />
              {sc.spots.map((p, i) => {
                const on = i === spot;
                return (
                  <button
                    key={p.title}
                    type="button"
                    aria-label={`${i + 1}. ${p.title}`}
                    aria-pressed={on}
                    onClick={() => setSpot(on ? null : i)}
                    className="absolute grid h-7 w-7 place-items-center rounded-full text-[0.75rem] font-semibold tabular-nums transition-[transform,background,opacity] duration-500"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      transform: `translate(-50%, -50%) scale(${1 / z})`,
                      background: on ? "var(--accent-ink)" : "#fbf9f4",
                      color: on ? "#fbf9f4" : "var(--accent-ink)",
                      boxShadow: on
                        ? "0 0 0 6px color-mix(in oklab, var(--accent) 35%, transparent)"
                        : "0 0 0 2px var(--accent-ink), 0 4px 10px rgb(26 25 22 / .18)",
                      opacity: cur && !on ? 0.35 : 1,
                    }}
                  >
                    {!on && !cur && (
                      <span
                        aria-hidden
                        className="gv-ping absolute inset-0 rounded-full"
                      />
                    )}
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
          {cur && (
            <button
              type="button"
              onClick={() => setSpot(null)}
              className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[0.8rem] text-paper backdrop-blur hover:bg-ink"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                <path {...P} d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
              </svg>
              Whole screen
            </button>
          )}
        </div>

        {/* the notes */}
        <div className="grid gap-5 p-5 md:grid-cols-[1fr_1.1fr] md:p-7">
          <div aria-live="polite" className="min-h-[7rem]">
            {cur ? (
              <div key={`${tab}-${spot}`} className="pl-fade">
                <p
                  className="meta tabular-nums"
                  style={{ color: "var(--accent-ink)" }}
                >
                  {String((spot ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(sc.spots.length).padStart(2, "0")}
                </p>
                <p className="mt-1.5 font-display-soft text-[1.35rem] leading-tight">
                  {cur.title}
                </p>
                <p className="mt-2 text-[0.95rem] leading-snug text-ink-soft">
                  {cur.body}
                </p>
              </div>
            ) : (
              <div key={`o-${tab}`} className="pl-fade">
                <p className="meta text-ink-mute">Overview</p>
                <p className="mt-1.5 font-display-soft text-[1.35rem] leading-tight">
                  Tap a number to zoom into that part of the dashboard.
                </p>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              {(
                [
                  [-1, "Previous", "M15 6l-6 6 6 6"],
                  [1, "Next", "M9 6l6 6-6 6"],
                ] as const
              ).map(([d, label, dPath]) => (
                <button
                  key={d}
                  type="button"
                  aria-label={label}
                  onClick={() => step(d)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft hover:border-ink/30 hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path {...P} d={dPath} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <ol className="grid content-start gap-1.5 sm:grid-cols-2">
            {sc.spots.map((p, i) => {
              const on = i === spot;
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSpot(on ? null : i)}
                    className={`flex w-full items-center gap-2.5 rounded-control px-2.5 py-2 text-left text-[0.88rem] transition-colors ${on ? "text-paper" : "text-ink-soft hover:bg-paper"}`}
                    style={on ? { background: "var(--accent-ink)" } : undefined}
                  >
                    <span
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.72rem] font-semibold tabular-nums"
                      style={
                        on
                          ? {
                              background: "#fbf9f4",
                              color: "var(--accent-ink)",
                            }
                          : {
                              boxShadow: "inset 0 0 0 1.5px var(--accent-ink)",
                              color: "var(--accent-ink)",
                            }
                      }
                    >
                      {i + 1}
                    </span>
                    {p.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── System layers ───────────────────────── */

type Who = { who: string };
type SysLayers = {
  scenarios: (Who & { body: string })[];
  flows: (Who & { steps: string[] })[];
  points: (Who & { groups: { name: string; items: string[] }[] })[];
  tech: { chains: { name: string; steps: string[] }[]; link?: { label: string; href: string } };
  trees: { name: string; sections: { name?: string; pages: { name: string; items: string[] }[] }[] }[];
  artefacts: {
    name: string;
    kind: "Digital" | "Physical";
    icon: "network" | "cart" | "unit" | "truck";
    skeuomorphism?: string;
    signifier: string[];
    metaphor: string[];
    codes?: { label: string; swatches: { color: string; meaning: string }[] }[];
  }[];
};

const LAYER_NAMES = ["Scenarios", "Task flow", "Data points", "Tech plan", "Data flow", "Artefacts"] as const;

const ART_ICONS: Record<SysLayers["artefacts"][number]["icon"], ReactNode> = {
  network: (
    <>
      <circle {...P} cx="12" cy="12" r="3" />
      <circle {...P} cx="5" cy="6" r="1.8" />
      <circle {...P} cx="19" cy="6" r="1.8" />
      <circle {...P} cx="5" cy="18" r="1.8" />
      <circle {...P} cx="19" cy="18" r="1.8" />
      <path {...P} d="M6.5 7.2 9.6 10M17.5 7.2 14.4 10M6.5 16.8 9.6 14M17.5 16.8 14.4 14" />
    </>
  ),
  cart: <path {...P} d="M3 4h2.5l2 10h10l2-7H6.6M9.5 19a1 1 0 1 0 0 .01M16.5 19a1 1 0 1 0 0 .01" />,
  unit: (
    <>
      <rect {...P} x="3.5" y="9" width="17" height="3.5" rx="1" />
      <rect {...P} x="3.5" y="17" width="17" height="3.5" rx="1" />
      <path {...P} d="M8 9V6.5m0 0c0-1.5-1.5-2-2.5-2 0 1.2.8 2 2.5 2Zm0 0c0-1.5 1.5-2 2.5-2 0 1.2-.8 2-2.5 2ZM16 9V6.5m0 0c0-1.5-1.5-2-2.5-2 0 1.2.8 2 2.5 2Zm0 0c0-1.5 1.5-2 2.5-2 0 1.2-.8 2-2.5 2ZM8 17v-2.2M16 17v-2.2" />
    </>
  ),
  truck: <path {...P} d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7M6 18.5a1.6 1.6 0 1 0 0 .01M17 18.5a1.6 1.6 0 1 0 0 .01" />,
};

/**
 * A system mapped as a stack of layers, from the people it serves up to the
 * artefacts it produces. Pick a layer to lift it and open what's inside.
 */
export function SystemLayers({ heading, intro, data }: { heading?: string; intro?: string; data: SysLayers }) {
  const [layer, setLayer] = useState(0);
  const [who, setWho] = useState(0);
  const [tree, setTree] = useState(0);
  const [art, setArt] = useState(0);
  const id = useId();
  const n = LAYER_NAMES.length;
  const stakeholders = data.scenarios.map((s) => s.who);
  const pickLayer = (i: number) => setLayer(Math.max(0, Math.min(n - 1, i)));
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowUp" || e.key === "ArrowRight" ? 1 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    pickLayer(layer + d);
    document.getElementById(`${id}-l-${Math.max(0, Math.min(n - 1, layer + d))}`)?.focus();
  };
  // Plate tone: light at the base, deepening toward the top, like the deck
  const tone = (i: number) => `color-mix(in oklab, var(--accent) ${18 + i * 16}%, #fbf9f4)`;
  const pills = (items: string[], cur: number, set: (i: number) => void, label: string) => (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((x, i) => {
        const on = i === cur;
        return (
          <button
            key={x}
            type="button"
            aria-pressed={on}
            onClick={() => set(i)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
            style={on ? { background: "var(--accent-ink)" } : undefined}
          >
            {x}
          </button>
        );
      })}
    </div>
  );
  const w = Math.min(who, stakeholders.length - 1);

  const body = () => {
    switch (layer) {
      case 0:
        return (
          <>
            {pills(stakeholders, w, setWho, "Stakeholder")}
            <p key={`s${w}`} className="pl-fade mt-5 max-w-[60ch] text-[1.02rem] leading-relaxed text-ink-soft">
              {data.scenarios[w].body}
            </p>
          </>
        );
      case 1: {
        const f = data.flows.find((x) => x.who === stakeholders[w]) ?? data.flows[0];
        return (
          <>
            {pills(stakeholders, w, setWho, "Stakeholder")}
            <ol key={`f${w}`} className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
              {f.steps.map((st, i) => (
                <li key={st} className="flex items-center gap-1.5">
                  <span className="gv-pop inline-flex items-center gap-2 rounded-control border border-line bg-card px-3 py-2 text-[0.85rem] leading-snug" style={{ animationDelay: `${i * 70}ms` }}>
                    <span className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {st}
                  </span>
                  {i < f.steps.length - 1 && (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-ink-mute" aria-hidden>
                      <path {...P} d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </>
        );
      }
      case 2: {
        const pt = data.points.find((x) => x.who === stakeholders[w]) ?? data.points[0];
        return (
          <>
            {pills(stakeholders, w, setWho, "Stakeholder")}
            <div key={`p${w}`} className="mt-5 grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(10.5rem, 1fr))` }}>
              {pt.groups.map((g, gi) => (
                <div key={g.name} className="gv-rise" style={{ animationDelay: `${gi * 80}ms` }}>
                  <p className="meta mb-2 font-semibold" style={{ color: "var(--accent-ink)" }}>
                    {g.name}
                  </p>
                  <ul className="space-y-1.5">
                    {g.items.map((x) => (
                      <li key={x} className="rounded-control px-2.5 py-1.5 text-[0.84rem] leading-snug" style={{ background: tone(1) }}>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        );
      }
      case 3:
        return (
          <div className="space-y-5">
            {data.tech.chains.map((c, ci) => (
              <div key={c.name} className="gv-rise" style={{ animationDelay: `${ci * 90}ms` }}>
                <p className="meta mb-2 font-semibold" style={{ color: "var(--accent-ink)" }}>
                  {c.name}
                </p>
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {c.steps.map((st, i) => (
                    <li key={st} className="flex items-center gap-1.5">
                      <span
                        className="rounded-full px-3 py-1.5 text-[0.84rem]"
                        style={i === c.steps.length - 1 ? { background: "var(--accent-ink)", color: "#fbf9f4" } : { background: tone(1) }}
                      >
                        {st}
                      </span>
                      {i < c.steps.length - 1 && (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-ink-mute" aria-hidden>
                          <path {...P} d="M5 12h14m-5-5 5 5-5 5" />
                        </svg>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            {data.tech.link && (
              <a href={data.tech.link.href} className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ color: "var(--accent-ink)" }}>
                {data.tech.link.label}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                  <path {...P} d="M5 12h14m-5-5 5 5-5 5" />
                </svg>
              </a>
            )}
          </div>
        );
      case 4: {
        const t = data.trees[tree];
        return (
          <>
            {pills(
              data.trees.map((x) => x.name),
              tree,
              setTree,
              "Platform",
            )}
            <div key={`t${tree}`} className="mt-5 space-y-5">
              {t.sections.map((sec, si) => (
                <div key={sec.name ?? si}>
                  {sec.name && (
                    <p className="meta mb-2 flex items-center gap-2 font-semibold" style={{ color: "var(--accent-ink)" }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                      {sec.name}
                    </p>
                  )}
                  <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))" }}>
                    {sec.pages.map((pg, pi) => (
                      <div key={pg.name} className="gv-pop rounded-control border border-line bg-card p-3" style={{ animationDelay: `${(si * 3 + pi) * 45}ms` }}>
                        <p className="text-[0.86rem] font-medium leading-tight">{pg.name}</p>
                        {pg.items.length > 0 && (
                          <ul className="mt-2 space-y-1 border-l pl-2.5" style={{ borderColor: tone(2) }}>
                            {pg.items.map((x) => (
                              <li key={x} className="text-[0.78rem] leading-snug text-ink-soft">
                                {x}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      }
      default: {
        const a = data.artefacts[art];
        const rules = [
          ["Skeuomorphism", a.skeuomorphism ? [a.skeuomorphism] : []],
          ["Signifier", a.signifier],
          ["Metaphor", a.metaphor],
        ].filter(([, v]) => (v as string[]).length) as [string, string[]][];
        return (
          <>
            <div role="group" aria-label="Artefact" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {data.artefacts.map((x, i) => {
                const on = i === art;
                return (
                  <button
                    key={x.name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setArt(i)}
                    className={`flex items-center gap-2.5 rounded-control border px-3 py-2.5 text-left transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
                    style={on ? { background: "var(--accent-ink)" } : undefined}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
                      {ART_ICONS[x.icon]}
                    </svg>
                    <span className="min-w-0">
                      <span className={`meta block ${on ? "text-paper/65" : "text-ink-mute"}`}>{x.kind}</span>
                      <span className="block truncate text-[0.88rem] font-medium">{x.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div key={`a${art}`} className="mt-5 grid gap-5 md:grid-cols-3">
              {rules.map(([k, v], ri) => (
                <div key={k} className="gv-rise" style={{ animationDelay: `${ri * 90}ms` }}>
                  <p className="meta mb-2 font-semibold" style={{ color: "var(--accent-ink)" }}>
                    {k}
                  </p>
                  <ul className="space-y-2 text-[0.88rem] leading-snug text-ink-soft">
                    {v.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {a.codes && (
              <div key={`c${art}`} className="pl-fade mt-5 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5">
                {a.codes.map((c) => (
                  <div key={c.label}>
                    <p className="meta mb-2 text-ink-mute">{c.label}</p>
                    <ul className="flex flex-wrap gap-3">
                      {c.swatches.map((sw) => (
                        <li key={sw.meaning} className="flex items-center gap-1.5 text-[0.8rem]">
                          <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: sw.color }} />
                          {sw.meaning}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      }
    }
  };

  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="grid overflow-hidden rounded-media border border-line bg-card md:grid-cols-[15rem_1fr]">
        {/* the stack */}
        <div className="border-b border-line p-5 md:border-b-0 md:border-r md:p-6" style={{ background: "color-mix(in oklab, var(--accent) 5%, #fbf9f4)" }}>
          <div role="tablist" aria-label="System layers" aria-orientation="vertical" onKeyDown={onKey} className="flex flex-col-reverse">
            {LAYER_NAMES.map((name, i) => {
              const on = i === layer;
              return (
                <button
                  key={name}
                  id={`${id}-l-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`${id}-p`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => pickLayer(i)}
                  className="group flex items-center gap-3 py-[3px] text-left"
                >
                  <svg viewBox="0 0 120 34" className="h-[26px] w-[82px] shrink-0 overflow-visible md:h-[30px] md:w-[92px]" aria-hidden>
                    <g className="transition-transform duration-300" style={{ transform: on ? "translate(-7px, -7px)" : undefined }}>
                      <path d="M30 4h88L90 30H2Z" fill={on ? "var(--accent)" : tone(i)} stroke={on ? "var(--accent-ink)" : "rgb(0 0 0 / .06)"} strokeWidth="1" className="transition-[fill] duration-300 group-hover:brightness-95" />
                      {on && <path d="M30 4h88L90 30H2Z" fill="none" stroke="#fbf9f4" strokeOpacity=".5" strokeWidth="1" strokeDasharray="3 4" />}
                    </g>
                  </svg>
                  <span className={`whitespace-nowrap text-[0.85rem] leading-tight transition-colors ${on ? "font-semibold text-ink" : "text-ink-mute group-hover:text-ink"}`}>
                    <span className="meta mr-1.5 tabular-nums">{i + 1}</span>
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 hidden text-[0.78rem] text-ink-mute md:block">Pick a layer, or use the arrow keys, to lift it.</p>
        </div>

        {/* what's inside */}
        <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-l-${layer}`} className="min-w-0 p-6 md:p-8">
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <p key={`h${layer}`} className="pl-fade font-display-soft text-h3 leading-tight">
              <span className="meta mr-2 align-middle tabular-nums" style={{ color: "var(--accent-ink)" }}>
                Layer {layer + 1}
              </span>
              {LAYER_NAMES[layer]}
            </p>
            <span className="flex shrink-0 gap-1.5">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-label={d < 0 ? "Layer below" : "Layer above"}
                  disabled={d < 0 ? layer === 0 : layer === n - 1}
                  onClick={() => pickLayer(layer + d)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-line hover:border-ink/30 disabled:opacity-30"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                    <path {...P} d={d < 0 ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6"} />
                  </svg>
                </button>
              ))}
            </span>
          </div>
          <div key={layer} className="pl-fade">
            {body()}
          </div>
        </div>
      </div>
    </div>
  );
}
