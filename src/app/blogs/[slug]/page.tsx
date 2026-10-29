import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlogCard from "@/components/venues/BlogCard";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();
  const all = await getBlogs();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-5 pt-28 md:pt-36">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Journal", href: "/blogs" },
            { name: post.title },
          ]}
        />
        <Reveal className="mt-6 text-center">
          <p className="s-eyebrow text-[#6e6e73]">
            {post.category} · {post.readingMinutes} min read
          </p>
          <h1 className="s-headline font-display mt-4 text-4xl leading-tight text-balance text-[#1d1d1f] md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[#6e6e73]">
            {post.author} ·{" "}
            {new Date(post.publishedOn).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="gold-frame img-zoom relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-[#f5f5f7]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-8 space-y-5 leading-relaxed text-[#424245]">
            <p className="font-display border-l-2 border-[#e8e8ed] pl-5 text-xl leading-relaxed text-[#1d1d1f] italic md:text-2xl">
              {post.excerpt}
            </p>
            {post.body.map((para, i) => (
              <p key={i} className={i === 0 ? "text-[17px]" : "text-[16px]"}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
            <Link href="/blogs" className="s-link text-[14px] font-semibold">
              ← Back to Journal
            </Link>
            <Link
              href="/contact"
              className="s-btn-dark btn-sheen rounded-full px-6 py-3 text-[15px] font-semibold"
            >
              Find my venue
            </Link>
          </div>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section aria-label="Related articles" className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-[#1d1d1f]">Keep reading</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CTASection
        title="Like how we think? Let us find your venue."
        copy="Share your event details — we will reply with a curated shortlist."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/blogs" },
              { name: post.title, path: `/blogs/${post.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: post.image,
              author: { "@type": "Organization", name: post.author },
              datePublished: post.publishedOn,
            },
          ]),
        }}
      />
    </div>
  );
}
