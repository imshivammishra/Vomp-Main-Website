import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/api";

const footerColumns = [
  {
    title: "Get Started",
    links: [
      { label: "Find a Venue", href: "/venues" },
      { label: "Find Ideas", href: "/blogs" },
      { label: "Plan Your Event", href: "/contact" },
      { label: "Wedding Venues", href: "/wedding-venues" },
    ],
  },
  {
    title: "Browse by Event",
    links: [
      { label: "Weddings", href: "/wedding-venues" },
      { label: "Birthdays", href: "/venues?event=Birthday" },
      { label: "Corporate Events", href: "/venues?event=Corporate" },
      { label: "Sangeet & Haldi", href: "/venues?event=Pre-wedding" },
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
    title: "The Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Journal", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "Register Venue", href: "/partner" },
    ],
  },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;
  const socials = [
    {
      label: "Instagram",
      href: settings.instagram || "https://instagram.com/venueonmyplate",
      icon: Instagram,
    },
    { label: "Facebook", href: "https://facebook.com/venueonmyplate", icon: Facebook },
    { label: "Email", href: `mailto:${settings.email}`, icon: Mail },
    { label: "Call", href: phoneHref, icon: Phone },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#160309] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a437]/60 to-transparent"
      />
      <div aria-hidden className="lux-glow-wine -left-24 top-10 h-[360px] w-[360px]" />
      <div aria-hidden className="lux-glow-gold bottom-0 right-0 h-[300px] w-[300px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-[#d4a437]/30">
                <Image
                  src="/images/brand-logo-256.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </span>
              <div>
                <p className="font-display text-[20px] leading-none text-white">
                  {settings.brandName}
                </p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.26em] text-[#d4a437]/80 uppercase">
                  Est. India
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-white/55">
              {settings.footerNote}
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-[13px] text-white/70 transition-colors hover:text-[#f6de9a]"
              >
                <Mail size={15} className="shrink-0 text-[#a67c1a]" />
                <span className="break-all">{settings.email}</span>
              </a>
              <a
                href={phoneHref}
                className="flex items-center gap-3 text-[13px] text-white/70 transition-colors hover:text-[#f6de9a]"
              >
                <Phone size={15} className="shrink-0 text-[#a67c1a]" />
                {settings.phone}
              </a>
              <p className="flex items-start gap-3 text-[13px] text-white/70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#a67c1a]" />
                {settings.address}
              </p>
            </div>

            <div className="mt-7 flex gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a437]/60 hover:bg-[#d4a437] hover:text-[#160309]"
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#d4a437]/80 uppercase">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="lux-underline text-[13.5px] leading-5 text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[12px] text-white/45 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-[#f6de9a]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#f6de9a]">
              Terms of Use
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#f6de9a]">
              Contact
            </Link>
            <Link href="/partner" className="transition-colors hover:text-[#f6de9a]">
              List Your Venue
            </Link>
          </div>
          <p className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rotate-45 bg-[#a67c1a]" />© {new Date().getFullYear()}{" "}
            {settings.brandName}. Curated with care across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
