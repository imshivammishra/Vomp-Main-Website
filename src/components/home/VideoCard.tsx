"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function VideoCard({
  src,
  poster = "/images/hero-poster.jpg",
  startAt = 0,
  caption,
}: {
  src: string;
  poster?: string;
  startAt?: number;
  caption: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const isVideo = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);

  useEffect(() => {
    const v = ref.current;
    if (!v || !isVideo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [isVideo]);

  return (
    <figure className="group overflow-hidden rounded-[22px] bg-white shadow-[0_18px_46px_-24px_rgba(92,10,32,0.35)] ring-1 ring-[#eed9a3] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-24px_rgba(92,10,32,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f0e6]">
        {!isVideo || failed ? (
          <Image
            src={isVideo ? poster : src}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <video
            ref={ref}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-label={caption}
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              if (!startAt || !Number.isFinite(video.duration) || video.duration <= 0) return;
              video.currentTime = startAt % video.duration;
            }}
            onPlaying={() => setPlaying(true)}
            onError={() => setFailed(true)}
          />
        )}
        {isVideo && !failed && !playing && (
          <Image
            src={poster}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#2b1218]/20 to-transparent"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="text-[15px] font-semibold text-[#2b1218]">{caption}</span>
        <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#d4a437]" />
      </figcaption>
    </figure>
  );
}
