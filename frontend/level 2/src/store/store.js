import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js";
import questionsReducer from "./Slices/questionsSlice.js";
import resultReducer from "./Slices/resultSlices.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
    result: resultReducer,
  },
});

export default store;
