"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { askStore, useAsk } from "@/lib/ask-store";
import { contact } from "@/data/portfolio";

type Action = "email" | "linkedin" | "resume";
type Msg = { role: "user" | "assistant"; content: string; links?: string[]; actions?: Action[] };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm Asmi's portfolio guide. I only know what's on this site, but I know it well. What would you like to find out?",
};

function suggestions(pathname: string, titles: Record<string, string>) {
  const slug = pathname.startsWith("/work/") ? pathname.split("/")[2] : null;
  if (slug && titles[slug]) {
    const t = titles[slug];
    return [`What was Asmi's role in ${t}?`, `What research went into ${t}?`, `What did testing show for ${t}?`, "Is Asmi available for work?"];
  }
  if (pathname.startsWith("/about")) return ["What's her design process?", "What are her strongest skills?", "Where has she worked?", "How can I contact her?"];
  return ["Who is Asmi?", "Tell me about Leapsters", "Show me her UX work", "What makes her different?", "Is Asmi available for work?"];
}

const STORE_KEY = "ask-asmi:v1";

/** Last ~10 turns, starting with a visitor message (the API requires a user turn first). */
function toApiMessages(msgs: Msg[]) {
  const recent = msgs.slice(-10);
  const start = recent.findIndex((m) => m.role === "user");
  return recent.slice(start).map(({ role, content }) => ({ role, content: content.slice(0, 800) }));
}

type ProjectLink = { title: string; href: string; external: boolean };

export function AskPanel({ projects = {} }: { projects?: Record<string, ProjectLink> }) {
  const titles = Object.fromEntries(Object.entries(projects).map(([k, v]) => [k, v.title]));
  const { open } = useAsk();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Restore this tab's conversation. The panel isn't rendered on the server
  // (it's closed), so reading sessionStorage here can't cause a hydration mismatch.
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [GREETING];
    try {
      const saved = sessionStorage.getItem(STORE_KEY);
      return saved ? (JSON.parse(saved) as Msg[]) : [GREETING];
    } catch {
      return [GREETING];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-20)));
    } catch {}
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, reduce]);

  const ask = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busy) return;
      const next: Msg[] = [...msgs, { role: "user", content: q }];
      setMsgs(next);
      setInput("");
      setBusy(true);
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            messages: toApiMessages(next),
          }),
        });
        const data = await res.json();
        setMsgs((m) => [...m, { role: "assistant", content: data.answer ?? "Hmm, I lost my train of thought. Try again?", links: data.links, actions: data.actions }]);
      } catch {
        setMsgs((m) => [...m, { role: "assistant", content: `I can't reach my notes right now. You can always email Asmi at ${contact.email}.`, actions: ["email"] }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, msgs, pathname],
  );

  // Open: remember the opener, focus the input, run any pending question.
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    const pending = askStore.consumePending();
    const t = setTimeout(() => {
      inputRef.current?.focus();
      if (pending) ask(pending);
    }, 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Close: return focus where it came from.
  useEffect(() => {
    if (!open && opener.current) {
      opener.current.focus?.();
      opener.current = null;
    }
  }, [open]);

  // Esc closes; Tab stays inside the panel.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") askStore.close();
    if (e.key !== "Tab" || !panel.current) return;
    const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),textarea,input");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const actionLink = (a: Action) =>
    a === "email"
      ? { href: `mailto:${contact.email}`, label: "Email Asmi", external: true }
      : a === "linkedin"
        ? { href: contact.linkedin, label: "LinkedIn ↗", external: true }
        : { href: "/resume", label: "View resume", external: false };

  const showSuggestions = msgs.length <= 1;

  return (
    <>
      {/* Round launcher, bottom right on every screen size. On phones it sits
          beside the bottom nav bar (same 56px height). */}
      <button
        type="button"
        onClick={() => askStore.toggle()}
        aria-expanded={open}
        aria-controls="ask-asmi"
        aria-label="Ask Asmi"
        className={`group fixed bottom-3 right-3 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-marigold text-ink shadow-float transition-[transform,opacity] duration-300 ease-out-soft hover:scale-105 ${
          open ? "pointer-events-none scale-90 opacity-0" : ""
        }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <span aria-hidden className="ask-twinkle inline-block text-[1.5rem] leading-none transition-transform duration-500 group-hover:rotate-90">
          ✦
        </span>
        {/* Label on hover/focus for pointer users */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
        >
          Ask Asmi
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-[60] bg-ink/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => askStore.close()}
            />
            <motion.div
              ref={panel}
              id="ask-asmi"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ask-title"
              onKeyDown={onKeyDown}
              className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88dvh] flex-col overflow-hidden rounded-t-[24px] border border-line bg-paper shadow-float md:inset-x-auto md:bottom-6 md:right-6 md:h-[min(600px,calc(100dvh-3rem))] md:w-[400px] md:rounded-[24px]"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <header className="flex items-start justify-between gap-4 border-b border-line px-5 pb-4 pt-3 md:pt-4">
                <div>
                  <span aria-hidden className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line md:hidden" />
                  <h2 id="ask-title" className="font-display-soft text-[1.35rem]">
                    Ask Asmi <span className="text-marigold">✦</span>
                  </h2>
                  <p className="text-sm text-ink-mute">Answers come only from this portfolio.</p>
                </div>
                <button
                  type="button"
                  onClick={() => askStore.close()}
                  className="mt-1 rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-ink hover:text-ink md:mt-0"
                  aria-label="Close Ask Asmi"
                >
                  Close
                </button>
              </header>

              <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {msgs.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                    <div
                      className={`max-w-[88%] rounded-[18px] px-4 py-3 text-[0.95rem] leading-relaxed ${
                        m.role === "user" ? "rounded-br-[6px] bg-ink text-paper" : "rounded-bl-[6px] bg-card text-ink"
                      }`}
                    >
                      <span className="sr-only">{m.role === "user" ? "You said: " : "Ask Asmi: "}</span>
                      {m.content}
                    </div>
                    {(m.links?.length || m.actions?.length) ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.links?.map((s) =>
                          projects[s] ? (
                            <Link
                              key={s}
                              href={projects[s].href}
                              {...(projects[s].external ? { target: "_blank", rel: "noreferrer" } : { onClick: () => askStore.close() })}
                              className="rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-sm font-medium hover:border-ink"
                            >
                              Explore {projects[s].title} {projects[s].external ? "↗" : "→"}
                            </Link>
                          ) : null,
                        )}
                        {m.actions?.map((a) => {
                          const l = actionLink(a);
                          return l.external ? (
                            <a key={a} href={l.href} target={a === "linkedin" ? "_blank" : undefined} rel="noreferrer" className="rounded-full bg-paper-deep px-3 py-1.5 text-sm hover:bg-line">
                              {l.label}
                            </a>
                          ) : (
                            <Link key={a} href={l.href} onClick={() => askStore.close()} className="rounded-full bg-paper-deep px-3 py-1.5 text-sm hover:bg-line">
                              {l.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ))}
                {busy && (
                  <div className="flex items-center gap-1.5 px-1 text-ink-mute" aria-label="Thinking">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-mute" style={{ animationDelay: `${d * 120}ms` }} />
                    ))}
                  </div>
                )}
                {showSuggestions && (
                  <div>
                    <p className="meta mb-2 text-ink-mute">Try asking</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions(pathname, titles).map((s) => (
                        <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-ink/15 px-3 py-1.5 text-left text-sm hover:border-ink">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
                className="flex items-end gap-2 border-t border-line p-3"
              >
                <label htmlFor="ask-input" className="sr-only">
                  Ask a question about Asmi
                </label>
                <textarea
                  id="ask-input"
                  ref={inputRef}
                  rows={1}
                  maxLength={500}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  placeholder="Ask about her work…"
                  className="max-h-32 min-h-11 flex-1 resize-none rounded-control border border-line bg-card px-3.5 py-2.5 text-[16px] outline-none focus:border-forest md:text-[0.95rem]"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="h-11 rounded-control bg-ink px-4 font-medium text-paper disabled:opacity-40"
                >
                  Ask
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
