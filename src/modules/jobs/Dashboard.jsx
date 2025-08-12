import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JobTypeCards } from './components/dashboard/JobTypeCards';
import {
  clearFiltersError,
  fetchFilters,
} from '../../store/slice/jobFilterSlice';
import {
  clearJobsError,
  fetchJobs,
  setFilters,
  setPage,
} from '../../store/slice/jobListSlice';
import JobTypeCardsSkeleton from './components/dashboard/JobTypeSkeleton';
import { TopBar } from '../../components/TopBar';
import { NotFoundError } from '../../components/NotFoundError';
import { PageError } from '../../components/PageError';
import { JobCardSkeleton } from './components/dashboard/JobCardSkeleton';
import { JobCard } from './components/dashboard/JobCard';
import { FilterCard } from './components/dashboard/FilterCard';
import { FilterCardSkeleton } from './components/dashboard/FilterCardSkeleton';
import { Pagination } from './components/dashboard/Pagination';

export const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading: loadingFilters, error: filtersError } = useSelector(
    (state) => state.filters
  );
  const {
    jobs,
    currentPage,
    totalPages,
    loading: loadingJobs,
    error: jobsError,
    filters,
    workStyleCounts,
  } = useSelector((state) => state.jobs);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch jobs
  const getJobs = async (page = currentPage) => {
    dispatch(clearJobsError());
    try {
      await dispatch(
        fetchJobs({
          filters,
          page,
          limit: 4,
        })
      ).unwrap();
    } catch (error) {
      console.error('Fetching Jobs Error: ', error);
    }
  };

  //Fetch job filters
  const getJobFilters = async () => {
    dispatch(clearFiltersError());
    try {
      await dispatch(fetchFilters()).unwrap();
    } catch (error) {
      console.error('Fetching Filters Error: ', error);
    }
  };

  useEffect(() => {
    getJobFilters();
  }, []);

  useEffect(() => {
    getJobs(currentPage);
  }, [currentPage]);

  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (JSON.stringify(prevFilters) !== JSON.stringify(filters)) {
      dispatch(setPage(1));
      getJobs(1);
    }
    prevFiltersRef.current = filters;
  }, [filters]);

  return (
    <div className="min-h-screen px-5 pb-5 bg-gray-50 dark:bg-gray-900">
      {/* Top bar */}
      <TopBar />

      <div className="grid grid-cols-1 gap-4 pt-16 pb-5 mx-auto max-w-7xl md:grid-cols-4">
        {/* Filter Column */}
        {!filtersError ? (
          <div className="sticky mt-6 max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
            {loadingFilters ? (
              <FilterCardSkeleton />
            ) : (
              <FilterCard
                selectedFilters={filters}
                onFilterChange={(category, value, checked) => {
                  dispatch(
                    setFilters({
                      ...filters,
                      [category]: checked
                        ? [...(filters[category] || []), value]
                        : (filters[category] || []).filter((v) => v !== value),
                    })
                  );
                }}
              />
            )}
          </div>
        ) : null}

        {/* Jobs Column */}
        <div className="md:col-span-3">
          {loadingJobs ? (
            <JobTypeCardsSkeleton />
          ) : (
            <JobTypeCards counts={workStyleCounts} />
          )}

          {jobsError ? (
            <div className="flex items-center justify-center mt-20">
              <PageError errorMessage={jobsError} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {loadingJobs ? (
                  <JobCardSkeleton />
                ) : (
                  jobs?.map((job) => <JobCard key={job.id} {...job} />)
                )}
              </div>

              {!loadingJobs && jobs.length === 0 && (
                <div className="flex items-center justify-center mt-20">
                  <NotFoundError
                    title="No jobs found"
                    description="Try adjusting your filters or search to find what you’re looking for."
                  />
                </div>
              )}

              {!loadingJobs && jobs.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
