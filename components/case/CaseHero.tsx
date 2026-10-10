import Link from "next/link";
import { Cover } from "@/components/covers/Cover";
import { showNeeded } from "@/lib/site";
import { isNeeded, type Maybe, type Project } from "@/lib/types";

const initials = (name: string) =>
  name
    .replace(/\./g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** One row of the spec list. Missing facts show a compact flag in dev and are left out in production. */
function Fact({ k, value, children }: { k: string; value?: Maybe<string>; children?: React.ReactNode }) {
  if (value !== undefined && isNeeded(value) && !showNeeded) return null;
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-t border-line py-4 last:border-b">
      <dt className="meta text-ink-mute">{k}</dt>
      <dd className="text-[0.98rem]">
        {children ??
          (value !== undefined && isNeeded(value) ? (
            <span title={value.needed} className="meta inline-block rounded-full border border-dashed border-marigold px-2.5 py-0.5 text-marigold-ink">
              Needed
            </span>
          ) : (
            <span className="font-medium">{value as string}</span>
          ))}
      </dd>
    </div>
  );
}

/**
 * The same opening for every case study: title and promise on the left, a
 * project card with the facts on the right, then the animated cover.
 */
export function CaseHero({ p }: { p: Project }) {
  const team = p.team.hidden ? null : p.team.solo ? [] : (p.team.collaborators ?? []);

  return (
    <header className="container-page pt-28 md:pt-36">
      <nav aria-label="Breadcrumb" className="meta text-ink-mute">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/work" className="hover:text-ink">← All work</Link>
          </li>
          <li aria-hidden className="text-line">/</li>
          <li aria-current="page" className="text-ink-soft">{p.title}</li>
        </ol>
      </nav>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Title and promise */}
        <div className="lg:col-span-7">
          <p className="meta flex items-center gap-2 text-ink-mute">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            {p.kind}
          </p>
          <h1
            className={`mt-4 font-display-soft ${
              // Long names step down so they sit on one or two lines, never three
              p.title.length <= 12
                ? "text-display"
                : p.title.length <= 21
                  ? "text-[clamp(2.75rem,1.9rem+3.6vw,5.25rem)] leading-[1.02]"
                  : "text-[clamp(2.5rem,1.75rem+3vw,4.5rem)] leading-[1.04]"
            }`}
          >
            {p.title}
          </h1>
          <p className="mt-5 font-display-wonk text-h2 italic text-ink-soft md:mt-7">{p.subtitle}</p>
          <p className="mt-8 max-w-[46ch] border-l-2 pl-5 text-intro text-ink-soft" style={{ borderColor: "var(--accent)" }}>
            {p.oneLiner}
          </p>
        </div>

        {/* Project facts: a quiet spec list, no box */}
        <dl aria-label="Project facts" className="lg:col-span-4 lg:col-start-9">
          <Fact k="Role" value={p.role} />
          <Fact k="Duration" value={p.duration} />
          <Fact k="Year" value={p.year} />
          {team !== null && (
            <Fact k="Team">
              {team.length === 0 ? (
                <span className="font-medium">Solo</span>
              ) : (
                <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span aria-hidden className="flex">
                    {["Asmi Shaikh", ...team].map((n, i) => (
                      <span
                        key={n}
                        className={`${i ? "-ml-1.5" : ""} relative flex h-7 w-7 items-center justify-center rounded-full text-[0.62rem] font-semibold ring-2 ring-[var(--page-bg,#f4f0e8)]`}
                        style={{
                          // Asmi's circle sits on top of the stack, then each teammate below the one before
                          zIndex: team.length + 1 - i,
                          ...(i === 0
                            ? { background: "var(--accent-ink)", color: "#fbf9f4" }
                            : { background: "color-mix(in oklab, var(--accent) 18%, #fbf9f4)", color: "var(--accent-ink)" }),
                        }}
                      >
                        {initials(n)}
                      </span>
                    ))}
                  </span>
                  <span className="font-medium">{team.join(", ")}</span>
                </span>
              )}
            </Fact>
          )}
          {p.tools.length > 0 && (
            <Fact k="Tools">
              <span className="font-medium">{p.tools.join(" · ")}</span>
            </Fact>
          )}
        </dl>
      </div>

      <div className="mt-12 md:mt-16">
        <Cover cover={p.cover} label={p.cover.type === "image" ? p.cover.image.alt : p.cover.poster.alt} aspect="16 / 9" transitionName={`cover-${p.slug}`} priority autoplay />
      </div>
      {/* Topic tags, as on the project documents: the first one filled, the rest outlined */}
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
        {p.tags.map((t, i) => (
          <li
            key={t}
            className={`rounded-full border px-4 py-1.5 text-sm ${i === 0 ? "border-transparent font-medium text-paper" : "border-ink/15 text-ink-soft"}`}
            style={i === 0 ? { background: "var(--accent-ink)" } : undefined}
          >
            {t}
          </li>
        ))}
      </ul>
    </header>
  );
}
