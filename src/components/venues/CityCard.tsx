import Image from "next/image";
import Link from "next/link";
import type { City } from "@/types";

export default function CityCard({ city }: { city: City }) {
  const href = `/cities/${city.slug}`;
  return (
    <Link
      href={href}
      className="s-card group relative block overflow-hidden"
      aria-label={`Explore venues in ${city.name}`}
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-[#f5f5f7]">
        <Image
          src={city.image}
          alt={city.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          loading="lazy"
          quality={70}
          className="object-cover"
        />
      </div>
      <div className="px-6 py-5 text-center">
        <p className="text-[12px] font-semibold text-[#6e6e73]">{city.venueCountLabel}</p>
        <h3 className="mt-1 text-[24px] font-bold tracking-tight text-[#1d1d1f]">{city.name}</h3>
        <p className="mt-1 text-[14px] text-[#6e6e73]">{city.tagline}</p>
        <span className="mt-2 inline-block text-[14px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 group-hover:decoration-black">
          Explore venues &rsaquo;
        </span>
      </div>
    </Link>
  );
}
