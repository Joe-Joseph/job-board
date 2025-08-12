import { useNavigate } from 'react-router-dom';

import { Badge } from '../Badge';
import { CompanyLogo } from '../../../../components/CompanyLogo';

export const JobDetailsHeader = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:space-y-0">
      <div className="flex items-start space-x-4">
        <CompanyLogo logo={job?.logo} />
        <div>
          <h2 className="mb-1 font-semibold text-gray-900 text-md dark:text-gray-300">
            {job?.jobTitle}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-medium">{job?.company}</span>
              <span>•</span>
              <span className="text-sm">{job?.officeLocation}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-2 space-x-2 text-sm md:space-x-4">
            <Badge text={job?.jobType} />
            <Badge text={job?.workStyle} />
            <span className="text-xs text-gray-600">{job?.experience}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-md cursor-pointer hover:bg-black"
          onClick={() => navigate('application')}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};
