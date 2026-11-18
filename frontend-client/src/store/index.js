// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import learningReducer from './slices/learningSlice';
import evaluationReducer from './slices/evaluationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    learning: learningReducer,
    evaluation: evaluationReducer,
  },
});

// export default store;