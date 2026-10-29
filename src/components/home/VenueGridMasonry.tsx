"use client";

import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/types";
import Reveal from "@/components/ui/Reveal";
import { MapPin, Star, Clock } from "lucide-react";

export default function VenueGridMasonry({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) return null;

  const display = venues.slice(0, 12);

  return (
    <section
      aria-label="Venue grid"
      className="relative bg-white border-t border-[#f1eae0] py-20 md:py-28"
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#d4a437]/6 rounded-full blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-8">
        {/* Header with category count */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#c6a04a]" />
            <p className="text-[11px] font-semibold tracking-[0.6em] text-[#7f0f2e]/60 uppercase">
              Explore venues
            </p>
            <div className="h-px w-8 bg-[#c6a04a]" />
          </div>
          <h2 className="font-display text-[38px] leading-[1.02] text-[#1a0a0d] md:text-[50px]">
            Find your venue<span className="text-[#7f0f2e]">.</span>
          </h2>
          <p className="text-[14px] text-[#8c736f]">
            {display.length} venues ready to host your celebration
          </p>
        </div>

        {/* Masonry grid - Partyslate style: CSS columns */}
        <Reveal className="relative">
          <div className="ps-masonry-3">
            {display.map((venue) => (
              <div
                key={venue.slug}
                className="ps-masonry-item mb-8 relative block overflow-hidden rounded-[20px] border border-[#e8ded2] bg-white transition-all duration-400 hover:border-[#c6a04a]/50 hover:-translate-y-1 hover:shadow-[0_24px_40px_-12px_rgba(15,8,10,0.06)]"
              >
                <Link
                  href={`/venues/${venue.slug}`}
                  className="relative block overflow-hidden"
                  aria-label={`View ${venue.name}`}
                  tabIndex={-1}
                >
                  {/* Photo - dominant */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f1eae0]">
                    <Image
                      src={venue.image}
                      alt={venue.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      quality={85}
                      className="object-cover transition-transform duration-800 group-hover:scale-[1.05]"
                      style={{ filter: "saturate(1.02)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0d]/15 via-[#1a0a0d]/3 to-transparent" />

                    {/* Type badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-semibold text-[#1a0a0d] shadow-sm ring-1 ring-[#e8ded2]">
                        {venue.type}
                      </span>
                    </div>

                    {/* Price badge */}
                    {venue.priceHint && (
                      <div className="absolute top-5 right-5 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#7f0f2e] px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                          {venue.priceHint}
                        </span>
                      </div>
                    )}

                    {/* Save heart */}
                    <button
                      aria-label="Save venue"
                      className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transform: "scale(0.9)" }}
                    >
                      <span className="h-10 w-10 rounded-full bg-white/95 flex items-center justify-center shadow-sm ring-1 ring-[#e8ded2]">
                        <Star size={18} strokeWidth={2} className="text-[#7f0f2e]" />
                      </span>
                    </button>
                  </div>
                </Link>

                {/* Info - minimal, below photo */}
                <div className="p-5 pt-4">
                  <div className="flex items-center gap-1.5 mb-2 text-[10px] text-[#8c736f] uppercase tracking-[0.15em]">
                    <MapPin size={11} className="shrink-0" aria-hidden />
                    <span className="truncate">
                      {venue.area}, {venue.city}
                    </span>
                  </div>
                  <h3 className="font-display text-[16px] leading-snug text-[#1a0a0d] mb-2 group-hover:text-[#7f0f2e]/70 transition-colors">
                    <Link href={`/venues/${venue.slug}`}>{venue.name}</Link>
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-[#8c736f]">
                    <span className="flex items-center gap-1">
                      <Clock size={10} className="shrink-0" />
                      {`${venue.capacityMin}–${venue.capacityMax} guests`}
                    </span>
                    <span className="h-px w-px bg-[#d9cbb8]" />
                    <span>{venue.setting}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 flex justify-center">
          <Link
            href="/venues"
            className="rounded-full border border-[#e8ded2] bg-white px-9 py-3 text-[12px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:border-[#c6a04a]/60 hover:text-[#7f0f2e] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            View all venues
            <span className="text-[#7f0f2e]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
