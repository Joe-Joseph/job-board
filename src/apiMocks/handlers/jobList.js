import { http, HttpResponse } from 'msw';
import { jobFilters } from '../data/dashboard/jobFilters';
import { jobs } from '../data/dashboard/jobs';

export const jobFiltersHandler = http.get('/api/jobs/filters', async () => {
  return HttpResponse.json(jobFilters);
});

// GET jobs
export const getJobsHandler = http.get('/api/jobs', (req) => {
  const url = new URL(req.request.url);

  const search = url.searchParams.get('search');
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '4';
  const workStyles = url.searchParams.getAll('workStyle');
  const jobTypes = url.searchParams.getAll('jobType');
  const industries = url.searchParams.getAll('industry');

  const workStyleCounts = jobs.reduce((acc, job) => {
    const style = job.workStyle.toLowerCase();
    acc[style] = (acc[style] || 0) + 1;
    return acc;
  }, {});

  let filteredJobs = [...jobs];

  // Filters (case-insensitive)
  if (search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.officeLocation.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (workStyles.length) {
    filteredJobs = filteredJobs.filter((job) =>
      workStyles.some((ws) => ws.toLowerCase() === job.workStyle.toLowerCase())
    );
  }

  if (jobTypes.length) {
    filteredJobs = filteredJobs.filter((job) =>
      jobTypes.some((jt) => jt.toLowerCase() === job.jobType.toLowerCase())
    );
  }

  if (industries.length) {
    filteredJobs = filteredJobs.filter((job) =>
      industries.some((ind) => ind.toLowerCase() === job.industry.toLowerCase())
    );
  }

  // Pagination
  const currentPage = Number(page);
  const itemsPerPageLimit = Number(limit);
  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / itemsPerPageLimit);
  const startIndex = (currentPage - 1) * itemsPerPageLimit;
  const endIndex = startIndex + itemsPerPageLimit;
  const data = filteredJobs.slice(startIndex, endIndex);

  return HttpResponse.json({
    status: 200,
    data,
    totalItems: total,
    currentPage,
    totalPages,
    workStyleCounts,
  });
});
