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
    case "insightThemes":
      return `${b.heading ?? "Insights"}: ${b.themes.map((t) => `${t.title}${t.stat ? ` (${t.stat.value} ${t.stat.label})` : ""}: ${t.points.join("; ")}`).join(" | ")}`;
    case "uiFeatures":
      return `${b.heading ?? "Features"}: ${b.items.map((f) => `${f.title}: ${f.body}`).join(" | ")}`;
    case "conceptTabs":
      return `${b.heading ?? "Concepts"}: ${b.concepts.map((c) => `${c.name} (${c.verdict}): ${c.columns.map((x) => `${x.label}: ${x.items.join("; ")}`).join(". ")}`).join(" | ")}`;
    case "researchExplorer":
      return `${b.heading ?? "Research"}: ${b.methods.map((x) => `${x.name}: ${x.detail}${x.parts ? ` (${x.parts.map((p) => `${p.value} ${p.label}`).join(", ")})` : ""}${x.chips ? `; themes ${x.chips.join(", ")}` : ""}`).join(" | ")}`;
    case "circles":
      return `${b.heading ?? "Parts"}: ${b.items.map((x) => x.label).join(", ")}${b.note ? `. ${b.note}` : ""}`;
    case "imageTabs":
      return `${b.heading ?? "Images"}: ${b.intro ? `${b.intro} ` : ""}${b.items.map((x) => x.caption ?? x.label).join("; ")}`;
    case "figmaEmbed":
      return `${b.heading ?? "Interactive prototype"}: ${b.title}, embedded from Figma.`;
    case "stageStairs":
      return `${b.heading ?? "Stages"}: ${b.stages.map((x, i) => `${i + 1}. ${x.title}${x.ours ? ` (${b.mark}: ${x.ours.label}. ${x.ours.body})` : ""}`).join(" | ")}`;
    case "insightFlow":
      return `${b.heading ?? "Insights"}: ${b.items.map((x) => `${x.observation} → ${x.insight} → ${x.opportunity}`).join(" | ")}`;
    case "heard":
      return `${b.heading ?? "What we heard"}: ${b.items.map((x) => `${x.title}: ${x.body}`).join(" | ")}`;
    case "breakdown":
      return `${b.heading ?? "Breakdown"}: ${b.total.label} ${b.total.value} ${b.unit} = ${b.parts.map((x) => `${x.label} ${x.value} ${b.unit}`).join(" + ")}`;
    case "ecosystem":
      return `${b.heading ?? "Ecosystem"} around ${b.centre}${b.centreNote ? ` (${b.centreNote})` : ""}: ${b.nodes.map((x) => `${x.title}: ${x.notes.join(" ")}${x.list ? ` ${x.list.label}: ${x.list.items.join(", ")}` : ""}`).join(" | ")}`;
    case "surfaceRoots":
      return `${b.heading ?? "Research"}: secondary gaps: ${b.gaps.map((g) => `${g.title}: ${g.body}`).join(" | ")}. Primary insights: ${b.roots.map((r) => `${r.title}: ${r.observation} → ${r.insight} → ${r.opportunity}`).join(" | ")}`;
    case "valueMap":
      return `${b.heading ?? "Value map"}: ${b.edges.map((e) => `${e.from} → ${e.to}: ${e.values.join(", ")}`).join("; ")}${b.caption ? `. ${b.caption}` : ""}`;
    case "techPlan":
      return `${b.heading ?? "Tech plan"}: ${b.flows.map((f) => `${f.name}: ${f.body} (${f.steps.map((s) => `${b.lanes[s.lane]}: ${s.label}`).join(" → ")})`).join(" | ")}`;
    case "screenTour":
      return `${b.heading ?? "Screens"}: ${b.screens.map((x) => `${x.name}: ${x.lede} ${x.spots.map((p) => `${p.title}: ${p.body}`).join("; ")}`).join(" | ")}`;
    case "roleCard":
      return `Role: ${b.title}. ${b.items.join("; ")}. Tools: ${b.tools.join(", ")}. Skills: ${b.skills.join(", ")}`;
    case "vennProcess":
      return `${b.heading ?? "Process"}: ${b.phases.map((p, i) => `${p}: ${b.items.filter((x) => x.phases.includes(i)).map((x) => x.label).join(", ")}`).join(" | ")}`;
    case "moduleStory":
      return b.modules
        .map((m) => `${m.num} ${m.name}${m.headline ? ` — ${m.headline}` : ""}: ${m.body ?? ""}${m.chips ? ` (${m.chips.join(", ")})` : ""}${m.challenge ? ` Challenge: ${m.challenge.join("; ")}.` : ""}${m.approach ? ` Approach: ${m.approach.join("; ")}.` : ""}${m.impact ? ` Impact: ${m.impact.join("; ")}.` : ""}`)
        .join(" | ");
    case "systemSpecimen":
      return `Type and spacing: ${b.family} (${b.scale.map((t) => `${t.name} ${t.size}px`).join(", ")}); spacing ${b.spacing.join(", ")} px`;
    case "designTokens":
      return `Colour tokens: ${[...b.neutrals, ...b.brand, ...b.severity].map((c) => `${c.name} ${c.hex}`).join(", ")}`;
    case "termMap":
      return `${b.heading ?? "Terminology"}: ${b.branches.map((x) => `${x.name}: ${x.terms.map((t) => t.term).join(", ")}`).join(" | ")}`;
    case "issueFeed":
      return `${b.heading ?? "Problems"}: ${b.items.map((x) => `${x.title} (${x.module}): ${x.body} Addressed by: ${x.fix.join("; ")}`).join(" | ")}`;
    case "phoneCarousel":
      return `${b.heading ?? "Posts"}: ${b.slides.map((x) => `${x.kind}: ${x.title}`).join("; ")}`;
    case "appCoverflow":
      return `${b.heading ?? "App screens"}: ${b.screens.map((x) => `${x.title}${x.tag ? ` (${x.tag})` : ""}: ${x.body}`).join(" | ")}`;
    case "mindMap":
      return `${b.heading ?? "Mind map"}: ${b.regions.map((r) => r.label).join(", ")}`;
    case "sketchWall":
      return `${b.heading ?? "Concept sketches"}: ${b.concepts.length} concepts${b.picks ? `; shortlisted: ${b.picks.map((n) => `Concept ${n}`).join(", ")}` : ""}`;
    case "sourcePills":
      return `${b.heading ?? "Sources"}: ${b.items.map((x) => `${x.name}: ${x.body}`).join(" | ")}`;
    case "factorSpectrum":
      return `${b.heading ?? "Factors"}: ${b.external.title}: ${b.external.body} ${b.internal.title}: ${b.internal.body} In between: ${b.factors.join(", ")}`;
    case "gapCards":
      return `${b.heading ?? "Gaps"}: ${b.items.map((x) => x.body.replace(/\*\*/g, "")).join(" | ")}`;
    case "researchOrbit":
      return `${b.heading ?? "Research"}: ${b.objective.replace(/\*\*/g, "")} Participants: ${b.groups.map((g) => `${g.label} ${g.value}${g.parts ? ` (${g.parts.map((x) => `${x.value} ${x.label}`).join(", ")})` : ""}`).join(", ")}. Looked for: ${b.actions.join(", ")}`;
    case "cameraStudy":
      return `${b.heading ?? "Camera study"}: ${b.shots.filter((s) => s.label).map((s) => s.label).join(", ")}`;
    case "keyInsights":
      return `${b.heading ?? "Key insights"}: ${b.items.map((x) => x.body.replace(/\*\*/g, "")).join(" | ")}`;
    case "affinityBoard":
      return `${b.heading ?? "Affinity map"}: ${b.clusters.map((c) => `${c.name}: ${c.notes.map((n) => n.text).join("; ")}`).join(" | ")}`;
    case "empathyMap":
      return `${b.heading ?? "Empathy map"}: ${b.quadrants.map((q) => `${q.name}: ${q.notes.join("; ")}`).join(" | ")}. Pains: ${b.pains.join("; ")}. Gains: ${b.gains.join("; ")}`;
    case "opportunityCircles":
      return `${b.heading ?? "Opportunity areas"}: ${b.items.map((x) => `${x.title}: ${x.body}`).join(" | ")}`;
    case "ideaVisual":
      return `${b.heading ?? "Idea"}: ${b.statement.replace(/\*\*/g, "")} Focus: ${b.focus.join("; ")}. ${b.pillars.join(", ")}: ${b.promises.map((p) => p.text).join(" ")}`;
    case "frameworkNest":
      return `${b.heading ?? "Design framework"}: ${b.layers.map((l) => `${l.name}: ${l.note}`).join(" | ")}`;
    case "criteriaArrow":
      return `${b.heading ?? "Selection criteria"}: ${b.criteria.map((c) => `${c.name}: ${c.body}`).join(" | ")}`;
    case "conceptScore":
      return `${b.heading ?? "Shortlisted concepts"}: ${b.cards.map((c) => `${c.name} (${b.criteria.map((k, i) => `${k} ${c.scores[i] >= 75 ? "high" : c.scores[i] >= 55 ? "medium" : "low"}`).join(", ")}): ${c.parts.map((p) => `${p.title}: ${p.lines.join(" ")}`).join(" ")}`).join(" | ")}`;
    case "boardKit":
      return `${b.heading ?? "In the box"}: ${b.parts.map((p) => `${p.name}: ${p.body}`).join(" | ")}`;
    case "howToPlay":
      return `${b.heading ?? "How to play"}: ${b.steps.map((s) => `${s.title}: ${s.body}`).join(" | ")}. ${b.bonus.title} ${b.bonus.lines.join(" ")} ${b.bonus.rewards.join("; ")}. ${b.bonus.note}`;
    case "mobileFirst":
      return `${b.heading ?? "Mobile first"}${b.intro ? `: ${b.intro}` : ""}`;
    case "styleSheet":
      return `${b.heading ?? "Style"}: fonts ${b.fonts.map((f) => `${f.name} (${f.role}, ${f.weights})`).join(", ")}; type sizes ${b.ramp.map((r) => `${r.label} ${r.px}px`).join(", ")}; colours ${b.colors.map((c) => `${c.name} ${c.hex}`).join(", ")}`;
    case "iaTree":
      return `${b.heading ?? "Information architecture"}: ${b.root} → ${b.branches.map((x) => `${x.name} (${x.items.join(", ")})`).join("; ")}`;
    case "taskFlow":
      return `${b.heading ?? "Task flow"}: ${b.columns.map((c) => c.join(" + ")).join(" → ")}`;
    case "testingCollage":
      return `${b.heading ?? "Testing"}: ${b.count} ${b.label}`;
    case "designLens":
      return `${b.heading ?? "Design process"}: ${b.stages.map((x) => `${x.name}: ${x.body}`).join(" | ")}. ${b.lens}: ${b.questions.join(" ")}`;
    case "puzzleQuotes":
      return `${b.heading ?? "What children said"}: ${b.quotes.map((q) => `"${q}"`).join(" ")}`;
    case "compareMatrix":
      return `${b.heading ?? "Comparison"}: ${b.rows.map((r) => `${r.name}: ${b.columns.map((c, i) => `${c} ${r.values[i] ? "yes" : "no"}`).join(", ")}`).join(" | ")}`;
    case "matPlay":
      return `${b.heading ?? "How to play"}: skill decks ${b.decks.map((d) => `${d.name} (${d.body}; example challenges: ${d.cards.slice(0, 3).map((c) => `${c.title}: ${c.prompt}`).join("; ")})`).join(" | ")}. Bonus rewards: ${b.rewards.join("; ")}`;
    case "octalysis":
      return `${b.heading ?? "Octalysis"}: ${b.versions.map((v) => `${v.name}: ${v.notes.join(" ")}`).join(" | ")}`;
    case "phaseTimeline":
      return `${b.heading ?? "Timeline"}: ${b.phases.map((p) => `${p.name} (steps ${p.from}–${p.to} of ${b.steps}): ${p.body}`).join(" | ")}`;
    case "versusTable":
      return `${b.heading ?? "Comparison"} (${b.them} vs ${b.us}): ${b.rows.map((r) => `${r.label}: ${b.them} ${r.them}; ${b.us} ${r.us}`).join(" | ")}`;
    case "flipBook":
      return `${b.heading ?? b.title}: a ${b.pages.length}-page ${b.title}, shown as a flip book.`;
    case "learnings":
      return `Learnings: ${b.items.map((l) => `${l.title}: ${l.lead} ${l.points.join(" ")}`).join(" | ")}`;
    case "systemLayers":
      return `${b.heading ?? "System architecture"}: scenarios: ${b.scenarios.map((x) => `${x.who}: ${x.body}`).join(" | ")}. Task flows: ${b.flows.map((x) => `${x.who}: ${x.steps.join(" → ")}`).join(" | ")}. Data points: ${b.points.map((x) => `${x.who}: ${x.groups.map((g) => `${g.name} (${g.items.join(", ")})`).join("; ")}`).join(" | ")}. Tech plan: ${b.tech.chains.map((c) => `${c.name}: ${c.steps.join(" → ")}`).join(" | ")}. Data flow: ${b.trees.map((t) => `${t.name}: ${t.sections.map((s) => s.pages.map((p) => `${p.name}${p.items.length ? ` (${p.items.join(", ")})` : ""}`).join(", ")).join("; ")}`).join(" | ")}. Artefacts: ${b.artefacts.map((a) => `${a.name} (${a.kind}): ${[a.skeuomorphism, ...a.signifier, ...a.metaphor].filter(Boolean).join(" ")}`).join(" | ")}`;
    case "testRack":
      return `${b.heading ?? "Testing"}: ${b.tiers.map((t) => `${t.title}: ${t.notes.map((n) => `[${n.tone}] ${n.text}`).join("; ")}`).join(" | ")}`;
    case "clabMaterial":
      return "Material design: a set of 30 filled purple icons; large purple buttons for everyday actions and navy buttons for premium; medium and small buttons; and inactive versus active states.";
    case "clabPrototype":
      return "An interactive coded prototype of CLAB, rebuilt from the high-fidelity screens: student and working professional journeys for discovering and registering for webinars, creating team projects, and building portfolios.";
    case "processPath":
      return `${b.heading ?? "Design process"}: ${b.steps.join(" → ")}`;
    case "stakeholderRings":
      return `${b.heading ?? "Stakeholders"}${b.centre ? ` around ${b.centre}` : ""}: ${b.rings.map((r) => `${r.name}: ${r.members.join(", ")}`).join(" | ")}`;
    case "keyFeatures":
      return `${b.heading ?? "Key features"}: ${b.items.map((f) => `${f.title}: ${f.body}`).join(" | ")}`;
    case "testOverview":
      return `${b.heading ?? "Testing"}: ${b.total.value} ${b.total.label} (${b.groups.map((g) => `${g.value} ${g.label}`).join(", ")})${b.rating ? `; ${b.rating.label} ${b.rating.value}/${b.rating.max}` : ""}. What worked: ${b.worked.join("; ")}`;
    case "colorSystem":
      return `${b.heading ?? "Colours"}: ${b.groups.map((g) => `${g.title}: ${g.swatches.map((c) => `${c.name} ${c.hex}`).join(", ")}`).join(" | ")}`;
    case "iconCards":
      return `${b.heading ?? "Points"}: ${b.items.map((f) => `${f.title}: ${f.body}`).join(" | ")}`;
    case "problemFix":
      return `${b.heading ?? "Problems and fixes"}: ${b.items.map((f) => `${f.problem} → ${f.fix}`).join(" | ")}`;
    case "testing":
      return [
        b.heading ?? "Testing",
        b.rating ? `${b.rating.label}: ${b.rating.value}/${b.rating.max}` : "",
        b.summary,
        b.metrics?.map((x) => `${x.label}: ${x.before ? `${x.before} → ` : ""}${x.after}${x.note ? ` (${x.note})` : ""}`).join("; "),
        b.positives?.length ? `Worked: ${b.positives.join("; ")}` : "",
        b.negatives?.length ? `Didn't work: ${b.negatives.join("; ")}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
    case "groups":
      return `${b.heading ?? "Notes"}: ${b.groups.map((g) => `${g.title}: ${g.items.join("; ")}`).join(" | ")}`;
    case "showcase":
      return `${b.heading ?? "Parts"}: ${b.items.map((i) => `${i.title}: ${i.body}${i.chips ? ` (${i.chips.join(", ")})` : ""}`).join(" | ")}`;
    case "businessModel": {
      const j = (label: string, x?: string[]) => (x?.length ? `${label} ${x.join("; ")}` : "");
      const costs = b.costs?.map((c) => (typeof c === "string" ? c : `${c.label}: ₹${c.min}–₹${c.max}${c.per ? ` per ${c.per}` : ""}`));
      return `Business model: ${[
        j("partners", b.partners), j("activities", b.activities), j("resources", b.resources), j("value", b.value),
        j("relationships", b.relationships), j("channels", b.channels), j("segments", b.segments), j("revenue", b.revenue), j("costs", costs),
      ].filter(Boolean).join(" | ")}`;
    }
    case "mediaText":
      return `${b.title}: ${b.body.join(" ")}${b.rating ? ` (${b.rating.label}: ${b.rating.value}/${b.rating.max})` : ""}`;
    case "featureStats":
      return `${b.feature.title}: ${b.feature.body} | ${b.stats.map((x) => `${x.value} ${x.label}`).join("; ")}`;
    case "ratings":
      return `${b.heading ?? "Ratings"}: ${b.items.map((r) => `${r.label} ${r.value}/${r.max}${r.note ? ` (${r.note})` : ""}`).join("; ")}`;
    case "iconRow":
      return `${b.heading ?? "Audience"}: ${b.items.map((a) => `${a.title}: ${a.body}`).join(" | ")}`;
    case "palette":
      return `Colours: ${b.items.map((c) => `${c.name} (${c.role}) ${c.hex}, RGB ${c.rgb}, CMYK ${c.cmyk}: ${c.body}`).join(" | ")}`;
    case "list":
      return `${b.heading ?? "Points"}: ${b.items.join("; ")}`;
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
    ...p.chapters.map((c) => `- [${c.stage}] ${c.title}: ${c.intro ? c.intro + " " : ""}${c.blocks.map(blockText).filter(Boolean).join(" ")}`),
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
