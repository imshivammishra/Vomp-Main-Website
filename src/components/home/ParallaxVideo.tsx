"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PlayCircle } from "lucide-react";

export default function ParallaxVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) video.play().catch(() => {});

    let frame = 0;
    const range = 120; // px of parallax travel

    const update = () => {
      frame = 0;
      if (reduce) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: 0 when the section bottom enters, 1 when its top leaves
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const offset = (clamped - 0.5) * range;
      video.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    // Pause playback when fully out of view to save resources
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0 }
    );
    io.observe(section);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      io.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Celebrations, beautifully staged"
      className="parallax-stage mt-20 flex min-h-[72vh] items-center md:mt-28"
    >
      <video
        ref={videoRef}
        className="parallax-media"
        poster="/images/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div aria-hidden className="parallax-scrim" />

      <div className="relative z-[2] mx-auto w-full max-w-[1180px] px-5 py-24 text-center md:px-10 md:py-32">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#d4a437]/60" />
          <p className="text-[10px] font-semibold tracking-[0.4em] text-[#f6de9a] uppercase">
            The Experience
          </p>
          <span className="h-px w-8 bg-[#d4a437]/60" />
        </div>
        <h2 className="font-display mx-auto max-w-[840px] text-[38px] leading-[1.04] text-white md:text-[66px]">
          Celebrations, beautifully staged
          <span className="text-[#d4a437]">.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-white/70 md:text-[17px]">
          From the first baraat to the final toast — we match the mood of your moment to a setting
          that makes it unforgettable.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/venues" className="btn-champagne btn-sheen px-8 py-3.5 text-[13px]">
            Browse the collection
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-none border border-white/25 bg-white/5 px-7 py-3.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a437]/60 hover:bg-white/10"
          >
            <PlayCircle size={17} strokeWidth={1.7} />
            Request a shortlist
          </Link>
        </div>
      </div>
    </section>
  );
}
