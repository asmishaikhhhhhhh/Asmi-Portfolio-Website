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
      <div className="container-page">
        <p className="meta flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-mute">
          <span>{profile.role}</span>
          <span aria-hidden className="text-line">/</span>
          <span>{profile.location}</span>
          <CurrentRole className="normal-case tracking-normal" />
        </p>

        {/* One line on large screens: photo + name on the left, actions at the right end */}
        <div className="mt-12 flex flex-col gap-10 md:mt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 lg:flex-1">
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

        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-4 lg:justify-end">
          <Magnetic>
            <Link
              href="/resume"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              View resume
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out-soft group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">
                ↗
              </span>
            </Link>
          </Magnetic>
        </div>
        </div>

        {/* Far-flung words gathering into one sentence */}
        <div className="mt-24 md:mt-36">
          <Statement segments={profile.statement} />
        </div>

      </div>
    </section>
  );
}
