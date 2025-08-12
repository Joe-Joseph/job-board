import { CompanyLogo } from '../../../../components/CompanyLogo';

export const JobApplicationHeader = ({ job }) => {
  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-2">
          <CompanyLogo logo={job?.logo} />
          <div>
            <h1 className="font-bold text-gray-900 dark:text-gray-300 text-md">
              {job?.jobTitle}
            </h1>
            <div className="flex items-center space-x-1 text-gray-600">
              <span className="text-sm font-medium">{job?.company}</span>
              <span>•</span>
              <span className="text-sm">{job?.officeLocation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
