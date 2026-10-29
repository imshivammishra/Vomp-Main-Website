import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 pb-24 text-center md:px-8">
      <p className="s-eyebrow text-[#6e6e73]">404</p>
      <h1 className="s-headline font-display mt-4 text-5xl text-[#1d1d1f]">
        This page isn&apos;t on the menu.
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-[#424245]">
        The venue or article you were looking for has moved — or never existed. Let&apos;s get you
        back to something beautiful.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="s-btn-dark btn-sheen rounded-full px-8 py-3.5 text-[15px] font-semibold"
        >
          Back home
        </Link>
        <Link
          href="/venues"
          className="rounded-full border border-black/20 px-8 py-3.5 text-[15px] font-semibold text-[#1d1d1f] transition hover:bg-black hover:text-white"
        >
          Explore venues
        </Link>
      </div>
    </div>
  );
}
