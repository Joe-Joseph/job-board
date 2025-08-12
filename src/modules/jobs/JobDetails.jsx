import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TopBar } from '../../components/TopBar';
import {
  clearJobDetails,
  fetchJobDetails,
} from '../../store/slice/jobDetailsSlice';
import { AboutTheRole } from './components/jobDetails/AboutTheRole';
import { JobDetailsSkeleton } from './components/jobDetails/JobDetailsSkeleton';
import { PageError } from '../../components/PageError';
import { NotFoundError } from '../../components/NotFoundError';
import { JobDetailsHeader } from './components/jobDetails/JobsDetailsHeader';
import { JobsFromTheSameCompany } from './components/jobDetails/JobsFromTheSameCompany';
import { SimilarJobs } from './components/jobDetails/SimilarJobs';
import { Qualification } from './components/jobDetails/Qualification';
import { Responsibilities } from './components/jobDetails/Responsibilities';

export const JobPostDetails = () => {
  const dispatch = useDispatch();
  const { jobId: selectedJobId } = useParams();
  const jobId = Number(selectedJobId);

  const { job, loading, error } = useSelector((state) => state.jobDetails);

  useEffect(() => {
    dispatch(fetchJobDetails(jobId));

    return () => {
      dispatch(clearJobDetails());
    };
  }, [dispatch, jobId]);

  return (
    <>
      <div className="min-h-screen px-5 pb-5 bg-gray-50 dark:bg-gray-900">
        <TopBar />
        {loading ? (
          <JobDetailsSkeleton />
        ) : error ? (
          <div className="flex items-center justify-center min-h-screen">
            <PageError errorMessage={error} />
          </div>
        ) : !job ? (
          <div className="flex items-center justify-center min-h-screen">
            <NotFoundError
              title="Job not found"
              description="Try changing the job id or go to job list and select a job."
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-6 pt-20 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
                  {/* Header */}
                  <JobDetailsHeader job={job} />

                  {/* About this role */}
                  <AboutTheRole job={job} />

                  {/* Qualification */}
                  <Qualification job={job} />

                  {/* Responsibility */}
                  <Responsibilities job={job} />
                </div>
              </div>

              {/* Right sidebar */}
              <div className="space-y-6">
                {/* Similar Jobs */}
                <SimilarJobs similarJobs={job?.similarJobs} />

                {/* Other Jobs From the same company */}
                <JobsFromTheSameCompany
                  companyJobs={job?.companyJobs}
                  company={job?.company}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
