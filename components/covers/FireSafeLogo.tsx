"use client";

import { poppins } from "@/components/clab/font";

/**
 * Fire Safe hero: the project mark (three interlocking chevrons around a core,
 * traced from the logo artwork) and the wordmark, set as live Poppins Medium
 * text (the logo's typeface) so it stays sharp at any size.
 *
 * Loop: the three chevrons fly in and lock together, the emblem turns a third
 * of a turn like a beacon (it is 3-fold symmetric, so the loop is seamless), a
 * red glow pulses like an alarm light, and the wordmark rises in.
 * Paused (or reduced motion) it shows the finished logo, the still frame.
 */

const RED = "#fa341a";

// Traced outlines (viewBox 1800 × 941). ox/oy = fly-in offset along each piece's direction.
const PIECES: { d: string; ox: number; oy: number }[] = [
  {
    "d": "M912 241 L915 241 L916 378 L909 388 L863 414 L853 415 L744 353 L744 321 L869 394 L879 396 L880 257 Z",
    "ox": -150,
    "oy": -212
  },
  {
    "d": "M1040 331 L1069 347 L940 420 L937 426 L1055 495 L1054 534 L937 469 L929 458 L932 395 Z",
    "ox": 260,
    "oy": 12
  },
  {
    "d": "M848 438 L864 441 L906 466 L912 475 L912 600 L886 616 L885 465 L882 461 L762 529 L730 508 Z",
    "ox": -162,
    "oy": 203
  }
];

export function FireSafeLogo({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 1800 941"
      preserveAspectRatio="xMidYMid slice"
      className="fs-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        <radialGradient id="fs-bg" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#3d3b3a" />
          <stop offset="100%" stopColor="#141414" />
        </radialGradient>
        <radialGradient id="fs-glow-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.55" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1800" height="941" fill="url(#fs-bg)" />
      <circle className="fs-glow" cx="900" cy="428" r="300" fill="url(#fs-glow-fill)" />

      <g className="fs-emblem">
        {PIECES.map((p, i) => (
          <g
            key={i}
            className="fs-piece"
            style={{ ["--ox" as string]: `${p.ox}px`, ["--oy" as string]: `${p.oy}px`, animationDelay: `${i * 140}ms` }}
          >
            {/* Thin matching stroke softens the traced corners */}
            <path d={p.d} fill={RED} stroke={RED} strokeWidth={3} strokeLinejoin="round" />
          </g>
        ))}
      </g>

      {/* Sized to the logo artwork: the wordmark is half the emblem's width, on the same baseline */}
      <text className={`fs-word ${poppins.className}`} x="900" y="779" textAnchor="middle" fontSize="40" fontWeight={500} fill={RED}>
        Fire Safe
      </text>
    </svg>
  );
}
