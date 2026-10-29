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
      className="mt-20 bg-[#45081b] text-white md:mt-28"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-8 md:grid-cols-[1fr_auto] md:gap-16 md:px-10 md:py-9">
        <div>
          <p
            id="newsletter-heading"
            className="text-[10px] font-bold tracking-[0.16em] text-white uppercase"
          >
            Get the latest trends
          </p>
          <p className="mt-1.5 text-[13px] text-white/70">
            Our team&apos;s top picks and more straight to your inbox.
          </p>

          {subscribed ? (
            <p className="mt-4 flex items-center gap-2 text-[13px] text-[#f0d790]">
              <Check size={15} strokeWidth={2.4} />
              You&apos;re on the list. Thank you.
            </p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              className="mt-4 flex max-w-[460px] gap-2"
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
                placeholder="Email"
                className="h-[42px] min-w-0 flex-1 border border-white/15 bg-white px-4 text-[13px] text-[#141414] placeholder:text-[#8a8a8a] focus:outline-none focus:ring-2 focus:ring-[#d4a437]"
              />
              <button
                type="submit"
                className="h-[42px] shrink-0 bg-[#d4a437] px-6 text-[10px] font-bold tracking-[0.12em] text-[#3b0514] uppercase transition-colors hover:bg-[#e0b34a]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="md:text-right">
          <p className="text-[10px] font-bold tracking-[0.16em] text-white uppercase">Follow us</p>
          <div className="mt-3 flex gap-2.5 md:justify-end">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#45081b] transition-colors hover:bg-[#f0d790]"
              >
                <Icon size={16} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
