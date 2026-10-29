"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Film = {
  src: string;
  title: string;
  caption: string;
};

const FILMS: Film[] = [
  {
    src: "/videos/film-first-look.mp4",
    title: "The First Look",
    caption: "Palace courtyards & golden-hour vows",
  },
  {
    src: "/videos/film-floral.mp4",
    title: "Floral Artistry",
    caption: "Hand-crafted mandaps & table stories",
  },
  {
    src: "/videos/film-haldi.mp4",
    title: "Haldi Mornings",
    caption: "Marigold light & joyful rituals",
  },
];

function FilmTile({ film, index }: { film: Film; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="film-card group aspect-[4/5]"
      style={{ animation: `lux-rise 1s cubic-bezier(0.19,1,0.22,1) ${index * 0.12}s both` }}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster="/images/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label={`${film.title} — ${film.caption}`}
      >
        <source src={film.src} type="video/mp4" />
      </video>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 z-[2] p-5 md:p-6">
        <span className="block h-px w-8 origin-left scale-x-0 bg-[#d4a437] transition-transform duration-500 group-hover:scale-x-100" />
        <h3 className="font-display mt-3 text-[22px] leading-tight text-white md:text-[26px]">
          {film.title}
        </h3>
        <p className="mt-1 text-[12px] tracking-wide text-white/60">{film.caption}</p>
      </div>
    </div>
  );
}

export default function FilmReel() {
  return (
    <section
      aria-label="Celebrations in motion"
      className="relative mt-14 overflow-hidden bg-[#140308] md:mt-28"
      style={{ paddingTop: "clamp(56px, 8vw, 128px)", paddingBottom: "clamp(56px, 8vw, 128px)" }}
    >
      <div aria-hidden className="lux-glow-wine -left-32 top-10 h-[420px] w-[420px]" />
      <div aria-hidden className="lux-glow-gold -right-24 bottom-0 h-[360px] w-[360px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="mb-10 grid items-end gap-5 md:mb-16 md:grid-cols-[1fr_auto] md:gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3 md:mb-5">
              <span className="h-px w-8 bg-[#d4a437]/60" />
              <p className="text-[10px] font-semibold tracking-[0.4em] text-[#d4a437]/80 uppercase">
                Venue Films
              </p>
            </div>
            <h2 className="font-display text-[34px] leading-[1.0] text-white sm:text-[40px] md:text-[64px]">
              Celebrations in motion
              <span className="text-[#d4a437]">.</span>
            </h2>
          </div>
          <p className="max-w-[300px] text-[14px] leading-[1.9] text-white/55 md:text-right">
            Real films from real celebrations — the mornings, details and first looks our venues
            were made for.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film, i) => (
            <FilmTile key={film.title} film={film} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/venues" className="btn-champagne btn-sheen px-8 py-3.5 text-[13px]">
            Explore the collection
          </Link>
        </div>
      </div>
    </section>
  );
}
