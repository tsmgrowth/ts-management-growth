"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitConsultation, type FormState } from "@/app/contact/actions";
import { Arrow, Check } from "./icons";
import { services } from "@/lib/site";

const initial: FormState = { status: "idle", message: "", values: { name: "", email: "", phone: "", service: "", message: "" } };
const input = "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-brand-600";
const label = "block text-sm font-semibold text-ink";

export function ContactForm({ defaultService }: { defaultService: string }) {
  const [state, action, pending] = useActionState(submitConsultation, initial);
  const [opened] = useState(() => String(Date.now()));
  const result = useRef<HTMLDivElement>(null);

  // Bring the success or error message into view so it is never hidden above the fold.
  useEffect(() => {
    if (state.status !== "idle") result.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);

  if (state.status === "ok") {
    return (
      <div ref={result} className="card animate-rise" role="status">
        <p className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-sm font-semibold text-brand-700"><Check className="h-4 w-4" /> Request received</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">Thank you. We will be in touch.</h2>
        <p className="mt-2 leading-relaxed text-muted">We will review your request and follow up to confirm the scope. No work begins until you approve it.</p>
      </div>
    );
  }

  const v = state.values;
  return (
    <form action={action} className="card space-y-5" noValidate>
      {state.status === "error" && (
        <div ref={result} role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-base font-medium text-red-800">{state.message}</div>
      )}

      <div>
        <label htmlFor="name" className={label}>Your name</label>
        <input id="name" name="name" required autoComplete="name" defaultValue={v.name} className={input} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} className={input} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone <span className="font-normal text-muted">(optional)</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={label}>What do you need help with?</label>
        <select id="service" name="service" defaultValue={v.service || defaultService} className={input}>
          <option value="">Choose a service</option>
          <option value="not-sure">I am not sure yet</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>Tell us a little about your situation</label>
        <textarea id="message" name="message" required rows={5} maxLength={2000} defaultValue={v.message} className={input} />
        <p className="mt-1.5 text-sm text-muted">Please do not include Social Security numbers, taxpayer IDs, passwords, card numbers or ID documents.</p>
      </div>

      {/* Spam trap: hidden from people, visible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <input type="hidden" name="t" value={opened} suppressHydrationWarning />

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
        <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-brand-600" />
        <span>I understand TS Management Growth provides administrative support only, not legal, tax or accounting advice, and that nothing starts until I approve the scope.</span>
      </label>

      <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-auto">
        {pending ? "Sending..." : "Send my request"} {!pending && <Arrow className="h-5 w-5" />}
      </button>
    </form>
  );
}
