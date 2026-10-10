"use client";

import { useState } from "react";
import { COMPANIES, PEOPLE, WEBINARS, type Profile } from "../data";
import { useClab } from "../store";
import { Avatar, Btn, Confirm, Field, Header, Icon, card, inputCls } from "../ui";

export function Account() {
  const { d, a } = useClab();
  const me = d.profiles[d.role];
  const [reset, setReset] = useState(false);
  const cards = [...COMPANIES, ...PEOPLE];
  const rows = [
    { icon: "edit", label: "Edit profile", go: () => a.go({ name: "edit-profile" }) },
    { icon: "resume", label: "Resume", go: () => a.go({ name: "section", section: "resume" }) },
    { icon: "folder", label: "Portfolios", go: () => a.go({ name: "section", section: "portfolio" }) },
    { icon: "settings", label: "Settings", go: () => a.go({ name: "settings" }) },
  ];
  return (
    <div className="relative min-h-full">
      <Header />
      <div className="p-4">
        <div className="flex items-center gap-3.5">
          <Avatar name={me.name} size={64} />
          <div className="min-w-0 flex-1">
            <p className="text-[17px] font-semibold text-[#3D1A6E]">{me.name}</p>
            <p className="text-[12.5px] text-[#63328D]">{me.headline}</p>
            <p className="text-[11.5px] text-[#6F6A78]">
              {d.connections.length} Clabs · {d.role === "student" ? "Student" : "Working professional"}
              {d.premium && " · Premium"}
            </p>
          </div>
        </div>

        <div className={`${card} mt-4 grid grid-cols-2 divide-x divide-[#EFEAF5]`}>
          <div className="p-3.5">
            <p className="text-[20px] font-semibold text-[#3D1A6E]">98</p>
            <p className="text-[11px] text-[#6F6A78]">Post impressions · past 7 days</p>
          </div>
          <div className="p-3.5">
            <p className="text-[20px] font-semibold text-[#3D1A6E]">49</p>
            <p className="text-[11px] text-[#6F6A78]">Profile viewers · past 90 days</p>
          </div>
        </div>
        <p className="mt-1.5 text-[10.5px] text-[#8D8896]">Sample analytics, as in the design. Private to you.</p>

        <ul className={`${card} mt-4 divide-y divide-[#EFEAF5]`}>
          {rows.map((r) => (
            <li key={r.label}>
              <button type="button" onClick={r.go} className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[13px] text-[#24212B] hover:bg-[#F7F3FC]">
                <Icon name={r.icon} className="h-5 w-5 text-[#8F49CD]" />
                <span className="flex-1">{r.label}</span>
                <Icon name="arrow" className="h-4 w-4 text-[#BFB4CF]" />
              </button>
            </li>
          ))}
        </ul>

        <section className="mt-5">
          <h3 className="text-[14px] font-semibold text-[#3D1A6E]">Saved profiles</h3>
          {d.saved.length === 0 ? (
            <p className="mt-1 text-[12.5px] text-[#6F6A78]">Profiles you save on Home appear here.</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {d.saved.map((id) => {
                const c = cards.find((x) => x.id === id)!;
                return (
                  <button key={id} type="button" onClick={() => a.go({ name: "profile", id })} className="flex items-center gap-2 rounded-full bg-[#F7F3FC] py-1 pl-1 pr-3 text-[12px] text-[#3D1A6E] hover:bg-[#F0E5FA]">
                    <Avatar src={"photo" in c ? c.photo : c.logo} name={c.name} size={26} />
                    {c.name}
                  </button>
                );
              })}
            </div>
          )}
        </section>
        <section className="mt-5">
          <h3 className="text-[14px] font-semibold text-[#3D1A6E]">My webinars</h3>
          {d.registered.length === 0 ? (
            <p className="mt-1 text-[12.5px] text-[#6F6A78]">
              Not registered for any yet.{" "}
              <button type="button" onClick={() => a.tab("event")} className="font-semibold text-[#8F49CD] hover:underline">
                Browse webinars
              </button>
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {d.registered.map((id) => {
                const w = WEBINARS.find((x) => x.id === id)!;
                return (
                  <li key={id}>
                    <button type="button" onClick={() => a.go({ name: "webinar", id })} className="flex w-full items-center gap-2 text-left text-[12.5px] text-[#3D1A6E] hover:underline">
                      <Icon name="event" className="h-4 w-4 text-[#8F49CD]" />
                      {w.title} · {w.date}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <Btn variant="ghost" className="mt-6 w-full" onClick={() => setReset(true)}>
          <Icon name="reset" className="h-4 w-4" /> Reset prototype data
        </Btn>
      </div>
      <Confirm open={reset} title="Reset the prototype?" body="Projects, portfolios, registrations and profile edits made on this device will go back to the original sample data." confirm="Reset" onConfirm={a.reset} onClose={() => setReset(false)} />
    </div>
  );
}

export function EditProfile() {
  const { d, a } = useClab();
  const [f, setF] = useState<Profile>(d.profiles[d.role]);
  const [skill, setSkill] = useState("");
  const [err, setErr] = useState<{ name?: string; headline?: string }>({});
  const [busy, setBusy] = useState(false);
  const save = () => {
    const e: typeof err = {};
    if (f.name.trim().length < 2) e.name = "Enter your name.";
    if (!f.headline.trim()) e.headline = "Add a short headline.";
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setTimeout(() => {
      a.profile({ ...f, name: f.name.trim(), headline: f.headline.trim() });
      a.toast("Profile updated");
      a.back();
    }, 500);
  };
  const addSkill = () => {
    const s = skill.trim();
    if (s && !f.skills.includes(s)) setF({ ...f, skills: [...f.skills, s] });
    setSkill("");
  };
  return (
    <div>
      <Header title="Edit profile" onBack={a.back} />
      <div className="space-y-4 p-4">
        <Field label="Name" required error={err.name}>
          {(id, db) => <input id={id} aria-describedby={db} aria-invalid={!!err.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inputCls(err.name)} />}
        </Field>
        <Field label="Headline" required error={err.headline}>
          {(id, db) => <input id={id} aria-describedby={db} aria-invalid={!!err.headline} value={f.headline} onChange={(e) => setF({ ...f, headline: e.target.value })} className={inputCls(err.headline)} />}
        </Field>
        <Field label="Location">{(id) => <input id={id} value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} className={inputCls()} />}</Field>
        <Field label="About">{(id) => <textarea id={id} rows={3} value={f.about} onChange={(e) => setF({ ...f, about: e.target.value })} className={inputCls()} />}</Field>
        <div>
          <p className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {f.skills.map((s) => (
              <span key={s} className="flex items-center gap-1 rounded-full bg-[#F0E5FA] py-1 pl-3 pr-1 text-[12px] text-[#63328D]">
                {s}
                <button type="button" aria-label={`Remove ${s}`} onClick={() => setF({ ...f, skills: f.skills.filter((x) => x !== s) })} className="rounded-full p-0.5 hover:bg-white">
                  <Icon name="close" className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <label className="flex-1">
              <span className="sr-only">Add a skill</span>
              <input value={skill} onChange={(e) => setSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add a skill" className={inputCls()} />
            </label>
            <Btn variant="soft" onClick={addSkill} disabled={!skill.trim()}>
              Add
            </Btn>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Btn variant="ghost" onClick={a.back}>
            Cancel
          </Btn>
          <Btn className="flex-1" loading={busy} onClick={save}>
            Save profile
          </Btn>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const { d, a } = useClab();
  const toggles: { k: keyof typeof d.notifications; label: string }[] = [
    { k: "webinars", label: "Webinar reminders" },
    { k: "projects", label: "Project updates and join requests" },
    { k: "messages", label: "Messages" },
  ];
  return (
    <div>
      <Header title="Settings" onBack={a.back} />
      <div className="space-y-5 p-4">
        <section>
          <h3 className="text-[13px] font-semibold text-[#3D1A6E]">Notifications</h3>
          <ul className={`${card} mt-2 divide-y divide-[#EFEAF5]`}>
            {toggles.map((t) => {
              const on = d.notifications[t.k];
              return (
                <li key={t.k} className="flex items-center justify-between px-4 py-3 text-[13px] text-[#24212B]">
                  {t.label}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={t.label}
                    onClick={() => a.notify(t.k)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-[#8F49CD]" : "bg-[#D9D4E0]"}`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${on ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3 className="text-[13px] font-semibold text-[#3D1A6E]">Profile visibility</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                ["everyone", "Everyone on CLAB"],
                ["connections", "Only my Clabs"],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={d.visibility === v}
                onClick={() => a.visibility(v)}
                className={`rounded-xl border p-3 text-left text-[12.5px] transition-colors ${d.visibility === v ? "border-[#8F49CD] bg-[#F7F3FC] text-[#3D1A6E]" : "border-[#E2DCEB] text-[#6F6A78]"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-[13px] font-semibold text-[#3D1A6E]">Membership</h3>
          <div className={`${card} mt-2 flex items-center justify-between p-4`}>
            <span className="text-[13px] text-[#24212B]">{d.premium ? "CLAB Premium · active (demo)" : "Free plan"}</span>
            {!d.premium && (
              <Btn size="sm" variant="navy" onClick={() => a.go({ name: "premium" })}>
                Upgrade
              </Btn>
            )}
          </div>
        </section>
        <p className="text-[10.5px] text-[#8D8896]">Version 9.29.8781 · Prototype settings are saved on this device.</p>
      </div>
    </div>
  );
}
