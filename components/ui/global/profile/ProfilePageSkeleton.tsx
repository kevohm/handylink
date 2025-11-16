export default function ProfilePageSkeleton() {
  return (
    <main className="min-h-screen pb-20 animate-pulse">
      {/* Top nav */}
      <div className="flex items-center justify-between py-6 px-24">
        <div className="h-6 w-6 bg-gray-200 rounded-full" />
        <div className="h-8 w-20 bg-gray-200 rounded-md" />
      </div>

      <div className="px-4 md:px-12 lg:px-24 space-y-12">
        {/* UserCard Skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full" />

          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>

        {/* What I Do */}
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-6" />

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 border rounded-xl bg-white space-y-4"
              >
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-52 bg-gray-200 rounded" />

                <div className="h-10 w-full bg-gray-200 rounded-full mt-8" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="h-6 w-28 bg-gray-200 rounded mb-6" />

          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-6 border rounded-xl bg-white space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                </div>

                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-4/5 bg-gray-200 rounded" />
                <div className="h-3 w-2/5 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
