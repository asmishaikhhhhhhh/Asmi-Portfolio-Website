import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { BlockView } from "@/components/blocks/Blocks";
import { CaseHero } from "@/components/case/CaseHero";
import { ChapterNav } from "@/components/case/ChapterNav";
import { Contribution } from "@/components/case/Contribution";
import { NextProject } from "@/components/case/NextProject";
import { QuickRead } from "@/components/case/QuickRead";
import { AskAbout } from "@/components/chat/AskAbout";
import { JsonLd } from "@/components/seo/JsonLd";
import { readableOn } from "@/lib/color";
import { getProject, nextProject, pagedProjects } from "@/lib/projects";
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

const SOLUTION_IDS = ["reveal", "solution", "redesign"];

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
  const solution = p.chapters.find((c) => SOLUTION_IDS.includes(c.id))?.id;

  return (
    <article
      style={
        {
          "--accent": p.accent,
          "--accent-ink": readableOn(p.accent, "#fbf9f4"),
        } as React.CSSProperties
      }
    >
      <CaseHero p={p} />
      <QuickRead p={p} solutionChapter={solution} />

      <div className="container-page mt-20 grid gap-10 md:mt-28 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <ChapterNav items={p.chapters.map((c) => ({ id: c.id, label: c.label }))} />
        </aside>
        <div className="min-w-0 lg:col-span-9">
          {p.chapters.map((c, i) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-28 border-t border-line pb-20 pt-12 first:border-t-0 first:pt-0 md:pb-28">
              <p className="meta flex items-center gap-3 text-ink-mute">
                <span className="tabular-nums" style={{ color: "var(--accent-ink)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.label}
              </p>
              <h2 id={`${c.id}-title`} className="mt-3 max-w-[22ch] font-display-soft text-h1">
                {c.title}
              </h2>
              {c.intro && <p className="mt-6 max-w-[52ch] text-lede text-ink-soft">{c.intro}</p>}
              <div className="mt-12 space-y-14">
                {c.blocks.map((b, j) => (
                  <BlockView key={j} block={b} />
                ))}
              </div>
            </section>
          ))}
          <Contribution p={p} />
          <AskAbout title={p.title} slug={p.slug} />
        </div>
      </div>

      <NextProject next={next} behance={p.links?.behance} external={p.links?.external} />
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
