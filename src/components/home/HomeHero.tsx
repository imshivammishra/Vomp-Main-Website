"use client";

import Link from "next/link";
import SearchBar from "@/components/forms/SearchBar";

const DESTINATIONS = [
  { label: "Udaipur", sub: "Lakes & palaces", image: "/images/udaipur-city.jpg", href: "/venues?city=Udaipur" },
  { label: "Jaipur", sub: "Fort venues", image: "/images/udaipur-palace2.jpg", href: "/venues?city=Jaipur" },
  { label: "Goa", sub: "Beach & villas", image: "/images/hero-poster.jpg", href: "/venues?city=Goa" },
  { label: "Jodhpur", sub: "Royal estates", image: "/images/udaipur-palace2.jpg", href: "/venues?city=Jodhpur" },
  { label: "Jaisalmer", sub: "Desert forts", image: "/images/udaipur-palace2.jpg", href: "/venues?city=Jaisalmer" },
];

export default function HomeHero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[90vh] flex-col overflow-hidden bg-white"
    >
      {/* Top decorative */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4a437]/30 to-transparent" />

      {/* ── Main content ── */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-20 text-center md:px-10 md:pb-32 md:pt-36">

        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-5 md:gap-8">
          <div className="h-px w-20 bg-[#d4a437]/40 md:w-32" />
          <p className="text-[11px] font-semibold tracking-[0.65em] text-[#7f0f2e]/70 uppercase whitespace-nowrap">
            Venue On My Plate
          </p>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4a437]/40 md:w-32" />
        </div>

        {/* Headline */}
        <h1
          className="font-display mx-auto max-w-[680px] text-[40px] font-semibold leading-[1.02] text-[#1a0a0d] md:text-[56px] lg:text-[72px] xl:text-[88px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Find the perfect venue
          <br />
          <span className="relative inline-block">
            for your celebration
            <span
              aria-hidden
              className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c6a04a]/60 to-transparent"
              style={{ bottom: "-5px" }}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-7 max-w-[520px] text-[15px] leading-[1.85] text-[#4a3a3c] md:text-[17px]">
          Curated palaces, lakeside estates and private resorts — every venue
          personally visited or vetted by our team.
        </p>

        {/* ── Search bar (Partyslate-style: prominent, center) ── */}
        <div className="mt-14 w-full max-w-[680px] md:mt-22 md:max-w-[800px]">
          {/* Outer brand frame */}
          <div
            className="rounded-[30px] p-[1px] md:rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(127,15,46,0.45) 0%, rgba(212,164,55,0.35) 50%, rgba(127,15,46,0.45) 100%)",
              boxShadow: "0 0 60px -20px rgba(127,15,46,0.14)",
            }}
          >
            <div className="rounded-[29px] bg-white border border-[#e8ded2]">
              <SearchBar />
            </div>
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] text-[#8c736f] uppercase">
            <span className="h-px w-[56px] bg-[#d9cbb8]" />
            Private shortlist · One business day
            <span className="h-px w-[56px] bg-[#d9cbb8]" />
          </p>
        </div>

        {/* ── Destination quick-links ── */}
        <div className="mt-18 w-full max-w-[720px] md:mt-28">
          <div className="mb-9 flex items-center gap-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e8ded2]" />
            <p className="shrink-0 text-[11px] font-semibold tracking-[0.65em] text-[#8c736f] uppercase">
              Explore by destination
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e8ded2]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-7">
            {DESTINATIONS.map(({ label, sub, image, href }) => (
              <Link
                key={label}
                href={href}
                className="group relative block overflow-hidden rounded-[24px] bg-white border border-[#e8ded2] transition-all duration-500 hover:border-[#c6a04a]/50 hover:-translate-y-1 hover:shadow-[0_28px_48px_-16px_rgba(15,8,10,0.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <span
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-800 group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0d]/30 via-[#1a0a0d]/8 to-transparent" />
                  <div className="absolute inset-0 bg-[#000]/4" />
                </div>
                <div className="p-5">
                  <p className="font-display text-[17px] leading-tight text-[#1a0a0d]">{label}</p>
                  <p className="mt-1.5 text-[11px] leading-snug text-[#8c736f]">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom decorative */}
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c6a04a]/20 to-transparent" />
      </div>
    </section>
  );
}
