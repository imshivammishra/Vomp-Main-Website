"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

/**
 * A single, honest welcome notice per browser session.
 * No invented bookings, couples or live-activity claims are shown.
 */
export default function WelcomeNotice() {
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    let hide: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!sessionStorage.getItem("vomp-welcomed")) {
        const show = setTimeout(() => {
          setWelcome(true);
          sessionStorage.setItem("vomp-welcomed", "1");
          hide = setTimeout(() => setWelcome(false), 9000);
        }, 2500);
        return () => {
          clearTimeout(show);
          if (hide) clearTimeout(hide);
        };
      }
    } catch {
      /* Private mode — skip the welcome notice. */
    }
  }, []);

  if (!welcome) return null;

  return (
    <div
      role="status"
      className="chat-pop fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-[#1d1d1f]/95 px-5 py-4 text-center text-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      <button
        type="button"
        onClick={() => setWelcome(false)}
        aria-label="Dismiss welcome"
        className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#f3e5c3] uppercase">
        <Sparkles size={13} /> Welcome to Venue On My Plate
      </p>
      <p className="font-display mt-1.5 text-[20px] font-semibold text-white">
        India&apos;s private venue experts.
      </p>
      <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-white/70">
        Palaces, resorts and garden venues — shortlisted for your date, guests and budget within one
        business day.
      </p>
      <Link
        href="/venues"
        onClick={() => setWelcome(false)}
        className="s-btn-dark btn-sheen mt-3 inline-block rounded-full px-6 py-2 text-[13px]"
      >
        Explore venues
      </Link>
    </div>
  );
}
