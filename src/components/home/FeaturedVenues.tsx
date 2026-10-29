import Link from "next/link";
import Image from "next/image";
import type { Venue } from "@/types";
import Reveal from "@/components/ui/Reveal";
import { MapPin } from "lucide-react";
import { formatGuests } from "@/lib/utils";

const COUNTRY_FLAGS: Record<string, string> = {
  IN: "🇮🇳", IT: "🇮🇹", FR: "🇫🇷", AE: "🇦🇪", TH: "🇹🇭", US: "🇺🇸", GB: "🇬🇧", MV: "🇲🇻",
};

function LuxuryVenueCard({ venue, size = "normal" }: { venue: Venue; size?: "large" | "normal" }) {
  const flag = COUNTRY_FLAGS[(venue.countryCode ?? "IN").toUpperCase()];
  const isInternational = (venue.countryCode ?? "IN").toUpperCase() !== "IN";

  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-[#1a0c0f]"
      aria-label={`View ${venue.name}`}
    >
      <div className={`relative w-full overflow-hidden ${size === "large" ? "aspect-[3/4] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
        <Image
          src={venue.image}
          alt={venue.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ filter: "brightness(0.82) saturate(1.05)" }}
        />
        {/* Gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 30%, rgba(8,3,5,0.5) 65%, rgba(8,3,5,0.92) 100%)" }}
        />
        {/* Top badges */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/85 backdrop-blur-md">
            {venue.type}
          </span>
          {isInternational && flag && (
            <span className="rounded-full bg-black/40 px-2 py-1 text-[13px] backdrop-blur-md" title={venue.country}>{flag}</span>
          )}
        </div>
        {venue.priceHint && (
          <div className="absolute right-4 top-4">
            <span className="rounded-full bg-[#7f0f2e]/80 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
              {venue.priceHint}
            </span>
          </div>
        )}

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          {/* Thin gold rule */}
          <div className="mb-3 h-px w-8 bg-gradient-to-r from-[#d4a437]/60 to-transparent" />
          <p className="font-display text-[22px] leading-tight text-white md:text-[26px]">{venue.name}</p>
          <div className="mt-2 flex items-center gap-4 text-[12px] text-white/50">
            <span className="flex items-center gap-1"><MapPin size={11} />{venue.area}, {venue.city}</span>
            <span>{formatGuests(venue.capacityMin, venue.capacityMax)}</span>
          </div>
          {/* Hover CTA */}
          <div className="mt-4 flex items-center gap-2 overflow-hidden">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#d4a437]/0 transition-all duration-300 group-hover:text-[#d4a437] uppercase">
              View venue
            </span>
            <div className="h-px w-0 bg-[#d4a437]/60 transition-all duration-500 group-hover:w-8" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedVenues({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) return null;

  // Adaptive grid: hero (tall left) + rest
  const [hero, ...rest] = venues;

  return (
    <section id="venues" aria-labelledby="featured-heading" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* ── Section header ── */}
        <Reveal>
          <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              {/* Ornament */}
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-6 bg-[#a67c1a]" />
                <p className="text-[9px] font-semibold tracking-[0.38em] text-[#a67c1a] uppercase">Curated collection</p>
              </div>
              <h2 id="featured-heading" className="font-display text-[52px] leading-[0.97] text-[#1d1d1f] md:text-[72px] lg:text-[86px]">
                Venues,<br />curated<span className="text-[#a67c1a]">.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#525252]">
                Every property is personally visited or vetted before it appears here.
                No sponsored listings. No compromises.
              </p>
              <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#a67c1a]/40 to-transparent" />
            </div>
            <div className="flex flex-row items-center gap-6 md:flex-col md:items-end">
              <Link
                href="/venues"
                className="group flex items-center gap-3 text-[13px] font-medium text-[#1d1d1f] transition-all"
              >
                <span className="underline decoration-black/20 underline-offset-4 group-hover:decoration-black">
                  View full collection
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e8ed] bg-white text-[13px] transition-all group-hover:border-[#1d1d1f] group-hover:bg-[#1d1d1f] group-hover:text-white">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="hidden text-[12px] font-medium text-[#7f0f2e] underline decoration-[#7f0f2e]/25 underline-offset-4 hover:decoration-[#7f0f2e] md:block"
              >
                Request private shortlist
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ── Editorial venue grid ── */}
        {venues.length === 1 ? (
          <Reveal>
            <LuxuryVenueCard venue={venues[0]} size="large" />
          </Reveal>
        ) : venues.length === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {venues.map((v, i) => (
              <Reveal key={v.slug} delay={i * 60}>
                <LuxuryVenueCard venue={v} />
              </Reveal>
            ))}
          </div>
        ) : (
          /* 3+ venues: hero (tall left) + 2-col grid for rest */
          <div className="grid gap-4 md:grid-cols-[1.15fr_1fr] lg:grid-cols-[1.2fr_1fr_1fr]">
            {/* Hero card — spans 2 rows on desktop */}
            <Reveal className="md:row-span-2 lg:row-span-2">
              <div className="h-full min-h-[380px] md:min-h-0">
                <LuxuryVenueCard venue={hero} size="large" />
              </div>
            </Reveal>
            {/* All remaining cards fill the right columns */}
            {rest.map((v, i) => (
              <Reveal key={v.slug} delay={(i + 1) * 55}>
                <LuxuryVenueCard venue={v} />
              </Reveal>
            ))}
          </div>
        )}

        {/* ── Bottom strip ── */}
        <Reveal delay={80}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e8e8ed] pt-8 md:flex-row">
            <p className="text-[14px] italic text-[#86868b]">
              &ldquo;Don&rsquo;t see the right match? We build personal shortlists.&rdquo;
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/venues"
                className="text-[13px] font-medium text-[#424245] underline decoration-black/20 underline-offset-4 hover:decoration-black"
              >
                All venues
              </Link>
              <Link
                href="/contact"
                className="s-btn-dark btn-sheen px-6 py-2.5 text-[13px]"
              >
                Request shortlist
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
