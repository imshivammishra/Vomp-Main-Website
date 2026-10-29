import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import VenueFilters from "@/components/venues/VenueFilters";
import VenueGrid from "@/components/venues/VenueGrid";
import { getVenues } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Explore wedding & celebration venues worldwide",
  description:
    "Browse curated palaces, resorts, lawns, hotels and banquets across India, Italy and beyond. Filter by country, city, size and type.",
  path: "/venues",
});

function matchesGuests(venueMax: number, band: string | null): boolean {
  if (!band) return true;
  if (band === "Under 100") return venueMax >= 50;
  if (band === "100–300") return venueMax >= 100;
  if (band === "300–600") return venueMax >= 300;
  if (band === "600–1000") return venueMax >= 600;
  if (band === "1000+") return venueMax >= 1000;
  return true;
}

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const venues = await getVenues();
  const country = params.country?.trim() || null;
  const city = params.city?.trim() || null;
  const guests = params.guests?.trim() || null;
  const type = params.type?.trim() || null;
  const event = params.event?.trim() || null;
  const q = params.q?.trim() || null;

  const filtered = venues.filter(
    (v) =>
      (!q ||
        v.name.toLowerCase().includes(q.toLowerCase()) ||
        v.city.toLowerCase().includes(q.toLowerCase()) ||
        v.area.toLowerCase().includes(q.toLowerCase())) &&
      (!country ||
        (v.countryCode ?? "IN").toUpperCase() === country.toUpperCase() ||
        (v.country ?? "India").toLowerCase() === country.toLowerCase()) &&
      (!city || v.city.toLowerCase() === city.toLowerCase()) &&
      (!type || v.type === type) &&
      (!event ||
        v.eventTypes.some((e) => e.toLowerCase().includes(event.toLowerCase().split(" ")[0]))) &&
      matchesGuests(v.capacityMax, guests)
  );

  const countries = [
    ...new Map(
      venues
        .filter((v) => v.countryCode && v.country)
        .map((v) => [v.countryCode!, { code: v.countryCode!, name: v.country! }])
    ).values(),
  ].sort((a, b) => a.name.localeCompare(b.name));

  const cities = [
    ...new Set(
      venues
        .filter((v) => !country || (v.countryCode ?? "IN").toUpperCase() === country.toUpperCase())
        .map((v) => v.city)
    ),
  ].sort();

  const types = [...new Set(venues.map((v) => v.type).filter(Boolean))].sort();

  const isFiltered = country || city || guests || type || event || q;
  const locationLabel = city
    ? ` in ${city}`
    : country
      ? ` in ${venues.find((v) => (v.countryCode ?? "IN") === country)?.country ?? country}`
      : " worldwide";

  const summary =
    filtered.length > 0
      ? `${filtered.length} ${filtered.length === 1 ? "venue" : "venues"}${locationLabel} — every one visited or vetted by our team.`
      : venues.length === 0
        ? "Every property is visited or vetted before it appears here. Share your brief and we will send a private shortlist of real venues."
        : isFiltered
          ? "No venues match these filters. Try widening your search — or ask us for a personal shortlist."
          : "No venues published here yet. Share your brief and we will send a private shortlist of real venues that fit.";

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#eed9a3] bg-[#fffaf0]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(212,164,55,0.16),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-12 md:px-8 md:pt-36 md:pb-16">
          <Reveal>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Venues" }]} />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-[#a67c1a]" />
                <p className="text-[10px] font-semibold tracking-[0.28em] text-[#a67c1a] uppercase">
                  Venue Collection
                </p>
              </div>
              <h1 className="font-display text-[44px] leading-[1.0] text-[#5c0a20] md:text-[62px]">
                Venues, curated<span className="text-[#a67c1a]">.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#5a4348]">{summary}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal delay={200}>
            <div className="-mt-8 overflow-hidden rounded-2xl border border-[#e8e8ed] bg-white px-5 py-5 shadow-[0_18px_40px_-24px_rgba(92,10,32,0.25)] md:px-7 md:py-6">
              <Suspense fallback={<p className="text-sm text-[#6e6e73]">Loading filters…</p>}>
                <VenueFilters cities={cities} types={types} countries={countries} />
              </Suspense>
            </div>
          </Reveal>
          <div aria-hidden="true" className="mt-10 border-t border-black/10" />
          <div className="py-10">
            <VenueGrid venues={filtered} />
          </div>
        </div>
      </div>
      <CTASection
        title="Can't find the one?"
        copy="Share your date and guest count — we will send a personal shortlist within one business day."
      />
    </>
  );
}
