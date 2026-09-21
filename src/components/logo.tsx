import Link from "next/link";

// Temporary vector mark in the brand colors. Swap for the official logo file once it is added to /public.
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b6cf0" />
          <stop offset="1" stopColor="#0a1f4d" />
        </linearGradient>
        <linearGradient id="la" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0089d7" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#lm)" />
      <path d="M12 33c5-1 8-5 11-9s6-7 12-8" fill="none" stroke="url(#la)" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M29 13.5l7.5 2-3.2 7" fill="none" stroke="#e9f3ff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 38h13" stroke="#c9d1de" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="TS Management Growth LLC, home">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.05rem] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>TS Management Growth</span>
        <span className={`mt-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] ${light ? "text-silver" : "text-muted"}`}>LLC</span>
      </span>
    </Link>
  );
}
