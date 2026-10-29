import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "I",
    title: "Share your brief",
    body: "City, date, guest count and the feeling you want. Two minutes is all it takes.",
  },
  {
    n: "II",
    title: "Receive your shortlist",
    body: "A bespoke selection with private pricing, honest comparisons and visit notes — within one business day.",
  },
  {
    n: "III",
    title: "Book with confidence",
    body: "Visit shortlisted venues, compare private quotes and confirm — with full human support throughout.",
  },
];

const TRUST_MARKS = [
  { stat: "100%", label: "Venues personally visited" },
  { stat: "1 day", label: "Typical shortlist turnaround" },
  { stat: "Private", label: "Pricing — never published" },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-[#faf7f2] py-24 md:py-32 border-y border-[#f1eae0]"
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c6a04a]/30 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Two-column layout */}
        <div className="grid gap-20 md:grid-cols-[1fr_1.1fr] md:gap-24">
          {/* Left — heading + trust stats */}
          <Reveal>
            <div className="flex flex-col justify-between gap-10 md:sticky md:top-28 md:self-start">
              <div>
                <div className="mb-7 flex items-center gap-4">
                  <div className="h-px w-8 bg-[#c6a04a]" />
                  <p className="text-[10px] font-semibold tracking-[0.7em] text-[#7f0f2e]/60 uppercase">
                    Our approach
                  </p>
                </div>
                <p className="mb-6 text-[13px] italic text-[#8c736f]">
                  &ldquo;Two minutes is all it takes.&rdquo;
                </p>
                <h2
                  id="how-heading"
                  className="font-display text-[40px] leading-[0.96] text-[#1a0a0d] md:text-[56px] lg:text-[68px]"
                >
                  Your perfect
                  <br />
                  venue, without
                  <br />
                  <em className="not-italic text-[#7f0f2e]">the legwork.</em>
                </h2>
                <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-[#4a3a3c]">
                  We replace weeks of venue hunting with a single brief and a curated shortlist
                  built around your celebration — not a generic catalogue.
                </p>
              </div>

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-[1px] overflow-hidden rounded-[24px] border border-[#e8ded2] bg-[#e8ded2]">
                {TRUST_MARKS.map(({ stat, label }) => (
                  <div key={label} className="flex flex-col bg-white px-6 py-6">
                    <p className="font-display text-[26px] leading-none text-[#1a0a0d] md:text-[30px]">
                      {stat}
                    </p>
                    <p className="mt-2.5 text-[10px] leading-snug text-[#8c736f] tracking-tight uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — numbered steps */}
          <div className="flex flex-col gap-[1px] divide-y divide-[#e8ded2]">
            {STEPS.map(({ n, title, body }, i) => (
              <Reveal key={n} delay={i * 70}>
                <div className="flex gap-7 py-12 first:pt-0 last:pb-0">
                  {/* Roman numeral */}
                  <div className="shrink-0 pt-1">
                    <p
                      className="font-display text-[32px] leading-none font-semibold text-transparent"
                      style={{ WebkitTextStroke: "1px #c6a04a" }}
                    >
                      {n}
                    </p>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-[19px] leading-snug font-semibold text-[#1a0a0d] mb-3 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-[15px] leading-[1.8] text-[#4a3a3c]">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* CTA at bottom of steps */}
            <Reveal delay={140}>
              <div className="pt-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#7f0f2e]/30 bg-white px-9 py-3.5 text-[13px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:bg-[#f5efe6] hover:border-[#7f0f2e]/60 hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    Start with a brief
                    <span className="text-[#7f0f2e]">→</span>
                  </Link>
                  <Link
                    href="/venues"
                    className="px-4 py-3 text-center text-[12px] text-[#8c736f] underline decoration-[#c6a04a]/30 underline-offset-4 transition hover:text-[#7f0f2e] hover:decoration-[#7f0f2e]/60"
                  >
                    Browse venues first
                  </Link>
                </div>
                <p className="mt-5 text-[11px] text-[#8c736f] tracking-wide uppercase">
                  Most families receive their shortlist within one business day.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c6a04a]/20 to-transparent"
      />
    </section>
  );
}
