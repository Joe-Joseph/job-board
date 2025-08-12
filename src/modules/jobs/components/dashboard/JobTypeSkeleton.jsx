function JobTypeCardSkeleton() {
  return (
    <div className="p-6 bg-white border-2 shadow-sm rounded-xl animate-pulse dark:bg-gray-900 dark:border-gray-800">
      <div className="w-3/4 h-6 mb-4 bg-gray-200 rounded dark:bg-gray-700" />{' '}
      {/* title */}
      <div className="w-1/2 h-10 mb-4 bg-gray-200 rounded dark:bg-gray-700" />{' '}
      {/* count */}
      <div className="w-full h-4 max-w-xs bg-gray-200 rounded dark:bg-gray-700" />{' '}
      {/* description */}
    </div>
  );
}

export default function JobTypeCardsSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
        <JobTypeCardSkeleton />
        <JobTypeCardSkeleton />
        <JobTypeCardSkeleton />
      </div>
    </div>
  );
}
