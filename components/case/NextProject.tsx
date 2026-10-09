import Link from "next/link";
import { Cover } from "@/components/covers/Cover";
import type { Project } from "@/lib/types";

export function NextProject({ next, behance, external }: { next: Project; behance?: string; external?: { label: string; href: string } }) {
  return (
    <section aria-label="Keep exploring" className="container-page mt-24 md:mt-32">
      {(behance || external) && (
        <p className="mb-12 flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
          {external && (
            <a href={external.href} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              {external.label} ↗
            </a>
          )}
          {behance && (
            <a href={behance} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">
              View on Behance ↗
            </a>
          )}
        </p>
      )}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="Explore"
        className="group grid items-center gap-8 border-t border-line pt-10 md:grid-cols-12"
      >
        <div className="md:col-span-5">
          <p className="meta text-ink-mute">Next project</p>
          <p className="mt-3 font-display-soft text-h1 transition-transform duration-500 group-hover:translate-x-2">{next.title} →</p>
          <p className="mt-2 font-display-wonk text-h3 italic text-ink-soft">{next.subtitle}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Cover cover={next.cover} label={`${next.title} cover`} transitionName={`cover-${next.slug}`} />
        </div>
      </Link>
    </section>
  );
}
