import { CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearApplicationState } from '../../../store/slice/jobApplication';

export const JobApplicationSubmissionSuccess = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="p-8 text-center bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800"
      data-testid={'successJobApplicationComponent'}
    >
      <div className="flex justify-center pb-5">
        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 transition-all duration-500 transform rounded-full shadow-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:scale-110">
            <CheckCircle className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-ping opacity-20"></div>
        </div>
      </div>
      <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-300 text-md">
        Application Submitted Successfully!
      </h2>
      <p className="max-w-2xl mx-auto mb-6 text-sm text-gray-600 dark:text-gray-400">
        {`Thank you for applying to the ${job?.jobTitle} position at ${job?.company}. We'll review your application and get back to you within
                5 business days.`}
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => {
            dispatch(clearApplicationState());
            navigate(-1);
          }}
          className="px-6 py-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-md cursor-pointer md:w-52 hover:bg-black"
        >
          Back to Job Details
        </button>
      </div>
    </div>
  );
};
