"use client";

import Link from "next/link";
import { useState } from "react";
import type { Venue } from "@/types";
import VenueCard from "../venues/VenueCard";
import { cn } from "@/lib/utils";

const TABS: Array<{ key: string; label: string; match: string[] }> = [
  {
    key: "wedding",
    label: "Weddings",
    match: ["Wedding", "Sangeet", "Reception", "Haldi", "Engagement"],
  },
  { key: "corporate", label: "Corporate", match: ["Corporate event", "Corporate offsite"] },
  {
    key: "private",
    label: "Private Parties",
    match: ["Birthday / Anniversary", "Reception", "Cocktail", "Engagement"],
  },
  { key: "destination", label: "Destination", match: ["Wedding", "Haldi"] },
] as const;

export default function HomeTabs({ venues }: { venues: Venue[] }) {
  const [active, setActive] = useState<string>("wedding");
  const tab = TABS.find((t) => t.key === active)!;
  const list = venues.filter((v) => v.eventTypes.some((e) => tab.match.includes(e))).slice(0, 4);
  const fallback = (list.length > 0 ? list : venues).slice(0, 4);

  if (venues.length === 0) {
    return (
      <div className="mt-8 rounded-[22px] border border-black/10 bg-[#f5f5f7] px-6 py-14 text-center md:px-12">
        <p className="text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-tight text-[#1d1d1f]">
          Our venue collection is being curated.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#424245]">
          We publish a property only after it has been visited or vetted. Share your date, guest
          count and city — we will send a private shortlist of real venues that fit.
        </p>
        <Link
          href="/contact"
          className="s-btn-dark btn-sheen mt-6 inline-block px-6 py-2.5 text-[15px]"
        >
          Request a private shortlist
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Samsung tab pills */}
      <div className="no-scrollbar mt-8 flex justify-start gap-2 overflow-x-auto md:justify-center">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            aria-pressed={active === t.key}
            className={cn(
              "rounded-full px-6 py-2 text-[14px] whitespace-nowrap transition",
              active === t.key
                ? "bg-[#1d1d1f] text-white"
                : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {fallback.map((v) => (
          <VenueCard key={v.slug} venue={v} />
        ))}
      </div>
    </div>
  );
}
