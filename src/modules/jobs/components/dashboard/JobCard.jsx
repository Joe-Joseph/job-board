import { useNavigate } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';
import moment from 'moment/moment';
import { Badge } from '../Badge';
import { CompanyLogo } from '../../../../components/CompanyLogo';

export const JobCard = ({
  company,
  logo,
  jobTitle,
  workStyle,
  officeLocation,
  salary,
  employmentType = 'Freelance',
  experience,
  createdAt,
  description,
  jobType,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 hover:p-[2px] hover:rounded-xl hover:bg-gradient-to-r hover:from-sky-500 hover:to-orange-400 border-gray-100 ">
      <div
        className={`flex flex-col bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border-2 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer`}
        onClick={() => navigate(`/jobs/${id}`)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CompanyLogo logo={logo} />
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300">
                {company}
              </h3>
              <p className="text-xs text-gray-500">{officeLocation}</p>
            </div>
          </div>

          <div
            className={`text-xs px-2 py-1 rounded-sm ${
              employmentType === 'Employee'
                ? 'bg-sky-500 text-white'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {employmentType}
          </div>
        </div>

        {/* Job Title */}
        <h2
          className={`text-sm font-semibold mb-4 text-gray-900 dark:text-gray-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-orange-400 hover:bg-clip-text hover:text-transparent`}
        >
          {jobTitle}
        </h2>

        <div className="flex flex-col flex-1">
          <div className="mb-5 text-sm text-gray-600 dark:text-gray-400 mx-w-96 md:mx-w-full">
            {description}
          </div>

          <div className="mt-auto">
            {/* Job Details */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge text={jobType} />
              <Badge text={workStyle} />
              <Badge text={salary} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-400">
                    {experience}
                  </p>
                  <p className="text-xs text-gray-500">
                    {moment(createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-md cursor-pointer hover:bg-black">
                Apply
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
