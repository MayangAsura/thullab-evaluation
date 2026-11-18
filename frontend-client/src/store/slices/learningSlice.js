// src/store/slices/learningSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchLearnings = createAsyncThunk(
  'learning/fetchLearnings',
  async (status, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/learnings?status=${status}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const learningSlice = createSlice({
  name: 'learning',
  initialState: {
    inProgress: [],
    completed: [],
    achievements: [],
    certificates: [],
    currentLearning: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentLearning: (state, action) => {
      state.currentLearning = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearnings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLearnings.fulfilled, (state, action) => {
        state.loading = false;
        const { status, data } = action.payload;
        if (status === 'in-progress') state.inProgress = data;
        else if (status === 'completed') state.completed = data;
        else if (status === 'achievements') state.achievements = data;
        else if (status === 'certificates') state.certificates = data;
      })
      .addCase(fetchLearnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentLearning } = learningSlice.actions;
export default learningSlice.reducer;