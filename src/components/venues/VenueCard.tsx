"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatGuests } from "@/lib/utils";

const COUNTRY_FLAGS: Record<string, string> = {
  IN: "🇮🇳",
  IT: "🇮🇹",
  FR: "🇫🇷",
  AE: "🇦🇪",
  TH: "🇹🇭",
  US: "🇺🇸",
  GB: "🇬🇧",
  MV: "🇲🇻",
};

export default function VenueCard({ venue }: { venue: import("@/types").Venue; index?: number }) {
  const countryCode = venue.countryCode ?? "IN";
  const flag = COUNTRY_FLAGS[countryCode.toUpperCase()];
  const isInternational = countryCode.toUpperCase() !== "IN";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)] hover:ring-black/10">
      {/* Image */}
      <Link
        href={`/venues/${venue.slug}`}
        className="relative block overflow-hidden bg-[#f5f5f7]"
        aria-label={`View ${venue.name}`}
        tabIndex={-1}
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={venue.image}
            alt={venue.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            loading="lazy"
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Overlay badges */}
          <div className="absolute inset-0 flex items-start justify-between p-3">
            <span className="rounded-full bg-[#1d1d1f]/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
              {venue.type}
            </span>
            {isInternational && flag && (
              <span
                className="rounded-full bg-white/90 px-2.5 py-1 text-[13px] backdrop-blur-sm ring-1 ring-black/5"
                title={venue.country}
              >
                {flag}
              </span>
            )}
          </div>
          {venue.priceHint && (
            <div className="absolute bottom-3 left-3">
              <span className="rounded-full bg-[#7f0f2e]/90 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                {venue.priceHint}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="flex min-w-0 flex-1 flex-col px-5 pt-4 pb-5">
        <div className="flex min-w-0 items-center gap-1.5 text-[12px] text-[#86868b]">
          <MapPin size={12} className="shrink-0" aria-hidden />
          <span className="truncate">
            {venue.area}, {venue.city}
          </span>
        </div>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2.8rem] min-w-0 text-[18px] leading-snug font-bold tracking-tight text-[#1d1d1f]">
          <Link href={`/venues/${venue.slug}`}>{venue.name}</Link>
        </h3>

        <p className="mt-1 text-[12px] text-[#86868b]">
          {formatGuests(venue.capacityMin, venue.capacityMax)} &nbsp;·&nbsp; {venue.setting}
        </p>

        {venue.amenities.length > 0 && (
          <p
            className="mt-2 truncate text-[11px] text-[#b8b8bd]"
            title={venue.amenities.join(", ")}
          >
            {venue.amenities.slice(0, 3).join("  ·  ")}
          </p>
        )}

        {/* Verified badge */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#f0fdf4]">
            <span className="text-[9px] text-[#16a34a]">✓</span>
          </div>
          <span className="text-[11px] font-medium text-[#16a34a]">Verified venue</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3 pt-4">
          <Link
            href={`/contact?venue=${venue.slug}`}
            className="s-btn-dark btn-sheen flex-1 px-4 py-2.5 text-center text-[13px] font-semibold"
          >
            Get quote
          </Link>
          <Link
            href={`/venues/${venue.slug}`}
            className="shrink-0 px-3 py-2.5 text-[13px] font-medium text-[#424245] underline decoration-black/20 underline-offset-4 hover:text-[#1d1d1f] hover:decoration-black"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
