import Link from "next/link";
import { Disciplines, IntroName } from "@/components/hero/IntroName";
import { Magnetic } from "@/components/ui/Magnetic";
import { CurrentRole } from "@/components/ui/CurrentRole";
import Image from "next/image";
import { profile } from "@/data/portfolio";
import { Statement } from "./Statement";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden pt-24 md:pt-28">
      {/* faint dot grid behind the intro, fading out below the statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70rem] md:h-[82rem]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(26 25 22 / 0.16) 1px, transparent 1.6px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(180deg, #000 65%, transparent)",
        }}
      />
      <div className="container-page relative">
        {/* Eyebrow, one line: what and where, then the fields she works across */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="meta flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-mute">
            <span>{profile.role}</span>
            <span aria-hidden className="text-line">/</span>
            <span>{profile.location}</span>
          </p>
          <span aria-hidden className="meta text-line">/</span>
          <Disciplines />
        </div>

        {/* Photo + name */}
        <div className="mt-12 flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 md:mt-16">
          {/* Round photo beside the name: paper ring and hairline */}
          {/* Sized to span the name line plus its caption, so the two align */}
          <div className="group relative w-fit shrink-0">
            <Image
              src={profile.avatar.src}
              alt={profile.avatar.alt}
              width={240}
              height={240}
              priority
              unoptimized
              className="h-[4.5rem] w-[4.5rem] rounded-full border border-line object-cover p-1 shadow-[0_8px_24px_-12px_rgb(26_25_22/.35)] transition-transform duration-500 ease-out-soft group-hover:-rotate-3 group-hover:scale-[1.03] sm:h-[calc(var(--text-display)*1.2+1.85rem)] sm:w-[calc(var(--text-display)*1.2+1.85rem)]"
              style={{ background: "var(--color-card)" }}
            />
          </div>
          <IntroName name={profile.name} className="min-w-0 flex-1">
            {/* where she is now, right under her name */}
            <CurrentRole className="mt-3" />
          </IntroName>
        </div>

        {/* Far-flung words gathering into one sentence (its words start scattered, so leave room above) */}
        <div className="mt-28 md:mt-40">
          <Statement segments={profile.statement} connectTo="see-work" />
        </div>

        {/* Then the two ways in */}
        <div className="relative z-10 mt-16 flex flex-wrap items-center gap-3 md:mt-20">
          <Magnetic>
            <Link
              href="#work"
              id="see-work"
              // the statement's thread drops onto this and pours marigold in from the top (--fill, 0 → 1)
              className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-marigold) calc(var(--fill, 0) * 100%), var(--color-ink) calc(var(--fill, 0) * 100%))",
                color: "color-mix(in oklab, var(--color-ink) calc(var(--fill, 0) * 100%), var(--color-paper))",
              }}
            >
              See my work
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out-soft group-hover/cta:translate-y-0.5">
                ↓
              </span>
            </Link>
          </Magnetic>
          <Link
            href="/resume"
            className="group/cv inline-flex items-center gap-2 rounded-full border border-ink/25 bg-card/70 px-6 py-3.5 font-medium transition-colors duration-200 hover:border-ink"
          >
            View resume
            <span aria-hidden className="inline-block transition-transform duration-300 ease-out-soft group-hover/cv:-translate-y-0.5 group-hover/cv:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
