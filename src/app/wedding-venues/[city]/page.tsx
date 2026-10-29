import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/forms/FAQ";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import VenueGrid from "@/components/venues/VenueGrid";
import { getCity, getVenues } from "@/lib/api";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

const SUPPORTED = ["udaipur", "jaipur", "goa"] as const;

export function generateStaticParams() {
  return SUPPORTED.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = await getCity(city);
  if (!data) return { title: "Not found" };
  const pretty = data.name;
  return buildMetadata({
    title: `Wedding venues in ${pretty} — palaces, resorts & lawns`,
    description: `Planning a wedding in ${pretty}? Explore curated wedding venues — heritage, outdoor and luxury stays — with capacity guidance, seasonal notes and a personal shortlist on request.`,
    path: `/wedding-venues/${data.slug}`,
  });
}

export default async function WeddingCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = await getCity(city);
  if (!data) notFound();
  const all = await getVenues();
  const venues = all.filter((v) => v.citySlug === data.slug);

  const faqs = [
    {
      question: `How much do wedding venues in ${data.name} cost?`,
      answer:
        "Costs vary widely by season, guest count and functions. Rather than publish figures that mislead, we collect written quotes for your exact date and share honest comparisons — venue-only versus venue-plus-catering.",
    },
    {
      question: `How many days do I need for a ${data.name} wedding?`,
      answer:
        "Most couples plan 2–3 days: welcome dinner, haldi/sangeet and the wedding. Keep travel buffers between venues — guest transport is the most underestimated line item.",
    },
    {
      question: "Will you help with rooms and logistics?",
      answer:
        "Yes. Room inventory near popular venues sells out first in season, so we prioritise rooms alongside the venue itself and flag transport, sound cut-offs and vendor stay early.",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
          <Reveal>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Wedding venues", href: "/venues" },
                { name: data.name },
              ]}
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-6 max-w-3xl text-center">
              <p className="text-[15px] font-semibold text-[#6e6e73]">
                Wedding destination · {data.name}
              </p>
              <h1 className="font-display mt-4 text-4xl leading-tight text-[#1d1d1f] md:text-6xl">
                Wedding venues in {data.name}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#424245]">
                {data.description} Below are wedding-ready venues we actively recommend — each with
                verified capacity and setting information.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-[18px] bg-[#f5f5f7] px-6 py-5">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-[#1d1d1f]">
                  {venues.length || data.venueCountLabel}
                </p>
                <p className="mt-1 text-sm text-[#6e6e73]">Wedding-ready venues</p>
              </div>
              <div aria-hidden="true" className="hidden h-10 w-px bg-[#e8e8ed] sm:block" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-[#1d1d1f]">Oct – Mar</p>
                <p className="mt-1 text-sm text-[#6e6e73]">Peak season</p>
              </div>
              <div aria-hidden="true" className="hidden h-10 w-px bg-[#e8e8ed] sm:block" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-[#1d1d1f]">2–3 days</p>
                <p className="mt-1 text-sm text-[#6e6e73]">Typical celebration</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12">
              <SectionHeading eyebrow="Wedding-ready" title={`Celebrate in ${data.name}`} />
              <div className="mt-8">
                <VenueGrid venues={venues} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <section aria-labelledby="plan" className="mt-14 grid gap-10 md:grid-cols-2">
              <div aria-hidden="true" className="mb-2 border-t border-black/10 md:col-span-2" />
              <div className="s-card p-6 md:p-8">
                <h2 id="plan" className="font-display text-3xl text-[#1d1d1f]">
                  How to plan here
                </h2>
                <ol className="mt-5 space-y-4 text-sm leading-relaxed text-[#424245]">
                  <li className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-lg leading-none font-bold text-[#1d1d1f]"
                    >
                      1
                    </span>
                    <span>
                      <strong className="text-[#1d1d1f]">Fix functions first.</strong> Decide which
                      functions need which mood — haldi wants daylight, sangeet wants sound
                      permission, pheras want the view.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-lg leading-none font-bold text-[#1d1d1f]"
                    >
                      2
                    </span>
                    <span>
                      <strong className="text-[#1d1d1f]">Lock rooms early.</strong> Especially in{" "}
                      {data.name}, rooms near the venue go before the venue does in season.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-lg leading-none font-bold text-[#1d1d1f]"
                    >
                      3
                    </span>
                    <span>
                      <strong className="text-[#1d1d1f]">Confirm cut-offs in writing.</strong> Music
                      timings, vendor access and baraat movement vary by property.
                    </span>
                  </li>
                </ol>
              </div>
              <div>
                <h2 className="font-display text-3xl text-[#1d1d1f]">FAQs</h2>
                <div className="mt-5">
                  <FAQ faqs={faqs} />
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-10 text-center text-sm text-[#424245]">
              Also exploring nearby?{" "}
              {SUPPORTED.filter((s) => s !== data.slug).map((s) => (
                <Link key={s} href={`/wedding-venues/${s}`} className="s-link mr-3">
                  Wedding venues in {s.charAt(0).toUpperCase() + s.slice(1)} ›
                </Link>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
      <div className="mt-14">
        <CTASection
          title={`Getting married in ${data.name}?`}
          copy="Share your dates once — we will build a wedding-ready shortlist with rooms and quotes."
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: `Wedding venues in ${data.name}`, path: `/wedding-venues/${data.slug}` },
            ]),
            faqJsonLd(faqs),
          ]),
        }}
      />
    </>
  );
}
