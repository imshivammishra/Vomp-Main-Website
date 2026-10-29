import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/forms/FAQ";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import VenueGrid from "@/components/venues/VenueGrid";
import { getCity, getVenues } from "@/lib/api";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const { cities } = await import("@/lib/data").then((m) => ({ cities: m.cities }));
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = await getCity(city);
  if (!data) return { title: "City not found" };
  return buildMetadata({
    title: `Venues in ${data.name} — curated wedding & event venues`,
    description: `${data.tagline} Explore ${data.venueCountLabel} for weddings and celebrations in ${data.name}, with planning notes and FAQs.`,
    path: `/cities/${data.slug}`,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = await getCity(city);
  if (!data) notFound();
  const all = await getVenues();
  const featured = all.filter((v) => v.citySlug === data.slug);
  const heroImage =
    data.image?.startsWith("/") || featured.length === 0
      ? data.image
      : featured.find((venue) => venue.image?.startsWith("https://"))?.image || data.image;

  const faqs = [
    {
      question: `When is the best season for events in ${data.name}?`,
      answer:
        data.slug === "goa"
          ? "October to March offers the most reliable weather. Monsoon weddings are possible in covered venues but need a full wet-weather plan."
          : "October to March is peak season across North and West India. May–June and monsoon dates can mean better availability — always confirm power backup and covered spaces.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "For peak-season weekends, 6–9 months ahead is safest for sought-after venues. Off-season or weekday dates can often be arranged in 2–3 months.",
    },
    {
      question: "Can you arrange visits and quotes?",
      answer:
        "Yes — share your date and guest count and we will line up visits and written quotes, including rooms, catering formats and cut-off timings.",
    },
  ];

  return (
    <>
      <div className="relative flex min-h-[70vh] items-end overflow-hidden bg-black">
        <Image
          src={heroImage}
          alt={data.imageAlt}
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-12 text-center md:px-8">
          <Reveal>
            <div className="[&_ol]:justify-center [&_ol]:text-white/70">
              <Breadcrumbs
                items={[
                  { name: "Home", href: "/" },
                  { name: "Cities", href: "/venues" },
                  { name: data.name },
                ]}
              />
            </div>
            <p className="mt-4 text-[15px] font-semibold text-white/70">
              Destination guide · {data.venueCountLabel}
            </p>
            <h1 className="font-display mx-auto mt-4 max-w-3xl text-5xl text-white md:text-6xl">
              Venues in {data.name}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/70">{data.tagline}</p>
          </Reveal>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Destination guide"
                  title={`Planning in ${data.name}`}
                />
                <p className="mt-5 leading-relaxed text-[#424245]">{data.description}</p>
                <h2 className="mt-8 text-[15px] font-semibold text-[#6e6e73]">
                  Popular venue types
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {data.popularTypes.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#424245] transition-colors hover:border-black/20 hover:text-[#1d1d1f]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={150} scale>
              <aside className="s-card overflow-hidden p-6 md:p-8">
                <div aria-hidden="true" className="h-1 rounded-t-[18px] bg-black" />
                <p className="text-[15px] font-semibold text-[#6e6e73]">At a glance</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6e6e73]">Curated venues</dt>
                    <dd className="font-semibold text-[#1d1d1f]">{data.venueCountLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6e6e73]">Best season</dt>
                    <dd className="font-medium text-[#1d1d1f]">Oct – Mar</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6e6e73]">Suits</dt>
                    <dd className="text-right font-medium text-[#1d1d1f]">
                      Weddings & celebrations
                    </dd>
                  </div>
                </dl>
                <div aria-hidden="true" className="my-5 border-t border-black/10" />
                <Link
                  href="/contact"
                  className="s-btn-dark btn-sheen mt-6 block px-6 py-3.5 text-center"
                >
                  Get {data.name} shortlist
                </Link>
              </aside>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <section aria-labelledby="city-venues" className="mt-14">
              <div aria-hidden="true" className="mb-10 border-t border-black/10" />
              <h2
                id="city-venues"
                className="font-display text-center text-3xl text-[#1d1d1f] md:text-4xl"
              >
                Featured venues in {data.name}
              </h2>
              <div className="mt-8">
                <VenueGrid venues={featured.length > 0 ? featured : []} />
              </div>
              {featured.length === 0 && (
                <p className="mx-auto mt-4 max-w-xl text-center text-sm text-[#424245]">
                  New {data.name} venues are being onboarded.{" "}
                  <Link href="/contact" className="s-link">
                    Ask us directly ›
                  </Link>{" "}
                  — we often have options before they appear online.
                </p>
              )}
            </section>
          </Reveal>

          <Reveal delay={100}>
            <section aria-labelledby="city-faq" className="mx-auto mt-14 max-w-3xl">
              <h2 id="city-faq" className="font-display text-center text-3xl text-[#1d1d1f]">
                {data.name} FAQs
              </h2>
              <div aria-hidden="true" className="mt-6 border-t border-black/10" />
              <div className="mt-6">
                <FAQ faqs={faqs} />
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <CTASection
        title={`Planning in ${data.name}?`}
        copy="Tell us your dates once — we will respond with venues that fit capacity, season and logistics."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: data.name, path: `/cities/${data.slug}` },
            ]),
            faqJsonLd(faqs),
          ]),
        }}
      />
    </>
  );
}
