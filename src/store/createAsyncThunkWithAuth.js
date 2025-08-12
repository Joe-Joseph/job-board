import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createApiThunk = (typePrefix, requestConfigFn, options = {}) =>
  createAsyncThunk(
    typePrefix,
    async (arg, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token; // Get token here
        const api = axios.create({
          baseURL: '/api',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const { data } = await api(requestConfigFn(arg, thunkAPI));
        return data;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data || { message: err.message }
        );
      }
    },
    options
  );
