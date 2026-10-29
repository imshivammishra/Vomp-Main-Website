import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { City } from "@/types";

export default function CityCard({ city }: { city: City }) {
  const href = `/cities/${city.slug}`;
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[18px] border border-[#ece0cc] bg-white shadow-[0_10px_30px_-20px_rgba(92,10,32,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4a437]/55 hover:shadow-[0_28px_56px_-24px_rgba(92,10,32,0.32)]"
      aria-label={`Explore venues in ${city.name}`}
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-[#f5f5f7]">
        <Image
          src={city.image}
          alt={city.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          loading="lazy"
          quality={72}
          className="object-cover"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-[#d4a437] group-hover:text-[#f6de9a]">
          <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="px-6 py-5 text-center">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#a67c1a] uppercase">
          {city.venueCountLabel}
        </p>
        <h3 className="font-display mt-1.5 text-[26px] tracking-tight text-[#1a0a0d]">
          {city.name}
        </h3>
        <p className="mt-1 text-[14px] text-[#6b5b5d]">{city.tagline}</p>
        <span className="lux-underline mt-2.5 inline-block text-[13px] font-semibold tracking-[0.06em] text-[#7f0f2e] uppercase">
          Explore venues &rsaquo;
        </span>
      </div>
    </Link>
  );
}
