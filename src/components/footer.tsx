import Link from "next/link";
import { Logo } from "./logo";
import { company, groups, services } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-silver">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">{company.tagline}.</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-silver/80">{company.serviceArea}</p>
            <Link href="/contact" className="btn btn-light mt-6">Request a Consultation</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.id}>
                <p className="text-xs font-semibold uppercase tracking-wider text-glow">{g.title}</p>
                <ul className="mt-3 space-y-2">
                  {services.filter((s) => s.group === g.id).map((s) => (
                    <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-sm text-silver hover:text-white">{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-silver/90">
          {company.scope} Clients remain responsible for their business decisions and the accuracy of the information they provide.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy" className="hover:text-white">Privacy Notice</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="/accessibility" className="hover:text-white">Accessibility</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
