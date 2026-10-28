"use client";

import BlogCard from "@/components/venues/BlogCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { SectionLink } from "@/components/home/SectionHeading";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedOn: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  body: string[];
};

export default function BlogSection({
  blogs,
  heading,
}: {
  blogs: BlogPost[];
  heading: { eyebrow: string; title: string; copy?: string; linkLabel?: string; linkHref?: string };
}) {
  return (
    <section aria-labelledby="journal-heading" className="band-blush border-t border-[#eed9a3]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
          {heading.linkLabel && (
            <SectionLink href={heading.linkHref || "/blogs"}>{heading.linkLabel}</SectionLink>
          )}
        </div>
        <h2 id="journal-heading" className="sr-only">Latest articles</h2>
        <Reveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogs.slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
