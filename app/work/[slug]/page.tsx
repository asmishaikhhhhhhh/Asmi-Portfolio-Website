import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { BlockView } from "@/components/blocks/Blocks";
import { CaseHero } from "@/components/case/CaseHero";
import { ChapterNav } from "@/components/case/ChapterNav";
import { Contribution } from "@/components/case/Contribution";
import { NextProject } from "@/components/case/NextProject";
import { FullProject } from "@/components/case/FullProject";
import { Tudum } from "@/components/case/Tudum";
import { AskAbout } from "@/components/chat/AskAbout";
import { JsonLd } from "@/components/seo/JsonLd";
import { readableOn } from "@/lib/color";
import { getProject, nextProject, pagedProjects } from "@/lib/projects";
import { STAGES } from "@/lib/types";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return pagedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const image = p.cover.type === "image" ? p.cover.image : p.cover.poster;
  return {
    title: { absolute: p.seo.title },
    description: p.seo.description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.seo.title,
      description: p.seo.description,
      url: `/work/${p.slug}`,
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title: p.seo.title, description: p.seo.description, images: [image.src] },
  };
}

/**
 * Reading `params` happens inside <Suspense> (Next 16 + Cache Components). Every
 * slug is prerendered by generateStaticParams, so visitors get the full page
 * from static output; the fallback only matters for unknown slugs.
 */
export default function Page({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  // Externally hosted projects (e.g. the Medium study): send old links straight there.
  if (p.externalOnly && p.links?.external) redirect(p.links.external.href);
  const next = nextProject(p.slug);
  // The shared flow: one section per stage that has material, in stage order.
  const sections = STAGES.map((s) => ({ ...s, chapters: p.chapters.filter((c) => c.stage === s.key) })).filter((s) => s.chapters.length);

  return (
    <article
      style={
        {
          "--accent": p.accent,
          "--accent-ink": readableOn(p.accent, "#fbf9f4"),
          ...(p.pageBg ? { background: p.pageBg, "--page-bg": p.pageBg } : {}),
        } as React.CSSProperties
      }
    >
      <CaseHero p={p} />
      {p.slug === "netflix-mobile" && <Tudum />}

      <div className="container-page mt-20 grid gap-10 md:mt-28 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <ChapterNav items={sections.map((s) => ({ id: s.key, label: s.label }))} />
        </aside>
        <div className="min-w-0 lg:col-span-9">
          {sections.map((s, i) => (
            <section key={s.key} id={s.key} aria-labelledby={`${s.key}-title`} className="scroll-mt-28 border-t border-line pb-20 pt-12 first:border-t-0 first:pt-0 md:pb-28">
              <p className="meta flex items-center gap-3 text-ink-mute">
                <span className="tabular-nums" style={{ color: "var(--accent-ink)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </p>
              {s.chapters.map((c, ci) => (
                <div key={c.id} className={ci > 0 ? "mt-20 md:mt-24" : ""}>
                  <h2 id={ci === 0 ? `${s.key}-title` : undefined} className={`${ci === 0 ? "mt-3" : ""} font-display-soft text-h2`}>
                    {c.title}
                  </h2>
                  {c.intro && <p className="mt-5 max-w-[60ch] text-intro text-ink-soft">{c.intro}</p>}
                  <div className="mt-12 space-y-14">
                    {c.blocks.map((b, j) => (
                      <BlockView key={j} block={b} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
          <Contribution p={p} />
          <AskAbout title={p.title} slug={p.slug} />
          <FullProject p={p} />
        </div>
      </div>

      <NextProject next={next} />
      <div className="h-24" />

      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: p.title, path: `/work/${p.slug}` },
        ])}
      />
    </article>
  );
}
