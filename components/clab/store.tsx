"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import {
  POSTS,
  PROFILES,
  SEED_PORTFOLIOS,
  SEED_PROJECTS,
  THREADS,
  WEBINARS,
  type Item,
  type Post,
  type Webinar,
  type Portfolio,
  type Profile,
  type Project,
  type Role,
  type Tab,
  type Thread,
  type Tool,
} from "./data";

export type RouteName =
  | "profile"
  | "webinar"
  | "activity"
  | "messages"
  | "thread"
  | "section"
  | "project"
  | "project-preview"
  | "project-form"
  | "portfolio-editor"
  | "portfolio-preview"
  | "premium"
  | "payment"
  | "course"
  | "mentor"
  | "edit-profile"
  | "settings"
  | "verify"
  | "event-form"
  | "event-created";
export type Route = { name: RouteName; id?: string; section?: Section };
export type Section = "team" | "my" | "portfolio" | "resume" | "courses";

// Steps of the three demo journeys, ticked off as they happen
export const JOURNEYS = [
  {
    id: "discover",
    role: "student" as Role,
    title: "Discover and register",
    steps: [
      { id: "open-card", label: "Open an opportunity on Home" },
      { id: "open-webinar", label: "Explore a webinar in Events" },
      { id: "register", label: "Register for it" },
    ],
  },
  {
    id: "project",
    role: "professional" as Role,
    title: "Create a team project",
    steps: [
      { id: "open-workspace", label: "Open Workspace" },
      { id: "start-project", label: "Start a new team project" },
      { id: "submit-project", label: "Submit the details" },
      { id: "open-preview", label: "Open its preview" },
    ],
  },
  {
    id: "portfolio",
    role: "student" as Role,
    title: "Build a portfolio",
    steps: [
      { id: "open-portfolio", label: "Open Portfolio in Workspace" },
      { id: "edit-portfolio", label: "Create or edit a portfolio" },
      { id: "preview-portfolio", label: "Preview the result" },
    ],
  },
  {
    id: "host",
    role: "company" as Role,
    title: "Verify and host a webinar",
    steps: [
      { id: "verify", label: "Verify the company" },
      { id: "create-webinar", label: "Enter the webinar details" },
      { id: "view-my-webinar", label: "Find it in My Webinar" },
    ],
  },
] as const;
export type StepId = (typeof JOURNEYS)[number]["steps"][number]["id"];

type Data = {
  role: Role;
  profiles: Record<Role, Profile>;
  connections: string[];
  saved: string[];
  dismissed: string[];
  registered: string[];
  reminders: string[];
  projects: Project[];
  portfolios: Portfolio[];
  progress: Record<string, number>; // lessons done per course
  mentorRequests: string[];
  premium: boolean;
  threads: Thread[];
  notifications: { webinars: boolean; projects: boolean; messages: boolean };
  visibility: "everyone" | "connections";
  done: StepId[];
  verified: boolean;
  verification: { year: string; employees: string; revenue: string; files: Record<string, string> } | null;
  myWebinars: Webinar[];
  trials: number;
  posts: Post[];
  liked: string[];
  savedPosts: string[];
};

const initial = (): Data => ({
  role: "student",
  profiles: PROFILES,
  connections: [],
  saved: [],
  dismissed: [],
  registered: [],
  reminders: [],
  projects: SEED_PROJECTS,
  portfolios: SEED_PORTFOLIOS,
  progress: { ui: 10, ux: 3 },
  mentorRequests: [],
  premium: false,
  threads: THREADS,
  notifications: { webinars: true, projects: true, messages: true },
  visibility: "everyone",
  done: [],
  verified: false,
  verification: null,
  myWebinars: [],
  trials: 3,
  posts: POSTS,
  liked: [],
  savedPosts: [],
});

type Nav = { tab: Tab; stack: Route[]; sheet: "create" | null };
type State = { data: Data; nav: Nav };

type Action =
  | { type: "hydrate"; data: Data }
  | { type: "reset" }
  | { type: "role"; role: Role }
  | { type: "tab"; tab: Tab }
  | { type: "push"; route: Route }
  | { type: "replace"; route: Route }
  | { type: "back" }
  | { type: "home" }
  | { type: "sheet"; sheet: Nav["sheet"] }
  | { type: "data"; fn: (d: Data) => Data };

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "hydrate":
      return { ...s, data: a.data };
    case "reset":
      return { data: initial(), nav: { tab: "home", stack: [], sheet: null } };
    case "role":
      return { data: { ...s.data, role: a.role }, nav: { tab: "home", stack: [], sheet: null } };
    case "tab":
      return { ...s, nav: { tab: a.tab, stack: [], sheet: null } };
    case "push":
      return { ...s, nav: { ...s.nav, stack: [...s.nav.stack, a.route], sheet: null } };
    case "replace":
      return { ...s, nav: { ...s.nav, stack: [...s.nav.stack.slice(0, -1), a.route], sheet: null } };
    case "back":
      return { ...s, nav: { ...s.nav, stack: s.nav.stack.slice(0, -1) } };
    case "home":
      return { ...s, nav: { tab: "home", stack: [], sheet: null } };
    case "sheet":
      return { ...s, nav: { ...s.nav, sheet: a.sheet } };
    case "data":
      return { ...s, data: a.fn(s.data) };
  }
}

const KEY = "clab-prototype-v1";

type Toast = { id: number; text: string; undo?: () => void };

function useClabState() {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ data: initial(), nav: { tab: "home" as Tab, stack: [], sheet: null } }));
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const tid = useRef(0);

  // Load saved data after mount (keeps server and client markup identical)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const base = initial();
        dispatch({ type: "hydrate", data: { ...base, ...saved, profiles: { ...base.profiles, ...saved.profiles } } });
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state.data));
    } catch {}
  }, [state.data, ready]);

  const toast = useCallback((text: string, undo?: () => void) => {
    const id = ++tid.current;
    setToasts((t) => [...t.slice(-2), { id, text, undo }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const up = useCallback((fn: (d: Data) => Data) => dispatch({ type: "data", fn }), []);
  const step = useCallback((id: StepId) => up((d) => (d.done.includes(id) ? d : { ...d, done: [...d.done, id] })), [up]);

  const actions = useMemo(
    () => ({
      go: (route: Route) => dispatch({ type: "push", route }),
      replace: (route: Route) => dispatch({ type: "replace", route }),
      back: () => dispatch({ type: "back" }),
      tab: (tab: Tab) => dispatch({ type: "tab", tab }),
      home: () => dispatch({ type: "home" }),
      sheet: (sheet: Nav["sheet"]) => dispatch({ type: "sheet", sheet }),
      role: (role: Role) => dispatch({ type: "role", role }),
      reset: () => {
        try {
          localStorage.removeItem(KEY);
        } catch {}
        dispatch({ type: "reset" });
      },
      step,
      toast,
      connect: (id: string) => up((d) => ({ ...d, connections: toggle(d.connections, id) })),
      save: (id: string) => up((d) => ({ ...d, saved: toggle(d.saved, id) })),
      dismiss: (id: string) => up((d) => ({ ...d, dismissed: toggle(d.dismissed, id) })),
      register: (id: string) => up((d) => ({ ...d, registered: d.registered.includes(id) ? d.registered : [...d.registered, id] })),
      unregister: (id: string) => up((d) => ({ ...d, registered: d.registered.filter((x) => x !== id) })),
      remind: (id: string) => up((d) => ({ ...d, reminders: toggle(d.reminders, id) })),
      saveProject: (p: Project) =>
        up((d) => ({ ...d, projects: d.projects.some((x) => x.id === p.id) ? d.projects.map((x) => (x.id === p.id ? p : x)) : [p, ...d.projects] })),
      deleteProject: (id: string) => up((d) => ({ ...d, projects: d.projects.filter((x) => x.id !== id) })),
      toggleSavedProject: (id: string) => up((d) => ({ ...d, projects: d.projects.map((x) => (x.id === id ? { ...x, saved: !x.saved } : x)) })),
      request: (pid: string, who: string, accept: boolean) =>
        up((d) => ({
          ...d,
          projects: d.projects.map((x) =>
            x.id === pid ? { ...x, requests: x.requests.filter((r) => r !== who), members: accept ? [...x.members, who] : x.members } : x,
          ),
        })),
      toolItems: (pid: string, tool: Tool, fn: (items: Item[]) => Item[]) =>
        up((d) => ({ ...d, projects: d.projects.map((x) => (x.id === pid ? { ...x, tools: { ...x.tools, [tool]: fn(x.tools[tool] ?? []) } } : x)) })),
      savePortfolio: (p: Portfolio) =>
        up((d) => ({ ...d, portfolios: d.portfolios.some((x) => x.id === p.id) ? d.portfolios.map((x) => (x.id === p.id ? p : x)) : [p, ...d.portfolios] })),
      deletePortfolio: (id: string) => up((d) => ({ ...d, portfolios: d.portfolios.filter((x) => x.id !== id) })),
      lesson: (course: string, total: number) => up((d) => ({ ...d, progress: { ...d.progress, [course]: Math.min(total, (d.progress[course] ?? 0) + 1) } })),
      enrol: (course: string) => up((d) => ({ ...d, progress: { ...d.progress, [course]: d.progress[course] ?? 0 } })),
      mentor: (id: string) => up((d) => ({ ...d, mentorRequests: toggle(d.mentorRequests, id) })),
      premium: () => up((d) => ({ ...d, premium: true })),
      profile: (p: Profile) => up((d) => ({ ...d, profiles: { ...d.profiles, [d.role]: p } })),
      send: (tid: string, text: string) =>
        up((d) => ({ ...d, threads: d.threads.map((t) => (t.id === tid ? { ...t, messages: [...t.messages, { from: "me" as const, text }] } : t)) })),
      notify: (k: keyof Data["notifications"]) => up((d) => ({ ...d, notifications: { ...d.notifications, [k]: !d.notifications[k] } })),
      visibility: (v: Data["visibility"]) => up((d) => ({ ...d, visibility: v })),
      verify: (v: NonNullable<Data["verification"]>) => up((d) => ({ ...d, verified: true, verification: v })),
      createWebinar: (w: Webinar) =>
        up((d) => ({
          ...d,
          myWebinars: d.myWebinars.some((x) => x.id === w.id) ? d.myWebinars.map((x) => (x.id === w.id ? w : x)) : [w, ...d.myWebinars],
          trials: d.myWebinars.some((x) => x.id === w.id) ? d.trials : Math.max(0, d.trials - 1),
        })),
      deleteWebinar: (id: string) => up((d) => ({ ...d, myWebinars: d.myWebinars.filter((x) => x.id !== id) })),
      like: (id: string) => up((d) => ({ ...d, liked: toggle(d.liked, id) })),
      savePost: (id: string) => up((d) => ({ ...d, savedPosts: toggle(d.savedPosts, id) })),
      comment: (id: string, text: string) => up((d) => ({ ...d, posts: d.posts.map((p) => (p.id === id ? { ...p, comments: [...p.comments, text] } : p)) })),
    }),
    [step, toast, up],
  );

  return { state, actions, toasts, dismissToast, ready };
}

type Ctx = ReturnType<typeof useClabState>;
const ClabContext = createContext<Ctx | null>(null);

export function ClabProvider({ children }: { children: ReactNode }) {
  const value = useClabState();
  return <ClabContext.Provider value={value}>{children}</ClabContext.Provider>;
}

export function useClab() {
  const c = useContext(ClabContext);
  if (!c) throw new Error("useClab outside ClabProvider");
  const { state, actions } = c;
  return { d: state.data, nav: state.nav, a: actions, toasts: c.toasts, dismissToast: c.dismissToast, ready: c.ready };
}

export const webinar = (id: string | undefined, d?: { myWebinars: Webinar[] }) => [...(d?.myWebinars ?? []), ...WEBINARS].find((w) => w.id === id);
export const uid = () => Math.random().toString(36).slice(2, 9);
