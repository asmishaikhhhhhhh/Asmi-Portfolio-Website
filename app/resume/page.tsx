import { CurrentRole } from "@/components/ui/CurrentRole";
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { MaybeText } from "@/components/ui/Needed";
import { contact, education, experience, profile, recognition, skills, tools } from "@/data/portfolio";
import { byTier } from "@/lib/projects";
import { PrintButton } from "@/components/resume/PrintButton";

/** Resume-specific names for the skill groups (the About page keeps Think / Make / Explore). */
const RESUME_GROUP_LABEL: Record<string, string> = { Think: "Approach", Make: "Skills", Explore: "Explored" };

export const metadata: Metadata = {
  title: "Resume",
  description: "Asmi Shaikh's resume: education, experience, skills, tools and recognition. Readable in the browser, with a PDF download.",
  alternates: { canonical: "/resume" },
};

/** The resume as a real web page: fast, readable on a phone, printable. The PDF is one click away. */
export default function ResumePage() {
  // Only offer the download once public/asmi-shaikh-resume.pdf exists.
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", contact.resumePdf));
  return (
    <div className="container-page pb-24 pt-28 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8 print:hidden">
        <div>
          <p className="meta text-ink-mute">Resume</p>
          <h1 className="mt-3 font-display-soft text-h1">The short version</h1>
          <CurrentRole className="mt-4" />
        </div>
        <div className="flex flex-wrap gap-3">
          {hasPdf && (
            <a href={contact.resumePdf} download className="rounded-full bg-ink px-5 py-3 font-medium text-paper">
              Download PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <article className="mx-auto mt-12 max-w-4xl rounded-media border border-line bg-card p-6 md:p-12 print:border-0 print:p-0">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <h2 className="font-display-soft text-h2">{profile.name}</h2>
            <p className="text-ink-soft">{profile.role} · {profile.location}</p>
          </div>
          <p className="text-sm text-ink-soft">
            <a href={`mailto:${contact.email}`} className="underline underline-offset-4">{contact.email}</a>
            <span className="mx-2 text-line">|</span>
            <a href={contact.linkedin} className="underline underline-offset-4">LinkedIn</a>
            <span className="mx-2 text-line">|</span>
            <a href={contact.behance} className="underline underline-offset-4">Behance</a>
          </p>
        </header>
        <p className="mt-6 max-w-[70ch] text-ink-soft">{profile.bio.join(" ")}</p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_2fr]">
          <section>
            <h3 className="meta font-bold text-forest">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.qualification}>
                  <p className="font-medium">{e.qualification}</p>
                  <p className="text-sm text-ink-soft">{e.institution}{e.location ? `, ${e.location}` : ""}</p>
                  <p className="text-sm text-ink-mute">{e.period}</p>
                </li>
              ))}
            </ul>
            <h3 className="meta mt-10 font-bold text-forest">Recognition</h3>
            <ul className="mt-4 space-y-4">
              {recognition.map((r) => (
                <li key={r.title}>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-ink-soft">{r.detail}</p>
                  <p className="text-sm text-ink-mute">{r.date}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="meta font-bold text-forest">Experience</h3>
            <ul className="mt-4 space-y-5">
              {experience.map((x) => (
                <li key={x.role + x.org} className={x.current ? "-mx-3 rounded-control border-l-4 border-forest bg-forest-soft/60 px-3 py-2.5" : ""}>
                  <p className="flex flex-wrap justify-between gap-x-4 font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      {x.role} · {x.org}
                      {x.current && <span className="meta rounded-full bg-forest px-2 py-0.5 text-paper">Current</span>}
                    </span>
                    <span className={`text-sm font-normal ${x.current ? "font-medium text-forest" : "text-ink-mute"}`}>{x.start ? `${x.start} – ${x.end}` : x.end}</span>
                  </p>
                  {x.location && <p className="text-sm text-ink-mute">{x.location}</p>}
                  <p className="mt-1 text-sm text-ink-soft"><MaybeText value={x.summary} /></p>
                </li>
              ))}
            </ul>
            <h3 className="meta mt-10 font-bold text-forest">Selected projects</h3>
            <ul className="mt-4 space-y-2">
              {byTier("flagship").map((p) => (
                <li key={p.slug} className="text-sm">
                  <Link href={`/work/${p.slug}`} className="font-medium underline decoration-line underline-offset-4">{p.title}</Link>
                  <span className="text-ink-soft">: {p.oneLiner}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-4">
          {skills.map((g) => (
            <div key={g.name}>
              <h3 className="meta font-bold text-forest">{RESUME_GROUP_LABEL[g.name] ?? g.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{g.skills.map((s) => s.name).join(", ")}</p>
            </div>
          ))}
          <div>
            <h3 className="meta font-bold text-forest">Tools</h3>
            <p className="mt-2 text-sm text-ink-soft">{[...tools.daily, ...tools.also].join(", ")}. Basic: {tools.basic.join(", ")}.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
