import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionContext from "../context/QuestionContext.js";

export default function QuestionProvider({ children }) {
  //API callling, Functions, Properties
  const [questions, setQuestions] = useState([]);
  const [activeQuestionId, setActiveQuestionId] = useState("");

  const processQuestions = useCallback(
    (questionAPIResponse) => {
      setQuestions(
        questionAPIResponse.map((question) => ({
          ...question,
          hasAttempted: false,
          isAnswerCorrect: false,
        }))
      );
      setActiveQuestionId(questionAPIResponse[0]._id);
    },
    [setActiveQuestionId, setQuestions]
  );

  const activeQuestion = useMemo(() =>
    questions.find(
      (question) => question._id === activeQuestionId,
      [activeQuestionId, questions]
    )
  );

  const activeQuestionNumber = useMemo(
    () =>
      questions.findIndex((question) => question._id === activeQuestionId) + 1,
    [activeQuestionId, questions]
  );

  const totalQuestions = useMemo(() => questions.length, [questions]);

  const updateQuestionStatus = useCallback(
    (isAnswerCorrect) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === activeQuestionId
            ? { ...question, hasAttempted: true, isAnswerCorrect }
            : question
        )
      );
    },
    [activeQuestionId]
  );

  useEffect(() => {
    //This code will run AFTER the component re-renders due to 'questions' changing
    console.log("Question state have been updated", questions);
    //check the console here to see if hasAttempted is true for the correct answer
  }, [questions]);

  //Fuction to update active QuestionId
  const activeNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex(
      (question) => question._id === activeQuestionId
    );

    if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
      setActiveQuestionId(questions[currentIndex + 1]._id);
    }
  }, [activeQuestionId, questions]);

  //Function to find out no. of correct answers
  const correctAnswers = useMemo(() => {
    const noOfCorrectAnswers = questions.filter(
      (question) => question.isAnswerCorrect === true
    ).length;

    return noOfCorrectAnswers;
  }, [questions]);

  const contextValue = useMemo(
    () => ({
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      correctAnswers,
      processQuestions,
      updateQuestionStatus,
      activeNextQuestion,
    }),
    [
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      correctAnswers,
      processQuestions,
      updateQuestionStatus,
      activeNextQuestion,
    ]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
}
