"use client";

import { useState, type ReactNode } from "react";

type Swatch = { name: string; hex: string };
type Group = { title: string; note?: string; display?: "circles" | "bands" | "ramp"; swatches: Swatch[] };

const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 150;
};

/**
 * A colour system drawn as it's used: overlapping circles for brand colours,
 * stacked bands for a small set, a ramp for neutrals. Hover a colour to read
 * it; click to copy its hex.
 */
export function ColorSystem({ groups, specimen }: { groups: Group[]; specimen?: ReactNode }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {groups.map((g) => (
        <GroupCard key={g.title + (g.note ?? "")} g={g} />
      ))}
      {specimen && <div className="lg:col-span-2">{specimen}</div>}
    </div>
  );
}

function GroupCard({ g }: { g: Group }) {
  const [on, setOn] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const cur = g.swatches[on];
  const copy = (s: Swatch) => {
    navigator.clipboard?.writeText(s.hex).then(
      () => {
        setCopied(s.hex);
        setTimeout(() => setCopied(null), 1400);
      },
      () => {},
    );
  };
  const props = (i: number) => ({
    onPointerEnter: () => setOn(i),
    onFocus: () => setOn(i),
    onClick: () => copy(g.swatches[i]),
    "aria-label": `${g.swatches[i].name} ${g.swatches[i].hex}, copy`,
  });
  const display = g.display ?? "circles";
  return (
    <section className="flex flex-col rounded-media border border-line bg-card p-5 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="meta flex items-center gap-2 text-ink-mute">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          {g.title}
          {g.note && <span className="normal-case tracking-normal">· {g.note}</span>}
        </p>
        <p className="text-right" aria-live="polite">
          <span className="block font-display-soft text-[1.15rem] leading-tight">{cur.name}</span>
          <span className="meta tabular-nums text-ink-mute">{copied === cur.hex ? "Copied" : cur.hex}</span>
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center py-8">
        {display === "circles" && (
          <div className={`flex flex-wrap justify-center ${g.swatches.length > 3 ? "max-w-[17rem]" : ""}`}>
            {g.swatches.map((s, i) => {
              const big = g.swatches.length <= 3;
              return (
                <button
                  key={s.name + s.hex}
                  type="button"
                  {...props(i)}
                  className={`relative grid shrink-0 place-items-center rounded-full border border-black/5 transition-transform duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-105 focus-visible:z-10 ${big ? "-mx-3 h-32 w-32 md:h-40 md:w-40" : "-mx-2 -my-1.5 h-24 w-24 md:h-[6.5rem] md:w-[6.5rem]"} ${i === on ? "z-10 shadow-[0_14px_30px_rgba(0,0,0,.14)]" : ""}`}
                  style={{ background: s.hex, mixBlendMode: "multiply" }}
                >
                  <span className={`pointer-events-none text-center text-[0.72rem] leading-tight transition-opacity ${i === on ? "opacity-100" : "opacity-0"}`} style={{ color: isDark(s.hex) ? "#fbf9f4" : "#1a1916", mixBlendMode: "normal" }}>
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {display === "bands" && (
          <div className="w-full max-w-[22rem] overflow-hidden rounded-[1.4rem] shadow-[0_12px_30px_rgba(0,52,102,.12)]">
            {g.swatches.map((s, i) => (
              <button
                key={s.hex}
                type="button"
                {...props(i)}
                className="flex w-full items-center justify-between px-5 text-left transition-[height] duration-300 ease-out"
                style={{ background: s.hex, color: isDark(s.hex) ? "#fbf9f4" : "#1a1916", height: i === on ? "7rem" : "3.75rem" }}
              >
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-xs tabular-nums opacity-70">{s.hex}</span>
              </button>
            ))}
          </div>
        )}

        {display === "ramp" && (
          <div className="flex h-36 w-full overflow-hidden rounded-[1.4rem] border border-line">
            {g.swatches.map((s, i) => (
              <button
                key={s.hex}
                type="button"
                {...props(i)}
                className="flex flex-col items-center justify-center gap-1 transition-[flex-grow] duration-300 ease-out"
                style={{ background: s.hex, color: isDark(s.hex) ? "#fbf9f4" : "#1a1916", flexGrow: i === on ? 2.4 : 1, flexBasis: 0 }}
              >
                <span className="font-display-soft text-2xl leading-none">Aa</span>
                <span className={`text-[0.65rem] tabular-nums transition-opacity ${i === on ? "opacity-70" : "opacity-0"}`}>{s.hex}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4 text-xs text-ink-mute">
        {g.swatches.map((s, i) => (
          <li key={s.name + s.hex}>
            <button type="button" {...props(i)} className={`flex items-center gap-1.5 transition-colors ${i === on ? "text-ink" : "hover:text-ink"}`}>
              <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ background: s.hex }} />
              {s.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
