"use client";

/*
 * Leapsters: the capstone deck's own visualisations, rebuilt so they can be
 * explored. One component per slide; data comes from data/projects/leapsters.ts.
 */

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import type { Img } from "@/lib/types";
import { fredoka, poppins } from "./leapsters-font";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const SLATE = "#3E5262";
const CORAL = "#E27272";
const ORANGE = "#F08C21";

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

function Heading({ text, intro }: { text?: string; intro?: string }) {
  return (
    <>
      {text && <h3 className={`font-display-soft text-h3 ${intro ? "mb-3" : "mb-6"}`}>{text}</h3>}
      {intro && <p className="mb-6 max-w-[64ch] text-ink-soft">{intro}</p>}
    </>
  );
}

/** An image filling its (positioned) parent. */
function Fill({ img, sizes, className = "", style }: { img: Img; sizes: string; className?: string; style?: CSSProperties }) {
  return <Image src={img.src} alt={img.alt} fill sizes={sizes} className={`object-cover ${className}`} style={style} />;
}

const press = (fn: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

/* ───────────────────────── Zoomable canvas (mind map, sketch wall) ───────────────────────── */

type Spot = { label: string; x: number; y: number; box?: [number, number, number, number] };

/**
 * A big, dense image you can fly around: pick a spot to zoom to it, drag to
 * pan while zoomed. Spots are % of the image. `picks` marks a subset.
 */
function ZoomCanvas({
  image,
  ratio,
  spots,
  zoom = 2.6,
  pins = true,
  picks,
  pickLabel,
  allLabel,
  chips = "labels",
}: {
  image: Img;
  ratio: number;
  spots: Spot[];
  zoom?: number;
  pins?: boolean;
  picks?: number[];
  pickLabel?: string;
  allLabel?: string;
  chips?: "labels" | "numbers";
}) {
  const [on, setOn] = useState<number | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [onlyPicks, setOnlyPicks] = useState(!!picks?.length); // opens on the shortlist
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const Z = on === null ? 1 : zoom;
  const clamp = (v: number) => Math.min(0, Math.max(1 - Z, v));
  const tx = on === null ? 0 : clamp(0.5 - (spots[on].x / 100) * Z + pan.x);
  const ty = on === null ? 0 : clamp(0.5 - (spots[on].y / 100) * Z + pan.y);
  const go = (i: number | null) => (setOn(i), setPan({ x: 0, y: 0 }));
  const isPick = (i: number) => !!picks?.includes(i);

  useEffect(() => {
    if (on === null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && go(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [on]);

  return (
    <div>
      <div
        ref={box}
        className={`relative overflow-hidden rounded-media border border-line bg-card ${on !== null ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ aspectRatio: ratio, touchAction: on !== null ? "none" : undefined }}
        onPointerDown={(e) => {
          if (on === null) return;
          drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
          setDragging(true);
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          const r = box.current?.getBoundingClientRect();
          if (!d || !r) return;
          setPan({ x: d.px + (e.clientX - d.x) / r.width, y: d.py + (e.clientY - d.y) / r.height });
        }}
        onPointerUp={() => ((drag.current = null), setDragging(false))}
        onPointerCancel={() => ((drag.current = null), setDragging(false))}
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate(${tx * 100}%, ${ty * 100}%) scale(${Z})`,
            transition: dragging ? "none" : "transform 700ms cubic-bezier(.65,0,.35,1)",
          }}
        >
          <Fill img={image} sizes="(min-width: 1440px) 2400px, 160vw" className="!object-contain select-none" />
          {picks && (
            // dim everything except the shortlisted sketches, which keep a coral outline
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500" style={{ opacity: onlyPicks ? 1 : 0 }} aria-hidden>
              <defs>
                <mask id="zc-picks">
                  <rect width="100" height="100" fill="#fff" />
                  {picks.map((i) => spots[i]?.box && <rect key={i} x={spots[i].box![0]} y={spots[i].box![1]} width={spots[i].box![2]} height={spots[i].box![3]} rx="0.8" fill="#000" />)}
                </mask>
              </defs>
              <rect width="100" height="100" fill="var(--color-card)" opacity="0.8" mask="url(#zc-picks)" />
              {picks.map((i) => spots[i]?.box && <rect key={i} x={spots[i].box![0]} y={spots[i].box![1]} width={spots[i].box![2]} height={spots[i].box![3]} rx="0.8" fill="none" stroke={CORAL} strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
            </svg>
          )}
        </div>

        {/* pins live outside the scaled layer so they stay crisp */}
        {pins &&
          spots.map((s, i) => {
            const left = (s.x / 100) * Z + tx;
            const top = (s.y / 100) * Z + ty;
            const lit = on === i || (onlyPicks && isPick(i));
            const hide = onlyPicks && !isPick(i);
            return (
              <button
                key={s.label}
                type="button"
                aria-label={`Zoom to ${s.label}`}
                onClick={() => go(on === i ? null : i)}
                onPointerDown={(e) => e.stopPropagation()}
                className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-semibold text-white shadow-[0_4px_10px_-2px_rgb(0_0_0/.35)] outline-none ring-white focus-visible:ring-2"
                style={{
                  left: `${left * 100}%`,
                  top: `${top * 100}%`,
                  width: lit ? 30 : 22,
                  height: lit ? 30 : 22,
                  fontSize: lit ? 13 : 11,
                  background: lit ? CORAL : SLATE,
                  opacity: hide ? 0 : on !== null && on !== i ? 0.75 : 1,
                  pointerEvents: hide ? "none" : undefined,
                  transition: dragging ? "width 200ms, height 200ms" : "left 700ms cubic-bezier(.65,0,.35,1), top 700ms cubic-bezier(.65,0,.35,1), width 200ms, height 200ms, opacity 300ms, background 200ms",
                }}
              >
                {chips === "numbers" ? s.label.replace(/\D+/g, "") : i + 1}
                {on === null && !onlyPicks && <span aria-hidden className="lv-ping absolute inset-0 rounded-full" style={{ animationDelay: `${(i % 8) * 0.35}s` }} />}
              </button>
            );
          })}

        {on !== null && (
          <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
            <span key={on} className={`pl-fade rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-medium shadow-float`} style={{ color: SLATE }}>
              {spots[on].label}
            </span>
          </div>
        )}
        {on !== null && (
          <button type="button" onClick={() => go(null)} className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm text-paper shadow-float">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path {...P} d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
            Whole view
          </button>
        )}
        {on !== null && <p className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-xs text-paper">Drag to look around · Esc to zoom out</p>}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5" role="group" aria-label="Jump to">
        {picks && (
          <button
            type="button"
            aria-pressed={!onlyPicks}
            onClick={() => (setOnlyPicks((v) => !v), go(null))}
            className="mr-2 flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors"
            style={onlyPicks ? { background: CORAL, borderColor: CORAL, color: "#fff" } : { borderColor: "var(--color-line)" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: onlyPicks ? "#fff" : CORAL }} />
            {onlyPicks ? (allLabel ?? "Show everything") : pickLabel}
          </button>
        )}
        {spots.map((s, i) => {
          const sel = on === i;
          return (
            <button
              key={s.label}
              type="button"
              aria-pressed={sel}
              onClick={() => go(sel ? null : i)}
              className={`rounded-full border text-sm tabular-nums transition-colors ${chips === "numbers" ? "h-8 min-w-8 px-2" : "px-3 py-1.5"} ${sel ? "border-transparent text-white" : "border-line hover:border-ink/30"}`}
              style={sel ? { background: CORAL } : isPick(i) && onlyPicks ? { borderColor: CORAL, color: "#B04848" } : undefined}
            >
              {chips === "numbers" ? s.label.replace(/\D+/g, "") : (
                <>
                  <span className="mr-1.5 text-ink-mute" style={sel ? { color: "#fff" } : undefined}>
                    {i + 1}
                  </span>
                  {s.label}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MindMap({ heading, intro, image, ratio, regions }: { heading?: string; intro?: string; image: Img; ratio: number; regions: Spot[] }) {
  return (
    <div>
      <Heading text={heading} intro={intro} />
      <ZoomCanvas image={image} ratio={ratio} spots={regions} zoom={2.8} />
    </div>
  );
}

export function SketchWall({ heading, intro, image, ratio, concepts, picks, pickLabel, allLabel }: { heading?: string; intro?: string; image: Img; ratio: number; concepts: Spot[]; picks?: number[]; pickLabel?: string; allLabel?: string }) {
  return (
    <div>
      <Heading text={heading} intro={intro} />
      <ZoomCanvas image={image} ratio={ratio} spots={concepts} zoom={3.4} picks={picks?.map((n) => concepts.findIndex((c) => c.label === `Concept ${n}`))} pickLabel={pickLabel} allLabel={allLabel} chips="numbers" />
    </div>
  );
}

/* ───────────────────────── Camera study ───────────────────────── */

// in reading order: two rows of three, then a row of two wide photos
type Shot = { image: Img; label?: string };

/**
 * The camera study as a staggered collage, each behaviour captioned under its
 * photo. Hover a photo (or its caption) and the rest of the room falls back.
 */
export function CameraStudy({ heading, intro, shots }: { heading?: string; intro?: string; shots: Shot[] }) {
  const [on, setOn] = useState<number | null>(null);
  return (
    <div>
      <Heading text={heading} intro={intro} />
      {/* desktop: a staggered collage; captions take real space, so nothing overlaps or leaves the box */}
      <div className="hidden grid-cols-6 gap-x-5 gap-y-6 rounded-media border border-line bg-card p-6 pb-10 md:grid" onPointerLeave={() => setOn(null)}>
        {shots.map((s, i) => {
          const lit = on === i;
          const dim = on !== null && !lit;
          const wide = i >= 6; // the last row holds two wide photos
          const drop = [0, 28, 8, 20, 0, 30, 0, 18][i % 8];
          return (
            <div
              key={s.image.src}
              role="button"
              tabIndex={0}
              aria-label={s.label ?? s.image.alt}
              aria-pressed={lit}
              onPointerEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
              onKeyDown={press(() => setOn(i))}
              className={`relative outline-none ${wide ? "col-span-3" : "col-span-2"}`}
              style={{ marginTop: drop, zIndex: lit ? 20 : 1 }}
            >
              <div
                className={`relative w-full overflow-hidden rounded-[6px] transition-[transform,opacity,filter,box-shadow] duration-500 ${wide ? "aspect-[2.1]" : "aspect-[4/3]"}`}
                style={{
                  transform: lit ? "scale(1.04)" : "none",
                  opacity: dim ? 0.32 : 1,
                  filter: dim ? "blur(1px)" : "none",
                  boxShadow: lit ? "0 24px 40px -18px rgb(26 25 22 / .55)" : "none",
                  transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <Fill img={s.image} sizes={wide ? "50vw" : "34vw"} />
              </div>
              {s.label && (
                <p className="mt-2.5 flex items-start gap-2 text-[0.92rem] leading-snug transition-[color,opacity] duration-300" style={{ color: lit ? "#B04848" : SLATE, opacity: dim ? 0.4 : 1 }}>
                  <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full transition-colors" style={{ background: lit ? CORAL : "#9aa3a8" }} />
                  {s.label}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {/* small screens: a labelled grid */}
      <ul className="grid grid-cols-2 gap-3 md:hidden">
        {shots.map((s) => (
          <li key={s.image.src}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-control">
              <Fill img={s.image} sizes="50vw" />
            </div>
            {s.label && (
              <p className="mt-1.5 text-sm font-medium" style={{ color: SLATE }}>
                {s.label}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Key insights ───────────────────────── */

/** Three insights, each with its pictogram and coloured bar; the bar fills as you read it. */
export function KeyInsights({ heading, items }: { heading?: string; items: { icon: Img; tone: string; body: string }[] }) {
  const [on, setOn] = useState(0);
  return (
    <div>
      <Heading text={heading} />
      <ol className="rounded-media border border-line bg-card p-3 md:p-6" onPointerLeave={undefined}>
        {items.map((it, i) => {
          const lit = on === i;
          return (
            <li key={i}>
              <button
                type="button"
                aria-expanded={lit}
                onClick={() => setOn(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                className="grid w-full grid-cols-[3.5rem_0.6rem_minmax(0,1fr)] items-center gap-4 rounded-control px-2 py-5 text-left transition-colors duration-300 md:grid-cols-[5rem_0.75rem_minmax(0,1fr)] md:gap-8 md:px-4"
                style={{ background: lit ? `color-mix(in oklab, ${it.tone} 22%, transparent)` : "transparent" }}
              >
                <span className="relative block aspect-square w-full transition-transform duration-500" style={{ transform: lit ? "translateY(-3px) scale(1.08)" : "scale(.92)", transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}>
                  <Image src={it.icon.src} alt="" fill sizes="80px" className="object-contain mix-blend-multiply" />
                </span>
                <span className="relative block h-full min-h-[4.5rem] overflow-hidden rounded-full" style={{ background: `color-mix(in oklab, ${it.tone} 35%, transparent)` }}>
                  <span className="absolute inset-x-0 top-0 rounded-full transition-[height] duration-700" style={{ background: it.tone, height: lit ? "100%" : "30%", transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }} />
                </span>
                <span className={`text-[1.02rem] leading-relaxed transition-colors duration-300 md:text-[1.1rem]`} style={{ color: lit ? "#1a1916" : "#6e6a61" }}>
                  <B text={it.body} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ───────────────────────── Affinity board ───────────────────────── */

const NOTE_TONES: Record<string, string> = { grey: "#AFBCCF", blue: "#A8DAFF", green: "#B3EFBC", yellow: "#FFE299", pink: "#FFA8DB" };

/**
 * Every sticky note from the affinity sessions. They start as one unsorted
 * pile and sort themselves into their themes when you reach them; pick a
 * theme to read it, or shuffle them back.
 */
export function AffinityBoard({ heading, intro, clusters }: { heading?: string; intro?: string; clusters: { name: string; notes: { text: string; tone: string }[] }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const reduce = useReducedMotion();
  const [sorted, setSorted] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);
  const [lift, setLift] = useState<string | null>(null);
  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => setSorted(true), reduce ? 0 : 700);
    return () => window.clearTimeout(t);
  }, [seen, reduce]);

  const all = useMemo(() => clusters.flatMap((c, ci) => c.notes.map((n, ni) => ({ ...n, ci, id: `${ci}-${ni}` }))), [clusters]);
  // a fixed shuffle, so server and client agree
  const pile = useMemo(() => [...all].sort((a, b) => hash(a.id) - hash(b.id)), [all]);
  const total = all.length;
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.9 };

  const note = (n: (typeof all)[number], k: number) => {
    const up = lift === n.id;
    const dim = sorted && focus !== null && focus !== n.ci;
    return (
      <motion.li
        key={n.id}
        layoutId={`aff-${n.id}`}
        layout="position"
        transition={{ ...spring, delay: reduce || !sorted ? 0 : (k % 12) * 0.012 }}
        tabIndex={0}
        onPointerEnter={() => setLift(n.id)}
        onPointerLeave={() => setLift(null)}
        onFocus={() => setLift(n.id)}
        onBlur={() => setLift(null)}
        className={`relative aspect-square p-[7%] text-[clamp(0.6rem,0.95vw,0.74rem)] leading-[1.3] text-[#2b2b2b] shadow-[0_2px_4px_rgb(0_0_0/.12)] outline-none transition-[transform,opacity,box-shadow] duration-300`}
        style={{
          background: NOTE_TONES[n.tone] ?? NOTE_TONES.blue,
          transform: up ? "scale(1.55)" : sorted ? "none" : `rotate(${(hash(n.id) % 9) - 4}deg)`,
          zIndex: up ? 30 : 1,
          opacity: dim ? 0.25 : 1,
          boxShadow: up ? "0 18px 30px -10px rgb(0 0 0 / .35)" : undefined,
        }}
      >
        {n.text}
      </motion.li>
    );
  };

  return (
    <div ref={ref}>
      <Heading text={heading} intro={intro} />
      <div className="rounded-media border border-line bg-card p-4 md:p-7">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => (setSorted((s) => !s), setFocus(null))}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-transform active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              {sorted ? <path {...P} d="M4 7h3l10 10h3M4 17h3L17 7h3M17 4l3 3-3 3M17 14l3 3-3 3" /> : <path {...P} d="M4 5h7v6H4zM13 5h7v6h-7zM4 13h7v6H4zM13 13h7v6h-7z" />}
            </svg>
            {sorted ? "Unsort the notes" : "Sort into themes"}
          </button>
          <span className="meta text-ink-mute tabular-nums">
            {total} notes{sorted ? ` · ${clusters.length} themes` : ""}
          </span>
        </div>

        <LayoutGroup>
          {sorted ? (
            <>
              <div className="mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Themes">
                {clusters.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-pressed={focus === i}
                    onClick={() => setFocus(focus === i ? null : i)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${focus === i ? "border-transparent bg-[#5d6670] text-white" : "border-line hover:border-ink/30"}`}
                  >
                    {c.name} <span className="tabular-nums opacity-60">{c.notes.length}</span>
                  </button>
                ))}
              </div>
              <div className="columns-1 gap-6 md:columns-2 [&>section]:mb-6">
                {clusters.map((c, ci) => (
                  <section key={c.name} className="break-inside-avoid transition-opacity duration-300" style={{ opacity: focus === null || focus === ci ? 1 : 0.55 }}>
                    <button type="button" onClick={() => setFocus(focus === ci ? null : ci)} className={`mb-2.5 rounded-md bg-[#E4E4E4] px-3 py-1 text-[0.82rem] text-[#3f3f3f]`}>
                      {c.name}
                    </button>
                    <ul className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-4">{all.filter((n) => n.ci === ci).map(note)}</ul>
                  </section>
                ))}
              </div>
            </>
          ) : (
            <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">{pile.map(note)}</ul>
          )}
        </LayoutGroup>
        <p className="mt-2 text-sm text-ink-mute">Hover a note to read it.</p>
      </div>
    </div>
  );
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) % 1000;
}

/* ───────────────────────── Empathy map ───────────────────────── */

type Quadrant = { name: string; tone: string; notes: string[] };

/**
 * The empathy map around the child: what she thinks and feels, hears, sees,
 * and says and does. Pick a quadrant and its notes come forward.
 */
export function EmpathyMap({ heading, avatar, quadrants, pains, gains }: { heading?: string; avatar: Img; quadrants: [Quadrant, Quadrant, Quadrant, Quadrant]; pains: string[]; gains: string[] }) {
  const [on, setOn] = useState<number | null>(null);
  const [think, hear, see, say] = quadrants;
  const dim = (i: number) => on !== null && on !== i;

  const notes = (q: Quadrant, i: number, cols: string) => (
    <ul className={`grid gap-1.5 ${cols} transition-[opacity,transform] duration-500`} style={{ opacity: dim(i) ? 0.22 : 1, transform: on === i ? "scale(1.04)" : "none" }}>
      {q.notes.map((n) => (
        <li key={n} className={`rounded-[6px] px-2 py-1.5 leading-snug text-[#33424f] transition-[font-size] duration-300`} style={{ background: q.tone, fontSize: on === i ? "0.8rem" : "0.68rem" }}>
          {n}
        </li>
      ))}
    </ul>
  );
  const label = (q: Quadrant, i: number, cls = "") => (
    <button
      type="button"
      aria-pressed={on === i}
      onClick={() => setOn(i)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
      className={`shrink-0 rounded-full px-3 py-1 text-[1.35rem] font-semibold transition-[color,background] duration-300 ${cls}`}
      style={{ color: on === i ? "#fff" : "#5d6c76", background: on === i ? "#5d6c76" : "transparent" }}
    >
      {q.name}
    </button>
  );

  return (
    <div>
      <Heading text={heading} />
      <div className="grid gap-8 rounded-media border border-line bg-card p-5 md:p-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.75fr)]" onPointerLeave={() => setOn(null)}>
        <div className={`space-y-6`}>
          {[
            { t: "Pain", list: pains },
            { t: "Gain", list: gains },
          ].map((g) => (
            <div key={g.t}>
              <p className={`text-[1.5rem] font-semibold`} style={{ color: SLATE }}>
                {g.t}
              </p>
              <ul className="mt-2 space-y-2.5">
                {g.list.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.92rem] leading-snug text-ink-soft">
                    <svg viewBox="0 0 10 10" className="mt-1.5 h-2.5 w-2.5 shrink-0" aria-hidden>
                      <path d="M1 1l8 4-8 4z" fill={g.t === "Pain" ? CORAL : "#7FA650"} />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative">
          {/* the dashed cross, as on the slide */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" aria-hidden>
            <path d="M4 6 L42 44 M96 6 L58 44 M4 94 L42 56 M96 94 L58 56" stroke="#9aa3a8" strokeWidth="0.35" strokeDasharray="2 1.6" vectorEffect="non-scaling-stroke" fill="none" style={{ strokeWidth: 2 }} />
          </svg>
          <div className="relative grid gap-4 md:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)] md:grid-rows-[auto_auto_auto] md:items-center">
            <div className="md:col-span-3 md:mx-auto md:w-[56%]">
              {notes(think, 0, "grid-cols-3")}
              <div className="mt-2 text-center">{label(think, 0)}</div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              {notes(hear, 1, "grid-cols-3 md:flex-1")}
              {label(hear, 1)}
            </div>
            <div className="relative mx-auto grid aspect-square w-36 place-items-center rounded-[28%] border-2 border-dashed border-[#9aa3a8] p-2 md:w-40">
              <div className="relative h-full w-full overflow-hidden rounded-full transition-transform duration-500" style={{ transform: on === null ? "none" : `translate(${on === 1 ? -6 : on === 2 ? 6 : 0}px, ${on === 0 ? -6 : on === 3 ? 6 : 0}px) rotate(${on === 1 ? -6 : on === 2 ? 6 : 0}deg)` }}>
                <Image src={avatar.src} alt={avatar.alt} fill sizes="160px" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
              {label(see, 2)}
              {notes(see, 2, "grid-cols-2 md:flex-1")}
            </div>
            <div className="md:col-span-3 md:mx-auto md:w-[80%]">
              <div className="mb-2 text-center">{label(say, 3)}</div>
              {notes(say, 3, "grid-cols-3 sm:grid-cols-4 md:grid-cols-7")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Opportunity areas ───────────────────────── */

/** Five opportunity circles on one line, sized as on the slide; pick one to bring it forward. */
export function OpportunityCircles({ heading, items }: { heading?: string; items: { title: string; body: string; r: number; place: "inside" | "above" | "below" }[] }) {
  const [on, setOn] = useState<number | null>(null);
  const total = items.reduce((n, x) => n + x.r * 2, 0);
  const W = 1000;
  const k = (W * 0.86) / total;
  const H = Math.max(...items.map((x) => x.r)) * 2 * k + 220;
  const cy = H / 2;
  const start = (W - total * k) / 2;
  const geo = items.map((x, i) => {
    const r = x.r * k;
    const before = items.slice(0, i).reduce((n, y) => n + y.r * 2 * k, 0);
    return { cx: start + before + r, r };
  });

  return (
    <div>
      <Heading text={heading} />
      <div className="rounded-media border border-line bg-card p-4 md:p-8" onPointerLeave={() => setOn(null)}>
        <div className="relative hidden md:block" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {geo.map((g, i) => {
              const lit = on === i;
              const s = lit ? (g.r < 60 ? 1.55 : 1.06) : on !== null ? 0.94 : 1;
              return (
                <circle
                  key={i}
                  cx={g.cx}
                  cy={cy}
                  r={g.r}
                  fill={lit ? "#F2A15A" : "#F6BC86"}
                  style={{ transform: `scale(${s})`, transformOrigin: `${g.cx}px ${cy}px`, transformBox: "view-box", transition: "transform 500ms cubic-bezier(.34,1.56,.64,1), fill 250ms" }}
                />
              );
            })}
            <line x1={geo[0].cx - geo[0].r - 20} y1={cy} x2={geo.at(-1)!.cx + geo.at(-1)!.r + 20} y2={cy} stroke={ORANGE} strokeWidth="2" />
            {geo.map((g, i) => {
              const it = items[i];
              const ty = it.place === "above" ? cy - Math.max(g.r, 40) - 70 : it.place === "below" ? cy + Math.max(g.r, 40) + 50 : cy + g.r * 0.45;
              return (
                <g key={i} style={{ opacity: on === null || on === i ? 1 : 0.35, transition: "opacity 300ms" }}>
                  <circle cx={g.cx} cy={cy} r="4" fill={SLATE} />
                  <line x1={g.cx} y1={cy} x2={g.cx} y2={it.place === "above" ? ty + 18 : ty - 22} stroke={SLATE} strokeWidth="1.2" strokeDasharray="4 4" />
                  <text x={g.cx} y={it.place === "above" ? cy - Math.max(g.r, 30) - 8 : cy + Math.max(g.r, 30) + 28} textAnchor="middle" fontSize="34" fontWeight="600" fill={CORAL}>
                    {it.place === "inside" ? "" : i + 1}
                  </text>
                  {it.place === "inside" && (
                    <text x={i === 0 ? g.cx - g.r - 14 : g.cx + g.r + 14} y={cy + 12} textAnchor={i === 0 ? "end" : "start"} fontSize="34" fontWeight="600" fill={CORAL}>
                      {i + 1}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          {geo.map((g, i) => {
            const it = items[i];
            const lit = on === i;
            const top = it.place === "above" ? cy - Math.max(g.r, 40) - 150 : it.place === "below" ? cy + Math.max(g.r, 40) + 30 : cy + g.r * 0.32;
            return (
              <button
                key={it.title}
                type="button"
                aria-pressed={lit}
                onClick={() => setOn(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                onFocus={() => setOn(i)}
                className={`absolute text-center outline-none transition-[opacity,transform] duration-300 focus-visible:underline`}
                style={{ left: `${(g.cx / W) * 100}%`, top: `${(top / H) * 100}%`, width: `${Math.max(20, ((g.r * 1.5) / W) * 100)}%`, opacity: on === null || lit ? 1 : 0.4, transform: `translateX(-50%) ${lit ? "translateY(-4px)" : ""}` }}
              >
                <span className={`block text-[clamp(0.85rem,1.35vw,1.15rem)] font-semibold leading-tight`} style={{ color: SLATE }}>
                  {it.title}
                </span>
                <span className="mt-1 block text-[clamp(0.72rem,1vw,0.9rem)] leading-snug text-ink-soft">{it.body}</span>
              </button>
            );
          })}
          {/* hit areas over each circle */}
          {geo.map((g, i) => (
            <span
              key={i}
              aria-hidden
              onPointerEnter={() => setOn(i)}
              onClick={() => setOn(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
              style={{ left: `${(g.cx / W) * 100}%`, top: `${(cy / H) * 100}%`, width: `${((g.r * 2) / W) * 100}%`, aspectRatio: "1" }}
            />
          ))}
        </div>
        {/* small screens: the same circles as a list */}
        <ol className="space-y-4 md:hidden">
          {items.map((it, i) => (
            <li key={it.title} className="flex items-start gap-4">
              <span className={`grid shrink-0 place-items-center rounded-full font-semibold text-white`} style={{ background: "#F2A15A", width: `${2 + it.r / 40}rem`, height: `${2 + it.r / 40}rem` }}>
                {i + 1}
              </span>
              <span>
                <span className={`block font-semibold`} style={{ color: SLATE }}>
                  {it.title}
                </span>
                <span className="text-[0.92rem] text-ink-soft">{it.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ───────────────────────── Idea visualisation ───────────────────────── */

/** The idea in one line, held up by three qualities; pick a quality to see what it promises. */
export function IdeaVisual({ heading, statement, focus, pillars, promises }: { heading?: string; statement: string; focus: string[]; pillars: string[]; promises: { pillars: number[]; text: string }[] }) {
  const [on, setOn] = useState(pillars.length - 1);
  const lit = (i: number) => on === i;
  return (
    <div>
      <Heading text={heading} />
      <div className="relative overflow-hidden rounded-media border border-line bg-card p-5 md:p-8">
        <div className="relative grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] md:items-center">
          {/* the statement lives inside its circle, padded so the words clear the curve */}
          <div className="mx-auto grid aspect-square w-full max-w-[19rem] place-items-center rounded-full px-[15%] text-center" style={{ background: "#F6DCC2" }}>
            <p className="text-[clamp(1.05rem,1.7vw,1.35rem)] leading-snug" style={{ color: SLATE }}>
              <B text={statement} />
            </p>
          </div>
          <div>
            <p className={`text-[1rem] font-semibold`} style={{ color: SLATE }}>
              Design focus area
            </p>
            <ul className={`mt-1.5 space-y-1 text-[0.9rem] text-ink-soft`}>
              {focus.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden>·</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex" role="group" aria-label="Qualities">
              {pillars.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={lit(i)}
                  onClick={() => setOn(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                  className={`relative grid aspect-square w-[34%] place-items-center rounded-full border-2 text-[clamp(1rem,1.8vw,1.35rem)] font-semibold tracking-wide transition-[background,color,transform,border-color] duration-500`}
                  style={{
                    marginLeft: i ? "-4%" : 0,
                    zIndex: lit(i) ? 5 : 1,
                    background: lit(i) ? ORANGE : "#F4F2EC",
                    borderColor: lit(i) ? ORANGE : "#D9D6CC",
                    color: lit(i) ? "#fff" : SLATE,
                    transform: lit(i) ? "scale(1.06)" : "scale(1)",
                    transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${pillars.length}, minmax(0,1fr))` }}>
              {promises.map((pr) => {
                const live = pr.pillars.includes(on);
                return (
                  <div key={pr.text} className="transition-opacity duration-300" style={{ gridColumn: `${pr.pillars[0] + 1} / span ${pr.pillars.length}`, opacity: live ? 1 : 0.35 }}>
                    <div className="relative mb-2 h-px" style={{ background: live ? SLATE : "#b9b4a8" }}>
                      <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full" style={{ background: live ? SLATE : "#b9b4a8" }} />
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full" style={{ background: live ? SLATE : "#b9b4a8" }} />
                    </div>
                    <p className={`text-[0.92rem] leading-snug`} style={{ color: live ? SLATE : undefined }}>
                      {pr.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Design framework ───────────────────────── */

type Layer = "outcome" | "context" | "focus" | "game" | "app";

/**
 * The framework's nested shapes: outcome around everything, the context it
 * starts from, the design focus, and the board game holding the app.
 */
export function FrameworkNest({ heading, layers }: { heading?: string; layers: { id: Layer; name: string; note: string }[] }) {
  const [on, setOn] = useState<Layer | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const order: Layer[] = ["outcome", "context", "game", "app", "focus"];
  const fade = (id: Layer) => (on && on !== id ? 0.28 : 1);
  const grow = (i: number): CSSProperties => ({ transform: seen ? "scale(1)" : "scale(.6)", opacity: seen ? undefined : 0, transformBox: "fill-box", transformOrigin: "center", transition: `transform 900ms cubic-bezier(.34,1.4,.64,1) ${i * 140}ms, opacity 600ms ${i * 140}ms` });
  const hit = (id: Layer) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": layers.find((l) => l.id === id)?.name,
    onPointerEnter: () => setOn(id),
    onFocus: () => setOn(id),
    onClick: () => setOn(id),
    onKeyDown: press(() => setOn(id)),
    className: "cursor-pointer outline-none",
  });
  const cur = layers.find((l) => l.id === on);
  return (
    <div ref={ref}>
      <Heading text={heading} />
      <div className="grid items-center gap-6 rounded-media border border-line bg-card p-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:p-8" onPointerLeave={() => setOn(null)}>
        <svg viewBox="0 0 600 540" className={`mx-auto w-full max-w-[520px]`} role="group" aria-label="Design framework">
          <g {...hit("outcome")} style={{ opacity: fade("outcome"), transition: "opacity 300ms" }}>
            <circle cx="300" cy="275" r="245" fill="#506874" style={grow(0)} />
            <text x="300" y="80" textAnchor="middle" fontSize="27" fill="#fff" fontWeight="500">
              Outcome
            </text>
          </g>
          <g {...hit("context")} style={{ opacity: fade("context"), transition: "opacity 300ms" }}>
            <path d="M118 250 C 112 140, 230 92, 330 108 C 420 122, 470 168, 452 270 C 434 360, 360 405, 270 410 C 170 414, 122 340, 118 250 Z" fill="#FBE8E1" style={grow(1)} />
            <text x="200" y="168" fontSize="26" fill={SLATE} fontWeight="500">
              Context
            </text>
          </g>
          <g {...hit("game")} style={{ opacity: fade("game"), transition: "opacity 300ms" }}>
            <circle cx="292" cy="285" r="100" fill={ORANGE} style={grow(2)} />
            <text x="292" y="240" textAnchor="middle" fontSize="25" fill="#fff" fontWeight="500">
              Board Game
            </text>
          </g>
          <g {...hit("app")} style={{ opacity: fade("app"), transition: "opacity 300ms" }}>
            <circle cx="282" cy="316" r="56" fill="#D85A57" style={grow(3)} />
            <text x="282" y="325" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="500">
              App
            </text>
          </g>
          <g {...hit("focus")} style={{ opacity: fade("focus"), transition: "opacity 300ms" }}>
            <path d="M112 368 C 150 330, 230 362, 300 360 C 380 358, 418 300, 440 230 C 452 194, 490 210, 498 260 C 512 360, 440 470, 316 482 C 210 492, 128 440, 112 368 Z" fill="#BFDAF7" style={grow(4)} />
            <text x="330" y="430" textAnchor="middle" fontSize="25" fill={SLATE} fontWeight="500">
              Design Focus
            </text>
          </g>
        </svg>
        <div aria-live="polite">
          <ol className="space-y-1.5">
            {order.map((id, i) => {
              const l = layers.find((x) => x.id === id);
              if (!l) return null;
              const sel = on === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={sel}
                    onClick={() => setOn(id)}
                    onPointerEnter={() => setOn(id)}
                    onFocus={() => setOn(id)}
                    className="w-full rounded-control border px-4 py-3 text-left transition-[background,border-color,opacity] duration-300"
                    style={{ borderColor: sel ? SLATE : "var(--color-line)", background: sel ? "#fff" : "transparent", opacity: on && !sel ? 0.55 : 1 }}
                  >
                    <span className="meta tabular-nums text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`ml-2 text-[1.15rem] font-medium`} style={{ color: SLATE }}>
                      {l.name}
                    </span>
                    <span className={`grid transition-[grid-template-rows] duration-300 ${sel ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <span className={`overflow-hidden text-[0.92rem] leading-snug text-ink-soft`}>
                        <span className="block pt-1.5">{l.note}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {!cur && <p className="mt-3 text-sm text-ink-mute">Hover a shape to read its layer.</p>}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Selection criteria ───────────────────────── */

/** Three criteria as a chain of circles; the arrow swings to whichever one you pick. */
export function CriteriaArrow({ heading, criteria }: { heading?: string; criteria: { name: string; body: string }[] }) {
  const [on, setOn] = useState(1);
  const n = criteria.length;
  const H = 140 * (n - 1) + 180;
  const cy = (i: number) => 90 + i * 140;
  // from the picked circle's left edge, round and back to the list
  const d = `M ${338} ${cy(on)} C 200 ${cy(on)}, 170 ${H / 2}, 30 ${H / 2}`;
  return (
    <div>
      <Heading text={heading} />
      <div className="grid items-center gap-4 rounded-media border border-line bg-card p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-8" onPointerLeave={undefined}>
        <ul className={`relative space-y-3 border-l-2 pl-6`} style={{ borderColor: SLATE }}>
          {criteria.map((c, i) => (
            <li key={c.name}>
              <button
                type="button"
                onClick={() => setOn(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                className="flex w-full items-start gap-3 rounded-control px-3 py-2.5 text-left transition-[background,color] duration-300"
                style={{ background: on === i ? "#fff" : "transparent", color: on === i ? "#1a1916" : "#6e6a61" }}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: on === i ? ORANGE : "#b9b4a8" }} />
                <span className="text-[1.08rem] leading-snug md:text-[1.2rem]">{c.body}</span>
              </button>
            </li>
          ))}
        </ul>
        <svg viewBox={`0 0 520 ${H}`} className={`w-full`} role="group" aria-label="Selection criteria">
          <motion.path d={d} animate={{ d }} transition={{ type: "spring", stiffness: 140, damping: 18 }} fill="none" stroke={ORANGE} strokeWidth="2.5" />
          <path d={`M 52 ${H / 2 - 26} L 30 ${H / 2} L 52 ${H / 2 + 26}`} fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {criteria.map((c, i) => {
            const lit = on === i;
            return (
              <g key={c.name} role="button" tabIndex={0} aria-pressed={lit} aria-label={c.name} onClick={() => setOn(i)} onPointerEnter={() => setOn(i)} onKeyDown={press(() => setOn(i))} className="cursor-pointer outline-none">
                <circle cx="420" cy={cy(i)} r="82" fill={lit ? ORANGE : "#fbf9f4"} stroke={ORANGE} strokeWidth="2.5" style={{ transition: "fill 300ms" }} />
                <text x="420" y={cy(i) + 8} textAnchor="middle" fontSize="24" fontWeight="500" fill={lit ? "#fff" : SLATE} style={{ transition: "fill 300ms" }}>
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ───────────────────────── Selected concepts, scored ───────────────────────── */

type ScoredConcept = { name: string; image: Img; parts: { title: string; lines: string[] }[]; scores: number[] };

/**
 * The shortlist as the deck's cards, each scored Low → High. Rank them by a
 * criterion and they reshuffle; flip a card for what it was meant to do.
 */
export function ConceptScore({ heading, criteria, cards }: { heading?: string; criteria: string[]; cards: ScoredConcept[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const [by, setBy] = useState<number | null>(null);
  const [flip, setFlip] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const ranked = cards.map((c, i) => ({ c, i })).sort((a, b) => (by === null ? a.i - b.i : b.c.scores[by] - a.c.scores[by]));

  return (
    <div ref={ref}>
      <Heading text={heading} />
      <div className="mb-5 flex flex-wrap items-center gap-1.5" role="group" aria-label="Rank by">
        <span className="meta mr-1 text-ink-mute">Rank by</span>
        {[...criteria, "Deck order"].map((c, i) => {
          const v = i === criteria.length ? null : i;
          const sel = by === v;
          return (
            <button key={c} type="button" aria-pressed={sel} onClick={() => setBy(v)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${sel ? "border-transparent bg-[#294A59] text-white" : "border-line hover:border-ink/30"}`}>
              {c}
            </button>
          );
        })}
      </div>
      <ul className="grid gap-5 md:grid-cols-3">
        {ranked.map(({ c, i }, place) => {
          const flipped = flip === i;
          return (
            <motion.li
              key={c.name}
              layout
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 22 }}
              // hover (or focus) turns the card over; a tap does the same on touch
              tabIndex={0}
              aria-label={`${c.name}: hover or tap to see what it does`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setFlip(i)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setFlip(null)}
              onFocus={() => setFlip(i)}
              onBlur={() => setFlip(null)}
              onClick={(e) => e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType !== "mouse" && setFlip(flipped ? null : i)}
              className="relative cursor-pointer outline-none [perspective:1400px] focus-visible:[&>div]:ring-2 focus-visible:[&>div]:ring-[#294A59]"
            >
              {by !== null && place === 0 && (
                <span className={`absolute -top-3 left-5 z-10 rounded-full px-2.5 py-0.5 text-xs font-medium text-white`} style={{ background: CORAL }}>
                  Highest on {criteria[by].toLowerCase()}
                </span>
              )}
              <div className="relative h-full min-h-[25rem] transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: flipped ? "rotateY(180deg)" : "none" }}>
                {/* front */}
                <div className={`absolute inset-0 flex flex-col rounded-[18px] border-[3px] bg-white p-4 [backface-visibility:hidden]`} style={{ borderColor: "#294A59", boxShadow: "6px 6px 0 #c9cfd3" }} aria-hidden={flipped}>
                  <div className="relative aspect-[1.35] w-full overflow-hidden rounded-md">
                    <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-contain" />
                  </div>
                  <p className={`mt-2 text-[1.05rem] font-semibold`} style={{ color: "#294A59" }}>
                    {c.name}
                  </p>
                  <div className="mt-auto space-y-2.5 pt-3" onPointerLeave={() => setHover(null)}>
                    <div className="grid grid-cols-[6.2rem_minmax(0,1fr)] gap-2 text-[0.68rem] text-ink-mute">
                      <span />
                      <span className="flex justify-between">
                        <span>Low</span>
                        <span>High</span>
                      </span>
                    </div>
                    {criteria.map((k, j) => (
                      <div key={k} className="grid grid-cols-[6.2rem_minmax(0,1fr)] items-center gap-2 text-[0.9rem]" onPointerEnter={() => setHover(j)}>
                        <span style={{ fontWeight: by === j || hover === j ? 600 : 400 }}>{k}</span>
                        <span className="relative h-1.5 rounded-full bg-[#CBCBCB]">
                          <span className="absolute inset-y-[-1px] left-0 rounded-full transition-[width] duration-1000" style={{ width: seen ? `${c.scores[j]}%` : "0%", background: by === j ? CORAL : "#294A59", transitionDelay: `${300 + i * 150 + j * 90}ms`, transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* back */}
                <div className={`absolute inset-0 flex flex-col overflow-auto rounded-[18px] border-[3px] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]`} style={{ borderColor: "#294A59", background: "#F4F7F9", boxShadow: "6px 6px 0 #c9cfd3" }} aria-hidden={!flipped}>
                  {c.parts.map((pt) => (
                    <div key={pt.title} className="mb-4">
                      <p className={`text-[1.1rem] font-semibold`} style={{ color: "#294A59" }}>
                        {pt.title}
                      </p>
                      <ul className="mt-1.5 space-y-1.5 text-[0.88rem] leading-snug text-ink-soft">
                        {pt.lines.map((l) => (
                          <li key={l}>
                            <B text={l} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* ───────────────────────── Board game kit ───────────────────────── */

/** What's in the box, on the slide's own layout; pick a part to put a spotlight on it. */
export function BoardKit({ heading, intro, image, ratio, logo, parts }: { heading?: string; intro?: string; image: Img; ratio: number; logo: Img; parts: { name: string; body: string; x: number; y: number; r: number }[] }) {
  const [on, setOn] = useState<number | null>(null);
  const cur = on === null ? null : parts[on];
  return (
    <div>
      <Heading text={heading} intro={intro} />
      <div className="grid overflow-hidden rounded-media border border-line bg-card md:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]" onPointerLeave={() => setOn(null)}>
        <div className="flex flex-col justify-center gap-6 p-6 md:p-8">
          <div>
            <div className="relative aspect-[1148/416] w-[78%] max-w-[18rem]">
              <Image src={logo.src} alt={logo.alt} fill sizes="300px" className="object-contain" />
            </div>
            <p className={`mt-1 text-[1.4rem] font-medium`} style={{ color: SLATE }}>
              Board Game
            </p>
          </div>
          <ul className="space-y-1">
            {parts.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  aria-pressed={on === i}
                  onClick={() => setOn(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
                  onFocus={() => setOn(i)}
                  className="w-full rounded-control px-3 py-2 text-left transition-colors duration-300"
                  style={{ background: on === i ? "#fff" : "transparent" }}
                >
                  <span className={`text-[1.1rem] font-medium`} style={{ color: SLATE }}>
                    {p.name}
                  </span>
                  <span className={`grid transition-[grid-template-rows] duration-300 ${on === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <span className={`overflow-hidden text-[0.88rem] leading-snug text-ink-soft`}>
                      <span className="block pt-1">{p.body}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative" style={{ aspectRatio: ratio }}>
          <Fill img={image} sizes="(min-width: 768px) 60vw, 100vw" className="!object-contain" />
          {/* spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: cur ? 1 : 0,
              background: cur ? `radial-gradient(circle at ${cur.x}% ${cur.y}%, transparent ${cur.r}%, rgb(251 249 244 / .88) ${cur.r + 6}%)` : undefined,
            }}
          />
          {parts.map((p, i) => (
            <button
              key={p.name}
              type="button"
              aria-label={p.name}
              onClick={() => setOn(i)}
              onPointerEnter={() => setOn(i)}
              className="absolute grid h-7 w-7 place-items-center rounded-full text-white shadow-float transition-transform duration-300"
              style={{ left: `${p.x}%`, top: `${p.y}%`, background: on === i ? CORAL : SLATE, transform: `translate(-50%,-50%) scale(${on === i ? 1.15 : 1})` }}
            >
              <span className="text-xs font-semibold">{i + 1}</span>
              {on === null && <span aria-hidden className="lv-ping absolute inset-0 rounded-full" style={{ animationDelay: `${i * 0.4}s` }} />}
            </button>
          ))}
          {cur && (
            <span key={on} className={`pl-fade absolute rounded-full bg-ink px-3 py-1 text-sm text-paper shadow-float`} style={{ left: `${Math.min(cur.x, 78)}%`, top: `${Math.min(cur.y + cur.r * 1.1, 92)}%`, transform: "translateX(-50%)" }}>
              {cur.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── How to play ───────────────────────── */

type PlayStep = { title: string; body: string; fill: string; line: string };

/**
 * The five steps as the deck's offset cards, beside the bonus round. Nothing
 * to unlock: hover a card and it comes forward, the rest stay readable.
 */
export function HowToPlay({ heading, steps, bonus, mascot }: { heading?: string; steps: PlayStep[]; bonus: { title: string; lines: string[]; rewards: string[]; note: string }; mascot: Img }) {
  const [on, setOn] = useState<number | null>(null); // steps.length = the bonus card
  const isBonus = on === steps.length;
  return (
    <div>
      <Heading text={heading} />
      <div className="grid gap-6 rounded-media border border-line bg-card p-5 md:p-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]" onPointerLeave={() => setOn(null)}>
        <ol className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((s, i) => {
            const lit = on === i;
            const dim = on !== null && !lit;
            return (
              <li key={s.title} tabIndex={0} onPointerEnter={() => setOn(i)} onFocus={() => setOn(i)} className="relative block h-full min-h-[11.5rem] pb-2.5 pr-2.5 outline-none">
                <span className="absolute inset-0 bottom-2.5 right-2.5 rounded-[16px] transition-transform duration-500" style={{ background: s.fill, transform: lit ? "translate(-3px,-3px)" : "none" }} />
                <span className="absolute inset-0 left-2.5 top-2.5 rounded-[16px] border-2 transition-transform duration-500" style={{ borderColor: s.line, transform: lit ? "translate(3px,3px)" : "none" }} />
                <span className="relative flex h-full flex-col p-4 transition-opacity duration-300" style={{ opacity: dim ? 0.55 : 1 }}>
                  <span className="text-[0.95rem] font-semibold leading-snug" style={{ color: SLATE }}>
                    {s.title}
                  </span>
                  <span className="mt-2 text-[0.8rem] leading-snug text-[#4a4740]">{s.body}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="relative flex flex-col" onPointerEnter={() => setOn(steps.length)}>
          <div className="relative rounded-[18px] p-6 transition-transform duration-500" style={{ background: ORANGE, color: "#2b1606", transform: isBonus ? "rotate(-1.5deg)" : "none", transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}>
            <p className="text-[1.4rem] font-semibold">{bonus.title}</p>
            <div className="mt-3 space-y-2.5 text-[0.86rem] leading-snug">
              {bonus.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <ul className="list-disc space-y-1 pl-5">
                {bonus.rewards.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p>{bonus.note}</p>
            </div>
          </div>
          <div className={`relative ml-auto mt-3 aspect-[420/315] w-[62%] max-w-[15rem] ${isBonus ? "lv-shout" : ""}`}>
            <Image src={mascot.src} alt={mascot.alt} fill sizes="240px" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Mobile first ───────────────────────── */

/** The app's reveal: Koko on a phone rising out of the coral slide. Koko waves back. */
export function MobileFirst({ heading, intro, phone, koko, logo }: { heading?: string; intro?: string; phone: Img; koko: Img; logo: Img }) {
  const [hi, setHi] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const bubbles = [
    { l: 8, t: 18, s: 7 },
    { l: 22, t: 70, s: 4 },
    { l: 82, t: 12, s: 5 },
    { l: 90, t: 46, s: 2.5 },
    { l: 70, t: 82, s: 3.5 },
    { l: 14, t: 44, s: 2.2 },
    { l: 58, t: 8, s: 2.2 },
  ];
  return (
    <div ref={ref}>
      <Heading text={heading} intro={intro} />
      <div className="relative aspect-[16/10] overflow-hidden rounded-media md:aspect-[16/8]" style={{ background: CORAL }} onPointerEnter={() => setHi(true)} onPointerLeave={() => setHi(false)}>
        {bubbles.map((b, i) => (
          <span key={i} aria-hidden className="lv-float absolute rounded-full bg-white" style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.s}%`, aspectRatio: "1", animationDelay: `${i * -1.3}s`, animationDuration: `${7 + i}s` }} />
        ))}
        <span aria-hidden className="absolute left-1/2 top-[12%] aspect-square w-[46%] rounded-full bg-white transition-transform duration-1000" style={{ transform: `translateX(-50%) scale(${seen ? 1 : 0.4})`, transitionTimingFunction: "cubic-bezier(.34,1.4,.64,1)" }} />
        <div
          className="absolute left-1/2 top-[22%] aspect-[1311/2652] w-[25%] transition-transform duration-[1100ms] md:w-[21%]"
          style={{ transform: `translate(-50%, ${seen ? "0%" : "60%"})`, transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
        >
          <span aria-hidden className="absolute inset-x-[5%] inset-y-[2%] rounded-[14%/7%] bg-white" />
          <Image src={phone.src} alt={phone.alt} fill sizes="300px" className="object-contain" />
          <button type="button" onClick={() => setHi((v) => !v)} aria-label="Say hi to Koko" className="absolute left-1/2 top-[22%] aspect-[215/178] w-[55%] -translate-x-1/2 outline-none">
            <span className={`relative block h-full w-full ${hi ? "lv-hop" : "lv-bob"}`}>
              <Image src={koko.src} alt={koko.alt} fill sizes="160px" className="object-contain" />
            </span>
            <span className={`absolute -right-[38%] -top-[34%] rounded-2xl rounded-bl-none bg-white px-2.5 py-1 text-[clamp(0.7rem,1.2vw,0.95rem)] font-semibold shadow-float transition-[opacity,transform] duration-300`} style={{ color: CORAL, opacity: hi ? 1 : 0, transform: hi ? "scale(1)" : "scale(.6)" }}>
              Hi! I&rsquo;m Koko
            </span>
          </button>
          <div className="absolute left-1/2 top-[52%] aspect-[1148/416] w-[66%] -translate-x-1/2">
            <Image src={logo.src} alt={logo.alt} fill sizes="200px" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Material design ───────────────────────── */

type IconName = "home" | "phrasebook" | "cards" | "insights" | "account";
const NAV_ICONS: Record<IconName, { solid: ReactNode; line: ReactNode }> = {
  home: {
    solid: <path d="M4 10.2 12 4l8 6.2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" fill="currentColor" />,
    line: <path {...P} d="M4 10.2 12 4l8 6.2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2ZM12 13.5v2.2" />,
  },
  phrasebook: {
    solid: <path d="M6 3.5h12a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Zm7.5 0v6l2-1.4 2 1.4v-6" fill="currentColor" fillRule="evenodd" />,
    line: <path {...P} d="M6 3.5h12a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM13.5 3.8v5.4l2-1.4 2 1.4V3.8" />,
  },
  cards: {
    solid: <path d="m4.3 8.6 6.8-2.6a1 1 0 0 1 1.3.6l4.2 11a1 1 0 0 1-.6 1.3L9.2 21.5a1 1 0 0 1-1.3-.6L3.7 9.9a1 1 0 0 1 .6-1.3ZM14 4.5l1.6-1 4.6 8-1 1.6Z" fill="currentColor" />,
    line: <path {...P} d="m4.3 8.6 6.8-2.6a1 1 0 0 1 1.3.6l4.2 11a1 1 0 0 1-.6 1.3L9.2 21.5a1 1 0 0 1-1.3-.6L3.7 9.9a1 1 0 0 1 .6-1.3ZM14.4 4.2l1.4-.8 4.4 7.6-.9 1.5" />,
  },
  insights: {
    solid: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="currentColor" />
        <path d="M7.5 14.5 10.5 11l3 2.5 3-4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    line: <path {...P} d="M8.5 3.5h7a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5v-7a5 5 0 0 1 5-5ZM7.5 14.5 10.5 11l3 2.5 3-4" />,
  },
  account: {
    solid: (
      <>
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4.5 20.5v-1.8A4.7 4.7 0 0 1 9.2 14h5.6a4.7 4.7 0 0 1 4.7 4.7v1.8Z" fill="currentColor" />
      </>
    ),
    line: <path {...P} d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5v-1.8A4.7 4.7 0 0 1 9.2 14h5.6a4.7 4.7 0 0 1 4.7 4.7v1.8Z" />,
  },
};

/**
 * The app's style sheet, live: set the type ramp in either face, try your own
 * words, copy a colour off the arc, and tap through the tab bar's states.
 */
export function StyleSheet({
  heading,
  logo,
  fonts,
  ramp,
  colors,
  tabs,
}: {
  heading?: string;
  logo: Img;
  fonts: { role: string; name: "Fredoka" | "Poppins"; weights: string }[];
  ramp: { label: string; px: number; weight: number }[];
  colors: { hex: string; name: string }[];
  tabs: { label: string; icon: IconName }[];
}) {
  const [face, setFace] = useState<"Fredoka" | "Poppins">("Fredoka");
  const [text, setText] = useState("Memorize vocabulary!");
  const [tab, setTab] = useState(0);
  const [hex, setHex] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fam = face === "Fredoka" ? fredoka.className : poppins.className;
  // the colour arc: four strokes around the wordmark, as on the slide
  const arcs = [
    { from: 200, to: 245 },
    { from: 252, to: 300 },
    { from: 307, to: 360 },
    { from: 7, to: 72 },
  ];
  const pt = (deg: number, r = 92) => [110 + r * Math.cos((deg * Math.PI) / 180), 110 + r * Math.sin((deg * Math.PI) / 180)];
  const arcPath = (a: number, b: number) => {
    const [x1, y1] = pt(a);
    const [x2, y2] = pt(b < a ? b + 360 : b);
    return `M${x1} ${y1} A92 92 0 0 1 ${x2} ${y2}`;
  };
  const copy = (h: string) => {
    navigator.clipboard?.writeText(h).catch(() => {});
    setCopied(h);
    window.setTimeout(() => setCopied((c) => (c === h ? null : c)), 1400);
  };

  return (
    <div>
      <Heading text={heading} />
      <div className="grid overflow-hidden rounded-media border border-line bg-card lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* type */}
        <div className="border-b border-line p-5 md:p-8 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Typeface">
            {fonts.map((f) => (
              <button
                key={f.name}
                type="button"
                aria-pressed={face === f.name}
                onClick={() => setFace(f.name)}
                className="flex items-baseline gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors"
                style={face === f.name ? { background: CORAL, borderColor: CORAL, color: "#fff" } : { borderColor: "var(--color-line)" }}
              >
                <span className="meta opacity-80">{f.role}</span>
                <span className={f.name === "Fredoka" ? fredoka.className : poppins.className}>{f.name}</span>
              </button>
            ))}
          </div>
          <p key={face} className={`pl-fade mt-5 text-[clamp(3rem,7vw,5.2rem)] leading-none ${fam}`} style={{ color: CORAL, fontWeight: face === "Fredoka" ? 700 : 500 }}>
            {face}
          </p>
          <p className="meta mt-2 text-ink-mute">{fonts.find((f) => f.name === face)?.weights}</p>
          <label className="mt-6 block">
            <span className="meta text-ink-mute">Try your own words</span>
            <input value={text} onChange={(e) => setText(e.target.value.slice(0, 40))} className="mt-1.5 w-full rounded-control border border-line bg-white px-3 py-2 text-[0.95rem] outline-none focus:border-ink/40" />
          </label>
          <ul className="mt-5 divide-y divide-line">
            {ramp.map((r) => (
              <li key={r.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-3 py-2.5">
                <span className="meta text-ink-mute">
                  {r.label}
                  <br />
                  {r.px}px
                </span>
                <span className={`truncate leading-tight transition-[font-size] duration-300 ${fam}`} style={{ fontSize: `clamp(${r.px * 0.6}px, ${r.px / 12}vw, ${r.px}px)`, fontWeight: r.weight, color: SLATE }}>
                  {text || " "}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* colour + icons */}
        <div className="flex flex-col gap-8 p-5 md:p-8">
          <div>
            <p className="meta text-ink-mute">Colours · tap to copy</p>
            <div className="relative mx-auto mt-2 w-full max-w-[17rem]">
              <svg viewBox="0 0 220 220" className="w-full" role="group" aria-label="Colours">
                {colors.map((c, i) => {
                  const a = arcs[i % arcs.length];
                  const lit = hex === i;
                  return (
                    <path
                      key={c.hex}
                      d={arcPath(a.from, a.to)}
                      fill="none"
                      stroke={c.hex}
                      strokeWidth={lit ? 15 : 9}
                      strokeLinecap="round"
                      role="button"
                      tabIndex={0}
                      aria-label={`${c.name} ${c.hex}`}
                      onPointerEnter={() => setHex(i)}
                      onPointerLeave={() => setHex(null)}
                      onFocus={() => setHex(i)}
                      onBlur={() => setHex(null)}
                      onClick={() => copy(c.hex)}
                      onKeyDown={press(() => copy(c.hex))}
                      className="cursor-pointer outline-none"
                      style={{ transition: "stroke-width 250ms" }}
                    />
                  );
                })}
              </svg>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                {hex === null ? (
                  <div className="relative aspect-[1148/416] w-[52%]">
                    <Image src={logo.src} alt={logo.alt} fill sizes="160px" className="object-contain mix-blend-multiply" />
                  </div>
                ) : (
                  <div key={hex} className="pl-fade text-center">
                    <span className="mx-auto block h-8 w-8 rounded-full border border-line" style={{ background: colors[hex].hex }} />
                    <span className="mt-1 block text-sm font-medium">{colors[hex].name}</span>
                    <span className="block font-mono text-xs text-ink-mute">{colors[hex].hex.toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
            <p className="h-5 text-center text-sm" style={{ color: "#3c7a3c" }} aria-live="polite">
              {copied ? `Copied ${copied.toUpperCase()}` : ""}
            </p>
          </div>

          <div>
            <p className="meta text-ink-mute">Icons · active and inactive</p>
            <div className="mt-3 rounded-[22px] border border-line bg-white px-2 py-2.5 shadow-[0_8px_24px_-14px_rgb(0_0_0/.3)]">
              <ul className={`grid grid-cols-5 ${poppins.className}`} role="tablist" aria-label="App tabs">
                {tabs.map((t, i) => {
                  const sel = tab === i;
                  return (
                    <li key={t.label}>
                      <button type="button" role="tab" aria-selected={sel} onClick={() => setTab(i)} className="flex w-full flex-col items-center gap-1 py-1 transition-colors" style={{ color: sel ? CORAL : "#ABABAB" }}>
                        <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform duration-300 ${sel ? "-translate-y-0.5 scale-110" : ""}`} aria-hidden>
                          {sel ? NAV_ICONS[t.icon].solid : NAV_ICONS[t.icon].line}
                        </svg>
                        <span className="text-[0.68rem]">{t.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Information architecture ───────────────────────── */

const TAB_ICON: Record<string, IconName> = { Home: "home", Phrasebook: "phrasebook", "Word Card": "cards", Insights: "insights", Account: "account" };

/**
 * The app's map two ways at once: the tree on the left, and the app itself on
 * the right. Pick a branch or tap a tab and both follow.
 */
export function IaTree({ heading, root, branches }: { heading?: string; root: string; branches: { name: string; items: string[] }[] }) {
  const [on, setOn] = useState(0);
  const [screen, setScreen] = useState<number | null>(null);
  const total = branches.reduce((n, b) => n + b.items.length, 0);
  const b = branches[on];
  const pick = (i: number) => (setOn(i), setScreen(null));
  return (
    <div>
      <Heading text={heading} />
      <div className="grid gap-8 rounded-media border border-line bg-card p-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:p-8">
        {/* the tree */}
        <div>
          <p className="meta text-ink-mute tabular-nums">
            {branches.length} tabs · {total} screens
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-sm text-paper">{root}</p>
          <ul className="relative ml-4 mt-1 border-l border-line pl-0">
            {branches.map((br, i) => {
              const sel = on === i;
              return (
                <li key={br.name} className="relative pl-6 pt-3">
                  <span aria-hidden className="absolute left-0 top-[1.55rem] h-px w-5 transition-colors" style={{ background: sel ? "var(--accent-ink)" : "var(--color-line)" }} />
                  <button
                    type="button"
                    aria-pressed={sel}
                    onClick={() => pick(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
                    className="flex items-center gap-2 rounded-control border px-3 py-1.5 text-[0.95rem] transition-[background,border-color,color] duration-200"
                    style={sel ? { borderColor: "var(--accent-ink)", background: "#fff", color: "var(--accent-ink)" } : { borderColor: "var(--color-line)" }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      {sel ? NAV_ICONS[TAB_ICON[br.name] ?? "home"].solid : NAV_ICONS[TAB_ICON[br.name] ?? "home"].line}
                    </svg>
                    {br.name}
                    <span className="tabular-nums text-ink-mute">{br.items.length}</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-400 ${sel ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <ul className="ml-4 overflow-hidden border-l border-dashed border-line">
                      {br.items.map((x, j) => (
                        <li key={x + j} className="relative pl-5 pt-2 first:pt-2.5">
                          <span aria-hidden className="absolute left-0 top-[1.15rem] h-px w-4 border-t border-dashed border-line" />
                          <button type="button" onClick={() => setScreen(j)} className={`text-[0.88rem] transition-colors ${screen === j ? "text-ink underline underline-offset-4" : "text-ink-soft hover:text-ink"}`}>
                            {x}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* the app */}
        <div className="mx-auto w-full max-w-[17rem]">
          <div className="relative flex aspect-[9/17] flex-col overflow-hidden rounded-[2.2rem] border-[7px] border-ink bg-white shadow-float">
            <span aria-hidden className="mx-auto mt-1.5 h-4 w-20 rounded-full bg-ink" />
            <div key={`${on}-${screen}`} className="pl-fade flex-1 overflow-hidden px-4 pt-4">
              <p className="meta text-ink-mute">{screen === null ? root : b.name}</p>
              <p className="mt-0.5 font-display-soft text-[1.35rem] leading-tight">{screen === null ? b.name : b.items[screen]}</p>
              {screen === null ? (
                <ul className="mt-4 space-y-2">
                  {b.items.map((x, j) => (
                    <li key={x + j}>
                      <button type="button" onClick={() => setScreen(j)} className="flex w-full items-center justify-between rounded-control border border-line px-3 py-2.5 text-left text-[0.85rem] hover:border-ink/30">
                        {x}
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ink-mute" aria-hidden>
                          <path {...P} d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <button type="button" onClick={() => setScreen(null)} className="mt-3 text-[0.8rem] text-ink-mute hover:text-ink">
                    ← {b.name}
                  </button>
                  <div aria-hidden className="mt-4 space-y-2">
                    {[78, 92, 64].map((w, k) => (
                      <span key={k} className="block h-2.5 rounded-full bg-paper-deep" style={{ width: `${w}%` }} />
                    ))}
                    <span className="mt-4 block h-20 rounded-control bg-paper" />
                  </div>
                </>
              )}
            </div>
            <ul className="grid grid-cols-5 border-t border-line px-1 py-2" role="tablist" aria-label="App tabs">
              {branches.map((br, i) => {
                const sel = on === i;
                return (
                  <li key={br.name}>
                    <button type="button" role="tab" aria-selected={sel} onClick={() => pick(i)} className="flex w-full flex-col items-center gap-0.5" style={{ color: sel ? CORAL : "#ABABAB" }}>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        {sel ? NAV_ICONS[TAB_ICON[br.name] ?? "home"].solid : NAV_ICONS[TAB_ICON[br.name] ?? "home"].line}
                      </svg>
                      <span className="text-[0.55rem]">{br.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Task flow ───────────────────────── */

/**
 * A task flow as a journey: a rail of moments (steps that happen together
 * share one), and the moment you're on in full. Play it, or step by hand.
 */
export function TaskFlow({ heading, subtitle, columns }: { heading?: string; subtitle?: string; columns: string[][] }) {
  const flat = columns.flatMap((c, ci) => c.map((s, si) => ({ s, ci, si })));
  const [at, setAt] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const cur = flat[at];
  const last = flat.length - 1;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => (at >= last ? setPlaying(false) : setAt((a) => a + 1)), at >= last ? 0 : reduce ? 600 : 1100);
    return () => window.clearTimeout(t);
  }, [playing, at, last, reduce]);

  const first = (ci: number) => flat.findIndex((f) => f.ci === ci);
  const go = (i: number) => (setPlaying(false), setAt(Math.max(0, Math.min(last, i))));

  return (
    <div>
      <Heading text={heading} />
      <div className="rounded-media border border-line bg-card p-5 md:p-8">
        {/* the rail */}
        <ol className="flex items-center gap-1" aria-label="Moments">
          {columns.map((col, ci) => {
            const state = ci < cur.ci ? "past" : ci === cur.ci ? "now" : "next";
            return (
              <li key={ci} className="flex min-w-0 flex-1 flex-col gap-1.5" style={{ flexGrow: col.length }}>
                <button
                  type="button"
                  onClick={() => go(first(ci))}
                  aria-label={`Moment ${ci + 1}: ${col.join(", ")}`}
                  aria-current={state === "now" ? "step" : undefined}
                  className="flex h-3 w-full items-center gap-[3px] rounded-full"
                >
                  {col.map((_, si) => {
                    const idx = first(ci) + si;
                    return (
                      <span
                        key={si}
                        className="h-full flex-1 rounded-full transition-[background,transform] duration-300"
                        style={{ background: idx < at ? "var(--accent-ink)" : idx === at ? CORAL : "var(--color-line)", transform: idx === at ? "scaleY(1.5)" : "none" }}
                      />
                    );
                  })}
                </button>
                <span className={`meta truncate tabular-nums ${state === "now" ? "text-ink" : "text-ink-mute"}`}>{String(ci + 1).padStart(2, "0")}</span>
              </li>
            );
          })}
        </ol>

        {/* the moment you're on */}
        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
          <div key={cur.ci} className="pl-fade rounded-control border border-line bg-white p-5">
            <p className="meta tabular-nums text-ink-mute">
              Moment {cur.ci + 1} / {columns.length}
            </p>
            <ol className="mt-3 space-y-2.5">
              {columns[cur.ci].map((s, si) => {
                const idx = first(cur.ci) + si;
                const done = idx < at;
                const now = idx === at;
                return (
                  <li key={s}>
                    <button type="button" onClick={() => go(idx)} className="flex w-full items-start gap-3 text-left">
                      <span
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.7rem] tabular-nums transition-colors duration-300"
                        style={now ? { background: CORAL, borderColor: CORAL, color: "#fff" } : done ? { background: "var(--accent-ink)", borderColor: "var(--accent-ink)", color: "#fff" } : { borderColor: "var(--color-line)", color: "var(--color-ink-mute)" }}
                      >
                        {done ? (
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                            <path {...P} strokeWidth={2.6} d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        ) : (
                          idx + 1
                        )}
                      </span>
                      <span className={`transition-[color,font-size] duration-300 ${now ? "font-display-soft text-[1.35rem] leading-snug text-ink" : "pt-0.5 text-[1rem] text-ink-soft"}`}>{s}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => (at >= last ? (setAt(0), setPlaying(true)) : setPlaying((v) => !v))}
                className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /> : <path d="M7 4.5v15l12-7.5z" fill="currentColor" />}
                </svg>
                {playing ? "Pause" : at >= last ? "Replay" : at === 0 ? "Play the flow" : "Resume"}
              </button>
              {[-1, 1].map((d) => (
                <button key={d} type="button" aria-label={d < 0 ? "Previous step" : "Next step"} onClick={() => go(at + d)} disabled={d < 0 ? at === 0 : at === last} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink/30 disabled:opacity-40">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path {...P} d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
                  </svg>
                </button>
              ))}
              <span className="meta tabular-nums text-ink-mute" aria-live="polite">
                Step {at + 1} / {flat.length}
              </span>
            </div>
            {/* what comes either side */}
            <ul className="mt-5 space-y-1.5 text-[0.9rem]">
              {columns.map((col, ci) => (
                <li key={ci}>
                  <button type="button" onClick={() => go(first(ci))} className={`flex w-full gap-3 text-left transition-colors ${ci === cur.ci ? "text-ink" : ci < cur.ci ? "text-ink-mute line-through decoration-line" : "text-ink-soft hover:text-ink"}`}>
                    <span className="meta w-6 shrink-0 tabular-nums pt-0.5">{String(ci + 1).padStart(2, "0")}</span>
                    <span>{col.join(" · ")}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {subtitle && <p className="mt-5 text-sm text-ink-mute">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ───────────────────────── Testing collage ───────────────────────── */

/** Children testing the prototypes, laid out as on the slide, with the count running up. */
export function TestingCollage({ heading, count, label, ratio, photos }: { heading?: string; count: number; label: string; ratio: number; photos: { image: Img; x: number; y: number; w: number; h: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);
  const [on, setOn] = useState<number | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!seen) return;
    const t0 = Date.now();
    // a plain timer, not rAF: it still finishes in a throttled or background tab
    const id = window.setInterval(() => {
      const p = reduce ? 1 : Math.min(1, (Date.now() - t0) / 1600);
      setN(Math.round(count * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) window.clearInterval(id);
    }, 30);
    return () => window.clearInterval(id);
  }, [seen, count, reduce]);

  return (
    <div ref={ref}>
      <Heading text={heading} />
      <div className="rounded-media border border-line bg-card p-4 md:p-7">
        <div className="relative hidden md:block" style={{ aspectRatio: ratio }} onPointerLeave={() => setOn(null)}>
          {photos.map((p, i) => {
            const lit = on === i;
            return (
              <div
                key={p.image.src}
                tabIndex={0}
                role="img"
                aria-label={p.image.alt}
                onPointerEnter={() => setOn(i)}
                onFocus={() => setOn(i)}
                onBlur={() => setOn(null)}
                className="absolute overflow-hidden outline-none transition-[transform,opacity,box-shadow] duration-500"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.w}%`,
                  height: `${p.h}%`,
                  zIndex: lit ? 10 : 1,
                  opacity: seen ? (on === null || lit ? 1 : 0.45) : 0,
                  transform: seen ? (lit ? "scale(1.18)" : "none") : "translateY(18px) scale(.96)",
                  boxShadow: lit ? "0 24px 40px -16px rgb(26 25 22 / .5)" : "none",
                  transitionDelay: !seen || on !== null ? "0ms" : `${i * 70}ms`,
                  transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <Fill img={p.image} sizes="30vw" />
              </div>
            );
          })}
        </div>
        <ul className="grid grid-cols-2 gap-2 md:hidden">
          {photos.map((p) => (
            <li key={p.image.src} className="relative aspect-[4/5] overflow-hidden rounded-control">
              <Fill img={p.image} sizes="50vw" />
            </li>
          ))}
        </ul>
        <p className={`mt-5 flex items-baseline justify-end gap-2`} style={{ color: SLATE }}>
          <span className="text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tabular-nums leading-none">{n}</span>
          <span className="text-[1.25rem] font-medium">{label}</span>
        </p>
      </div>
    </div>
  );
}
