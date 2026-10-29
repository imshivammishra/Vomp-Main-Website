import Link from "next/link";
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

  return (
    <footer className="bg-white text-[#141414]">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-8 md:px-10 md:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-12">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[13px] font-bold text-[#141414]">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-[13px] leading-5 text-[#4a4a4a] underline-offset-4 transition-colors hover:text-[#7f0f2e] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#ebebeb] pt-6 text-[12px] text-[#6b6b6b] md:mt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-[#7f0f2e]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#7f0f2e]">
              Terms of Use
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#7f0f2e]">
              Contact
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
