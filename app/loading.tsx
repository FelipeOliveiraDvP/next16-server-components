export default async function HomeSkeleton() {
  return (
    <main>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
        {/* Desktop sidebar skeleton: visible on lg and up */}
        <div className="hidden lg:block col-span-1 p-4">
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-9 w-full bg-gray-300 rounded"></div>
            <div className="h-9 w-full bg-gray-300 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-8 w-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        {/* Products column skeleton */}
        <div className="flex flex-col space-y-4 col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="bg-gray-300 h-48 w-full rounded"></div>
                <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
                <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
