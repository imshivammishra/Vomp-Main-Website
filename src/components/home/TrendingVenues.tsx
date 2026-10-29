"use client";

import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/types";
import Reveal from "@/components/ui/Reveal";
import { MapPin, Star, Clock } from "lucide-react";

export default function TrendingVenues({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) return null;

  const display = venues.slice(0, 9);

  return (
    <section
      aria-labelledby="trending-heading"
      className="relative overflow-hidden bg-white py-24 md:py-32 border-y border-[#f1eae0]"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* Header */}
        <Reveal>
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:mb-24">
            <div className="max-w-xl">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-8 bg-[#c6a04a]" />
                <p className="text-[11px] font-semibold tracking-[0.65em] text-[#7f0f2e]/60 uppercase">
                  Trending now
                </p>
              </div>
              <h2 id="trending-heading" className="font-display text-[40px] leading-[1.02] text-[#1a0a0d] md:text-[54px]">
                Most loved venues<span className="text-[#7f0f2e]">.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-[#4a3a3c] max-w-lg">
                Venues couples and planners are shortlisting this season — from lakefront palaces to garden lawns.
              </p>
            </div>
            <Link
              href="/venues"
              className="rounded-full border border-[#e8ded2] bg-white px-8 py-3 text-[12px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:border-[#c6a04a]/60 hover:text-[#7f0f2e] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Explore full collection
              <span className="text-[#7f0f2e]">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Partyslate-style masonry grid using CSS columns */}
        <Reveal className="relative">
          <div className="ps-masonry-3">
            {display.map((venue) => (
              <div
                key={venue.slug}
                className="ps-masonry-item mb-8 relative block overflow-hidden rounded-[24px] border border-[#e8ded2] bg-white transition-all duration-500 hover:border-[#c6a04a]/50 hover:-translate-y-1 hover:shadow-[0_28px_48px_-16px_rgba(15,8,10,0.08)]"
              >
                <Link href={`/venues/${venue.slug}`} className="relative block overflow-hidden" aria-label={`View ${venue.name}`} tabIndex={-1}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f1eae0]">
                    <Image
                      src={venue.image}
                      alt={venue.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      quality={85}
                      className="object-cover transition-transform duration-800 group-hover:scale-[1.06]"
                      style={{ filter: "saturate(1.02)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0d]/20 via-[#1a0a0d]/5 to-transparent" />
                    <div className="absolute inset-0 bg-[#000]/3" />

                    {/* Type badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-[#1a0a0d] shadow-sm ring-1 ring-[#e8ded2]">
                        {venue.type}
                      </span>
                    </div>

                    {/* Price badge */}
                    {venue.priceHint && (
                      <div className="absolute top-6 right-6 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#7f0f2e] px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                          {venue.priceHint}
                        </span>
                      </div>
                    )}

                    {/* Like heart */}
                    <button
                      aria-label="Save venue"
                      className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transform: "scale(0.9)" }}
                    >
                      <span className="h-10 w-10 rounded-full bg-white/95 flex items-center justify-center shadow-sm ring-1 ring-[#e8ded2]">
                        <Star size={18} strokeWidth={2} className="text-[#7f0f2e]" />
                      </span>
                    </button>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 mb-2.5 text-[10px] text-[#8c736f] uppercase tracking-[0.15em]">
                    <MapPin size={11} className="shrink-0" aria-hidden />
                    <span className="truncate">{venue.area}, {venue.city}</span>
                  </div>
                  <h3 className="font-display text-[17px] leading-snug text-[#1a0a0d] mb-2.5 group-hover:text-[#7f0f2e]/70 transition-colors">
                    <Link href={`/venues/${venue.slug}`}>{venue.name}</Link>
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-[#8c736f]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="shrink-0" />
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

        <div className="mt-20 flex justify-center">
          <Link
            href="/venues"
            className="rounded-full border border-[#e8ded2] bg-white px-8 py-3 text-[12px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:border-[#c6a04a]/60 hover:text-[#7f0f2e] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Browse all venues
            <span className="text-[#7f0f2e]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
