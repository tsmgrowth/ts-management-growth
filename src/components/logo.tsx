import Image from "next/image";
import Link from "next/link";

// The official TS mark, cropped from the brand logo. Source file: /public/logo-mark.jpg
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo-mark.jpg"
      alt=""
      width={size}
      height={size}
      priority
      className="rounded-[26%] shadow-[0_6px_18px_-6px_rgba(20,73,201,0.55)]"
    />
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
