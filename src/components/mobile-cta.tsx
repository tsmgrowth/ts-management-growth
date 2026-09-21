"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileCta() {
  const path = usePathname();
  // Not shown in the admin portal or on customer payment pages.
  if (path.startsWith("/admin") || path.startsWith("/pay")) return null;
  return (
    <aside aria-label="Quick action" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 p-3 backdrop-blur-xl sm:hidden">
      <Link href="/contact" className="btn btn-primary w-full">Request a Consultation</Link>
    </aside>
  );
}
