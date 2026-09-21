import Link from "next/link";
import { PathFinder } from "@/components/path-finder";
import { Arrow, Check, Clock, Folder, Shield, Star, Target } from "@/components/icons";
import { company, faqs, groups, processSteps, services } from "@/lib/site";

const values = [
  { icon: Star, title: "Professional", text: "Business services delivered with professionalism and attention to detail." },
  { icon: Folder, title: "Organized", text: "Business information and responsibilities kept structured and accessible." },
  { icon: Clock, title: "Convenient", text: "Administrative services designed around the needs of today's business owner." },
  { icon: Target, title: "Reliable", text: "Consistent support that keeps business responsibilities moving forward." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-mist">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(11,27,59,0.07)_1px,transparent_0)] [background-size:28px_28px]" />
        <div aria-hidden="true" className="animate-drift pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-glow/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow"><span className="h-2 w-2 rounded-full bg-sky" /> Business administration for Florida</span>
            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Business administration that <span className="bg-gradient-to-r from-brand-600 to-sky bg-clip-text text-transparent">moves with your growth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We handle the filings, paperwork and organization, so you can focus on running your business.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#path" className="btn btn-primary">Find my path <Arrow className="h-5 w-5" /></a>
              <Link href="/contact" className="btn btn-ghost">Request a Consultation</Link>
            </div>
            <ul className="mt-8 space-y-2.5 text-[0.95rem] text-ink">
              {["You make the decisions. We handle the administrative process.", "Administrative support only, not legal, tax or accounting advice."].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{t}</li>
              ))}
            </ul>
          </div>
          <PathFinder />
        </div>
      </section>

      <section className="container-x py-16 sm:py-24" aria-labelledby="how">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">How it works</p>
        <h2 id="how" className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Five clear steps, no surprises.</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.title} className="card !p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-sm font-semibold text-white">{i + 1}</span>
              <p className="mt-4 font-semibold">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-mist py-16 sm:py-24" aria-labelledby="svc">
        <div className="container-x">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Services</p>
          <h2 id="svc" className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Everything administrative, in one place.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.id} className="card">
                <h3 className="text-xl font-semibold tracking-tight">{g.title}</h3>
                <p className="mt-1 text-muted">{g.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {services.filter((s) => s.group === g.id).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="inline-block rounded-full border border-line bg-mist px-3.5 py-1.5 text-sm font-medium text-ink transition hover:border-brand-600 hover:bg-white hover:text-brand-700">{s.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24" aria-labelledby="scope">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card !border-brand-600/30 !bg-gradient-to-br from-white to-mist">
            <h2 id="scope" className="flex items-center gap-2 text-xl font-semibold"><Shield className="h-6 w-6 text-brand-600" /> What we do</h2>
            <p className="mt-3 leading-relaxed text-muted">Administrative support: navigating filing systems, entering the information you provide, tracking statuses and deadlines, and keeping your records organized.</p>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold">What we do not do</h2>
            <p className="mt-3 leading-relaxed text-muted">We do not provide legal advice, legal representation, tax advice, accounting advice, or legal document drafting. When you need a professional opinion, we encourage you to consult a qualified professional.</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 text-white sm:py-24" aria-labelledby="std">
        <div className="container-x">
          <p className="text-sm font-semibold uppercase tracking-wider text-glow">Our standard</p>
          <h2 id="std" className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Built to keep the administrative side simple.</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-glow"><Icon className="h-6 w-6" /></span>
                <p className="mt-4 text-lg font-semibold">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24" aria-labelledby="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">FAQ</p>
            <h2 id="faq" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Quick answers.</h2>
            <Link href="/faq" className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline">See all questions <Arrow className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-3">
            {faqs.slice(0, 3).map((f) => (
              <details key={f.q} className="card group !p-5">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 to-brand-700 p-8 text-white sm:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-glow/30 blur-3xl" />
          <h2 className="relative max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Ready to take the administrative work off your plate?</h2>
          <p className="relative mt-3 max-w-xl text-white/80">{company.tagline}.</p>
          <Link href="/contact" className="btn btn-light relative mt-7">Request a Consultation <Arrow className="h-5 w-5" /></Link>
        </div>
      </section>
    </>
  );
}
