/**
 * "How I think": the eight ways of thinking on the ring on the home page,
 * each with the belief shown when it's chosen.
 *
 * The belief lines are Asmi's own words.
 */
import type { ThinkingNode } from "@/lib/types";

export type ThinkingNodeInfo = {
  id: ThinkingNode;
  label: string;
  /** One line, in her words. */
  belief: string;
};

export const thinkingNodes: ThinkingNodeInfo[] = [
  { id: "people", label: "People", belief: "Good design starts with understanding people, not assumptions." },
  { id: "research", label: "Research", belief: "Ask questions, challenge assumptions, and let insights guide decisions." },
  { id: "systems", label: "Systems", belief: "Look beyond screens to see how everything connects." },
  { id: "play", label: "Play", belief: "Experiment freely. Sometimes the best ideas come from play." },
  { id: "stories", label: "Stories", belief: "Every design tells a story. Make sure it means something." },
  { id: "visuals", label: "Visuals", belief: "Make it look good, but more importantly, make it make sense." },
  { id: "technology", label: "Technology", belief: "Use technology to solve real problems, not just chase trends." },
  { id: "business", label: "Business", belief: "A good idea needs a way to create value and sustain itself." },
];
