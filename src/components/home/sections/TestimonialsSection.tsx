"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

type Testimonial = {
  id: string;
  name: string;
  context: string;
  quote: string;
  rating: number;
  image: string;
};

export default function TestimonialsSection({
  testimonials,
  heading,
}: {
  testimonials: Testimonial[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  if (testimonials.length === 0) return null;

  return (
    <section
      aria-label="Testimonials"
      className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20"
    >
      <SectionHeading eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
      <Reveal delay={120}>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="s-card relative overflow-hidden p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-4 text-[88px] leading-none text-black/10"
              >
                &ldquo;
              </span>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#f5f5f7]">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="56px"
                      loading="lazy"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-[13px] font-semibold text-[#6e6e73]">
                      {t.name.slice(0, 1)}
                    </span>
                  )}
                </div>
                <span
                  className="flex items-center gap-0.5"
                  aria-label={`Rated ${t.rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < t.rating
                          ? "fill-[#86868b] text-[#86868b]"
                          : "fill-neutral-200 text-neutral-200"
                      }
                    />
                  ))}
                </span>
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[#1d1d1f]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[14px] text-[#1d1d1f]">
                <span className="font-semibold">{t.name}</span>
                {t.context ? <span className="text-[#6e6e73]"> · {t.context}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
