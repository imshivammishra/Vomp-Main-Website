"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 pb-24 text-center">
      <p className="s-eyebrow text-[#6e6e73]">Something went wrong</p>
      <h1 className="s-headline font-display mt-4 text-4xl text-[#1d1d1f]">
        The table wasn&apos;t set properly.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[#424245]">
        Please try again — and if it keeps happening, write to contact@venueonmyplate.in.
      </p>
      <button
        type="button"
        onClick={reset}
        className="s-btn-dark btn-sheen mt-8 rounded-full px-8 py-3.5 text-[15px] font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
