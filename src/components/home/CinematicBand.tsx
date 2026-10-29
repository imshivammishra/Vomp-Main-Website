"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CinematicBand({
  src,
  poster = "/images/hero-poster.jpg",
  eyebrow,
  title,
  linkLabel,
  linkHref,
}: {
  src: string;
  poster?: string;
  eyebrow: string;
  title: string;
  linkLabel: string;
  linkHref: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isVideo = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label={title} className="relative overflow-hidden bg-[#2b1218] text-white">
      <Image
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      {isVideo && (
        <video
          ref={ref}
          aria-hidden="true"
          tabIndex={-1}
          className={`relative h-[62vh] min-h-[420px] w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          onPlaying={() => setPlaying(true)}
        />
      )}
      {!isVideo && <div aria-hidden="true" className="relative h-[62vh] min-h-[420px] w-full" />}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#2b1218]/65 via-[#2b1218]/20 to-[#2b1218]/80"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <p className="text-[11px] font-bold tracking-[0.32em] text-[#f3e5c3] uppercase md:text-[13px]">
          {eyebrow}
        </p>
        <p className="font-display mt-3 max-w-3xl text-[34px] leading-[1.05] font-semibold text-balance text-white md:text-[52px]">
          {title}
        </p>
        <Link
          href={linkHref}
          className="mt-6 rounded-full border border-[#d4a437]/60 bg-[#fdf3d7] px-7 py-2.5 text-[14px] font-semibold text-[#5c0a20] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)] transition hover:bg-white"
        >
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
