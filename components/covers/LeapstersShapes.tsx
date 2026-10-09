"use client";

/**
 * Leapsters hero: the project's three characters (triangle, circle, square),
 * redrawn in SVG from the capstone's visual language and colours.
 *
 * Loop: each shape takes a small hop in turn (squash, stretch, land), then all
 * three leap together: "Take small leaps with confidence."
 * Paused (or reduced motion) they simply stand together, which is the still frame.
 */

const C = {
  bg: "#f18c21",
  tri: "#ebebb0",
  circle: "#f3b8c3",
  square: "#bedbff",
  ink: "#294959",
  dots: ["#bedbff", "#f3b8c3", "#ffd5a8", "#e3e7a5", "#ffffff"],
};

/* Face: two dot eyes and one stroke between them for nose and mouth, drawn
   per shape as in the deck: diagonal (triangle), curved hook (circle),
   stepped (square). */
const NOSE: Record<"tri" | "circle" | "square", string> = {
  tri: "M 8 -14 L -6 22",
  circle: "M -4 -14 L -4 12 Q 18 12 16 26 Q 14 36 2 36",
  square: "M -4 -14 L -4 14 L 12 14 L 12 34 L 0 34",
};

function Face({ x, y, kind }: { x: number; y: number; kind: keyof typeof NOSE }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ls-blink">
        <circle cx={-26} cy={0} r={8} fill={C.ink} />
        <circle cx={26} cy={0} r={8} fill={C.ink} />
      </g>
      <path d={NOSE[kind]} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Legs({ x, color, gap = 52 }: { x: number; color: string; gap?: number }) {
  return (
    <g>
      <rect x={x - gap / 2 - 20} y={-4} width={40} height={62} rx={20} fill={color} />
      <rect x={x + gap / 2 - 20} y={-4} width={40} height={62} rx={20} fill={color} />
    </g>
  );
}

/** One character, positioned with its feet at (0,0). */
function Character({ kind, delay }: { kind: "tri" | "circle" | "square"; delay: number }) {
  const color = C[kind];
  return (
    <g className="ls-char" style={{ animationDelay: `${delay}ms` }}>
      {/* shadow (outside the hopping group so it stays on the ground) */}
      <ellipse className="ls-shadow" cx={0} cy={62} rx={110} ry={14} fill="#000" opacity={0.12} style={{ animationDelay: `${delay}ms` }} />
      <g className="ls-hop" style={{ animationDelay: `${delay}ms` }}>
        <Legs x={0} color={color} />
        {kind === "tri" && (
          <g>
            <path d="M 0 -300 L 128 -6 L -128 -6 Z" fill={color} stroke={color} strokeWidth={36} strokeLinejoin="round" />
            <g className="ls-arm-l" style={{ animationDelay: `${delay}ms` }}>
              <path d="M -78 -150 L -108 -96" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            </g>
            <g className="ls-arm-r" style={{ animationDelay: `${delay}ms` }}>
              <path d="M 78 -150 L 108 -96" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            </g>
            <Face x={0} y={-150} kind="tri" />
          </g>
        )}
        {kind === "circle" && (
          <g>
            <circle cx={0} cy={-128} r={124} fill={color} />
            <g className="ls-arm-l" style={{ animationDelay: `${delay}ms` }}>
              <rect x={-150} y={-160} width={30} height={64} rx={15} fill={color} />
              <path d="M -110 -150 L -110 -104" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            </g>
            <g className="ls-arm-r" style={{ animationDelay: `${delay}ms` }}>
              <rect x={120} y={-160} width={30} height={64} rx={15} fill={color} />
              <path d="M 110 -150 L 110 -104" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            </g>
            <Face x={0} y={-160} kind="circle" />
          </g>
        )}
        {kind === "square" && (
          <g>
            <rect x={-118} y={-236} width={236} height={232} rx={22} fill={color} />
            <g className="ls-arm-l" style={{ animationDelay: `${delay}ms` }}>
              <rect x={-146} y={-150} width={30} height={64} rx={15} fill={color} />
              <path d="M -100 -140 L -100 -92" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            </g>
            <g className="ls-arm-r" style={{ animationDelay: `${delay}ms` }}>
              <rect x={116} y={-150} width={30} height={64} rx={15} fill={color} />
              <path d="M 100 -140 L 100 -92" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            </g>
            <Face x={0} y={-168} kind="square" />
          </g>
        )}
      </g>
    </g>
  );
}

/* A loose field of play-mat dots behind the characters (fixed, deterministic). */
const DOTS = Array.from({ length: 34 }, (_, i) => {
  const col = i % 9;
  const row = Math.floor(i / 9);
  return {
    x: 90 + col * 178 + (row % 2 ? 89 : 0),
    y: 90 + row * 150,
    r: 26 + ((i * 7) % 3) * 6,
    c: C.dots[i % C.dots.length],
  };
});

export function LeapstersShapes({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 1600 1100"
      preserveAspectRatio="xMidYMid slice"
      className="ls-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <rect width="1600" height="1100" fill={C.bg} />
      <g className="ls-dots" opacity={0.55}>
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.7} />
        ))}
      </g>
      {/* ground */}
      <rect x="0" y="880" width="1600" height="220" fill="#e57f17" />
      <g transform="translate(470 880)">
        <Character kind="tri" delay={0} />
      </g>
      <g transform="translate(800 880)">
        <Character kind="circle" delay={260} />
      </g>
      <g transform="translate(1130 880)">
        <Character kind="square" delay={520} />
      </g>
    </svg>
  );
}
