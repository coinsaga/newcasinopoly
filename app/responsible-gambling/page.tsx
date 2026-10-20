import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Responsible gambling",
  description: "Practical ways to set limits, recognise gambling harm and find verified support in South Africa.",
  path: "/responsible-gambling",
});

export default function ResponsibleGamblingPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">18+ · Stay in control</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Your wellbeing comes first.</h1>
      <div className="prose mt-8">
        <p>Gambling carries a risk of losing money. It should never be treated as income or a way to solve financial problems. Choosing not to gamble is always an option.</p>
        <h2>Set boundaries before you start</h2>
        <ul>
          <li>Decide what you can afford to lose after essential expenses, and keep to that amount.</li>
          <li>Set a time limit and take regular breaks.</li>
          <li>Do not borrow money or chase losses.</li>
          <li>Check the operator’s deposit limits, time-outs and self-exclusion options.</li>
        </ul>
        <h2>Notice when things change</h2>
        <p>Spending more than planned, hiding gambling, borrowing to continue, or gambling affecting relationships and daily responsibilities are reasons to pause and seek support.</p>
        <h2>Find support in South Africa</h2>
        <p>The <a href="https://responsiblegambling.org.za/">South African Responsible Gambling Foundation</a> provides information about support and self-exclusion. Visit its official website for current contact details and available services.</p>
        <p>Online gambling rules depend on the activity and the operator’s authorisation. See the <a href="https://www.ngb.org.za/industry-regulation/enforcement/">National Gambling Board’s guidance</a> and <Link href="/guides/check-an-operator">our operator checklist</Link>.</p>
      </div>
    </main>
  );
}
