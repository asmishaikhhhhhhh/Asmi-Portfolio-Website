import { Needed } from "@/components/ui/Needed";
import { showNeeded } from "@/lib/site";
import { isNeeded, type Project } from "@/lib/types";

/**
 * "What I did / what the team did". Recruiters look for this first on team
 * projects, so it's never buried. When Asmi's contribution isn't documented yet,
 * production shows an honest line instead of guessing.
 */
export function Contribution({ p }: { p: Project }) {
  const { mine, team } = p.contribution;
  const hasMine = !isNeeded(mine) && mine.length > 0;
  const hasTeam = team && !isNeeded(team) && team.length > 0;
  if (!hasMine && !showNeeded && p.team.solo) return null;

  return (
    <section aria-labelledby="contribution" className="rounded-media border border-ink/15 bg-card p-6 md:p-10">
      {!p.team.hidden && (
        <p className="meta text-ink-mute">{p.team.solo ? "Solo project" : `Team project${p.team.collaborators?.length ? ` with ${p.team.collaborators.join(", ")}` : ""}`}</p>
      )}
      <h2 id="contribution" className={`${p.team.hidden ? "" : "mt-2 "}font-display-soft text-h2`}>My contribution</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="meta mb-3 text-forest">What I did</p>
          {hasMine ? (
            <ul className="space-y-2.5">
              {(mine as string[]).map((m) => (
                <li key={m} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                  {m}
                </li>
              ))}
            </ul>
          ) : showNeeded ? (
            <Needed>{isNeeded(mine) ? mine.needed : "Add Asmi's contribution"}</Needed>
          ) : (
            <p className="text-ink-soft">Ask me about my part in this project; I&rsquo;m happy to walk you through it.</p>
          )}
        </div>
        {!p.team.solo && (
          <div>
            <p className="meta mb-3 text-ink-mute">What the team did</p>
            {hasTeam ? (
              <ul className="space-y-2.5 text-ink-soft">
                {(team as string[]).map((m) => <li key={m}>{m}</li>)}
              </ul>
            ) : team && isNeeded(team) ? (
              <Needed>{team.needed}</Needed>
            ) : (
              <p className="text-ink-soft">{p.team.note ?? "A shared effort across research, concept and design."}</p>
            )}
          </div>
        )}
      </div>
      {p.team.note && p.team.solo && <p className="mt-6 text-sm text-ink-mute">{p.team.note}</p>}
    </section>
  );
}
