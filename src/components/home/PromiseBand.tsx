import Link from "next/link";
import { Crown, Gem, Compass, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Personally Vetted",
    copy: "Every venue is visited or verified for capacity, access, food and guest comfort before it earns a place in our collection.",
  },
  {
    icon: Gem,
    title: "Curated, Not Listed",
    copy: "Fewer venues, chosen with intent. We present a refined shortlist with the trade-offs stated clearly — never an endless directory.",
  },
  {
    icon: Compass,
    title: "Concierge Guidance",
    copy: "A dedicated advisor coordinates visits, quotes and questions. Nothing is booked without your written approval.",
  },
];

export default function PromiseBand() {
  return (
    <section
      aria-labelledby="promise-heading"
      className="relative overflow-hidden bg-[#fdf9f2] pt-20 pb-20 md:pt-28 md:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(212,164,55,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1180px] px-5 md:px-10">
        <Reveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4a437]/50" />
              <p className="text-[10px] font-semibold tracking-[0.34em] text-[#a67c1a] uppercase">
                The Promise
              </p>
              <span className="h-px w-8 bg-[#d4a437]/50" />
            </div>
            <h2
              id="promise-heading"
              className="font-display mx-auto max-w-[760px] text-[34px] leading-[1.06] text-[#1a0a0d] md:text-[52px]"
            >
              Luxury is in the details we handle for you
              <span className="text-[#a67c1a]">.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-[#6b5b5d]">
              A quieter, more considered way to find a venue worthy of your occasion.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 110}>
              <div className="group h-full rounded-[22px] border border-[#ece0cc] bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4a437]/50 hover:shadow-[0_28px_56px_-28px_rgba(92,10,32,0.28)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e7d4ab] bg-[#fdf6e7] text-[#a67c1a] transition-colors duration-500 group-hover:border-[#d4a437] group-hover:text-[#7f0f2e]">
                  <pillar.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-display mt-6 text-[24px] text-[#1a0a0d]">{pillar.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5a4c4e]">{pillar.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center justify-center gap-5 text-center md:flex-row md:gap-8">
            <p className="flex items-center gap-2.5 text-[14px] font-medium text-[#1a0a0d]">
              <Crown size={17} className="text-[#a67c1a]" strokeWidth={1.6} />
              Trusted for weddings &amp; celebrations across India
            </p>
            <Link
              href="/about"
              className="lux-underline text-[13px] font-semibold tracking-[0.08em] text-[#7f0f2e] uppercase"
            >
              Our story
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
