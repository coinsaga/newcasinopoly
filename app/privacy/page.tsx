import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy information",
  description: "The current privacy and analytics status of this website during development.",
  path: "/privacy",
  index: false,
});

export default function PrivacyPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Privacy information</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A clear view of your data.</h1>
      <div className="prose mt-8">
        <p>This website is in development. Google Analytics and Google Tag Manager are not currently activated. There are no account, newsletter or registration forms.</p>
        <p>When affiliate redirects are enabled, the application records an operator identifier and a redirect event in server logs. This application event does not include your IP address, cookies or the referring page. Hosting providers may process technical request information separately to operate and protect the service.</p>
        <p>A complete privacy notice identifying the website operator, contact details, processing arrangements and applicable rights will be provided before public launch. This page describes the current development setup.</p>
      </div>
    </main>
  );
}
