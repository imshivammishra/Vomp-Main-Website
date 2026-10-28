"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import VideoCard from "@/components/home/VideoCard";

type Film = { src: string; poster: string; startAt: number; caption: string };

export default function FilmsSection({
  films,
  heading,
}: {
  films: Film[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section aria-label="Celebration films" className="band-cream border-t border-[#eed9a3]">
      <div className="mx-auto max-w-[1024px] px-5 py-14 md:px-6 md:py-20">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {films.map((v, i) => (
            <Reveal key={`${v.src}-${v.caption}`} delay={(i % 4) * 90} scale>
              <VideoCard src={v.src} poster={v.poster} startAt={v.startAt} caption={v.caption} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
