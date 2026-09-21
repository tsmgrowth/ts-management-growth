"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitPayment, type PayState } from "@/app/pay/[token]/actions";
import { lineTotal, totals, usd, type Item } from "@/lib/money";
import { Msg } from "./admin-forms";

const init: PayState = { error: "" };

export function PayForm({ token, items }: { token: string; items: Item[] }) {
  const [state, action, pending] = useActionState(submitPayment, init);
  const [yes, setYes] = useState<Set<string>>(new Set());
  const [method, setMethod] = useState<"card" | "cash">("card");
  // Controlled so a failed submit does not clear them (React resets uncontrolled fields after an action).
  const [ack, setAck] = useState(false);
  const [ackM, setAckM] = useState(false);
  const t = totals(items, yes);
  const setChoice = (id: string, on: boolean) => setYes((s) => { const n = new Set(s); if (on) n.add(id); else n.delete(id); return n; });

  return (
    <form action={action} className="space-y-6" noValidate>
      <input type="hidden" name="token" value={token} />
      {[...yes].map((id) => <input key={id} type="hidden" name="yes" value={id} />)}
      <input type="hidden" name="method" value={method} />
      <Msg text={state.error} />

      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.id} className="card !p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{i.description}{i.qty > 1 ? ` x ${i.qty}` : ""}</p>
                <p className="mt-1 text-sm text-muted">{i.recurring ? "Billed every month until you cancel" : "One-time"}{i.optional ? " · Optional" : " · Included"}</p>
              </div>
              <p className="text-lg font-semibold">{usd(lineTotal(i))}{i.recurring ? <span className="text-sm font-normal text-muted">/mo</span> : null}</p>
            </div>
            {i.optional && (
              <fieldset className="mt-4">
                <legend className="text-sm font-semibold">Add this?</legend>
                <div className="mt-2 inline-flex overflow-hidden rounded-full border border-line">
                  {[["yes", true], ["no", false]].map(([label, val]) => (
                    <label key={String(label)} className={`cursor-pointer px-6 py-2 text-sm font-semibold ${yes.has(i.id) === val ? "bg-brand-700 text-white" : "bg-white text-ink"} has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky`}>
                      <input type="radio" name={`c-${i.id}`} className="sr-only" checked={yes.has(i.id) === val} onChange={() => setChoice(i.id, val as boolean)} />
                      {label === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </li>
        ))}
      </ul>

      <div className="card space-y-2">
        <h2 className="text-xl font-semibold">Your total</h2>
        <dl className="space-y-1">
          <div className="flex justify-between"><dt className="text-muted">One-time items</dt><dd>{usd(t.oneTime)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Monthly items (charged now, then every month)</dt><dd>{usd(t.monthly)}</dd></div>
          <div className="flex justify-between border-t border-line pt-2 text-xl font-semibold"><dt>Due today before tax</dt><dd>{usd(t.dueToday)}</dd></div>
        </dl>
        <p className="text-sm text-muted">Any applicable sales tax is calculated from your location and shown on the secure payment page before you pay.</p>
      </div>

      <fieldset className="card">
        <legend className="px-1 text-xl font-semibold">How would you like to pay?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[["card", "Card or online", "Card, Apple Pay, Google Pay, bank transfer and pay-later options where available."], ["cash", "Cash", "We will contact you to arrange it. Your invoice stays open until we confirm."]].map(([v, title, hint]) => (
            <label key={v} className={`cursor-pointer rounded-2xl border p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky ${method === v ? "border-brand-600 bg-mist" : "border-line"}`}>
              <input type="radio" name="method_ui" className="sr-only" checked={method === v} onChange={() => setMethod(v as "card" | "cash")} />
              <span className="block font-semibold">{title}</span>
              <span className="mt-1 block text-sm text-muted">{hint}</span>
            </label>
          ))}
        </div>
        {method === "cash" && t.monthly > 0 && <p className="mt-3 text-sm text-muted">Monthly items are set up with card or online payment. With cash we will arrange the schedule with you directly.</p>}
      </fieldset>

      <div className="space-y-3">
        {t.monthly > 0 && (
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" name="ack_monthly" checked={ackM} onChange={(e) => setAckM(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-brand-600" />
            <span>I understand I will be charged {usd(t.monthly)} today and then every month until I cancel. I can cancel by contacting TS Management Growth before the next billing date.</span>
          </label>
        )}
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input type="checkbox" name="ack" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-brand-600" />
          <span>I approve the items and amounts selected above, and I agree to the <Link href="/terms" className="font-medium text-brand-700 underline">Terms of Use</Link> and <Link href="/privacy" className="font-medium text-brand-700 underline">Privacy Notice</Link>. I understand this is administrative support only, not legal, tax or accounting advice.</span>
        </label>
      </div>

      <button disabled={pending || t.dueToday <= 0} className="btn btn-primary w-full sm:w-auto">{pending ? "Please wait..." : method === "cash" ? "Confirm cash payment" : `Continue to secure payment (${usd(t.dueToday)} + tax)`}</button>
    </form>
  );
}
