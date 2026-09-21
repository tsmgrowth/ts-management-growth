"use client";

import { useActionState, useMemo, useState } from "react";
import { createInvoice, type ActionState } from "@/app/admin/actions";
import { inputCls, labelCls } from "./ui";
import { Msg } from "./admin-forms";
import { toCents, usd } from "@/lib/money";

type Row = { key: number; description: string; price: string; qty: number; optional: boolean; recurring: boolean; service_slug?: string };
export type CatalogItem = { slug: string; title: string; price: number; recurring: boolean };
const init: ActionState = { error: "" };
let n = 0;

export function InvoiceBuilder({ customerId, catalog }: { customerId: string; catalog: CatalogItem[] }) {
  const [state, action, pending] = useActionState(createInvoice, init);
  const [rows, setRows] = useState<Row[]>([]);
  const [pick, setPick] = useState("");

  const add = (r: Partial<Row>) => setRows((x) => [...x, { key: ++n, description: "", price: "", qty: 1, optional: false, recurring: false, ...r }]);
  const set = (key: number, patch: Partial<Row>) => setRows((x) => x.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const payload = useMemo(() => JSON.stringify(rows.map((r) => ({ description: r.description, price: r.price, qty: r.qty, optional: r.optional, recurring: r.recurring, service_slug: r.service_slug }))), [rows]);

  const sum = (pred: (r: Row) => boolean) => rows.filter(pred).reduce((t, r) => t + (toCents(r.price) ?? 0) * (r.qty || 0), 0);
  const required = sum((r) => !r.optional);
  const optional = sum((r) => r.optional);

  return (
    <form action={action} className="space-y-6" noValidate>
      <input type="hidden" name="customer_id" value={customerId} />
      <input type="hidden" name="payload" value={payload} />
      <Msg text={state.error} />

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">Line items</h2>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-56 flex-1">
            <label htmlFor="pick" className={labelCls}>Add a service</label>
            <select id="pick" value={pick} onChange={(e) => setPick(e.target.value)} className={inputCls}>
              <option value="">Choose a service</option>
              {catalog.map((c) => <option key={c.slug} value={c.slug}>{c.title} ({usd(c.price * 100)}{c.recurring ? "/mo" : ""})</option>)}
            </select>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => { const c = catalog.find((x) => x.slug === pick); if (c) { add({ description: c.title, price: String(c.price), recurring: c.recurring, service_slug: c.slug }); setPick(""); } }}>Add</button>
          <button type="button" className="btn btn-ghost" onClick={() => add({})}>Add custom line</button>
        </div>

        {rows.length === 0 && <p className="text-muted">No items yet. Add a service or a custom line.</p>}
        <ul className="space-y-4">
          {rows.map((r, i) => (
            <li key={r.key} className="rounded-2xl border border-line p-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_8rem_6rem]">
                <div><label htmlFor={`d${r.key}`} className={labelCls}>Description</label><input id={`d${r.key}`} value={r.description} onChange={(e) => set(r.key, { description: e.target.value })} className={inputCls} /></div>
                <div><label htmlFor={`p${r.key}`} className={labelCls}>Price ($)</label><input id={`p${r.key}`} inputMode="decimal" value={r.price} onChange={(e) => set(r.key, { price: e.target.value })} className={inputCls} /></div>
                <div><label htmlFor={`q${r.key}`} className={labelCls}>Qty</label><input id={`q${r.key}`} type="number" min={1} value={r.qty} onChange={(e) => set(r.key, { qty: Number(e.target.value) })} className={inputCls} /></div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={r.optional} onChange={(e) => set(r.key, { optional: e.target.checked })} className="h-5 w-5 accent-brand-600" /> Customer chooses yes or no</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={r.recurring} onChange={(e) => set(r.key, { recurring: e.target.checked })} className="h-5 w-5 accent-brand-600" /> Monthly (repeats until cancelled)</label>
                <button type="button" className="ml-auto text-red-700 underline" onClick={() => setRows((x) => x.filter((y) => y.key !== r.key))}>Remove line {i + 1}</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">Required items: <strong>{usd(required)}</strong>{optional > 0 && <> · Optional items: <strong>{usd(optional)}</strong></>} · before tax</p>
      </div>

      <div className="card space-y-4">
        <div><label htmlFor="memo" className={labelCls}>Note to customer (optional)</label><textarea id="memo" name="memo" rows={3} className={inputCls} /></div>
        <div className="max-w-xs"><label htmlFor="due_date" className={labelCls}>Due date (optional)</label><input id="due_date" name="due_date" type="date" className={inputCls} /></div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button name="send" value="1" disabled={pending} className="btn btn-primary">{pending ? "Working..." : "Save and email to customer"}</button>
        <button name="send" value="0" disabled={pending} className="btn btn-ghost">Save as draft</button>
      </div>
    </form>
  );
}
