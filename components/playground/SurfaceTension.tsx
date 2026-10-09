"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * "Haldi on water": the Marangoni effect, kitchen edition.
 *
 * A bowl of water dusted with specks (think pepper). A drop of soap lowers the
 * surface tension where it lands, so the surface pulls away from that spot and
 * drags every speck outward in a ring. Pigment drops bloom and get carried the
 * same way. Everything is a tiny particle simulation on one canvas.
 */

type Pigment = { id: string; label: string; color: string };
const PIGMENTS: Pigment[] = [
  { id: "soap", label: "Soap", color: "transparent" },
  { id: "haldi", label: "Haldi", color: "#e3a23b" },
  { id: "kumkum", label: "Kumkum", color: "#c2412d" },
  { id: "indigo", label: "Indigo", color: "#2f3a7a" },
  { id: "ink", label: "Ink", color: "#1a1916" },
];

type P = { x: number; y: number; vx: number; vy: number; c: string; r: number };
type Pulse = { x: number; y: number; t: number; strength: number };

const SPECKS = 1400;
const MAX_PARTICLES = 6000;

export function SurfaceTension() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parts = useRef<P[]>([]);
  const pulses = useRef<Pulse[]>([]);
  const ripples = useRef<{ x: number; y: number; t: number }[]>([]);
  const size = useRef({ w: 0, h: 0, dpr: 1 });
  const dragging = useRef<{ x: number; y: number } | null>(null);
  const [pigment, setPigment] = useState("soap");
  const pigmentRef = useRef(pigment);
  useEffect(() => {
    pigmentRef.current = pigment;
  }, [pigment]);

  const seed = useCallback(() => {
    const { w, h } = size.current;
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.46;
    const out: P[] = [];
    for (let i = 0; i < SPECKS; i++) {
      const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * R * 0.96;
      out.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, vx: 0, vy: 0, c: Math.random() < 0.85 ? "#2b2a26" : "#6e6a61", r: 0.8 + Math.random() * 1.3 });
    }
    parts.current = out;
    pulses.current = [];
    ripples.current = [];
  }, []);

  const drop = useCallback((x: number, y: number, kind: string, strength = 1) => {
    pulses.current.push({ x, y, t: 0, strength });
    ripples.current.push({ x, y, t: 0 });
    const pg = PIGMENTS.find((p) => p.id === kind);
    if (pg && pg.id !== "soap") {
      // A pigment drop: a little cloud of colour that the flow will carry
      for (let i = 0; i < 260 && parts.current.length < MAX_PARTICLES; i++) {
        const a = Math.random() * Math.PI * 2, d = Math.random() * 10;
        const sp = 0.6 + Math.random() * 2.2;
        parts.current.push({ x: x + Math.cos(a) * d, y: y + Math.sin(a) * d, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, c: pg.color, r: 1.2 + Math.random() * 1.8 });
      }
    }
  }, []);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      const first = size.current.w === 0;
      size.current = { w: r.width, h: r.height, dpr };
      if (first) seed();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    let raf = 0;
    const step = () => {
      const { w, h, dpr } = size.current;
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.46;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Water in a bowl
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.1, cx, cy, R);
      g.addColorStop(0, "#fbf9f4");
      g.addColorStop(1, "#e6dfd1");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#d8d1c4";
      ctx.lineWidth = 10;
      ctx.stroke();

      // Flow: each pulse pushes particles outward, fading over ~1.5s
      const ps = pulses.current;
      for (const p of parts.current) {
        for (const q of ps) {
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy + 60;
          const f = (q.strength * 2600 * Math.max(0, 1 - q.t / 90)) / d2;
          const d = Math.sqrt(d2);
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        // Keep everything inside the bowl
        const ox = p.x - cx, oy = p.y - cy, od = Math.hypot(ox, oy);
        if (od > R - 7) {
          p.x = cx + (ox / od) * (R - 7);
          p.y = cy + (oy / od) * (R - 7);
          p.vx *= -0.2;
          p.vy *= -0.2;
        }
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const q of ps) q.t++;
      pulses.current = ps.filter((q) => q.t < 90);

      // Ripples: thin rings that spread and fade
      for (const r of ripples.current) {
        const k = r.t / 60;
        ctx.strokeStyle = `rgba(26,25,22,${0.25 * (1 - k)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 6 + k * 90, 0, Math.PI * 2);
        ctx.stroke();
        r.t++;
      }
      ripples.current = ripples.current.filter((r) => r.t < 60);

      raf = requestAnimationFrame(step);
    };
    if (reduce) {
      // Reduced motion: still interactive, but run only while there's flow
      const tick = () => {
        step();
        cancelAnimationFrame(raf);
      };
      tick();
      const loop = () => {
        if (pulses.current.length || ripples.current.length) step();
        else cancelAnimationFrame(raf);
      };
      const id = setInterval(loop, 1000 / 30);
      return () => {
        clearInterval(id);
        ro.disconnect();
      };
    }
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [seed]);

  const local = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-8">
        <canvas
          ref={canvas}
          role="img"
          aria-label="A bowl of water dusted with specks. Tap to drop soap or pigment and watch the surface pull them outward."
          className="aspect-square w-full touch-none select-none rounded-media bg-paper-deep"
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            const p = local(e);
            dragging.current = p;
            drop(p.x, p.y, pigmentRef.current);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            const p = local(e);
            const dx = p.x - dragging.current.x, dy = p.y - dragging.current.y;
            if (dx * dx + dy * dy > 900) {
              drop(p.x, p.y, pigmentRef.current, 0.45); // stirring
              dragging.current = p;
            }
          }}
          onPointerUp={() => (dragging.current = null)}
          onPointerCancel={() => (dragging.current = null)}
        />
      </div>

      <div className="lg:col-span-4">
        <p className="meta text-ink-mute">What to drop</p>
        <div role="radiogroup" aria-label="What to drop" className="mt-3 flex flex-wrap gap-2">
          {PIGMENTS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={pigment === p.id}
              onClick={() => setPigment(p.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                pigment === p.id ? "border-ink bg-ink text-paper" : "border-ink/15 bg-card hover:border-ink"
              }`}
            >
              <span
                aria-hidden
                className="h-3 w-3 rounded-full border border-ink/20"
                style={{ background: p.id === "soap" ? "linear-gradient(135deg,#fff,#cfe3f3)" : p.color }}
              />
              {p.label}
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              const { w, h } = size.current;
              drop(w / 2, h / 2, "soap", 1.6);
            }}
            className="rounded-full bg-marigold px-5 py-2.5 text-sm font-medium text-ink"
          >
            Drop soap in the middle
          </button>
          <button type="button" onClick={seed} className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium hover:border-ink">
            Clear the bowl
          </button>
        </div>

        <details className="mt-10 rounded-media border border-line bg-card p-5">
          <summary className="cursor-pointer font-medium">Why does this happen?</summary>
          <ol className="mt-4 space-y-3 text-sm text-ink-soft">
            <li><strong className="text-ink">Surface tension.</strong> Water molecules at the surface hold on to each other, like a stretched skin.</li>
            <li><strong className="text-ink">A weak spot.</strong> Soap (or paint) lowers the tension exactly where it lands.</li>
            <li><strong className="text-ink">Marangoni flow.</strong> The stronger surface around it pulls away, carrying every speck outward.</li>
            <li><strong className="text-ink">Rest.</strong> As the tension evens out, the flow slows and the pattern stays where it stopped.</li>
          </ol>
        </details>
      </div>
    </div>
  );
}
