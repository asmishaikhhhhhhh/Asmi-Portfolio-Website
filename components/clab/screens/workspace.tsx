"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { A, PEOPLE, SKILLS, THUMBS, TOOLS, type Project, type Tool } from "../data";
import { uid, useClab, type Section } from "../store";
import { Avatar, Btn, Chip, Confirm, Empty, Field, Header, Icon, IconBtn, Sheet, card, inputCls } from "../ui";
import { CoursesSection } from "./learn";
import { PortfolioSection, ResumeSection } from "./portfolio";

export const SECTIONS: { key: Section; label: string; bg: string; art: string }[] = [
  { key: "team", label: "Team Projects", bg: "#D0FFD8", art: `${A}/ws-team.webp` },
  { key: "my", label: "My Projects", bg: "#FCE5FF", art: `${A}/ws-my.webp` },
  { key: "portfolio", label: "Portfolio", bg: "#B7D6F2", art: `${A}/ws-portfolio.webp` },
  { key: "resume", label: "Resume", bg: "#C9ECF2", art: `${A}/ws-resume.webp` },
  { key: "courses", label: "Courses", bg: "#FFF0C3", art: `${A}/ws-courses.webp` },
];

/* ---------------- Workspace dashboard ---------------- */

export function Workspace() {
  const { d, a } = useClab();
  const count = (k: Section) =>
    k === "team"
      ? d.projects.filter((p) => p.kind === "team").length
      : k === "my"
        ? d.projects.filter((p) => p.kind === "personal").length
        : k === "portfolio"
          ? d.portfolios.length
          : k === "courses"
            ? Object.keys(d.progress).length
            : undefined;
  const open = (k: Section) => {
    if (k === "portfolio") a.step("open-portfolio");
    a.go({ name: "section", section: k });
  };
  const [team, my, portfolio, resume, courses] = SECTIONS;
  const Label = ({ s }: { s: (typeof SECTIONS)[number] }) => (
    <span className="relative z-10 block">
      <span className="block text-[16px] font-semibold leading-tight text-[#3D1A6E]">{s.label}</span>
      {count(s.key) !== undefined && <span className="mt-0.5 block text-[11px] font-medium text-[#3D1A6E]/55">{count(s.key)} items</span>}
    </span>
  );
  const tile = "group absolute flex flex-col items-start justify-start overflow-hidden rounded-[18px] p-3.5 text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(61,26,110,.14)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8F49CD]";
  const art = "pointer-events-none absolute object-contain transition-transform duration-300 group-hover:scale-[1.04]";
  return (
    <div>
      <Header title="Your Workspace" />
      {/* Layout from the workspace screen: Team Projects wraps around My Projects */}
      <div className="relative mx-4 my-4 h-[556px]">
        <button type="button" onClick={() => open("team")} className={`${tile} inset-x-0 top-0 h-[300px]`} style={{ background: team.bg }} aria-label="Team Projects">
          <Label s={team} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={team.art} alt="" className={`${art} bottom-0 right-1 h-[230px] origin-bottom-right`} />
        </button>
        {/* white notch that separates My Projects from the green L */}
        <span aria-hidden className="pointer-events-none absolute left-0 top-[100px] z-10 h-[212px] w-[calc(50%+6px)] rounded-tr-[24px] bg-white" />
        <button type="button" onClick={() => open("my")} className={`${tile} left-0 top-[112px] z-20 h-[188px] w-[calc(50%-6px)]`} style={{ background: my.bg }}>
          <Label s={my} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={my.art} alt="" className={`${art} inset-x-2 bottom-2 mx-auto h-[100px] w-[calc(100%-16px)] origin-bottom`} />
        </button>
        <button type="button" onClick={() => open("portfolio")} className={`${tile} left-0 top-[312px] h-[128px] w-[calc(50%-6px)]`} style={{ background: portfolio.bg }}>
          <Label s={portfolio} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portfolio.art} alt="" className={`${art} bottom-0 right-1 h-[86px] origin-bottom-right`} />
        </button>
        <button type="button" onClick={() => open("resume")} className={`${tile} right-0 top-[312px] h-[128px] w-[calc(50%-6px)]`} style={{ background: resume.bg }}>
          <Label s={resume} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resume.art} alt="" className={`${art} bottom-0 right-1 h-[86px] origin-bottom-right`} />
        </button>
        <button type="button" onClick={() => open("courses")} className={`${tile} inset-x-0 top-[452px] h-[104px]`} style={{ background: courses.bg }}>
          <Label s={courses} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={courses.art} alt="" className={`${art} bottom-0 right-3 h-[96px] origin-bottom-right`} />
        </button>
      </div>
    </div>
  );
}

/** Section page with a switcher so users can hop between workspace areas. */
export function SectionScreen({ section }: { section?: Section }) {
  const { a } = useClab();
  const s = SECTIONS.find((x) => x.key === section) ?? SECTIONS[0];
  return (
    <div>
      <Header title={s.label} onBack={a.back} />
      <nav aria-label="Workspace sections" className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 pt-3">
        {SECTIONS.map((x) => (
          <button
            key={x.key}
            type="button"
            aria-current={x.key === s.key ? "page" : undefined}
            onClick={() => {
              if (x.key === "portfolio") a.step("open-portfolio");
              a.replace({ name: "section", section: x.key });
            }}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${x.key === s.key ? "bg-[#3D1A6E] text-white" : "text-[#3D1A6E] hover:brightness-95"}`}
            style={x.key === s.key ? undefined : { background: x.bg }}
          >
            {x.label}
          </button>
        ))}
      </nav>
      {s.key === "team" && <ProjectGrid kind="team" />}
      {s.key === "my" && <ProjectGrid kind="personal" />}
      {s.key === "portfolio" && <PortfolioSection />}
      {s.key === "resume" && <ResumeSection />}
      {s.key === "courses" && <CoursesSection />}
    </div>
  );
}

/* ---------------- Projects ---------------- */

export function Thumb({ i, className = "" }: { i: number; className?: string }) {
  // Little layout sketch, like the project tiles in the design
  return (
    <span aria-hidden className={`grid grid-cols-3 gap-1 rounded-lg p-1.5 ${className}`} style={{ background: THUMBS[i % THUMBS.length] }}>
      <span className="col-span-2 h-5 rounded bg-white/80" />
      <span className="h-5 rounded bg-[#3D1A6E]/15" />
      <span className="h-3 rounded bg-white/70" />
      <span className="h-3 rounded bg-white/70" />
      <span className="h-3 rounded bg-white/70" />
    </span>
  );
}

function ProjectGrid({ kind }: { kind: Project["kind"] }) {
  const { d, a } = useClab();
  const list = d.projects.filter((p) => p.kind === kind).sort((x, y) => y.createdAt - x.createdAt);
  const create = () => {
    a.step("start-project");
    a.go({ name: "project-form", id: `new-${kind}` });
  };
  if (!list.length)
    return (
      <Empty
        icon="folder"
        title={kind === "team" ? "No team projects yet" : "No personal projects yet"}
        body={kind === "team" ? "Create a project, list the skills you need and let other CLAB users request to join." : "Keep your own work here, then pull it into a portfolio."}
        action={<Btn onClick={create}>Create project</Btn>}
      />
    );
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      <button
        type="button"
        onClick={create}
        className="flex h-[118px] flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-[#D9CFE6] text-[12px] font-medium text-[#6F6A78] transition-colors hover:border-[#8F49CD] hover:text-[#8F49CD]"
      >
        <Icon name="create" className="h-6 w-6" />
        Create
      </button>
      {list.map((p) => (
        <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <button
            type="button"
            onClick={() => a.go({ name: "project", id: p.id })}
            className="flex h-[118px] w-full flex-col justify-between rounded-2xl p-2.5 text-left transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: THUMBS[p.thumb % THUMBS.length] }}
          >
            <span className="pr-7 text-[12.5px] font-semibold text-[#3D1A6E]">{p.name}</span>
            <Thumb i={p.thumb} className="!bg-white/50" />
            {Date.now() - p.createdAt < 60_000 && p.createdAt > 0 && (
              <span className="absolute -top-2 left-2 rounded-full bg-[#8F49CD] px-2 py-0.5 text-[9.5px] font-bold uppercase text-white">New</span>
            )}
          </button>
          <IconBtn icon="edit" label={`Edit ${p.name}`} onClick={() => a.go({ name: "project-form", id: p.id })} className="!absolute right-1 top-1 !h-8 !w-8 bg-white/60" />
        </motion.div>
      ))}
    </div>
  );
}

type Draft = Omit<Project, "id" | "createdAt" | "tools" | "members" | "requests"> & { id?: string };
const blank = (kind: Project["kind"]): Draft => ({
  kind,
  name: "",
  description: "",
  start: "",
  end: "",
  time: "",
  skills: [],
  thumb: 0,
  visibility: "public",
  teamSize: 4,
});

const STEPS = ["Project details", "Thumbnail and skills", "Team and review"];

export function ProjectForm({ id }: { id?: string }) {
  const { d, a } = useClab();
  const existing = d.projects.find((p) => p.id === id);
  const kind: Project["kind"] = existing?.kind ?? (id === "new-personal" ? "personal" : "team");
  const [f, setF] = useState<Draft>(existing ?? blank(kind));
  const [step, setStep] = useState(0);
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [leave, setLeave] = useState(false);
  const [peek, setPeek] = useState(false);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    setErr((e) => ({ ...e, [k]: "" }));
  };
  const dirty = JSON.stringify(f) !== JSON.stringify(existing ?? blank(kind));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (f.name.trim().length < 2) e.name = "Give the project a name (at least 2 characters).";
      if (f.description.trim().length < 10) e.description = "Add a short description (at least 10 characters).";
      if (!f.start) e.start = "Pick a start date.";
      if (!f.end) e.end = "Pick an end date.";
      else if (f.start && f.end < f.start) e.end = "The end date can't be before the start date.";
      if (!f.time) e.time = "Pick a time.";
    }
    if (s === 1 && f.skills.length === 0) e.skills = "Choose at least one skill you need.";
    setErr(e);
    return Object.keys(e).length === 0;
  };
  const next = () => validate(step) && setStep((s) => Math.min(2, s + 1));
  const submit = () => {
    if (![0, 1].every((s) => validate(s))) return setStep(f.name && f.description && f.start && f.end && f.time ? 1 : 0);
    setBusy(true);
    setTimeout(() => {
      const p: Project = {
        ...(existing ?? { tools: {}, members: ["You"], requests: kind === "team" ? ["aditi", "aditya"] : [], createdAt: Date.now() }),
        ...f,
        id: existing?.id ?? uid(),
      } as Project;
      a.saveProject(p);
      setBusy(false);
      if (existing) {
        a.toast("Changes saved");
        a.back();
      } else {
        a.step("submit-project");
        a.toast(`${p.name} created`);
        a.replace({ name: "project", id: p.id });
      }
    }, 650);
  };
  const close = () => (dirty ? setLeave(true) : a.back());

  return (
    <div className="relative min-h-full">
      <Header title={existing ? `Edit ${existing.name}` : kind === "team" ? "New Team Project" : "New Project"} onBack={close} />
      <div className="px-4 py-4">
        {/* Progress */}
        <ol className="flex items-center gap-2" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${i <= step ? "bg-[#8F49CD] text-white" : "bg-[#F0E5FA] text-[#8F49CD]"}`}
                aria-current={i === step ? "step" : undefined}
              >
                {i < step ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {i < STEPS.length - 1 && <span className={`h-0.5 flex-1 rounded-full transition-colors ${i < step ? "bg-[#8F49CD]" : "bg-[#F0E5FA]"}`} />}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[11px] font-medium text-[#8F49CD]">
          Step {step + 1} of 3 · {STEPS[step]}
        </p>
        <p className="text-[12px] text-[#6F6A78]">{f.visibility === "public" ? "Visible to other CLAB users" : "Only you and your team can see this"}</p>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="mt-4 space-y-4">
            {step === 0 && (
              <>
                <Field label="Project name" required error={err.name}>
                  {(id, db) => <input id={id} aria-describedby={db} aria-invalid={!!err.name} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. ICA 3" className={inputCls(err.name)} />}
                </Field>
                <Field label="Project description" required error={err.description} hint={`${f.description.length}/200`}>
                  {(id, db) => (
                    <textarea
                      id={id}
                      aria-describedby={db}
                      aria-invalid={!!err.description}
                      rows={3}
                      maxLength={200}
                      value={f.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Brief background research, problem, deliverables"
                      className={inputCls(err.description)}
                    />
                  )}
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start date" required error={err.start}>
                    {(id, db) => <input id={id} aria-describedby={db} type="date" value={f.start} onChange={(e) => set("start", e.target.value)} className={inputCls(err.start)} />}
                  </Field>
                  <Field label="End date" required error={err.end}>
                    {(id, db) => <input id={id} aria-describedby={db} type="date" value={f.end} min={f.start || undefined} onChange={(e) => set("end", e.target.value)} className={inputCls(err.end)} />}
                  </Field>
                </div>
                <Field label="Time" required error={err.time}>
                  {(id, db) => <input id={id} aria-describedby={db} type="time" value={f.time} onChange={(e) => set("time", e.target.value)} className={inputCls(err.time)} />}
                </Field>
              </>
            )}
            {step === 1 && (
              <>
                <fieldset>
                  <legend className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">
                    Thumbnail<span className="text-[#8F49CD]">*</span>
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {THUMBS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Thumbnail style ${i + 1}`}
                        aria-pressed={f.thumb === i}
                        onClick={() => set("thumb", i)}
                        className={`rounded-xl p-1 transition-shadow ${f.thumb === i ? "ring-2 ring-[#8F49CD]" : "ring-1 ring-[#E6E1EE] hover:ring-[#8F49CD]/50"}`}
                      >
                        <Thumb i={i} />
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">
                    Key skills required<span className="text-[#8F49CD]">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILLS.map((s) => (
                      <Chip key={s} on={f.skills.includes(s)} onClick={() => set("skills", f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s])}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                  {err.skills && <p className="mt-1.5 text-[11px] text-[#C2362F]">{err.skills}</p>}
                </fieldset>
              </>
            )}
            {step === 2 && (
              <>
                <Field label="Team size">
                  {(id) => (
                    <div className="flex items-center gap-3">
                      <Btn variant="soft" size="sm" aria-label="Fewer members" onClick={() => set("teamSize", Math.max(1, f.teamSize - 1))}>
                        −
                      </Btn>
                      <output id={id} className="w-8 text-center text-[15px] font-semibold text-[#3D1A6E]">
                        {f.teamSize}
                      </output>
                      <Btn variant="soft" size="sm" aria-label="More members" onClick={() => set("teamSize", Math.min(12, f.teamSize + 1))}>
                        +
                      </Btn>
                    </div>
                  )}
                </Field>
                <fieldset>
                  <legend className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">Visibility</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ["public", "Visible to CLAB users", "eye"],
                        ["private", "Private to the team", "lock"],
                      ] as const
                    ).map(([v, l, ic]) => (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={f.visibility === v}
                        onClick={() => set("visibility", v)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-[12px] transition-colors ${f.visibility === v ? "border-[#8F49CD] bg-[#F7F3FC] text-[#3D1A6E]" : "border-[#E2DCEB] text-[#6F6A78]"}`}
                      >
                        <Icon name={ic} className="h-4 w-4 shrink-0" />
                        {l}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className={`${card} p-3.5`}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8F49CD]">Review</p>
                  <dl className="mt-2 space-y-1.5 text-[12.5px]">
                    {[
                      ["Name", f.name],
                      ["Dates", `${fmt(f.start)} – ${fmt(f.end)} · ${f.time}`],
                      ["Skills", f.skills.join(", ")],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className="w-14 shrink-0 text-[#6F6A78]">{k}</dt>
                        <dd className="text-[#24212B]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <button type="button" onClick={() => setStep(0)} className="mt-2 text-[12px] font-semibold text-[#8F49CD] hover:underline">
                    Edit details
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex gap-2">
          {step > 0 ? (
            <Btn variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Btn>
          ) : (
            <Btn variant="ghost" onClick={close}>
              Cancel
            </Btn>
          )}
          {step === 2 && (
            <Btn variant="soft" onClick={() => setPeek(true)}>
              Preview
            </Btn>
          )}
          {step < 2 ? (
            <Btn className="flex-1" onClick={next}>
              Next
            </Btn>
          ) : (
            <Btn className="flex-1" loading={busy} onClick={submit}>
              {existing ? "Save changes" : "Create project"}
            </Btn>
          )}
        </div>
      </div>
      <Sheet open={peek} onClose={() => setPeek(false)} title="Project preview">
        <PreviewCard p={{ ...f, members: ["You"] }} />
      </Sheet>
      <Confirm open={leave} title="Discard changes?" body="What you've entered in this form will be lost." confirm="Discard" onConfirm={a.back} onClose={() => setLeave(false)} />
    </div>
  );
}

const fmt = (iso: string) => (iso ? new Date(iso + "T00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—");

function PreviewCard({ p }: { p: Pick<Project, "name" | "description" | "start" | "end" | "time" | "skills" | "thumb" | "members"> }) {
  return (
    <div className={`${card} overflow-hidden`}>
      <p className="border-b-2 border-[#3D1A6E] px-4 pb-2 pt-3 text-[14px] font-semibold text-[#3D1A6E]">{p.name || "Project name"}</p>
      <div className="flex gap-3 p-4">
        <span className="flex h-36 w-24 shrink-0 flex-col justify-between rounded-xl bg-[#2C4A43] p-2">
          <Thumb i={p.thumb} />
          <Thumb i={p.thumb + 1} />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-[#3D1A6E]">About</p>
          <p className="mt-0.5 text-[12px] leading-snug text-[#55505E]">{p.description || "Add a description to tell people what this project is about."}</p>
          <p className="mt-2 text-[11.5px] font-semibold text-[#3D1A6E]">
            Date: {fmt(p.start)} – {fmt(p.end)}
          </p>
          {p.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {p.skills.map((s) => (
                <span key={s} className="rounded-full bg-[#F0E5FA] px-2 py-0.5 text-[10.5px] text-[#63328D]">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectPreview({ id }: { id?: string }) {
  const { d, a } = useClab();
  const p = d.projects.find((x) => x.id === id);
  if (!p) return <Empty icon="folder" title="Project not found" body="It may have been deleted." action={<Btn variant="soft" onClick={a.back}>Go back</Btn>} />;
  return (
    <div>
      <Header title="Project Preview" onBack={a.back} />
      <div className="space-y-4 p-4">
        <PreviewCard p={p} />
        <div className="flex gap-2">
          <Btn
            variant="ghost"
            className="flex-1"
            onClick={() => {
              a.toggleSavedProject(p.id);
              a.toast(p.saved ? "Removed from saved" : "Project saved");
            }}
          >
            <Icon name="bookmark" className="h-4 w-4" fill={p.saved} />
            {p.saved ? "Saved" : "Save project"}
          </Btn>
          <Btn variant="ghost" className="flex-1" onClick={() => a.go({ name: "project-form", id: p.id })}>
            <Icon name="edit" className="h-4 w-4" /> Edit
          </Btn>
        </div>
        <Btn className="w-full" onClick={() => a.go({ name: "section", section: p.kind === "team" ? "team" : "my" })}>
          Back to {p.kind === "team" ? "Team Projects" : "My Projects"}
        </Btn>
      </div>
    </div>
  );
}

export function ProjectDetail({ id }: { id?: string }) {
  const { d, a } = useClab();
  const p = d.projects.find((x) => x.id === id);
  const [tool, setTool] = useState<Tool | null>(null);
  const [del, setDel] = useState(false);
  if (!p) return <Empty icon="folder" title="Project not found" body="It may have been deleted." action={<Btn variant="soft" onClick={a.back}>Go back</Btn>} />;
  const t = TOOLS.find((x) => x.key === tool);
  return (
    <div className="relative min-h-full">
      <Header
        title={p.name}
        onBack={a.back}
        right={
          <>
            <IconBtn icon="edit" label="Edit project" onClick={() => a.go({ name: "project-form", id: p.id })} />
            <IconBtn icon="trash" label="Delete project" onClick={() => setDel(true)} />
          </>
        }
      />
      <div className="space-y-5 p-4">
        <button
          type="button"
          onClick={() => {
            a.step("open-preview");
            a.go({ name: "project-preview", id: p.id });
          }}
          className={`${card} flex w-full items-center gap-3 p-3 text-left transition-shadow hover:shadow-md`}
        >
          <Thumb i={p.thumb} className="w-20 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-[#3D1A6E]">Project preview</span>
            <span className="block truncate text-[11.5px] text-[#6F6A78]">{p.description}</span>
          </span>
          <Icon name="eye" className="h-5 w-5 text-[#8F49CD]" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {TOOLS.map((x) => {
            const n = p.tools[x.key]?.length ?? 0;
            return (
              <button
                key={x.key}
                type="button"
                onClick={() => setTool(x.key)}
                className="relative flex h-[76px] items-end rounded-2xl p-3 text-left transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: x.bg, color: x.ink ?? "#3D1A6E" }}
              >
                <Icon name={x.key} className="absolute right-3 top-3 h-5 w-5 opacity-70" />
                <span className="text-[14px] font-semibold">{x.label}</span>
                {n > 0 && <span className="absolute left-3 top-3 rounded-full bg-white/70 px-1.5 text-[10px] font-bold text-[#3D1A6E]">{n}</span>}
              </button>
            );
          })}
        </div>

        {p.kind === "team" && (
          <section>
            <h3 className="text-[14px] font-semibold text-[#3D1A6E]">
              Team · {p.members.length}/{p.teamSize}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.members.map((m) => {
                const person = PEOPLE.find((x) => x.id === m);
                return (
                  <span key={m} className="flex items-center gap-2 rounded-full bg-[#F7F3FC] py-1 pl-1 pr-3 text-[12px] text-[#3D1A6E]">
                    <Avatar src={person?.photo} name={person?.name ?? m} size={26} />
                    {person?.name ?? m}
                  </span>
                );
              })}
            </div>
            <h3 className="mt-4 text-[14px] font-semibold text-[#3D1A6E]">Join requests</h3>
            {p.requests.length === 0 ? (
              <p className="mt-1 text-[12.5px] text-[#6F6A78]">No pending requests. People who want to join will appear here.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {p.requests.map((r) => {
                  const person = PEOPLE.find((x) => x.id === r);
                  const full = p.members.length >= p.teamSize;
                  return (
                    <li key={r} className={`${card} flex items-center gap-3 p-2.5`}>
                      <Avatar src={person?.photo} name={person?.name ?? r} size={38} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-semibold text-[#3D1A6E]">{person?.name ?? r}</span>
                        <span className="block truncate text-[11px] text-[#6F6A78]">{person?.skills.slice(0, 2).join(" · ")}</span>
                      </span>
                      <Btn size="sm" variant="ghost" onClick={() => a.request(p.id, r, false)}>
                        Decline
                      </Btn>
                      <Btn
                        size="sm"
                        disabled={full}
                        title={full ? "Team is full" : undefined}
                        onClick={() => {
                          a.request(p.id, r, true);
                          a.toast(`${person?.name ?? r} joined ${p.name}`);
                        }}
                      >
                        Accept
                      </Btn>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}
      </div>

      <Sheet open={!!t} onClose={() => setTool(null)} title={t?.label ?? ""}>
        {t && <ToolPanel pid={p.id} tool={t.key} />}
      </Sheet>
      <Confirm
        open={del}
        title={`Delete ${p.name}?`}
        body="The project and everything in its tools will be removed from this prototype."
        confirm="Delete"
        onConfirm={() => {
          a.deleteProject(p.id);
          a.back();
          a.toast(`${p.name} deleted`);
        }}
        onClose={() => setDel(false)}
      />
    </div>
  );
}

function ToolPanel({ pid, tool }: { pid: string; tool: Tool }) {
  const { d, a } = useClab();
  const meta = TOOLS.find((x) => x.key === tool)!;
  const items = d.projects.find((x) => x.id === pid)?.tools[tool] ?? [];
  const [text, setText] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  return (
    <div className="pb-2">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          a.toolItems(pid, tool, (xs) => [...xs, { id: uid(), text: text.trim() }]);
          setText("");
        }}
      >
        <label className="flex-1">
          <span className="sr-only">{meta.add}</span>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder={meta.add} className={inputCls()} />
        </label>
        <Btn type="submit" disabled={!text.trim()}>
          Add
        </Btn>
      </form>
      {items.length === 0 ? (
        <p className="py-8 text-center text-[12.5px] text-[#6F6A78]">{meta.empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-[#EFEAF5]">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-3 py-2.5">
              {tool === "tracker" ? (
                <button
                  type="button"
                  aria-label={i.done ? `Mark ${i.text} not done` : `Mark ${i.text} done`}
                  onClick={() => a.toolItems(pid, tool, (xs) => xs.map((x) => (x.id === i.id ? { ...x, done: !x.done } : x)))}
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${i.done ? "border-[#8F49CD] bg-[#8F49CD] text-white" : "border-[#BFB4CF]"}`}
                >
                  {i.done && <Icon name="check" className="h-3.5 w-3.5" />}
                </button>
              ) : (
                <Icon name={tool} className="h-4 w-4 shrink-0 text-[#8F49CD]" />
              )}
              <span className={`flex-1 text-[13px] ${i.done ? "text-[#A39DAE] line-through" : "text-[#24212B]"}`}>
                {i.text}
                {i.due && <span className="ml-2 text-[11px] text-[#8D8896]">Due {i.due}</span>}
              </span>
              <IconBtn icon="trash" label={`Remove ${i.text}`} onClick={() => setConfirm(i.id)} className="!h-8 !w-8" />
            </li>
          ))}
        </ul>
      )}
      {tool === "tracker" && items.length > 0 && (
        <p className="mt-2 text-[11.5px] text-[#6F6A78]">
          {items.filter((i) => i.done).length} of {items.length} done
        </p>
      )}
      <Confirm
        open={!!confirm}
        title="Remove this item?"
        body="It will be removed for everyone on the project."
        confirm="Remove"
        onConfirm={() => a.toolItems(pid, tool, (xs) => xs.filter((x) => x.id !== confirm))}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}
