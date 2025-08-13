import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  login,
  logout,
  clearError,
} from '../../../store/slice/authSlice';
import { STATUS } from '../../../utils/constants';
import {
  fakeToken,
  loginCredentials,
  userData,
} from '../../../apiMocks/data/auth';

// Mock the createApiThunk module
// vi.mock('../createAsyncThunkWithAuth', () => ({
//   createApiThunk: (typePrefix, payloadCreator) => {
//     const { createAsyncThunk } = vi.importActual('@reduxjs/toolkit');
//     return createAsyncThunk(typePrefix, async (arg, thunkAPI) => {
//       try {
//         const config = payloadCreator(arg);
//         // Mock API call based on the config
//         if (config.url === '/login') {
//           if (arg.email === 'test@test.com' && arg.password === 'Password1!') {
//             return {
//               token: 'fake-jwt-token',
//               user: { id: 1, email: 'test@test.com', name: 'Test User' },
//             };
//           } else {
//             return thunkAPI.rejectWithValue({ error: 'Invalid credentials' });
//           }
//         }
//         return {};
//       } catch (error) {
//         return thunkAPI.rejectWithValue({ error: error.message });
//       }
//     });
//   },
// }));

describe('authSlice', () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should handle initial state correctly when no token in localStorage', () => {
      const state = store.getState().auth;
      expect(state).toEqual({
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
        status: STATUS.IDLE,
        loading: false,
      });
    });
  });

  describe('reducers', () => {
    it('should handle logout', () => {
      const initialState = {
        token: 'some-token',
        isAuthenticated: true,
        user: { id: 1, email: 'test@example.com' },
        error: null,
        status: STATUS.SUCCEEDED,
        loading: false,
      };

      const action = logout();
      const newState = authReducer(initialState, action);

      expect(newState.token).toBe(null);
      expect(newState.isAuthenticated).toBe(false);
    });

    it('should handle clearError', () => {
      const initialState = {
        token: null,
        isAuthenticated: false,
        user: null,
        error: 'Some error message',
        status: STATUS.FAILED,
        loading: false,
      };

      const action = clearError();
      const newState = authReducer(initialState, action);

      expect(newState.error).toBe(null);
    });
  });

  describe('async thunks', () => {
    it('should handle login.pending', () => {
      const action = { type: login.pending.type };
      const state = authReducer(undefined, action);

      expect(state.status).toBe(STATUS.LOADING);
      expect(state.error).toBe(null);
      expect(state.loading).toBe(true);
    });

    it('should handle login.fulfilled', async () => {
      const result = await store.dispatch(login(loginCredentials));
      // Get data from Redux store
      const state = store.getState();

      expect(state.auth.token).toBeTruthy();

      expect(result.type).toBe('auth/login/fulfilled');
      expect(state.auth.status).toBe(STATUS.SUCCEEDED);
      expect(state.auth.token).toBe(fakeToken);
      expect(state.auth.user).toEqual(userData);
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.loading).toBe(false);
    });

    it('should handle login.rejected', async () => {
      const credentials = {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      };

      const result = await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(result.type).toBe('auth/login/rejected');
      expect(state.status).toBe(STATUS.FAILED);
      expect(state.error).toBe('Invalid credentials');
      expect(state.loading).toBe(false);
    });
  });
});
