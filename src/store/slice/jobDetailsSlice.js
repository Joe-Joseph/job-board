import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../utils/constants';
import { createApiThunk } from '../createAsyncThunkWithAuth'; // your existing helper

// Thunk to fetch job details by ID
export const fetchJobDetails = createApiThunk('jobs/details', (jobId) => ({
  url: `/jobs/${jobId}`,
  method: 'GET',
}));

const initialState = {
  job: null,
  status: STATUS.IDLE,
  loading: false,
  error: null,
};

const jobDetailsSlice = createSlice({
  name: 'jobDetails',
  initialState,
  reducers: {
    clearJobDetails: (state) => {
      state.job = null;
      state.status = STATUS.IDLE;
      state.error = null;
      state.loading = false;
    },
    clearJobDetailsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.job = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload?.error || 'Failed to fetch job details';
        state.loading = false;
      });
  },
});

export const { clearJobDetails, clearJobDetailsError } =
  jobDetailsSlice.actions;
export default jobDetailsSlice.reducer;
