"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { Chevron, Close, Menu } from "./icons";
import { groups, services } from "@/lib/site";

const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/international", label: "International" },
  { href: "/rules", label: "Rules" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const closeAll = () => { setMobile(false); setMenu(false); };

  return (
    <header
      className="sticky top-0 z-40 border-b border-line/70 bg-white/80 backdrop-blur-xl"
      onKeyDown={(e) => { if (e.key === "Escape") closeAll(); }}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={menu}
              aria-controls="services-menu"
              onClick={() => setMenu((v) => !v)}
              className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink hover:bg-mist"
            >
              Services <Chevron className={`h-4 w-4 transition ${menu ? "rotate-180" : ""}`} />
            </button>
            {menu && (
              <div id="services-menu" className="absolute left-0 top-full mt-3 w-[46rem] rounded-3xl border border-line bg-white p-6 shadow-2xl animate-rise">
                <div className="grid grid-cols-3 gap-6">
                  {groups.filter((g) => g.id !== "ongoing").map((g) => (
                    <div key={g.id}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{g.title}</p>
                      <ul className="mt-3 space-y-1.5">
                        {services.filter((s) => s.group === g.id || (g.id === "organization" && s.group === "ongoing")).map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} onClick={closeAll} className="block rounded-lg px-2 py-1.5 text-[0.92rem] text-ink hover:bg-mist">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link href="/services" onClick={closeAll} className="mt-5 inline-block text-sm font-semibold text-brand-700 hover:underline">
                  View all services
                </Link>
              </div>
            )}
          </div>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={closeAll} className="whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink hover:bg-mist">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary hidden whitespace-nowrap !px-5 !py-2.5 !text-[0.95rem] sm:inline-flex">
            Request a Consultation
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line xl:hidden"
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobile && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white px-5 pb-8 pt-4 xl:hidden">
          {groups.map((g) => (
            <div key={g.id} className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{g.title}</p>
              <ul className="mt-2">
                {services.filter((s) => s.group === g.id).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} onClick={closeAll} className="block py-2 text-[0.98rem] text-ink">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="mt-2 border-t border-line pt-3">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} onClick={closeAll} className="block py-2.5 text-base font-medium text-ink">{n.label}</Link></li>
            ))}
          </ul>
          <Link href="/contact" onClick={closeAll} className="btn btn-primary mt-4 w-full">Request a Consultation</Link>
        </nav>
      )}
    </header>
  );
}
