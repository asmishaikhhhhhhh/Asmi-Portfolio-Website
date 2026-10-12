import { Fragment } from "react";
import type { Block, MetricIcon, RowIconName } from "@/lib/types";
import { Picture } from "@/components/ui/Picture";
import { MaybeText, Needed } from "@/components/ui/Needed";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { DoubleDiamond } from "./DoubleDiamond";
import { KeyFeatures } from "./KeyFeatures";
import { StakeholderRings } from "./StakeholderRings";
import { ProcessPath } from "./ProcessPath";
import { ColorSystem } from "./ColorSystem";
import { Breakdown } from "./Breakdown";
import { Ecosystem } from "./Ecosystem";
import { ConceptTabs, HeardBubbles, InsightFlow, StageStairs } from "./FireSafeViz";
import { FigmaEmbed } from "./FigmaEmbed";
import { ImageTabs } from "./ImageTabs";
import { ScrollStrip } from "./ScrollStrip";
import { AppCoverflow } from "./ChfViz";
import { ResearchExplorer } from "./ResearchExplorer";
import { ClabDemo } from "@/components/clab/ClabDemo";
import { MaterialDesign } from "@/components/clab/MaterialDesign";
import { BusinessCanvas } from "./BusinessCanvas";
import { DesignTokens, IssueFeed, PhoneCarousel, Learnings, ModuleStory, RoleCard, SystemSpecimen, TermMap, VennProcess } from "./AiStrikeViz";
import { ScreenTour, SurfaceRoots, SystemLayers, TechPlan, TestRack, ValueMap } from "./GreenlyViz";
import manifest from "@/data/image-manifest.json";

/** Minimal inline formatting for data strings: **bold** and *italic*. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {p.slice(2, -2)}
          </strong>
        ) : p.startsWith("*") && p.length > 2 ? (
          <em key={i}>{p.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

// Small line icons for the measures in a test results table
function MetricGlyph({ name }: { name: MetricIcon }) {
  const paths: Record<MetricIcon, React.ReactNode> = {
    success: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.2 12.3l2.6 2.6 5-5.4" />
      </>
    ),
    confusion: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4" />
        <circle cx="12" cy="16.6" r=".4" fill="currentColor" />
      </>
    ),
    navigate: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2z" />
      </>
    ),
    time: (
      <>
        <circle cx="12" cy="13" r="7.5" />
        <path d="M12 9.5V13l2.4 1.6M10 3.5h4" />
      </>
    ),
  };
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
      style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent-ink)" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-6 font-display-soft text-h3">{children}</h3>
);

/** Small line icons for the icon row (24px grid, 1.6 stroke). */
function RowIcon({ name }: { name: RowIconName }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      {name === "students" && (
        <>
          <path {...p} d="M2.5 9 12 4.5 21.5 9 12 13.5Z" />
          <path {...p} d="M6.5 11v4.5c1.4 1.4 3.3 2 5.5 2s4.1-.6 5.5-2V11" />
          <path {...p} d="M21.5 9v5" />
        </>
      )}
      {name === "work" && (
        <>
          <rect {...p} x="3" y="7.5" width="18" height="12" rx="2" />
          <path {...p} d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
        </>
      )}
      {name === "home" && (
        <>
          <path {...p} d="M3.5 10.5 12 4l8.5 6.5" />
          <path {...p} d="M5.5 9v10.5h13V9M10 19.5v-5h4v5" />
        </>
      )}
      {name === "people" && (
        <>
          <circle {...p} cx="9" cy="8.5" r="3" />
          <path {...p} d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
          <circle {...p} cx="16.5" cy="9.5" r="2.5" />
          <path {...p} d="M15.5 14.2c2.4-.3 4.4 1.4 5 4.3" />
        </>
      )}
      {name === "broad" && (
        <>
          <circle {...p} cx="12" cy="12" r="8.5" />
          <path {...p} d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
        </>
      )}
      {name === "women" && (
        <>
          <circle {...p} cx="12" cy="9" r="5" />
          <path {...p} d="M12 14v7M9 18h6" />
        </>
      )}
      {name === "durable" && (
        <>
          <path {...p} d="M12 3 20 7.5v9L12 21l-8-4.5v-9Z" />
          <path {...p} d="M4 7.5 12 12l8-4.5M12 12v9" />
        </>
      )}
      {name === "grip" && (
        <>
          <path {...p} d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v7.5c0 4-2.7 7-6.5 7-2.6 0-4.3-1.3-5.6-3.4L3.4 14.5a1.5 1.5 0 0 1 2.4-1.8L8 15" />
        </>
      )}
      {name === "safe" && (
        <>
          <path {...p} d="M12 3 19.5 6v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6Z" />
          <path {...p} d="m8.8 12 2.2 2.2 4.4-4.4" />
        </>
      )}
      {name === "versatile" && (
        <>
          <path {...p} d="M12 3.5 21 8l-9 4.5L3 8Z" />
          <path {...p} d="m3 12 9 4.5 9-4.5M3 16l9 4.5 9-4.5" />
        </>
      )}
      {name === "price" && (
        <>
          <path {...p} d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3-8.7 8.7Z" />
          <circle {...p} cx="8" cy="8" r="1.4" />
        </>
      )}
      {name === "weight" && (
        <>
          <path {...p} d="M12 4v16M7 20h10M4.5 7.5h15" />
          <path {...p} d="M4.5 7.5 2.5 13a2.6 2.6 0 0 0 4 0ZM19.5 7.5l-2 5.5a2.6 2.6 0 0 0 4 0Z" />
        </>
      )}
      {name === "creativity" && (
        <>
          <path {...p} d="M9 18h6M10 21h4" />
          <path {...p} d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
        </>
      )}
      {name === "engagement" && (
        <>
          <path {...p} d="M3.5 20.5h17" />
          <path {...p} d="M5 16l4.5-4.5 3.5 3L19.5 8" />
          <path {...p} d="M15 8h4.5v4.5" />
        </>
      )}
      {name === "accessibility" && (
        <>
          <circle {...p} cx="12" cy="4.8" r="1.8" />
          <path {...p} d="M5 8.5c2.3.7 4.6 1 7 1s4.7-.3 7-1M12 9.5V14m0 0-3 6.5M12 14l3 6.5" />
        </>
      )}
      {name === "emerging" && (
        <>
          <path {...p} d="M12 3 20 7.5v9L12 21 4 16.5v-9Z" />
          <path {...p} d="M4 7.5 12 12l8-4.5M12 12v9" />
        </>
      )}
      {name === "leadership" && (
        <>
          <path {...p} d="M12 21V3" />
          <path {...p} d="M12 5h6l2 2-2 2h-6M12 11H6l-2 2 2 2h6" />
        </>
      )}
      {name === "tools" && (
        <>
          <rect {...p} x="3" y="8" width="13" height="11" rx="2" />
          <path {...p} d="M7 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3" />
        </>
      )}
      {name === "trust" && (
        <>
          <path {...p} d="M4 5.5h16v10H9l-4.5 3.5v-3.5H4Z" />
          <path {...p} d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth={2.4} />
        </>
      )}
      {name === "phone" && (
        <>
          <rect {...p} x="7" y="3" width="10" height="18" rx="2" />
          <path {...p} d="M11 18h2" />
        </>
      )}
      {name === "watch" && (
        <>
          <rect {...p} x="7" y="7" width="10" height="10" rx="3" />
          <path {...p} d="M9 7l.7-3.5h4.6L15 7M9 17l.7 3.5h4.6L15 17M12 10v2.2l1.5 1" />
        </>
      )}
      {name === "branch" && (
        <>
          <circle {...p} cx="7" cy="5.5" r="2" />
          <circle {...p} cx="17" cy="5.5" r="2" />
          <circle {...p} cx="12" cy="18.5" r="2" />
          <path {...p} d="M7 7.5v1.5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V7.5M12 12v4.5" />
        </>
      )}
      {name === "fire" && <path {...p} d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5 3.4-8.4 1.9 1.3 2.9 3.2 2.9 5.1.9-.6 1.6-1.7 1.8-3 1.8 1.6 3.9 4 3.9 6.3 0 3.2-2.4 5.6-6 5.6Z" />}
      {name === "pressure" && (
        <>
          <path {...p} d="M4 16a8 8 0 1 1 16 0" />
          <path {...p} d="M12 16l4-5M6.5 16h11" />
        </>
      )}
      {name === "scales" && (
        <>
          <path {...p} d="M12 4v16M8 20h8M5 7h14" />
          <path {...p} d="M5 7l-2.5 6a2.5 2.5 0 0 0 5 0Zm14 0-2.5 6a2.5 2.5 0 0 0 5 0Z" />
        </>
      )}
      {name === "variants" && (
        <>
          <rect {...p} x="3" y="3" width="8" height="8" rx="2" />
          <rect {...p} x="13" y="3" width="8" height="8" rx="2" />
          <rect {...p} x="3" y="13" width="8" height="8" rx="2" />
          <rect {...p} x="13" y="13" width="8" height="8" rx="2" />
        </>
      )}
      {name === "young" && (
        <>
          <circle {...p} cx="12" cy="7" r="3" />
          <path {...p} d="M6 21l2.2-6.5L12 13l3.8 1.5L18 21M8.5 10.5 5 8.5M15.5 10.5 19 8.5" />
        </>
      )}
    </svg>
  );
}

/** Perceived lightness of a #rrggbb colour, for picking white or ink text on a swatch. */
const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 150;
};

/* Text column width used across blocks for comfortable reading */
const prose = "max-w-[64ch]";

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <div className={prose}>
          {block.heading && <H>{block.heading}</H>}
          <div className="space-y-5 text-ink-soft">
            {block.body.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </div>
      );

    case "pullQuote":
      return (
        <figure className="border-l-4 py-2 pl-6 md:pl-10" style={{ borderColor: "var(--accent)" }}>
          <blockquote className="max-w-[28ch] font-display-wonk text-h2 italic">&ldquo;{block.quote}&rdquo;</blockquote>
          {block.attribution && <figcaption className="meta mt-5 text-ink-mute">{block.attribution}</figcaption>}
        </figure>
      );

    case "stats":
      if (block.layout === "row")
        return (
          <div className="space-y-6">
            {block.heading && <H>{block.heading}</H>}
            <dl
              className={`grid gap-y-8 border-y border-line py-8 sm:grid-cols-2 md:divide-x md:divide-line md:py-10 [&>div]:md:px-6 [&>div:first-child]:md:pl-0 [&>div:last-child]:md:pr-0 ${
                ({ 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5" } as Record<number, string>)[block.items.length] ?? "md:grid-cols-4"
              }`}
            >
              {block.items.map((st) => (
                <div key={st.label} className="flex flex-col">
                  {st.icon && (
                    <span
                      aria-hidden
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}
                    >
                      <RowIcon name={st.icon} />
                    </span>
                  )}
                  <dt className="sr-only">{st.label}</dt>
                  <dd>
                    <span className="block font-display-soft text-h2 tabular-nums" style={{ color: "var(--accent-ink)" }}>{st.value}</span>
                    <span className="mt-1.5 block text-ink-soft">{st.label}</span>
                    {st.note && <span className="mt-1 block text-sm text-ink-mute">{st.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <dl
            className={`grid gap-px overflow-hidden rounded-media border border-line bg-line ${block.items.length > 1 ? "sm:grid-cols-2" : ""} ${
              block.items.length === 4 ? "lg:grid-cols-4" : block.items.length > 2 && block.items.length % 3 === 0 ? "lg:grid-cols-3" : ""
            }`}
          >
            {block.items.map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-card p-6 md:p-8">
                {s.icon && (
                  <span
                    aria-hidden
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}
                  >
                    <RowIcon name={s.icon} />
                  </span>
                )}
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display-soft text-h1 tabular-nums" style={{ color: "var(--accent-ink)" }}>
                    {s.value}
                  </span>
                  <span className="mt-3 block max-w-[34ch] text-ink-soft">{s.label}</span>
                  {s.note && <span className="mt-2 block text-sm text-ink-mute">{s.note}</span>}
                </dd>
              </Reveal>
            ))}
          </dl>
          {block.source && (
            <p className="mt-3 text-sm text-ink-mute">
              Source: <MaybeText value={block.source} fallback="as cited in the original case study" />
            </p>
          )}
        </div>
      );

    case "researchMethods": {
      const total = block.groups?.reduce((a, g) => a + g.value, 0) ?? 0;
      const shades = ["var(--accent)", "color-mix(in oklab, var(--accent) 65%, white)", "color-mix(in oklab, var(--accent) 40%, white)", "color-mix(in oklab, var(--accent) 22%, white)", "#d8d1c4"];
      return (
        <div className="rounded-media border border-line bg-card p-6 md:p-10">
          {block.heading && <H>{block.heading}</H>}
          {block.groups && total > 0 && (
            <div>
              <p className="flex items-baseline gap-3">
                <span className="font-display-soft text-display tabular-nums leading-none">{total}</span>
                <span className="text-ink-soft">people in the research</span>
              </p>
              <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full" role="img" aria-label={block.groups.map((g) => `${g.value} ${g.label}`).join(", ")}>
                {block.groups.map((g, i) => (
                  <span key={g.label} style={{ width: `${(g.value / total) * 100}%`, background: shades[i % shades.length] }} />
                ))}
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {block.groups.map((g, i) => (
                  <li key={g.label} className="flex items-center gap-2">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: shades[i % shades.length] }} />
                    <span className="font-semibold tabular-nums">{g.value}</span> {g.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ul className={`grid gap-4 sm:grid-cols-2 ${block.groups ? "mt-10 border-t border-line pt-8" : ""}`}>
            {block.methods.map((m) => (
              <li key={m.name} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                <span>
                  <span className="font-medium">{m.name}</span>
                  {m.detail && <span className="block text-sm text-ink-mute">{m.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
          {block.note && <p className="mt-6 text-sm text-ink-mute">{block.note}</p>}
        </div>
      );
    }

    case "personas":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <div className="grid gap-5 md:grid-cols-2">
            {block.items.map((p) => (
              <Reveal key={p.name + p.descriptor} className="flex flex-col rounded-media border border-line bg-card p-6 md:p-8">
                <div className="flex items-center gap-4">
                  {p.image ? (
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      <Picture img={p.image} size="third" rounded={false} className="h-full object-cover" />
                    </div>
                  ) : (
                    <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display-soft text-h3 text-paper" style={{ background: "var(--accent)" }}>
                      {p.name[0]}
                    </span>
                  )}
                  <div>
                    <p className="font-display-soft text-h3">
                      {p.name}
                      {p.age && <span className="text-ink-mute">, {p.age}</span>}
                    </p>
                    <p className="text-sm text-ink-mute">{p.descriptor}</p>
                  </div>
                </div>
                {p.quote && <p className="mt-5 font-display-wonk text-h3 italic">&ldquo;{p.quote}&rdquo;</p>}
                <div className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
                  {p.needs && p.needs.length > 0 && (
                    <div>
                      <p className="meta mb-2 text-forest">Needs</p>
                      <ul className="space-y-2 text-ink-soft">
                        {p.needs.map((n) => (
                          <li key={n} className="flex gap-2.5">
                            <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.frustrations && p.frustrations.length > 0 && (
                    <div>
                      <p className="meta mb-2 text-[#9b2c1f]">Frustrations</p>
                      <ul className="space-y-2 text-ink-soft">
                        {p.frustrations.map((n) => (
                          <li key={n} className="flex gap-2.5">
                            <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9b2c1f]" />
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "insightChain":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ol className="space-y-4">
            {block.items.map((it, i) => (
              <li key={i} className="grid overflow-hidden rounded-media border border-line bg-card md:grid-cols-3">
                {(
                  [
                    ["Observation", it.observation],
                    ["Insight", it.insight],
                    ["Opportunity", it.opportunity],
                  ] as const
                ).map(([k, v], j) => (
                  <Reveal key={k} delay={j * 0.12} className={`relative p-6 ${j > 0 ? "border-t border-line md:border-l md:border-t-0" : ""} ${j === 2 ? "bg-[color-mix(in_oklab,var(--accent)_10%,white)]" : ""}`}>
                    <p className="meta mb-2 text-ink-mute">
                      {j === 0 && <span className="mr-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>}
                      {k}
                    </p>
                    <p className={j === 1 ? "font-medium" : "text-ink-soft"}>{v}</p>
                    {j < 2 && (
                      <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-xs md:flex">
                        →
                      </span>
                    )}
                  </Reveal>
                ))}
              </li>
            ))}
          </ol>
        </div>
      );

    case "hmw": {
      // "How might we…" gets its opening words set apart; **phrases** are underlined in the accent.
      const m = block.statement.match(/^(How might we)\s+([\s\S]*)$/);
      return (
        <figure className="relative isolate overflow-hidden rounded-media bg-night px-7 py-10 text-paper md:px-12 md:py-12">
          <span
            aria-hidden
            className="absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full opacity-45 blur-3xl"
            style={{ background: "var(--accent)" }}
          />
          <span aria-hidden className="absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full border border-white/10" />
          <span aria-hidden className="absolute -bottom-36 -left-28 -z-10 h-96 w-96 rounded-full border border-white/5" />
          <figcaption className="meta flex items-center gap-2.5 text-paper/70">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 60%, white)" }} />
            {block.label ?? "How might we"}
          </figcaption>
          <div className="mt-8 flex gap-4 md:gap-7">
            <span
              aria-hidden
              className="font-display-wonk text-[4.5rem] leading-[0.8] md:text-[6.5rem]"
              style={{ color: "color-mix(in oklab, var(--accent) 60%, white)" }}
            >
              &ldquo;
            </span>
            <blockquote className="flex-1 font-display-soft text-[clamp(1.3rem,1.05rem+1vw,2rem)] leading-[1.32] text-paper [&_strong]:font-normal [&_strong]:text-paper [&_strong]:underline [&_strong]:decoration-2 [&_strong]:underline-offset-[0.2em] [&_strong]:[text-decoration-color:color-mix(in_oklab,var(--accent)_65%,white)]">
              {m ? (
                <>
                  <span className="font-display-wonk italic" style={{ color: "color-mix(in oklab, var(--accent) 55%, white)" }}>
                    {m[1]}
                  </span>{" "}
                  <Rich text={m[2]} />
                </>
              ) : (
                <Rich text={block.statement} />
              )}
            </blockquote>
          </div>
        </figure>
      );
    }

    case "doubleDiamond":
      return <DoubleDiamond heading={block.heading} from={block.from} to={block.to} phases={block.phases} />;

    case "conceptFunnel":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-end">
            {block.stages.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12} as="li" className="flex-1">
                <div
                  className="flex flex-col justify-end rounded-media p-5 md:p-6"
                  style={{
                    minHeight: `${11 - i * 2.5}rem`,
                    background: `color-mix(in oklab, var(--accent) ${16 + i * 22}%, #fbf9f4)`,
                  }}
                >
                  <span className="font-display-soft text-h1 tabular-nums leading-none">{s.count}</span>
                  <span className="mt-2 text-sm font-medium">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </ol>
          {block.concepts && block.concepts.length > 0 && (
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {block.concepts.map((c) => (
                <li key={c.name} className={`rounded-media border p-5 ${c.verdict === "kept" ? "border-ink bg-card" : "border-line bg-card/60"}`}>
                  {c.image && <Picture img={c.image} size="third" className="mb-4" />}
                  <p className="flex items-center justify-between gap-3">
                    <span className="font-medium">{c.name}</span>
                    <span
                      className={`meta shrink-0 rounded-tag px-2 py-1 text-[0.7rem] ${
                        c.verdict === "kept" ? "bg-forest text-paper" : c.verdict === "dropped" ? "bg-paper-deep text-ink-mute line-through decoration-1" : "bg-marigold/25 text-marigold-ink"
                      }`}
                    >
                      {c.verdict}
                    </span>
                  </p>
                  {c.reason && <p className="mt-2 text-sm text-ink-soft">{c.reason}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case "process":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ol className="relative space-y-10 border-l border-line pl-8 md:pl-12">
            {block.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span aria-hidden className="absolute -left-[2.55rem] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper text-xs font-semibold tabular-nums md:-left-[3.55rem]">
                  {i + 1}
                </span>
                <p className="font-display-soft text-h3">{s.title}</p>
                <p className="mt-2 max-w-[60ch] text-ink-soft">
                  <Rich text={s.body} />
                </p>
                {s.image && (
                  <figure className="mt-5 max-w-3xl">
                    <Picture img={s.image} size="wide" fit />
                    {s.image.caption && <figcaption className="mt-2 text-sm text-ink-mute">{s.image.caption}</figcaption>}
                  </figure>
                )}
              </li>
            ))}
          </ol>
        </div>
      );

    case "features": {
      const withImages = block.items.some((f) => f.image);
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ul className={`grid gap-5 ${withImages ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {block.items.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * 0.06} className="flex flex-col rounded-media border border-line bg-card p-6 md:p-8">
                {f.image && (
                  <figure className="-mx-2 -mt-2 mb-5 flex flex-1 items-center justify-center">
                    <Picture img={f.image} size="half" fit />
                  </figure>
                )}
                <p className="font-medium">{f.title}</p>
                <p className="mt-2 text-sm text-ink-soft">
                  <Rich text={f.body} />
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      );
    }

    case "insightThemes":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <div className={`grid gap-5 ${block.themes.length > 1 ? "md:grid-cols-2" : ""}`}>
            {block.themes.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-media border border-line bg-card">
                <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-7">
                  <p className="font-display-soft text-[1.35rem] leading-tight">{t.title}</p>
                  {t.pill && (
                    <span
                      aria-hidden
                      className="shrink-0 rounded-full border-2 bg-white px-3.5 py-1.5 text-xs font-semibold"
                      style={{ borderColor: "var(--accent)", color: "var(--accent-ink)", boxShadow: "0 0 14px color-mix(in oklab, var(--accent) 35%, transparent)" }}
                    >
                      {t.pill}
                    </span>
                  )}
                  {t.icon === "filter" && (
                    <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-paper">
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                        <path d="M2.5 3h11l-4.2 5v4.5l-2.6 1V8z" />
                      </svg>
                    </span>
                  )}
                </div>
                {t.stat && (
                  <div className="px-6 pt-6 md:px-7">
                    <span className="block whitespace-nowrap font-display-soft text-[2.5rem] leading-none tabular-nums" style={{ color: "var(--accent-ink)" }}>
                      {t.stat.value}
                    </span>
                    <span className="mt-2 block text-sm text-ink-mute">{t.stat.label}</span>
                  </div>
                )}
                <ul className="flex-1 space-y-3 px-6 pb-7 pt-5 md:px-7">
                  {t.points.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.95rem] leading-snug text-ink-soft">
                      <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                      <Rich text={x} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "uiFeatures":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ul className={`grid gap-4 sm:grid-cols-2 ${block.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {block.items.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06} className="flex flex-col overflow-hidden rounded-media border border-line bg-card">
                <div className="relative h-44 overflow-hidden bg-[#141414]">
                  {f.crop === "top" ? (
                    <>
                      <div className="px-5 pt-5">
                        <Picture img={{ ...f.image, cutout: true }} size="third" rounded={false} />
                      </div>
                      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141414] to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center px-5 py-8">
                      <Picture img={{ ...f.image, cutout: true }} size="third" rounded={false} className="max-h-full w-auto max-w-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-5 md:p-6">
                  <p className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-medium leading-snug">{f.title}</p>
                  <p className="mt-2 text-sm text-ink-soft"><Rich text={f.body} /></p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      );

    case "colorSystem":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ColorSystem
            groups={block.groups}
            specimen={
              block.specimen && (
                <section className="rounded-media border border-line bg-card p-5 md:p-7">
                  <p className="meta mb-4 flex items-center gap-2 text-ink-mute">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    {block.specimen.label}
                  </p>
                  <Picture img={{ ...block.specimen.image, cutout: true }} size="wide" rounded={false} />
                </section>
              )
            }
          />
        </div>
      );

    case "conceptTabs":
      return <ConceptTabs heading={block.heading} concepts={block.concepts} footnote={block.footnote} />;

    case "researchExplorer":
      return <ResearchExplorer heading={block.heading} methods={block.methods.map((m) => ({ ...m, icon: <RowIcon name={m.icon} /> }))} />;

    case "circles":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {block.items.map((x, i) => (
              <Reveal as="li" key={x.label} delay={i * 0.08}>
                <div className="group grid aspect-square w-40 place-items-center rounded-full border-2 border-line bg-card text-center transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] md:w-48">
                  <span>
                    <span aria-hidden className="mx-auto grid h-12 w-12 place-items-center rounded-full transition-colors" style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}>
                      <RowIcon name={x.icon} />
                    </span>
                    <span className="mt-3 block px-4 text-[0.95rem] leading-tight">{x.label}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          {block.note && <p className="mx-auto mt-5 max-w-[64ch] text-center text-sm text-ink-mute">{block.note}</p>}
        </div>
      );

    case "imageTabs":
      return <ImageTabs heading={block.heading} intro={block.intro} items={block.items} dark={block.dark} />;

    case "figmaEmbed":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <FigmaEmbed url={block.url} title={block.title} poster={block.poster} note={block.note} />
        </div>
      );

    case "stageStairs":
      return <StageStairs heading={block.heading} stages={block.stages} mark={block.mark} />;

    case "insightFlow":
      return <InsightFlow heading={block.heading} items={block.items} />;

    case "heard":
      return <HeardBubbles heading={block.heading} items={block.items} source={block.source} />;

    case "breakdown":
      return (
        <Breakdown
          heading={block.heading}
          unit={block.unit}
          total={block.total}
          parts={block.parts.map((x) => ({ ...x, icon: x.icon ? <RowIcon name={x.icon} /> : undefined }))}
        />
      );

    case "ecosystem":
      return <Ecosystem heading={block.heading} centre={block.centre} centreNote={block.centreNote} nodes={block.nodes} caption={block.caption} />;

    case "surfaceRoots":
      return <SurfaceRoots heading={block.heading} gaps={block.gaps} roots={block.roots} />;

    case "valueMap":
      return <ValueMap heading={block.heading} edges={block.edges} caption={block.caption} />;

    case "techPlan":
      return <TechPlan heading={block.heading} lanes={block.lanes} flows={block.flows} image={block.image} />;

    case "screenTour":
      return <ScreenTour heading={block.heading} screens={block.screens} />;

    case "roleCard":
      return <RoleCard title={block.title} items={block.items} tools={block.tools} skills={block.skills} />;

    case "vennProcess":
      return <VennProcess heading={block.heading} phases={block.phases} items={block.items} />;

    case "moduleStory":
      return (
        <ModuleStory
          modules={block.modules.map(({ shots, ...m }) => ({
            ...m,
            shots: shots?.map(({ label, views, nda, bands, image }) => {
              const dim = (manifest as Record<string, { w: number; h: number }>)[image.src];
              return { label, views, nda, bands, ratio: dim ? dim.w / dim.h : undefined };
            }),
          }))}
          media={block.modules.map((m) => (m.shots ?? []).map((s) => <Picture key={s.image.src} img={s.image} size="wide" contain rounded={false} className="!bg-transparent" />))}
        />
      );

    case "systemSpecimen":
      return <SystemSpecimen family={block.family} tracking={block.tracking} scale={block.scale} spacing={block.spacing} />;

    case "designTokens":
      return <DesignTokens neutrals={block.neutrals} brand={block.brand} severity={block.severity} />;

    case "termMap":
      return <TermMap heading={block.heading} intro={block.intro} centre={block.centre} branches={block.branches} />;

    case "issueFeed":
      return <IssueFeed heading={block.heading} items={block.items} />;

    case "phoneCarousel":
      return (
        <PhoneCarousel
          heading={block.heading}
          intro={block.intro}
          slides={block.slides.map(({ kind, title }) => ({ kind, title }))}
          media={block.slides.map((x) => <Picture key={x.image.src} img={x.image} size="third" rounded={false} className="!bg-transparent h-full object-cover" />)}
        />
      );

    case "appCoverflow":
      return (
        <AppCoverflow
          heading={block.heading}
          intro={block.intro}
          screens={block.screens.map(({ title, tag, body }) => ({ title, tag, body }))}
          media={block.screens.map((x) => <Picture key={x.image.src} img={x.image} size="phone" contain rounded={false} className="!bg-transparent" />)}
        />
      );

    case "learnings":
      return <Learnings items={block.items} />;

    case "systemLayers": {
      const { scenarios, flows, points, tech, trees, artefacts } = block;
      return <SystemLayers heading={block.heading} intro={block.intro} data={{ scenarios, flows, points, tech, trees, artefacts }} />;
    }

    case "testRack":
      return <TestRack heading={block.heading} tiers={block.tiers} />;

    case "clabMaterial":
      return <MaterialDesign heading={block.heading} />;

    case "clabPrototype":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          {block.intro && <p className={`${prose} -mt-2 mb-8 text-ink-soft`}>{block.intro}</p>}
          <ClabDemo />
        </div>
      );

    case "processPath":
      return <ProcessPath heading={block.heading} steps={block.steps} caption={block.caption} />;

    case "stakeholderRings":
      return (
        <div>
          <StakeholderRings heading={block.heading} centre={block.centre} rings={block.rings} />
          {block.caption && <p className="mt-5 text-sm text-ink-mute">{block.caption}</p>}
        </div>
      );

    case "keyFeatures":
      return <KeyFeatures heading={block.heading} centre={block.centre} items={block.items} />;

    case "testOverview": {
      const r = block.rating;
      const sum = block.groups.reduce((n, g) => n + g.value, 0);
      const tone = (i: number) => (i % 2 ? "color-mix(in oklab, var(--accent) 45%, white)" : "#fbf9f4");
      return (
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            {block.heading && <H>{block.heading}</H>}
            {r && (
              <div className="mb-6 flex items-center gap-4">
                <span className="meta text-ink-mute">{r.label}</span>
                <span className="flex gap-1.5" role="img" aria-label={`${r.label}: ${r.value} out of ${r.max}`}>
                  {Array.from({ length: r.max }, (_, i) => (
                    <span key={i} className="h-7 w-7 rounded-[0.45rem]" style={{ background: i < r.value ? "var(--accent-ink)" : "var(--color-paper-deep)" }} />
                  ))}
                </span>
                <span className="font-display-soft text-[1.35rem] tabular-nums">
                  {r.value}
                  <span className="text-ink-mute">/{r.max}</span>
                </span>
              </div>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            <Reveal className="md:col-span-2">
              <div className="flex h-full flex-col rounded-media p-6 text-paper md:p-8" style={{ background: "var(--accent-ink)" }}>
                <p className="font-display-soft text-[4rem] leading-none tabular-nums">{block.total.value}</p>
                <p className="meta mt-2 text-paper/70">{block.total.label}</p>
                <div className="mt-8 flex h-2.5 gap-1" aria-hidden>
                  {block.groups.map((g, i) => (
                    <span key={g.label} className="h-full rounded-full" style={{ flex: g.value, background: tone(i) }} />
                  ))}
                </div>
                <ul className="mt-6 space-y-4">
                  {block.groups.map((g, i) => (
                    <li key={g.label} className="flex items-center gap-4">
                      <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper/10">
                        <RowIcon name={g.icon} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{g.label}</span>
                        <span className="text-sm text-paper/70">
                          {g.value} {g.unit} · {Math.round((g.value / sum) * 100)}%
                        </span>
                      </span>
                      <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: tone(i) }} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-3">
              <div className="h-full rounded-media border border-line bg-card p-6 md:p-8">
                <p className="meta" style={{ color: "var(--accent-ink)" }}>What worked</p>
                <ul className="mt-5 space-y-4">
                  {block.worked.map((x) => (
                    <li key={x} className="flex gap-3.5 text-[1rem] leading-snug text-ink-soft">
                      <span
                        aria-hidden
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                        style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)", color: "var(--accent-ink)" }}
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3.5 8.5l3 3 6-7" />
                        </svg>
                      </span>
                      <Rich text={x} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      );
    }

    case "iconCards":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ul className={`grid gap-4 sm:grid-cols-2 ${block.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {block.items.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06} className="flex">
                <div className="flex w-full flex-col rounded-media border border-line bg-card p-6 md:p-8">
                  <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}>
                    <RowIcon name={f.icon} />
                  </span>
                  <p className="mt-6 font-display-soft text-[1.3rem] leading-tight">{f.title}</p>
                  <p className="mt-2.5 text-[0.95rem] leading-snug text-ink-soft"><Rich text={f.body} /></p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      );

    case "problemFix":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <ol className={`grid gap-4 sm:grid-cols-2 ${block.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {block.items.map((f, i) => (
              <Reveal as="li" key={f.problem} delay={i * 0.06} className="flex flex-col overflow-hidden rounded-media border border-line bg-card">
                <div className="flex-1 p-5 md:p-6">
                  <p className="meta flex items-center gap-2 text-ink-mute">
                    <span className="tabular-nums" style={{ color: "var(--accent-ink)" }}>{String(i + 1).padStart(2, "0")}</span>
                    Problem
                  </p>
                  <p className="mt-3 font-medium leading-snug">{f.problem}</p>
                </div>
                <div className="relative border-t border-dashed border-line">
                  <span
                    aria-hidden
                    className="absolute left-5 top-0 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-paper md:left-6"
                    style={{ background: "var(--accent-ink)" }}
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v10M4 9l4 4 4-4" />
                    </svg>
                  </span>
                </div>
                <div className="flex-1 p-5 pt-7 md:p-6 md:pt-8" style={{ background: "color-mix(in oklab, var(--accent) 8%, transparent)" }}>
                  <p className="meta" style={{ color: "var(--accent-ink)" }}>What can be done</p>
                  <p className="mt-3 text-sm text-ink-soft"><Rich text={f.fix} /></p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      );

    case "image":
      return (
        <figure className={block.size === "inset" ? "mx-auto max-w-2xl" : ""}>
          {block.heading && <H>{block.heading}</H>}
          <Picture img={block.image} size={block.size === "full" ? "full" : block.size === "inset" ? "half" : "wide"} fit={!block.fill} />
          {block.image.caption && <figcaption className="mx-auto mt-3 max-w-[64ch] text-center text-sm text-ink-mute">{block.image.caption}</figcaption>}
        </figure>
      );

    case "gallery":
      if (block.layout === "strip") {
        return (
          <div>
            {block.heading && <H>{block.heading}</H>}
            <ScrollStrip label={block.heading ?? "Gallery"} count={block.images.length}>
              {block.images.map((img) => (
                <figure key={img.src} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[34%]">
                  <Picture img={img} size="third" />
                  {img.caption && <figcaption className="mt-2 text-sm text-ink-mute">{img.caption}</figcaption>}
                </figure>
              ))}
            </ScrollStrip>
          </div>
        );
      }
      {
        // Justified rows: every image in a row shares one height, widths follow each image's proportions.
        const per = block.columns ?? 2;
        const rows: (typeof block.images)[] = [];
        for (let i = 0; i < block.images.length; i += per) rows.push(block.images.slice(i, i + per));
        const ratio = (src: string) => {
          const d = (manifest as Record<string, { w: number; h: number }>)[src];
          return d ? d.w / d.h : 1.5;
        };
        return (
          <div>
            {block.heading && <H>{block.heading}</H>}
            <div className="space-y-4">
              {rows.map((row, ri) => (
                <div key={ri} className="flex flex-col gap-4 sm:flex-row">
                  {row.map((img) => (
                    <figure key={img.src} className="min-w-0" style={{ flex: `${ratio(img.src).toFixed(4)} 1 0%` }}>
                      <Picture img={img} size={per === 3 ? "third" : "half"} />
                      {img.caption && <figcaption className="mt-2 text-sm text-ink-mute">{img.caption}</figcaption>}
                    </figure>
                  ))}
                  {/* A short last row keeps the size of the full rows above */}
                  {rows.length > 1 &&
                    Array.from({ length: per - row.length }, (_, k) => (
                      <div key={`pad-${k}`} aria-hidden className="hidden sm:block" style={{ flex: `${ratio(rows[0][0].src).toFixed(4)} 1 0%` }} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        );
      }

    case "beforeAfter":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <BeforeAfter before={block.before} after={block.after} bare={!!(block.before.cutout && block.after.cutout)} />
          {block.caption && <p className={`mt-3 text-sm text-ink-mute ${block.before.cutout ? "text-center" : ""}`}>{block.caption}</p>}
        </div>
      );

    case "testing":
      return (
        <div className="space-y-8">
          {(block.heading || block.rating) && (
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              {block.heading && <H>{block.heading}</H>}
              {block.rating && (
                <div className="mb-6 flex items-center gap-4">
                  <span className="meta text-ink-mute">{block.rating.label}</span>
                  <span className="flex gap-1.5" role="img" aria-label={`${block.rating.label}: ${block.rating.value} out of ${block.rating.max}`}>
                    {Array.from({ length: block.rating.max }, (_, i) => (
                      <span
                        key={i}
                        className="h-7 w-7 rounded-[0.45rem]"
                        style={{ background: i < block.rating!.value ? "var(--accent-ink)" : "var(--color-paper-deep)" }}
                      />
                    ))}
                  </span>
                  <span className="font-display-soft text-[1.35rem] tabular-nums">
                    {block.rating.value}
                    <span className="text-ink-mute">/{block.rating.max}</span>
                  </span>
                </div>
              )}
            </div>
          )}
          {block.summary && <p className={`${prose} text-ink-soft`}><Rich text={block.summary} /></p>}
          {block.metrics && block.metrics.length > 0 && (
            <div className="overflow-hidden rounded-media border border-line bg-card">
              <table className="w-full text-left">
                <caption className="sr-only">Before and after results</caption>
                <thead className="meta border-b border-line text-ink-mute">
                  <tr>
                    <th scope="col" className="p-4 font-medium md:px-6">Measure</th>
                    <th scope="col" className="p-4 font-medium">Before</th>
                    <th scope="col" className="p-4 font-medium">After</th>
                    <th scope="col" className="hidden p-4 font-medium md:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {block.metrics.map((m) => (
                    <tr key={m.label}>
                      <th scope="row" className="p-4 font-medium md:px-6">
                        <span className="flex items-center gap-3">
                          {m.icon && <MetricGlyph name={m.icon} />}
                          {m.label}
                        </span>
                      </th>
                      <td className="p-4 tabular-nums text-ink-mute">{m.before ?? "—"}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 font-display-soft text-h3 tabular-nums ${m.better === false ? "text-[#9b2c1f]" : "text-forest"}`}>
                          {m.after}
                          {m.better !== undefined && (
                            <span className="text-sm" aria-label={m.better ? "improved" : "got worse"}>
                              {m.better ? "▲" : "▼"}
                            </span>
                          )}
                        </span>
                        {m.note && <span className="mt-1 block text-sm text-ink-mute md:hidden">{m.note}</span>}
                      </td>
                      <td className="hidden p-4 text-sm text-ink-mute md:table-cell">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {(block.positives?.length || block.negatives?.length) && (
            <div className="grid gap-4 md:grid-cols-2">
              {block.positives && block.positives.length > 0 && (
                <div className="rounded-media border border-line bg-card p-6">
                  <p className="meta mb-4 text-forest">What worked</p>
                  <ul className="space-y-3">
                    {block.positives.map((x) => (
                      <li key={x} className="flex gap-3"><span aria-hidden className="text-forest">+</span><span><Rich text={x} /></span></li>
                    ))}
                  </ul>
                </div>
              )}
              {block.negatives && block.negatives.length > 0 && (
                <div className="rounded-media border border-line bg-card p-6">
                  <p className="meta mb-4 text-[#9b2c1f]">What didn&rsquo;t (yet)</p>
                  <ul className="space-y-3">
                    {block.negatives.map((x) => (
                      <li key={x} className="flex gap-3"><span aria-hidden className="text-[#9b2c1f]">−</span><span><Rich text={x} /></span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case "groups":
      return (
        <div className="space-y-6">
          {block.heading && <H>{block.heading}</H>}
          <div className={`grid gap-4 ${block.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {block.groups.map((g) => (
              <div key={g.title} className="rounded-media border border-line bg-card p-6">
                <p className="meta mb-4 font-bold" style={{ color: "var(--accent-ink)" }}>{g.title}</p>
                <ul className="space-y-2.5">
                  {g.items.map((x) => (
                    <li key={x} className="flex gap-3 text-ink-soft">
                      <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                      <span><Rich text={x} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case "showcase": {
      const span = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4", 6: "md:col-span-6" } as const;
      return (
        <div className="space-y-6">
          {block.heading && <H>{block.heading}</H>}
          <div className="grid gap-3 md:grid-cols-6">
            {block.items.map((it) => (
              <article key={it.title} className={`group flex flex-col overflow-hidden rounded-media border border-line bg-card ${span[it.span ?? 2]}`}>
                <div
                  className="relative flex h-60 items-center justify-center p-6 md:h-72 md:p-8"
                  style={{ background: "radial-gradient(120% 90% at 50% 100%, color-mix(in oklab, var(--accent) 14%, #fbf9f4), #fbf9f4 70%)" }}
                >
                  <div className="h-full w-full">
                    <Picture
                      img={it.image}
                      size={it.span && it.span >= 4 ? "wide" : "third"}
                      contain
                      className="transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col border-t border-line p-6">
                  <p className="font-display-soft text-h3">{it.title}</p>
                  <p className="mt-2 text-ink-soft"><Rich text={it.body} /></p>
                  {it.chips && (
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                      {it.chips.map((c) => (
                        <li key={c} className="rounded-full border border-line bg-paper px-3 py-1 text-sm tabular-nums">{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }
    case "mediaText": {
      const rating = block.rating;
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col overflow-hidden rounded-media border border-line bg-card p-4 md:p-5">
            {rating && (
              <div className="mb-4 flex items-center justify-end gap-3">
                <span className="meta text-ink-mute">{rating.label}</span>
                <span className="flex gap-1" role="img" aria-label={`${rating.label}: ${rating.value} out of ${rating.max}`}>
                  {Array.from({ length: rating.max }, (_, i) => {
                    const fill = Math.max(0, Math.min(1, rating.value - i));
                    return (
                      <span
                        key={i}
                        className="h-5 w-5 rounded-[0.35rem]"
                        style={{
                          background: `linear-gradient(90deg, var(--accent-ink) ${fill * 100}%, color-mix(in oklab, var(--accent) 16%, #e9e6df) ${fill * 100}%)`,
                        }}
                      />
                    );
                  })}
                </span>
                <span className="font-display-soft text-[1.15rem] tabular-nums">
                  {rating.value}
                  <span className="text-ink-mute">/{rating.max}</span>
                </span>
              </div>
            )}
            <div className="flex flex-1 items-center justify-center">
              <Picture img={block.image} size="half" fit />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-media border border-line bg-card p-6 md:p-8">
            {block.label && <p className="meta text-ink-mute">{block.label}</p>}
            <p className="mt-2 font-display-soft text-h3">{block.title}</p>
            <div className="mt-3 space-y-3 text-ink-soft">
              {block.body.map((t) => (
                <p key={t}><Rich text={t} /></p>
              ))}
            </div>
          </div>
        </div>
      );
    }
    case "featureStats":
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-media border border-line bg-card p-6">
            {block.feature.image && (
              <figure className="-mx-2 -mt-2 mb-5">
                <Picture img={block.feature.image} size="half" fit />
              </figure>
            )}
            <p className="font-medium">{block.feature.title}</p>
            <p className="mt-2 text-sm text-ink-soft"><Rich text={block.feature.body} /></p>
          </div>
          <div className="flex flex-col rounded-media border border-line bg-card p-6">
            {block.statsTitle && <p className="meta mb-4 text-ink-mute">{block.statsTitle}</p>}
            <dl className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-control bg-line">
              {block.stats.map((st) => (
                <div key={st.label} className="flex flex-col justify-center bg-card p-5">
                  <dt className="sr-only">{st.label}</dt>
                  <dd>
                    <span className="block font-display-soft text-h2 tabular-nums" style={{ color: "var(--accent-ink)" }}>{st.value}</span>
                    <span className="mt-2 block text-sm text-ink-soft">{st.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      );
    case "ratings":
      return (
        <div className="space-y-6">
          {block.heading && <H>{block.heading}</H>}
          <ul className="divide-y divide-line border-y border-line">
            {block.items.map((r) => (
              <li key={r.label} className="grid items-center gap-x-6 gap-y-3 py-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-display-soft text-h3">{r.label}</p>
                  {r.note && <p className="mt-1 text-sm text-ink-mute">{r.note}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex gap-1.5" role="img" aria-label={`${r.label}: ${r.value} out of ${r.max}`}>
                    {Array.from({ length: r.max }, (_, i) => (
                      <span
                        key={i}
                        className="h-6 w-9 rounded-[0.4rem] md:w-12"
                        style={{ background: i < r.value ? "var(--accent-ink)" : "color-mix(in oklab, var(--accent) 14%, #e9e6df)" }}
                      />
                    ))}
                  </span>
                  <span className="w-12 text-right font-display-soft text-h3 tabular-nums">
                    {r.value}
                    <span className="text-ink-mute">/{r.max}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {block.source && <p className="text-sm text-ink-mute">{block.source}</p>}
        </div>
      );
    case "iconRow":
      return (
        <div className="space-y-6">
          {block.heading && <H>{block.heading}</H>}
          <ul
            className={`grid gap-y-8 border-y border-line py-8 sm:grid-cols-2 md:divide-x md:divide-line md:py-10 [&>li]:md:px-6 [&>li:first-child]:md:pl-0 [&>li:last-child]:md:pr-0 ${
              ({ 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5" } as Record<number, string>)[block.items.length] ?? "md:grid-cols-4"
            }`}
          >
            {block.items.map((a) => (
              <li key={a.title} className="flex flex-col">
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}
                >
                  <RowIcon name={a.icon} />
                </span>
                <p className="mt-4 font-display-soft text-h3">{a.title}</p>
                <p className="mt-1.5 text-ink-soft">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "palette":
      return (
        <div className="space-y-6">
          {block.heading && <H>{block.heading}</H>}
          <div className="grid gap-3 sm:grid-cols-2">
            {block.items.map((c) => (
              <article key={c.hex} className="overflow-hidden rounded-media border border-line bg-card">
                <div className="flex h-44 flex-col justify-between p-6 md:h-52" style={{ background: c.hex, color: isDark(c.hex) ? "#fbf9f4" : "#1a1916" }}>
                  <p className="meta opacity-75">{c.role}</p>
                  <p className="font-display-soft text-h2">{c.name}</p>
                </div>
                <dl className="grid grid-cols-3 border-b border-line text-sm">
                  {([["HEX", c.hex], ["RGB", c.rgb], ["CMYK", c.cmyk]] as const).map(([k, v]) => (
                    <div key={k} className="border-r border-line px-4 py-3 last:border-r-0">
                      <dt className="meta text-ink-mute">{k}</dt>
                      <dd className="mt-1 font-medium tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="p-6 text-ink-soft">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      );
    case "businessModel":
      return <BusinessCanvas b={block} />;
    case "list":
      return (
        <div className="space-y-6">
          {block.heading && <H>{block.heading}</H>}
          <ol className={`${prose} divide-y divide-line border-y border-line`}>
            {block.items.map((x, i) => (
              <li key={x} className="flex gap-5 py-4">
                <span className="meta tabular-nums pt-1" style={{ color: "var(--accent-ink)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-intro text-ink-soft"><Rich text={x} /></span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "callout":
      return (
        <aside
          className="max-w-[72ch] rounded-media border-l-4 p-6 md:p-8"
          style={{ borderColor: "var(--accent)", background: "color-mix(in oklab, var(--accent) 13%, #fbf9f4)" }}
        >
          {block.label && <p className="meta mb-2" style={{ color: "var(--accent-ink)" }}>{block.label}</p>}
          <p className="text-ink"><Rich text={block.body} /></p>
        </aside>
      );

    case "needed":
      return (
        <Needed>
          <ul className="mt-1 list-disc pl-5">
            {block.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Needed>
      );
  }
}
