"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../forms/SearchBar";
import { cn } from "@/lib/utils";

const HERO_VIDEO = "/videos/hero-bg.mp4";

export interface HeroSlide {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "Venue On My Plate",
    title: "A venue as unforgettable as your love story.",
    copy: "Palaces, lakefront estates and private resorts — curated for families who expect every detail to feel considered.",
    image: "/images/indian-ceremony.jpg",
    alt: "Indian wedding ceremony with warm floral details",
    primary: { label: "Explore venues", href: "/venues" },
    secondary: { label: "Get a private quote", href: "/contact" },
  },
  {
    eyebrow: "Udaipur · Jaipur · Goa",
    title: "Destination weddings without the drama.",
    copy: "From City Palace sunsets to barefoot luxury in Goa — compare ambience, privacy, rooms and service fit before you visit.",
    image: "/images/udaipur-city.jpg",
    alt: "Lake Palace in Udaipur",
    primary: { label: "View destinations", href: "/cities" },
    secondary: { label: "Get a private quote", href: "/contact" },
  },
  {
    eyebrow: "Shortlist in a day",
    title: "Your dream shortlist, in one day flat.",
    copy: "Share your city, date, guest count and mood. Receive a bespoke shortlist with private quote-led options in one business day.",
    image: "/images/wedding-decor.jpg",
    alt: "Wedding decor with florals and warm lighting",
    primary: { label: "How it works", href: "#how-it-works" },
    secondary: { label: "Talk to an expert", href: "/contact" },
  },
];

export default function Hero({
  slides = [],
  video,
  poster,
  posterAlt,
}: {
  slides?: HeroSlide[];
  video?: string;
  poster?: string;
  posterAlt?: string;
}) {
  const activeSlides = slides.length > 0 ? slides : SLIDES;
  const slideCount = activeSlides.length;
  const activeVideo =
    video && video.startsWith("/") && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(video)
      ? video
      : HERO_VIDEO;
  const activePoster =
    poster && poster.startsWith("/") ? poster : activeSlides[0]?.image || "/images/hero-poster.jpg";
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + slideCount) % slideCount);
    },
    [slideCount]
  );

  useEffect(() => {
    setIndex(0);
    const t = setInterval(() => setIndex((i) => (i + 1) % slideCount), 7000);
    return () => clearInterval(t);
  }, [slideCount]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  const slide = activeSlides[index % slideCount];

  return (
    <section aria-label="Featured venues" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 38% at 12% 8%, rgba(193,154,63,0.1), transparent 70%), radial-gradient(42% 36% at 88% 12%, rgba(240,200,120,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1024px] px-5 pt-14 pb-10 text-center md:pt-20">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-[#a67c1a] uppercase">
          {slide.eyebrow}
        </p>
        <h1
          key={slide.title}
          className="font-display mx-auto mt-2 max-w-3xl text-[44px] leading-[1.02] font-semibold text-balance text-[#1d1d1f] md:text-[72px]"
        >
          {slide.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-[#424245] md:text-[19px]">
          {slide.copy}
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={slide.secondary.href} className="s-btn-dark px-6 py-2.5 text-[15px]">
            {slide.secondary.label}
          </Link>
          <Link
            href={slide.primary.href}
            className="px-2 py-2 text-[15px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black"
          >
            {slide.primary.label} &rsaquo;
          </Link>
        </div>

        {/* Carousel dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {activeSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-7 bg-[#1d1d1f]" : "w-2 bg-black/20 hover:bg-black/40"
              )}
            />
          ))}
        </div>
      </div>

      {/* Video feature card */}
      <div className="relative mx-auto max-w-[1200px] px-4 pb-4 md:px-6">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-[#2b1218] shadow-[0_40px_90px_-32px_rgba(166,124,26,0.5)] ring-1 ring-[#eed9a3] md:aspect-[21/9]">
          <Image
            src={activePoster.startsWith("/") ? activePoster : "/images/hero-poster.jpg"}
            alt={posterAlt || "Wedding venue highlights"}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            src={activeVideo}
            poster={activePoster.startsWith("/") ? activePoster : "/images/hero-poster.jpg"}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            aria-label={posterAlt || "Wedding venue highlights video"}
            onPlaying={() => setPlaying(true)}
          />
          <div className="absolute bottom-4 left-4 z-10 flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[#1d1d1f] backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[#1d1d1f] backdrop-blur transition hover:bg-white"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mx-auto -mt-0 mt-6 max-w-3xl pb-10">
          <SearchBar />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px]">
            {[
              { label: "Udaipur", href: "/venues?city=Udaipur" },
              { label: "Jaipur", href: "/venues?city=Jaipur" },
              { label: "Jodhpur", href: "/venues?city=Jodhpur" },
              { label: "Jaisalmer", href: "/venues?city=Jaisalmer" },
              { label: "Goa", href: "/venues?city=Goa" },
            ].map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
