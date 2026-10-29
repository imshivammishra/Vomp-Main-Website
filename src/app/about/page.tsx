import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Gem, Compass } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/home/VideoCard";
import { getContentBlocks } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "About — curated venues, honest guidance",
  description:
    "Venue On My Plate is a curated venue discovery platform for weddings and celebrations across India. Learn how we shortlist venues and help you decide.",
  path: "/about",
});

const FALLBACK_VALUES: Array<[string, string]> = [
  [
    "Curated, not listed",
    "Fewer venues, each vetted for capacity, access, food and guest comfort.",
  ],
  [
    "Trade-offs, stated",
    "Every shortlist explains what you gain and what you give up — season, distance, cost.",
  ],
  [
    "You decide",
    "We coordinate visits and quotes. Nothing is booked without your written approval.",
  ],
];

const FALLBACK_STATS: Array<{ value: string; label: string }> = [
  { value: "Venue-only", label: "No decor or catering commissions" },
  { value: "Human", label: "Assisted follow-up" },
  { value: "Private", label: "Quote-led proposals" },
];

function metaString(meta: Record<string, unknown> | undefined, key: string, fallback: string) {
  const value = meta?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function metaStats(meta: Record<string, unknown> | undefined, fallback: typeof FALLBACK_STATS) {
  if (!Array.isArray(meta?.stats)) return fallback;
  const rows = meta.stats
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      value: typeof item.value === "string" ? item.value : "",
      label: typeof item.label === "string" ? item.label : "",
    }))
    .filter((item) => item.value || item.label);
  return rows.length > 0 ? rows : fallback;
}

function filmPlacement(block: ContentBlock) {
  return typeof block.meta?.placement === "string" ? block.meta.placement : "grid";
}

export default async function AboutPage() {
  const content = await getContentBlocks();
  const aboutBlock = content.find((block) => block.section === "about");
  const featureBlocks = content.filter((block) => block.section === "feature");
  const filmBlocks = content.filter((block) => block.section === "film");
  const band = filmBlocks.find((block) => filmPlacement(block) === "band") || filmBlocks[0];

  const hero = {
    eyebrow: aboutBlock?.subtitle || "Our story",
    title: aboutBlock?.title || "A calmer way to find your venue.",
    body:
      aboutBlock?.body ||
      "Venue On My Plate began with a simple frustration: beautiful venues, scattered information, and quotes that arrive too late. We visit venues, verify capacity and logistics, and present honest trade-offs — so you decide with confidence.",
    image: aboutBlock?.image?.startsWith("/") ? aboutBlock.image : "/images/wedding-decor.jpg",
    alt: aboutBlock?.imageAlt || "Wedding reception decor with florals and warm lighting",
    badge: metaString(aboutBlock?.meta, "badge", "Private, quote-led shortlists"),
    stats: metaStats(aboutBlock?.meta, FALLBACK_STATS),
  };

  const values = featureBlocks.length
    ? featureBlocks.map((block) => [block.title, block.body] as [string, string])
    : FALLBACK_VALUES;

  const film = {
    src:
      band?.image?.startsWith("/") && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(band.image)
        ? band.image
        : "/images/indian-ceremony.jpg",
    caption: band?.title || "Floral details, verified in person",
  };

  const valueIcons = [ShieldCheck, Gem, Compass];
  const steps: Array<[string, string]> = [
    ["Share your brief", "Tell us the city, date, guest count and the mood you want for your celebration."],
    ["We curate & verify", "We shortlist venues and confirm capacity, access, food and logistics — in person."],
    ["Visits & quotes", "We coordinate walkthroughs and gather transparent, quote-led proposals for you."],
    ["You decide", "Nothing is booked without your written approval. The decision is always yours."],
  ];

  return (
    <div className="bg-white">
      {/* ── Cinematic header ── */}
      <div className="relative overflow-hidden bg-[#160309]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image
            src={hero.image}
            alt=""
            fill
            sizes="100vw"
            priority
            className="kenburns object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,3,9,0.78)_0%,rgba(22,3,9,0.5)_38%,rgba(22,3,9,0.72)_72%,rgba(22,3,9,0.96)_100%)]" />
        </div>
        <div aria-hidden className="lux-glow-wine -left-24 top-10 h-[360px] w-[360px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} light />
          <Reveal className="mt-10">
            <span className="lux-chip lux-rise text-[#f6de9a]">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#d4a437]" />
              {hero.eyebrow}
            </span>
            <h1 className="font-display mt-6 max-w-3xl text-[44px] leading-[1.03] text-white md:text-[66px]">
              {hero.title}
            </h1>
            <div
              aria-hidden
              className="mt-7 h-px w-40 bg-gradient-to-r from-[#d4a437] via-[#d4a437]/50 to-transparent"
            />
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/65">{hero.body}</p>
          </Reveal>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="-mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-[#ece0cc] bg-[#ece0cc] shadow-[0_26px_60px_-30px_rgba(92,10,32,0.4)] sm:grid-cols-3">
            {hero.stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className="bg-white px-7 py-7 text-center">
                <p className="font-display text-[26px] leading-none text-[#1a0a0d] md:text-[30px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[12px] tracking-[0.02em] text-[#8c736f]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── Approach / story ── */}
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8 md:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal scale>
            <div className="img-zoom relative aspect-[5/4] overflow-hidden rounded-[22px] border border-[#ece0cc] shadow-[0_26px_60px_-30px_rgba(92,10,32,0.3)]">
              <Image
                src="/images/wedding-decor.jpg"
                alt="Wedding reception styled with florals and warm candlelight"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#d4a437]" />
                <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a67c1a] uppercase">
                  Our approach
                </p>
              </div>
              <h2 className="font-display text-[34px] leading-[1.08] text-[#1a0a0d] md:text-[46px]">
                Fewer venues, chosen with intent
                <span className="text-[#a67c1a]">.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.9] text-[#4a3a3c]">
                Venue On My Plate began with a simple frustration: beautiful venues, scattered
                information, and quotes that arrive too late. So we built a calmer way — we visit
                venues, verify the details that matter, and present honest trade-offs.
              </p>
              <p className="mt-4 text-[16px] leading-[1.9] text-[#4a3a3c]">
                No endless directory. No commissions steering the advice. Just a curated shortlist,
                a dedicated advisor, and the confidence that every option has been seen in person.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8 md:pt-28">
        <Reveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4a437]/50" />
              <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a67c1a] uppercase">
                What we stand for
              </p>
              <span className="h-px w-8 bg-[#d4a437]/50" />
            </div>
            <h2 className="font-display text-[34px] leading-[1.06] text-[#1a0a0d] md:text-[50px]">
              Principles before properties
              <span className="text-[#a67c1a]">.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#6b5b5d]">
              Every recommendation is measured against the same promises.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map(([title, copy], index) => {
            const Icon = valueIcons[index % valueIcons.length];
            return (
              <Reveal key={`${title}-${index}`} delay={(index % 3) * 100}>
                <div className="group h-full rounded-[22px] border border-[#ece0cc] bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4a437]/50 hover:shadow-[0_28px_56px_-28px_rgba(92,10,32,0.28)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e7d4ab] bg-[#fdf6e7] text-[#a67c1a] transition-colors duration-500 group-hover:border-[#d4a437] group-hover:text-[#7f0f2e]">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display mt-6 text-[24px] text-[#1a0a0d]">{title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#5a4c4e]">{copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ── How we work ── */}
      <div className="relative mt-14 overflow-hidden bg-[#fdf9f2] py-14 md:mt-28 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_-10%,rgba(212,164,55,0.1),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#d4a437]/50" />
                <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a67c1a] uppercase">
                  How we work
                </p>
                <span className="h-px w-8 bg-[#d4a437]/50" />
              </div>
              <h2 className="font-display text-[34px] leading-[1.06] text-[#1a0a0d] md:text-[50px]">
                From brief to booking
                <span className="text-[#a67c1a]">.</span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, copy], index) => (
              <Reveal key={title} delay={(index % 4) * 90}>
                <div className="h-full rounded-[22px] border border-[#ece0cc] bg-white p-7">
                  <span className="font-display text-[34px] leading-none text-[#d4a437]">
                    0{index + 1}
                  </span>
                  <h3 className="font-display mt-4 text-[20px] text-[#1a0a0d]">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5a4c4e]">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Film / visual ── */}
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8 md:pt-28">
        <Reveal>
          <div className="mb-10 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4a437]/50" />
              <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a67c1a] uppercase">
                Verified in person
              </p>
              <span className="h-px w-8 bg-[#d4a437]/50" />
            </div>
            <h2 className="font-display text-[30px] leading-[1.08] text-[#1a0a0d] md:text-[42px]">
              The detail behind every recommendation
              <span className="text-[#a67c1a]">.</span>
            </h2>
          </div>
        </Reveal>
        <div className="mx-auto max-w-3xl">
          <Reveal scale>
            <VideoCard src={film.src} caption={film.caption} />
          </Reveal>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <CTASection
          title="Meet us over your requirements."
          copy="Two minutes of details — one business day to a shortlist."
        />
      </div>
    </div>
  );
}
