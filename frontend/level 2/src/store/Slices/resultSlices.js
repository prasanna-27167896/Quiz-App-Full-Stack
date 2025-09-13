import { createSlice } from "@reduxjs/toolkit";
import { fetchAttemptsAPI, fetchCompletedQuizAPI } from "../thunks/resultThunk";

const initialState = {
  status: false,
  inCorrectAnswers: [],
  correctAnswers: [],
  attempts: 0,
  loading: true,
  error: null,
};

const resultSLice = createSlice({
  name: "result",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCompletedQuizAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = false;
    });

    builder.addCase(fetchCompletedQuizAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.correctAnswers = action.payload.correct_questions;
      state.inCorrectAnswers = action.payload.incorrect_questions;
    });

    builder.addCase(fetchCompletedQuizAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(fetchAttemptsAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAttemptsAPI.fulfilled, (state, action) => {
      state.attempts = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchAttemptsAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default resultSLice.reducer;
