import Hero from "@/components/home/Hero";
import CinematicBand from "@/components/home/CinematicBand";

export default function HeroSection({
  slides,
  video,
  poster,
  posterAlt,
  band,
}: {
  slides: Array<{
    eyebrow: string;
    title: string;
    copy: string;
    image: string;
    alt: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  }>;
  video: string;
  poster: string;
  posterAlt: string | undefined;
  band: {
    src: string;
    poster: string;
    eyebrow: string;
    title: string;
    linkLabel: string;
    linkHref: string;
  };
}) {
  return (
    <>
      <Hero slides={slides} video={video} poster={poster} posterAlt={posterAlt} />
      <CinematicBand
        src={band.src}
        poster={band.poster}
        eyebrow={band.eyebrow}
        title={band.title}
        linkLabel={band.linkLabel}
        linkHref={band.linkHref}
      />
    </>
  );
}
