import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "../ui/Reveal";

/**
 * The concierge promise — three steps on deep midnight-crimson.
 * Engagement-first: every step ends at the enquiry form.
 */
export default function Testimonials() {
  return (
    <section aria-label="How the concierge works" className="brand-gradient-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="Concierge"
          title="A shortlist, not a search spiral."
          copy="Tell us your date, city and guest count. We respond with venues that actually fit — availability, capacity and commercial terms checked."
        />
        <Reveal delay={120}>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/10 md:grid-cols-3">
            {[
              ["01", "Share requirements", "Two minutes — city, event, guests, date."],
              ["02", "Receive a shortlist", "Curated venues with honest trade-offs, within a day."],
              ["03", "Visit & decide", "We coordinate visits and proposals. You choose."],
            ].map(([n, t, d]) => (
              <li key={n} className="bg-black p-8">
                <p className="text-4xl font-bold tracking-tight text-white">{n}</p>
                <p className="mt-3 text-sm font-semibold tracking-[0.16em] text-white uppercase">
                  {t}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="s-btn-gold btn-sheen inline-block rounded-full px-10 py-4 text-[13px] font-semibold tracking-[0.16em] uppercase"
          >
            Start with step 01 — it takes two minutes
          </Link>
        </div>
      </div>
    </section>
  );
}
