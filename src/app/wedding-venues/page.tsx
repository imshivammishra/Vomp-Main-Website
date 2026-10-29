import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import VenueGrid from "@/components/venues/VenueGrid";
import { getVenues } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wedding venues — palaces, resorts, lawns and banquets",
  description:
    "Browse wedding-ready venues across India. Filter by destination, guest count and venue type, then request a private quote-led shortlist.",
  path: "/wedding-venues",
});

const WEDDING_TERMS = ["wedding", "sangeet", "haldi", "reception", "engagement", "mehendi"];

export default async function WeddingVenuesPage() {
  const all = await getVenues();
  const venues = all.filter((venue) =>
    venue.eventTypes.some((event) => WEDDING_TERMS.includes(event.toLowerCase()))
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#eed9a3] bg-[#fff8ea]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(127,15,46,0.08),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-14 text-center md:px-8 md:pt-36 md:pb-20">
          <Reveal>
            <div className="[&_ol]:justify-center">
              <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Wedding venues" }]} />
            </div>
            <p className="mt-6 text-[12px] font-bold tracking-[0.28em] text-[#a67c1a] uppercase">
              Shaadi · Sangeet · Pheras
            </p>
            <h1 className="font-display mx-auto mt-3 max-w-4xl text-5xl leading-[1.02] text-balance text-[#5c0a20] md:text-7xl">
              Wedding venues worthy of the occasion.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#5a4348] md:text-[18px]">
              Palaces, lakefront lawns, heritage havelis and grand ballrooms — every venue is
              reviewed for capacity, access and celebration flow.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/venues" className="s-btn-dark px-6 py-3 text-[14px] font-semibold">
                Browse all venues
              </Link>
              <Link
                href="/cities"
                className="rounded-full border border-[#d4a437]/50 bg-white/70 px-6 py-3 text-[14px] font-semibold text-[#5c0a20] transition hover:bg-white"
              >
                Explore destinations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Wedding collection"
          title={
            venues.length > 0
              ? `${venues.length} wedding-ready venues`
              : "A private wedding shortlist"
          }
          copy="Use the filters to compare by city, guest count and style — or send us your brief and we will do the shortlisting."
        />
        <div className="mt-10">
          <VenueGrid venues={venues} />
        </div>
      </section>

      <CTASection
        title="Planning a wedding?"
        copy="Tell us your date and guest count once. We will return a private, venue-only shortlist with the trade-offs stated clearly."
      />
    </>
  );
}
