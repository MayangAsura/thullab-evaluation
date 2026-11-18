// src/store/slices/evaluationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch evaluation by ID
export const fetchEvaluation = createAsyncThunk(
  'learnings/fetchEvaluation',
  async (evaluationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/evaluations/${evaluationId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Submit evaluation answers
export const submitEvaluation = createAsyncThunk(
  'learnings/submitEvaluation',
  async ({ evaluationId, answers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/evaluations/${evaluationId}/submit`, {
        answers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Save evaluation progress
export const saveEvaluationProgress = createAsyncThunk(
  'learnings/saveProgress',
  async ({ evaluationId, answers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/evaluations/${evaluationId}/save-progress`, {
        answers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  currentEvaluation: null,
  answers: {},
  loading: false,
  submitting: false,
  error: null,
  submitSuccess: false,
  score: null,
  savedProgress: false,
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;

      // Save to localStorage as backup
      if (state.currentEvaluation) {
        localStorage.setItem(
          `evaluation_${state.currentEvaluation.id}_answers`,
          JSON.stringify(state.answers)
        );
      }
    },
    clearAnswers: (state) => {
      state.answers = {};
      if (state.currentEvaluation) {
        localStorage.removeItem(`evaluation_${state.currentEvaluation.id}_answers`);
      }
    },
    loadSavedAnswers: (state, action) => {
      const evaluationId = action.payload;
      const savedAnswers = localStorage.getItem(`evaluation_${evaluationId}_answers`);
      if (savedAnswers) {
        state.answers = JSON.parse(savedAnswers);
      }
    },
    resetEvaluation: (state) => {
      state.currentEvaluation = null;
      state.answers = {};
      state.error = null;
      state.submitSuccess = false;
      state.score = null;
      state.savedProgress = false;
    },
    setCurrentEvaluation: (state, action) => {
      state.currentEvaluation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Evaluation
      .addCase(fetchEvaluation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvaluation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvaluation = action.payload.data;

        // Load saved answers from localStorage
        const savedAnswers = localStorage.getItem(
          `evaluation_${action.payload.data.id}_answers`
        );
        if (savedAnswers) {
          state.answers = JSON.parse(savedAnswers);
        }
      })
      .addCase(fetchEvaluation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch evaluation';
      })

      // Submit Evaluation
      .addCase(submitEvaluation.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitEvaluation.fulfilled, (state, action) => {
        state.submitting = false;
        state.submitSuccess = true;
        state.score = action.payload.score;
        // Clear saved answers after successful submission
        if (state.currentEvaluation) {
          localStorage.removeItem(`evaluation_${state.currentEvaluation.id}_answers`);
        }
      })
      .addCase(submitEvaluation.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload?.message || 'Failed to submit evaluation';
      })

      // Save Progress
      .addCase(saveEvaluationProgress.pending, (state) => {
        state.savedProgress = false;
      })
      .addCase(saveEvaluationProgress.fulfilled, (state) => {
        state.savedProgress = true;
      })
      .addCase(saveEvaluationProgress.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to save progress';
      });
  },
});

export const {
  setAnswer,
  clearAnswers,
  loadSavedAnswers,
  resetEvaluation,
  setCurrentEvaluation,
} = evaluationSlice.actions;

export default evaluationSlice.reducer;