import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FilterType } from './FilterType';
import { FILTERS_CATEGORIES } from '../../../../utils/constants';

export const FilterCard = ({ selectedFilters, onFilterChange }) => {
  const { filters } = useSelector((state) => state.filters);

  const [openSections, setOpenSections] = useState({
    workStyle: true,
    jobType: true,
    industry: true,
  });

  useEffect(() => {
    const updateSections = () => {
      const isDesktop = window.matchMedia('(min-width: 900px)').matches; // Tailwind lg breakpoint
      setOpenSections({
        workStyle: isDesktop,
        jobType: isDesktop,
        industry: isDesktop,
      });
    };

    updateSections(); // Run once on mount
    window.addEventListener('resize', updateSections);

    return () => {
      window.removeEventListener('resize', updateSections);
    };
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const workStyleFilters = filters?.workStyle;
  const jobTypeFilters = filters?.jobType;
  const industryFilters = filters?.industry;

  return (
    <div className="bg-white border border-gray-200 rounded-md dark:border-gray-800 dark:bg-gray-900">
      <div className="px-4 py-3 border-b border-b-gray-200 dark:border-b-gray-800">
        <h2 className="font-semibold text-gray-800 dark:text-gray-300 text-md">
          Filter
        </h2>
      </div>

      {/* Work style */}
      <FilterType
        toggleSection={() => toggleSection(FILTERS_CATEGORIES.WORK_STYLE.key)}
        filterType={FILTERS_CATEGORIES.WORK_STYLE.label}
        isOpen={openSections.workStyle}
        filters={workStyleFilters}
        category={FILTERS_CATEGORIES.WORK_STYLE.key}
        selected={selectedFilters.workStyle || []}
        onFilterChange={onFilterChange}
      />

      {/* Job Type */}
      <FilterType
        toggleSection={() => toggleSection(FILTERS_CATEGORIES.JOB_TYPE.key)}
        filterType={FILTERS_CATEGORIES.JOB_TYPE.label}
        isOpen={openSections.jobType}
        filters={jobTypeFilters}
        category={FILTERS_CATEGORIES.JOB_TYPE.key}
        selected={selectedFilters.jobType || []}
        onFilterChange={onFilterChange}
      />

      {/* Industry */}
      <FilterType
        toggleSection={() => toggleSection(FILTERS_CATEGORIES.INDUSTRY.key)}
        filterType={FILTERS_CATEGORIES.INDUSTRY.label}
        isOpen={openSections.industry}
        filters={industryFilters}
        category={FILTERS_CATEGORIES.INDUSTRY.key}
        selected={selectedFilters.industry || []}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};
