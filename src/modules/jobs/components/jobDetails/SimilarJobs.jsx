import { SimilarJobCard } from './SimilarJobCard';

export const SimilarJobs = ({ similarJobs }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:border dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-300">
        Similar Jobs
      </h3>
      {similarJobs?.length ? (
        <div className="space-y-4">
          {similarJobs?.map((similarJob) => (
            <SimilarJobCard key={similarJob.id} {...similarJob} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No available similar job</p>
      )}
    </div>
  );
};
