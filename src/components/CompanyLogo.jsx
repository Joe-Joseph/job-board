import { companyLogos } from '../apiMocks/data/dashboard/companyLogos';

export const CompanyLogo = ({ logo }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-900">
      {companyLogos[logo]}
    </div>
  );
};
