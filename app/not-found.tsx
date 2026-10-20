import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-6 py-24">
      <p className="text-sm text-muted-foreground">404 · Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Let’s get you back on track.</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">This page may have moved, or it may not be published yet.</p>
      <Link href="/guides" className="mt-8 inline-block font-medium underline underline-offset-4">Explore our guides →</Link>
    </main>
  );
}
