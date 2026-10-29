"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, MapPin, Menu, Phone, Search, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  note?: string;
  children?: Array<{ label: string; href: string; note?: string }>;
};

const NAV_LEFT: NavItem[] = [
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "All venues", href: "/venues", note: "The full curated collection" },
      { label: "Wedding venues", href: "/wedding-venues", note: "Palaces, lawns & ballrooms" },
      { label: "Corporate & conferences", href: "/venues?event=Corporate", note: "Retreats, offsites & annual days" },
      { label: "Private parties", href: "/venues?event=Birthday", note: "Birthdays & anniversaries" },
    ],
  },
  {
    label: "Destinations",
    href: "/cities",
    children: [
      { label: "Udaipur", href: "/cities/udaipur", note: "Lakes, palaces & golden pheras" },
      { label: "Jaipur", href: "/cities/jaipur", note: "Rajput grandeur near Delhi" },
      { label: "Jodhpur", href: "/cities/jodhpur", note: "Blue-city rooftops & Mehrangarh" },
      { label: "Jaisalmer", href: "/cities/jaisalmer", note: "Golden forts & desert evenings" },
      { label: "Goa", href: "/cities/goa", note: "Barefoot luxury by the sea" },
      { label: "All destinations", href: "/cities", note: "Explore every venue circuit" },
    ],
  },
  {
    label: "Occasions",
    href: "/wedding-venues",
    children: [
      { label: "Weddings", href: "/wedding-venues", note: "Pheras, receptions & sangeet" },
      { label: "Sangeet & haldi", href: "/venues?event=Wedding", note: "Colour, music & morning light" },
      { label: "Corporate events", href: "/venues?event=Corporate", note: "Conferences & leadership offsites" },
      { label: "Celebrations", href: "/venues?event=Birthday", note: "Birthdays, anniversaries & more" },
    ],
  },
];

const NAV_RIGHT: NavItem[] = [
  { label: "Journal", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_LINKS = [
  { label: "Venues", href: "/venues", note: "The complete collection" },
  { label: "Destinations", href: "/cities", note: "Celebration destinations across India" },
  { label: "Wedding venues", href: "/wedding-venues", note: "Palaces, resorts & lawns" },
  { label: "Journal", href: "/blogs", note: "Ideas, costs & planning notes" },
  { label: "About us", href: "/about", note: "How we curate" },
  { label: "Contact", href: "/contact", note: "A private shortlist, on request" },
  { label: "Register venue", href: "/partner", note: "Partner with Venue On My Plate" },
];

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => {
    const base = href.split("?")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  };
}

const navLinkClass = (active: boolean) =>
  cn(
    "group relative flex items-center gap-1 px-3 py-2 text-[15px] font-semibold tracking-[0.02em] transition-colors duration-200 xl:px-3.5",
    active ? "text-[#f4d88e]" : "text-[#fbf3df]/78 hover:text-[#fff8e8]"
  );

function DesktopNav({ items }: { items: NavItem[] }) {
  const [drop, setDrop] = useState<string | null>(null);
  const isActive = useIsActive();

  return (
    <nav aria-label="Primary" className="hidden min-w-0 items-center gap-0.5 whitespace-nowrap xl:flex">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const active = isActive(item.href);
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setDrop(hasChildren ? item.label : null)}
            onMouseLeave={() => setDrop(null)}
            onFocus={() => setDrop(hasChildren ? item.label : null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDrop(null);
            }}
          >
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={navLinkClass(active)}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  size={13}
                  strokeWidth={2.2}
                  className={cn(
                    "text-[#e7c77e]/70 transition-transform duration-300",
                    drop === item.label && "rotate-180 text-[#f4d88e]"
                  )}
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-px origin-center bg-[#d9b45b] transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>

            {item.children && drop === item.label && (
              <div className="drop-in absolute top-full left-0 w-[318px] pt-4 whitespace-normal">
                <div className="overflow-hidden border border-[#c6a04a]/70 bg-[#fffaf0] shadow-[0_30px_70px_-24px_rgba(24,2,9,0.7)]">
                  <div className="border-b border-[#c6a04a]/50 bg-[#45081b] px-5 py-4">
                    <p className="text-[9px] font-semibold tracking-[0.32em] text-[#e7c77e] uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[17px] font-semibold text-[#fff8e8]">
                      Choose your celebration
                    </p>
                  </div>
                  <div className="p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="group/item flex items-center justify-between border-b border-[#c6a04a]/15 px-3 py-2.5 transition last:border-0 hover:bg-[#f3e3c4]"
                      >
                        <span>
                          <span className="block text-[15px] font-semibold text-[#4a0719] group-hover/item:text-[#7f0f2e]">
                            {child.label}
                          </span>
                          {child.note && (
                            <span className="mt-0.5 block text-[11px] leading-snug text-[#7f6668]">
                              {child.note}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          size={14}
                          className="-translate-x-1 text-[#a67c1a] opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = useIsActive();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement strip */}
      <div className="border-b border-[#b89345]/70 bg-[#f4e6c9] text-center text-[#4a0719]">
        <p className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-[9px] font-semibold tracking-[0.22em] uppercase sm:text-[10px] md:text-[10.5px]">
          <span aria-hidden="true" className="text-[12px] leading-none text-[#9a7224]">❖</span>
          Wedding &amp; celebration venues across India
          <span aria-hidden="true" className="text-[#b89345]">◆</span>
          <span className="hidden sm:inline">Private venue advisory</span>
          <span aria-hidden="true" className="hidden text-[#b89345] sm:inline">◆</span>
          <a
            href="tel:+919462460555"
            className="hidden underline decoration-[#b89345]/80 underline-offset-4 transition hover:text-[#7f0f2e] md:inline"
          >
            +91 94624 60555
          </a>
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b-2 border-[#c6a04a] bg-[#45081b] text-[#fbf3df] transition-shadow duration-300",
          scrolled
            ? "shadow-[0_18px_45px_-22px_rgba(24,2,9,0.85)]"
            : "shadow-[0_10px_30px_-24px_rgba(24,2,9,0.7)]"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-[#f0d790]/55"
        />

        <div className="relative mx-auto grid h-[84px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 md:h-[100px] md:px-6 xl:px-8">
          <div className="flex min-w-0 items-center justify-start gap-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 shrink-0 place-items-center border border-[#e7c77e]/50 text-[#f4d88e] transition hover:bg-white/10 xl:hidden"
            >
              <Menu size={21} strokeWidth={1.8} />
            </button>
            <DesktopNav items={NAV_LEFT} />
          </div>

          <div className="relative flex items-center justify-center">
            <Logo tone="light" align="center" imageOnly />
          </div>

          <div className="flex min-w-0 items-center justify-end gap-1">
            <nav aria-label="Secondary" className="hidden items-center gap-0.5 whitespace-nowrap xl:flex">
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navLinkClass(isActive(item.href))}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px origin-center bg-[#d9b45b] transition-transform duration-300",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </nav>

            <span aria-hidden="true" className="mx-1.5 hidden h-6 w-px bg-[#e7c77e]/30 xl:block" />

            <Link
              href="/venues"
              aria-label="Search venues"
              className="hidden h-10 w-10 place-items-center text-[#f4d88e]/80 transition hover:bg-white/10 hover:text-[#fff8e8] sm:grid"
            >
              <Search size={18} strokeWidth={1.7} />
            </Link>
            <a
              href="tel:+919462460555"
              aria-label="Call our venue experts"
              className="hidden h-10 w-10 place-items-center text-[#f4d88e]/80 transition hover:bg-white/10 hover:text-[#fff8e8] md:grid"
            >
              <Phone size={17} strokeWidth={1.7} />
            </a>
            <Link
              href="/contact"
              className="ml-2 hidden items-center gap-2 border border-[#f0d790] bg-[#d9b45b] px-5 py-2.5 text-[14px] font-semibold tracking-[0.02em] whitespace-nowrap text-[#3b0514] shadow-[0_10px_24px_-16px_rgba(0,0,0,0.9)] transition hover:bg-[#f0d790] xl:inline-flex"
            >
              Request a proposal
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div aria-hidden="true" className="h-px bg-[#f0d790]/40" />
        <div aria-hidden="true" className="h-[3px] bg-[#c6a04a]" />
      </header>

      {/* Mobile / tablet menu */}
      {open && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#45081b] text-[#fbf3df] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="relative min-h-full border-t-2 border-[#c6a04a]">
            <div className="mx-auto max-w-3xl px-5 pb-10">
              <div className="flex items-center justify-between gap-3 border-b border-[#c6a04a]/30 py-4">
                <Logo tone="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center border border-[#e7c77e]/45 text-[#f4d88e] transition hover:bg-white/10"
                >
                  <X size={21} strokeWidth={1.8} />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold tracking-[0.3em] text-[#e7c77e] uppercase">
                <span aria-hidden="true" className="text-[12px] leading-none">❖</span>
                Wedding &amp; celebration venues
                <span className="h-px flex-1 bg-[#e7c77e]/35" />
              </div>

              <nav aria-label="Mobile" className="mt-1">
                {MOBILE_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-[#e7c77e]/15 py-3.5"
                  >
                    <span>
                      <span
                        className={cn(
                          "block text-[22px] leading-tight font-semibold tracking-[-0.01em] transition-colors group-hover:text-[#f4d88e]",
                          isActive(link.href) ? "text-[#f4d88e]" : "text-[#fff8e8]"
                        )}
                      >
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] tracking-wide text-[#fbf3df]/50">
                        {link.note}
                      </span>
                    </span>
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-[#e7c77e] transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </nav>

              <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 border border-[#f0d790] bg-[#d9b45b] px-6 py-3.5 text-[15px] font-semibold tracking-[0.02em] text-[#3b0514]"
                >
                  Request a proposal
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919462460555"
                  className="flex items-center justify-center gap-2 border border-[#e7c77e]/40 px-6 py-3.5 text-[13px] font-semibold text-[#f4d88e]"
                >
                  <Phone size={15} />
                  +91 94624 60555
                </a>
              </div>

              <p className="mt-6 flex items-center justify-center gap-1.5 text-[10px] tracking-[0.2em] text-[#fbf3df]/45 uppercase">
                <MapPin size={12} />
                Udaipur · Jaipur · Jodhpur · Jaisalmer · Goa
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
