import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { City } from "@/types";

const EXTRA_CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Agra",
  "Rishikesh",
  "Shimla",
  "Kochi",
  "Pondicherry",
  "Lucknow",
  "Chandigarh",
  "Mysore",
];

export default function CityLinks({ cities }: { cities: City[] }) {
  const known = cities.map((city) => ({
    label: city.name,
    href: `/cities/${city.slug}`,
  }));

  const extras = EXTRA_CITIES.filter(
    (name) => !cities.some((city) => city.name.toLowerCase() === name.toLowerCase())
  ).map((name) => ({
    label: name,
    href: `/venues?city=${encodeURIComponent(name)}`,
  }));

  const all = [...known, ...extras].slice(0, 20);

  return (
    <section aria-labelledby="cities-heading" className="bg-white pt-14 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4a437]/50" />
              <p className="text-[10px] font-semibold tracking-[0.34em] text-[#a67c1a] uppercase">
                Destinations
              </p>
              <span className="h-px w-8 bg-[#d4a437]/50" />
            </div>
            <h2
              id="cities-heading"
              className="font-display text-[30px] leading-[1.06] text-[#1d1d1f] sm:text-[34px] md:text-[52px]"
            >
              Find venues by city
              <span className="text-[#a67c1a]">.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-relaxed text-[#6b6b6b] md:mt-4 md:text-[16px]">
              From lake palaces to coastal estates — explore celebration spaces across India.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-10 grid max-w-[1180px] grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-x-10">
            {all.map((city) => (
              <Link
                key={city.label}
                href={city.href}
                className="group flex items-center justify-between border-b border-[#f0ece4] py-4 text-[14px] text-[#2b1218] transition-colors hover:text-[#7f0f2e] md:text-[15px]"
              >
                <span className="lux-underline font-medium">{city.label}</span>
                <ChevronRight
                  size={15}
                  className="shrink-0 -translate-x-1 text-[#c6a04a] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 text-center">
            <Link
              href="/cities"
              className="inline-flex items-center gap-2 rounded-full border border-[#7f0f2e]/25 bg-white px-8 py-3 text-[12px] font-semibold tracking-[0.1em] text-[#7f0f2e] uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7f0f2e]/55 hover:bg-[#fdf6e7]"
            >
              View all destinations
              <ChevronRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
