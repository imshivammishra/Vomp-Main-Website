import Reveal from "@/components/ui/Reveal";
import type { Review } from "@/types";

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? "text-[#d4a437]" : "text-[#e4e4e7]"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-heading" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-14 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-[#a67c1a]/40" />
              <p className="text-[9px] font-semibold tracking-[0.45em] text-[#a67c1a] uppercase">
                Client stories
              </p>
              <div className="h-px w-16 bg-[#a67c1a]/40" />
            </div>
            <h2
              id="testimonials-heading"
              className="font-display text-[42px] leading-tight text-[#1d1d1f] md:text-[58px]"
            >
              Loved by families<span className="text-[#a67c1a]">.</span>
            </h2>
            <p className="mt-4 text-[15px] text-[#525252] max-w-md mx-auto">
              Real words from families who found their venue through us.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 60}>
              <div className="rounded-2xl border border-[#e8e8ed] bg-[#fdf9f4] p-6 flex flex-col gap-4">
                <StarRating n={review.rating} />
                <p className="text-[15px] leading-relaxed text-[#3f3f3f] flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[#e8e8ed]">
                  <div className="w-9 h-9 rounded-full bg-[#7f0f2e]/10 flex items-center justify-center text-[#7f0f2e] font-bold text-[14px] shrink-0">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1d1d1f]">{review.name}</p>
                    <p className="text-[11px] text-[#86868b]">{review.context}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="review-cta-wrap text-center">
          <a href="/contact" className="s-btn-dark btn-sheen inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold">
            Share your experience
          </a>
        </div>
      </div>
    </section>
  );
}
