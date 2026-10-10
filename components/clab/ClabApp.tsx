"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Tab } from "./data";
import { poppins } from "./font";
import { useClab, type Route } from "./store";
import { Icon } from "./ui";
import { Account, EditProfile, Settings } from "./screens/account";
import { CompanyAccount, EventCreated, EventForm, Explore, Verify } from "./screens/company";
import { Activity, Events, Home, Messages, ProfileDetail, ThreadView, WebinarDetail } from "./screens/discover";
import { CourseDetail, MentorDetail } from "./screens/learn";
import { Payment, PortfolioEditor, PortfolioPreview, Premium } from "./screens/portfolio";
import { ProjectDetail, ProjectForm, ProjectPreview, SectionScreen, Workspace } from "./screens/workspace";


function Screen({ route, tab, company }: { route?: Route; tab: Tab; company: boolean }) {
  if (!route) {
    if (tab === "event") return <Events />;
    if (tab === "workspace") return <Workspace />;
    if (tab === "explore") return <Explore />;
    if (tab === "account") return company ? <CompanyAccount /> : <Account />;
    return <Home />;
  }
  switch (route.name) {
    case "profile":
      return <ProfileDetail id={route.id} />;
    case "webinar":
      return <WebinarDetail id={route.id} />;
    case "activity":
      return <Activity />;
    case "messages":
      return <Messages />;
    case "thread":
      return <ThreadView id={route.id} />;
    case "section":
      return <SectionScreen section={route.section} />;
    case "project":
      return <ProjectDetail id={route.id} />;
    case "project-preview":
      return <ProjectPreview id={route.id} />;
    case "project-form":
      return <ProjectForm id={route.id} />;
    case "portfolio-editor":
      return <PortfolioEditor id={route.id} />;
    case "portfolio-preview":
      return <PortfolioPreview id={route.id} />;
    case "premium":
      return <Premium />;
    case "payment":
      return <Payment />;
    case "course":
      return <CourseDetail id={route.id} />;
    case "mentor":
      return <MentorDetail id={route.id} />;
    case "edit-profile":
      return <EditProfile />;
    case "settings":
      return <Settings />;
    case "verify":
      return <Verify id={route.id} />;
    case "event-form":
      return <EventForm id={route.id} />;
    case "event-created":
      return <EventCreated id={route.id} />;
  }
}

const NAV: { key: Tab | "create"; label: string; icon: string }[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "event", label: "Event", icon: "event" },
  { key: "create", label: "Create", icon: "create" },
  { key: "workspace", label: "Workspace", icon: "workspace" },
  { key: "account", label: "Account", icon: "account" },
];

function BottomNav() {
  const { d, nav, a } = useClab();
  // Companies get Explore where others have Workspace, as in the company screens
  const items = d.role === "company" ? NAV.map((n) => (n.key === "workspace" ? { key: "explore" as const, label: "Explore", icon: "activity" } : n)) : NAV;
  return (
    <nav aria-label="CLAB" className="relative z-30 grid grid-cols-5 rounded-t-[22px] bg-[#EDE5FA] px-1 pb-6 pt-2">
      {items.map((n) => {
        const on = n.key === "create" ? nav.sheet === "create" : nav.tab === n.key && !nav.sheet;
        return (
          <button
            key={n.key}
            type="button"
            aria-current={on ? "page" : undefined}
            onClick={() => {
              if (n.key === "create") a.sheet(nav.sheet === "create" ? null : "create");
              else {
                if (n.key === "workspace") a.step("open-workspace");
                a.tab(n.key);
              }
            }}
            className="group flex flex-col items-center gap-0.5 py-1 text-[10.5px]"
          >
            <span className="relative grid h-10 w-12 place-items-center">
              {on && (
                <motion.span
                  layoutId="clab-nav"
                  aria-hidden
                  className="absolute -top-[18px] left-0 h-12 w-12 rounded-full bg-[#E7DAFF] shadow-[0_0_0_5px_#fff]"
                  transition={{ type: "spring", damping: 28, stiffness: 360 }}
                />
              )}
              <span className={`relative transition-[transform,color] duration-200 ${on ? "-translate-y-[14px] text-[#3D1A6E]" : "text-[#8D8896] group-hover:text-[#3D1A6E]"}`}>
                <Icon name={n.icon} className="h-[22px] w-[22px]" />
              </span>
            </span>
            <span className={on ? "-mt-1 font-semibold text-[#3D1A6E]" : "-mt-1 text-[#8D8896]"}>{n.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function CreateSheet() {
  const { d, nav, a } = useClab();
  const open = nav.sheet === "create";
  const host = (id: string) => () => {
    a.tab("event");
    a.go(d.verified ? { name: "event-form", id } : { name: "verify", id: "then-create" });
  };
  const companyItems = [
    { label: "Webinar", icon: "event", go: host("new-webinar") },
    { label: "Competition", icon: "star", go: host("new-competition") },
  ];
  const peopleItems = [
    { label: "Team project", icon: "users", go: () => (a.step("start-project"), a.tab("workspace"), a.go({ name: "project-form", id: "new-team" })) },
    { label: "Personal project", icon: "folder", go: () => (a.tab("workspace"), a.go({ name: "project-form", id: "new-personal" })) },
    { label: "Portfolio", icon: "resume", go: () => (a.step("open-portfolio"), a.tab("workspace"), a.go({ name: "section", section: "portfolio" })) },
    { label: "Resume", icon: "file", go: () => (a.tab("workspace"), a.go({ name: "section", section: "resume" })) },
    { label: "Course", icon: "course", go: () => (a.tab("workspace"), a.go({ name: "section", section: "courses" })) },
  ];
  const items = d.role === "company" ? companyItems : peopleItems;
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && a.sheet(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, a]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-20 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close create menu" className="absolute inset-0 bg-white/70 backdrop-blur-[3px]" onClick={() => a.sheet(null)} />
          <motion.div
            role="dialog"
            aria-label="Create"
            className="relative w-full rounded-2xl border border-[#ECE6F3] bg-white p-2 shadow-[0_16px_40px_rgba(61,26,110,.18)]"
            initial={{ y: 16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, opacity: 0 }}
          >
            <div className="flex items-center justify-between px-3 pb-1 pt-2">
              <p className="text-[15px] font-semibold text-[#3D1A6E]">Create</p>
              <button type="button" aria-label="Close" onClick={() => a.sheet(null)} className="rounded-full p-1.5 text-[#3D1A6E] hover:bg-[#F0E5FA]">
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>
            <ul className="divide-y divide-[#EFEAF5]">
              {items.map((i) => (
                <li key={i.label}>
                  <button type="button" onClick={i.go} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#24212B] hover:bg-[#F7F3FC]">
                    <Icon name={i.icon} className="h-[18px] w-[18px] text-[#8F49CD]" />
                    {i.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toasts() {
  const { toasts, dismissToast } = useClab();
  return (
    <div aria-live="polite" className="pointer-events-none absolute inset-x-3 bottom-[96px] z-[60] flex flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-xl bg-[#24212B] px-4 py-2.5 text-[12.5px] text-white shadow-lg"
          >
            <Icon name="check" className="h-4 w-4 shrink-0 text-[#D0FFD8]" />
            <span className="flex-1">{t.text}</span>
            {t.undo && (
              <button
                type="button"
                onClick={() => {
                  t.undo?.();
                  dismissToast(t.id);
                }}
                className="font-semibold text-[#D9C4F5] hover:underline"
              >
                Undo
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** The CLAB app inside a phone frame (frameless on small screens). */
export function ClabApp() {
  const { d, nav } = useClab();
  const reduce = useReducedMotion();
  const route = nav.stack[nav.stack.length - 1];
  const key = `${nav.tab}:${nav.stack.length}:${route?.name ?? "root"}:${route?.id ?? route?.section ?? ""}`;
  const depth = useRef(nav.stack.length);
  const dir = nav.stack.length >= depth.current ? 1 : -1;
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    depth.current = nav.stack.length;
    scroller.current?.scrollTo({ top: 0 });
  }, [key, nav.stack.length]);

  return (
    // iPhone 14: 390 × 844 screen, notch, ~47px corner radius
    <div className="relative mx-auto w-full max-w-[414px]">
      <span aria-hidden className="absolute -left-[3px] top-[118px] h-8 w-[3px] rounded-l bg-[#2a2830] max-sm:hidden" />
      <span aria-hidden className="absolute -left-[3px] top-[176px] h-14 w-[3px] rounded-l bg-[#2a2830] max-sm:hidden" />
      <span aria-hidden className="absolute -left-[3px] top-[242px] h-14 w-[3px] rounded-l bg-[#2a2830] max-sm:hidden" />
      <span aria-hidden className="absolute -right-[3px] top-[196px] h-20 w-[3px] rounded-r bg-[#2a2830] max-sm:hidden" />
    <div
      className={`${poppins.className} relative h-[868px] w-full overflow-hidden rounded-[58px] border-[12px] border-[#1d1b22] bg-white shadow-[0_30px_80px_rgba(61,26,110,.25),inset_0_0_0_2px_#3a3842] max-sm:h-[min(868px,calc(100svh-120px))] max-sm:rounded-[40px] max-sm:border-[8px]`}
    >
      {/* status bar with the iPhone 14 notch */}
      <div aria-hidden className="relative z-30 flex h-[47px] items-center justify-between bg-white px-7 pt-1 text-[15px] font-semibold text-[#24212B]">
        <span className="w-14 text-center">8:00</span>
        <span className="absolute left-1/2 top-0 h-[31px] w-[160px] -translate-x-1/2 rounded-b-[20px] bg-[#1d1b22]">
          <span className="absolute right-[34px] top-[11px] h-2 w-2 rounded-full bg-[#2c2f45]" />
          <span className="absolute left-1/2 top-[13px] h-1 w-10 -translate-x-1/2 rounded-full bg-[#2b2a30]" />
        </span>
        <span className="flex w-14 items-center justify-center gap-1">
          <svg viewBox="0 0 18 12" className="h-3 w-[17px]" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="5" y="5" width="3" height="7" rx="1" />
            <rect x="10" y="2" width="3" height="10" rx="1" />
            <rect x="15" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg viewBox="0 0 26 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="0.6" y="0.6" width="22" height="10.8" rx="3" />
            <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </span>
      </div>
      <div className="flex h-[calc(100%-47px)] flex-col">
        <div ref={scroller} className="no-scrollbar relative flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={key}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 28 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 * dir }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full bg-white"
            >
              <Screen route={route} tab={nav.tab} company={d.role === "company"} />
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNav />
      </div>
      <CreateSheet />
      <div id="clab-overlay" className="pointer-events-none absolute inset-0 z-50 [&>*]:pointer-events-auto" />
      <Toasts />
      {/* home indicator */}
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-1/2 z-[70] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-[#1d1b22]" />
    </div>
    </div>
  );
}
