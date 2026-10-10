"use client";

import { ClabApp } from "./ClabApp";
import type { Role } from "./data";
import { ClabProvider, JOURNEYS, useClab } from "./store";

const ROLES: { key: Role; label: string; note: string }[] = [
  { key: "student", label: "Student", note: "Companies and professionals on Home, courses, premium portfolios" },
  { key: "professional", label: "Working professional", note: "Students, professionals and companies on Home, team projects" },
  { key: "company", label: "Company", note: "Verification, hosting webinars and competitions, Explore" },
];

function Panel() {
  const { d, a, nav } = useClab();
  const start = (j: (typeof JOURNEYS)[number]) => {
    a.role(j.role);
    if (j.id === "discover") a.tab("home");
    else a.home();
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="meta text-ink-mute">Experience</p>
        <div role="radiogroup" aria-label="Who is using CLAB" className="mt-3 grid gap-2">
          {ROLES.map((r) => {
            const on = d.role === r.key;
            return (
              <button
                key={r.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => a.role(r.key)}
                className={`rounded-media border p-4 text-left transition-colors ${on ? "border-transparent text-paper" : "border-line bg-card hover:border-ink/25"}`}
                style={on ? { background: "var(--accent-ink)" } : undefined}
              >
                <span className="block font-display-soft text-[1.15rem] leading-tight">{r.label}</span>
                <span className={`mt-1 block text-sm ${on ? "text-paper/75" : "text-ink-mute"}`}>{r.note}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="meta text-ink-mute">Try a journey</p>
        <ol className="mt-3 space-y-3">
          {JOURNEYS.map((j, i) => {
            const done = j.steps.filter((s) => (d.done as string[]).includes(s.id)).length;
            const complete = done === j.steps.length;
            return (
              <li key={j.id} className="rounded-media border border-line bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="meta tabular-nums" style={{ color: "var(--accent-ink)" }}>
                      0{i + 1} · {j.role === "student" ? "Student" : j.role === "company" ? "Company" : "Professional"}
                    </p>
                    <p className="mt-1 font-medium">{j.title}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => start(j)}
                    className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-85"
                    style={{ background: "color-mix(in oklab, var(--accent) 14%, #fbf9f4)", color: "var(--accent-ink)" }}
                  >
                    {complete ? "Again" : done ? "Resume" : "Start"}
                  </button>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {j.steps.map((s) => {
                    const ok = (d.done as string[]).includes(s.id);
                    return (
                      <li key={s.id} className={`flex items-center gap-2.5 text-sm ${ok ? "text-ink" : "text-ink-mute"}`}>
                        <span
                          aria-hidden
                          className="grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors"
                          style={ok ? { background: "var(--accent-ink)", borderColor: "var(--accent-ink)" } : { borderColor: "var(--color-line)" }}
                        >
                          {ok && (
                            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 text-paper" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3.5 8.5l3 3 6-7" />
                            </svg>
                          )}
                        </span>
                        {s.label}
                        <span className="sr-only">{ok ? "(done)" : "(to do)"}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={a.home} disabled={nav.tab === "home" && !nav.stack.length} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink/30 disabled:opacity-40">
          Back to Home
        </button>
        <button type="button" onClick={a.reset} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink/30">
          Reset demo data
        </button>
      </div>
      <p className="text-xs leading-relaxed text-ink-mute">
        A coded prototype rebuilt from my high-fidelity screens. Changes are saved in this browser only; payments, registration and messages are simulated.
      </p>
    </div>
  );
}

export function ClabDemo() {
  return (
    <ClabProvider>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_414px] lg:gap-14">
        <div className="order-2 lg:order-1 lg:sticky lg:top-24">
          <Panel />
        </div>
        <div className="order-1 lg:order-2">
          <ClabApp />
        </div>
      </div>
    </ClabProvider>
  );
}
