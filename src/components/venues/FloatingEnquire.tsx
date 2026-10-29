"use client";

/**
 * Sticky mobile enquiry bar — the highest-converting element on venue pages.
 * Mobile only; desktop already has the sticky aside form.
 */
export default function FloatingEnquire({ venueName }: { venueName: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/90 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 truncate text-[13px] text-[#424245]">
          <span className="block truncate text-[14px] font-semibold text-[#1d1d1f]">
            {venueName}
          </span>
          Free shortlist · replies in a day
        </p>
        <a
          href="#enquire"
          className="s-btn-dark btn-sheen shrink-0 rounded-full px-6 py-2.5 text-[14px]"
          aria-label={`Check availability for ${venueName}`}
        >
          Enquire
        </a>
      </div>
    </div>
  );
}
