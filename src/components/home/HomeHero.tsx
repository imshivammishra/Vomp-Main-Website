import Image from "next/image";
import SearchBar from "@/components/forms/SearchBar";

const TRUST = [
  { value: "250+", label: "Curated venues" },
  { value: "18", label: "Destinations" },
  { value: "24 hrs", label: "Personal shortlist" },
];

export default function HomeHero() {
  return (
    <section aria-label="Find a venue" className="hero-stage">
      {/* Cinematic real reception imagery — slow ken-burns, no autoplay background video */}
      <Image
        src="/images/ps/hero-a.jpg"
        alt="Candlelit wedding reception with a long floral table runner"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="hero-img"
      />
      <div aria-hidden className="hero-scrim" />
      <div aria-hidden className="hero-grain" />

      <div className="relative z-[2] mx-auto flex min-h-[86vh] max-w-[1180px] flex-col items-center justify-center px-5 py-28 text-center md:min-h-[90vh] md:px-10 md:py-32">
        <span className="lux-chip lux-rise lux-delay-1 text-[#f6de9a]">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#d4a437]" />
          India&apos;s Finest Celebration Venues
        </span>

        <h1 className="font-display lux-rise lux-delay-2 mt-7 max-w-[980px] text-[42px] leading-[1.02] font-semibold tracking-[-0.01em] text-white md:text-[76px]">
          Every celebration begins
          <br className="hidden sm:block" /> with the{" "}
          <span className="champagne-text italic">perfect venue</span>.
        </h1>

        <p className="lux-rise lux-delay-3 mt-6 max-w-[620px] text-[15px] leading-relaxed text-white/75 md:text-[18px]">
          Discover hand-picked palaces, lakeside lawns, heritage havelis and grand ballrooms across
          India — every one personally visited or vetted.
        </p>

        <div
          aria-hidden
          className="gold-draw mt-9 h-px w-40 bg-gradient-to-r from-transparent via-[#d4a437] to-transparent"
        />

        <div className="lux-rise lux-delay-4 mt-8 w-full max-w-[820px]">
          <SearchBar />
        </div>

        <dl className="lux-rise lux-delay-5 mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
          {TRUST.map((item) => (
            <div key={item.label} className="text-center">
              <dt className="lux-stat champagne-text text-[26px] md:text-[32px]">{item.value}</dt>
              <dd className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-white/55 uppercase">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[9px] font-semibold tracking-[0.3em] text-white/50 uppercase">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 pt-1.5">
          <span aria-hidden className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-[#d4a437]" />
        </span>
      </div>
    </section>
  );
}
