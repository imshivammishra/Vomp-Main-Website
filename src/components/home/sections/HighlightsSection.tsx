"use client";

import HomeTabs from "@/components/home/HomeTabs";
import SectionHeading from "@/components/home/SectionHeading";
import type { Venue } from "@/types";

export default function HighlightsSection({
  venues,
  heading,
}: {
  venues: Venue[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section
      aria-labelledby="highlights-heading"
      className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20"
    >
      <SectionHeading eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
      <h2 id="highlights-heading" className="sr-only">
        Highlights by occasion
      </h2>
      <HomeTabs venues={venues} />
    </section>
  );
}
