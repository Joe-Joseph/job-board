export const JobDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="grid grid-cols-1 gap-6 pt-20 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            {/* Header Skeleton */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div>
                  <div className="w-48 h-4 mb-2 bg-gray-200 rounded" />
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-3 bg-gray-200 rounded" />
                    <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    <div className="w-24 h-3 bg-gray-200 rounded" />
                  </div>
                  <div className="flex items-center mt-3 space-x-3">
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                    <div className="w-20 h-3 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded" />
            </div>

            {/* About This Role */}
            <div className="mb-8">
              <div className="w-40 h-4 mb-4 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="w-full h-3 bg-gray-200 rounded" />
                <div className="w-5/6 h-3 bg-gray-200 rounded" />
                <div className="w-2/3 h-3 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Qualification */}
            <div className="mb-8">
              <div className="w-32 h-4 mb-4 bg-gray-200 rounded" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-5/6 h-3 bg-gray-200 rounded" />
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <div className="w-40 h-4 mb-4 bg-gray-200 rounded" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5/6 h-3 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Similar Jobs */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-32 h-4 mb-4 bg-gray-200 rounded" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full h-16 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Jobs From Same Company */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-48 h-4 mb-4 bg-gray-200 rounded" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="w-full h-16 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
