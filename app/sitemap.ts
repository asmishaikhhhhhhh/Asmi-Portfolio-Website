import type { MetadataRoute } from "next";
import { pagedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/playground", "/resume", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const work = pagedProjects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: p.tier === "flagship" ? 0.9 : 0.6,
  }));
  return [...pages, ...work];
}
