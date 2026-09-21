"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow, Check, icons } from "./icons";
import { getService, paths, priceLabel } from "@/lib/site";

type Step = 1 | 2 | 3;
const labels = ["Choose", "Match", "Book"];

export function PathFinder() {
  const [step, setStep] = useState<Step>(1);
  const [pathId, setPathId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const go = (s: Step) => {
    setStep(s);
    requestAnimationFrame(() => heading.current?.focus());
  };
  const path = paths.find((p) => p.id === pathId);
  const chosen = slug ? getService(slug) : undefined;

  return (
    <div id="path" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900 p-5 text-white shadow-[0_30px_80px_-30px_rgba(10,31,77,0.9)] sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-glow/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-600/40 blur-3xl" />

      <div className="relative">
        <ol className="flex items-center gap-2" aria-label="Progress">
          {labels.map((l, i) => {
            const n = (i + 1) as Step;
            const done = step > n;
            const current = step === n;
            return (
              <li key={l} className="flex flex-1 items-center gap-2" aria-current={current ? "step" : undefined}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition ${done ? "bg-glow text-navy-950" : current ? "bg-white text-navy-900" : "bg-white/10 text-white/70"}`}>
                  {done ? <Check className="h-4 w-4" /> : n}
                </span>
                <span className={`text-sm font-medium ${current ? "text-white" : "text-white/70"}`}>{l}</span>
                {i < 2 && <span aria-hidden="true" className={`h-1 flex-1 rounded-full transition-all duration-500 ${step > n ? "bg-glow" : "bg-white/15"}`} />}
              </li>
            );
          })}
        </ol>

        <div key={step} className="mt-6 animate-rise" aria-live="polite">
          {step === 1 && (
            <>
              <h2 ref={heading} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none sm:text-[1.7rem]">What best describes you?</h2>
              <p className="mt-1.5 text-white/75">Pick one. It takes about 10 seconds.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {paths.map((p) => {
                  const Icon = icons[p.icon];
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { setPathId(p.id); setSlug(null); go(2); }}
                      className="group flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-left transition hover:-translate-y-0.5 hover:border-glow hover:bg-white/[0.12]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-glow"><Icon className="h-6 w-6" /></span>
                      <span>
                        <span className="block text-base font-semibold">{p.label}</span>
                        <span className="mt-0.5 block text-sm text-white/70">{p.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && path && (
            <>
              <h2 ref={heading} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none sm:text-[1.7rem]">Here is what fits you</h2>
              <p className="mt-1.5 text-white/75">Choose the one closest to what you need.</p>
              <ul className="mt-5 space-y-3">
                {path.slugs.map((s) => {
                  const svc = getService(s)!;
                  return (
                    <li key={s} className="rounded-2xl border border-white/15 bg-white/[0.06] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-semibold">{svc.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-white/75">{svc.summary}</p>
                          <p className="mt-2 text-sm font-semibold text-glow">{priceLabel(svc)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link href={`/services/${svc.slug}`} className="text-sm text-white/80 underline underline-offset-4 hover:text-white">Details</Link>
                          <button type="button" onClick={() => { setSlug(s); go(3); }} className="btn btn-light !px-4 !py-2 !text-sm">Choose</button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button type="button" onClick={() => go(1)} className="mt-4 text-sm text-white/75 underline underline-offset-4 hover:text-white">Back</button>
            </>
          )}

          {step === 3 && chosen && (
            <>
              <p className="inline-flex items-center gap-2 rounded-full bg-glow/15 px-3 py-1 text-sm font-semibold text-glow"><Check className="h-4 w-4" /> Great choice</p>
              <h2 ref={heading} tabIndex={-1} className="mt-3 text-2xl font-semibold tracking-tight outline-none sm:text-[1.7rem]">{chosen.title}</h2>
              <p className="mt-1.5 text-white/75">{priceLabel(chosen)}. {chosen.govFee ?? "Government and third-party fees, if any, are separate."}</p>
              <p className="mt-3 text-sm text-white/75">Next, request a consultation. We confirm the scope with you before any work begins.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href={`/contact?service=${chosen.slug}`} className="btn btn-light">
                  {chosen.comingSoon ? "Check availability" : "Request a Consultation"} <Arrow className="h-5 w-5" />
                </Link>
                <button type="button" onClick={() => go(2)} className="text-sm text-white/75 underline underline-offset-4 hover:text-white">Change my choice</button>
                <button type="button" onClick={() => { setPathId(null); setSlug(null); go(1); }} className="text-sm text-white/75 underline underline-offset-4 hover:text-white">Start over</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
