/**
 * "How I think": the nodes of the interactive map on the home page.
 *
 * Which projects light up for a node (or a pair of nodes) is NOT hardcoded here.
 * It's derived from each project's `thinking` field in /data/projects, so adding
 * a project automatically updates the map.
 *
 * The belief lines are drafts in Asmi's voice; she should rewrite them freely.
 */
import type { ThinkingNode } from "@/lib/types";

export type ThinkingNodeInfo = {
  id: ThinkingNode;
  label: string;
  /** One line, first person. DRAFT, for Asmi to approve. */
  belief: string;
};

export const thinkingNodes: ThinkingNodeInfo[] = [
  { id: "people", label: "People", belief: "I start with who's struggling, and why they've stopped asking for help." },
  { id: "research", label: "Research", belief: "I don't trust my first idea until a few dozen people have argued with it." },
  { id: "systems", label: "Systems", belief: "A screen is rarely the problem. I look at everything around it." },
  { id: "play", label: "Play", belief: "If it's fun, people come back. If they come back, they learn." },
  { id: "stories", label: "Stories", belief: "A good insight should be retellable in one breath." },
  { id: "visuals", label: "Visuals", belief: "Craft is how people know you cared before they read a word." },
  { id: "technology", label: "Technology", belief: "AR, IoT, VR: tools, not the point. The point is who they help." },
  { id: "business", label: "Business", belief: "A good idea also needs a way to pay for itself." },
];
