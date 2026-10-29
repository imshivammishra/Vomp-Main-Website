"use client";

import Link from "next/link";
import { BadgePercent, PhoneCall, Sparkles, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const ICON_MAP: Record<string, LucideIcon> = {
  badge: BadgePercent,
  sparkles: Sparkles,
  phone: PhoneCall,
};

type Feature = {
  icon: string;
  t: string;
  d: string;
};

export default function FeaturesSection({
  features,
  heading,
}: {
  features: Feature[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section aria-label="Why Venue On My Plate" className="band-cream border-t border-[#eed9a3]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
        <Reveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: iconKey, t, d }) => {
              const Icon = ICON_MAP[iconKey] || Sparkles;
              return (
                <div
                  key={t}
                  className="rounded-[18px] bg-white p-8 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.22)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1d1d1f] text-white">
                    <Icon size={22} />
                  </span>
                  <p className="mt-5 text-[17px] font-bold tracking-tight text-[#1d1d1f]">{t}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#424245]">{d}</p>
                  <Link href="/contact" className="s-link mt-4 inline-block text-[15px]">
                    Learn more &rsaquo;
                  </Link>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
