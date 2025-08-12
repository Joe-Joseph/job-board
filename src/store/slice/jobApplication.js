import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../utils/constants';
import { createApiThunk } from '../createAsyncThunkWithAuth';

// Thunk: Submit Job Application
export const submitJobApplication = createApiThunk(
  'jobApplication/submit',
  (applicationValues) => {
    return {
      url: '/job/application',
      method: 'POST',
      data: applicationValues,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
);

const initialState = {
  status: STATUS.IDLE,
  loading: false,
  error: null,
  successMessage: null,
  submittedApplication: null,
};

const jobApplicationSlice = createSlice({
  name: 'jobApplication',
  initialState,
  reducers: {
    clearApplicationState: (state) => {
      state.status = STATUS.IDLE;
      state.error = null;
      state.successMessage = null;
      state.submittedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitJobApplication.pending, (state) => {
        state.status = STATUS.LOADING;
        state.loading = true;
        state.error = null;
      })
      .addCase(submitJobApplication.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.loading = false;
        state.successMessage = action.payload?.message;
        state.submittedApplication = action.payload?.application;
      })
      .addCase(submitJobApplication.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.loading = false;
        state.error = action.payload?.error || 'Something went wrong';
      });
  },
});

export const { clearApplicationState } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
