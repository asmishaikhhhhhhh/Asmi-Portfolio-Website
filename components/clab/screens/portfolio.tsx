"use client";

import { useState } from "react";
import { A, COVERS, PORTFOLIO_ACCENTS, RECENT_PROJECTS, type Portfolio } from "../data";
import { uid, useClab } from "../store";
import { Btn, Confirm, Empty, Field, Header, Icon, IconBtn, card, inputCls } from "../ui";

/* ---------------- Portfolio list ---------------- */

export function PortfolioSection() {
  const { d, a } = useClab();
  const create = () => (d.premium ? a.go({ name: "portfolio-editor", id: "new" }) : a.go({ name: "premium" }));
  return (
    <div className="space-y-4 p-4">
      <button
        type="button"
        onClick={create}
        className="flex w-full flex-col items-center gap-1 rounded-2xl bg-[#C9ECF2] px-4 py-5 text-center transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-[#8F49CD]">
          <Icon name="plus" className="h-4 w-4" />
        </span>
        <span className="text-[13px] font-semibold text-[#003466]">Create portfolio from your CLAB projects</span>
        {!d.premium && (
          <span className="mt-0.5 flex items-center gap-1 text-[11px] text-[#003466]/70">
            <Icon name="lock" className="h-3 w-3" /> Included with CLAB Premium
          </span>
        )}
      </button>
      {d.portfolios.length === 0 ? (
        <Empty icon="folder" title="No portfolios yet" body="Pick projects you've done on CLAB and turn them into a portfolio in a few steps." />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {d.portfolios.map((p) => (
            <div key={p.id} className="relative">
              <button
                type="button"
                onClick={() => {
                  a.step("preview-portfolio");
                  a.go({ name: "portfolio-preview", id: p.id });
                }}
                className={`${card} block w-full overflow-hidden text-left transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={COVERS[p.cover]} alt="" className="h-20 w-full object-cover" />
                <span className="block px-2.5 py-2">
                  <span className="block truncate text-[12.5px] font-semibold text-[#3D1A6E]">{p.title}</span>
                  <span className="block text-[10.5px] text-[#6F6A78]">{p.projects.length} projects</span>
                </span>
              </button>
              <IconBtn
                icon="edit"
                label={`Edit ${p.title}`}
                onClick={() => (d.premium ? a.go({ name: "portfolio-editor", id: p.id }) : a.go({ name: "premium" }))}
                className="!absolute right-1 top-1 !h-8 !w-8 bg-white/80"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Premium + payment ---------------- */

export function Premium() {
  const { a } = useClab();
  return (
    <div className="flex min-h-full flex-col bg-[#E0DFFF]">
      <Header onBack={a.back} title=" " />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
        <h2 className="text-[30px] font-bold leading-tight text-[#3D1A6E]">Clab with Confidence!</h2>
        <p className="mt-2 text-[13px] text-[#3D1A6E]/80">Receive immediate insights for effective outreach, and turn your CLAB projects into portfolios.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/premium-art.webp`} alt="" className="mx-auto mt-6 w-full max-w-[300px]" />
        <ul className="mt-6 space-y-2 text-[12.5px] text-[#3D1A6E]">
          {["Generate portfolios from your projects", "Insights on profile views and impressions", "Priority access to webinars"].map((x) => (
            <li key={x} className="flex gap-2">
              <Icon name="check" className="h-4 w-4 text-[#8F49CD]" />
              {x}
            </li>
          ))}
        </ul>
        <Btn size="lg" className="mt-auto w-full" onClick={() => a.replace({ name: "payment" })}>
          Get started <Icon name="arrow" className="h-4 w-4" />
        </Btn>
      </div>
    </div>
  );
}

export function Payment() {
  const { d, a } = useClab();
  const [method, setMethod] = useState<"upi" | "card" | null>(null);
  const [upi, setUpi] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState<{ upi?: string; agree?: string }>({});
  const [busy, setBusy] = useState(false);
  const price = d.role === "student" ? "₹287 / month · Student" : "Monthly plan · Professional";
  const start = () => {
    const e: typeof err = {};
    if (!/^[\w.-]{2,}@[a-z]{2,}$/i.test(upi.trim())) e.upi = "Enter a UPI ID like name@bank.";
    if (!agree) e.agree = "Please agree to the terms to continue.";
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setTimeout(() => {
      a.premium();
      a.toast("Welcome to CLAB Premium (demo, no payment taken)");
      a.replace({ name: "portfolio-editor", id: "new" });
    }, 900);
  };
  return (
    <div>
      <Header title="CLAB Premium" onBack={a.back} />
      <div className="space-y-4 p-4">
        <p className="text-[12.5px] text-[#6F6A78]">Join now and make every collaboration count.</p>
        {!method ? (
          <div className={`${card} p-4`}>
            <p className="text-[15px] font-semibold text-[#003466]">Choose how to pay</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#6F6A78]">Your payment is encrypted and you can change your payment method at any time.</p>
            <div className="mt-4 space-y-2">
              <button type="button" onClick={() => setMethod("card")} className="flex w-full items-center justify-between rounded-xl border border-[#E2DCEB] px-3.5 py-3 text-[13px] text-[#24212B] hover:border-[#003466]">
                Credit / debit card <Icon name="arrow" className="h-4 w-4 text-[#003466]" />
              </button>
              <button type="button" onClick={() => setMethod("upi")} className="flex w-full items-center justify-between rounded-xl border border-[#E2DCEB] px-3.5 py-3 text-[13px] text-[#24212B] hover:border-[#003466]">
                UPI AutoPay <Icon name="arrow" className="h-4 w-4 text-[#003466]" />
              </button>
            </div>
          </div>
        ) : method === "card" ? (
          <div className={`${card} p-4`}>
            <p className="text-[15px] font-semibold text-[#003466]">Card payments</p>
            <p className="mt-1 text-[12.5px] text-[#6F6A78]">Card checkout isn't part of this prototype. UPI AutoPay shows the full flow.</p>
            <div className="mt-4 flex gap-2">
              <Btn variant="ghost" onClick={() => setMethod(null)}>
                Back
              </Btn>
              <Btn variant="navy" className="flex-1" onClick={() => setMethod("upi")}>
                Use UPI AutoPay
              </Btn>
            </div>
          </div>
        ) : (
          <div className={`${card} space-y-4 p-4`}>
            <p className="text-[15px] font-semibold text-[#003466]">Set up your UPI AutoPay</p>
            <Field label="UPI ID" required error={err.upi} hint="Demo only: nothing is charged or sent.">
              {(id, db) => (
                <input
                  id={id}
                  aria-describedby={db}
                  aria-invalid={!!err.upi}
                  value={upi}
                  onChange={(e) => {
                    setUpi(e.target.value);
                    setErr((x) => ({ ...x, upi: undefined }));
                  }}
                  placeholder="name@bank"
                  className={inputCls(err.upi)}
                />
              )}
            </Field>
            <div className="flex items-center justify-between rounded-xl bg-[#003466] px-4 py-3 text-[13px] font-semibold text-white">{price}</div>
            <label className="flex items-start gap-2 text-[11.5px] leading-snug text-[#6F6A78]">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setErr((x) => ({ ...x, agree: undefined }));
                }}
                className="mt-0.5 h-4 w-4 accent-[#003466]"
              />
              I agree that my membership continues until I cancel, and that the fee is charged monthly to this UPI ID.
            </label>
            {err.agree && <p className="-mt-2 text-[11px] text-[#C2362F]">{err.agree}</p>}
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => setMethod(null)}>
                Back
              </Btn>
              <Btn variant="navy" className="flex-1" loading={busy} onClick={start}>
                Start membership
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Portfolio editor + preview ---------------- */

export function PortfolioEditor({ id }: { id?: string }) {
  const { d, a } = useClab();
  const existing = d.portfolios.find((p) => p.id === id);
  const [f, setF] = useState<Portfolio>(
    existing ?? { id: uid(), title: "", heading: "", body: "", projects: [], accent: PORTFOLIO_ACCENTS[0], cover: 0, updatedAt: 0 },
  );
  const [picker, setPicker] = useState(!existing);
  const [err, setErr] = useState<{ title?: string; projects?: string }>({});
  const [busy, setBusy] = useState(false);
  const [del, setDel] = useState(false);
  const set = <K extends keyof Portfolio>(k: K, v: Portfolio[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    setErr((e) => ({ ...e, [k]: undefined }));
  };
  const save = (thenPreview: boolean) => {
    const e: typeof err = {};
    if (f.title.trim().length < 2) e.title = "Give your portfolio a title.";
    if (!f.projects.length) e.projects = "Add at least one project.";
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setTimeout(() => {
      a.savePortfolio({ ...f, heading: f.heading || f.title, updatedAt: Date.now() });
      a.step("edit-portfolio");
      setBusy(false);
      a.toast(existing ? "Portfolio updated" : "Portfolio created");
      if (thenPreview) {
        a.step("preview-portfolio");
        a.replace({ name: "portfolio-preview", id: f.id });
      } else a.back();
    }, 600);
  };

  return (
    <div className="relative min-h-full">
      <Header
        title={existing ? existing.title : "New portfolio"}
        onBack={a.back}
        right={existing ? <IconBtn icon="trash" label="Delete portfolio" onClick={() => setDel(true)} /> : undefined}
      />
      {picker ? (
        <div className="p-4">
          <div className={`${card} p-4`}>
            <p className="text-[15px] font-semibold text-[#003466]">Select projects</p>
            <p className="mt-1 text-[12px] text-[#6F6A78]">Select the projects you want to add to your CLAB portfolio.</p>
            <p className="mt-4 text-[12px] font-semibold text-[#003466]">Recent projects</p>
            <ul className="mt-2 space-y-1">
              {RECENT_PROJECTS.map((p) => (
                <li key={p}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 text-[13px] text-[#24212B] hover:bg-[#F7F3FC]">
                    <input
                      type="checkbox"
                      checked={f.projects.includes(p)}
                      onChange={() => set("projects", f.projects.includes(p) ? f.projects.filter((x) => x !== p) : [...f.projects, p])}
                      className="h-4 w-4 accent-[#003466]"
                    />
                    {p}
                  </label>
                </li>
              ))}
            </ul>
            {err.projects && <p className="mt-1 text-[11px] text-[#C2362F]">{err.projects}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <Btn variant="ghost" onClick={a.back}>
                Cancel
              </Btn>
              <Btn
                variant="navy"
                onClick={() => {
                  if (!f.projects.length) return setErr({ projects: "Add at least one project." });
                  setPicker(false);
                }}
              >
                Add projects
              </Btn>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 p-4">
          <Field label="Portfolio title" required error={err.title}>
            {(id, db) => <input id={id} aria-describedby={db} aria-invalid={!!err.title} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Clab Portfolio 2" className={inputCls(err.title)} />}
          </Field>
          <Field label="Sub-heading">
            {(id) => <input id={id} value={f.heading} onChange={(e) => set("heading", e.target.value)} placeholder="Industrial design · Portfolio" className={inputCls()} />}
          </Field>
          <Field label="Introduction" hint={`${f.body.length}/240`}>
            {(id, db) => <textarea id={id} aria-describedby={db} rows={3} maxLength={240} value={f.body} onChange={(e) => set("body", e.target.value)} placeholder="A line about you and the work inside" className={inputCls()} />}
          </Field>
          <fieldset>
            <legend className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">Cover</legend>
            <div className="grid grid-cols-3 gap-2">
              {COVERS.map((c, i) => (
                <button key={c} type="button" aria-label={`Cover ${i + 1}`} aria-pressed={f.cover === i} onClick={() => set("cover", i)} className={`overflow-hidden rounded-xl ${f.cover === i ? "ring-2 ring-[#8F49CD]" : "ring-1 ring-[#E6E1EE]"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c} alt="" className="h-14 w-full object-cover" />
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-1.5 text-[12px] font-medium text-[#3D1A6E]">Accent</legend>
            <div className="flex gap-2">
              {PORTFOLIO_ACCENTS.map((c) => (
                <button key={c} type="button" aria-label={`Accent ${c}`} aria-pressed={f.accent === c} onClick={() => set("accent", c)} className={`h-8 w-8 rounded-full ${f.accent === c ? "ring-2 ring-offset-2 ring-[#3D1A6E]" : ""}`} style={{ background: c }} />
              ))}
            </div>
          </fieldset>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#3D1A6E]">Projects · {f.projects.length}</p>
              <button type="button" onClick={() => setPicker(true)} className="text-[12px] font-semibold text-[#8F49CD] hover:underline">
                Change
              </button>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {f.projects.map((p) => (
                <span key={p} className="rounded-full bg-[#F0E5FA] px-3 py-1 text-[12px] text-[#63328D]">
                  {p}
                </span>
              ))}
            </div>
            {err.projects && <p className="mt-1 text-[11px] text-[#C2362F]">{err.projects}</p>}
          </div>
          <div className="flex gap-2 pt-2">
            <Btn variant="ghost" className="flex-1" loading={busy} onClick={() => save(false)}>
              Save
            </Btn>
            <Btn className="flex-1" loading={busy} onClick={() => save(true)}>
              Save and preview
            </Btn>
          </div>
        </div>
      )}
      <Confirm
        open={del}
        title="Delete this portfolio?"
        body="Your CLAB projects stay. Only this portfolio is removed."
        confirm="Delete"
        onConfirm={() => {
          a.deletePortfolio(f.id);
          a.back();
          a.toast("Portfolio deleted");
        }}
        onClose={() => setDel(false)}
      />
    </div>
  );
}

export function PortfolioPreview({ id }: { id?: string }) {
  const { d, a } = useClab();
  const p = d.portfolios.find((x) => x.id === id);
  const me = d.profiles[d.role];
  if (!p) return <Empty icon="folder" title="Portfolio not found" body="It may have been deleted." action={<Btn variant="soft" onClick={a.back}>Go back</Btn>} />;
  return (
    <div>
      <Header title={p.title} onBack={a.back} right={<Btn size="sm" variant="soft" onClick={() => (d.premium ? a.go({ name: "portfolio-editor", id: p.id }) : a.go({ name: "premium" }))}>Edit</Btn>} />
      <div className="p-4">
        <div className="overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(61,26,110,.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COVERS[p.cover]} alt="" className="h-36 w-full object-cover" />
          <div className="p-4" style={{ background: `color-mix(in oklab, ${p.accent} 8%, white)` }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: p.accent }}>
              {me.name}
            </p>
            <h3 className="mt-1 text-[20px] font-bold leading-tight text-[#24212B]">{p.heading || p.title}</h3>
            {p.body && <p className="mt-2 text-[12.5px] leading-relaxed text-[#55505E]">{p.body}</p>}
          </div>
          <ol className="divide-y divide-[#EFEAF5] bg-white">
            {p.projects.map((x, i) => (
              <li key={x} className="flex items-center gap-3 p-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[12px] font-bold text-white" style={{ background: p.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[13px] font-semibold text-[#3D1A6E]">{x}</span>
                <span className="text-[11px] text-[#8D8896]">CLAB project</span>
              </li>
            ))}
          </ol>
        </div>
        <Btn className="mt-4 w-full" variant="ghost" onClick={() => a.go({ name: "section", section: "portfolio" })}>
          Back to Portfolio
        </Btn>
      </div>
    </div>
  );
}

/* ---------------- Resume ---------------- */

export function ResumeSection() {
  const { d, a } = useClab();
  const me = d.profiles[d.role];
  return (
    <div className="space-y-4 p-4">
      <div className={`${card} p-4`}>
        <p className="text-[18px] font-semibold text-[#3D1A6E]">{me.name}</p>
        <p className="text-[12.5px] text-[#63328D]">
          {me.headline} · {me.location}
        </p>
        <p className="mt-3 text-[12.5px] leading-relaxed text-[#55505E]">{me.about}</p>
        <p className="mt-4 text-[12px] font-semibold text-[#3D1A6E]">Experience</p>
        <ul className="mt-1 space-y-1">
          {me.experience.map((x) => (
            <li key={x} className="flex gap-2 text-[12.5px] text-[#55505E]">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8F49CD]" />
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] font-semibold text-[#3D1A6E]">Skills</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {me.skills.map((s) => (
            <span key={s} className="rounded-full bg-[#F0E5FA] px-3 py-1 text-[12px] text-[#63328D]">
              {s}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[11.5px] text-[#6F6A78]">Your resume is built from your profile, so it's always up to date.</p>
      <Btn className="w-full" onClick={() => a.go({ name: "edit-profile" })}>
        <Icon name="edit" className="h-4 w-4" /> Edit details
      </Btn>
    </div>
  );
}
