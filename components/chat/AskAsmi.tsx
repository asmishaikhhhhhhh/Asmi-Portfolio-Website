import { allProjects, projectHref } from "@/lib/projects";
import { AskPanel } from "./AskPanel";

/** Server wrapper: hands the client panel the project titles it may deep-link to. */
export function AskAsmi() {
  const projects = Object.fromEntries(allProjects.map((p) => [p.slug, { title: p.title, ...projectHref(p) }]));
  return <AskPanel projects={projects} />;
}
