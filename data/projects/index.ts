/**
 * Project registry. To add a project: create data/projects/<slug>.ts
 * (copy an existing one), then import it here. Everything else (home page, work
 * index, filters, "How I think" map, sitemap, chatbot) picks it up automatically.
 */
import type { Project } from "@/lib/types";
import leapsters from "./leapsters";
import greenly from "./greenly";
import fireSafe from "./fire-safe";
import clab from "./clab";
import netflixMobile from "./netflix-mobile";
import fiama from "./fiama";
import clapIt from "./clap-it";
import adeiro from "./adeiro";
import celestialInfluence from "./celestial-influence";
import childHelpFoundation from "./child-help-foundation";
import aistrike from "./aistrike";

export const projects: Project[] = [
  leapsters,
  greenly,
  fireSafe,
  clab,
  netflixMobile,
  fiama,
  clapIt,
  adeiro,
  celestialInfluence,
  childHelpFoundation,
  aistrike,
];
