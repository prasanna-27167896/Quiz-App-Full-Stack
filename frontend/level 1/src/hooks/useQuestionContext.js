import { useContext } from "react";
import QuestionContext from "../context/QuestionContext.js";

const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export default useQuestionContext;
