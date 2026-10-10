"use client";

import { useMemo, useState } from "react";
import { COMPANIES, DAYS, HOME_TABS, PEOPLE, WEBINARS, type Card, type Company, type Person } from "../data";
import { useClab, webinar } from "../store";
import { Avatar, Btn, Empty, Header, Icon, IconBtn, Segmented, Tabs, card, inputCls } from "../ui";
import { MyWebinars, OwnerBar } from "./company";

const ALL: Card[] = [...COMPANIES, ...PEOPLE];
const findCard = (id?: string) => ALL.find((c) => c.id === id);

/* ---------------- Home ---------------- */

export function Home() {
  const { d, a } = useClab();
  const tabs = HOME_TABS[d.role];
  const [tab, setTab] = useState<Card["kind"]>(tabs[0].key);
  const [q, setQ] = useState("");
  const [day, setDay] = useState("31 Aug");
  const kind = tabs.some((t) => t.key === tab) ? tab : tabs[0].key;

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ALL.filter((c) => c.kind === kind && !d.dismissed.includes(c.id)).filter(
      (c) => !s || c.name.toLowerCase().includes(s) || c.skills.some((k) => k.toLowerCase().includes(s)) || ("title" in c && c.title.toLowerCase().includes(s)),
    );
  }, [kind, q, d.dismissed]);

  const tasks = d.projects.flatMap((p) => (p.tools.tracker ?? []).filter((t) => t.due === day).map((t) => ({ ...t, project: p })));
  const dayWebinars = WEBINARS.filter((w) => d.registered.includes(w.id) && w.date.startsWith(day));
  const unread = d.registered.length + d.connections.length;

  return (
    <div>
      <Header />
      <div className="px-4 pt-3">
        <div className="flex items-center gap-1.5">
          <label className="relative flex-1">
            <span className="sr-only">Search people</span>
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F49CD]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people or skills" className={`${inputCls()} pl-9`} />
            {q && (
              <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#6F6A78] hover:bg-[#F0E5FA]">
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            )}
          </label>
          <IconBtn icon="activity" label="Activity" badge={unread} onClick={() => a.go({ name: "activity" })} />
          <IconBtn icon="message" label="Messages" onClick={() => a.go({ name: "messages" })} />
        </div>

        {/* Day pills */}
        <div className="mt-4 flex justify-center gap-5" role="radiogroup" aria-label="Day">
          {DAYS.map((x) => {
            const on = x.id === day;
            const count = d.projects.reduce((n, p) => n + (p.tools.tracker ?? []).filter((t) => t.due === x.id && !t.done).length, 0);
            return (
              <button
                key={x.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setDay(x.id)}
                className={`flex h-[72px] w-14 flex-col items-center justify-center rounded-full transition-colors ${on ? "bg-[#E7DAFF] text-[#3D1A6E]" : "bg-[#F1EFF4] text-[#8D8896] hover:bg-[#EAE5F0]"}`}
              >
                <span className="text-[15px] font-semibold leading-none">{x.label}</span>
                <span className="text-[11px] font-medium">{x.month}</span>
                {count > 0 && <span className="mt-1 text-[9.5px] font-semibold">{count} tasks</span>}
                {x.today && !count && <span className="mt-1 text-[9.5px] font-semibold">Today</span>}
              </button>
            );
          })}
        </div>
        <div className="mt-3 rounded-2xl bg-[#F7F3FC] px-4 py-3" aria-live="polite">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8F49CD]">{day}</p>
          {tasks.length === 0 && dayWebinars.length === 0 ? (
            <p className="mt-1 text-[12.5px] text-[#6F6A78]">Nothing planned. Register for a webinar or add tasks in a project tracker.</p>
          ) : (
            <ul className="mt-1.5 space-y-1">
              {dayWebinars.map((w) => (
                <li key={w.id}>
                  <button type="button" onClick={() => a.go({ name: "webinar", id: w.id })} className="flex w-full items-center gap-2 text-left text-[12.5px] text-[#3D1A6E] hover:underline">
                    <Icon name="event" className="h-3.5 w-3.5 text-[#8F49CD]" /> {w.title} · {w.time}
                  </button>
                </li>
              ))}
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center gap-2 text-[12.5px]">
                  <button
                    type="button"
                    aria-label={t.done ? `Mark ${t.text} not done` : `Mark ${t.text} done`}
                    onClick={() => a.toolItems(t.project.id, "tracker", (items) => items.map((i) => (i.id === t.id ? { ...i, done: !i.done } : i)))}
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${t.done ? "border-[#8F49CD] bg-[#8F49CD] text-white" : "border-[#BFB4CF] bg-white"}`}
                  >
                    {t.done && <Icon name="check" className="h-3 w-3" />}
                  </button>
                  <span className={t.done ? "text-[#A39DAE] line-through" : "text-[#24212B]"}>{t.text}</span>
                  <span className="ml-auto truncate text-[11px] text-[#8D8896]">{t.project.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Tabs value={kind} onChange={setTab} items={tabs} className="mt-4 border-b border-[#EFEAF5]" />
      </div>

      <div className="space-y-3 px-4 py-4">
        {list.length === 0 ? (
          <Empty
            icon="search"
            title={q ? `No matches for “${q}”` : "You're all caught up"}
            body={q ? "Try a name or a skill, like Leadership or SEO." : "You dismissed every card here. Bring them back to keep exploring."}
            action={
              q ? (
                <Btn variant="soft" onClick={() => setQ("")}>
                  Clear search
                </Btn>
              ) : (
                <Btn variant="soft" onClick={() => ALL.filter((c) => c.kind === kind && d.dismissed.includes(c.id)).forEach((c) => a.dismiss(c.id))}>
                  Show dismissed
                </Btn>
              )
            }
          />
        ) : (
          list.map((c) => <ProfileCard key={c.id} c={c} />)
        )}
      </div>
    </div>
  );
}

function ProfileCard({ c }: { c: Card }) {
  const { d, a } = useClab();
  const connected = d.connections.includes(c.id);
  const saved = d.saved.includes(c.id);
  const open = () => {
    a.step("open-card");
    a.go({ name: "profile", id: c.id });
  };
  return (
    <article className={`${card} relative p-3.5`}>
      <button
        type="button"
        aria-label={`Dismiss ${c.name}`}
        onClick={() => {
          a.dismiss(c.id);
          a.toast(`${c.name} hidden`, () => a.dismiss(c.id));
        }}
        className="absolute right-2 top-2 rounded-full p-1.5 text-[#6F6A78] hover:bg-[#F0E5FA]"
      >
        <Icon name="close" className="h-4 w-4" />
      </button>
      <div className="flex gap-3.5">
        <button type="button" onClick={open} className="shrink-0 overflow-hidden rounded-xl" aria-label={`Open ${c.name}`}>
          {c.kind === "company" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(c as Company).logo} alt="" className="h-24 w-24 bg-white object-contain" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(c as Person).photo} alt="" className="h-24 w-24 object-cover" />
          )}
        </button>
        <div className="min-w-0 flex-1 pr-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-semibold text-[#3D1A6E]">{c.name}</h3>
            <button type="button" onClick={open} className="rounded-full bg-[#8F49CD] px-2.5 py-0.5 text-[10px] font-semibold text-white hover:bg-[#7E3CBB]">
              View full profile
            </button>
          </div>
          <p className="mt-1 border-t border-[#EFEAF5] pt-1.5 text-[11.5px] text-[#63328D]">{c.kind === "company" ? (c as Company).location : (c as Person).title}</p>
          <p className="mt-2 text-[11px] font-semibold text-[#3D1A6E]">{c.kind === "company" ? "Skills required" : "Skills"}</p>
          <ul className="mt-1 flex flex-wrap gap-1">
            {c.skills.slice(0, 4).map((s) => (
              <li key={s} className="rounded-full bg-[#F7F3FC] px-2 py-0.5 text-[10.5px] text-[#55505E]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 flex gap-2 border-t border-[#EFEAF5] pt-3">
        <Btn
          size="sm"
          variant={connected ? "soft" : "primary"}
          className="flex-1"
          onClick={() => {
            a.connect(c.id);
            a.toast(connected ? `Request to ${c.name} withdrawn` : `Clab request sent to ${c.name}`);
          }}
        >
          <Icon name={connected ? "check" : "clab"} className="h-4 w-4" />
          {connected ? "Requested" : "Clab"}
        </Btn>
        <Btn size="sm" variant="ghost" className="flex-1" aria-pressed={saved} onClick={() => a.save(c.id)}>
          <Icon name="bookmark" className="h-4 w-4" fill={saved} />
          {saved ? "Saved" : "Save profile"}
        </Btn>
      </div>
    </article>
  );
}

/* ---------------- Full profile ---------------- */

export function ProfileDetail({ id }: { id?: string }) {
  const { d, a } = useClab();
  const c = findCard(id);
  if (!c) return <Missing />;
  const connected = d.connections.includes(c.id);
  const saved = d.saved.includes(c.id);
  const related = c.kind === "company" ? WEBINARS.filter((w) => w.host === c.name && w.status !== "previous") : [];
  return (
    <div>
      <Header title={c.name} onBack={a.back} />
      <div className="px-4 py-4">
        <div className="flex items-center gap-4">
          {c.kind === "company" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(c as Company).logo} alt="" className="h-20 w-20 rounded-2xl border border-[#ECE6F3] bg-white object-contain" />
          ) : (
            <Avatar src={(c as Person).photo} name={c.name} size={80} />
          )}
          <div>
            <p className="text-[18px] font-semibold text-[#3D1A6E]">{c.name}</p>
            <p className="text-[12.5px] text-[#63328D]">{c.kind === "company" ? (c as Company).location : (c as Person).title}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Btn className="flex-1" variant={connected ? "soft" : "primary"} onClick={() => a.connect(c.id)}>
            <Icon name={connected ? "check" : "clab"} className="h-4 w-4" />
            {connected ? "Requested" : "Clab"}
          </Btn>
          <Btn className="flex-1" variant="ghost" onClick={() => a.save(c.id)}>
            <Icon name="bookmark" className="h-4 w-4" fill={saved} />
            {saved ? "Saved" : "Save"}
          </Btn>
        </div>
        <Section title="About">
          <p className="text-[13px] leading-relaxed text-[#55505E]">{c.about}</p>
        </Section>
        {"experience" in c && (
          <Section title="Experience">
            <ul className="space-y-1.5">
              {c.experience.map((x) => (
                <li key={x} className="flex gap-2 text-[13px] text-[#55505E]">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8F49CD]" />
                  {x}
                </li>
              ))}
            </ul>
          </Section>
        )}
        <Section title={c.kind === "company" ? "Skills required" : "Skills"}>
          <div className="flex flex-wrap gap-1.5">
            {c.skills.map((s) => (
              <span key={s} className="rounded-full bg-[#F0E5FA] px-3 py-1 text-[12px] text-[#63328D]">
                {s}
              </span>
            ))}
          </div>
        </Section>
        {c.kind === "company" && (
          <Section title={`Webinars by ${c.name}`}>
            {related.length ? (
              related.map((w) => <WebinarRow key={w.id} id={w.id} />)
            ) : (
              <div className="rounded-2xl bg-[#F7F3FC] p-4">
                <p className="text-[12.5px] text-[#6F6A78]">No webinars from {c.name} right now.</p>
                <Btn size="sm" variant="soft" className="mt-3" onClick={() => a.tab("event")}>
                  Browse all webinars
                </Btn>
              </div>
            )}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 text-[14px] font-semibold text-[#3D1A6E]">{title}</h3>
      {children}
    </section>
  );
}

function WebinarRow({ id }: { id: string }) {
  const { d, a } = useClab();
  const w = webinar(id, d)!;
  return (
    <button
      type="button"
      onClick={() => {
        a.step("open-webinar");
        a.go({ name: "webinar", id });
      }}
      className={`${card} flex w-full items-center gap-3 p-2.5 text-left transition-shadow hover:shadow-md`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={w.poster} alt="" className="h-14 w-14 rounded-lg object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-[#3D1A6E]">{w.title}</span>
        <span className="block text-[11.5px] text-[#6F6A78]">
          {w.date} · {w.time}
        </span>
      </span>
      {d.registered.includes(id) ? <span className="rounded-full bg-[#D0FFD8] px-2 py-0.5 text-[10px] font-semibold text-[#1F6B33]">Registered</span> : <Icon name="arrow" className="h-4 w-4 text-[#8F49CD]" />}
    </button>
  );
}

/* ---------------- Events ---------------- */

export function Events() {
  const { d, a } = useClab();
  const [kind, setKind] = useState<"webinar" | "competition">("webinar");
  const company = d.role === "company";
  const [sub, setSub] = useState<"ongoing" | "foryou" | "previous" | "mine">(company ? "mine" : "foryou");
  const all = [...d.myWebinars, ...WEBINARS];
  const list = all.filter((w) => (kind === "competition" ? w.kind === "competition" : w.kind !== "competition")).filter((w) =>
    sub === "ongoing" ? w.status === "ongoing" : sub === "previous" ? w.status === "previous" : w.status !== "previous",
  );
  return (
    <div>
      <Header />
      <div className="px-4 pt-3">
        <Segmented
          value={kind}
          onChange={setKind}
          items={[
            { key: "webinar", label: "Webinar" },
            { key: "competition", label: "Competition" },
          ]}
        />
      </div>
      {kind === "competition" && list.length === 0 ? (
        <Empty
          icon="star"
          title="No competitions open"
          body={company ? "Host a competition and students and professionals can form teams to take part." : "Companies post competitions here. You can form a team and take part without leaving CLAB."}
          action={
            company ? (
              <Btn onClick={() => a.go(d.verified ? { name: "event-form", id: "new-competition" } : { name: "verify", id: "then-create" })}>Host a competition</Btn>
            ) : (
              <Btn variant="soft" onClick={() => setKind("webinar")}>
                Browse webinars
              </Btn>
            )
          }
        />
      ) : (
        <>
          <Tabs
            value={sub}
            onChange={setSub}
            items={[
              { key: "ongoing", label: "Ongoing" },
              { key: "foryou", label: "For you" },
              { key: "previous", label: "Previous" },
              ...(company ? [{ key: "mine" as const, label: "My webinar" }] : []),
            ]}
            className="mt-4 border-b border-[#EFEAF5] px-4"
          />
          {sub === "mine" ? (
            <MyWebinars />
          ) : (
          <div className="space-y-3 px-4 py-4">
            {sub === "previous" ? (
              <div className={`${card} divide-y divide-[#EFEAF5]`}>
                <p className="px-4 py-3 text-[15px] font-semibold text-[#3D1A6E]">Previous webinar</p>
                {list.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => a.go({ name: "webinar", id: w.id })}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-[13px] text-[#3D1A6E] hover:bg-[#F7F3FC]"
                  >
                    {w.title}
                    <span className="flex items-center gap-1 text-[11px] text-[#63328D]">
                      View summary <Icon name="arrow" className="h-3.5 w-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              list.map((w) => {
                const reg = d.registered.includes(w.id);
                return (
                  <article key={w.id} className={`${card} p-3.5`}>
                    <h3 className="text-[13.5px] font-semibold text-[#3D1A6E]">{w.title}</h3>
                    <div className="mt-2.5 flex gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.poster} alt="" className="h-36 w-28 shrink-0 rounded-lg object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="text-[12px] font-semibold text-[#3D1A6E]">About</p>
                        <p className="mt-0.5 line-clamp-4 text-[11.5px] leading-snug text-[#55505E]">{w.about}</p>
                        <p className="mt-auto pt-2 text-[11px] font-medium text-[#3D1A6E]">
                          {w.status === "ongoing" ? (
                            <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-[#FFE2E0] px-1.5 py-0.5 text-[9.5px] font-bold uppercase text-[#C2362F]">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C2362F]" /> Live
                            </span>
                          ) : null}
                          Participants: {w.participants + (reg ? 1 : 0)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Btn
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          a.step("open-webinar");
                          a.go({ name: "webinar", id: w.id });
                        }}
                      >
                        Details
                      </Btn>
                      <Btn
                        size="sm"
                        variant={reg ? "soft" : "primary"}
                        className="flex-1"
                        onClick={() => {
                          a.step("open-webinar");
                          a.go({ name: "webinar", id: w.id });
                        }}
                      >
                        {reg ? (
                          <>
                            <Icon name="check" className="h-4 w-4" /> Registered
                          </>
                        ) : w.status === "ongoing" ? (
                          "Join now"
                        ) : (
                          "Register"
                        )}
                      </Btn>
                    </div>
                  </article>
                );
              })
            )}
          </div>
          )}
        </>
      )}
    </div>
  );
}

export function WebinarDetail({ id }: { id?: string }) {
  const { d, a } = useClab();
  const w = webinar(id, d);
  const [busy, setBusy] = useState(false);
  if (!w) return <Missing />;
  const reg = d.registered.includes(w.id);
  const remind = d.reminders.includes(w.id);
  const past = w.status === "previous";
  const doRegister = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      a.register(w.id);
      a.step("register");
      a.toast(w.status === "ongoing" ? `You've joined ${w.title} (demo)` : `Registered for ${w.title}. It's on your Home agenda.`);
    }, 700);
  };
  return (
    <div>
      <Header title={past ? "Webinar summary" : "Webinar"} onBack={a.back} />
      <div className="px-4 py-4">
        <div className="flex gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.poster} alt={`${w.title} poster`} className="h-44 w-32 shrink-0 rounded-xl object-cover shadow-sm" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8F49CD]">{past ? "Ended" : w.status === "ongoing" ? "Live now" : "Coming up"}</p>
            <h3 className="mt-1 text-[17px] font-semibold leading-snug text-[#3D1A6E]">{w.title}</h3>
            <dl className="mt-3 space-y-1.5 text-[12px]">
              <div className="flex gap-1.5 text-[#55505E]">
                <Icon name="event" className="h-4 w-4 text-[#8F49CD]" />
                <dt className="sr-only">Date</dt>
                <dd>{w.date}</dd>
              </div>
              <div className="flex gap-1.5 text-[#55505E]">
                <Icon name="clock" className="h-4 w-4 text-[#8F49CD]" />
                <dt className="sr-only">Time</dt>
                <dd>{w.time}</dd>
              </div>
              <div className="flex gap-1.5 text-[#55505E]">
                <Icon name="users" className="h-4 w-4 text-[#8F49CD]" />
                <dt className="sr-only">Registered</dt>
                <dd>{w.participants + (reg ? 1 : 0)} registered</dd>
              </div>
            </dl>
          </div>
        </div>
        <Section title={past ? "Summary" : "About webinar"}>
          <p className="text-[13px] leading-relaxed text-[#55505E]">{w.about}</p>
        </Section>
        {w.guests.length > 0 && (
          <Section title="Featured guests">
            <div className="flex flex-wrap gap-2">
              {w.guests.map((g) => (
                <span key={g} className="flex items-center gap-2 rounded-full bg-[#F7F3FC] py-1 pl-1 pr-3 text-[12px] text-[#3D1A6E]">
                  <Avatar name={g} size={24} />
                  {g}
                </span>
              ))}
            </div>
          </Section>
        )}
        {!past && (
          <Section title="Rules">
            <ul className="space-y-1.5 text-[12.5px] text-[#55505E]">
              {(w.rules ?? ["Mute your microphone unless speaking.", "Engage respectfully through the chat or Q&A.", "Test your audio and video before joining."]).map((r) => (
                <li key={r} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#8F49CD]" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {w.mine && d.role === "company" ? (
          <OwnerBar id={w.id} />
        ) : !past && (
          <div className="sticky bottom-0 -mx-4 mt-6 border-t border-[#EFEAF5] bg-white/95 px-4 pb-3 pt-3 backdrop-blur">
            {reg ? (
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-xl bg-[#E9FBEA] px-3 py-2.5 text-[12.5px] font-semibold text-[#1F6B33]">
                  <Icon name="check" className="h-4 w-4" /> You're registered
                </div>
                <Btn
                  variant="ghost"
                  onClick={() => {
                    a.unregister(w.id);
                    a.toast("Registration cancelled", () => a.register(w.id));
                  }}
                >
                  Cancel
                </Btn>
              </div>
            ) : (
              <div className="flex gap-2">
                <Btn variant="ghost" aria-pressed={remind} onClick={() => a.remind(w.id)}>
                  <Icon name="bell" className="h-4 w-4" fill={remind} />
                  {remind ? "Reminder on" : "Remind me"}
                </Btn>
                <Btn className="flex-1" loading={busy} onClick={doRegister}>
                  {w.status === "ongoing" ? "Join now" : "Register"}
                </Btn>
              </div>
            )}
            <p className="mt-2 text-center text-[10.5px] text-[#8D8896]">Prototype: registration is saved on this device only.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Activity & messages ---------------- */

export function Activity() {
  const { d, a } = useClab();
  const items = [
    ...d.registered.map((id) => ({ key: `r-${id}`, icon: "event", text: `You registered for ${webinar(id, d)?.title}`, go: () => a.go({ name: "webinar", id }) })),
    ...d.connections.map((id) => ({ key: `c-${id}`, icon: "clab", text: `Clab request sent to ${findCard(id)?.name}`, go: () => a.go({ name: "profile", id }) })),
    ...d.saved.map((id) => ({ key: `s-${id}`, icon: "bookmark", text: `You saved ${findCard(id)?.name}`, go: () => a.go({ name: "profile", id }) })),
  ];
  return (
    <div>
      <Header title="Activity" onBack={a.back} />
      {items.length === 0 ? (
        <Empty icon="activity" title="No activity yet" body="Requests you send, profiles you save and webinars you register for show up here." action={<Btn variant="soft" onClick={a.back}>Explore Home</Btn>} />
      ) : (
        <ul className="divide-y divide-[#EFEAF5]">
          {items.map((i) => (
            <li key={i.key}>
              <button type="button" onClick={i.go} className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[13px] text-[#24212B] hover:bg-[#F7F3FC]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F0E5FA] text-[#8F49CD]">
                  <Icon name={i.icon} className="h-4 w-4" />
                </span>
                {i.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Messages() {
  const { d, a } = useClab();
  const [q, setQ] = useState("");
  const list = d.threads.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <Header title="Messages" onBack={a.back} />
      <div className="px-4 pt-3">
        <label className="relative block">
          <span className="sr-only">Search messages</span>
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F49CD]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className={`${inputCls()} pl-9`} />
        </label>
      </div>
      {list.length === 0 ? (
        <Empty icon="message" title="No conversations found" body="Try another name." />
      ) : (
        <ul className="mt-2 divide-y divide-[#EFEAF5]">
          {list.map((t) => (
            <li key={t.id}>
              <button type="button" onClick={() => a.go({ name: "thread", id: t.id })} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#F7F3FC]">
                <Avatar name={t.name} size={42} />
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between">
                    <span className="text-[13px] font-semibold text-[#3D1A6E]">{t.name}</span>
                    <span className="text-[10.5px] text-[#8D8896]">{t.handle}</span>
                  </span>
                  <span className="block truncate text-[12px] text-[#6F6A78]">{t.messages[t.messages.length - 1].text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ThreadView({ id }: { id?: string }) {
  const { d, a } = useClab();
  const t = d.threads.find((x) => x.id === id);
  const [text, setText] = useState("");
  if (!t) return <Missing />;
  return (
    <div className="flex min-h-full flex-col">
      <Header title={t.name} onBack={a.back} />
      <div className="flex-1 space-y-2 px-4 py-4">
        {t.messages.map((m, i) => (
          <p
            key={i}
            className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[12.5px] leading-snug ${m.from === "me" ? "ml-auto rounded-br-md bg-[#8F49CD] text-white" : "rounded-bl-md bg-[#F0E5FA] text-[#24212B]"}`}
          >
            {m.text}
          </p>
        ))}
      </div>
      <form
        className="sticky bottom-0 flex gap-2 border-t border-[#EFEAF5] bg-white p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          a.send(t.id, text.trim());
          setText("");
        }}
      >
        <label className="flex-1">
          <span className="sr-only">Message</span>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message" className={inputCls()} />
        </label>
        <Btn type="submit" aria-label="Send" disabled={!text.trim()}>
          <Icon name="send" className="h-4 w-4" />
        </Btn>
      </form>
    </div>
  );
}

export function Missing() {
  const { a } = useClab();
  return <Empty icon="search" title="This item is gone" body="It may have been deleted." action={<Btn variant="soft" onClick={a.back}>Go back</Btn>} />;
}
