"use client";

/**
 * Adeiro hero: the brand photo with the ADEIRO wordmark and "Make Them Adore".
 * Loop (7s): the photo drifts in slowly; the letters A·D·E·I·R·O arrive one by
 * one from a soft blur, gathering in from wide spacing; the tagline follows
 * word by word; it holds, then lets go. Paused (or reduced motion) it shows the
 * finished lockup. Keyframes in globals.css under `ad-`.
 */
const P = "/images/projects/adeiro/cover";

// Wordmark (616 × 166) and tagline (616 × 48) cut-outs, scaled to sit exactly
// where they do on the brand-manual photo (960 × 620).
const K = 0.922;
const WORD = { x: 214.5, y: 304.6, w: 616 * K, h: 166 * K };
const TAG = { x: 214.5, y: 471.5, w: 616 * K, h: 48 * K };
// Letter and word slices, in cut-out pixels
const LETTERS: [number, number][] = [[0, 111], [111, 236], [236, 331], [331, 366], [366, 471], [471, 616]];
const WORDS: [number, number][] = [[0, 227], [227, 375], [375, 616]];

export function AdeiroWord({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 960 620"
      preserveAspectRatio="xMidYMid slice"
      className="ad-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        {LETTERS.map(([a, b], i) => (
          <clipPath key={i} id={`ad-l${i}`}>
            <rect x={WORD.x + a * K} y={WORD.y - 20} width={(b - a) * K} height={WORD.h + 40} />
          </clipPath>
        ))}
        {WORDS.map(([a, b], i) => (
          <clipPath key={i} id={`ad-w${i}`}>
            <rect x={TAG.x + a * K} y={TAG.y - 10} width={(b - a) * K} height={TAG.h + 20} />
          </clipPath>
        ))}
      </defs>

      <g className="ad-photo">
        <image href={`${P}/hero-photo.webp`} x="0" y="0" width="960" height="620" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect className="ad-scrim" width="960" height="620" fill="#1a120c" opacity="0.18" />

      {LETTERS.map((_, i) => (
        <g key={i} clipPath={`url(#ad-l${i})`}>
          <g className="ad-letter" style={{ ["--d" as string]: `${(i - 2.5) * 14}px`, animationDelay: `${i * 110}ms` }}>
            <image href={`${P}/wordmark.webp`} x={WORD.x} y={WORD.y} width={WORD.w} height={WORD.h} />
          </g>
        </g>
      ))}
      {WORDS.map((_, i) => (
        <g key={i} clipPath={`url(#ad-w${i})`}>
          <g className="ad-word" style={{ animationDelay: `${900 + i * 220}ms` }}>
            <image href={`${P}/tagline.webp`} x={TAG.x} y={TAG.y} width={TAG.w} height={TAG.h} />
          </g>
        </g>
      ))}
    </svg>
  );
}
