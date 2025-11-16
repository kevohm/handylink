export default function HomeSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>

        <div className="flex gap-4">
          <div className="h-10 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-16">
        {/* Left section */}
        <div className="flex flex-col gap-6">
          {/* Heading lines */}
          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-10 w-2/3 bg-gray-200 rounded"></div>

          {/* Subtitle */}
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Right side Image */}
        <div className="h-[420px] bg-gray-200 rounded-2xl w-full"></div>
      </div>
    </div>
  );
}
