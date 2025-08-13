import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from '../../../store/slice/authSlice';

import jobListReducer, {
  setFilters,
  clearFilters,
  setPage,
  clearJobsError,
  fetchJobs,
} from '../../../store/slice/jobListSlice';
import { STATUS } from '../../../utils/constants';
import { loginCredentials } from '../../../apiMocks/data/auth';

describe('jobListSlice', () => {
  let store;

  beforeEach(async () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        jobs: jobListReducer,
      },
    });

    await store.dispatch(login(loginCredentials));
  });

  describe('initial state', () => {
    it('should handle initial state correctly', () => {
      const state = store.getState().jobs;

      const initialState = {
        jobs: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        filters: {},
        status: STATUS.IDLE,
        loading: false,
        error: null,
        workStyleCounts: { onsite: 0, remote: 0, hybrid: 0 },
      };
      expect(state).toEqual(initialState);
    });
  });

  describe('Slices', () => {
    it('should handle clear jobs error', () => {
      const initialState = {
        jobs: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        filters: {},
        status: STATUS.IDLE,
        loading: false,
        error: 'Error available',
        workStyleCounts: { onsite: 0, remote: 0, hybrid: 0 },
      };

      const action = clearJobsError();
      const newState = jobListReducer(initialState, action);

      expect(newState.error).toBe(null);
    });

    it('should handle select filters', async () => {
      const filters = { workStyle: ['Hybrid'], jobType: ['Full Time'] };
      await store.dispatch(setFilters(filters));

      const state = store.getState()?.jobs;

      const filterResultForJobType = state.jobs.every(
        (job) => job.jobType === 'Full Time'
      );
      const filterResultForWorkStyle = state.jobs.every(
        (job) => job.jobType === 'Hybrid'
      );

      expect(state.filters).toMatchObject(filters);

      expect(filterResultForJobType).toBeTruthy();
      expect(filterResultForWorkStyle).toBeTruthy();
    });
  });

  describe('Fetching Jobs', () => {
    it('should handle pending jobs fetch', () => {
      const action = { type: fetchJobs.pending.type };
      const state = jobListReducer(undefined, action);

      expect(state.status).toBe(STATUS.LOADING);
      expect(state.error).toBe(null);
      expect(state.loading).toBe(true);
    });

    it('should handle get job list', async () => {
      const result = await store.dispatch(
        fetchJobs({
          filters: {},
          page: 1,
          limit: 4,
        })
      );
      // Get data from Redux store
      const state = store.getState()?.jobs;

      expect(result.type).toBe('jobs//fulfilled');
      expect(state.status).toBe(STATUS.SUCCEEDED);
      expect(state.loading).toBe(false);
      expect(state.jobs.length).toBeGreaterThan(0);
    });
  });
});
