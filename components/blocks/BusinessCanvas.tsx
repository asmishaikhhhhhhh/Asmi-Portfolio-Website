import type { Block } from "@/lib/types";

type Canvas = Extract<Block, { type: "businessModel" }>;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const PER = { unit: "per unit", month: "per month" } as const;

// Shared log scale for the cost bars, so a ₹7,000 unit and a ₹7,00,000 build read honestly side by side.
const LO = Math.log10(5_000), HI = Math.log10(1_000_000);
const pos = (n: number) => ((Math.log10(n) - LO) / (HI - LO)) * 100;
const TICKS = [10_000, 1_00_000, 10_00_000];

function Cell({ n, title, items, className = "", tone }: { n: string; title: string; items: string[]; className?: string; tone?: boolean }) {
  return (
    <section
      className={`relative rounded-media border p-6 ${tone ? "border-transparent text-paper" : "border-line bg-card"} ${className}`}
      style={tone ? { background: "var(--accent-ink)" } : undefined}
    >
      <p className={`meta flex items-center gap-2 ${tone ? "text-paper/70" : "text-ink-mute"}`}>
        <span className="tabular-nums" style={tone ? undefined : { color: "var(--accent-ink)" }}>{n}</span>
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((x) => (
          <li key={x} className={`flex gap-2.5 text-[0.95rem] leading-snug ${tone ? "text-paper" : "text-ink-soft"}`}>
            <span
              aria-hidden
              className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: tone ? "color-mix(in oklab, var(--accent) 55%, white)" : "var(--accent)" }}
            />
            {x}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The business model as a canvas: partners and activities on the left, the
 * value proposition at the centre, customers on the right, and costs and
 * revenue underneath, as on a classic business model canvas.
 */
export function BusinessCanvas({ b }: { b: Canvas }) {
  const ranges = (b.costs ?? []).filter((c): c is Exclude<typeof c, string> => typeof c !== "string");
  const points = (b.costs ?? []).filter((c): c is string => typeof c === "string");
  const full = !!(b.partners && b.activities && b.resources && b.relationships && b.channels && b.segments);

  // Canonical order, used when only some blocks of the canvas exist
  const cells = [
    { n: "01", title: "Key partners", items: b.partners },
    { n: "02", title: "Key activities", items: b.activities },
    { n: "03", title: "Key resources", items: b.resources },
    { n: "04", title: "Value proposition", items: b.value, tone: true },
    { n: "05", title: "Customer relationships", items: b.relationships },
    { n: "06", title: "Channels", items: b.channels },
    { n: "07", title: "Customer segments", items: b.segments },
  ].filter((c): c is typeof c & { items: string[] } => !!c.items?.length);

  return (
    <div className="space-y-6">
      {b.heading && <h3 className="mb-6 font-display-soft text-h3">{b.heading}</h3>}

      {full ? (
        <div className="grid gap-3 md:grid-cols-5 md:grid-rows-2">
          <Cell n="01" title="Key partners" items={b.partners!} className="md:row-span-2" />
          <Cell n="02" title="Key activities" items={b.activities!} />
          <Cell n="04" title="Value proposition" items={b.value} className="md:row-span-2" tone />
          <Cell n="05" title="Customer relationships" items={b.relationships!} />
          <Cell n="07" title="Customer segments" items={b.segments!} className="md:row-span-2" />
          <Cell n="03" title="Key resources" items={b.resources!} className="md:col-start-2 md:row-start-2" />
          <Cell n="06" title="Channels" items={b.channels!} className="md:col-start-4 md:row-start-2" />
        </div>
      ) : (
        <div className={`grid gap-3 sm:grid-cols-2 ${cells.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {cells.map((c) => (
            <Cell key={c.n} n={c.n} title={c.title} items={c.items} tone={c.tone} />
          ))}
        </div>
      )}

      {(b.costs?.length || b.revenue?.length) && (
        <div className="grid gap-3 md:grid-cols-5">
          {b.costs && b.costs.length > 0 && (
            <section className={`rounded-media border border-line bg-card p-6 md:p-8 ${b.revenue?.length ? "md:col-span-3" : "md:col-span-5"}`}>
              <p className="meta flex items-center gap-2 text-ink-mute">
                <span className="tabular-nums" style={{ color: "var(--accent-ink)" }}>08</span>
                Cost structure
              </p>
              {ranges.length > 0 && (
                <>
                  <ul className="mt-6 space-y-5">
                    {ranges.map((c) => (
                      <li key={c.label}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-medium">{c.label}</span>
                          <span className="text-sm tabular-nums text-ink-soft">
                            {inr(c.min)} – {inr(c.max)} {c.per && <span className="meta ml-1 text-ink-mute">{PER[c.per]}</span>}
                          </span>
                        </div>
                        <div className="relative mt-2 h-2.5 rounded-full bg-paper-deep" aria-hidden>
                          <span
                            className="absolute inset-y-0 rounded-full"
                            style={{ left: `${pos(c.min)}%`, width: `${Math.max(pos(c.max) - pos(c.min), 2)}%`, background: "var(--accent)" }}
                          />
                        </div>
                        {c.note && <p className="mt-1.5 text-sm text-ink-mute">{c.note}</p>}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-3 h-4 text-[0.7rem] text-ink-mute" aria-hidden>
                    {TICKS.map((t) => (
                      <span key={t} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${pos(t)}%` }}>
                        {t >= 1_00_000 ? `₹${t / 1_00_000}L` : `₹${t / 1000}k`}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {points.length > 0 && (
                <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {points.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-soft">
                      <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {b.revenue && b.revenue.length > 0 && (
            <section className={`rounded-media border border-line bg-card p-6 md:p-8 ${b.costs?.length ? "md:col-span-2" : "md:col-span-5"}`}>
              <p className="meta flex items-center gap-2 text-ink-mute">
                <span className="tabular-nums" style={{ color: "var(--accent-ink)" }}>09</span>
                Revenue streams
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {b.revenue.map((r) => (
                  <li
                    key={r}
                    className="rounded-full px-4 py-2 text-[0.95rem] font-medium"
                    style={{ background: "color-mix(in oklab, var(--accent) 16%, #fbf9f4)", color: "var(--accent-ink)" }}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
