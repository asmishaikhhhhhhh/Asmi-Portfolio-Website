import { projects } from "@/data/projects";
import type { Discipline, Project, ThinkingNode, Tier } from "@/lib/types";
import { readableOn } from "@/lib/color";

const tierRank: Record<Tier, number> = { flagship: 0, focused: 1, playground: 2 };

/** All projects in display order: flagship → focused → playground, then `order`. */
export const allProjects: Project[] = [...projects].sort(
  (a, b) => tierRank[a.tier] - tierRank[b.tier] || a.order - b.order,
);

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);

/** Projects that have their own case-study page. */
export const pagedProjects = allProjects.filter((p) => !p.externalOnly);

/** Where a link to this project should go. */
export function projectHref(p: Project): { href: string; external: boolean } {
  if (p.externalOnly && p.links?.external) return { href: p.links.external.href, external: true };
  return { href: `/work/${p.slug}`, external: false };
}

export const byTier = (tier: Tier) => allProjects.filter((p) => p.tier === tier);

/** Next project in reading order, wrapping around. */
export function nextProject(slug: string): Project {
  const i = pagedProjects.findIndex((p) => p.slug === slug);
  return pagedProjects[(i + 1) % pagedProjects.length];
}

export const disciplineLabels: Record<Discipline, string> = {
  research: "Research",
  "ux-ui": "UX/UI",
  systems: "Systems & Service",
  "physical-brand": "Conceptualisation & Prototyping",
};

/** Filters with counts; filters with no projects are dropped. */
export function workFilters() {
  const counts = new Map<Discipline, number>();
  for (const p of allProjects) for (const d of p.disciplines) counts.set(d, (counts.get(d) ?? 0) + 1);
  return (Object.keys(disciplineLabels) as Discipline[])
    .filter((d) => (counts.get(d) ?? 0) > 0)
    .map((d) => ({ id: d, label: disciplineLabels[d], count: counts.get(d)! }));
}

/** Projects that demonstrate every selected way of thinking. */
export function projectsForThinking(nodes: ThinkingNode[]) {
  if (nodes.length === 0) return [];
  return allProjects.filter((p) => nodes.every((n) => p.thinking.includes(n)));
}

/** Plain-object summaries safe to pass into client components. */
export function projectSummaries() {
  return allProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    oneLiner: p.oneLiner,
    tier: p.tier,
    kind: p.kind,
    year: typeof p.year === "string" ? p.year : undefined,
    disciplines: p.disciplines,
    thinking: p.thinking,
    accent: p.accent,
    /** Accent darkened to pass 4.5:1 on paper, for text. */
    accentInk: readableOn(p.accent, "#f4f0e8"),
    cover: p.cover,
    proofPoint: p.proofPoint,
    collaborative: !p.team.solo,
    ...projectHref(p),
  }));
}
export type ProjectSummary = ReturnType<typeof projectSummaries>[number];
