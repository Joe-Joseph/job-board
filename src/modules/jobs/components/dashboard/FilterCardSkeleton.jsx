import { jobFilters } from '../../../../apiMocks/data/dashboard/jobFilters';

const SkeletonBlock = ({ className }) => (
  <div
    className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`}
  />
);

export const FilterCardSkeleton = () => {
  const filterTypes = jobFilters;
  return (
    <div className="bg-white border border-gray-200 rounded-md dark:border-gray-800 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="px-4 py-3 mb-2 border-b border-b-gray-200 dark:border-b-gray-800">
        <SkeletonBlock className="w-24 h-5" />
      </div>

      {/* Each FilterType Skeleton */}
      {Object.keys(filterTypes).map((filterType) => (
        <div
          key={filterType}
          className={
            'px-4 pb-3 mb-2 border-b border-b-gray-200 dark:border-b-gray-800'
          }
        >
          {/* FilterType Title Skeleton */}
          <SkeletonBlock className="w-32 h-5 mb-2" />

          {/* Filters checkboxes skeleton */}
          <div className="space-y-2">
            {filterTypes[filterType].map((__, idx) => (
              <SkeletonBlock
                key={idx}
                className="w-full h-4 max-w-xs rounded"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
