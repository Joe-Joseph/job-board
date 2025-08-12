import { loginHandler, signupHandler } from './auth';
import { jobApplicationHandler } from './jobApplication';
import { jobDetailsHandler } from './jobDetails';
import { getJobsHandler, jobFiltersHandler } from './jobList';

export const handlers = [
  signupHandler,
  loginHandler,
  jobFiltersHandler,
  getJobsHandler,
  jobDetailsHandler,
  jobApplicationHandler,
];
