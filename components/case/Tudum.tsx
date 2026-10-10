"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A two-hit "ta-dum" synthesised with the Web Audio API (not Netflix's
 * recording): a short low hit, then a deeper one with a swell. It plays once
 * when the page opens if the browser allows sound; otherwise a small button
 * offers to play it.
 */
function play(ctx: AudioContext) {
  const t0 = ctx.currentTime + 0.05;
  const out = ctx.createGain();
  out.gain.value = 0.55;
  out.connect(ctx.destination);

  // A soft room: a short feedback delay, lowpassed
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.09;
  const fb = ctx.createGain();
  fb.gain.value = 0.35;
  const damp = ctx.createBiquadFilter();
  damp.type = "lowpass";
  damp.frequency.value = 900;
  delay.connect(damp).connect(fb).connect(delay);
  damp.connect(out);

  const hit = (t: number, freq: number, len: number, level: number) => {
    for (const [type, mult, g] of [
      ["sine", 1, 1],
      ["triangle", 2, 0.35],
      ["sine", 3, 0.12],
    ] as const) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(freq * mult * 1.5, t);
      o.frequency.exponentialRampToValueAtTime(freq * mult, t + 0.06);
      const e = ctx.createGain();
      e.gain.setValueAtTime(0.0001, t);
      e.gain.exponentialRampToValueAtTime(level * g, t + 0.012);
      e.gain.exponentialRampToValueAtTime(0.0001, t + len);
      o.connect(e);
      e.connect(out);
      e.connect(delay);
      o.start(t);
      o.stop(t + len + 0.05);
    }
    // the thump: a short burst of filtered noise
    const n = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    n.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 260;
    const ng = ctx.createGain();
    ng.gain.value = level * 0.9;
    n.connect(f).connect(ng).connect(out);
    n.start(t);
  };

  hit(t0, 98, 0.32, 0.9); // "ta"
  hit(t0 + 0.34, 65, 1.6, 1); // "dum"

  // the swell under "dum"
  for (const freq of [130.8, 196, 261.6]) {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = freq;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(200, t0 + 0.34);
    lp.frequency.exponentialRampToValueAtTime(1400, t0 + 1.4);
    const e = ctx.createGain();
    e.gain.setValueAtTime(0.0001, t0 + 0.34);
    e.gain.exponentialRampToValueAtTime(0.05, t0 + 1.2);
    e.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.6);
    o.connect(lp).connect(e).connect(out);
    o.start(t0 + 0.34);
    o.stop(t0 + 2.7);
  }
}

export function Tudum() {
  const [needsTap, setNeedsTap] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (localStorage.getItem("tudum-muted") === "1") return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;
    // Only play right away: if the browser holds sound back, offer a button
    // instead of letting it fire later on some unrelated click.
    let decided = false;
    ctx.resume().then(() => {
      if (decided) return;
      decided = true;
      if (ctx.state === "running") play(ctx);
      else setNeedsTap(true);
    });
    const t = setTimeout(() => {
      if (decided) return;
      decided = true;
      if (ctx.state !== "running") setNeedsTap(true);
    }, 400);
    return () => {
      clearTimeout(t);
      ctx.close();
    };
  }, []);

  if (!needsTap) return null;
  return (
    <div className="fixed bottom-24 left-4 z-40 flex items-center gap-1 rounded-full bg-[#141414] py-1 pl-1 pr-2 text-sm text-white shadow-lg md:bottom-8">
      <button
        type="button"
        onClick={async () => {
          const ctx = ctxRef.current;
          if (!ctx) return;
          await ctx.resume();
          play(ctx);
          setNeedsTap(false);
        }}
        className="flex items-center gap-2 rounded-full bg-[#e50914] px-3.5 py-1.5 font-semibold transition-transform hover:scale-[1.03]"
      >
        <span aria-hidden>♪</span> Tudum
      </button>
      <button
        type="button"
        aria-label="Don't play sound on this page"
        onClick={() => {
          localStorage.setItem("tudum-muted", "1");
          setNeedsTap(false);
        }}
        className="rounded-full px-1.5 py-1 text-white/60 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
