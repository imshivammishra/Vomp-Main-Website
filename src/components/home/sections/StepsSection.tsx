"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

export default function StepsSection({
  steps,
  heading,
}: {
  steps: string[][];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section id="how-it-works" aria-label="How it works" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
      <SectionHeading eyebrow={stepsHeading(heading).eyebrow} title={stepsHeading(heading).title} copy={stepsHeading(heading).copy} />
      <Reveal delay={120}>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([n, t, d]) => (
            <li key={n} className="s-card p-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f5f5f7]">
                <span className="text-[20px] font-bold text-[#1d1d1f]">{n}</span>
              </span>
              <p className="mt-3 text-[18px] font-bold tracking-tight">{t}</p>
              <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-600">{d}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/venues" className="s-btn-dark btn-sheen px-6 py-2.5 text-[15px]">
          Explore venues
        </Link>
        <Link href="/contact" className="s-link px-4 py-2.5 text-[15px]">
          Request bespoke proposal &rsaquo;
        </Link>
      </div>
    </section>
  );
}

function stepsHeading(heading: { eyebrow: string; title: string; copy?: string }) {
  return heading;
}
