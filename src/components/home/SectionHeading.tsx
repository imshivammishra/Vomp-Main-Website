"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Reveal from "../ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
        <p className={cn("text-[15px] font-semibold", dark ? "text-white/80" : "text-[#a67c1a]")}>
          {eyebrow}
        </p>
        <h2
          className={cn(
            "lux-text-in font-display mt-2 text-[34px] leading-[1.06] font-semibold text-balance md:text-[46px]",
            dark ? "text-white" : "text-[#1d1d1f]"
          )}
        >
          {title}
        </h2>
        {copy && (
          <p
            className={cn(
              "mt-4 text-[17px] leading-relaxed",
              dark ? "text-white/70" : "text-[#424245]"
            )}
          >
            {copy}
          </p>
        )}
        {align === "center" && !dark && (
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-[2px] w-12 rounded-full"
            style={{ backgroundImage: "linear-gradient(90deg, #7f0f2e, #d4a437)" }}
          />
        )}
      </div>
    </Reveal>
  );
}

export function SectionLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="text-[15px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black"
    >
      {children} &rsaquo;
    </Link>
  );
}
