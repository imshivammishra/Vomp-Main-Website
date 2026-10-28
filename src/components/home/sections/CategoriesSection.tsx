"use client";

import Link from "next/link";
import {
  BadgePercent,
  Building2,
  Castle,
  Landmark,
  Palmtree,
  Sparkles,
  TentTree,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const ICON_MAP: Record<string, LucideIcon> = {
  castle: Castle,
  palm: Palmtree,
  landmark: Landmark,
  tent: TentTree,
  building: Building2,
  users: Users,
  badge: BadgePercent,
  sparkles: Sparkles,
  phone: Users,
};

type Category = {
  icon: string;
  t: string;
  d: string;
  href: string;
};

export default function CategoriesSection({
  categories,
  heading,
}: {
  categories: Category[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section aria-label="Venue categories" className="band-sage border-t border-[#eed9a3]">
      <div className="mx-auto max-w-[1024px] px-5 py-14 md:px-6 md:py-20">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ icon: iconKey, t, d, href }) => {
              const Icon = ICON_MAP[iconKey] || Castle;
              return (
                <Link
                  key={t}
                  href={href}
                  className="group rounded-[18px] bg-[#f5f5f7] p-7 transition duration-300 hover:bg-[#e8e8ed]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#5c0a20] text-[#f6de9a]">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-[17px] font-bold tracking-tight text-[#1d1d1f]">{t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#424245]">{d}</p>
                  <span className="mt-3 inline-block text-[14px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 group-hover:decoration-black">
                    Browse venues &rsaquo;
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
