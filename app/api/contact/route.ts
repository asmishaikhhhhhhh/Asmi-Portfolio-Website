import { Resend } from "resend";
import { z } from "zod";
import { contact } from "@/data/portfolio";

/**
 * Contact form → email via Resend.
 * Env: RESEND_API_KEY (required), CONTACT_FROM (a verified sender, e.g.
 * "Portfolio <hello@yourdomain.com>"; defaults to Resend's onboarding sender),
 * CONTACT_TO (defaults to Asmi's email).
 * Without a key it returns 503 and the form offers a prefilled mailto instead.
 */
const Body = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(5000),
  company: z.string().max(0).optional(), // honeypot must be empty
});

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  const { name, email, message } = parsed.data;

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, error: "not-configured" }, { status: 503 });

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? contact.email,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
    html: `<p style="white-space:pre-wrap">${escape(message)}</p><p>— ${escape(name)} &lt;${escape(email)}&gt;</p>`,
  });
  if (error) {
    console.error("[contact] resend error", error);
    return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
