export default function ProductDetailSkeleton() {
  return (
    <main className="container mx-auto p-4">
      {/* Back link skeleton */}
      <div className="mb-4">
        <div className="h-9 w-48 bg-gray-300 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gallery skeleton */}
        <div className="p-0 lg:p-4">
          <div className="relative w-full aspect-square overflow-hidden rounded-md bg-gray-300"></div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-16 shrink-0 rounded-md bg-gray-300"
              ></div>
            ))}
          </div>
        </div>

        {/* Details card skeleton */}
        <section className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="h-7 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="h-5 w-40 bg-gray-300 rounded"></div>
            <div className="h-5 w-28 bg-gray-300 rounded"></div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>

          {/* Description */}
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-11/12 bg-gray-300 rounded"></div>
            <div className="h-4 w-10/12 bg-gray-300 rounded"></div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-300 rounded"></div>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-black/10 bg-white/50 p-3 space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="rounded-md border border-black/10 bg-white/50 p-3 space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Policies */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-black/10 bg-white/50 p-3 space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="rounded-md border border-black/10 bg-white/50 p-3 space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="rounded-md border border-black/10 bg-white/50 p-3 sm:col-span-2 space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-6 rounded-md border border-black/10 bg-white/50 p-3 space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="h-4 w-40 bg-gray-300 rounded"></div>
              <div className="h-4 w-40 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6 rounded-lg border border-black/10 bg-white p-3 space-y-3">
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-md border border-black/10 bg-white/50 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-11/12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
            <div className="h-10 w-40 bg-gray-300 rounded"></div>
          </div>
        </section>
      </div>
    </main>
  );
}
