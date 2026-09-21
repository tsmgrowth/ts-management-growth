import { C, FONT, SITE, button, esc, first, pill, shell } from "./email";
import { invoiceLabel, type Full } from "./invoices";
import { lineTotal, totals, usd } from "./money";

export const payUrl = (token: string) => `${SITE}/pay/${token}`;

/** Invoice email sent to the customer with a button to review and pay. */
export function invoiceEmail(f: Full) {
  const { invoice, customer, items } = f;
  const all = totals(items, new Set(items.map((i) => i.id)));
  const required = totals(items, new Set());
  const hasOptional = items.some((i) => i.optional);
  const url = payUrl(invoice.token);
  const label = invoiceLabel(invoice.number);

  const rows = items
    .map((i) => {
      const tag = i.optional ? `<span style="color:${C.sky};font-weight:700;"> &nbsp;OPTIONAL</span>` : i.recurring ? `<span style="color:${C.sky};font-weight:700;"> &nbsp;MONTHLY</span>` : "";
      const tag2 = i.optional && i.recurring ? `<span style="color:${C.sky};font-weight:700;"> &nbsp;MONTHLY</span>` : "";
      return `<tr><td style="padding:12px 0;border-bottom:1px solid ${C.line};font:600 15px ${FONT};color:${C.n900};">${esc(i.description)}${i.qty > 1 ? ` <span style="color:${C.muted};font-weight:400;">x ${i.qty}</span>` : ""}<div style="font:700 11px ${FONT};letter-spacing:0.1em;">${tag}${tag2}</div></td><td align="right" style="padding:12px 0;border-bottom:1px solid ${C.line};font:700 15px ${FONT};color:${C.n900};white-space:nowrap;">${usd(lineTotal(i))}${i.recurring ? "<span style=\"font-weight:400;color:" + C.muted + ";\">/mo</span>" : ""}</td></tr>`;
    })
    .join("");

  const hero = `${pill(`INVOICE ${esc(label)}`)}
    <div style="margin-top:16px;font:800 34px/1.1 ${FONT};color:#ffffff;letter-spacing:-0.02em;">Hi ${esc(first(customer.name))}, your breakdown is ready.</div>
    <div style="margin-top:12px;font:400 17px/1.55 ${FONT};color:#dbe7ff;">Review each item${hasOptional ? ", choose yes or no on the optional ones," : ""} and pay securely online.</div>`;

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
      <tr><td style="font:400 14px ${FONT};color:${C.muted};padding:4px 0;">Required items${required.monthly ? " (first month included)" : ""}</td><td align="right" style="font:700 15px ${FONT};color:${C.n900};">${usd(required.dueToday)}</td></tr>
      ${hasOptional ? `<tr><td style="font:400 14px ${FONT};color:${C.muted};padding:4px 0;">If you choose every optional item</td><td align="right" style="font:700 15px ${FONT};color:${C.n900};">${usd(all.dueToday)}</td></tr>` : ""}
      ${all.monthly ? `<tr><td colspan="2" style="font:400 13px/1.5 ${FONT};color:${C.muted};padding:8px 0 0;">Monthly items renew every month until you cancel.</td></tr>` : ""}
      <tr><td colspan="2" style="font:400 13px/1.5 ${FONT};color:${C.muted};padding:8px 0 0;">Amounts are before tax. Any applicable tax is calculated and shown at checkout.</td></tr>
    </table>
    ${invoice.memo ? `<div style="margin-top:18px;background:${C.mist};border-left:4px solid ${C.b600};border-radius:14px;padding:14px 18px;font:400 15px/1.6 ${FONT};color:${C.ink};white-space:pre-wrap;">${esc(invoice.memo)}</div>` : ""}
    <div style="margin-top:26px;">${button(url, "Review and pay")}</div>
    <div style="font:400 13px/1.6 ${FONT};color:${C.muted};">Or copy this link: <a href="${esc(url)}" style="color:${C.b700};">${esc(url)}</a></div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;"><tr><td style="background:${C.mist};border:1px solid ${C.line};border-radius:18px;padding:16px 20px;font:400 13px/1.65 ${FONT};color:${C.muted};">
      <strong style="color:${C.n900};">Secure payment.</strong> Card details are entered on our payment provider's secure page. We never see or store your full card number. Please do not reply with card numbers or other sensitive information.
    </td></tr></table>`;

  const text = `Hi ${first(customer.name)},\n\nYour invoice ${label} from TS Management Growth is ready.\n\n${items.map((i) => `- ${i.description}${i.optional ? " (optional)" : ""}${i.recurring ? " (monthly)" : ""}: ${usd(lineTotal(i))}`).join("\n")}\n\nRequired items: ${usd(required.dueToday)}\nAmounts are before tax; any tax is shown at checkout.\n\nReview and pay: ${url}\n\nTS Management Growth`;

  return {
    subject: `Invoice ${label} from TS Management Growth`,
    text,
    html: shell({ preheader: `Your invoice ${label} is ready. Review each item and pay securely.`, hero, body, footNote: "You are receiving this because TS Management Growth sent you an invoice." }),
  };
}

export function paidOwnerEmail(f: Full, how: string) {
  const label = invoiceLabel(f.invoice.number);
  const body = `<div style="font:700 18px ${FONT};color:${C.n900};">${esc(f.customer.name)} paid ${esc(label)}.</div><div style="margin-top:8px;font:400 15px/1.6 ${FONT};color:${C.muted};">Method: ${esc(how)}. Open the admin portal to see details.</div><div style="margin-top:18px;">${button(`${SITE}/admin/invoices/${f.invoice.id}`, "Open invoice")}</div>`;
  return {
    subject: `Paid: ${label} (${f.customer.name})`,
    text: `${f.customer.name} paid ${label} (${how}). ${SITE}/admin/invoices/${f.invoice.id}`,
    html: shell({ preheader: `${label} was paid.`, hero: `${pill("PAYMENT")}<div style="margin-top:16px;font:800 32px/1.1 ${FONT};color:#ffffff;">Payment received</div>`, body, footNote: "Automatic notice from your portal." }),
  };
}

export function cashOwnerEmail(f: Full) {
  const label = invoiceLabel(f.invoice.number);
  const body = `<div style="font:700 18px ${FONT};color:${C.n900};">${esc(f.customer.name)} chose to pay ${esc(label)} in cash.</div><div style="margin-top:8px;font:400 15px/1.6 ${FONT};color:${C.muted};">Contact them at ${esc(f.customer.email)} to arrange it, then mark the invoice paid in the portal.</div><div style="margin-top:18px;">${button(`${SITE}/admin/invoices/${f.invoice.id}`, "Open invoice")}</div>`;
  return {
    subject: `Cash selected: ${label} (${f.customer.name})`,
    text: `${f.customer.name} chose cash for ${label}. ${SITE}/admin/invoices/${f.invoice.id}`,
    html: shell({ preheader: `${label}: cash selected.`, hero: `${pill("CASH")}<div style="margin-top:16px;font:800 32px/1.1 ${FONT};color:#ffffff;">Cash payment selected</div>`, body, footNote: "Automatic notice from your portal." }),
  };
}

export function loginCodeEmail(code: string) {
  const body = `<div style="font:700 15px ${FONT};color:${C.muted};">Your sign-in code</div><div style="margin-top:8px;font:800 40px ${FONT};letter-spacing:0.25em;color:${C.n900};">${esc(code)}</div><div style="margin-top:12px;font:400 14px/1.6 ${FONT};color:${C.muted};">It expires in 10 minutes. If you did not request it, ignore this email.</div>`;
  return {
    subject: "Your TS Management Growth sign-in code",
    text: `Your sign-in code is ${code}. It expires in 10 minutes.`,
    html: shell({ preheader: "Your one-time sign-in code.", hero: `${pill("ADMIN SIGN-IN")}<div style="margin-top:16px;font:800 30px/1.1 ${FONT};color:#ffffff;">Sign in to the portal</div>`, body, footNote: "Security notice." }),
  };
}
