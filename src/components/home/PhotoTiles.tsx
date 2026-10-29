import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export type PhotoTile = {
  label: string;
  href: string;
  image: string;
  alt: string;
};

export default function PhotoTiles({
  id,
  title,
  subtitle,
  eyebrow = "Collection",
  tiles,
}: {
  id: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  tiles: PhotoTile[];
}) {
  return (
    <section aria-labelledby={id} className="bg-white pt-14 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4a437]/50" />
              <p className="text-[10px] font-semibold tracking-[0.34em] text-[#a67c1a] uppercase">
                {eyebrow}
              </p>
              <span className="h-px w-8 bg-[#d4a437]/50" />
            </div>
            <h2
              id={id}
              className="font-display text-[30px] leading-[1.06] text-[#1d1d1f] sm:text-[34px] md:text-[52px]"
            >
              {title}
              <span className="text-[#a67c1a]">.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-relaxed text-[#6b6b6b] md:mt-4 md:text-[16px]">
              {subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
          {tiles.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 90} scale>
              <Link href={tile.href} className="group block">
                <div className="lux-tile aspect-[3/4]">
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={82}
                    className="object-cover"
                  />
                  <span aria-hidden className="lux-tile-scrim" />
                  <div className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-2 p-4 md:p-5">
                    <div>
                      <span className="block h-px w-6 origin-left scale-x-0 bg-[#d4a437] transition-transform duration-500 group-hover:scale-x-100" />
                      <p className="font-display mt-2 text-[18px] leading-tight text-white md:text-[22px]">
                        {tile.label}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/40 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-[#d4a437] group-hover:text-[#f6de9a]">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
