import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createApiThunk = (typePrefix, requestConfigFn, options = {}) =>
  createAsyncThunk(
    typePrefix,
    async (arg, thunkAPI) => {
      try {
        // Get token
        const token = thunkAPI.getState().auth.token;

        const api = axios.create({
          baseURL: '/api',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const requestConfig = requestConfigFn(arg, thunkAPI);
        const { data } = await api(requestConfig);

        return data;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data || { message: err.message }
        );
      }
    },
    options
  );
