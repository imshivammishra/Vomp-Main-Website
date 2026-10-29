import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import CityCard from "@/components/venues/CityCard";
import { getCities, getVenues } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Destinations — palace, lake and coastal venue circuits",
  description:
    "Explore Udaipur, Jaipur, Jodhpur, Jaisalmer, Sawai Madhopur and Goa — the destinations where Venue On My Plate curates wedding and celebration venues.",
  path: "/cities",
});

export default async function DestinationsPage() {
  const [cities, venues] = await Promise.all([getCities(), getVenues()]);
  const counts = new Map<string, number>();
  for (const venue of venues) counts.set(venue.citySlug, (counts.get(venue.citySlug) || 0) + 1);
  const cards = cities.map((city) => {
    if (city.image?.startsWith("/")) return city;
    const venue = venues.find(
      (item) => item.citySlug === city.slug && item.image?.startsWith("https://")
    );
    return venue?.image ? { ...city, image: venue.image } : city;
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#eed9a3] bg-[#fffaf0]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(212,164,55,0.18),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-14 text-center md:px-8 md:pt-36 md:pb-20">
          <Reveal>
            <div className="[&_ol]:justify-center">
              <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Destinations" }]} />
            </div>
            <p className="mt-6 text-[12px] font-bold tracking-[0.28em] text-[#a67c1a] uppercase">
              Royal circuits · India
            </p>
            <h1 className="font-display mx-auto mt-3 max-w-4xl text-5xl leading-[1.02] text-balance text-[#5c0a20] md:text-7xl">
              Where your celebration becomes a destination.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#5a4348] md:text-[18px]">
              Lake palaces, desert forts, garden resorts and coastal estates — choose the city, then
              compare venues by capacity, setting and season.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Destinations"
          title="Explore the circuits"
          copy="Every destination has its own season, scale and venue personality. Start with the city that fits your guest list."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((city, index) => (
            <Reveal key={city.slug} delay={(index % 3) * 90}>
              <div className="relative">
                <CityCard city={city} />
                {counts.get(city.slug) ? (
                  <span className="absolute top-3 right-3 rounded-full bg-[#5c0a20]/90 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#f6de9a] uppercase backdrop-blur">
                    {counts.get(city.slug)} venues
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which destination fits?"
        copy="Share your date, guest count and the mood you want. We will compare cities, seasons and venue options in one private shortlist."
      />
    </>
  );
}
