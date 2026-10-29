"use client";

import CityCard from "@/components/venues/CityCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { SectionLink } from "@/components/home/SectionHeading";

type City = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  venueCountLabel: string;
  popularTypes: string[];
};

export default function CitiesSection({
  cityCards,
  heading,
}: {
  cityCards: City[];
  heading: { eyebrow: string; title: string; copy?: string; linkLabel?: string; linkHref?: string };
}) {
  return (
    <section id="cities" aria-labelledby="cities-heading" className="border-t border-black/10">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow={heading.eyebrow}
            title={heading.title}
            copy={heading.copy}
          />
          {heading.linkLabel && (
            <SectionLink href={heading.linkHref || "/cities"}>{heading.linkLabel}</SectionLink>
          )}
        </div>
        <h2 id="cities-heading" className="sr-only">
          Popular destinations
        </h2>
        <Reveal delay={120}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {cityCards.map((c) => (
              <div key={c.slug} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <CityCard city={c} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
