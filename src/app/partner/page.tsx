import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Partner With Us — list your venue",
  description:
    "Own a wedding or event venue? Partner with Venue On My Plate to receive qualified enquiries with dates, guest counts and clear requirements.",
  path: "/partner",
});

const STEPS = [
  [
    "Tell us about your property",
    "Capacity, spaces, rooms, catering formats, cut-off timings and best seasons.",
  ],
  [
    "We visit and verify",
    "A short walkthrough so our recommendations stay honest about access, power, kitchens and guest flow.",
  ],
  [
    "Receive structured enquiries",
    "Date, guest count and function flow included — no back-and-forth for basics.",
  ],
] as Array<[string, string]>;

const CHIPS = ["Structured dates", "Guest counts", "Clear budgets"];

export default async function PartnerPage() {
  const settings = await getSiteSettings();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Partner With Us" }]} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-black p-8 text-white md:p-10 lg:sticky lg:top-28">
              <div className="relative">
                <p className="s-eyebrow text-white/60">For venues</p>
                <h1 className="s-headline font-display mt-3 text-3xl leading-tight text-balance md:text-4xl">
                  Qualified enquiries, not cold leads.
                </h1>
                <div aria-hidden="true" className="mt-5 h-px w-32 bg-white/20" />
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  We send structured requirements — city, event, date window, guest count — so your
                  team quotes once, accurately. No listing fees are described here; commercial terms
                  are shared directly and transparently.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {CHIPS.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white/80"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <p className="text-[13px] font-semibold text-white/60">Apply by email</p>
                  <p className="mt-1 text-sm font-medium break-all text-white">{settings.email}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/70">
                    Subject <em>Venue partnership — [Property name, City]</em> with capacity, spaces
                    and 5–6 recent photographs.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <ol className="space-y-5">
              {STEPS.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 3) * 90}>
                  <li className="s-card p-6 md:p-7">
                    <p className="s-eyebrow text-[13px] text-[#6e6e73]">Step {i + 1}</p>
                    <h2 className="font-display mt-2 text-2xl text-[#1d1d1f]">{t}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#424245]">{d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={120}>
              <div className="mt-6 rounded-[18px] bg-[#f5f5f7] p-6 text-sm leading-relaxed text-[#424245]">
                To apply, write to <strong className="text-[#1d1d1f]">{settings.email}</strong> with
                the subject <em>Venue partnership — [Property name, City]</em> and include capacity,
                spaces and 5–6 recent photographs.
              </div>
              <Link
                href="/contact"
                className="s-btn-dark btn-sheen mt-8 inline-block rounded-full px-8 py-3.5 text-[15px] font-semibold"
              >
                Talk to us
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
