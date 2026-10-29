import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const CATEGORIES = [
  {
    label: "Weddings",
    sub: "Palaces, lawns & ballrooms",
    image: "/images/wedding-decor.jpg",
    imageAlt: "Elegant wedding venue setup",
    href: "/wedding-venues",
    count: "42 venues",
  },
  {
    label: "Birthday Parties",
    sub: "Private homes & lawns",
    image: "/images/indian-ceremony.jpg",
    imageAlt: "Birthday celebration venue",
    href: "/venues?event=Birthday",
    count: "28 venues",
  },
  {
    label: "Sangeet & Haldi",
    sub: "Colourful morning functions",
    image: "/images/hero-poster.jpg",
    imageAlt: "Sangeet and haldi venue",
    href: "/venues?event=Wedding",
    count: "31 venues",
  },
  {
    label: "Corporate Events",
    sub: "Conferences & offsites",
    image: "/images/wedding-dance.jpg",
    imageAlt: "Corporate event venue",
    href: "/venues?event=Corporate",
    count: "19 venues",
  },
  {
    label: "Anniversaries",
    sub: "Romantic private spaces",
    image: "/images/udaipur-palace2.jpg",
    imageAlt: "Anniversary celebration venue",
    href: "/venues?event=Birthday",
    count: "24 venues",
  },
  {
    label: "Engagements",
    sub: "Intimate celebrations",
    image: "/images/udaipur-city.jpg",
    imageAlt: "Engagement party venue",
    href: "/venues?event=Birthday",
    count: "17 venues",
  },
];

export default function CategoryTiles() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="relative overflow-hidden bg-[#faf7f2] py-24 md:py-32 border-y border-[#f1eae0]"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* Header */}
        <Reveal>
          <div className="mb-16 flex flex-col items-center gap-6 text-center md:mb-24">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-[#c6a04a]" />
              <p className="text-[11px] font-semibold tracking-[0.65em] text-[#7f0f2e]/60 uppercase">
                Browse by occasion
              </p>
              <div className="h-px w-8 bg-[#c6a04a]" />
            </div>
            <h2 id="categories-heading" className="font-display text-[40px] leading-[1.02] text-[#1a0a0d] md:text-[54px]">
              Choose your celebration<span className="text-[#7f0f2e]">.</span>
            </h2>
          </div>
        </Reveal>

        {/* Grid - Partyslate style: big photo tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 50}>
              <Link
                href={cat.href}
                className="group relative block overflow-hidden rounded-[24px] border border-[#e8ded2] bg-white transition-all duration-500 hover:border-[#c6a04a]/50 hover:-translate-y-1 hover:shadow-[0_28px_48px_-16px_rgba(15,8,10,0.08)]"
              >
                {/* Image - dominant */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={85}
                    className="object-cover transition-transform duration-800 group-hover:scale-[1.06]"
                    style={{ filter: "saturate(1.03)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0d]/25 via-[#1a0a0d]/5 to-transparent" />
                  <div className="absolute inset-0 bg-[#000]/3" />
                </div>

                {/* Badge top-left */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-semibold text-[#1a0a0d] shadow-sm ring-1 ring-[#e8ded2]">
                    {cat.count}
                  </span>
                </div>

                {/* Content bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display text-[20px] leading-tight text-white">{cat.label}</p>
                      <p className="mt-1 text-[10px] leading-snug text-[#d9cbb8]">{cat.sub}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-110">
                      <span className="text-[#7f0f2e] font-bold">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/venues"
            className="rounded-full border border-[#e8ded2] bg-white px-8 py-3 text-[12px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:border-[#c6a04a]/60 hover:text-[#7f0f2e] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            View all occasions
            <span className="text-[#7f0f2e]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
