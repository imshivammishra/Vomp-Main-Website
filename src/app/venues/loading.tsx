export default function VenuesLoading() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-10 animate-pulse rounded bg-[#e8e8ed]" />
          <div className="h-4 w-1 animate-pulse rounded bg-[#e8e8ed]" />
          <div className="h-4 w-16 animate-pulse rounded bg-[#e8e8ed]" />
        </div>

        {/* Heading skeleton */}
        <div className="mt-8 max-w-lg">
          <div className="h-4 w-20 animate-pulse rounded bg-[#e8e8ed]" />
          <div className="mt-3 h-10 w-64 animate-pulse rounded bg-[#e8e8ed]" />
          <div className="mt-3 h-5 w-full max-w-md animate-pulse rounded bg-[#e8e8ed]" />
        </div>

        {/* Filter skeleton */}
        <div className="mt-10 rounded-[18px] bg-[#f5f5f7] px-5 py-5 md:px-7 md:py-6">
          <div className="h-10 w-full max-w-md animate-pulse rounded-full bg-[#e8e8ed]" />
          <div className="mt-3 flex flex-wrap gap-3">
            {[80, 72, 68, 88].map((w) => (
              <div key={w} className="h-9 animate-pulse rounded-full bg-[#e8e8ed]" style={{ width: w + 80 }} />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="mt-10 border-t border-black/10" />

        {/* Grid skeleton */}
        <div className="py-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[18px] border border-[#e8e8ed] bg-white">
                <div className="aspect-[16/10] animate-pulse bg-[#f5f5f7]" />
                <div className="px-5 pt-4 pb-5">
                  <div className="h-3.5 w-36 animate-pulse rounded bg-[#e8e8ed]" />
                  <div className="mt-2 h-5 w-3/4 animate-pulse rounded bg-[#e8e8ed]" />
                  <div className="mt-1.5 h-4 w-1/2 animate-pulse rounded bg-[#e8e8ed]" />
                  <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-[#e8e8ed]" />
                  <div className="mt-4 flex gap-3">
                    <div className="h-10 flex-1 animate-pulse rounded-full bg-[#e8e8ed]" />
                    <div className="h-10 w-20 animate-pulse rounded bg-[#e8e8ed]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
