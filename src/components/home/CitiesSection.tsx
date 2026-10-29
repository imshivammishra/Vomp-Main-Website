import Image from "next/image";
import Link from "next/link";
import type { City } from "@/types";
import Reveal from "@/components/ui/Reveal";
import { MapPin, ArrowRight } from "lucide-react";

export default function CitiesSection({ cities }: { cities: City[] }) {
  if (cities.length === 0) return null;

  const display = cities.slice(0, 6);

  return (
    <section
      aria-labelledby="cities-heading"
      className="relative overflow-hidden bg-[#faf7f2] py-24 md:py-32 border-y border-[#f1eae0]"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <Reveal>
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:mb-28">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-8 bg-[#c6a04a]" />
                <p className="text-[11px] font-semibold tracking-[0.65em] text-[#7f0f2e]/60 uppercase">
                  Where to celebrate
                </p>
              </div>
              <h2
                id="cities-heading"
                className="font-display text-[40px] leading-[1.02] text-[#1a0a0d] md:text-[54px]"
              >
                Celebrate anywhere<span className="text-[#7f0f2e]">.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-[#4a3a3c] max-w-lg">
                From Udaipur&apos;s lake palaces to Goa&apos;s beach villas — discover the best
                celebration destinations across India.
              </p>
            </div>
            <Link
              href="/cities"
              className="rounded-full border border-[#e8ded2] bg-white px-8 py-3 text-[12px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:border-[#c6a04a]/60 hover:text-[#7f0f2e] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              All destinations
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </Reveal>

        {/* Grid - Partyslate style: big photo tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {display.map((city, i) => (
            <Reveal key={city.slug} delay={i * 60}>
              <Link
                href={`/cities/${city.slug}`}
                className="group relative block overflow-hidden rounded-[24px] border border-[#e8ded2] bg-white transition-all duration-500 hover:border-[#c6a04a]/50 hover:-translate-y-1 hover:shadow-[0_28px_48px_-16px_rgba(15,8,10,0.08)]"
                aria-label={`Explore venues in ${city.name}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f1eae0]">
                  <Image
                    src={city.image}
                    alt={city.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={85}
                    className="object-cover transition-transform duration-800 group-hover:scale-[1.06]"
                    style={{ filter: "saturate(1.03)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0d]/30 via-[#1a0a0d]/8 to-transparent" />
                  <div className="absolute inset-0 bg-[#000]/3" />
                  <div className="absolute top-6 left-6 z-10">
                    <span
                      className="font-display text-[64px] leading-none font-semibold"
                      style={{
                        color: "rgba(212,164,55,0.08)",
                        WebkitTextStroke: "1px rgba(212,164,55,0.12)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-1.5 mb-3 text-[10px] text-[#8c736f] uppercase tracking-[0.15em]">
                    <MapPin size={11} className="shrink-0" aria-hidden />
                    <span>{city.name}</span>
                  </div>
                  <h3 className="font-display text-[22px] leading-tight text-[#1a0a0d] mb-2">
                    {city.tagline}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#4a3a3c] line-clamp-3 mb-5">
                    {city.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {city.popularTypes.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#e8ded2] bg-[#faf7f2] px-3 py-1 text-[10px] font-medium text-[#8c736f] tracking-tight uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
