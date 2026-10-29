import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlogCard from "@/components/venues/BlogCard";
import Reveal from "@/components/ui/Reveal";
import { getBlogs } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal — wedding & celebration planning guides",
  description:
    "Practical guides to choosing venues, planning destination weddings and designing guest experiences — from the Venue On My Plate studio.",
  path: "/blogs",
});

export default async function BlogsPage() {
  const posts = await getBlogs();
  const [first, ...rest] = posts;
  return (
    <div className="bg-white">
      {/* ── Page header band ── */}
      <div className="page-header-band">
        <div className="mx-auto max-w-7xl px-5 pt-28 pb-12 md:px-8 md:pt-36 md:pb-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Journal" }]} />
          <Reveal className="mt-8">
            <div className="section-ornament">
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">Journal</span>
            </div>
            <h1 className="font-display text-[44px] leading-[1.05] text-[#1d1d1f] md:text-[62px]">
              Notes on celebrating<br />
              <em className="not-italic text-[#a67c1a]">well.</em>
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#424245]">
              Venue selection, destination planning and guest experience — written for humans, not algorithms.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        {first && (
          <Reveal delay={100} className="mt-10">
            <BlogCard post={first} featured />
          </Reveal>
        )}
        {rest.length > 0 && (
          <>
            <div className="mt-14 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e8e8ed]" />
              <span className="text-[10px] font-semibold tracking-[0.28em] text-[#a67c1a] uppercase">More from the journal</span>
              <div className="h-px flex-1 bg-[#e8e8ed]" />
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
