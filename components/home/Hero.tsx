import Link from "next/link";
import { MultilingualName } from "@/components/hero/MultilingualName";
import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import { education, experience, profile, recognition } from "@/data/portfolio";
import { Statement } from "./Statement";
import { ProofCards, type ProofCard } from "./ProofCards";

export function Hero() {
  const cards: ProofCard[] = [
    {
      key: "education",
      label: "Education",
      big: "B.Des",
      title: "Humanising Technology",
      sub: `${education[0].institution}, ${education[0].period}`,
      details: [`Batch ${education[0].period.replace(/\s/g, "")}`, `${education[0].location}`],
      href: "/about",
      hrefLabel: "My background",
      motif: "cap",
      tone: "forest",
    },
    {
      key: "experience",
      label: "Experience",
      big: String(experience.length).padStart(2, "0"),
      title: "roles across design and outreach",
      sub: experience.slice(0, 2).map((e) => e.org.split(" (")[0]).join(" · "),
      details: experience.map((e) => `${e.role}, ${e.org.split(" (")[0]}`),
      href: "/resume",
      hrefLabel: "View resume",
      motif: "stack",
      tone: "paper",
      count: experience.length,
    },
    {
      key: "recognition",
      label: "Recognition",
      big: "Award",
      title: recognition[0].title,
      sub: `${recognition[0].detail}`,
      details: [recognition[0].date],
      motif: "rosette",
      tone: "marigold",
    },
    {
      key: "published",
      label: "Published",
      big: "Paper",
      title: "White paper, IIP Series 2024",
      sub: "Iterative International Publishers",
      details: ["“A New Era of Connectivity: Exploring the Potential of PI Network”", recognition[1].date],
      href: recognition[1].href,
      hrefLabel: "Read the paper",
      external: true,
      motif: "page",
      tone: "sage",
    },
  ];

  return (
    <section aria-label="Introduction" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="container-page">
        <p className="meta flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-mute">
          <span>{profile.role}</span>
          <span aria-hidden className="text-line">/</span>
          <span>{profile.location}</span>
          <span aria-hidden className="text-line">/</span>
          <span className="inline-flex items-center gap-2 text-forest">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-marigold/70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-marigold" />
            </span>
            {profile.availability.status}
          </span>
        </p>

        {/* One line on large screens: photo + name on the left, actions at the right end */}
        <div className="mt-12 flex flex-col gap-10 md:mt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 lg:flex-1">
          {/* Round photo beside the name: paper ring and hairline */}
          {/* Sized to span the name line plus its language caption, so the three align */}
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
          <MultilingualName className="min-w-0 flex-1" />
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

        {/* At a glance: facts as cards that open up */}
        <div className="mt-20 md:mt-28">
          <ProofCards cards={cards} />
        </div>
      </div>
    </section>
  );
}
