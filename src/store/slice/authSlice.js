import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../utils/constants';
import { createApiThunk } from '../createAsyncThunkWithAuth';

const token = localStorage.getItem('token');

// Thunks
export const login = createApiThunk('auth/login', (credentials) => ({
  url: '/login',
  method: 'POST',
  data: credentials,
}));

export const signup = createApiThunk('auth/signup', (newUser) => ({
  url: '/signup',
  method: 'POST',
  data: newUser,
}));

const initialState = {
  token: token || null,
  isAuthenticated: !!token,
  user: null,
  error: null,
  status: STATUS.IDLE,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    [login, signup].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = STATUS.LOADING;
          state.error = null;
          state.loading = true;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.status = STATUS.SUCCEEDED;
          state.user = action.payload?.user;
          state.token = action.payload?.token;
          state.isAuthenticated = action.payload?.token ? true : false;
          action.payload?.token &&
            localStorage.setItem('token', action.payload.token);

          action.payload?.token &&
            localStorage.setItem('user', JSON.stringify(action.payload?.user));
          state.loading = false;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = STATUS.FAILED;
          state.error = action.payload?.error || 'Something went wrong';
          state.loading = false;
        });
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
