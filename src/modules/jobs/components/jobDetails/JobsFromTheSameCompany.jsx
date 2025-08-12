import { SimilarJobCard } from './SimilarJobCard';

export const JobsFromTheSameCompany = ({ companyJobs, company }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-300">
        {`Other Jobs From ${company}`}
      </h3>
      {companyJobs?.length ? (
        <div className="space-y-4">
          {companyJobs?.map((job) => (
            <SimilarJobCard key={job.id} {...job} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No other available job</p>
      )}
    </div>
  );
};
