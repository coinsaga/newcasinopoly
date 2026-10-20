import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "How we work",
  description: "Our approach to operator checks, editorial content and affiliate relationships for South African readers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">How we work</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Clear information comes first.</h1>
      <div className="prose mt-8">
        <p>{site.name} is being developed for adults in South Africa who want to understand operator checks, offer conditions and the risks of gambling.</p>
        <h2>Evidence before recommendations</h2>
        <p>Our operator reviews are being prepared. Before publishing an operator, we check its legal entity, licensing information and the specific products covered by its local authorisation. A website accepting South African customers is not, by itself, evidence of authorisation.</p>
        <p>We link to primary sources where relevant and show when each guide was updated. We do not describe an account or withdrawal as personally tested unless we have actually carried out and documented that test.</p>
        <h2>How affiliate links work</h2>
        <p>We may earn a commission if you follow an affiliate link and meet an operator’s qualifying conditions. Commercial links will be identified. A commission is not a guarantee that an operator or product is suitable for you.</p>
        <h2>For South African readers</h2>
        <p>We use rand amounts and check local availability rather than assuming that international offers, payment methods or licences apply in South Africa.</p>
        <p>Start with <Link href="/guides/check-an-operator">our operator checklist</Link> or read about <Link href="/responsible-gambling">staying in control</Link>.</p>
      </div>
    </main>
  );
}
