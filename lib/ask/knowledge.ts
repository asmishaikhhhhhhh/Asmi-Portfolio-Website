/**
 * Builds the chatbot's knowledge pack from /data, the same objects that render
 * the site. Nothing here is hand-written: update a project file and the bot
 * knows. `needed()` placeholders become "not documented" so the model says so
 * instead of guessing.
 *
 * Output is deterministic (no dates, stable order) so prompt caching holds.
 */
import { contact, designConfessions, education, experience, offScreen, profile, recognition, skills, tools } from "@/data/portfolio";
import { playground } from "@/data/playground";
import { allProjects, disciplineLabels } from "@/lib/projects";
import { isNeeded, type Block, type Maybe, type Project } from "@/lib/types";

const ND = "not documented in the portfolio";
const m = (v: Maybe<string> | undefined) => (v === undefined ? ND : isNeeded(v) ? ND : v);

function blockText(b: Block): string {
  switch (b.type) {
    case "text":
      return [b.heading, ...b.body].filter(Boolean).join(" ");
    case "pullQuote":
      return `Quote: "${b.quote}"${b.attribution ? ` (${b.attribution})` : ""}`;
    case "stats":
      return `${b.heading ?? "Stats"}: ${b.items.map((s) => `${s.value} ${s.label}`).join("; ")}${b.source && isNeeded(b.source) ? " (source not documented)" : b.source ? ` (source: ${b.source})` : ""}`;
    case "researchMethods":
      return `Research: ${b.groups?.map((g) => `${g.value} ${g.label}`).join(", ") ?? ""} | methods: ${b.methods.map((x) => x.name + (x.detail ? ` (${x.detail})` : "")).join("; ")}`;
    case "personas":
      return `Personas: ${b.items.map((p) => `${p.name}${p.age ? `, ${p.age}` : ""}: ${p.descriptor}`).join("; ")}`;
    case "insightChain":
      return `Insights: ${b.items.map((i) => `${i.observation} → ${i.insight} → ${i.opportunity}`).join(" | ")}`;
    case "hmw":
      return `${b.label ?? "How might we"}: ${b.statement}`;
    case "conceptFunnel":
      return `Concepts: ${b.stages.map((s) => `${s.count} ${s.label}`).join(" → ")}${b.concepts ? ` | ${b.concepts.map((c) => `${c.name} [${c.verdict}${c.reason ? `: ${c.reason}` : ""}]`).join("; ")}` : ""}`;
    case "process":
      return `Process: ${b.steps.map((s) => `${s.title}: ${s.body}`).join(" | ")}`;
    case "features":
      return `${b.heading ?? "Features"}: ${b.items.map((f) => `${f.title}: ${f.body}`).join(" | ")}`;
    case "testing":
      return [
        b.heading ?? "Testing",
        b.summary,
        b.metrics?.map((x) => `${x.label}: ${x.before ? `${x.before} → ` : ""}${x.after}${x.note ? ` (${x.note})` : ""}`).join("; "),
        b.positives?.length ? `Worked: ${b.positives.join("; ")}` : "",
        b.negatives?.length ? `Didn't work: ${b.negatives.join("; ")}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
    case "callout":
      return `${b.label ?? "Note"}: ${b.body}`;
    case "beforeAfter":
      return b.caption ? `Before/after: ${b.caption}` : "";
    default:
      return ""; // images, galleries and placeholders carry no facts
  }
}

function projectText(p: Project): string {
  const mine = isNeeded(p.contribution.mine) ? ND : p.contribution.mine.join("; ");
  return [
    `### ${p.title} (slug: ${p.slug}) — ${p.subtitle}`,
    `Kind: ${p.kind} | Tier: ${p.tier} | Year: ${m(p.year)} | Duration: ${m(p.duration)} | Role: ${m(p.role)}`,
    `Team: ${p.team.solo ? "solo" : `team project${p.team.collaborators?.length ? ` with ${p.team.collaborators.join(", ")}` : ""}`}${p.team.note ? ` (${p.team.note})` : ""}`,
    `Asmi's own contribution: ${mine}`,
    `Disciplines: ${p.disciplines.map((d) => disciplineLabels[d]).join(", ")} | Tags: ${p.tags.join(", ")} | Tools: ${p.tools.join(", ") || ND}`,
    `Summary: ${p.oneLiner}`,
    `Problem: ${p.quickRead.problem}`,
    `Insight: ${p.quickRead.insight}`,
    `Solution: ${p.quickRead.solution}`,
    `Result: ${m(p.quickRead.result)}`,
    ...p.chapters.map((c) => `- ${c.title}: ${c.blocks.map(blockText).filter(Boolean).join(" ")}`),
  ].join("\n");
}

let cached: string | null = null;

export function knowledgePack(): string {
  if (cached) return cached;
  cached = [
    "## Profile",
    `Name: ${profile.name}. Role: ${profile.role}. Location: ${profile.location}.`,
    `Availability: ${profile.availability.status}. Details: ${m(profile.availability.detail)}.`,
    `Positioning: ${profile.positioning}`,
    `Bio (her words): ${profile.bio.join(" ")}`,
    `Value proposition (her words): ${profile.valueProposition}`,
    "",
    "## Contact",
    `Email: ${contact.email} | LinkedIn: ${contact.linkedin} | Behance: ${contact.behance} | Resume: /resume`,
    "",
    "## Education",
    ...education.map((e) => `- ${e.qualification}, ${e.institution}, ${e.period}${e.location ? `, ${e.location}` : ""}`),
    "(GPA and grades are intentionally not shared.)",
    "",
    "## Experience",
    ...experience.map((x) => `- ${x.role} at ${x.org}, ${x.start}–${x.end}, ${x.location}. Work done: ${m(x.summary)}`),
    "",
    "## Recognition",
    ...recognition.map((r) => `- ${r.title}: ${r.detail} (${r.date})`),
    "",
    "## Skills",
    ...skills.map((g) => `- ${g.label} (${g.blurb}): ${g.skills.map((s) => s.name + (s.evidence ? ` [shown in: ${s.evidence.join(", ")}]` : "")).join("; ")}`),
    `Tools daily: ${tools.daily.join(", ")}. Also: ${tools.also.join(", ")}. Basic: ${tools.basic.join(", ")}.`,
    "",
    "## Personality",
    `Off-screen: ${offScreen.map((o) => o.label).join(", ")}. Her design jokes: ${designConfessions.join(" / ")}`,
    "",
    "## Projects",
    ...allProjects.map(projectText),
    "",
    "## Playground (smaller work)",
    ...playground.map((x) => `- ${x.title} (${x.kind}): ${x.blurb}${x.needs ? " [details pending]" : ""}`),
  ].join("\n");
  return cached;
}

export const projectSlugs = () => allProjects.map((p) => p.slug);
