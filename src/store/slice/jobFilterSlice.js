import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../utils/constants';
import { createApiThunk } from '../createAsyncThunkWithAuth';

// Thunk to fetch filters
export const fetchFilters = createApiThunk('jobs/filters/', () => ({
  url: '/jobs/filters',
  method: 'GET',
}));

const initialState = {
  filters: {
    workStyle: [],
    jobType: [],
    industry: [],
  },
  status: STATUS.IDLE,
  loading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    clearFiltersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.status = STATUS.LOADING;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.filters = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload?.error || 'Failed to fetch filters';
        state.loading = false;
      });
  },
});

export const { clearFiltersError } = filtersSlice.actions;
export default filtersSlice.reducer;
