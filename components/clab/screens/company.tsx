"use client";

import { useState } from "react";
import { A, DEFAULT_RULES, POSTERS, type Webinar } from "../data";
import { uid, useClab, webinar } from "../store";
import { Avatar, Btn, Confirm, Empty, Field, Header, Icon, IconBtn, Tabs, card, inputCls } from "../ui";

/* ---------------- Verification ---------------- */

const DOCS: { key: string; label: string; required: boolean }[] = [
  { key: "licence", label: "Business licence", required: true },
  { key: "tax", label: "Tax certificate", required: true },
  { key: "address", label: "Proof of address", required: true },
  { key: "duns", label: "D-U-N-S number (optional)", required: false },
];

export function Verify({ id }: { id?: string }) {
  const { d, a } = useClab();
  const [f, setF] = useState(d.verification ?? { year: "", employees: "", revenue: "", files: {} as Record<string, string> });
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: "year" | "employees" | "revenue", v: string) => {
    setF({ ...f, [k]: v });
    setErr((e) => ({ ...e, [k]: "" }));
  };
  const submit = () => {
    const e: Record<string, string> = {};
    if (!/^\d{1,3}$/.test(f.year.trim())) e.year = "Enter the number of years, e.g. 62.";
    if (!/^\d[\d,]*$/.test(f.employees.trim())) e.employees = "Enter a number of employees.";
    if (!f.revenue.trim()) e.revenue = "Enter your annual revenue.";
    DOCS.filter((x) => x.required && !f.files[x.key]).forEach((x) => (e[x.key] = "Upload this document."));
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setTimeout(() => {
      a.verify(f);
      a.step("verify");
      a.toast("Company verified (demo, nothing was uploaded)");
      if (id === "then-create") a.replace({ name: "event-form", id: "new-webinar" });
      else a.back();
    }, 900);
  };
  return (
    <div>
      <Header title="Verification" onBack={a.back} />
      <div className="space-y-4 p-4">
        {d.verified && (
          <div className="flex items-center gap-2 rounded-xl bg-[#E9FBEA] px-3 py-2.5 text-[12.5px] font-semibold text-[#1F6B33]">
            <Icon name="check" className="h-4 w-4" /> {d.profiles.company.name} is verified
          </div>
        )}
        <div className={`${card} space-y-4 p-4`}>
          <p className="text-[13px] font-semibold text-[#3D1A6E]">Additional company information</p>
          <Field label="Year of establishment" required error={err.year} hint="How many years the company has run">
            {(i, db) => <input id={i} aria-describedby={db} inputMode="numeric" value={f.year} onChange={(e) => set("year", e.target.value)} placeholder="62 years" className={inputCls(err.year)} />}
          </Field>
          <Field label="Number of employees" required error={err.employees}>
            {(i, db) => <input id={i} aria-describedby={db} inputMode="numeric" value={f.employees} onChange={(e) => set("employees", e.target.value)} className={inputCls(err.employees)} />}
          </Field>
          <Field label="Annual revenue" required error={err.revenue}>
            {(i, db) => <input id={i} aria-describedby={db} value={f.revenue} onChange={(e) => set("revenue", e.target.value)} className={inputCls(err.revenue)} />}
          </Field>
        </div>
        <div className={`${card} space-y-3 p-4`}>
          <p className="text-[13px] font-semibold text-[#3D1A6E]">Upload documents for verification</p>
          {DOCS.map((doc) => {
            const name = f.files[doc.key];
            return (
              <div key={doc.key}>
                <p className="mb-1 text-[12px] font-medium text-[#3D1A6E]">
                  {doc.label}
                  {doc.required && <span className="text-[#8F49CD]">*</span>}
                </p>
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-[12.5px] transition-colors hover:border-[#8F49CD] ${err[doc.key] ? "border-[#C2362F]" : "border-[#E2DCEB]"}`}>
                  <span className="rounded-lg bg-[#F0E5FA] px-2.5 py-1 text-[11.5px] font-semibold text-[#63328D]">{name ? "Replace" : "Choose file"}</span>
                  <span className={`truncate ${name ? "text-[#24212B]" : "text-[#A39DAE]"}`}>{name ?? "No file chosen"}</span>
                  {name && <Icon name="check" className="ml-auto h-4 w-4 shrink-0 text-[#1F6B33]" />}
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                    aria-label={doc.label}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setF({ ...f, files: { ...f.files, [doc.key]: file.name } });
                      setErr((x) => ({ ...x, [doc.key]: "" }));
                    }}
                  />
                </label>
                {err[doc.key] && <p className="mt-1 text-[11px] text-[#C2362F]">{err[doc.key]}</p>}
              </div>
            );
          })}
          <p className="text-[10.5px] text-[#8D8896]">Prototype: only the file name is kept, on this device. Nothing is uploaded.</p>
        </div>
        <Btn size="lg" className="w-full" loading={busy} onClick={submit}>
          {d.verified ? "Update verification" : "Verify"}
        </Btn>
      </div>
    </div>
  );
}

/* ---------------- Create webinar / competition ---------------- */

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export function EventForm({ id }: { id?: string }) {
  const { d, a } = useClab();
  const existing = d.myWebinars.find((w) => w.id === id);
  const kind: "webinar" | "competition" = existing?.kind ?? (id === "new-competition" ? "competition" : "webinar");
  const [f, setF] = useState({
    title: existing?.title ?? "",
    about: existing?.about ?? "",
    guests: existing?.guests.join(", ") ?? "",
    date: "",
    time: "",
    poster: Math.max(0, POSTERS.indexOf(existing?.poster ?? POSTERS[0])),
    rules: existing?.rules ?? DEFAULT_RULES,
  });
  const [rule, setRule] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [leave, setLeave] = useState(false);
  const set = (k: keyof typeof f, v: (typeof f)[keyof typeof f]) => {
    setF({ ...f, [k]: v });
    setErr((e) => ({ ...e, [k]: "" }));
  };
  const n = words(f.about);
  const label = kind === "webinar" ? "Webinar" : "Competition";
  if (!d.verified)
    return (
      <div>
        <Header title={`Create ${label.toLowerCase()}`} onBack={a.back} />
        <Empty
          icon="lock"
          title="Verify your company first"
          body={`Students and professionals only see ${label.toLowerCase()}s from verified companies.`}
          action={<Btn onClick={() => a.replace({ name: "verify", id: "then-create" })}>Start verification</Btn>}
        />
      </div>
    );
  if (!existing && d.trials === 0)
    return (
      <div>
        <Header title={`Create ${label.toLowerCase()}`} onBack={a.back} />
        <Empty icon="star" title="No free trials left" body="You've used your free webinars. Upgrade to keep hosting." action={<Btn variant="navy" onClick={() => a.replace({ name: "premium" })}>See Premium</Btn>} />
      </div>
    );
  const submit = () => {
    const e: Record<string, string> = {};
    if (f.title.trim().length < 4) e.title = "Add a title (at least 4 characters).";
    if (n < 5) e.about = "Describe it in at least 5 words.";
    if (n > 50) e.about = "Keep it to 50 words or fewer.";
    if (!f.date) e.date = "Pick a date.";
    if (!f.time) e.time = "Pick a time.";
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setTimeout(() => {
      const date = new Date(f.date + "T00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      const [h, m] = f.time.split(":").map(Number);
      const time = `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"} onwards`;
      const w: Webinar = {
        id: existing?.id ?? uid(),
        title: f.title.trim(),
        host: d.profiles.company.name,
        poster: POSTERS[f.poster],
        about: f.about.trim(),
        date,
        time,
        guests: f.guests.split(",").map((g) => g.trim()).filter(Boolean),
        participants: existing?.participants ?? 0,
        status: "upcoming",
        kind,
        rules: f.rules,
        mine: true,
      };
      a.createWebinar(w);
      a.step("create-webinar");
      setBusy(false);
      if (existing) {
        a.toast("Changes saved");
        a.back();
      } else a.replace({ name: "event-created", id: w.id });
    }, 700);
  };
  return (
    <div className="relative">
      <Header title={existing ? `Edit ${label.toLowerCase()}` : `Enter ${label.toLowerCase()} details`} onBack={() => (f.title || f.about ? setLeave(true) : a.back())} />
      <div className="space-y-4 p-4">
        <Field label="Title" required error={err.title}>
          {(i, db) => <input id={i} aria-describedby={db} aria-invalid={!!err.title} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Innovations and Strategies at Walmart" className={inputCls(err.title)} />}
        </Field>
        <Field label={`About ${label.toLowerCase()}`} required error={err.about} hint={`${n}/50 words`}>
          {(i, db) => <textarea id={i} aria-describedby={db} aria-invalid={!!err.about} rows={4} value={f.about} onChange={(e) => set("about", e.target.value)} className={inputCls(err.about)} />}
        </Field>
        <Field label="Featured guests" hint="Separate names with commas">
          {(i, db) => <input id={i} aria-describedby={db} value={f.guests} onChange={(e) => set("guests", e.target.value)} placeholder="Matt Turner, Shruti Tiwari" className={inputCls()} />}
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" required error={err.date}>
            {(i, db) => <input id={i} aria-describedby={db} type="date" value={f.date} onChange={(e) => set("date", e.target.value)} className={inputCls(err.date)} />}
          </Field>
          <Field label="Time" required error={err.time}>
            {(i, db) => <input id={i} aria-describedby={db} type="time" value={f.time} onChange={(e) => set("time", e.target.value)} className={inputCls(err.time)} />}
          </Field>
        </div>
        <fieldset>
          <legend className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">Thumbnail</legend>
          <div className="flex gap-2">
            {POSTERS.map((p, i) => (
              <button key={p} type="button" aria-label={`Poster ${i + 1}`} aria-pressed={f.poster === i} onClick={() => set("poster", i)} className={`overflow-hidden rounded-lg ${f.poster === i ? "ring-2 ring-[#8F49CD]" : "ring-1 ring-[#E6E1EE]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p} alt="" className="h-20 w-16 object-cover" />
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <p className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">Rules</p>
          <ul className="space-y-1.5">
            {f.rules.map((r) => (
              <li key={r} className="flex items-start gap-2 rounded-xl bg-[#F7F3FC] px-3 py-2 text-[12px] text-[#55505E]">
                <span className="flex-1">{r}</span>
                <button type="button" aria-label="Remove rule" onClick={() => set("rules", f.rules.filter((x) => x !== r))} className="rounded-full p-0.5 text-[#6F6A78] hover:bg-white">
                  <Icon name="close" className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2">
            <label className="flex-1">
              <span className="sr-only">Add a rule</span>
              <input value={rule} onChange={(e) => setRule(e.target.value)} placeholder="Add a rule" className={inputCls()} />
            </label>
            <Btn
              variant="soft"
              disabled={!rule.trim()}
              onClick={() => {
                set("rules", [...f.rules, rule.trim()]);
                setRule("");
              }}
            >
              Add
            </Btn>
          </div>
        </div>
        <Btn size="lg" className="w-full" loading={busy} onClick={submit}>
          {existing ? "Save changes" : "Continue"}
        </Btn>
      </div>
      <Confirm open={leave} title="Discard this draft?" body="What you've entered will be lost." confirm="Discard" onConfirm={a.back} onClose={() => setLeave(false)} />
    </div>
  );
}

export function EventCreated({ id }: { id?: string }) {
  const { d, a } = useClab();
  const w = webinar(id, d);
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center px-6 py-10 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-[#E7DAFF] text-[#8F49CD]">
          <Icon name="sparkle" className="h-9 w-9" />
        </span>
        <p className="mt-5 text-[20px] font-bold text-[#3D1A6E]">Hurray! You have created a {w?.kind ?? "webinar"}</p>
        <p className="mt-2 text-[12.5px] text-[#6F6A78]">Go to My Webinar to see it. Students and professionals can now find it under Event.</p>
        <p className="mt-3 rounded-full bg-[#F7F3FC] px-3 py-1 text-[11.5px] font-medium text-[#63328D]">
          You have {d.trials} free {d.trials === 1 ? "trial" : "trials"} of webinar left
        </p>
        <Btn
          size="lg"
          className="mt-8 w-full"
          onClick={() => {
            a.step("view-my-webinar");
            a.tab("event");
            a.go({ name: "webinar", id });
          }}
        >
          Go to My Webinar
        </Btn>
        <Btn variant="ghost" className="mt-2 w-full" onClick={a.home}>
          Back to Home
        </Btn>
      </div>
    </div>
  );
}

export function MyWebinars() {
  const { d, a } = useClab();
  if (!d.myWebinars.length)
    return (
      <Empty
        icon="event"
        title="No webinars yet"
        body={d.verified ? "Create your first webinar. You have free trials left." : "Verify your company, then host your first webinar."}
        action={<Btn onClick={() => a.go(d.verified ? { name: "event-form", id: "new-webinar" } : { name: "verify", id: "then-create" })}>{d.verified ? "Create webinar" : "Verify company"}</Btn>}
      />
    );
  return (
    <div className="space-y-3 px-4 py-4">
      {d.myWebinars.map((w) => (
        <button
          key={w.id}
          type="button"
          onClick={() => {
            a.step("view-my-webinar");
            a.go({ name: "webinar", id: w.id });
          }}
          className={`${card} flex w-full gap-3 p-3 text-left transition-shadow hover:shadow-md`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.poster} alt="" className="h-24 w-20 shrink-0 rounded-lg object-cover" />
          <span className="min-w-0 flex-1">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#8F49CD]">My coming up {w.kind ?? "webinar"}</span>
            <span className="mt-0.5 block text-[13.5px] font-semibold text-[#3D1A6E]">{w.title}</span>
            <span className="block text-[11.5px] text-[#6F6A78]">
              {w.date} · {w.time}
            </span>
            <span className="mt-1 block text-[11.5px] font-medium text-[#3D1A6E]">Registered people: {w.participants}</span>
          </span>
        </button>
      ))}
      <Btn variant="soft" className="w-full" onClick={() => a.go({ name: "event-form", id: "new-webinar" })}>
        <Icon name="plus" className="h-4 w-4" /> Create another ({d.trials} free left)
      </Btn>
    </div>
  );
}

/** Owner actions on a webinar the company created. */
export function OwnerBar({ id }: { id: string }) {
  const { a } = useClab();
  const [del, setDel] = useState(false);
  return (
    <div className="sticky bottom-0 -mx-4 mt-6 border-t border-[#EFEAF5] bg-white/95 px-4 py-3 backdrop-blur">
      <div className="flex gap-2">
        <Btn variant="ghost" onClick={() => setDel(true)}>
          <Icon name="trash" className="h-4 w-4" /> Delete
        </Btn>
        <Btn className="flex-1" onClick={() => a.go({ name: "event-form", id })}>
          <Icon name="edit" className="h-4 w-4" /> Edit details
        </Btn>
      </div>
      <Confirm
        open={del}
        title="Delete this webinar?"
        body="People who registered will no longer see it. Free trials used aren't returned."
        confirm="Delete"
        onConfirm={() => {
          a.deleteWebinar(id);
          a.back();
          a.toast("Webinar deleted");
        }}
        onClose={() => setDel(false)}
      />
    </div>
  );
}

/* ---------------- Explore ---------------- */

export function Explore() {
  const { d, a } = useClab();
  const [draft, setDraft] = useState<Record<string, string>>({});
  return (
    <div>
      <Header />
      <div className="space-y-4 py-3">
        {d.posts.map((p) => {
          const liked = d.liked.includes(p.id);
          const saved = d.savedPosts.includes(p.id);
          return (
            <article key={p.id}>
              <div className="flex items-center gap-2.5 px-4 pb-2">
                <Avatar name={p.author} size={34} />
                <div className="flex-1">
                  <p className="text-[12.5px] font-semibold text-[#24212B]">{p.place}</p>
                  <p className="text-[11px] text-[#6F6A78]">{p.handle}</p>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.caption} className="aspect-[4/3] w-full object-cover" onDoubleClick={() => !liked && a.like(p.id)} />
              <div className="flex items-center gap-1 px-2 pt-1">
                <IconBtn icon="star" label={liked ? "Unlike" : "Like"} onClick={() => a.like(p.id)} className={liked ? "!text-[#8F49CD]" : ""} />
                <span className="text-[12px] font-medium text-[#3D1A6E]">{p.likes + (liked ? 1 : 0)}</span>
                <IconBtn icon="bookmark" label={saved ? "Unsave" : "Save"} onClick={() => a.savePost(p.id)} className={`ml-auto ${saved ? "!text-[#8F49CD]" : ""}`} />
              </div>
              <p className="px-4 text-[12.5px] text-[#24212B]">
                <span className="font-semibold">{p.handle}</span> {p.caption}
              </p>
              <p className="px-4 text-[11px] text-[#8D8896]">{p.when}</p>
              {p.comments.length > 0 && (
                <ul className="mt-1.5 space-y-0.5 px-4">
                  {p.comments.map((c, i) => (
                    <li key={i} className="text-[12px] text-[#24212B]">
                      <span className="font-semibold">you</span> {c}
                    </li>
                  ))}
                </ul>
              )}
              <form
                className="mt-2 flex gap-2 px-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const t = (draft[p.id] ?? "").trim();
                  if (!t) return;
                  a.comment(p.id, t);
                  setDraft({ ...draft, [p.id]: "" });
                }}
              >
                <label className="flex-1">
                  <span className="sr-only">Add a comment</span>
                  <input value={draft[p.id] ?? ""} onChange={(e) => setDraft({ ...draft, [p.id]: e.target.value })} placeholder="Add a comment" className={inputCls()} />
                </label>
                <Btn type="submit" variant="soft" disabled={!(draft[p.id] ?? "").trim()}>
                  Post
                </Btn>
              </form>
            </article>
          );
        })}
        <p className="px-4 pt-2 text-center text-[11.5px] text-[#8D8896]">You're all caught up.</p>
      </div>
    </div>
  );
}

/* ---------------- Company account ---------------- */

export function CompanyAccount() {
  const { d, a } = useClab();
  const me = d.profiles.company;
  const [tab, setTab] = useState<"posts" | "projects" | "competitions" | "webinars">("posts");
  const [reset, setReset] = useState(false);
  const comps = d.myWebinars.filter((w) => w.kind === "competition");
  const webs = d.myWebinars.filter((w) => w.kind !== "competition");
  return (
    <div className="relative min-h-full">
      <Header right={<IconBtn icon="settings" label="Settings" onClick={() => a.go({ name: "settings" })} />} title=" " />
      <div className="p-4">
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/logo-walmart.webp`} alt="" className="h-16 w-16 rounded-full" />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[17px] font-semibold text-[#3D1A6E]">
              {me.name}
              {d.verified && (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#8F49CD] text-white" title="Verified">
                  <Icon name="check" className="h-3 w-3" />
                </span>
              )}
            </p>
            <p className="text-[11.5px] uppercase tracking-wide text-[#55505E]">{me.headline}</p>
            <p className="text-[11.5px] font-semibold text-[#8F49CD]">{d.connections.length} Clabs</p>
          </div>
          <IconBtn icon="edit" label="Edit profile" onClick={() => a.go({ name: "edit-profile" })} />
        </div>
        {!d.verified && (
          <button type="button" onClick={() => a.go({ name: "verify" })} className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#FFF0C3] p-3.5 text-left">
            <Icon name="lock" className="h-5 w-5 text-[#3D1A6E]" />
            <span className="flex-1 text-[12.5px] text-[#3D1A6E]">
              <span className="block font-semibold">Verify your company</span>
              Needed before you can host webinars or competitions.
            </span>
            <Icon name="arrow" className="h-4 w-4 text-[#3D1A6E]" />
          </button>
        )}
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { key: "posts", label: "My Posts" },
          { key: "projects", label: "Projects" },
          { key: "competitions", label: "Competitions" },
          { key: "webinars", label: "Webinars" },
        ]}
        className="border-b border-[#EFEAF5] px-2"
      />
      {tab === "posts" && <Empty icon="mood" title="No post yet!" body="Posts you share appear here and in Explore." action={<Btn variant="soft" onClick={() => a.tab("explore")}>Open Explore</Btn>} />}
      {tab === "projects" && <Empty icon="folder" title="No projects yet" body="Companies collaborate with students and professionals through webinars and competitions." />}
      {tab === "competitions" &&
        (comps.length ? (
          <ListOf items={comps} />
        ) : (
          <Empty icon="star" title="No records found!" body="Competitions you host appear here." action={<Btn variant="soft" onClick={() => a.go(d.verified ? { name: "event-form", id: "new-competition" } : { name: "verify", id: "then-create" })}>Host a competition</Btn>} />
        ))}
      {tab === "webinars" &&
        (webs.length ? (
          <ListOf items={webs} />
        ) : (
          <Empty icon="event" title="No webinars yet" body="Webinars you host appear here." action={<Btn variant="soft" onClick={() => a.go(d.verified ? { name: "event-form", id: "new-webinar" } : { name: "verify", id: "then-create" })}>Host a webinar</Btn>} />
        ))}
      <div className="px-4 pb-6">
        <Btn variant="ghost" className="mt-2 w-full" onClick={() => setReset(true)}>
          <Icon name="reset" className="h-4 w-4" /> Reset prototype data
        </Btn>
      </div>
      <Confirm open={reset} title="Reset the prototype?" body="Everything made on this device goes back to the original sample data." confirm="Reset" onConfirm={a.reset} onClose={() => setReset(false)} />
    </div>
  );
}

function ListOf({ items }: { items: Webinar[] }) {
  const { a } = useClab();
  return (
    <ul className="space-y-2 p-4">
      {items.map((w) => (
        <li key={w.id}>
          <button type="button" onClick={() => a.go({ name: "webinar", id: w.id })} className={`${card} flex w-full items-center gap-3 p-2.5 text-left hover:shadow-md`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.poster} alt="" className="h-14 w-12 rounded-lg object-cover" />
            <span className="flex-1">
              <span className="block text-[13px] font-semibold text-[#3D1A6E]">{w.title}</span>
              <span className="block text-[11px] text-[#6F6A78]">
                {w.date} · {w.participants} registered
              </span>
            </span>
            <Icon name="arrow" className="h-4 w-4 text-[#8F49CD]" />
          </button>
        </li>
      ))}
    </ul>
  );
}
