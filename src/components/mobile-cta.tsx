import Link from "next/link";

export function MobileCta() {
  return (
    <aside aria-label="Quick action" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 p-3 backdrop-blur-xl sm:hidden">
      <Link href="/contact" className="btn btn-primary w-full">Request a Consultation</Link>
    </aside>
  );
}
