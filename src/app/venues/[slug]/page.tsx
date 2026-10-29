import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MapPin, Users, Layers, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FAQ from "@/components/forms/FAQ";
import FloatingEnquire from "@/components/venues/FloatingEnquire";
import Reveal from "@/components/ui/Reveal";
import VenueGrid from "@/components/venues/VenueGrid";
import { getVenueBySlug, getVenues } from "@/lib/api";
import { absoluteUrl } from "@/lib/utils";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatGuests } from "@/lib/utils";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Venue not found" };
  return buildMetadata({
    title: `${venue.name} — ${venue.city} wedding & event venue`,
    description: `${venue.name} in ${venue.area}, ${venue.city}. ${venue.shortDescription} Capacity ${venue.capacityMin}–${venue.capacityMax} guests. Request a proposal.`,
    path: `/venues/${venue.slug}`,
    image: venue.image.startsWith("http") ? venue.image : absoluteUrl("/images/og-cover.jpg"),
  });
}

export default async function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  const all = await getVenues();
  const similar = all
    .filter((v) => v.slug !== venue.slug && v.citySlug === venue.citySlug)
    .slice(0, 3);
  const fallbackSimilar =
    similar.length > 0 ? similar : all.filter((v) => v.slug !== venue.slug).slice(0, 3);

  const COUNTRY_FLAGS: Record<string, string> = {
    IN: "🇮🇳",
    IT: "🇮🇹",
    FR: "🇫🇷",
    AE: "🇦🇪",
    TH: "🇹🇭",
    US: "🇺🇸",
    GB: "🇬🇧",
  };
  const flag = COUNTRY_FLAGS[(venue.countryCode ?? "IN").toUpperCase()];

  const faqs = [
    {
      question: `What is the capacity of ${venue.name}?`,
      answer: `${venue.name} comfortably hosts ${venue.capacityMin} to ${venue.capacityMax} guests, depending on layout and season. Share your guest count and we will confirm the right configuration.`,
    },
    {
      question: "How do I check availability and pricing?",
      answer:
        "Send an enquiry with your date and guest count. The venue team responds with availability, a detailed quote and what the advance locks — dates, spaces and rooms.",
    },
    {
      question: "Can I visit before deciding?",
      answer:
        "Yes — we coordinate site visits on working days and weekends. Visits are most useful when you carry your function flow (haldi, sangeet, pheras) and a rough guest count.",
    },
  ];

  return (
    <>
      <div className="bg-white">
        {/* ── Full-bleed hero ── */}
        <div
          className="relative overflow-hidden bg-[#120709]"
          style={{ aspectRatio: "21/9", maxHeight: "78vh", minHeight: "420px" }}
        >
          <Image
            src={venue.image}
            alt={venue.imageAlt}
            fill
            priority
            sizes="100vw"
            quality={88}
            className="kenburns object-cover opacity-75"
          />
          <div
            aria-hidden={true}
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35"
          />
          <div
            aria-hidden={true}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 50%, rgba(10,4,7,0.45) 100%)",
            }}
          />

          {/* Back nav */}
          <div className="absolute left-5 top-5 md:left-8 md:top-7">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-[12px] font-medium text-white/75 backdrop-blur-md ring-1 ring-white/10 transition hover:text-white"
            >
              <ArrowLeft size={13} />
              All venues
            </Link>
          </div>

          {/* Venue name + meta overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-7 md:px-8 md:pb-10">
            <div className="mx-auto max-w-7xl flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                {/* Badges row */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur-sm ring-1 ring-white/10">
                    {venue.type}
                  </span>
                  <span className="rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur-sm ring-1 ring-white/10">
                    {flag && <span className="mr-1">{flag}</span>}
                    {venue.city}
                  </span>
                  {venue.priceHint && (
                    <span className="rounded-full bg-[#7f0f2e]/85 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {venue.priceHint}
                    </span>
                  )}
                </div>

                <h1
                  className="font-display text-[34px] leading-tight text-white md:text-[56px]"
                  style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
                >
                  {venue.name}
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-white/55">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {venue.area}, {venue.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={12} />
                    {formatGuests(venue.capacityMin, venue.capacityMax)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers size={12} />
                    {venue.setting}
                  </span>
                </p>
              </div>
              <div className="mt-4 shrink-0 md:mt-0">
                <a
                  href="#enquire"
                  className="s-btn-dark btn-sheen inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                >
                  Request a proposal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb bar */}
        <div className="border-b border-[#e8e8ed] bg-[#fafaf8]">
          <div className="mx-auto max-w-7xl px-5 py-3 md:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Venues", href: "/venues" },
                { name: venue.name },
              ]}
            />
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-14 md:grid-cols-[1.5fr_1fr]">
            {/* Content column */}
            <div className="space-y-10">
              {/* Overview */}
              <Reveal>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-6 bg-[#a67c1a]" />
                    <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a67c1a] uppercase">
                      Overview
                    </p>
                  </div>
                  <p className="text-[16px] leading-[1.85] text-[#3f3f3f]">
                    {venue.shortDescription} The estate works across {venue.setting.toLowerCase()}{" "}
                    settings and is particularly suited for{" "}
                    {venue.eventTypes.join(", ").toLowerCase()}.
                  </p>
                </div>
              </Reveal>

              {/* Quick specs */}
              <Reveal delay={60}>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-[#e8e8ed] ring-1 ring-[#e8e8ed]">
                  {[
                    {
                      label: "Capacity",
                      value: formatGuests(venue.capacityMin, venue.capacityMax),
                    },
                    { label: "Setting", value: venue.setting },
                    { label: "Guide price", value: venue.priceHint ?? "On request" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white px-5 py-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#86868b]">
                        {label}
                      </p>
                      <p className="mt-1.5 text-[16px] font-bold text-[#1d1d1f]">{value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Suited for */}
              <Reveal delay={60}>
                <h2 className="font-display mb-4 text-[28px] text-[#1d1d1f]">Suited for</h2>
                <ul className="flex flex-wrap gap-2">
                  {venue.eventTypes.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-[#e8e8ed] bg-[#fafaf8] px-4 py-2 text-[13px] text-[#424245] transition hover:border-[#7f0f2e]/30 hover:text-[#7f0f2e]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Amenities */}
              <Reveal delay={60}>
                <h2 className="font-display mb-4 text-[28px] text-[#1d1d1f]">Amenities</h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {venue.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-[14px] text-[#424245]">
                      <span
                        aria-hidden={true}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]"
                      >
                        <span className="text-[9px] font-bold text-[#16a34a]">✓</span>
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Food & catering */}
              <Reveal delay={60}>
                <h2 className="font-display mb-4 text-[28px] text-[#1d1d1f]">
                  Food &amp; catering
                </h2>
                <p className="text-[15px] leading-relaxed text-[#525252]">
                  Catering is handled in-house or through the venue&apos;s preferred partners, with
                  tastings arranged before you confirm. Dietary formats — Jain, sattvik, continental
                  — are planned per function. Confirm kitchen placement and service staff ratios in
                  your written quote.
                </p>
              </Reveal>

              {/* FAQ */}
              <Reveal delay={60}>
                <h2 className="font-display mb-5 text-[28px] text-[#1d1d1f]">
                  Questions, answered
                </h2>
                <FAQ faqs={faqs} />
              </Reveal>
            </div>

            {/* Sticky enquiry form */}
            <Reveal delay={120} className="md:sticky md:top-28 md:self-start">
              <aside aria-label="Enquiry form">
                <div
                  id="enquire"
                  className="scroll-mt-32 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/[0.08] ring-1 ring-black/[0.07]"
                >
                  <div
                    aria-hidden={true}
                    className="h-1.5 bg-gradient-to-r from-[#5c0a20] via-[#7f0f2e] to-[#a67c1a]"
                  />
                  <div className="p-6 md:p-8">
                    <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a67c1a] uppercase mb-1">
                      Enquire now
                    </p>
                    <p className="font-display text-[24px] leading-snug text-[#1d1d1f]">
                      Check availability for
                      <br />
                      {venue.name}
                    </p>
                    <p className="mt-2 text-[13px] text-[#86868b]">
                      Free · No commitment · Replies within 1 business day
                    </p>
                    <div className="mt-6">
                      <Suspense
                        fallback={<p className="text-[13px] text-[#6e6e73]">Loading form…</p>}
                      >
                        <EnquiryForm venueName={venue.name} />
                      </Suspense>
                    </div>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-4 rounded-xl border border-[#e8e8ed] bg-[#fafaf8] px-5 py-4">
                  <ul className="space-y-2.5">
                    {[
                      "Every venue personally visited or vetted",
                      "Private pricing — no public rate cards",
                      "Human-assisted shortlisting & site visits",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-[13px] text-[#525252]">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                          <span className="text-[8px] font-bold text-[#16a34a]">✓</span>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </Reveal>
          </div>

          {/* Similar venues */}
          {fallbackSimilar.length > 0 && (
            <Reveal delay={80}>
              <section aria-labelledby="similar-heading" className="mt-20 md:mt-24">
                <div aria-hidden={true} className="mb-10 border-t border-[#e8e8ed]" />
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-6 bg-[#a67c1a]" />
                      <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a67c1a] uppercase">
                        You might also like
                      </p>
                    </div>
                    <h2
                      id="similar-heading"
                      className="font-display text-[32px] text-[#1d1d1f] md:text-[40px]"
                    >
                      Similar venues
                    </h2>
                  </div>
                  <Link
                    href="/venues"
                    className="hidden text-[13px] text-[#1d1d1f] underline decoration-black/25 underline-offset-4 hover:decoration-black sm:block"
                  >
                    All venues &rsaquo;
                  </Link>
                </div>
                <VenueGrid venues={fallbackSimilar} />
              </section>
            </Reveal>
          )}
        </div>
      </div>

      <CTASection
        title={`Planning at ${venue.name}?`}
        copy="Send one enquiry — we will confirm availability, gather quotes and line up your visit."
        primaryHref="#enquire"
        primaryLabel="Enquire now"
      />
      <div aria-hidden={true} className="h-16 md:hidden" />
      <FloatingEnquire venueName={venue.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Venues", path: "/venues" },
              { name: venue.name, path: `/venues/${venue.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Place",
              name: venue.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: venue.city,
                addressRegion: "IN",
              },
              image: venue.image,
              description: venue.shortDescription,
            },
          ]),
        }}
      />
    </>
  );
}
