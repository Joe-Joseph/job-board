import qs from 'qs';
import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../utils/constants';
import { createApiThunk } from '../createAsyncThunkWithAuth';

// Fetch jobs thunk
export const fetchJobs = createApiThunk(
  'jobs/',
  ({ filters = {}, page = 1, limit = 4 }) => ({
    url: '/jobs',
    method: 'GET',
    params: { ...filters, page, limit },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  })
);

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

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearJobsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.jobs = action.payload.data;
        state.workStyleCounts = action.payload.workStyleCounts;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload?.error || 'Failed to fetch jobs';
        state.loading = false;
      });
  },
});

export const { setFilters, clearFilters, setPage, clearJobsError } =
  jobsSlice.actions;
export default jobsSlice.reducer;
