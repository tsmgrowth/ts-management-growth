import Link from "next/link";
import type { ReactNode } from "react";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-brand-700">Home</Link></li>
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {i.href ? <Link href={i.href} className="hover:text-brand-700">{i.label}</Link> : <span aria-current="page" className="text-ink">{i.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, title, lead }: { crumbs: { label: string; href?: string }[]; title: string; lead?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-glow/20 blur-3xl" />
      <div className="container-x relative py-12 sm:py-16">
        <Crumbs items={crumbs} />
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`container-x py-14 sm:py-20 ${className}`}>{children}</section>;
}

export function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} title={title} />
      <Section>
        <div className="card max-w-2xl">
          <p className="text-lg text-ink">{note}</p>
          <Link href="/contact" className="btn btn-primary mt-6">Request a Consultation</Link>
        </div>
      </Section>
    </>
  );
}
