export const JobCardSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((card) => (
        <div
          key={card}
          className="flex flex-1 my-2 border-gray-100 animate-pulse"
        >
          <div className="flex flex-col w-full p-6 bg-white border-2 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>

                {/* Company + Location */}
                <div>
                  <div className="w-24 h-4 mb-1 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
              </div>

              {/* Employment Type */}
              <div className="w-20 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>

            {/* Job Title */}
            <div className="w-3/4 h-5 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>

            {/* Description */}
            <div className="flex flex-col flex-1">
              <div className="mb-5 space-y-2">
                <div className="w-full h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="w-5/6 h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-6">
                <div className="w-16 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="w-20 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-14"></div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <div className="w-24 h-4 mb-1 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
