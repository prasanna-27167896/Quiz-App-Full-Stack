import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_QUESTIONS_ENDPOINT,
  SUBMIT_QUIZ_ENDPOINT,
  VALIDATE_ANSWERS_ENDPOINT,
} from "../../utils/endpoints.js";
import apiRequest from "../../utils/apiResquest.js";

export const fetchQuestionsAPI = createAsyncThunk(
  "questions/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: FETCH_QUESTIONS_ENDPOINT,
      });

      const resJSON = await response.json();

      if (response.ok) {
        return resJSON;
      } else {
        return thunkAPI.rejectWithValue(resJSON.message);
      }
    } catch (error) {
      let sendError = "Couldn't fetch questions, something went wrong";

      if ("message" in error) {
        sendError = error.message;
      }
      return thunkAPI.rejectWithValue(sendError);
    }
  }
);

export const validateAnswerAPI = createAsyncThunk(
  "questions/validateAnswer",
  async (value, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: VALIDATE_ANSWERS_ENDPOINT,
        method: "POST",
        body: value,
      });

      const resJSON = await response.json();

      if (response.ok) {
        return resJSON;
      } else {
        thunkAPI.rejectWithValue(resJSON.message);
      }
    } catch (error) {
      let sendError = "Couldn't validate questions, something went wrong";

      if ("message" in error) {
        sendError = error.message;
      }

      return thunkAPI.rejectWithValue(sendError);
    }
  }
);

export const submitQuizAPI = createAsyncThunk(
  "questions/submitQuiz",
  async (thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: SUBMIT_QUIZ_ENDPOINT,
        method: "POST",
      });

      const resJSON = await response.json();

      if (response.ok) {
        return resJSON;
      } else {
        thunkAPI.rejectWithValue(resJSON.message);
      }
    } catch (error) {
      let sendError = "Couldn't submit Quiz, something went wrong";

      if ("message" in error) {
        sendError = error.message;
      }

      return thunkAPI.rejectWithValue(sendError);
    }
  }
);
