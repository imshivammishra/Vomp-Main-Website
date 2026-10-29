import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FAQ from "@/components/forms/FAQ";
import Reveal from "@/components/ui/Reveal";
import { getContentBlocks, getSiteSettings } from "@/lib/api";
import { generalFaqs } from "@/lib/data";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import type { Faq } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Contact — request your personal venue shortlist",
  description:
    "Tell Venue On My Plate your city, event type, date and guest count. Our team replies within one business day with curated venue options.",
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, content] = await Promise.all([getSiteSettings(), getContentBlocks()]);
  const faqBlocks = content.filter((block) => block.section === "faq" && block.title && block.body);
  const faqs: Faq[] = faqBlocks.length
    ? faqBlocks.map((block) => ({ question: block.title, answer: block.body }))
    : generalFaqs;
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* ── Left: contact info ── */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 text-[#a67c1a]">
                <span className="h-px w-8 bg-[#a67c1a] opacity-70" />
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase">
                  Expert venue advisory
                </p>
              </div>
              <h1 className="font-display mt-4 text-[36px] leading-tight text-[#1d1d1f] md:text-[48px]">
                Tell us the occasion.
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#424245]">
                Share the essentials below. For anything urgent, write to{" "}
                <a href={`mailto:${settings.email}`} className="link-elegant">
                  {settings.email}
                </a>{" "}
                with your event date in the subject.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <dl className="mt-10 space-y-0 divide-y divide-[#e8e8ed] rounded-2xl border border-[#e8e8ed] bg-[#fdf9f4] overflow-hidden">
                <div className="px-6 py-5">
                  <dt className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b] uppercase">
                    Email
                  </dt>
                  <dd className="mt-1.5 font-medium text-[#1d1d1f] break-all">{settings.email}</dd>
                </div>
                <div className="px-6 py-5">
                  <dt className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b] uppercase">
                    Phone
                  </dt>
                  <dd className="mt-1.5">
                    <a href={phoneHref} className="link-elegant font-medium">
                      {settings.phone}
                    </a>
                  </dd>
                </div>
                <div className="px-6 py-5">
                  <dt className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b] uppercase">
                    Hours
                  </dt>
                  <dd className="mt-1.5 text-[#424245]">{settings.hours}</dd>
                </div>
              </dl>
            </Reveal>

            {/* Trust signals */}
            <Reveal delay={120}>
              <div className="mt-8 space-y-3">
                {[
                  "Every venue personally visited or verified",
                  "Private shortlist delivered within one business day",
                  "No booking fees — ever",
                ].map((signal) => (
                  <div key={signal} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#a67c1a]"
                    />
                    <p className="text-[14px] text-[#424245]">{signal}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10">
                <h2 className="font-display text-2xl text-[#1d1d1f]">Good to know</h2>
                <div className="mt-4">
                  <FAQ faqs={faqs} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: form ── */}
          <Reveal delay={100} scale className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-[#e8e8ed] bg-white shadow-sm">
              <div className="border-b border-[#e8e8ed] bg-[#fdf9f4] px-7 py-6">
                <div className="flex items-center gap-3 text-[#a67c1a]">
                  <span className="h-px w-6 bg-[#a67c1a] opacity-70" />
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase">
                    Request proposal
                  </p>
                </div>
                <h2 className="font-display mt-2 text-[26px] text-[#1d1d1f]">
                  Your celebration, in brief
                </h2>
                <p className="mt-1 text-[13px] text-[#86868b]">{settings.responseNote}</p>
              </div>
              <div className="px-7 py-7">
                <Suspense fallback={<p className="text-sm text-[#6e6e73]">Loading form…</p>}>
                  <EnquiryForm />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      </div>
    </div>
  );
}
