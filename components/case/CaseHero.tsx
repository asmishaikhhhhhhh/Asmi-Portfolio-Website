import Link from "next/link";
import { Cover } from "@/components/covers/Cover";
import { MaybeText } from "@/components/ui/Needed";
import { disciplineLabels } from "@/lib/projects";
import type { Project } from "@/lib/types";

export function CaseHero({ p }: { p: Project }) {
  const facts: { k: string; v: React.ReactNode }[] = [
    { k: "Year", v: <MaybeText value={p.year} fallback="—" /> },
    { k: "Role", v: <MaybeText value={p.role} fallback="Designer" /> },
    { k: "Duration", v: <MaybeText value={p.duration} fallback="—" /> },
  ];
  if (!p.team.hidden)
    facts.push({ k: "Team", v: p.team.solo ? "Solo" : p.team.collaborators?.length ? `With ${p.team.collaborators.join(", ")}` : "Team project" });
  if (p.tools.length) facts.push({ k: "Tools", v: p.tools.join(", ") });

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

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="meta flex items-center gap-2 text-ink-mute">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            {p.kind}
          </p>
          <h1 className="mt-4 font-display-soft text-display">{p.title}</h1>
          <p className="mt-4 font-display-wonk text-h2 italic text-ink-soft">{p.subtitle}</p>
        </div>
        <p className="text-lede text-ink-soft md:col-span-4 md:pb-3">{p.oneLiner}</p>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 md:grid-cols-5">
        {facts.map((f) => (
          <div key={f.k}>
            <dt className="meta text-ink-mute">{f.k}</dt>
            <dd className="mt-1.5 text-[0.95rem] font-medium">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <Cover cover={p.cover} label={p.cover.type === "image" ? p.cover.image.alt : p.cover.poster.alt} aspect="16 / 9" transitionName={`cover-${p.slug}`} priority autoplay />
      </div>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Disciplines and topics">
        {p.disciplines.map((d) => (
          <li key={d} className="rounded-tag border border-ink/20 px-2 py-1 text-xs font-medium">{disciplineLabels[d]}</li>
        ))}
        {p.tags.map((t) => (
          <li key={t} className="rounded-tag bg-paper-deep px-2 py-1 text-xs text-ink-soft">{t}</li>
        ))}
      </ul>
    </header>
  );
}
