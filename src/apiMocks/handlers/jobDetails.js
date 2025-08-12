import { HttpResponse, http } from 'msw';
import { jobs } from '../data/dashboard/jobs';
import { jobDetails } from '../data/dashboard/jobDetails';

export const jobDetailsHandler = http.get('/api/jobs/:jobId', (req) => {
  const { jobId: selectedJobId } = req.params;
  const jobId = Number(selectedJobId);

  // Find job from jobs list
  const jobFound = jobs.find((j) => j.id === jobId);
  if (!jobFound) {
    return HttpResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Find job details from jobDetails object
  const details = jobDetails[jobId] || {};

  // Find similar jobs by jobTitle OR industry, exclude the current job
  const similarJobs = jobs.filter(
    (job) =>
      job.id !== jobId &&
      (job.jobTitle === jobFound.jobTitle || job.industry === jobFound.industry)
  );

  // Find jobs from the same company, exclude the current job
  const companyJobs = jobs.filter(
    (job) => job.id !== jobId && job.company === jobFound.company
  );

  // Combine basic job data and details to send back
  const response = {
    ...jobFound,
    about: details.about || '',
    qualifications: details.qualifications || [],
    responsibilities: details.responsibilities || [],
    similarJobs,
    companyJobs,
  };

  return HttpResponse.json(response);
});
