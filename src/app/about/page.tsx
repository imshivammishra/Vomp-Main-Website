import type { Metadata } from "next";
import Image from "next/image";
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
  ["Curated, not listed", "Fewer venues, each vetted for capacity, access, food and guest comfort."],
  ["Trade-offs, stated", "Every shortlist explains what you gain and what you give up — season, distance, cost."],
  ["You decide", "We coordinate visits and quotes. Nothing is booked without your written approval."],
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
    .map((item) => ({ value: typeof item.value === "string" ? item.value : "", label: typeof item.label === "string" ? item.label : "" }))
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
    image:
      aboutBlock?.image?.startsWith("/")
        ? aboutBlock.image
        : "/images/wedding-decor.jpg",
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

  return (
    <div className="bg-white">
      {/* ── Cinematic header ── */}
      <div className="relative overflow-hidden bg-[#1d1d1f]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1f]/80 via-[#1d1d1f]/60 to-[#1d1d1f]" />
          <Image
            src={hero.image}
            alt=""
            fill
            sizes="100vw"
            priority
            className="kenburns object-cover opacity-40"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pt-36 pb-24 md:px-8 md:pt-44 md:pb-32">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} light />
          <Reveal className="mt-10">
            <div className="flex items-center gap-3 text-[#a67c1a]">
              <span className="h-px w-8 bg-[#a67c1a] opacity-70" />
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase">{hero.eyebrow}</p>
            </div>
            <h1 className="font-display mt-5 max-w-3xl text-[44px] leading-[1.05] text-white md:text-[64px]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/60">
              {hero.body}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24">
        {/* Badge row */}
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {hero.stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="rounded-2xl border border-[#e8e8ed] bg-[#fdf9f4] px-5 py-3"
              >
                <p className="font-display text-xl text-[#1d1d1f]">{stat.value}</p>
                <p className="mt-0.5 text-[12px] text-[#86868b]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Film / visual */}
        <div className="mt-14">
          <Reveal scale>
            <VideoCard src={film.src} caption={film.caption} />
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-20">
          <Reveal>
            <div className="section-ornament">
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">What we stand for</span>
            </div>
            <h2 className="font-display text-[36px] leading-tight text-[#1d1d1f] md:text-[48px]">
              Principles before properties.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#424245]">
              Every recommendation is measured against the same three promises.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map(([title, copy], index) => (
              <Reveal key={`${title}-${index}`} delay={(index % 3) * 90}>
                <div className="card-hover s-card h-full p-8">
                  <div className="mb-4 h-px w-10 bg-[#a67c1a]" />
                  <h3 className="font-display text-[22px] text-[#1d1d1f]">{title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#424245]">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <CTASection title="Meet us over your requirements." copy="Two minutes of details — one business day to a shortlist." />
      </div>
    </div>
  );
}
