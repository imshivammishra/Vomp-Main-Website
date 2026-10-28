/**
 * Component barrel export.
 * Import shared components from a single place:
 *   import { Header, Footer, SectionHeading } from "@/components";
 */

// Layout
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";
export { default as Logo } from "./layout/Logo";
export { default as Breadcrumbs } from "./layout/Breadcrumbs";

// Home sections
export { default as TickerSection } from "./home/sections/TickerSection";
export { default as HeroSection } from "./home/sections/HeroSection";
export { default as HighlightsSection } from "./home/sections/HighlightsSection";
export { default as AboutSection } from "./home/sections/AboutSection";
export { default as CitiesSection } from "./home/sections/CitiesSection";
export { default as CategoriesSection } from "./home/sections/CategoriesSection";
export { default as FeaturesSection } from "./home/sections/FeaturesSection";
export { default as StepsSection } from "./home/sections/StepsSection";
export { default as GallerySection } from "./home/sections/GallerySection";
export { default as FilmsSection } from "./home/sections/FilmsSection";
export { default as TestimonialsSection } from "./home/sections/TestimonialsSection";
export { default as BlogSection } from "./home/sections/BlogSection";
export { default as EnquirySection } from "./home/sections/EnquirySection";
export { default as SEOSection } from "./home/sections/SEOSection";

// Home components
export { default as Hero } from "./home/Hero";
export { default as CinematicBand } from "./home/CinematicBand";
export { default as HomeTabs } from "./home/HomeTabs";
export { default as SectionHeading, SectionLink } from "./home/SectionHeading";
export { default as CTASection } from "./home/CTASection";
export { default as VideoCard } from "./home/VideoCard";

// Venues
export { default as VenueCard } from "./venues/VenueCard";
export { default as VenueGrid } from "./venues/VenueGrid";
export { default as VenueFilters } from "./venues/VenueFilters";
export { default as CityCard } from "./venues/CityCard";
export { default as FloatingEnquire } from "./venues/FloatingEnquire";
export { default as BlogCard } from "./venues/BlogCard";

// Forms
export { default as SearchBar } from "./forms/SearchBar";
export { default as FAQ } from "./forms/FAQ";
export { default as EnquiryForm } from "./forms/EnquiryForm";

// Chat
export { default as ConciergeChat } from "./chat/ConciergeChat";
export { default as WelcomeNotice } from "./chat/WelcomeNotice";

// UI
export { default as Reveal } from "./ui/Reveal";
