"use client";

export default function TickerSection({ ticker }: { ticker: string[] }) {
  return (
    <div className="border-y border-[#c6a04a]/60 bg-[#f4e6c9]">
      <div
        aria-label="Wedding celebrations"
        className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2.5 md:gap-x-7"
      >
        {ticker.slice(0, 6).map((t, i) => (
          <span
            key={t}
            className="flex items-center gap-4 font-display text-[11px] font-semibold tracking-[0.24em] text-[#4a0719] uppercase md:gap-7 md:text-[12px]"
          >
            {i > 0 && (
              <span aria-hidden="true" className="text-[8px] leading-none text-[#a67c1a]">
                ❖
              </span>
            )}
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
