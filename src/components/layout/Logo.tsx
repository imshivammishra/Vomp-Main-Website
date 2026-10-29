import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  tone = "dark",
  compact = false,
  full = false,
  imageOnly = false,
  align = "start",
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  full?: boolean;
  imageOnly?: boolean;
  align?: "start" | "center";
}) {
  const src = full ? "/images/brand-logo.png" : "/images/brand-logo-256.png";
  const light = tone === "light";
  const start = align === "start";
  const compactFooter = full && start;

  return (
    <Link
      href="/"
      aria-label="Venue On My Plate — home"
      className={cn(
        "group inline-flex flex-col leading-none",
        start ? "items-start" : "items-center"
      )}
    >
      <span className="relative shrink-0 self-center">
        <span
          aria-hidden="true"
          className={cn(
            "absolute -inset-1 rounded-full border md:-inset-1.5",
            light ? "border-[#e7c77e]/45" : "border-[#c6a04a]/40"
          )}
        />
        <span
          className={cn(
            "relative grid place-items-center rounded-full border p-[2px] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)] md:p-[3px]",
            light ? "border-[#e7c77e]/75 bg-[#fff8e8]" : "border-[#c6a04a]/65 bg-[#fffaf0]"
          )}
        >
          <Image
            src={src}
            alt="Venue On My Plate"
            width={full ? 480 : 420}
            height={full ? 480 : 420}
            priority
            unoptimized
            className={cn(
              "relative shrink-0 rounded-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]",
              imageOnly
                ? "h-[56px] w-[56px] md:h-[68px] md:w-[68px]"
                : full
                  ? "h-[88px] w-[88px] md:h-[100px] md:w-[100px]"
                  : compact
                    ? "h-10 w-10"
                    : "h-[46px] w-[46px] md:h-[56px] md:w-[56px]"
            )}
          />
        </span>
      </span>

      {!imageOnly && !compact && (
        <span
          className={cn(
            "flex flex-col items-center",
            compactFooter ? "mt-3" : full ? "mt-3" : "mt-1 md:mt-1.5"
          )}
        >
          <span
            className={cn(
              "font-display leading-[0.8] font-semibold tracking-[0.005em] whitespace-nowrap transition-colors duration-300",
              full ? "text-[38px] md:text-[44px]" : "text-[24px] md:text-[29px]",
              light
                ? "text-[#fff8e8] group-hover:text-[#f1d58c]"
                : "text-[#4a0719] group-hover:text-[#7f0f2e]"
            )}
          >
            Venue
          </span>

          <span
            className={cn(
              "flex items-center",
              compactFooter
                ? "mt-1.5 w-[110px] gap-1.5"
                : full
                  ? "mt-2 w-[220px] gap-2.5"
                  : "mt-1 w-[126px] gap-1.5 md:w-[148px]"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-px flex-1",
                light
                  ? "bg-gradient-to-r from-transparent to-[#e7c77e]"
                  : "bg-gradient-to-r from-transparent to-[#c6a04a]"
              )}
            />
            <span
              className={cn(
                "font-semibold uppercase leading-none whitespace-nowrap",
                compactFooter
                  ? "text-[9px] tracking-[0.25em]"
                  : full
                    ? "text-[10px] tracking-[0.34em] md:text-[11px]"
                    : "text-[7px] tracking-[0.28em] md:text-[8px] md:tracking-[0.32em]",
                light ? "text-[#f1d58c]" : "text-[#a67c1a]"
              )}
            >
              On My Plate
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "h-px flex-1",
                light
                  ? "bg-gradient-to-l from-transparent to-[#e7c77e]"
                  : "bg-gradient-to-l from-transparent to-[#c6a04a]"
              )}
            />
          </span>
        </span>
      )}
    </Link>
  );
}
