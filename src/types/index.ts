export interface Venue {
  slug: string;
  name: string;
  country?: string; // e.g. "India", "Italy"
  countryCode?: string; // e.g. "IN", "IT"
  city: string;
  citySlug: string;
  area: string;
  type: string;
  setting: "Indoor" | "Outdoor" | "Indoor + Outdoor";
  capacityMin: number;
  capacityMax: number;
  priceHint?: string;
  rating?: never;
  image: string;
  imageAlt: string;
  shortDescription: string;
  amenities: string[];
  eventTypes: string[];
  featured?: boolean;
  status?: "published" | "draft";
}

export interface City {
  slug: string;
  name: string;
  country?: string;
  countryCode?: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  venueCountLabel: string;
  popularTypes: string[];
}

export interface Country {
  code: string; // "IN", "IT"
  name: string; // "India", "Italy"
  flag: string; // "🇮🇳", "🇮🇹"
  active: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedOn: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  body: string[];
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  responseNote: string;
  instagram: string;
  footerNote: string;
}

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  city: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export type ContentSection =
  | "heading"
  | "hero"
  | "ticker"
  | "about"
  | "category"
  | "feature"
  | "step"
  | "gallery"
  | "film"
  | "faq"
  | "seo"
  | "cta";

export interface ContentBlock {
  id: string;
  section: ContentSection;
  blockKey: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
  linkLabel: string;
  linkHref: string;
  icon: string;
  meta: Record<string, unknown>;
  sortOrder: number;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;
  context: string;
  quote: string;
  rating: number;
  image: string;
  venueSlug: string;
  featured: boolean;
  sortOrder: number;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}
