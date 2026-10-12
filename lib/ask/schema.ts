import { z } from "zod";

/** What the chatbot returns, from Gemini (structured output) or the local fallback. */
export const AskReplySchema = z.object({
  answer: z.string().describe("Answer in 1–4 short sentences, plain text, third person about Asmi."),
  links: z.array(z.string()).describe("Project slugs from the knowledge pack to show as buttons. Empty if none."),
  actions: z
    .array(z.enum(["email", "linkedin", "resume"]))
    .describe("Quick actions to offer: email, linkedin, resume. Empty if none."),
});
export type AskReply = z.infer<typeof AskReplySchema>;

export const AskRequestSchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(800) }))
    .min(1)
    .max(12),
  page: z.string().max(120).optional(),
});
