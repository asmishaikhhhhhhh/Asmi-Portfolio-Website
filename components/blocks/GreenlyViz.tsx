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
type Actor = "supplier" | "customer" | "farmer" | "logistics";
type Edge = { from: Actor; to: Actor; values: CoreValue[] };

const VALUES: Record<
  CoreValue,
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

const SPOT: Record<Actor, { x: number; y: number; label: string }> = {
  supplier: { x: 400, y: 56, label: "Supplier" },
  customer: { x: 112, y: 250, label: "Customer" },
  farmer: { x: 688, y: 250, label: "Farmer" },
  logistics: { x: 400, y: 444, label: "Logistics" },
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
}: {
  heading?: string;
  edges: Edge[];
  caption?: string;
}) {
  const [value, setValue] = useState<CoreValue | null>(null);
  const [actor, setActor] = useState<Actor | null>(null);
  const live = (e: Edge) =>
    (!value || e.values.includes(value)) &&
    (!actor || e.from === actor || e.to === actor);
  const shown = edges.filter(live);
  const counts = (v: CoreValue) =>
    edges.filter((e) => e.values.includes(v)).length;

  // Pairs that run both ways get pulled apart so both arrows read
  const geo = edges.map((e) => {
    const a = SPOT[e.from];
    const b = SPOT[e.to];
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
          {(Object.keys(VALUES) as CoreValue[]).map((k) => {
            const v = VALUES[k];
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
            aria-label="Value map of supplier, customer, farmer and logistics"
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
              const tint = value ? VALUES[value].colour : "var(--accent-ink)";
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
                          stroke={VALUES[k].colour}
                          strokeWidth="1.8"
                        />
                        <svg
                          x="5"
                          y="5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          style={{ color: VALUES[k].ink }}
                        >
                          {VALUES[k].glyph}
                        </svg>
                      </g>
                    );
                  })}
                </g>
              );
            })}
            {(Object.keys(SPOT) as Actor[]).map((k) => {
              const s = SPOT[k];
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
                ? `${SPOT[actor].label}'s relationships`
                : value
                  ? `Carried by ${VALUES[value].label.toLowerCase()}`
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
                      {SPOT[e.from].label}
                    </button>
                    <span aria-label="to" className="mx-1.5 text-ink-mute">
                      →
                    </span>
                    <button
                      type="button"
                      onClick={() => setActor(e.to)}
                      className="hover:underline"
                    >
                      {SPOT[e.to].label}
                    </button>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    {e.values.map((k) => (
                      <span
                        key={k}
                        title={VALUES[k].label}
                        className="grid h-6 w-6 place-items-center rounded-full border"
                        style={{
                          borderColor: VALUES[k].colour,
                          color: VALUES[k].ink,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          aria-label={VALUES[k].label}
                        >
                          {VALUES[k].glyph}
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
