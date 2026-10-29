import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <article className={`s-card group overflow-hidden ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      <Link
        href={`/blogs/${post.slug}`}
        className="img-zoom relative block overflow-hidden bg-[#f5f5f7]"
        aria-label={`Read ${post.title}`}
      >
        <div
          className={`relative ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[320px]" : "aspect-[16/10]"}`}
        >
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            quality={70}
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-6">
        <p className="text-[12px] font-semibold text-[#6e6e73]">
          {post.category} · {post.readingMinutes} min read
        </p>
        <h3
          className={`mt-2 font-bold tracking-tight text-[#1d1d1f] ${featured ? "text-2xl md:text-[28px]" : "text-[19px] leading-snug"}`}
        >
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[#424245]">
          {post.excerpt}
        </p>
        <p className="mt-3 text-[12px] text-[#6e6e73]">
          {post.author} ·{" "}
          {new Date(post.publishedOn).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
