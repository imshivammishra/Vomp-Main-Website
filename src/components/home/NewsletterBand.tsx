"use client";

import { useState } from "react";
import { Check, Facebook, Instagram, Mail, Phone } from "lucide-react";

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/venueonmyplate", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/venueonmyplate", icon: Instagram },
  { label: "Email", href: "mailto:hello@venueonmyplate.in", icon: Mail },
  { label: "Call", href: "tel:+919462460555", icon: Phone },
];

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden border-y border-[#ece0cc] bg-[#f7efe0] text-[#1a0a0d]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(212,164,55,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a437]/70 to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_auto] md:gap-16 md:px-10 md:py-20">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#d4a437]" />
            <p
              id="newsletter-heading"
              className="text-[10px] font-semibold tracking-[0.34em] text-[#a67c1a] uppercase"
            >
              The Insider List
            </p>
          </div>
          <h2 className="font-display max-w-[520px] text-[32px] leading-[1.06] text-[#1a0a0d] md:text-[44px]">
            New venues, curated picks and private offers
            <span className="text-[#a67c1a]">.</span>
          </h2>
          <p className="mt-4 max-w-[440px] text-[14px] leading-relaxed text-[#6b5b5d]">
            Our team&apos;s finest discoveries, delivered straight to your inbox — no noise, ever.
          </p>

          {subscribed ? (
            <p className="mt-7 flex items-center gap-2 text-[14px] font-medium text-[#7f0f2e]">
              <Check size={16} strokeWidth={2.4} />
              You&apos;re on the list. Thank you.
            </p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              className="mt-7 flex max-w-[480px] flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="h-[52px] min-w-0 flex-1 rounded-none border border-[#e3d6bf] bg-white px-6 text-[14px] text-[#1a0a0d] placeholder:text-[#9a8a85] transition focus:border-[#d4a437] focus:outline-none focus:ring-2 focus:ring-[#d4a437]/30"
              />
              <button
                type="submit"
                className="btn-champagne btn-sheen h-[52px] shrink-0 px-8 text-[14px]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="md:text-right">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#8c736f] uppercase">
            Follow the journey
          </p>
          <div className="mt-4 flex gap-3 md:justify-end">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e3d6bf] bg-white text-[#7f0f2e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a437] hover:bg-[#d9b45b] hover:text-[#3b0514]"
              >
                <Icon size={17} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
