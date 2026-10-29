"use client";

import { useEffect, useRef } from "react";


export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      aria-label="Venue highlights reel"
      className="relative overflow-hidden bg-[#080305]"
      style={{ paddingTop: "clamp(56px, 6vw, 96px)", paddingBottom: "clamp(56px, 6vw, 96px)" }}
    >
      {/* Very faint dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #d4a437 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="relative mx-auto max-w-[1260px] px-5 md:px-8">

        {/* Header — magazine-style two columns */}
        <div className="mb-10 grid items-end gap-6 md:mb-12 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-5 bg-[#d4a437]/50" />
              <p className="text-[8px] font-semibold tracking-[0.5em] text-[#d4a437]/60 uppercase">Venue reel</p>
            </div>
            <h2 className="font-display text-[40px] leading-[0.95] text-white md:text-[58px] lg:text-[68px]">
              Celebrations<br />in motion<span className="text-[#d4a437]">.</span>
            </h2>
          </div>
          <p className="max-w-[260px] text-[13px] leading-[1.8] text-white/30 md:text-right">
            Haldi mornings, floral details and first looks — the moments venues are made for.
          </p>
        </div>

        {/* Video — gold ring container */}
        <div
          className="relative overflow-hidden rounded-2xl md:rounded-[22px]"
          style={{ padding: "1.5px", background: "linear-gradient(135deg, rgba(212,164,55,0.5) 0%, rgba(212,164,55,0.06) 45%, rgba(212,164,55,0.35) 100%)", boxShadow: "0 40px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,164,55,0.05)" }}
        >
          <div className="relative overflow-hidden rounded-2xl md:rounded-[21px] bg-[#0c0507]">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/videos/hero-bg.mp4"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="auto"
                aria-label="Venue highlights reel"
                style={{ filter: "brightness(0.88) saturate(1.06)" }}
              />
              {/* Vignette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(8,3,5,0.5) 100%)" }}
              />
              {/* Bottom watermark */}
              <div className="absolute bottom-4 right-5">
                <p className="text-[8px] font-semibold tracking-[0.22em] text-white/15 uppercase">Venue On My Plate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Caption row */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {["Weddings", "Receptions", "Celebrations"].map((c, i) => (
            <div key={c} className="flex items-center gap-6">
              {i > 0 && <div aria-hidden className="h-[4px] w-[4px] rotate-45 bg-[#d4a437]/25" />}
              <p className="text-[9px] tracking-[0.3em] text-white/18 uppercase">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}