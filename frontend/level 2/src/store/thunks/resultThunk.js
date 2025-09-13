import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiResquest";
import {
  COMPLETED_QUIZ_ENDPOINT,
  QUIZ_ATTEMPTS_ENDPOINT,
} from "../../utils/endpoints";

export const fetchCompletedQuizAPI = createAsyncThunk(
  "result/fetchQuiz",
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({ endpoint: COMPLETED_QUIZ_ENDPOINT });

      const resJSON = await response.json();

      if (response.ok) {
        return resJSON;
      } else {
        return thunkAPI.rejectWithValue(resJSON.message);
      }
    } catch (error) {
      let sendError = "Couldn't fetch results, something went wrong...";
      if ("message" in error) {
        sendError = error.message;
      }

      return thunkAPI.rejectWithValue(sendError);
    }
  }
);

export const fetchAttemptsAPI = createAsyncThunk(
  "result/fetchAttempts",
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({ endpoint: QUIZ_ATTEMPTS_ENDPOINT });

      const resJSON = await response.json();

      if (response.ok) {
        return resJSON;
      } else {
        return thunkAPI.rejectWithValue(resJSON.message);
      }
    } catch (error) {
      let sendError =
        "Couldn't fetch quiz attempts count, something went wrong...";
      if ("message" in error) {
        sendError = error.message;
      }

      return thunkAPI.rejectWithValue(sendError);
    }
  }
);
