export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

export const FILTERS_CATEGORIES = {
  WORK_STYLE: { key: 'workStyle', label: 'Work style' },
  JOB_TYPE: { key: 'jobType', label: 'Job type' },
  INDUSTRY: { key: 'industry', label: 'Industry' },
};

export const WORK_STYLE = {
  ONSITE: 'Onsite',
  REMOTE: 'Remote',
  HYBRID: 'Hybrid',
};

export const MAXIMUM_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const SUPPORTED_FILE_FORMATS = ['application/pdf'];
