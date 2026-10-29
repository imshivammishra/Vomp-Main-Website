import type { Metadata } from "next";
import { getCities, getVenues } from "@/lib/api";
import HomeHero from "@/components/home/HomeHero";
import CategoryTiles from "@/components/home/CategoryTiles";
import TrendingVenues from "@/components/home/TrendingVenues";
import CitiesSection from "@/components/home/CitiesSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Venue On My Plate — The perfect venue for your celebration",
  description:
    "Discover curated palaces, resorts, lawns and ballrooms for weddings, birthdays and corporate events across India. Every venue personally visited or vetted.",
  alternates: { canonical: "https://venueonmyplate.in/" },
};

export default async function HomePage() {
  const [venues, cities] = await Promise.all([getVenues(), getCities()]);

  const featured = venues.filter((v) => v.featured);
  const trending = featured.length >= 6 ? featured.slice(0, 9) : venues.slice(0, 9);

  return (
    <>
      <HomeHero />
      <CategoryTiles />
      <TrendingVenues venues={trending} />
      {cities.length > 0 && <CitiesSection cities={cities} />}
      <CTASection
        title="Can't find the right venue?"
        copy="Share your date and guest count — we will send a personal shortlist within one business day."
      />
    </>
  );
}
