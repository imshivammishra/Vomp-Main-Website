import Image from "next/image";
import Link from "next/link";

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
  tiles,
}: {
  id: string;
  title: string;
  subtitle: string;
  tiles: PhotoTile[];
}) {
  return (
    <section aria-labelledby={id} className="bg-white pt-16 md:pt-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center">
          <span aria-hidden className="mx-auto block h-[2px] w-[18px] bg-[#7f0f2e]" />
          <h2
            id={id}
            className="mt-5 text-[26px] leading-tight font-bold tracking-[-0.02em] text-[#141414] md:text-[34px]"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-relaxed text-[#4a4a4a] md:text-[16px]">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-x-7">
          {tiles.map((tile) => (
            <Link key={tile.label} href={tile.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f2f2]">
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                />
              </div>
              <p className="mt-3 text-[14px] leading-snug font-bold text-[#141414] transition-colors group-hover:text-[#7f0f2e] md:text-[16px]">
                {tile.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
