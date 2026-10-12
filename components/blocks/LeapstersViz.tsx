"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Img } from "@/lib/types";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ───────────────────────── Kids' quotes as puzzle pieces ───────────────────────── */

const PIECE_TONES = ["#BBD3F4", "#F1BACA", "#F6C99D", "#E3E8AE"];
// Edges per piece, [top, right, bottom, left]: 1 = tab out, -1 = blank in, 0 = flat border.
// Neighbouring edges are opposite, so the four pieces interlock.
const PIECE_EDGES: [number, number, number, number][] = [
  [0, 1, 1, 0],
  [0, 0, -1, -1],
  [-1, -1, 0, 0],
  [1, 0, 0, 1],
];

/** One straight side of a 100×100 piece, with a rounded tab or blank in the middle. */
function edge(px: number, py: number, qx: number, qy: number, nx: number, ny: number, sign: number) {
  if (!sign) return `L${qx} ${qy}`;
  const L = Math.hypot(qx - px, qy - py);
  const ux = (qx - px) / L;
  const uy = (qy - py) / L;
  const h = 22 * sign;
  const at = (t: number, k: number) => `${(px + ux * L * t + nx * k).toFixed(2)} ${(py + uy * L * t + ny * k).toFixed(2)}`;
  // base → pinched neck → round head → neck → base
  return [
    `L${at(0.36, 0)}`,
    `C${at(0.42, h * 0.45)} ${at(0.22, h * 1.05)} ${at(0.5, h * 1.05)}`,
    `C${at(0.78, h * 1.05)} ${at(0.58, h * 0.45)} ${at(0.64, 0)}`,
    `L${qx} ${qy}`,
  ].join(" ");
}

function piecePath([t, r, b, l]: [number, number, number, number]) {
  return [
    "M0 0",
    edge(0, 0, 100, 0, 0, -1, t),
    edge(100, 0, 100, 100, 1, 0, r),
    edge(100, 100, 0, 100, 0, 1, b),
    edge(0, 100, 0, 0, -1, 0, l),
    "Z",
  ].join(" ");
}

/**
 * Children's quotes as four interlocking puzzle pieces: scattered until the
 * section is in view, then they fit together; scroll away and they scatter again.
 */
export function PuzzleQuotes({ heading, quotes, stage = "#E38F3E" }: { heading?: string; quotes: string[]; stage?: string }) {
  const [together, setTogether] = useState(false);
  const [lift, setLift] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(t);
        // Reduced motion: assemble once and stay put
        if (e.isIntersecting) t = window.setTimeout(() => setTogether(true), calm ? 0 : 200);
        else if (!calm) setTogether(false);
      },
      { rootMargin: "-22% 0px -22% 0px", threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);
  const scatter = ["translate(-26%, -18%) rotate(-14deg)", "translate(28%, -22%) rotate(11deg)", "translate(-24%, 24%) rotate(10deg)", "translate(26%, 20%) rotate(-13deg)"];
  const q = quotes.slice(0, 4);

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div ref={box} className="overflow-hidden rounded-media px-[12%] py-[12%] md:px-[16%] md:py-[9%]" style={{ background: stage }}>
        <div className="mx-auto grid max-w-[480px] grid-cols-2" role="list" aria-label="What children told us">
          {q.map((text, i) => {
            const tone = PIECE_TONES[i % PIECE_TONES.length];
            const on = lift === i && together;
            return (
              <div
                key={text}
                role="listitem"
                tabIndex={0}
                onPointerEnter={() => setLift(i)}
                onPointerLeave={() => setLift(null)}
                onFocus={() => setLift(i)}
                onBlur={() => setLift(null)}
                className="relative aspect-square outline-none transition-transform duration-[900ms]"
                style={{
                  transform: together ? (on ? "translateY(-4px) scale(1.03)" : "none") : scatter[i],
                  transitionTimingFunction: together ? "cubic-bezier(.34,1.45,.64,1)" : "cubic-bezier(.5,0,.75,0)",
                  transitionDelay: together && lift === null ? `${i * 110}ms` : "0ms",
                  zIndex: on ? 10 : 1,
                }}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden style={{ filter: together && !on ? "none" : "drop-shadow(0 10px 14px rgb(0 0 0 / .18))", transition: "filter 600ms" }}>
                  <path d={piecePath(PIECE_EDGES[i])} fill={tone} stroke={stage} strokeWidth="0.9" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-[23%] grid place-items-center text-center">
                  <p className="font-display-soft text-[clamp(0.85rem,2.2vw,1.2rem)] leading-snug text-[#33424f]">&ldquo;{text}&rdquo;</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Comparison matrix ───────────────────────── */

/**
 * Platforms against criteria, ticks and crosses. Hover a column to read
 * down it, or reveal the blind spots no platform covers.
 */
export function CompareMatrix({ heading, intro, columns, rows }: { heading?: string; intro?: string; columns: string[]; rows: { name: string; values: boolean[] }[] }) {
  const [col, setCol] = useState<number | null>(null);
  const [blind, setBlind] = useState(false);
  const covered = columns.map((_, c) => rows.filter((r) => r.values[c]).length);
  const isBlind = (c: number) => covered[c] === 0;
  const lit = (c: number) => (blind ? isBlind(c) : col === null || col === c);

  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="rounded-media border border-line bg-card p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-mute">Hover a column to read down it.</p>
          <button
            type="button"
            aria-pressed={blind}
            onClick={() => setBlind((b) => !b)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${blind ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/30"}`}
            style={blind ? { background: "var(--accent-ink)" } : undefined}
          >
            {blind ? "Show everything" : "Show the blind spots"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left" onPointerLeave={() => setCol(null)}>
            <thead>
              <tr>
                <th className="w-[22%]" />
                {columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    onPointerEnter={() => setCol(i)}
                    className="meta px-2 pb-3 text-center align-bottom font-semibold leading-tight transition-opacity"
                    style={{ opacity: lit(i) ? 1 : 0.35, color: blind && isBlind(i) ? "var(--accent-ink)" : undefined }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className="border-t border-line py-3 pr-3 text-[0.9rem] font-medium">
                    {r.name}
                  </th>
                  {r.values.map((v, i) => (
                    <td
                      key={i}
                      onPointerEnter={() => setCol(i)}
                      className="border-t border-line py-3 text-center transition-[opacity,background] duration-200"
                      style={{ opacity: lit(i) ? 1 : 0.3, background: blind && isBlind(i) ? "color-mix(in oklab, var(--accent) 12%, transparent)" : col === i && !blind ? "color-mix(in oklab, var(--accent) 6%, transparent)" : undefined }}
                    >
                      <span
                        className="mx-auto grid h-7 w-7 place-items-center rounded-full"
                        style={{ background: v ? "color-mix(in oklab, #5aa552 18%, transparent)" : "color-mix(in oklab, #d9534a 14%, transparent)", color: v ? "#3f7f39" : "#c0453c" }}
                        aria-label={v ? "Yes" : "No"}
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                          <path {...P} strokeWidth={2.6} d={v ? "m5 12.5 4.5 4.5L19 7.5" : "M6.5 6.5l11 11m0-11-11 11"} />
                        </svg>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row" className="meta border-t border-line pt-3 text-ink-mute">
                  Covered by
                </th>
                {covered.map((n, i) => (
                  <td key={i} className="meta border-t border-line pt-3 text-center tabular-nums transition-opacity" style={{ opacity: lit(i) ? 1 : 0.35, color: n === 0 ? "var(--accent-ink)" : undefined }}>
                    {n}/{rows.length}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {blind && (
          <p className="pl-fade mt-4 text-[0.95rem] font-medium" style={{ color: "var(--accent-ink)" }}>
            None of the four platforms addressed {columns.filter((_, i) => isBlind(i)).join(" or ").toLowerCase()}.
          </p>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Playable mat ───────────────────────── */

type Card = { title: string; prompt: string };
type Deck = { name: string; color: string; ink: string; edge: string; body: string; front: Img; back: Img; cards: Card[] };
type Player = { name: string; color: string };
type Phase = "pick" | "draw" | "card" | "bonusPick" | "bonusCard" | "reward" | "free" | "swap";

// A fixed mix of the four skill colours, like the printed mat
const MAT = [
  [0, 1, 3, 2, 1, 0],
  [3, 2, 0, 1, 3, 2],
  [1, 0, 2, 3, 0, 1],
  [2, 3, 1, 0, 2, 3],
  [0, 1, 3, 2, 1, 0],
  [3, 2, 0, 1, 3, 2],
];

/** One challenge card, face up, drawn like the printed ones. */
function CardFace({ deck, card }: { deck: Deck; card: Card }) {
  return (
    <div className="flex h-full flex-col rounded-[16px] border-[3px] bg-[#FBF8EF] px-[9%] py-[10%] text-center" style={{ borderColor: deck.edge, color: deck.edge }}>
      <p className="text-[clamp(0.9rem,1.5vw,1.05rem)] font-semibold leading-tight">{card.title}</p>
      <p className="my-auto text-[clamp(0.82rem,1.35vw,0.98rem)] font-medium leading-snug">&ldquo;{card.prompt}&rdquo;</p>
      <p className="text-[0.7rem] font-medium">{deck.name}</p>
    </div>
  );
}

/**
 * A playable mini version of the board game: pick a circle, draw a card from
 * that skill's deck, do it to claim the circle. Four circles in a square
 * unlock a bonus round.
 */
export function MatPlay({ heading, intro, decks, players, rewards, logo }: { heading?: string; intro?: string; decks: Deck[]; players: Player[]; rewards: string[]; logo: Img }) {
  const N = MAT.length;
  const [owner, setOwner] = useState<(number | null)[][]>(() => MAT.map((r) => r.map(() => null)));
  const [turn, setTurn] = useState(0);
  const [pending, setPending] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(players.map(() => 0));
  const [phase, setPhase] = useState<Phase>("pick");
  const [drawn, setDrawn] = useState<{ d: number; c: number } | null>(null);
  const [face, setFace] = useState(false);
  const [used, setUsed] = useState(decks.map(() => 0));
  const [squares, setSquares] = useState<string[]>([]);
  const [log, setLog] = useState("Player 1, pick a circle on the mat.");
  const p = players[turn];
  const want = pending ? MAT[pending[0]][pending[1]] : null;

  const nextTurn = () => {
    const t = (turn + 1) % players.length;
    setTurn(t);
    setPhase("pick");
    setPending(null);
    setDrawn(null);
    setFace(false);
    setLog(`${players[t].name}, pick a circle.`);
  };
  // A complete square: any 2×2 block of circles all held by one player
  const newSquare = (g: (number | null)[][], who: number) => {
    for (let r = 0; r < N - 1; r++)
      for (let c = 0; c < N - 1; c++) {
        const key = `${who}:${r}:${c}`;
        if (g[r][c] === who && g[r + 1][c] === who && g[r][c + 1] === who && g[r + 1][c + 1] === who && !squares.includes(key)) return key;
      }
    return null;
  };
  const claim = (r: number, c: number) => {
    const g = owner.map((row) => [...row]);
    g[r][c] = turn;
    setOwner(g);
    setScore((s) => s.map((x, i) => (i === turn ? x + 1 : x)));
    setPending(null);
    setDrawn(null);
    setFace(false);
    const sq = newSquare(g, turn);
    if (sq) {
      setSquares((s) => [...s, sq]);
      setPhase("bonusPick");
      setLog(`A complete square! ${p.name} unlocks a bonus round: draw from any deck.`);
    } else nextTurn();
  };
  const tap = (r: number, c: number) => {
    const o = owner[r][c];
    if (phase === "swap") {
      if (o === null || o === turn) return;
      const g = owner.map((row) => [...row]);
      g[r][c] = turn;
      setOwner(g);
      setScore((s) => s.map((x, i) => (i === turn ? x + 1 : i === o ? x - 1 : x)));
      nextTurn();
      return;
    }
    if (o !== null) return;
    if (phase === "free") {
      claim(r, c);
      return;
    }
    if (phase !== "pick" && phase !== "draw") return;
    setPending([r, c]);
    setPhase("draw");
    setLog(`${p.name}, draw a ${decks[MAT[r][c]].name} card.`);
  };
  const draw = (d: number) => {
    if (phase === "draw" ? d !== want : phase !== "bonusPick") return;
    const c = used[d] % decks[d].cards.length;
    setUsed((u) => u.map((x, i) => (i === d ? x + 1 : x)));
    setDrawn({ d, c });
    setFace(false);
    window.setTimeout(() => setFace(true), 60);
    setPhase(phase === "draw" ? "card" : "bonusCard");
    setLog(phase === "draw" ? `Do it to win it! Then claim the circle.` : `Complete this one for a reward.`);
  };
  const reward = (i: number) => {
    if (i === 0) {
      setScore((s) => s.map((x, k) => (k === turn ? x + 2 : x)));
      nextTurn();
    } else if (i === 1) {
      setPhase("free");
      setDrawn(null);
      setLog(`${p.name}, place your extra token on any free circle.`);
    } else {
      const any = owner.some((row) => row.some((o) => o !== null && o !== turn));
      if (!any) {
        setLog("No opponent tokens to swap yet.");
        nextTurn();
        return;
      }
      setPhase("swap");
      setDrawn(null);
      setLog(`${p.name}, tap an opponent's token to swap it for yours.`);
    }
  };
  const reset = () => {
    setOwner(MAT.map((r) => r.map(() => null)));
    setTurn(0);
    setPending(null);
    setScore(players.map(() => 0));
    setPhase("pick");
    setDrawn(null);
    setFace(false);
    setSquares([]);
    setLog("Player 1, pick a circle on the mat.");
  };
  const live = (d: number) => (phase === "draw" && d === want) || phase === "bonusPick";
  const cur = drawn ? { deck: decks[drawn.d], card: decks[drawn.d].cards[drawn.c] } : null;

  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="grid gap-6 rounded-media border border-line bg-card p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-7">
        {/* the mat */}
        <div className="self-start rounded-[12px] bg-white p-[5%] shadow-[inset_0_0_0_4px_#E38F3E,0_10px_30px_-14px_rgb(26_25_22/.35)]">
          <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }} role="grid" aria-label="Play mat">
            {MAT.map((row, r) =>
              row.map((k, c) => {
                const o = owner[r][c];
                const sel = pending && pending[0] === r && pending[1] === c;
                const can = phase === "swap" ? o !== null && o !== turn : o === null && (phase === "pick" || phase === "draw" || phase === "free");
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    role="gridcell"
                    aria-label={`${decks[k].name} circle${o !== null ? `, held by ${players[o].name}` : ""}`}
                    onClick={() => tap(r, c)}
                    disabled={!can}
                    className="relative aspect-square rounded-full transition-transform duration-200 enabled:hover:scale-110 disabled:cursor-default"
                    style={{ background: decks[k].color, boxShadow: sel ? `0 0 0 3px ${p.color}` : undefined, transform: sel ? "scale(1.1)" : undefined }}
                  >
                    {o !== null && <span key={`${o}`} className="gv-pop absolute inset-[12%] rounded-full shadow-[inset_0_-3px_0_rgb(0_0_0/.25),0_3px_6px_rgb(0_0_0/.25)]" style={{ background: players[o].color }} />}
                  </button>
                );
              }),
            )}
          </div>
          {/* the wordmark sits in its own strip below the circles, as on the printed mat */}
          <div className="mt-4 flex justify-end">
            <span className="relative block aspect-[1148/416] w-[30%]">
              <Image src={logo.src} alt={logo.alt} fill sizes="160px" className="object-contain" />
            </span>
          </div>
        </div>

        {/* turn, decks, card and score */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {players.map((pl, i) => (
              <span
                key={pl.name}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${i === turn ? "border-transparent bg-paper font-semibold" : "border-line"}`}
                style={i === turn ? { boxShadow: `0 0 0 2px ${pl.color}` } : undefined}
              >
                <span className="h-3 w-3 rounded-full" style={{ background: pl.color }} />
                {pl.name}
                <span className="tabular-nums text-ink-mute">{score[i]}</span>
              </span>
            ))}
          </div>
          <p className="mt-4 min-h-[2.8rem] text-[0.95rem] text-ink-soft" aria-live="polite">
            {log}
          </p>

          {/* the four decks, mascot side up so each colour is easy to spot; the one you need lifts */}
          <div className="grid grid-cols-4 gap-3" role="group" aria-label="Challenge decks">
            {decks.map((d, i) => {
              const on = live(i);
              const left = d.cards.length - (used[i] % d.cards.length);
              return (
                <button
                  key={d.name}
                  type="button"
                  disabled={!on}
                  onClick={() => draw(i)}
                  aria-label={`Draw a ${d.name} card`}
                  className="group text-left disabled:cursor-default"
                  style={{ opacity: phase === "pick" || on ? 1 : 0.4, transition: "opacity 300ms" }}
                >
                  <span className={`relative block aspect-[5/7] ${on ? "lv-bob" : ""}`}>
                    {[2, 1].map((k) => (
                      <span key={k} aria-hidden className="absolute inset-0 overflow-hidden rounded-[10px] shadow-sm" style={{ transform: `translate(${k * 3}px, ${k * 3}px) rotate(${k * 1.5}deg)` }}>
                        <Image src={d.front.src} alt="" fill sizes="120px" className="object-cover" />
                      </span>
                    ))}
                    <span className="absolute inset-0 overflow-hidden rounded-[10px] shadow-md transition-transform duration-300 group-enabled:group-hover:-translate-y-1.5" style={{ boxShadow: on ? `0 0 0 3px ${d.edge}, 0 12px 20px -10px rgb(0 0 0/.4)` : undefined }}>
                      <Image src={d.front.src} alt={d.front.alt} fill sizes="120px" className="object-cover" />
                    </span>
                  </span>
                  <span className="mt-2 block text-[0.75rem] leading-tight" style={{ color: d.ink }}>
                    {d.name}
                  </span>
                  <span className="block text-[0.7rem] tabular-nums text-ink-mute">{left} cards</span>
                </button>
              );
            })}
          </div>

          {/* the drawn card flips face up */}
          {cur && (
            <div className="mt-5 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-center gap-4">
              <div className="gv-pop relative mx-auto aspect-[5/7] w-full max-w-[11.5rem] [perspective:900px]">
                <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: face ? "rotateY(180deg)" : "none", transitionTimingFunction: "cubic-bezier(.3,1.3,.5,1)" }}>
                  <div className="absolute inset-0 overflow-hidden rounded-[16px] [backface-visibility:hidden]">
                    <Image src={cur.deck.front.src} alt="" fill sizes="200px" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-live="polite">
                    <CardFace deck={cur.deck} card={cur.card} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {phase === "card" && pending && (
                  <>
                    <button type="button" onClick={() => claim(pending[0], pending[1])} className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ background: p.color }}>
                      Did it! Claim the circle
                    </button>
                    <button type="button" onClick={nextTurn} className="rounded-full border border-line bg-white px-4 py-2 text-sm">
                      Not this time
                    </button>
                  </>
                )}
                {phase === "bonusCard" && (
                  <>
                    <button type="button" onClick={() => (setPhase("reward"), setLog("Choose one reward."))} className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ background: "#E38F3E" }}>
                      Completed it!
                    </button>
                    <button type="button" onClick={nextTurn} className="rounded-full border border-line bg-white px-4 py-2 text-sm">
                      Not this time
                    </button>
                  </>
                )}
                {phase === "reward" && (
                  <div className="gv-pop rounded-[14px] p-4" style={{ background: "#E38F3E", color: "#2b1606" }}>
                    <p className="font-display-soft text-[1.2rem] leading-tight">Bonus round!</p>
                    <p className="mt-1 text-[0.85rem]">Choose one reward:</p>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {rewards.map((rw, i) => (
                        <button key={rw} type="button" onClick={() => reward(i)} className="rounded-[10px] bg-white/35 px-3 py-2 text-left text-sm transition-colors hover:bg-white/55">
                          {rw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.78rem] text-ink-soft">
              {decks.map((d) => (
                <li key={d.name} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </li>
              ))}
            </ul>
            <button type="button" onClick={reset} className="shrink-0 text-sm text-ink-mute underline underline-offset-4 hover:text-ink">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Octalysis ───────────────────────── */

const DRIVES = ["Epic Meaning", "Empowerment", "Social Influence", "Unpredictability", "Avoidance", "Scarcity", "Ownership", "Accomplishment"];

/**
 * The eight Octalysis core drives as an octagon. Pick a drive to read how it
 * shows up; switch between versions of the product, or compare them.
 */
export function Octalysis({ heading, intro, versions }: { heading?: string; intro?: string; versions: { name: string; notes: string[] }[] }) {
  const [drive, setDrive] = useState(0);
  const [v, setV] = useState(0); // versions.length = compare
  const cx = 160;
  const cy = 160;
  const pt = (r: number, i: number) => {
    const a = ((-90 - 22.5 + i * 45) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const wedge = (i: number) => {
    const [a, b, c, d] = [pt(150, i), pt(150, i + 1), pt(78, i + 1), pt(78, i)];
    return `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]} L${d[0]} ${d[1]} Z`;
  };
  const label = (i: number) => {
    const a = ((-90 + i * 45) * Math.PI) / 180;
    return [cx + 114 * Math.cos(a), cy + 114 * Math.sin(a)];
  };
  const compare = v === versions.length;

  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="grid items-center gap-6 rounded-media border border-line bg-card p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-8">
        <svg viewBox="-14 -14 348 348" className="mx-auto w-full max-w-[400px]" role="group" aria-label="Octalysis core drives">
          <defs>
            <linearGradient id="oct-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F4C4C4" />
              <stop offset="1" stopColor="#DA7B7B" />
            </linearGradient>
          </defs>
          {DRIVES.map((d, i) => {
            const on = i === drive;
            const [lx, ly] = label(i);
            return (
              <g
                key={d}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={d}
                onClick={() => setDrive(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setDrive(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setDrive(i))}
                className="cursor-pointer outline-none"
              >
                <path d={wedge(i)} fill={on ? "#C9595B" : "url(#oct-g)"} stroke="#fbf9f4" strokeWidth="2" className="transition-[fill] duration-300" />
                <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={d.length > 12 ? 8.4 : 9.4} fontWeight={on ? 700 : 500} fill={on ? "#fff" : "#4a3535"} style={{ fontFamily: "var(--font-sans)" }}>
                  {d.split(" ").map((w, k, arr) => (
                    <tspan key={w} x={lx} dy={k === 0 ? (arr.length > 1 ? -5 : 0) : 11}>
                      {w}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="62" fill="#fbf9f4" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="16" fontWeight="600" fill="#E27274" style={{ fontFamily: "var(--font-display)" }}>
            leapsters.
          </text>
          <text x={cx} y={cy + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill="#4E6070" style={{ fontFamily: "var(--font-sans)" }}>
            {compare ? "Both" : versions[v].name}
          </text>
        </svg>

        <div>
          <div role="group" aria-label="Version" className="mb-5 inline-flex rounded-full border border-line p-1">
            {[...versions.map((x) => x.name), "Compare"].map((name, i) => (
              <button
                key={name}
                type="button"
                aria-pressed={i === v}
                onClick={() => setV(i)}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${i === v ? "text-paper" : "text-ink-soft hover:text-ink"}`}
                style={i === v ? { background: "var(--accent-ink)" } : undefined}
              >
                {name}
              </button>
            ))}
          </div>
          <div key={`${drive}-${v}`} className="pl-fade" aria-live="polite">
            <p className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
              Core drive {drive + 1} / 8
            </p>
            <p className="mt-1.5 font-display-soft text-[1.6rem] leading-tight">{DRIVES[drive]}</p>
            {compare ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {versions.map((x) => (
                  <div key={x.name} className="rounded-control border border-line p-3">
                    <p className="meta mb-1 text-ink-mute">{x.name}</p>
                    <p className="text-[0.92rem] leading-snug">{x.notes[drive]}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-soft">{versions[v].notes[drive]}</p>
            )}
          </div>
          <div className="mt-6 flex gap-2">
            {[-1, 1].map((d) => (
              <button key={d} type="button" aria-label={d < 0 ? "Previous drive" : "Next drive"} onClick={() => setDrive((x) => (x + d + 8) % 8)} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink/30">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path {...P} d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Phase timeline ───────────────────────── */

/** Overlapping project phases on a numbered scale; pick a phase to read it. */
export function PhaseTimeline({ heading, steps, phases }: { heading?: string; steps: number; phases: { name: string; from: number; to: number; body: string; color: string }[] }) {
  const [on, setOn] = useState(0);
  const x = (n: number) => ((n - 1) / (steps - 1)) * 100;
  const ph = phases[on];
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="rounded-media p-6 md:p-9" style={{ background: "#E38F3E" }}>
        <div className="relative pb-2 pt-8">
          {/* numbered scale */}
          <div className="absolute inset-x-0 top-0 flex justify-between">
            {Array.from({ length: steps }, (_, i) => (
              <span key={i} className={`w-0 text-center font-display-soft text-[0.95rem] tabular-nums transition-colors ${i + 1 >= ph.from && i + 1 <= ph.to ? "text-white" : "text-white/45"}`}>
                <span className="-ml-2 inline-block w-4">{i + 1}</span>
              </span>
            ))}
          </div>
          <div className="space-y-2.5">
            {phases.map((p, i) => (
              <div key={p.name} className="relative h-7">
                <button
                  type="button"
                  aria-pressed={i === on}
                  onClick={() => setOn(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                  className="absolute inset-y-0 rounded-full transition-[transform,box-shadow] duration-300 hover:scale-y-110"
                  style={{ left: `${x(p.from)}%`, width: `${x(p.to) - x(p.from)}%`, minWidth: "1.75rem", background: p.color, boxShadow: i === on ? "0 0 0 3px #fff" : undefined }}
                >
                  <span className="sr-only">{p.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div key={on} className="pl-fade mt-6 text-white" aria-live="polite">
          <p className="meta text-white/75 tabular-nums">
            Steps {ph.from}–{ph.to}
          </p>
          <p className="mt-1 font-display-soft text-[1.5rem] leading-tight">{ph.name}</p>
          <p className="mt-2 max-w-[60ch] text-[0.98rem] leading-relaxed text-white/90">{ph.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Versus ───────────────────────── */

/**
 * Two products side by side, row by row. Focus either side to read it on its
 * own; the rows stay aligned so differences line up.
 */
export function VersusTable({ heading, intro, them, us, rows }: { heading?: string; intro?: string; them: string; us: string; rows: { label: string; them: string; us: string }[] }) {
  const [focus, setFocus] = useState<"them" | "us" | null>(null);
  const [row, setRow] = useState<number | null>(null);
  const dim = (side: "them" | "us") => (focus && focus !== side ? 0.32 : 1);
  return (
    <div>
      {heading && <h3 className="mb-3 font-display-soft text-h3">{heading}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
      <div className="overflow-hidden rounded-media border border-line bg-card">
        <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-line">
          <span />
          {(["them", "us"] as const).map((side) => (
            <button
              key={side}
              type="button"
              aria-pressed={focus === side}
              onClick={() => setFocus((f) => (f === side ? null : side))}
              className="flex items-center gap-2 px-4 py-4 text-left transition-colors md:px-5"
              style={side === "us" ? { background: "color-mix(in oklab, var(--accent) 12%, #fbf9f4)" } : undefined}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: side === "us" ? "var(--accent)" : "#9a9a94" }} />
              <span className="font-display-soft text-[1.15rem]">{side === "us" ? us : them}</span>
            </button>
          ))}
        </div>
        <ul onPointerLeave={() => setRow(null)}>
          {rows.map((r, i) => (
            <li
              key={r.label}
              onPointerEnter={() => setRow(i)}
              className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-line transition-colors last:border-b-0"
              style={{ background: row === i ? "var(--color-paper)" : undefined }}
            >
              <span className="meta px-4 py-4 font-semibold md:px-5" style={{ color: "var(--accent-ink)" }}>
                {r.label}
              </span>
              <span className="px-4 py-4 text-[0.9rem] leading-snug text-ink-soft transition-opacity md:px-5" style={{ opacity: dim("them") }}>
                {r.them}
              </span>
              <span className="px-4 py-4 text-[0.9rem] font-medium leading-snug transition-opacity md:px-5" style={{ opacity: dim("us"), background: "color-mix(in oklab, var(--accent) 6%, transparent)" }}>
                {r.us}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-sm text-ink-mute">Tap a name to read that side on its own.</p>
    </div>
  );
}

/* ───────────────────────── Design thinking lens ───────────────────────── */

/**
 * The design process as the deck draws it: an arrow into Discovery & Define,
 * then Ideate, Design and Test inside a design-thinking lens ringed by its
 * three questions. Pick a stage to read what happened there.
 */
export function DesignLens({ heading, stages, lens, questions }: { heading?: string; stages: { name: string; color: string; ink: string; body: string }[]; lens: string; questions: string[] }) {
  const [on, setOn] = useState(0);
  const xs = [270, 386, 502, 618];
  const cur = stages[on];
  const C = { x: 540, y: 226, r: 160 };
  // arcs on the lens ring for the label (top) and the questions (bottom left → right)
  const arc = (a0: number, a1: number, r = C.r + 14) => {
    const p = (a: number) => [C.x + r * Math.cos((a * Math.PI) / 180), C.y + r * Math.sin((a * Math.PI) / 180)];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 ${a1 > a0 ? 1 : 0} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="rounded-media border border-line bg-card p-4 md:p-6">
        <svg viewBox="0 0 800 430" className="w-full" role="group" aria-label="Design process">
          <defs>
            <path id="dl-top" d={arc(-150, -30)} />
            <path id="dl-q0" d={arc(160, 115, C.r + 26)} />
            <path id="dl-q1" d={arc(110, 70, C.r + 26)} />
            <path id="dl-q2" d={arc(65, 20, C.r + 26)} />
            <marker id="dl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M1 1l8 4-8 4" fill="none" stroke="#3E5262" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <line x1="12" y1="226" x2="206" y2="226" stroke="#3E5262" strokeWidth="3" markerEnd="url(#dl-arrow)" />
          {/* the lens */}
          <circle cx={C.x} cy={C.y} r={C.r} fill="none" stroke="#E38F3E" strokeWidth="4" />
          {[
            [492, 150],
            [568, 180],
            [652, 92],
            [552, 318],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="50" fill="none" stroke="#4E6070" strokeWidth="2" strokeDasharray="10 9" className="dl-drift" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * -3}s` }} />
          ))}
          <text fontSize="17" fill="#4E6070" style={{ fontFamily: "var(--font-display)" }}>
            <textPath href="#dl-top" startOffset="50%" textAnchor="middle">
              {lens}
            </textPath>
          </text>
          {questions.slice(0, 3).map((q, i) => (
            <text key={q} fontSize="13" fill="#4E6070" style={{ fontFamily: "var(--font-sans)" }}>
              <textPath href={`#dl-q${i}`} startOffset="50%" textAnchor="middle">
                {q}
              </textPath>
            </text>
          ))}
          {/* stages */}
          {stages.map((st, i) => {
            const sel = i === on;
            return (
              <g
                key={st.name}
                role="button"
                tabIndex={0}
                aria-pressed={sel}
                aria-label={st.name}
                onClick={() => setOn(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOn(i))}
                className="cursor-pointer outline-none"
              >
                <circle cx={xs[i]} cy="226" r={sel ? 56 : 50} fill={st.color} className="transition-[r] duration-300" style={{ filter: sel ? "drop-shadow(0 10px 16px rgb(0 0 0 / .18))" : undefined }} />
                <text x={xs[i]} y="226" textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="700" fill={st.ink} style={{ fontFamily: "var(--font-sans)" }}>
                  {st.name.split(" & ").map((w, k, arr) => (
                    <tspan key={w} x={xs[i]} dy={k === 0 ? (arr.length > 1 ? -9 : 0) : 19}>
                      {k > 0 ? `& ${w}` : w}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-2 grid items-center gap-4 border-t border-line pt-5 md:grid-cols-[1fr_auto]">
          <div key={on} className="pl-fade" aria-live="polite">
            <p className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
              Stage {on + 1} / {stages.length}
            </p>
            <p className="mt-1 font-display-soft text-[1.4rem] leading-tight">{cur.name}</p>
            <p className="mt-2 max-w-[60ch] text-[0.98rem] leading-relaxed text-ink-soft">{cur.body}</p>
          </div>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button key={d} type="button" aria-label={d < 0 ? "Previous stage" : "Next stage"} onClick={() => setOn((x) => (x + d + stages.length) % stages.length)} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-ink/30">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path {...P} d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** **bold** spans in data strings. */
function B({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-semibold">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/* ───────────────────────── Overlapping source capsules ───────────────────────── */

/** Research sources as overlapping capsules, like the deck; pick one to read it. */
export function SourcePills({ heading, items }: { heading?: string; items: { name: string; body: string; color: string; ink: string }[] }) {
  const [on, setOn] = useState(0);
  const cur = items[on];
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="rounded-media border border-line bg-card px-4 py-8 md:px-8 md:py-10">
        <div className="flex" role="tablist" aria-label="Sources">
          {items.map((x, i) => {
            const sel = i === on;
            return (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={sel}
                onClick={() => setOn(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                className="relative flex h-24 min-w-0 flex-1 items-center rounded-full px-[5%] text-left transition-[transform,opacity] duration-300 md:h-32"
                style={{
                  background: x.color,
                  marginLeft: i ? "-5%" : 0,
                  zIndex: sel ? 10 : items.length - i,
                  transform: sel ? "translateY(-8px)" : "none",
                  opacity: sel ? 1 : 0.82,
                  mixBlendMode: sel ? "normal" : "multiply",
                  boxShadow: sel ? "0 14px 26px -12px rgb(26 25 22 / .35)" : undefined,
                }}
              >
                <span className="pl-[8%] text-[clamp(0.72rem,1.6vw,1.05rem)] font-semibold leading-tight" style={{ color: x.ink }}>
                  {x.name}
                </span>
              </button>
            );
          })}
        </div>
        {/* the reading sits under its capsule */}
        <div className="relative mt-6 min-h-[5.5rem]">
          <div key={on} className="pl-fade max-w-[42ch] md:absolute" style={{ left: `${(on / items.length) * 100}%`, transform: on === items.length - 1 ? "translateX(-35%)" : undefined }} aria-live="polite">
            <span aria-hidden className="mb-2 block h-1 w-10 rounded-full" style={{ background: cur.color }} />
            <p className="text-[0.98rem] leading-relaxed text-ink-soft">{cur.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Factor spectrum ───────────────────────── */

/**
 * Factors as a chain of overlapping circles running from external to internal,
 * as the deck draws it. Slide along the spectrum, or pick a circle.
 */
export function FactorSpectrum({ heading, external, internal, factors }: { heading?: string; external: { title: string; body: string }; internal: { title: string; body: string }; factors: string[] }) {
  const n = factors.length;
  const [pos, setPos] = useState(0);
  const near = Math.round(pos * (n - 1));
  const mix = (t: number) => `color-mix(in oklab, #8FA7B4 ${Math.round((1 - t) * 100)}%, #F2C487)`;
  const x = (i: number) => 110 + (i / (n - 1)) * 580;
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="rounded-media border border-line bg-card p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {[external, internal].map((side, k) => {
            const lit = k === 0 ? pos < 0.5 : pos >= 0.5;
            return (
              <div key={side.title} className={`rounded-control border p-4 transition-[opacity,border-color] duration-300 ${k ? "md:text-right" : ""}`} style={{ opacity: lit ? 1 : 0.5, borderColor: lit ? mix(k) : "var(--color-line)" }}>
                <p className="font-medium" style={{ color: k ? "#B5793A" : "#4E6878" }}>
                  {side.title}
                </p>
                <p className="mt-1 text-[0.9rem] leading-snug text-ink-soft">{side.body}</p>
              </div>
            );
          })}
        </div>
        <svg viewBox="0 0 800 300" className="mt-4 w-full" role="group" aria-label="Factors from external to internal">
          {factors.map((f, i) => {
            const on = i === near;
            // strictly alternate above / below so neighbours never share a side
            const top = i % 2 === 1;
            const words = f.split(" ");
            const cut = words.length > 2 ? Math.ceil(words.length / 2) : words.length;
            const lines = [words.slice(0, cut).join(" "), words.slice(cut).join(" ")].filter(Boolean);
            return (
              <g
                key={f}
                role="button"
                tabIndex={0}
                aria-label={f}
                onClick={() => setPos(i / (n - 1))}
                onPointerEnter={(e) => e.pointerType === "mouse" && setPos(i / (n - 1))}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setPos(i / (n - 1)))}
                className="cursor-pointer outline-none"
              >
                <circle cx={x(i)} cy="150" r={on ? 82 : 72} fill={mix(i / (n - 1))} opacity={on ? 0.95 : 0.7} style={{ mixBlendMode: "multiply", transition: "r 300ms, opacity 300ms" }} />
                <text x={x(i)} y={top ? (lines.length > 1 ? 34 : 52) : 258} textAnchor="middle" fontSize={on ? 16 : 14} fontWeight={on ? 700 : 500} fill={on ? "#1a1916" : "#4E6070"} style={{ fontFamily: "var(--font-sans)", transition: "font-size 200ms" }}>
                  {lines.map((l, k) => (
                    <tspan key={l} x={x(i)} dy={k ? 18 : 0}>
                      {l}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
        <label className="mt-2 block">
          <span className="sr-only">Move along the spectrum from external to internal</span>
          <input
            type="range"
            min={0}
            max={n - 1}
            step={1}
            value={near}
            onChange={(e) => setPos(Number(e.target.value) / (n - 1))}
            className="w-full accent-[#C98F55]"
            style={{ accentColor: mix(pos) }}
          />
        </label>
        <div className="meta mt-1 flex justify-between text-ink-mute">
          <span>External</span>
          <span>Internal</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Gap cards ───────────────────────── */

type GapIcon = "hourglass" | "language" | "device" | "calendar";
// drawn at 40px, so a lighter line than the shared 1.8
const THIN = { ...P, strokeWidth: 1.1 };
const GAP_ICONS: Record<GapIcon, ReactNode> = {
  hourglass: <path {...THIN} d="M7 3.5h10M7 20.5h10M8 3.5c0 5 8 5 8 8.5s-8 3.5-8 8.5M16 3.5c0 5-8 5-8 8.5s8 3.5 8 8.5" />,
  language: (
    <>
      <circle {...THIN} cx="10" cy="10" r="6.5" />
      <path {...THIN} d="M3.5 10h13M10 3.5c2 2 2.5 4.5 2.5 6.5S12 14.5 10 16.5M10 3.5C8 5.5 7.5 8 7.5 10s.5 4.5 2.5 6.5M3 3l16 16" />
      <circle {...THIN} cx="17" cy="17" r="3.5" />
    </>
  ),
  device: <path {...THIN} d="M8.5 9.5h7v11h-7zM10.5 13l3 3m0-3-3 3M8 6.5a6 6 0 0 1 8 0M9.8 8.2a3 3 0 0 1 4.4 0" />,
  calendar: <path {...THIN} d="M3.5 6.5h13v11h-13zM3.5 9.5h13M7 4.5v3m6-3v3M9 12.5a1.2 1.2 0 1 1 1.6 1.1c-.4.2-.6.5-.6.9M10 16v.01M19 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3-1.5V17l1 .8" />,
};

/** Gaps as layered cards: a tinted card with an offset outline that settles on hover. */
export function GapCards({ heading, items }: { heading?: string; items: { body: string; icon: GapIcon; fill: string; line: string; ink: string }[] }) {
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <li key={it.body} tabIndex={0} className="gv-rise group relative min-h-[15rem] pb-3 pr-3 outline-none" style={{ animationDelay: `${i * 90}ms` }}>
            <div className="absolute inset-0 bottom-3 right-3 rounded-[22px] transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]" style={{ background: it.fill }} />
            <div
              className="absolute inset-0 left-3 top-3 rounded-[22px] border-2 transition-transform duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3 group-focus-visible:-translate-x-3 group-focus-visible:-translate-y-3"
              style={{ borderColor: it.line, transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}
            />
            <div className="relative flex h-full flex-col p-6" style={{ color: it.ink }}>
              <svg viewBox="0 0 24 24" className="h-10 w-10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" aria-hidden>
                {GAP_ICONS[it.icon]}
              </svg>
              <p className="mt-auto pt-8 text-[0.95rem] leading-snug">
                <B text={it.body} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Research orbit ───────────────────────── */

/**
 * The research approach as the deck draws it: objective → participants →
 * action along one line through dashed orbits. Hover a group to see its share
 * of everyone; pick a stop to focus it.
 */
export function ResearchOrbit({ heading, objective, groups, actions }: { heading?: string; objective: string; groups: { label: string; value: number; parts?: { label: string; value: number }[] }[]; actions: string[] }) {
  const [focus, setFocus] = useState<number | null>(null);
  const [group, setGroup] = useState<number | null>(null);
  const total = groups.reduce((n, g) => n + g.value, 0);
  const tones = ["#E38F3E", "#C9595B", "#6E9AC5", "#7F8C3A"];
  // one dot per person, coloured by group, lighter for the second part of the group
  const dots = groups.flatMap((g, gi) => {
    const first = g.parts?.[0]?.value ?? g.value;
    return Array.from({ length: g.value }, (_, k) => ({ gi, light: k >= first }));
  });
  const dim = (i: number) => (focus !== null && focus !== i ? 0.35 : 1);
  const stops = ["Objective", "Participants", "Action"];

  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className="relative overflow-hidden rounded-media border border-line p-5 md:p-8" style={{ background: "radial-gradient(70% 90% at 38% 50%, #FBEAD6, #FDF7EE 70%)" }}>
        {/* dashed orbits, as on the slide */}
        {/* true circles, centred on the participants; the panel crops their top and bottom */}
        <span aria-hidden className="pointer-events-none absolute left-[40%] top-1/2 aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4E6070]/45" />
        <span aria-hidden className="pointer-events-none absolute left-[40%] top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4E6070]/45" />

        <div className="relative mb-6 flex flex-wrap gap-2" role="group" aria-label="Focus">
          {stops.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-pressed={focus === i}
              onClick={() => setFocus((f) => (f === i ? null : i))}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${focus === i ? "border-transparent text-white" : "border-[#E38F3E]/40 bg-white/60 hover:bg-white"}`}
              style={focus === i ? { background: "#E38F3E" } : undefined}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: focus === i ? "#fff" : "#E38F3E" }} />
              {s}
            </button>
          ))}
        </div>

        <div className="relative grid items-center gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* objective */}
          <div className="transition-opacity duration-300" style={{ opacity: dim(0) }}>
            <div className="mx-auto flex aspect-square w-full max-w-[18rem] shrink-0 flex-col items-center justify-center rounded-full px-[17%] text-center text-white shadow-[0_20px_40px_-18px_rgb(227_143_62/.7)]" style={{ background: "#E38F3E" }}>
              <div>
                <p className="font-display-soft text-[1.35rem]">Objective</p>
                <p className="mt-2 text-[0.84rem] leading-[1.45] text-white/95">
                  <B text={objective} />
                </p>
              </div>
            </div>
          </div>

          {/* participants */}
          <div className="transition-opacity duration-300" style={{ opacity: dim(1) }} onPointerLeave={() => setGroup(null)}>
            <p className="font-display-soft text-[1.4rem]">Participants</p>
            <div className="mt-3 grid grid-cols-[repeat(21,minmax(0,1fr))] gap-[3px]" aria-hidden>
              {dots.map((d, i) => (
                <span
                  key={i}
                  className="aspect-square rounded-full transition-[opacity,transform] duration-300"
                  style={{
                    background: tones[d.gi % tones.length],
                    opacity: group === null ? (d.light ? 0.5 : 0.9) : group === d.gi ? (d.light ? 0.55 : 1) : 0.12,
                    transform: group === d.gi ? "scale(1.15)" : "none",
                  }}
                />
              ))}
            </div>
            <ul className="mt-4 space-y-1.5">
              {groups.map((g, i) => (
                <li key={g.label}>
                  <button
                    type="button"
                    onPointerEnter={() => setGroup(i)}
                    onFocus={() => setGroup(i)}
                    onClick={() => setGroup((x) => (x === i ? null : i))}
                    className={`flex w-full flex-wrap items-baseline gap-x-2 rounded-md px-2 py-1 text-left text-[0.9rem] transition-colors ${group === i ? "bg-white/70" : ""}`}
                  >
                    <span className="h-2.5 w-2.5 self-center rounded-full" style={{ background: tones[i % tones.length] }} />
                    <span className="font-semibold">
                      {g.label}: {g.value}
                    </span>
                    {g.parts && <span className="text-ink-mute">({g.parts.map((p) => `${p.value} ${p.label}`).join(", ")})</span>}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-semibold">Total participants: {total}</p>
          </div>

          {/* action */}
          <div className="transition-opacity duration-300" style={{ opacity: dim(2) }}>
            <p className="font-display-soft text-[1.4rem]">Action</p>
            <ul className="mt-3 space-y-2">
              {actions.map((a, i) => (
                <li key={a} className="flex items-center gap-2.5 text-[0.95rem]">
                  <span className="h-2 w-2 rounded-full" style={{ background: "#E38F3E", opacity: 1 - i * 0.15 }} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
