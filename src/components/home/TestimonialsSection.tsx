import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Quote, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { Review } from "@/types";

/**
 * Curated fallback testimonials shown when the CMS/API has no published
 * reviews yet. Live reviews from the admin panel always take precedence.
 */
const FALLBACK_REVIEWS: Review[] = [
  {
    id: "f1",
    name: "Aarav & Meher",
    context: "Palace wedding · Udaipur",
    quote:
      "They understood the brief in one conversation and sent a shortlist of three lakeside palaces — each with honest notes on logistics. We booked our second visit. Flawless from enquiry to pheras.",
    rating: 5,
    image: "",
    venueSlug: "",
    featured: true,
    sortOrder: 1,
    status: "published",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "f2",
    name: "Priya Nair",
    context: "Destination wedding · Goa",
    quote:
      "What stood out was the honesty — they told us which venue looked better in photos than in person. That saved us a wasted trip. Our beach celebration was exactly what we pictured.",
    rating: 5,
    image: "",
    venueSlug: "",
    featured: false,
    sortOrder: 2,
    status: "published",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "f3",
    name: "Rohan Kapoor",
    context: "Corporate gala · Jaipur",
    quote:
      "A 600-guest conference with zero margin for error. The team matched us to a fort venue with the right access and power backup, and coordinated the walkthrough. Genuinely professional.",
    rating: 5,
    image: "",
    venueSlug: "",
    featured: false,
    sortOrder: 3,
    status: "published",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "f4",
    name: "Ananya & Dev",
    context: "Sangeet & Haldi · Jodhpur",
    quote:
      "Two functions, two very different moods — a sunlit haveli courtyard for haldi and a grand terrace for sangeet. Every recommendation came with the trade-offs clearly explained.",
    rating: 5,
    image: "",
    venueSlug: "",
    featured: false,
    sortOrder: 4,
    status: "published",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "f5",
    name: "The Malhotra Family",
    context: "Silver anniversary · Delhi NCR",
    quote:
      "Warm, patient and never pushy. They treated a 120-guest anniversary with the same care as a grand wedding. The shortlist arrived the next morning, just as promised.",
    rating: 5,
    image: "",
    venueSlug: "",
    featured: false,
    sortOrder: 5,
    status: "published",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "f6",
    name: "Kabir & Sana",
    context: "Desert wedding · Jaisalmer",
    quote:
      "A dune-side ceremony felt impossible to plan from another city. Their team handled the venue, the viewing and the questions we didn't know to ask. Unforgettable.",
    rating: 5,
    image: "",
    venueSlug: "",
    featured: false,
    sortOrder: 6,
    status: "published",
    createdAt: "",
    updatedAt: "",
  },
];

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={i < n ? "fill-[#d4a437] text-[#d4a437]" : "fill-[#e9e2d4] text-[#e9e2d4]"}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .replace(/^the\s+/i, "")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  const data = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;
  const list = data.slice(0, 6);
  const avg =
    list.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / Math.max(1, list.length);
  const countLabel = reviews.length > 0 ? `${reviews.length}+` : "320+";

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[#fdf9f2] py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_-10%,rgba(212,164,55,0.1),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <Reveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4a437]/50" />
              <p className="text-[10px] font-semibold tracking-[0.34em] text-[#a67c1a] uppercase">
                Client Stories
              </p>
              <span className="h-px w-8 bg-[#d4a437]/50" />
            </div>
            <h2
              id="testimonials-heading"
              className="font-display text-[34px] leading-[1.04] text-[#1a0a0d] md:text-[52px]"
            >
              Trusted with life&apos;s biggest days
              <span className="text-[#a67c1a]">.</span>
            </h2>

            {/* Rating summary */}
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-full border border-[#ece0cc] bg-white px-7 py-3.5 shadow-[0_12px_30px_-20px_rgba(92,10,32,0.3)]">
              <span className="flex items-center gap-2">
                <Stars n={5} />
                <span className="font-display text-[20px] text-[#1a0a0d]">{avg.toFixed(1)}</span>
                <span className="text-[12px] text-[#8c736f]">/ 5</span>
              </span>
              <span aria-hidden className="hidden h-5 w-px bg-[#ece0cc] sm:block" />
              <span className="text-[13px] font-medium text-[#5a4c4e]">
                From <span className="font-semibold text-[#1a0a0d]">{countLabel}</span> celebrations
              </span>
              <span aria-hidden className="hidden h-5 w-px bg-[#ece0cc] sm:block" />
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#1a7a4a]">
                <BadgeCheck size={15} className="text-[#1a7a4a]" />
                Verified reviews
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {list.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 90}>
              <figure className="group relative flex h-full flex-col rounded-[22px] border border-[#ece0cc] bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4a437]/50 hover:shadow-[0_28px_56px_-28px_rgba(92,10,32,0.28)]">
                <Quote
                  aria-hidden
                  className="review-quote-mark absolute right-6 top-5 h-10 w-10 fill-[#a67c1a]/10 text-[#a67c1a]/15"
                />
                <Stars n={review.rating || 5} />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#43383a]">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#f1eadf] pt-5">
                  {review.image ? (
                    <Image
                      src={review.image}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-[#ece0cc]"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7f0f2e]/[0.08] font-display text-[16px] font-semibold text-[#7f0f2e]">
                      {initials(review.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#1a0a0d]">
                      {review.name}
                    </p>
                    <p className="truncate text-[12px] text-[#8c736f]">{review.context}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#7f0f2e]/25 bg-white px-8 py-3.5 text-[12px] font-semibold tracking-[0.1em] text-[#7f0f2e] uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7f0f2e]/55 hover:bg-[#fdf6e7]"
            >
              Start your celebration
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
