"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

type GalleryItem = { src: string; alt: string; mood: string };

export default function GallerySection({
  gallery,
  heading,
}: {
  gallery: GalleryItem[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section aria-label="Events gallery" className="band-blush border-t border-[#eed9a3]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
        <Reveal delay={120}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {gallery.map((g) => (
              <figure
                key={`${g.src}-${g.mood}`}
                className="gold-frame w-72 shrink-0 snap-center overflow-hidden rounded-2xl p-2 md:w-auto"
              >
                <div className="img-zoom relative h-72 overflow-hidden rounded-xl md:h-80">
                  <Image
                    src={g.src}
                    alt={g.alt || g.mood}
                    fill
                    sizes="400px"
                    loading="lazy"
                    quality={65}
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-center justify-between px-2 py-3">
                  <span className="text-[15px] font-semibold text-[#1d1d1f]">{g.mood}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
