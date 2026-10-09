"use client";

import { useId, useState } from "react";
import { contact } from "@/data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Three fields, inline validation, honest states. If delivery fails (or no email
 * service is configured), the visitor gets a prefilled mailto link instead of a
 * dead end.
 */
export function ContactForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const dark = tone === "dark";
  const field = `w-full rounded-control border px-4 py-3 text-body outline-none transition-colors ${
    dark
      ? "border-paper/20 bg-paper/5 text-paper placeholder:text-paper/50 focus:border-marigold"
      : "border-line bg-card text-ink placeholder:text-ink-mute focus:border-forest"
  }`;

  function validate() {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "What should I call you?";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "That email doesn't look quite right.";
    if (values.message.trim().length < 10) e.message = "A few more words, please. Even a hello works.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    const company = (new FormData(ev.currentTarget).get("company") as string) ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Hello from ${values.name || "your portfolio"}`,
  )}&body=${encodeURIComponent(values.message)}`;

  if (status === "sent") {
    return (
      <div role="status" className={`rounded-media border p-8 ${dark ? "border-paper/15" : "border-line bg-card"}`}>
        <p className="font-display-soft text-h3">Message received ✦</p>
        <p className={`mt-2 ${dark ? "text-paper/75" : "text-ink-soft"}`}>
          Thanks, {values.name.split(" ")[0]}. I&rsquo;ll reply to {values.email} soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-describedby={`${id}-status`}>
      <div className="grid gap-4 sm:grid-cols-2">
        {(["name", "email"] as const).map((k) => (
          <div key={k}>
            <label htmlFor={`${id}-${k}`} className={`meta mb-1.5 block ${dark ? "text-paper/70" : "text-ink-mute"}`}>
              {k === "name" ? "Your name" : "Your email"}
            </label>
            <input
              id={`${id}-${k}`}
              name={k}
              type={k === "email" ? "email" : "text"}
              autoComplete={k}
              value={values[k]}
              onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
              aria-invalid={!!errors[k]}
              aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
              className={field}
            />
            {errors[k] && (
              <p id={`${id}-${k}-err`} className={`mt-1.5 text-sm ${dark ? "text-marigold" : "text-[#9b2c1f]"}`}>
                {errors[k]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={`meta mb-1.5 block ${dark ? "text-paper/70" : "text-ink-mute"}`}>
          What&rsquo;s on your mind?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          placeholder="A role, a project, a messy problem, or just hello."
          className={`${field} resize-y`}
        />
        {errors.message && (
          <p id={`${id}-message-err`} className={`mt-1.5 text-sm ${dark ? "text-marigold" : "text-[#9b2c1f]"}`}>
            {errors.message}
          </p>
        )}
      </div>
      {/* Honeypot: hidden from people and assistive tech, catches bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`rounded-full px-6 py-3 font-medium transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 ${
            dark ? "bg-marigold text-ink" : "bg-ink text-paper"
          }`}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p id={`${id}-status`} role="status" className={`text-sm ${dark ? "text-paper/75" : "text-ink-soft"}`}>
          {status === "error" && (
            <>
              That didn&rsquo;t go through.{" "}
              <a href={mailto} className="underline underline-offset-4">
                Send it by email instead
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
