import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">We could not find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The page may have moved. Head back home or browse our services.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/services" className="btn btn-ghost">Services</Link>
      </div>
    </section>
  );
}
