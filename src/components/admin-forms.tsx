"use client";

import { useActionState, useState } from "react";
import { inputCls, labelCls } from "./ui";
import type { ActionState } from "@/app/admin/actions";

type Act = (prev: ActionState, fd: FormData) => Promise<ActionState>;
const init: ActionState = { error: "" };

export function Msg({ text, ok }: { text: string; ok?: string }) {
  if (text) return <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800">{text}</p>;
  return ok ? <p role="status" className="rounded-xl bg-mist p-3 text-sm text-muted">{ok}</p> : null;
}

export function CustomerForm({ action, values, submit }: { action: Act; values?: { name: string; email: string; phone: string | null; company: string | null; country: string | null; notes: string | null }; submit: string }) {
  const [s, a, pending] = useActionState(action, init);
  const v = values;
  return (
    <form action={a} className="card space-y-5" noValidate>
      <Msg text={s.error} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="name" className={labelCls}>Name</label><input id="name" name="name" required defaultValue={v?.name} className={inputCls} /></div>
        <div><label htmlFor="company" className={labelCls}>Company (optional)</label><input id="company" name="company" defaultValue={v?.company ?? ""} className={inputCls} /></div>
        <div><label htmlFor="email" className={labelCls}>Email</label><input id="email" name="email" type="email" required defaultValue={v?.email} className={inputCls} /></div>
        <div><label htmlFor="phone" className={labelCls}>Phone (optional)</label><input id="phone" name="phone" type="tel" defaultValue={v?.phone ?? ""} className={inputCls} /></div>
        <div><label htmlFor="country" className={labelCls}>Country (optional)</label><input id="country" name="country" defaultValue={v?.country ?? ""} className={inputCls} /></div>
      </div>
      <div><label htmlFor="notes" className={labelCls}>Private notes</label><textarea id="notes" name="notes" rows={4} defaultValue={v?.notes ?? ""} className={inputCls} /><p className="mt-1.5 text-sm text-muted">Only you see these. Do not store SSNs, card numbers or ID numbers here.</p></div>
      <button disabled={pending} className="btn btn-primary">{pending ? "Saving..." : submit}</button>
    </form>
  );
}

export function ActionButton({ action, label, className = "btn btn-ghost", children }: { action: Act; label: string; className?: string; children?: React.ReactNode }) {
  const [s, a, pending] = useActionState(action, init);
  return (
    <form action={a} className="space-y-2">
      {children}
      <button disabled={pending} className={className}>{pending ? "Working..." : label}</button>
      <Msg text={s.error} />
    </form>
  );
}

export function CopyLink({ url }: { url: string }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <input readOnly value={url} aria-label="Pay link" onFocus={(e) => e.currentTarget.select()} className={`${inputCls} !mt-0 flex-1 text-sm`} />
      <button type="button" className="btn btn-ghost" onClick={async () => { try { await navigator.clipboard.writeText(url); setOk(true); setTimeout(() => setOk(false), 2000); } catch { /* user can select and copy */ } }}>{ok ? "Copied" : "Copy link"}</button>
    </div>
  );
}
