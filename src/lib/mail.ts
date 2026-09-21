import { Resend } from "resend";

export type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

/** Sends through Resend. Never throws: returns { ok, error } so callers can show a useful message. */
export async function sendMail(m: Mail): Promise<{ ok: boolean; error?: string }> {
  const { RESEND_API_KEY, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") console.log(`[dev mail] to=${m.to} subject=${m.subject}\n${m.text}`);
    return { ok: false, error: "Email is not configured" };
  }
  try {
    const { error } = await new Resend(RESEND_API_KEY).emails.send({
      from: `TS Management Growth <${FROM_EMAIL}>`,
      to: [m.to],
      replyTo: m.replyTo,
      subject: m.subject,
      html: m.html,
      text: m.text,
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Email failed" };
  }
}
