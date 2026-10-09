import { contact, education, profile } from "@/data/portfolio";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: site.url,
    image: `${site.url}${profile.photo.src}`,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education[0].institution },
    sameAs: [contact.linkedin, contact.behance, contact.medium],
    knowsAbout: ["UX design", "Service design", "Design research", "Product design", "Ecosystem design"],
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    headline: `${p.title}: ${p.subtitle}`,
    description: p.seo.description,
    url: `${site.url}/work/${p.slug}`,
    creator: { "@type": "Person", name: profile.name, url: site.url },
    ...(typeof p.year === "string" ? { dateCreated: p.year } : {}),
    keywords: p.tags.join(", "),
    image: `${site.url}${p.cover.type === "image" ? p.cover.image.src : p.cover.poster.src}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
