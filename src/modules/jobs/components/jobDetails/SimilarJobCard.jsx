import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { ArrowBigRightDash } from 'lucide-react';
import { CompanyLogo } from '../../../../components/CompanyLogo';

export const SimilarJobCard = ({
  jobTitle,
  company,
  officeLocation,
  jobType,
  workStyle,
  experience,
  createdAt,
  logo,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-start p-3 space-x-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-800 dark:hover:border"
      onClick={() => navigate(`/jobs/${id}`)}
    >
      <CompanyLogo logo={logo} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm text-black dark:text-gray-300">{jobTitle}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">{`${company} • ${officeLocation}`}</p>
        <div className="flex items-center mt-1 space-x-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            {jobType}
          </span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
            {workStyle}
          </span>
          <span className="text-xs text-gray-500">{experience}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {moment(createdAt).fromNow()}
        </p>
      </div>
      <ArrowBigRightDash className="w-4 h-4 text-gray-400" />
    </div>
  );
};
