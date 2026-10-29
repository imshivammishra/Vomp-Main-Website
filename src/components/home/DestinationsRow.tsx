import Image from "next/image";
import Link from "next/link";
import type { City } from "@/types";
import Reveal from "@/components/ui/Reveal";

export default function DestinationsRow({ cities }: { cities: City[] }) {
  if (cities.length === 0) return null;
  const display = cities.slice(0, 5);

  return (
    <section
      aria-labelledby="destinations-heading"
      className="overflow-hidden bg-[#0e0608] py-24 md:py-32"
      style={{ boxShadow: "0 40px 80px -30px rgba(0,0,0,0.5)" }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Header ── */}
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-6 bg-[#d4a437]/50" />
                <p className="text-[9px] font-semibold tracking-[0.42em] text-[#d4a437]/70 uppercase">
                  Where to celebrate
                </p>
              </div>
              <h2
                id="destinations-heading"
                className="font-display text-[46px] leading-[0.96] text-white md:text-[64px] lg:text-[80px]"
              >
                Destinations
              </h2>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/40">
                Each destination carries its own season, scale and story.
              </p>
            </div>
            <Link
              href="/cities"
              className="group hidden items-center gap-3 text-[12px] font-medium text-white/35 transition-all hover:text-white/70 md:flex"
            >
              <span className="tracking-widest uppercase">All destinations</span>
              <div className="h-px w-8 bg-white/20 transition-all group-hover:w-14 group-hover:bg-white/50" />
            </Link>
          </div>
        </Reveal>

        {/* ── Horizontal scrolling gallery on mobile, magazine grid on desktop ── */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {display.map((city, i) => (
            <Reveal
              key={city.slug}
              delay={i * 55}
              className="w-[72vw] shrink-0 snap-center md:w-auto"
            >
              <Link
                href={`/cities/${city.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-[#1a0c0f]"
                aria-label={`Explore venues in ${city.name}`}
              >
                {/* Portrait images on mobile, 3:4 on desktop */}
                <div className="relative aspect-[3/4]">
                  <Image
                    src={city.image}
                    alt={city.imageAlt}
                    fill
                    sizes="(max-width: 768px) 72vw, 20vw"
                    quality={80}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ filter: "brightness(0.75) saturate(1.1)" }}
                  />

                  {/* Gradient */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 38%, rgba(8,3,5,0.4) 62%, rgba(8,3,5,0.92) 100%)",
                    }}
                  />

                  {/* Number */}
                  <div className="absolute left-4 top-4">
                    <p
                      className="font-display text-[72px] leading-none font-semibold"
                      style={{
                        color: "rgba(212,164,55,0.15)",
                        WebkitTextStroke: "1px rgba(212,164,55,0.2)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>

                  {/* City info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2 h-px w-6 bg-gradient-to-r from-[#d4a437]/50 to-transparent" />
                    <p className="font-display text-[22px] leading-tight text-white">{city.name}</p>
                    <p className="mt-1 text-[11px] leading-snug text-white/40 line-clamp-2">
                      {city.tagline}
                    </p>
                    {/* Hover reveal */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.15em] text-[#d4a437]/0 uppercase transition-all duration-300 group-hover:text-[#d4a437]">
                        Explore
                      </span>
                      <div className="h-px w-0 bg-[#d4a437]/50 transition-all duration-500 group-hover:w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex items-center justify-center md:hidden">
          <Link
            href="/cities"
            className="text-[12px] tracking-widest text-white/35 uppercase hover:text-white/60"
          >
            View all destinations →
          </Link>
        </div>
      </div>
    </section>
  );
}
