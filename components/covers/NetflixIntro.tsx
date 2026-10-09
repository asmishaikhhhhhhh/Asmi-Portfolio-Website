"use client";

/**
 * Netflix Mobile Web hero, in the spirit of the Netflix intro (viewBox 1280 × 720).
 *
 * Loop (8s): the NETFLIX letters rise in one by one, hold, then step back;
 * the ribbon N builds itself (left stem up, the fold sweeps down, right stem
 * up), the camera dives into the N through a burst of coloured light streaks,
 * and it fades to black before starting again. Paused (or reduced motion) it
 * shows the wordmark. Keyframes live in globals.css under `nf-`.
 */

const IMG = "/images/projects/netflix-mobile/cover/wordmark.webp";
// The wordmark image sits at (300, 250), 680 × 220. Letter columns measured from it.
const LETTERS: [number, number][] = [
  [319, 406], [433, 507], [525, 608], [626, 701], [719, 791], [815, 841], [863, 959],
];

// Ribbon N, scaled from the N mark: stems 79 wide, 400 tall, centred on (640, 360).
const L = { x0: 529.6, x1: 608.8 };
const R = { x0: 671.2, x1: 750.4 };
const TOP = 160;
const leftStem = `M${L.x0} ${TOP}H${L.x1}V552.4Q${(L.x0 + L.x1) / 2} 554 ${L.x0} 560.8Z`;
const rightStem = `M${R.x0} ${TOP}H${R.x1}V560.8Q${(R.x0 + R.x1) / 2} 554 ${R.x0} 552.4Z`;
const fold = `M${L.x0} ${TOP}H${L.x1}L${R.x1} 560.8Q${(R.x0 + R.x1) / 2} 554 ${R.x0} 552.4Z`;

// Light streaks for the dive: fixed so server and client match.
const STREAK_COLORS = ["#e50914", "#ff4d6d", "#7b2ff7", "#2d7ff9", "#00c2ff", "#ffd23f", "#ff7a00", "#b1060f", "#f72585", "#4cc9f0"];
const STREAKS = Array.from({ length: 28 }, (_, i) => {
  const off = (i - 13.5) * 9;
  return { x: 640 + off, w: 3 + ((i * 7) % 5), dx: off * 2.4, color: STREAK_COLORS[(i * 3) % STREAK_COLORS.length], delay: (i % 7) * 30 };
});

export function NetflixIntro({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      className="nf-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        {LETTERS.map(([a, b], i) => (
          <clipPath key={i} id={`nf-l${i}`}>
            <rect x={a - 4} y={240} width={b - a + 8} height={240} />
          </clipPath>
        ))}
        <linearGradient id="nf-shade-l" x1="0" x2="1">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="nf-shade-r" x1="1" x2="0">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="nf-glow">
          <stop offset="0" stopColor="#e50914" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e50914" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1280" height="720" fill="#000" />
      <ellipse className="nf-glow" cx="640" cy="360" rx="520" ry="260" fill="url(#nf-glow)" />

      {/* The wordmark, one clipped copy per letter so each can rise on its own */}
      <g className="nf-word">
        {LETTERS.map((_, i) => (
          <g key={i} clipPath={`url(#nf-l${i})`}>
            <g className="nf-letter" style={{ animationDelay: `${i * 70}ms` }}>
              <image href={IMG} x="300" y="250" width="680" height="220" />
            </g>
          </g>
        ))}
      </g>

      {/* Ribbon N */}
      <g className="nf-n">
        <g className="nf-stem-l">
          <path d={leftStem} fill="#b1060f" />
          <path d={leftStem} fill="url(#nf-shade-l)" />
        </g>
        <g className="nf-stem-r">
          <path d={rightStem} fill="#b1060f" />
          <path d={rightStem} fill="url(#nf-shade-r)" />
        </g>
        <g className="nf-fold">
          <path d={fold} fill="#e50914" />
        </g>
      </g>

      {/* The dive: streaks of light fan out from the N */}
      <g className="nf-streaks">
        {STREAKS.map((s, i) => (
          <rect
            key={i}
            className="nf-streak"
            x={s.x}
            y={140}
            width={s.w}
            height={440}
            fill={s.color}
            style={{ ["--dx" as string]: `${s.dx}px`, animationDelay: `${s.delay}ms` }}
          />
        ))}
      </g>

      <rect className="nf-black" width="1280" height="720" fill="#000" />
    </svg>
  );
}
