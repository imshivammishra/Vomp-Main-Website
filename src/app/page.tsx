import type { ContentBlock, Faq } from "@/types";
import {
  getBlogs,
  getCities,
  getContentBlocks,
  getReviews,
  getVenues,
} from "@/lib/api";
import { generalFaqs } from "@/lib/data";
import { faqJsonLd } from "@/lib/seo";
import TickerSection from "@/components/home/sections/TickerSection";
import HeroSection from "@/components/home/sections/HeroSection";
import HighlightsSection from "@/components/home/sections/HighlightsSection";
import AboutSection from "@/components/home/sections/AboutSection";
import CitiesSection from "@/components/home/sections/CitiesSection";
import CategoriesSection from "@/components/home/sections/CategoriesSection";
import FeaturesSection from "@/components/home/sections/FeaturesSection";
import StepsSection from "@/components/home/sections/StepsSection";
import GallerySection from "@/components/home/sections/GallerySection";
import FilmsSection from "@/components/home/sections/FilmsSection";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import BlogSection from "@/components/home/sections/BlogSection";
import EnquirySection from "@/components/home/sections/EnquirySection";
import SEOSection from "@/components/home/sections/SEOSection";
import CTASection from "@/components/home/CTASection";
import { localMedia, localVideo } from "@/lib/home-media";

const TICKER = [
  "Mehendi",
  "Haldi",
  "Sangeet",
  "Saat Pheras",
  "Reception",
  "Baraat",
  "Udaipur",
  "Jaipur",
  "Jodhpur",
  "Goa",
];

const GALLERY = [
  {
    src: "/images/indian-ceremony.jpg",
    alt: "Indian wedding ceremony with warm floral details",
    mood: "Grand celebrations",
  },
  {
    src: "/images/udaipur-palace2.jpg",
    alt: "Udaipur palace architecture reflected in the lake",
    mood: "Palace weddings",
  },
  {
    src: "/images/wedding-decor.jpg",
    alt: "Wedding decor with florals and warm lighting",
    mood: "Floral tablescapes",
  },
  {
    src: "/images/wedding-dance.jpg",
    alt: "Family celebrating together at an Indian wedding",
    mood: "Open-air mandaps",
  },
];

const CATEGORIES: Category[] = [
  { icon: "castle", t: "Palaces & heritage", d: "Royal palaces and heritage properties for weddings and receptions.", href: "/venues?event=Wedding" },
  { icon: "palm", t: "Resorts & lawns", d: "Green resorts, farmhouses and open lawns for haldi, sangeet and pheras.", href: "/venues" },
  { icon: "landmark", t: "Banquets & ballrooms", d: "Premium indoor halls for receptions, anniversaries and large guest lists.", href: "/venues" },
  { icon: "tent", t: "Beach & destination", d: "Goa, Udaipur, Jaipur and beyond — venues worth travelling for.", href: "/cities" },
  { icon: "building", t: "Corporate venues", d: "Conferences, offsites and annual days with rooms, AV and banquets.", href: "/venues?event=Corporate event" },
  { icon: "users", t: "Private party venues", d: "Birthdays, anniversaries and intimate gatherings at verified venues.", href: "/venues?event=Birthday / Anniversary" },
];

const FEATURES: Feature[] = [
  { icon: "badge", t: "Exclusive pricing", d: "Get a private quote-led proposal shaped around date, guest count, rooms, menu preferences, and service level." },
  { icon: "sparkles", t: "Expert insights", d: "Compare venue flow, ceremony zones, guest arrival, privacy, hospitality depth, and visit questions before you go." },
  { icon: "phone", t: "Discreet follow-up", d: "Your enquiry stays request-led. Our team follows up by call to refine fit, options, and next steps." },
];

const STEPS = [
  ["01", "Share your celebration brief", "Tell us your event city, date, guest count, venue mood, room needs, food preferences, and family priorities."],
  ["02", "Receive a bespoke proposal", "Our team shortlists venues that match ambience, logistics, privacy, and hospitality expectations."],
  ["03", "Confirm next steps by call", "Plan visits, compare private quote options, and continue with a human-assisted enquiry."],
];

const FILMS = [
  { src: "/videos/film-haldi.mp4", poster: "/images/indian-ceremony.jpg", startAt: 0, caption: "Haldi mornings" },
  { src: "/videos/film-floral.mp4", poster: "/images/wedding-decor.jpg", startAt: 0, caption: "Floral details" },
  { src: "/videos/film-first-look.mp4", poster: "/images/wedding-dance.jpg", startAt: 0, caption: "First looks" },
  { src: "/videos/hero-bg.mp4", poster: "/images/wedding-dance.jpg", startAt: 21, caption: "Aisle walks" },
];

const HERO_POSTER = "/images/hero-poster.jpg";

const HEADING_FALLBACKS: Record<string, { eyebrow: string; title: string; copy?: string; linkLabel?: string; linkHref?: string }> = {
  highlights: {
    eyebrow: "This season's highlights",
    title: "Every celebration starts with the right venue",
    copy: "Switch by occasion — the same private, quote-led discovery behind every option.",
  },
  about: {
    eyebrow: "About us",
    title: "Luxury venue access shaped around your family",
    copy: "Venue On My Plate brings private venue intelligence, high-touch shortlisting, and discreet proposal support for weddings and landmark celebrations that deserve more than a generic listing page.",
  },
  cities: {
    eyebrow: "Destinations",
    title: "Explore destinations",
    copy: "Udaipur, Jaipur, Goa and beyond — each circuit has its own season, scale and mood.",
    linkLabel: "View all",
    linkHref: "/cities",
  },
  categories: {
    eyebrow: "Venue categories",
    title: "Venues only — picked for your occasion",
    copy: "We provide the venue itself. Choose a category to browse palaces, resorts, banquets and destination venues.",
  },
  why: {
    eyebrow: "Why we are better",
    title: "Why families trust us",
    copy: "Exclusive pricing, private proposal support, and practical venue signals — compare more than photographs.",
  },
  steps: {
    eyebrow: "How it works",
    title: "Your venue in 3 easy steps",
  },
  gallery: {
    eyebrow: "Events gallery",
    title: "Steal-worthy celebration inspiration",
    copy: "Browse by mood, guest experience, and the level of occasion you want to create.",
  },
  films: {
    eyebrow: "Films",
    title: "Celebrations in motion",
    copy: "Haldi mornings, floral details and first looks — the moments venues are made for.",
  },
  testimonials: {
    eyebrow: "Client testimonials",
    title: "Loved by families across India",
    copy: "Families value a calmer way to compare ambience, hospitality, privacy, and the final proposal.",
  },
  journal: {
    eyebrow: "Journal",
    title: "Ideas worth stealing",
    linkLabel: "View all blogs",
    linkHref: "/blogs",
  },
  support: {
    eyebrow: "Support",
    title: "Get venues picked for you",
    copy: "Two minutes now saves two weeks of calling venues. We reply within one business day — by call.",
  },
};

const ABOUT_FALLBACK = {
  eyebrow: "About us",
  title: "Luxury venue access shaped around your family",
  body: "Venue On My Plate brings private venue intelligence, high-touch shortlisting, and discreet proposal support for weddings and landmark celebrations that deserve more than a generic listing page.",
  image: "/images/wedding-decor.jpg",
  alt: "Wedding reception decor with florals and warm lighting",
  linkLabel: "More about us",
  linkHref: "/about",
  phone: "+91 94624 60555",
  badge: "Private, quote-led shortlists",
  stats: [
    { value: "Venue-only", label: "No decor or catering commissions" },
    { value: "Human", label: "Assisted follow-up" },
    { value: "Private", label: "Quote-led proposals" },
  ],
};

const BAND_FALLBACK = {
  src: "/videos/hero-bg.mp4",
  poster: "/images/hero-poster.jpg",
  eyebrow: "Signature stages",
  title: "Drapes, blooms and morning light.",
  linkLabel: "Explore venues",
  linkHref: "/venues",
};

const SEO_FALLBACK = {
  title: "Finding wedding and party venues in India, without the legwork.",
  paragraphs: [
    "Venue On My Plate helps you discover venues for weddings, receptions, birthdays, corporate events and private celebrations across India — from heritage palaces in Udaipur and garden resorts in Jaipur to desert forts in Jaisalmer, palace courtyards in Jodhpur and beach venues in Goa.",
    "We focus only on venues — not decor, catering, or photography. Our team helps you compare venue flow, ceremony zones, guest movement, rooms and private quote options, so haldi mornings, sangeet evenings and the wedding day itself start from the right venue choice.",
    "Start by browsing all venues or pick a destination such as Udaipur, Jaipur or Goa. Want ideas first? The journal covers costs, seasonality and visit checklists.",
  ],
};

const CTA_FALLBACK = {
  title: "Are you a luxury venue partner?",
  copy: "List your venue, showcase your signature spaces, and receive relevant enquiry leads from families planning premium celebrations.",
  primaryHref: "/partner",
  primaryLabel: "Join us",
  secondaryHref: "/venues",
  secondaryLabel: "Explore venues",
};

interface Category {
  icon: string;
  t: string;
  d: string;
  href: string;
}

interface Feature {
  icon: string;
  t: string;
  d: string;
}

function bySection(blocks: ContentBlock[], section: ContentBlock["section"]) {
  return blocks.filter((block) => block.section === section);
}

function metaString(meta: Record<string, unknown> | undefined, key: string, fallback: string) {
  const value = meta?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function metaStats(meta: Record<string, unknown> | undefined, fallback: { value: string; label: string }[]) {
  if (!Array.isArray(meta?.stats)) return fallback;
  const stats = meta.stats
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const value = typeof row.value === "string" ? row.value.trim() : "";
      const label = typeof row.label === "string" ? row.label.trim() : "";
      return value && label ? { value, label } : null;
    })
    .filter((item): item is { value: string; label: string } => Boolean(item));
  return stats.length > 0 ? stats : fallback;
}

function headingFor(blocks: ContentBlock[], key: string) {
  const block = blocks.find((item) => item.section === "heading" && item.blockKey === key);
  if (!block) return HEADING_FALLBACKS[key];
  return {
    eyebrow: block.title || HEADING_FALLBACKS[key]?.eyebrow || "",
    title: block.subtitle || HEADING_FALLBACKS[key]?.title || "",
    copy: block.body || HEADING_FALLBACKS[key]?.copy,
    linkLabel: block.linkLabel || HEADING_FALLBACKS[key]?.linkLabel,
    linkHref: block.linkHref || HEADING_FALLBACKS[key]?.linkHref,
  };
}

export default async function HomePage() {
  const [venues, cities, blogs, content, reviewRows] = await Promise.all([
    getVenues(),
    getCities(),
    getBlogs(),
    getContentBlocks(),
    getReviews(),
  ]);

  // ---- Hero ----
  const heroBlocks = bySection(content, "hero");
  const heroVideoBlock = heroBlocks.find((block) => block.blockKey === "video");
  const heroSlides = heroBlocks
    .filter((block) => block.blockKey !== "video")
    .map((block, index) => ({
      eyebrow: block.subtitle,
      title: block.title,
      copy: block.body,
      image: localMedia(block.image, GALLERY[index % GALLERY.length].src),
      alt: block.imageAlt,
      primary: { label: block.linkLabel || "Explore venues", href: block.linkHref || "/venues" },
      secondary: {
        label: metaString(block.meta, "secondaryLabel", "Get a private quote"),
        href: metaString(block.meta, "secondaryHref", "/contact"),
      },
    }));
  const heroVideo = localVideo(heroVideoBlock?.title);
  const heroPoster = localMedia(heroVideoBlock?.image, HERO_POSTER);
  const heroPosterAlt = heroVideoBlock?.imageAlt;

  // ---- Ticker ----
  const tickerBlocks = bySection(content, "ticker").map((block) => block.title).filter(Boolean);
  const ticker = tickerBlocks.length > 0 ? tickerBlocks : TICKER;

  // ---- About ----
  const aboutBlock = bySection(content, "about")[0];
  const aboutMeta = aboutBlock?.meta;
  const about = aboutBlock
    ? {
        eyebrow: aboutBlock.subtitle || ABOUT_FALLBACK.eyebrow,
        title: aboutBlock.title || ABOUT_FALLBACK.title,
        body: aboutBlock.body || ABOUT_FALLBACK.body,
        image: localMedia(aboutBlock.image, ABOUT_FALLBACK.image),
        alt: aboutBlock.imageAlt || ABOUT_FALLBACK.alt,
        linkLabel: aboutBlock.linkLabel || ABOUT_FALLBACK.linkLabel,
        linkHref: aboutBlock.linkHref || ABOUT_FALLBACK.linkHref,
        phone: metaString(aboutMeta, "phone", ABOUT_FALLBACK.phone),
        badge: metaString(aboutMeta, "badge", ABOUT_FALLBACK.badge),
        stats: metaStats(aboutMeta, ABOUT_FALLBACK.stats),
      }
    : ABOUT_FALLBACK;

  // ---- Categories ----
  const categoryBlocks = bySection(content, "category");
  const categories = categoryBlocks.length
    ? categoryBlocks.map((block) => ({
        icon: block.icon || "castle",
        t: block.title,
        d: block.body,
        href: block.linkHref || "/venues",
      }))
    : CATEGORIES;

  // ---- Features ----
  const featureBlocks = bySection(content, "feature");
  const features = featureBlocks.length
    ? featureBlocks.map((block) => ({
        icon: block.icon || "sparkles",
        t: block.title,
        d: block.body,
      }))
    : FEATURES;

  // ---- Steps ----
  const stepBlocks = bySection(content, "step");
  const steps: string[][] = stepBlocks.length
    ? stepBlocks.map((block) => [block.subtitle || "01", block.title, block.body])
    : STEPS;

  // ---- Gallery ----
  const galleryBlocks = bySection(content, "gallery");
  const galleryItems = galleryBlocks.map((block, index) => ({
    src: localMedia(block.image, GALLERY[index % GALLERY.length].src),
    alt: block.imageAlt || block.title,
    mood: block.title,
  }));
  const gallery = galleryItems.length > 0 ? galleryItems : GALLERY;

  // ---- Films / Cinematic band ----
  const filmBlocks = bySection(content, "film");
  const bandBlock = filmBlocks.find((block) => metaString(block.meta, "placement", "grid") === "band");
  const band = bandBlock
    ? {
        src: localMedia(bandBlock.image, BAND_FALLBACK.src),
        poster: localMedia(bandBlock.meta?.poster as string | undefined, HERO_POSTER),
        eyebrow: bandBlock.subtitle || BAND_FALLBACK.eyebrow,
        title: bandBlock.title || BAND_FALLBACK.title,
        linkLabel: bandBlock.linkLabel || BAND_FALLBACK.linkLabel,
        linkHref: bandBlock.linkHref || BAND_FALLBACK.linkHref,
      }
    : BAND_FALLBACK;
  const filmItems = filmBlocks
    .filter((block) => metaString(block.meta, "placement", "grid") !== "band")
    .map((block, index) => {
      const fallback = FILMS[index % FILMS.length];
      return {
        src: localMedia(block.image, fallback.src),
        poster: localMedia(metaString(block.meta, "poster", fallback.poster), fallback.poster),
        startAt: Number(metaString(block.meta, "startAt", String(fallback.startAt))) || 0,
        caption: block.title,
      };
    })
    .filter((item) => item.src);
  const films = filmItems.length > 0 ? filmItems : FILMS;

  // ---- FAQs ----
  const faqBlocks = bySection(content, "faq");
  const faqs: Faq[] = faqBlocks.length
    ? faqBlocks.map((block) => ({ question: block.title, answer: block.body }))
    : generalFaqs.slice(0, 6);

  // ---- City cards ----
  const cityCards = cities.map((city) => {
    if (city.image?.startsWith("/")) return city;
    const venue = venues.find((item) => item.citySlug === city.slug && item.image?.startsWith("https://"));
    return venue?.image ? { ...city, image: venue.image } : city;
  });

  // ---- Testimonials ----
  const testimonials = reviewRows.map((review) => ({
    id: review.id,
    name: review.name,
    context: review.context,
    quote: review.quote,
    rating: review.rating,
    image: review.image,
  }));

  // ---- SEO ----
  const seoBlock = bySection(content, "seo")[0];
  const seo = seoBlock
    ? {
        title: seoBlock.title || SEO_FALLBACK.title,
        paragraphs: (seoBlock.body || "").split(/\n{2,}/).map((line) => line.trim()).filter(Boolean),
      }
    : SEO_FALLBACK;
  if (seo.paragraphs.length === 0) seo.paragraphs = SEO_FALLBACK.paragraphs;

  // ---- CTA ----
  const ctaBlock = bySection(content, "cta")[0];
  const cta = ctaBlock
    ? {
        title: ctaBlock.title || CTA_FALLBACK.title,
        copy: ctaBlock.body || CTA_FALLBACK.copy,
        primaryHref: ctaBlock.linkHref || CTA_FALLBACK.primaryHref,
        primaryLabel: ctaBlock.linkLabel || CTA_FALLBACK.primaryLabel,
        secondaryHref: metaString(ctaBlock.meta, "secondaryHref", CTA_FALLBACK.secondaryHref),
        secondaryLabel: metaString(ctaBlock.meta, "secondaryLabel", CTA_FALLBACK.secondaryLabel),
      }
    : CTA_FALLBACK;

  // ---- Headings ----
  const highlightsHeading = headingFor(content, "highlights");
  const aboutHeading = headingFor(content, "about");
  const citiesHeading = headingFor(content, "cities");
  const categoriesHeading = headingFor(content, "categories");
  const whyHeading = headingFor(content, "why");
  const stepsHeading = headingFor(content, "steps");
  const galleryHeading = headingFor(content, "gallery");
  const filmsHeading = headingFor(content, "films");
  const testimonialsHeading = headingFor(content, "testimonials");
  const journalHeading = headingFor(content, "journal");
  const supportHeading = headingFor(content, "support");

  return (
    <>
      <TickerSection ticker={ticker} />

      <HeroSection
        slides={heroSlides}
        video={heroVideo}
        poster={heroPoster}
        posterAlt={heroPosterAlt}
        band={band}
      />

      <HighlightsSection venues={venues} heading={highlightsHeading} />

      <AboutSection about={about} heading={aboutHeading} />

      <CitiesSection cityCards={cityCards} heading={citiesHeading} />

      <CategoriesSection categories={categories} heading={categoriesHeading} />

      <FeaturesSection features={features} heading={whyHeading} />

      <StepsSection steps={steps} heading={stepsHeading} />

      <GallerySection gallery={gallery} heading={galleryHeading} />

      <FilmsSection films={films} heading={filmsHeading} />

      <TestimonialsSection testimonials={testimonials} heading={testimonialsHeading} />

      <BlogSection blogs={blogs} heading={journalHeading} />

      <EnquirySection faqs={faqs} heading={supportHeading} />

      <SEOSection seo={seo} />

      <CTASection
        title={cta.title}
        copy={cta.copy}
        primaryHref={cta.primaryHref}
        primaryLabel={cta.primaryLabel}
        secondaryHref={cta.secondaryHref}
        secondaryLabel={cta.secondaryLabel}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
    </>
  );
}
