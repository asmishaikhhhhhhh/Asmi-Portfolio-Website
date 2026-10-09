export const site = {
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://asmishaikh.com). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  name: "Asmi Shaikh",
  title: "Asmi Shaikh — Multidisciplinary Designer",
  description:
    "Asmi Shaikh is a multidisciplinary designer from Mumbai who connects research, products, services and screens into experiences that feel simple. Case studies, process and contact.",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
] as const;

/** Show `needed()` placeholders? On in dev; set SHOW_CONTENT_NEEDED=1 to preview in prod. */
export const showNeeded =
  process.env.NODE_ENV !== "production" || process.env.SHOW_CONTENT_NEEDED === "1";
