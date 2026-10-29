import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Venue On My Plate collects, uses and protects enquiry information.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "We collect only what we need to respond to your enquiry: name, contact details, event requirements and your message. This data is used to prepare shortlists and coordinate with venues you approve.",
  },
  {
    title: "How we share it",
    body: "We never sell personal data. Venue partners receive your details only when you ask us to request availability or quotes on your behalf.",
  },
  {
    title: "How we protect it",
    body: "Enquiry data is transmitted to our backend API over HTTPS and retained only as long as needed for follow-up and legal compliance. Write to contact@venueonmyplate.in to request access or deletion.",
  },
  {
    title: "What we never handle here",
    body: "We do not store sensitive information in your browser, and this public website never handles database credentials or payment details.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-5 pt-28 pb-16 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
        <Reveal className="mt-6 text-center">
          <p className="s-eyebrow text-[#6e6e73]">Trust &amp; safety</p>
          <h1 className="s-headline font-display mt-3 text-4xl text-[#1d1d1f] md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 inline-block rounded-full border border-black/10 bg-white px-4 py-1.5 text-[13px] font-medium text-[#6e6e73]">
            Last updated · January 2026
          </p>
        </Reveal>
        <div className="mt-8 space-y-5">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <section className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-7">
                <h2 className="font-display text-xl text-[#1d1d1f]">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#424245]">{s.body}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
