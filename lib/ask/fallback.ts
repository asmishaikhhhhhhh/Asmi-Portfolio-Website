/**
 * Local, deterministic answerer. Used when no API key is configured or the API
 * is unavailable. It can only rearrange facts from /data, so it cannot invent.
 */
import { contact, education, experience, profile, recognition, skills, tools } from "@/data/portfolio";
import { allProjects, disciplineLabels } from "@/lib/projects";
import { isNeeded, type Discipline } from "@/lib/types";
import type { AskReply } from "./schema";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w));

function findProjects(q: string) {
  return allProjects.filter((p) => {
    const names = [p.slug.replace(/-/g, " "), p.title.toLowerCase(), p.title.toLowerCase().split(/[\s:,]/)[0]];
    return names.some((n) => n.length > 2 && q.includes(n));
  });
}

const disciplineWords: Record<Discipline, string[]> = {
  research: ["research", "interview", "ethnograph", "user stud"],
  "ux-ui": ["ux", "ui", "app", "interface", "screen", "web", "mobile"],
  systems: ["system", "service", "ecosystem"],
  "physical-brand": ["physical", "object", "concept", "prototyp", "product design", "packaging", "brand", "industrial", "identity"],
};

export function localAnswer(question: string): AskReply {
  const q = norm(question);
  const named = findProjects(q);

  // A specific project
  if (named.length === 1) {
    const p = named[0];
    if (has(q, "role", "contribut", "did she do", "her part", "responsib")) {
      const mine = p.contribution.mine;
      const team = p.team.solo ? "It was a solo project." : `It was a team project${p.team.collaborators?.length ? ` with ${p.team.collaborators.join(", ")}` : ""}.`;
      return {
        answer: isNeeded(mine)
          ? `${team} Asmi's individual contribution isn't documented on the site yet, so the best way to hear it is from her directly.`
          : `${team} Asmi's part: ${mine.join("; ")}.`,
        links: [p.slug],
        actions: isNeeded(mine) ? ["email"] : [],
      };
    }
    const result = isNeeded(p.quickRead.result) ? "" : ` Result: ${p.quickRead.result}`;
    return {
      answer: `${p.title}: ${p.oneLiner} The problem: ${p.quickRead.problem} What she made: ${p.quickRead.solution}${result}`,
      links: [p.slug],
      actions: [],
    };
  }
  if (named.length > 1) {
    return {
      answer: `Here are the projects you mentioned: ${named.map((p) => `${p.title} (${p.subtitle.toLowerCase()})`).join("; ")}.`,
      links: named.map((p) => p.slug),
      actions: [],
    };
  }

  if (has(q, "available", "hire", "hiring", "open to", "freelance", "job", "work with")) {
    return {
      answer: `Asmi is currently ${profile.availability.status.toLowerCase()}. The quickest way to talk about a role or project is email (${contact.email}) or LinkedIn.`,
      links: [],
      actions: ["email", "linkedin", "resume"],
    };
  }
  if (has(q, "contact", "email", "reach", "linkedin", "get in touch", "talk to")) {
    return { answer: `Email her at ${contact.email}, or find her on LinkedIn and Behance. There's also a contact form at the bottom of every page.`, links: [], actions: ["email", "linkedin"] };
  }
  if (has(q, "resume", "cv")) {
    return { answer: "Her resume is on the site, readable in the browser, with a PDF download.", links: [], actions: ["resume"] };
  }
  if (has(q, "educat", "study", "degree", "college", "university", "school", "nmims")) {
    const e = education[0];
    return { answer: `Asmi studied ${e.qualification} at ${e.institution} (${e.period}), in ${e.location}.`, links: [], actions: ["resume"] };
  }
  if (has(q, "experience", "intern", "worked at", "companies", "jobs")) {
    return {
      answer: `Her experience: ${experience.map((x) => `${x.role} at ${x.org} (${x.start}–${x.end})`).join("; ")}.`,
      links: [],
      actions: ["resume"],
    };
  }
  if (has(q, "award", "recogni", "publish", "paper", "achievement")) {
    return { answer: recognition.map((r) => `${r.title}: ${r.detail} (${r.date})`).join(". ") + ".", links: [], actions: [] };
  }
  if (has(q, "tool", "software", "figma", "adobe", "blender", "unity")) {
    return { answer: `Daily: ${tools.daily.join(", ")}. Also: ${tools.also.join(", ")}. Basic: ${tools.basic.join(", ")}.`, links: [], actions: [] };
  }
  if (has(q, "skill", "strength", "good at", "best at")) {
    return {
      answer: skills.map((g) => `${g.label}: ${g.skills.map((s) => s.name).join(", ")}`).join(". ") + ".",
      links: ["leapsters", "greenly"],
      actions: [],
    };
  }
  if (has(q, "process", "approach", "how does she work", "method", "think")) {
    return {
      answer:
        "Her projects tend to follow the same arc: deep primary research (often dozens of interviews and observation), synthesis into insights and a clear problem statement, broad ideation with concepts openly killed, then prototyping and testing with real users. Leapsters is the clearest example.",
      links: ["leapsters", "fire-safe"],
      actions: [],
    };
  }
  if (has(q, "different", "unique", "stand out", "why her", "why asmi")) {
    return {
      answer: `In her own words, she's "${profile.valueProposition.toLowerCase()}" Her work often joins physical and digital parts into one system (a board game and app, hydroponic units with sensors and dashboards, hologram, AR and VR training), and it starts from real research numbers rather than assumptions.`,
      links: ["leapsters", "greenly", "fire-safe"],
      actions: [],
    };
  }
  if (has(q, "research", "interview", "user stud", "ethnograph")) {
    // Pull real numbers from each project's research block.
    const evidence = allProjects
      .map((p) => {
        const rm = p.chapters.flatMap((c) => c.blocks).find((b) => b.type === "researchMethods");
        if (!rm || rm.type !== "researchMethods") return null;
        const people = rm.groups?.reduce((a, g) => a + g.value, 0);
        return people ? { p, detail: `${people} research participants (${rm.groups!.map((g) => `${g.value} ${g.label.toLowerCase()}`).join(", ")})` } : null;
      })
      .filter(Boolean) as { p: (typeof allProjects)[number]; detail: string }[];
    return {
      answer: `Yes, research is the backbone of most of her work. ${evidence
        .slice(0, 4)
        .map((e) => `${e.p.title}: ${e.detail}`)
        .join("; ")}.`,
      links: evidence.slice(0, 3).map((e) => e.p.slug),
      actions: [],
    };
  }
  for (const [d, words] of Object.entries(disciplineWords) as [Discipline, string[]][]) {
    if (has(q, ...words)) {
      const ps = allProjects.filter((p) => p.disciplines.includes(d)).slice(0, 4);
      return { answer: `For ${disciplineLabels[d]}, start with ${ps.map((p) => p.title).join(", ")}.`, links: ps.map((p) => p.slug), actions: [] };
    }
  }
  if (has(q, "who", "about her", "tell me about asmi", "introduce")) {
    return {
      answer: `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.location}, with a B.Des in Humanising Technology from NMIMS School of Design. ${profile.positioning.replace(/^I design/, "She designs")}`,
      links: ["leapsters"],
      actions: ["resume"],
    };
  }
  if (has(q, "project", "work", "portfolio", "show me")) {
    const ps = allProjects.filter((p) => p.tier === "flagship");
    return { answer: `Her main case studies are ${ps.map((p) => p.title).join(", ")}. Leapsters, her capstone, is the best place to start.`, links: ps.map((p) => p.slug), actions: [] };
  }
  return {
    answer: "I'm not sure about that one, and I only answer from what's on this site. Asmi would be happy to answer it herself.",
    links: [],
    actions: ["email"],
  };
}
