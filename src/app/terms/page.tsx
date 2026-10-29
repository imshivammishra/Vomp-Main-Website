import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms governing the use of the Venue On My Plate discovery platform.",
  path: "/terms",
});

const SECTIONS = [
  {
    title: "Discovery, not booking",
    body: "Venue On My Plate is a discovery and introduction service. Venue availability, pricing and policies are confirmed by venues in writing; nothing on this website constitutes a booking until you receive written confirmation.",
  },
  {
    title: "Indicative content",
    body: "Photographs and capacity figures are indicative and verified periodically — final layouts, permissions and cut-off timings must be confirmed per event.",
  },
  {
    title: "Fair use",
    body: "By submitting an enquiry you agree to be contacted about that enquiry. Content on this site may not be reproduced without permission.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-5 pt-28 pb-16 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
        <Reveal className="mt-6 text-center">
          <p className="s-eyebrow text-[#6e6e73]">The fine print</p>
          <h1 className="s-headline font-display mt-3 text-4xl text-[#1d1d1f] md:text-5xl">
            Terms of Service
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
