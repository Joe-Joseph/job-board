import { jobs } from '../data/dashboard/jobs';

export const getFilteredJobs = (filterValue) => {
  const filteredJobs = jobs.filter(
    (job) => job.workStyle.toLowerCase() === filterValue.toLowerCase()
  );

  return filteredJobs;
};
