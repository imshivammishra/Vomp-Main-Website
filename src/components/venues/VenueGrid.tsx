import Link from "next/link";
import type { Venue } from "@/types";
import VenueCard from "./VenueCard";
import Reveal from "../ui/Reveal";

export default function VenueGrid({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) {
    return (
      <Reveal scale>
        <div className="rounded-2xl border border-[#e8e8ed] bg-[#fdf9f4] px-8 py-20 text-center">
          <div className="mx-auto mb-5 flex items-center justify-center gap-3 text-[#a67c1a]">
            <span className="h-px w-10 bg-[#a67c1a] opacity-50" />
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">Private shortlists</span>
            <span className="h-px w-10 bg-[#a67c1a] opacity-50" />
          </div>
          <p className="font-display text-[30px] leading-tight text-[#1d1d1f] md:text-[36px]">
            Nothing here — yet.
          </p>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#424245]">
            Every property is personally visited or vetted before it appears. Share your brief and
            we will send a private shortlist shaped around your celebration.
          </p>
          <Link
            href="/contact"
            className="s-btn-dark btn-sheen mt-8 inline-block px-8 py-3 text-[15px]"
          >
            Request a shortlist
          </Link>
        </div>
      </Reveal>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {venues.map((v, i) => (
        <VenueCard key={v.slug} venue={v} index={i} />
      ))}
    </div>
  );
}
