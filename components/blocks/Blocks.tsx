import { Fragment } from "react";
import type { Block } from "@/lib/types";
import { Picture } from "@/components/ui/Picture";
import { MaybeText, Needed } from "@/components/ui/Needed";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "./BeforeAfter";

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

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-6 font-display-soft text-h3">{children}</h3>
);

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
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <dl className={`grid gap-px overflow-hidden rounded-media border border-line bg-line ${block.items.length > 1 ? "sm:grid-cols-2" : ""} ${block.items.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {block.items.map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-card p-6 md:p-8">
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
                {p.quote && <p className="mt-5 font-display-wonk text-lede italic">&ldquo;{p.quote}&rdquo;</p>}
                <div className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
                  {p.needs && p.needs.length > 0 && (
                    <div>
                      <p className="meta mb-2 text-forest">Needs</p>
                      <ul className="space-y-1.5 text-ink-soft">{p.needs.map((n) => <li key={n}>{n}</li>)}</ul>
                    </div>
                  )}
                  {p.frustrations && p.frustrations.length > 0 && (
                    <div>
                      <p className="meta mb-2 text-[#9b2c1f]">Frustrations</p>
                      <ul className="space-y-1.5 text-ink-soft">{p.frustrations.map((n) => <li key={n}>{n}</li>)}</ul>
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

    case "hmw":
      return (
        <div className="rounded-media px-6 py-12 text-center md:px-16 md:py-20" style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)" }}>
          <p className="meta text-ink-mute">{block.label ?? "How might we"}</p>
          <p className="mx-auto mt-5 max-w-[30ch] font-display-wonk text-h2">{block.statement}</p>
        </div>
      );

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
                    <Picture img={s.image} size="wide" />
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
              <Reveal as="li" key={f.title} delay={(i % 3) * 0.06} className="flex flex-col rounded-media border border-line bg-card p-6">
                {f.image && (
                  <figure className="-mx-2 -mt-2 mb-5">
                    <Picture img={f.image} size="half" />
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

    case "image":
      return (
        <figure className={block.size === "inset" ? "mx-auto max-w-2xl" : block.size === "full" ? "md:-mx-8 lg:-mx-16" : ""}>
          <Picture img={block.image} size={block.size === "full" ? "full" : block.size === "inset" ? "half" : "wide"} />
          {block.image.caption && <figcaption className="mt-3 text-sm text-ink-mute">{block.image.caption}</figcaption>}
        </figure>
      );

    case "gallery":
      if (block.layout === "strip") {
        return (
          <div>
            {block.heading && <H>{block.heading}</H>}
            <div
              tabIndex={0}
              role="region"
              aria-label={`${block.heading ?? "Gallery"}, scrollable`}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-0 md:px-0"
            >
              {block.images.map((img) => (
                <figure key={img.src} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[34%]">
                  <Picture img={img} size="third" />
                  {img.caption && <figcaption className="mt-2 text-sm text-ink-mute">{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
            <p className="meta mt-3 text-ink-mute md:hidden">Swipe →</p>
          </div>
        );
      }
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <div className={`grid gap-4 ${block.columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
            {block.images.map((img) => (
              <figure key={img.src}>
                <Picture img={img} size={block.columns === 3 ? "third" : "half"} />
                {img.caption && <figcaption className="mt-2 text-sm text-ink-mute">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      );

    case "beforeAfter":
      return (
        <div>
          {block.heading && <H>{block.heading}</H>}
          <BeforeAfter before={block.before} after={block.after} />
          {block.caption && <p className="mt-3 text-sm text-ink-mute">{block.caption}</p>}
        </div>
      );

    case "testing":
      return (
        <div className="space-y-8">
          {block.heading && <H>{block.heading}</H>}
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
                      <th scope="row" className="p-4 font-medium md:px-6">{m.label}</th>
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

    case "callout":
      return (
        <aside className="max-w-[72ch] rounded-media border-l-4 bg-card p-6 md:p-8" style={{ borderColor: "var(--accent)" }}>
          {block.label && <p className="meta mb-2 text-ink-mute">{block.label}</p>}
          <p className="text-ink-soft"><Rich text={block.body} /></p>
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
