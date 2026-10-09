"use client";

import { useMemo, useState } from "react";
import { MONTHS, MONTH_COLORS, notes, releases, type Platform } from "@/data/rereleases2024";

const PLATFORMS: Platform[] = ["Amazon", "Netflix", "Others"];

// Chart geometry (viewBox units)
const W = 1200, LEFT = 120, RIGHT = 20, TOP = 24, ROW_H = 200, ROW_GAP = 16;
const COL_W = (W - LEFT - RIGHT) / 12;
const H = TOP + ROW_H * 3 + ROW_GAP * 2 + 44;
const radius = (rating: number) => 6 + rating * 2.1;
const rowTop = (i: number) => TOP + i * (ROW_H + ROW_GAP);
const yFor = (row: number, rating: number) => rowTop(row) + ROW_H - 14 - (rating / 10) * (ROW_H - 34);
const xFor = (month: number) => LEFT + (month - 0.5) * COL_W;

/**
 * Streaming re-releases in 2024: one bubble per movie, by platform (rows),
 * month (columns) and IMDB rating (height and size). Filter by platform,
 * fade low ratings, and focus a month for the numbers behind it.
 */
export function ReleasesChart() {
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [minRating, setMinRating] = useState(0);
  const [month, setMonth] = useState<number | null>(3);
  const [showNotes, setShowNotes] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [hover, setHover] = useState<{ p: Platform; m: number; r: number; x: number; y: number } | null>(null);

  const perMonth = useMemo(
    () =>
      MONTHS.map((_, i) => {
        const items = releases.filter((r) => r.month === i + 1);
        const by = Object.fromEntries(PLATFORMS.map((p) => [p, items.filter((r) => r.platform === p).length])) as Record<Platform, number>;
        const avg = items.length ? items.reduce((a, r) => a + r.rating, 0) / items.length : 0;
        return { count: items.length, by, avg, top: items.reduce((a, r) => (r.rating > a ? r.rating : a), 0) };
      }),
    [],
  );
  const busiest = perMonth.reduce((b, m, i) => (m.count > perMonth[b].count ? i : b), 0);

  // Spread bubbles that share a month cell so they don't sit on top of each other
  const placed = useMemo(() => {
    const groups = new Map<string, typeof releases>();
    for (const r of releases) {
      const k = `${r.platform}-${r.month}`;
      groups.set(k, [...(groups.get(k) ?? []), r]);
    }
    return releases.map((r) => {
      const g = groups.get(`${r.platform}-${r.month}`)!;
      const i = g.indexOf(r);
      const offset = g.length === 1 ? 0 : ((i % 2 === 0 ? -1 : 1) * Math.ceil(i / 2) * 9) + (g.length % 2 === 0 ? 4.5 : 0);
      return { ...r, cx: xFor(r.month) + offset, cy: yFor(PLATFORMS.indexOf(r.platform), r.rating) };
    });
  }, []);

  const sel = month ? perMonth[month - 1] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-9">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div role="group" aria-label="Platform" className="flex flex-wrap gap-2">
            {(["All", ...PLATFORMS] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={platform === p}
                onClick={() => setPlatform(p)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${platform === p ? "border-ink bg-ink text-paper" : "border-ink/15 bg-card hover:border-ink"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm">
            <span className="text-ink-soft">IMDB ≥ <strong className="tabular-nums text-ink">{minRating.toFixed(1)}</strong></span>
            <input type="range" min={0} max={9} step={0.5} value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-36 accent-[var(--color-forest)]" />
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" checked={showNotes} onChange={(e) => setShowNotes(e.target.checked)} className="accent-[var(--color-forest)]" />
            Show insights
          </label>
        </div>

        {/* Chart */}
        <div className="no-scrollbar relative mt-6 overflow-x-auto rounded-media border border-line bg-card">
          <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[760px]" role="img" aria-label={`Bubble chart of streaming re-releases in 2024 by platform and month. ${MONTHS[busiest]} had the most re-releases (${perMonth[busiest].count}).`}>
            {/* Month highlight */}
            {month && <rect x={LEFT + (month - 1) * COL_W} y={TOP - 8} width={COL_W} height={ROW_H * 3 + ROW_GAP * 2 + 16} rx={14} fill="#f0b2b6" opacity={0.22} />}

            {PLATFORMS.map((p, ri) => (
              <g key={p} opacity={platform === "All" || platform === p ? 1 : 0.18} style={{ transition: "opacity .3s" }}>
                <line x1={LEFT} x2={W - RIGHT} y1={rowTop(ri) + ROW_H} y2={rowTop(ri) + ROW_H} stroke="#d8d1c4" />
                <text x={20} y={rowTop(ri) + ROW_H / 2} fontSize={18} fill="#4a4740" dominantBaseline="middle">{p}</text>
                {[0, 2, 4, 6, 8, 10].map((t) => (
                  <text key={t} x={LEFT - 12} y={yFor(ri, t)} fontSize={11} fill="#6e6a61" textAnchor="end" dominantBaseline="middle">{t}</text>
                ))}
                {/* Insights from the original chart: platform gaps */}
                {showNotes &&
                  notes
                    .filter((n) => n.platform === p)
                    .map((n) => (
                      <g key={n.month}>
                        <rect x={LEFT + (n.month - 1) * COL_W + 6} y={rowTop(ri) + 16} width={COL_W - 12} height={ROW_H - 40} rx={12} fill={MONTH_COLORS[n.month - 1]} opacity={0.35} />
                        <foreignObject x={LEFT + (n.month - 1) * COL_W + 10} y={rowTop(ri) + 40} width={COL_W - 20} height={ROW_H - 80}>
                          <p style={{ fontSize: 12, lineHeight: 1.35, color: "#4a4740", margin: 0 }}>{n.text}</p>
                        </foreignObject>
                      </g>
                    ))}
              </g>
            ))}

            {/* Bubbles */}
            {placed.map((r, i) => {
              const dim = (platform !== "All" && platform !== r.platform) || r.rating < minRating;
              return (
                <circle
                  key={i}
                  cx={r.cx}
                  cy={r.cy}
                  r={radius(r.rating)}
                  fill={MONTH_COLORS[r.month - 1]}
                  stroke="#fff"
                  strokeWidth={1.5}
                  opacity={dim ? 0.12 : 0.85}
                  style={{ transition: "opacity .3s" }}
                  onPointerEnter={() => setHover({ p: r.platform, m: r.month, r: r.rating, x: r.cx, y: r.cy })}
                  onPointerLeave={() => setHover(null)}
                >
                  <title>{`${r.platform} · ${MONTHS[r.month - 1]} · IMDB ≈ ${r.rating.toFixed(1)}`}</title>
                </circle>
              );
            })}

            {/* March peak note */}
            {showNotes && (
              <text x={xFor(busiest + 1)} y={H - 14} fontSize={12} fill="#4a4740" textAnchor="middle">
                {MONTHS[busiest]}: the most active month for re-releases
              </text>
            )}

            {/* Month axis: each month is a focusable button */}
            {MONTHS.map((m, i) => (
              <g
                key={m}
                role="button"
                tabIndex={0}
                aria-pressed={month === i + 1}
                aria-label={`${m}: ${perMonth[i].count} re-releases`}
                onClick={() => setMonth(month === i + 1 ? null : i + 1)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setMonth(month === i + 1 ? null : i + 1))}
                onPointerEnter={() => setMonth(i + 1)}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <rect x={LEFT + i * COL_W} y={rowTop(2) + ROW_H + 2} width={COL_W} height={30} fill="transparent" />
                <text x={xFor(i + 1)} y={rowTop(2) + ROW_H + 22} fontSize={14} textAnchor="middle" fill={month === i + 1 ? "#1a1916" : "#6e6a61"} fontWeight={month === i + 1 ? 600 : 400}>
                  {m}
                </text>
              </g>
            ))}
          </svg>

          {hover && (
            <div
              aria-hidden
              className="pointer-events-none absolute rounded-control bg-ink px-3 py-2 text-xs text-paper shadow-float"
              style={{ left: `${(hover.x / W) * 100}%`, top: `${(hover.y / H) * 100}%`, transform: "translate(-50%, calc(-100% - 14px))" }}
            >
              {hover.p} · {MONTHS[hover.m - 1]} · IMDB ≈ {hover.r.toFixed(1)}
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-ink-mute">
          Bubble size and height show the IMDB rating. Re-plotted from my original Tableau chart, so ratings are approximate. Scroll sideways on small screens.
        </p>
      </div>

      {/* Month panel */}
      <aside className="lg:col-span-3" aria-live="polite">
        <div className="rounded-media border border-line bg-card p-6">
          {sel && month ? (
            <>
              <p className="meta text-ink-mute">{MONTHS[month - 1]} 2024</p>
              <p className="mt-2 font-display-soft text-h1 tabular-nums">{sel.count}</p>
              <p className="text-ink-soft">re-release{sel.count === 1 ? "" : "s"}{month - 1 === busiest ? ", the most of any month" : ""}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {PLATFORMS.map((p) => (
                  <li key={p} className="flex justify-between gap-3">
                    <span>{p}</span>
                    <span className={`tabular-nums ${sel.by[p] === 0 ? "text-[#9b2c1f]" : ""}`}>{sel.by[p] === 0 ? "none" : sel.by[p]}</span>
                  </li>
                ))}
              </ul>
              {sel.count > 0 && (
                <p className="mt-5 border-t border-line pt-4 text-sm text-ink-soft">
                  Average IMDB ≈ <strong className="text-ink">{sel.avg.toFixed(1)}</strong> · highest ≈ <strong className="text-ink">{sel.top.toFixed(1)}</strong>
                </p>
              )}
            </>
          ) : (
            <p className="text-ink-soft">Hover or select a month to see its numbers.</p>
          )}
        </div>
        <button type="button" onClick={() => setShowTable((v) => !v)} className="meta mt-4 text-ink-mute underline underline-offset-4 hover:text-ink">
          {showTable ? "Hide" : "Show"} the data as a table
        </button>
      </aside>

      {showTable && (
        <div className="overflow-x-auto lg:col-span-12">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Re-releases per month and platform, 2024</caption>
            <thead className="meta border-b border-line text-ink-mute">
              <tr>
                <th scope="col" className="py-2 pr-4">Month</th>
                {PLATFORMS.map((p) => <th key={p} scope="col" className="py-2 pr-4">{p}</th>)}
                <th scope="col" className="py-2 pr-4">Total</th>
                <th scope="col" className="py-2">Avg IMDB ≈</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {perMonth.map((m, i) => (
                <tr key={i}>
                  <th scope="row" className="py-2 pr-4 font-medium">{MONTHS[i]}</th>
                  {PLATFORMS.map((p) => <td key={p} className="py-2 pr-4 tabular-nums">{m.by[p]}</td>)}
                  <td className="py-2 pr-4 tabular-nums">{m.count}</td>
                  <td className="py-2 tabular-nums">{m.count ? m.avg.toFixed(1) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
