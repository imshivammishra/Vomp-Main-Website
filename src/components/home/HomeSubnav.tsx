import Link from "next/link";

const LINKS = [
  { label: "Weddings", href: "/wedding-venues" },
  { label: "Corporate Events", href: "/venues?event=Corporate" },
  { label: "Birthdays", href: "/venues?event=Birthday" },
  { label: "Sangeet & Haldi", href: "/venues?event=Pre-wedding" },
  { label: "Anniversaries", href: "/venues?event=Birthday" },
  { label: "More Celebrations", href: "/venues" },
];

export default function HomeSubnav() {
  return (
    <div className="border-b border-[#e6e6e6] bg-white">
      <div className="mx-auto flex h-[46px] max-w-[1440px] items-center justify-between gap-8 px-5 md:px-10">
        <nav
          aria-label="Celebration categories"
          className="no-scrollbar flex min-w-0 items-center gap-7 overflow-x-auto md:gap-9"
        >
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[12px] font-medium text-[#1f1f1f] transition-colors hover:text-[#7f0f2e]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/venues"
          className="hidden shrink-0 text-[10px] font-bold tracking-[0.12em] text-[#7f0f2e] uppercase transition-colors hover:text-[#5c0a20] md:inline"
        >
          Explore all venues
        </Link>
      </div>
    </div>
  );
}
