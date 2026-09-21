import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export function AdminNav() {
  return (
    <div className="border-b border-line bg-navy-900 text-white">
      <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm">
        <strong className="text-base">Admin portal</strong>
        <nav aria-label="Admin" className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/admin" className="hover:underline">Dashboard</Link>
          <Link href="/admin/customers/new" className="hover:underline">New customer</Link>
        </nav>
        <form action={signOut} className="ml-auto flex items-center gap-3">
          <button className="rounded-full border border-white/30 px-3 py-1 hover:bg-white/10">Sign out</button>
        </form>
      </div>
    </div>
  );
}
