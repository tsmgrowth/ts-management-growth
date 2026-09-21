// Branded HTML emails. Table layout + inline styles so they render in Gmail, Apple Mail and Outlook.
// Self-contained on purpose (no imports) so every future message reuses the same look via shell().

export type Lead = {
  name: string;
  email: string;
  phone: string;
  serviceTitle: string;
  message: string;
  receivedAt: Date;
};

// Change to the real domain once it is live. The logo image is served from /public/email/logo.png.
const SITE = process.env.SITE_URL || "https://ts-management-growth.vercel.app";

const C = {
  ink: "#0b1b3b", muted: "#4a5877", n950: "#050f26", n900: "#0a1f4d", b600: "#1f5fe0", b700: "#1449c9",
  sky: "#0089d7", glow: "#38bdf8", mist: "#f5f8fc", line: "#e3e8f0", silver: "#c9d1de",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const first = (name: string) => name.trim().split(/\s+/)[0] || "there";
const when = (d: Date) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(d) + " ET";

const gradient = `background:${C.n900};background-image:radial-gradient(circle at 92% 0%,rgba(56,189,248,0.55),rgba(56,189,248,0) 55%),linear-gradient(135deg,${C.n900} 0%,${C.b700} 100%);`;
const btnGradient = `background:${C.b600};background-image:linear-gradient(135deg,#2b6cf0 0%,${C.b700} 100%);`;

function button(href: string, label: string, kind: "primary" | "ghost" = "primary") {
  const style =
    kind === "primary"
      ? `${btnGradient}color:#ffffff;border:1px solid ${C.b700};`
      : `background:#ffffff;color:${C.n900};border:1px solid ${C.silver};`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:0 8px 10px 0;"><tr><td style="border-radius:999px;${style}"><a href="${esc(href)}" style="display:inline-block;padding:15px 30px;font:700 16px ${FONT};color:${kind === "primary" ? "#ffffff" : C.n900};text-decoration:none;border-radius:999px;">${label}</a></td></tr></table>`;
}

function pill(text: string) {
  return `<span style="display:inline-block;padding:7px 14px;border-radius:999px;background:rgba(56,189,248,0.18);border:1px solid rgba(56,189,248,0.55);font:700 12px ${FONT};letter-spacing:0.14em;color:${C.glow};">${text}</span>`;
}

function shell(opts: { preheader: string; hero: string; body: string; footNote: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>TS Management Growth</title></head>
<body style="margin:0;padding:0;background:${C.n950};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.n950};font-size:1px;line-height:1px;">${esc(opts.preheader)}${"&nbsp;&zwnj;".repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.n950}" style="background:${C.n950};"><tr><td align="center" style="padding:28px 12px 36px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
  <tr><td style="padding:0 6px 18px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="vertical-align:middle;"><img src="${SITE}/email/logo.png" width="46" height="46" alt="" style="display:block;border:0;border-radius:12px;"></td>
      <td style="vertical-align:middle;padding-left:12px;font:600 18px ${FONT};color:#ffffff;line-height:1.1;">TS Management Growth<br><span style="font:500 10px ${FONT};letter-spacing:0.3em;color:${C.silver};">LLC</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="border-radius:26px;overflow:hidden;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td bgcolor="${C.n900}" style="${gradient}padding:38px 34px 34px;border-radius:26px 26px 0 0;">${opts.hero}</td></tr>
      <tr><td style="padding:30px 34px 34px;font:400 16px/1.6 ${FONT};color:${C.ink};">${opts.body}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:22px 10px 0;font:400 12px/1.6 ${FONT};color:${C.silver};text-align:center;">
    ${opts.footNote}<br>
    TS Management Growth LLC provides business administration and administrative support services. We do not provide legal, tax or accounting advice.
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function stat(label: string, value: string) {
  return `<td width="33%" style="padding:14px 10px;text-align:center;border-right:1px solid ${C.line};"><div style="font:600 11px ${FONT};letter-spacing:0.12em;color:${C.muted};text-transform:uppercase;">${label}</div><div style="margin-top:5px;font:700 15px ${FONT};color:${C.n900};">${value}</div></td>`;
}

const quote = (text: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.mist};border-left:4px solid ${C.b600};border-radius:14px;padding:18px 20px;font:400 16px/1.65 ${FONT};color:${C.ink};white-space:pre-wrap;">${esc(text)}</td></tr></table>`;

/** Alert that goes to the business owner when a new consultation request arrives. */
export function ownerEmail(l: Lead) {
  const f = esc(first(l.name));
  const initial = esc((l.name.trim()[0] || "?").toUpperCase());
  const subject = `New lead: ${l.name.replace(/[\r\n]+/g, " ")} (${l.serviceTitle})`;
  const replyHref = `mailto:${l.email}?subject=${encodeURIComponent("Your consultation request with TS Management Growth")}`;

  const hero = `${pill("NEW LEAD")}
    <div style="margin-top:16px;font:800 36px/1.08 ${FONT};color:#ffffff;letter-spacing:-0.02em;">Someone just asked for your help.</div>
    <div style="margin-top:12px;font:400 17px/1.55 ${FONT};color:#dbe7ff;">A business owner is ready to move. The fastest, friendliest reply usually wins the client.</div>`;

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line};border-radius:18px;"><tr>
      ${stat("Service", esc(l.serviceTitle))}${stat("Received", esc(when(l.receivedAt)))}<td width="33%" style="padding:14px 10px;text-align:center;"><div style="font:600 11px ${FONT};letter-spacing:0.12em;color:${C.muted};text-transform:uppercase;">Goal</div><div style="margin-top:5px;font:700 15px ${FONT};color:${C.b700};">Reply in 1 hour</div></td>
    </tr></table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr>
      <td width="60" style="vertical-align:top;"><div style="width:56px;height:56px;line-height:56px;border-radius:28px;text-align:center;font:700 24px/56px ${FONT};color:#ffffff;${btnGradient}">${initial}</div></td>
      <td style="vertical-align:middle;padding-left:6px;">
        <div style="font:800 24px/1.2 ${FONT};color:${C.n900};">${esc(l.name)}</div>
        <div style="margin-top:4px;font:400 15px/1.5 ${FONT};"><a href="mailto:${esc(l.email)}" style="color:${C.b700};text-decoration:none;font-weight:600;">${esc(l.email)}</a>${l.phone ? ` &nbsp;·&nbsp; <a href="tel:${esc(l.phone)}" style="color:${C.b700};text-decoration:none;font-weight:600;">${esc(l.phone)}</a>` : ""}</div>
      </td>
    </tr></table>

    <div style="margin:26px 0 10px;font:700 12px ${FONT};letter-spacing:0.14em;color:${C.muted};">THEIR MESSAGE</div>
    ${quote(l.message)}

    <div style="margin-top:30px;">
      ${button(replyHref, `Reply to ${f}`)}${l.phone ? button(`tel:${l.phone}`, "Call now", "ghost") : ""}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;"><tr><td style="${gradient}border-radius:18px;padding:22px 24px;">
      <div style="font:800 17px ${FONT};color:#ffffff;">Make the first reply count</div>
      <div style="margin-top:8px;font:400 15px/1.7 ${FONT};color:#dbe7ff;">
        &#10003;&nbsp; Thank ${f} by name and confirm what you can help with.<br>
        &#10003;&nbsp; Agree the scope and price before any work begins.<br>
        &#10003;&nbsp; Never ask for a Social Security number by email.
      </div>
    </td></tr></table>`;

  const text = `NEW LEAD: ${l.name}\nService: ${l.serviceTitle}\nReceived: ${when(l.receivedAt)}\nEmail: ${l.email}\nPhone: ${l.phone || "not provided"}\n\nMessage:\n${l.message}\n\nGoal: reply within 1 hour. Confirm scope before any work begins. Never ask for an SSN by email.`;

  return {
    subject,
    text,
    html: shell({
      preheader: `${l.name} wants help: ${l.serviceTitle}. Reply while they are hot.`,
      hero,
      body,
      footNote: "You are receiving this because someone submitted the consultation form on your website. The request is also saved in your database.",
    }),
  };
}

/** Confirmation that goes to the customer. Only sent once a domain is verified (see SEND_CONFIRMATION). */
export function customerEmail(l: Lead) {
  const f = esc(first(l.name));
  const step = (n: number, title: string, text: string) => `
    <tr><td width="52" style="vertical-align:top;padding:0 0 18px;"><div style="width:38px;height:38px;line-height:38px;border-radius:19px;text-align:center;font:700 16px/38px ${FONT};color:#ffffff;${btnGradient}">${n}</div></td>
    <td style="vertical-align:top;padding:0 0 18px;"><div style="font:700 17px ${FONT};color:${C.n900};">${title}</div><div style="margin-top:3px;font:400 15px/1.55 ${FONT};color:${C.muted};">${text}</div></td></tr>`;

  const hero = `${pill("REQUEST RECEIVED")}
    <div style="margin-top:16px;font:800 36px/1.08 ${FONT};color:#ffffff;letter-spacing:-0.02em;">Thanks, ${f}. You are in good hands.</div>
    <div style="margin-top:12px;font:400 17px/1.55 ${FONT};color:#dbe7ff;">We received your request and we are already on it. The administrative work is about to get a lot lighter.</div>`;

  const body = `
    <div style="font:800 22px ${FONT};color:${C.n900};">What happens next</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
      ${step(1, "We review your request", "We read every request personally so we can point you the right way.")}
      ${step(2, "We confirm the scope", "You will hear from us with exactly what we will and will not do, and what it costs.")}
      ${step(3, "You approve, then we start", "Nothing begins until you say yes. You stay in control the whole way.")}
    </table>

    <div style="margin:10px 0 10px;font:700 12px ${FONT};letter-spacing:0.14em;color:${C.muted};">WHAT YOU SENT US &nbsp;·&nbsp; ${esc(l.serviceTitle).toUpperCase()}</div>
    ${quote(l.message)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;"><tr><td style="background:${C.mist};border:1px solid ${C.line};border-radius:18px;padding:18px 22px;font:400 14px/1.65 ${FONT};color:${C.muted};">
      <strong style="color:${C.n900};">A quick, friendly reminder.</strong> We provide administrative support only, not legal, tax or accounting advice. Please never email us Social Security numbers, taxpayer IDs, passwords, card numbers or ID documents. Government and third-party fees are always shown separately and up front.
    </td></tr></table>

    <div style="margin-top:28px;font:700 18px ${FONT};color:${C.n900};">Business administration that moves with your growth.</div>
    <div style="margin-top:6px;font:400 15px/1.6 ${FONT};color:${C.muted};">Talk soon,<br><strong style="color:${C.n900};">The TS Management Growth team</strong></div>`;

  const text = `Thanks, ${first(l.name)}. We received your request.\n\nWhat happens next:\n1. We review your request.\n2. We confirm the scope and cost with you.\n3. You approve, then we start. Nothing begins until you say yes.\n\nYou sent us (${l.serviceTitle}):\n${l.message}\n\nWe provide administrative support only, not legal, tax or accounting advice. Please never email us Social Security numbers, taxpayer IDs, passwords, card numbers or ID documents.\n\nThe TS Management Growth team`;

  return {
    subject: `We received your request, ${first(l.name)}`,
    text,
    html: shell({
      preheader: `We got your request and we are on it. Here is what happens next.`,
      hero,
      body,
      footNote: "You are receiving this because you requested a consultation on our website.",
    }),
  };
}
