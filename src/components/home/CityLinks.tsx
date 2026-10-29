import Link from "next/link";
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
    <section aria-labelledby="cities-heading" className="bg-white pt-16 md:pt-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center">
          <span aria-hidden className="mx-auto block h-[2px] w-[18px] bg-[#7f0f2e]" />
          <h2
            id="cities-heading"
            className="mt-5 text-[26px] leading-tight font-bold tracking-[-0.02em] text-[#141414] md:text-[34px]"
          >
            Find Venues &amp; Event Spaces by City
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1220px] grid-cols-2 gap-x-6 gap-y-5 text-left sm:grid-cols-3 md:mt-14 md:grid-cols-5 md:gap-x-10 md:gap-y-6">
          {all.map((city) => (
            <Link
              key={city.label}
              href={city.href}
              className="text-[13px] text-[#1f1f1f] underline-offset-4 transition-colors hover:text-[#7f0f2e] hover:underline md:text-[14px]"
            >
              {city.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
