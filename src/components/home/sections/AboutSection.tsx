import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

export default function AboutSection({
  about,
  heading,
}: {
  about: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    alt: string;
    linkLabel: string;
    linkHref: string;
    phone: string;
    badge: string;
    stats: Stat[];
  };
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section
      aria-label="About Venue On My Plate"
      className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20"
    >
      <Reveal scale>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/10 ring-1 ring-[#e8e8ed]">
            <Image
              src={about.image}
              alt={about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={70}
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(18,21,33,0.5)] ring-1 ring-[#e8e8ed] backdrop-blur">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#7f0f2e]" />
              <span className="text-[13px] font-semibold text-[#1d1d1f]">{about.badge}</span>
            </div>
          </div>
          <div>
            <p className="s-eyebrow text-neutral-500">{about.eyebrow || heading.eyebrow}</p>
            <h2 className="s-headline mt-3 text-[32px] text-balance md:text-[44px]">
              {about.title}
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">{about.body}</p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-[#e8e8ed] pt-6">
              {about.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <dt className="text-gold-gradient text-2xl font-bold tracking-tight md:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[13px] text-neutral-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={about.linkHref} className="s-link text-[15px]">
                {about.linkLabel} &rsaquo;
              </Link>
              <a
                href={`tel:${about.phone.replace(/[^\d+]/g, "")}`}
                className="s-btn-dark btn-sheen px-6 py-2.5 text-[13px] font-semibold"
              >
                {about.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
