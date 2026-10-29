"use client";

import Link from "next/link";

export default function CTASection({
  title,
  copy,
  primaryHref = "/contact",
  primaryLabel = "Request bespoke proposal",
  secondaryHref = "/venues",
  secondaryLabel = "Explore venues",
}: {
  title: string;
  copy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section aria-label="Call to action" className="relative overflow-hidden bg-[#faf7f2] border-t border-[#f1eae0]">
      {/* Warm side glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#d4a437]/8 rounded-full blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-[860px] flex-col items-center px-6 py-24 text-center md:py-32">

        {/* Gold ornament */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-10 bg-[#c6a04a]/50" />
          <span
            className="text-[#c6a04a]/60 text-[14px]"
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              background: "#c6a04a",
              transform: "rotate(45deg)",
            }}
            aria-hidden="true"
          />
          <div className="h-px w-10 bg-[#c6a04a]/50" />
        </div>

        <h2 className="font-display max-w-2xl text-[40px] leading-[1.04] font-semibold text-balance text-[#1a0a0d] md:text-[56px]">
          {title}
        </h2>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#4a3a3c]">{copy}</p>
        <p className="mt-2 text-[12px] text-[#8c736f] italic tracking-[0.1em] uppercase">
          — No commitment · Human response within one business day —
        </p>

        {/* Bottom ornament */}
        <div className="my-10 flex items-center justify-center gap-2 text-[#c6a04a]/50">
          <span className="text-[12px]">·</span>
          <span className="text-[9px]">◆</span>
          <span className="text-[12px]">·</span>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={primaryHref}
            className="rounded-full border border-[#7f0f2e]/30 bg-white px-9 py-3.5 text-[14px] font-semibold text-[#1a0a0d] tracking-[0.1em] uppercase shadow-sm transition-all duration-300 hover:bg-[#f5efe6] hover:border-[#7f0f2e]/60 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="px-4 py-3 text-[13px] text-[#8c736f] underline decoration-[#c6a04a]/30 underline-offset-4 transition hover:text-[#7f0f2e] hover:decoration-[#7f0f2e]/60"
          >
            {secondaryLabel} &rsaquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
