export default async function HomeSkeleton() {
  return (
    <main>
      <div className="grid grid-cols-3 container mx-auto px-4 py-8 gap-6">
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-9 w-full bg-gray-300 rounded"></div>
          <div className="h-9 w-full bg-gray-300 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-8 w-16 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md space-y-4"
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
    </main>
  );
}
