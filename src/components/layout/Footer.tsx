import Link from "next/link";
import { ArrowRight, Phone, Instagram, Facebook, Mail } from "lucide-react";
import Logo from "./Logo";
import { getSiteSettings } from "@/lib/api";

const footerColumns = [
  {
    title: "Venues",
    links: [
      { label: "All venues", href: "/venues" },
      { label: "Wedding venues", href: "/wedding-venues" },
      { label: "Corporate venues", href: "/venues?event=Corporate" },
      { label: "Private parties", href: "/venues?event=Birthday" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Udaipur", href: "/cities/udaipur" },
      { label: "Jaipur", href: "/cities/jaipur" },
      { label: "Jodhpur", href: "/cities/jodhpur" },
      { label: "Jaisalmer", href: "/cities/jaisalmer" },
      { label: "Goa", href: "/cities/goa" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Journal", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "Register venue", href: "/partner" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/venueonmyplate", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/venueonmyplate", icon: Facebook },
  { label: "Email", href: "mailto:hello@venueonmyplate.in", icon: Mail },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="relative overflow-hidden bg-white text-[#1e293b]">
      {/* Top decorative brand band */}
      <div
        aria-hidden="true"
        className="h-[2px] bg-gradient-to-r from-[#7f0f2e] via-[#d4a437] to-[#7f0f2e]"
      />
      <div aria-hidden="true" className="h-[1px] bg-[#e2e8f0]" />

      <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-10 md:px-8 md:pt-20">

        {/* ── Top grid: brand + columns ── */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr_1fr_1fr_1.15fr] lg:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:flex-none lg:h-full">
            <Logo tone="light" full align="start" />
            <p className="text-[10px] font-semibold tracking-[0.34em] text-[#7f0f2e] uppercase">
              {settings.tagline}
            </p>
            <p className="text-[13px] leading-7 text-[#64748b] max-w-[360px]">
              {settings.footerNote}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#e2e8f0] flex items-center justify-center text-[#64748b] transition-all hover:bg-[#7f0f2e] hover:text-white hover:border-[#7f0f2e] hover:shadow-md"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3 lg:flex-none lg:h-full">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#475569] uppercase mb-2">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      className="text-[13px] leading-6 text-[#64748b] transition-colors hover:text-[#7f0f2e] hover:underline underline-offset-4"
                      href={l.href}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact / CTA column */}
          <div className="flex flex-col gap-4 lg:flex-none lg:h-full">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#475569] uppercase mb-2">
              Get in touch
            </p>

            <div className="space-y-3">
              <a
                href={phoneHref}
                className="flex items-center gap-2.5 text-[14px] font-medium text-[#1e293b] transition-colors hover:text-[#7f0f2e]"
              >
                <Phone size={16} strokeWidth={1.8} className="text-[#7f0f2e]" />
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2.5 text-[14px] font-medium text-[#1e293b] transition-colors hover:text-[#7f0f2e]"
              >
                <Mail size={16} strokeWidth={1.8} className="text-[#7f0f2e]" />
                {settings.email}
              </a>
              <p className="text-[13px] text-[#64748b] leading-6">
                {settings.hours} · {settings.responseNote}
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-6 py-3 text-[13px] font-semibold text-[#7f0f2e] shadow-sm transition-all duration-200 hover:bg-[#fef3f4] hover:border-[#7f0f2e] hover:text-[#5c0a20] hover:shadow-md active:scale-[0.98]"
            >
              Request a proposal
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* ── Newsletter band ── */}
        <div className="mt-16 border-t border-[#f1f5f9] pt-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7f0f2e] uppercase mb-3">
              Join the list
            </p>
            <h3 className="font-display text-[24px] leading-tight text-[#1e293b] mb-4 md:text-[30px]">
              Get venue ideas and planning tips straight to your inbox.
            </h3>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3 text-[13px] text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7f0f2e] focus:bg-white transition-all"
              />
              <button
                type="button"
                className="rounded-full bg-[#7f0f2e] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#5c0a20] hover:shadow-md active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-[11px] text-[#94a3b8]">
              No spam. Just great venues, once in a while.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 border-t border-[#f1f5f9] pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#94a3b8]">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#cbd5e1]" />
                Private shortlists
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#cbd5e1]" />
                Verified venues
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#cbd5e1]" />
                Expert support
              </span>
            </p>
            <div className="flex items-center gap-6 text-[11px] text-[#94a3b8]">
              <Link href="/privacy" className="hover:text-[#7f0f2e] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#7f0f2e] transition-colors">
                Terms of Use
              </Link>
              <Link href="/contact" className="hover:text-[#7f0f2e] transition-colors">
                Contact
              </Link>
              <span className="text-[#1e293b]/40">·</span>
              <span className="text-[#1e293b]/50">
                © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
