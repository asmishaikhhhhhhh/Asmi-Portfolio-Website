/**
 * Small emblems for the "At a glance" cards. Each moves when its card opens
 * (`[data-on="true"]` on the card; transitions live in globals.css under `pm-`).
 */
export type MotifKind = "cap" | "stack" | "rosette" | "page";

export function ProofMotif({ kind, count = 5 }: { kind: MotifKind; count?: number }) {
  return (
    <svg viewBox="0 0 64 64" className={`pm pm-${kind} h-14 w-14 shrink-0 overflow-visible lg:h-16 lg:w-16`} aria-hidden>
      {kind === "cap" && (
        <g className="pm-cap-hat">
          <path d="M18 31v10c0 4 6.5 7 14 7s14-3 14-7V31" fill="#2a2823" />
          <path d="M32 14 61 26 32 38 3 26Z" fill="#1a1916" />
          <path d="M32 14 61 26 32 38 3 26Z" fill="none" stroke="#3a3832" strokeWidth="1" />
          <g className="pm-cap-tassel">
            <path d="M32 26 52 31v13" fill="none" stroke="#e3a23b" strokeWidth="2" strokeLinecap="round" />
            <circle cx="52" cy="46" r="3.2" fill="#e3a23b" />
          </g>
          <circle cx="32" cy="26" r="2.2" fill="#e3a23b" />
        </g>
      )}

      {kind === "stack" &&
        Array.from({ length: count }, (_, i) => {
          const fills = ["#1f4d3a", "#e3a23b", "#fbf9f4", "#1a1916", "#dce6dc"];
          return (
            <rect
              key={i}
              className="pm-stack-card"
              x="14"
              y="10"
              width="36"
              height="46"
              rx="5"
              fill={fills[i % fills.length]}
              stroke="#1a1916"
              strokeWidth="1.5"
              style={{ ["--i" as string]: i - (count - 1) / 2 }}
            />
          );
        })}

      {kind === "rosette" && (
        <>
          <path d="M22 40 14 60l8-3 4 7 6-20" fill="#1f4d3a" />
          <path d="M42 40l8 20-8-3-4 7-6-20" fill="#1f4d3a" />
          <g className="pm-rosette-wheel">
            {Array.from({ length: 16 }, (_, i) => (
              <circle key={i} cx={32 + 20 * Math.cos((i * Math.PI) / 8)} cy={28 + 20 * Math.sin((i * Math.PI) / 8)} r="5" fill="#e3a23b" />
            ))}
            <circle cx="32" cy="28" r="20" fill="#e3a23b" />
            <circle cx="32" cy="28" r="14" fill="#fbf9f4" stroke="#b87a12" strokeWidth="1.5" strokeDasharray="1.5 3" />
            <path d="M32 19.5 34.2 26 40.5 28 34.2 30 32 36.5 29.8 30 23.5 28 29.8 26Z" fill="#1f4d3a" />
          </g>
        </>
      )}

      {kind === "page" && (
        <g className="pm-page-sheet">
          <path d="M14 6h26l12 12v40H14Z" fill="#fbf9f4" stroke="#1a1916" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M40 6v12h12" fill="#ebe5d9" stroke="#1a1916" strokeWidth="1.5" strokeLinejoin="round" />
          {[24, 31, 38, 45].map((y, i) => (
            <path key={y} className="pm-page-line" d={`M20 ${y}h${i === 3 ? 16 : 26}`} stroke="#6e6a61" strokeWidth="2" strokeLinecap="round" pathLength={1} style={{ ["--i" as string]: i }} />
          ))}
          <circle cx="44" cy="50" r="6" fill="#1f4d3a" />
          <path d="m41.5 50 1.8 1.8 3.4-3.6" fill="none" stroke="#fbf9f4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}
