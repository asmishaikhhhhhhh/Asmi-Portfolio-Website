import Link from "next/link";
import { IntroName } from "@/components/hero/IntroName";
import { Magnetic } from "@/components/ui/Magnetic";
import { CurrentRole } from "@/components/ui/CurrentRole";
import Image from "next/image";
import { profile } from "@/data/portfolio";
import { Statement } from "./Statement";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden pt-24 md:pt-28">
      {/* faint dot grid behind the intro, fading out before the statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] md:h-[52rem]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(26 25 22 / 0.16) 1px, transparent 1.6px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(180deg, #000 55%, transparent)",
        }}
      />
      <div className="container-page relative">
        {/* Eyebrow: where she is now, then what and where */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <CurrentRole />
          <p className="meta flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-mute">
            <span>{profile.role}</span>
            <span aria-hidden className="text-line">/</span>
            <span>{profile.location}</span>
          </p>
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
          <IntroName name={profile.name} className="min-w-0 flex-1" />
        </div>

        {/* One line on what she does, then the two ways in */}
        <p className="mt-10 max-w-[34ch] text-lede text-ink-soft md:mt-12">{profile.headline}.</p>
        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3 md:mt-10">
          <Magnetic>
            <Link
              href="#work"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
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

        {/* Far-flung words gathering into one sentence (its words start scattered, so leave room above) */}
        <div className="mt-36 md:mt-52">
          <Statement segments={profile.statement} />
        </div>
      </div>
    </section>
  );
}
