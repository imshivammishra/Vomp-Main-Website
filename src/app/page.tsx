import type { Metadata } from "next";
import { getCities, getReviews } from "@/lib/api";
import HomeSubnav from "@/components/home/HomeSubnav";
import HomeHero from "@/components/home/HomeHero";
import PhotoTiles, { type PhotoTile } from "@/components/home/PhotoTiles";
import PromiseBand from "@/components/home/PromiseBand";
import ParallaxVideo from "@/components/home/ParallaxVideo";
import FilmReel from "@/components/home/FilmReel";
import CityLinks from "@/components/home/CityLinks";
import NewsletterBand from "@/components/home/NewsletterBand";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export const metadata: Metadata = {
  title: "Venue On My Plate — Every Celebration Starts Here",
  description:
    "Discover curated palaces, resorts, lawns and ballrooms for weddings, birthdays and corporate events across India. Every venue personally visited or vetted.",
  alternates: { canonical: "https://venueonmyplate.in/" },
};

const BOOKING_TILES: PhotoTile[] = [
  {
    label: "Wedding Venues",
    href: "/wedding-venues",
    image: "/images/ps/weddings.jpg",
    alt: "Crystal chandeliers above a luxury wedding banquet hall",
  },
  {
    label: "Birthday Venues",
    href: "/venues?event=Birthday",
    image: "/images/ps/birthdays.jpg",
    alt: "Birthday celebration with a candlelit cake",
  },
  {
    label: "Sangeet & Haldi",
    href: "/venues?event=Pre-wedding",
    image: "/images/ps/sangeet.jpg",
    alt: "Marigold and bangle details from a haldi ceremony",
  },
  {
    label: "Corporate Venues",
    href: "/venues?event=Corporate",
    image: "/images/ps/corporate.jpg",
    alt: "Audience at a corporate conference",
  },
];

const DESTINATION_TILES: PhotoTile[] = [
  {
    label: "Udaipur",
    href: "/cities/udaipur",
    image: "/images/ps/hero-c.jpg",
    alt: "Palace courtyard wedding venue in Udaipur",
  },
  {
    label: "Jaipur",
    href: "/cities/jaipur",
    image: "/images/ps/jaipur.jpg",
    alt: "Jaipur fort glowing at sunset",
  },
  {
    label: "Goa",
    href: "/cities/goa",
    image: "/images/ps/resort.jpg",
    alt: "Palm-lined beach resort in Goa",
  },
  {
    label: "Jaisalmer",
    href: "/cities/jaisalmer",
    image: "/images/ps/jaisalmer.jpg",
    alt: "Golden sand dunes in Jaisalmer",
  },
];

export default async function HomePage() {
  const [cities, reviews] = await Promise.all([getCities(), getReviews()]);

  return (
    <>
      <HomeSubnav />
      <HomeHero />
      <PhotoTiles
        id="venues-worth-booking"
        eyebrow="By Occasion"
        title="Venues worth booking"
        subtitle="Discover spaces for weddings, corporate events, galas, and more."
        tiles={BOOKING_TILES}
      />
      <ParallaxVideo />
      <PromiseBand />
      <PhotoTiles
        id="curated-destinations"
        eyebrow="By Destination"
        title="Curated destinations"
        subtitle="Palaces, beaches, forts, and desert escapes across India."
        tiles={DESTINATION_TILES}
      />
      <FilmReel />
      <CityLinks cities={cities} />
      <TestimonialsSection reviews={reviews} />
      <NewsletterBand />
    </>
  );
}
