export default function SEOSection({ seo }: { seo: { title: string; paragraphs: string[] } }) {
  return (
    <section aria-label="About finding venues in India" className="border-t border-black/10">
      <div className="mx-auto max-w-4xl px-5 py-14 text-center md:py-20">
        <h2 className="text-[28px] leading-[1.1] font-bold tracking-[-0.022em] text-balance text-[#1d1d1f] md:text-[36px]">
          {seo.title}
        </h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#424245]">
          {seo.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
