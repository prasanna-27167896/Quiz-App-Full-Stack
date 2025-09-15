import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../App";
import useQuestionState from "../hooks/useQuestionState";
import { useDispatch } from "react-redux";
import {
  fetchQuestionsAPI,
  submitQuizAPI,
  validateAnswerAPI,
} from "../store/thunks/questionsThunk";
import { activeNextQuestion } from "../store/Slices/questionsSlice";
import Navbar from "./Navbar";

export default function QuestionPage() {
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false); // prevents further selection after answering

  const {
    activeQuestion,
    activeQuestionId,
    activeQuestionNum,
    totalQuestions,
    loading,
    error,
    isValidatingAnswer,
    isSubmittingQuiz,
  } = useQuestionState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestionsAPI());
  }, [dispatch]);

  const handleOptionClick = useCallback(
    async (selectedOption) => {
      if (isAnswered || isValidatingAnswer) return;

      setUserSelectedOption(selectedOption);

      try {
        await dispatch(
          validateAnswerAPI({
            questionId: activeQuestionId,
            answer: selectedOption,
          })
        ).unwrap();

        setIsAnswered(true);
      } catch (error) {
        console.error("Error validating answer", error);
        setIsAnswered(true);
      }
    },
    [activeQuestionId, dispatch, isAnswered, isValidatingAnswer]
  );

  const isFinalQuestion = useMemo(
    () => activeQuestionNum === totalQuestions,
    [activeQuestionNum, totalQuestions]
  );

  const moveForward = useCallback(() => {
    if (isFinalQuestion) {
      dispatch(submitQuizAPI());
      navigate(routes.protectedRoutes.result);
    } else {
      dispatch(activeNextQuestion());
      setIsAnswered(false);
      setUserSelectedOption(null);
    }
  }, [dispatch, isFinalQuestion, navigate]);

  if (loading || !activeQuestionId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  if (Boolean(error)) {
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Progress Bar */}
      <progress
        className="progress text-cyan-400 w-full mt-2"
        value={activeQuestionNum}
        max={totalQuestions}
      ></progress>

      {/* Question Section */}
      <div className="flex flex-col items-center flex-1 py-8 sm:py-12 px-4">
        {/* Counter */}
        <div className="rounded-full bg-primary text-primary-content w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-sm sm:text-lg font-bold -mt-9 mb-3">
          {activeQuestionNum}/{totalQuestions}
        </div>

        {/* Card */}
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-center mb-6 break-words">
            {activeQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 w-full">
            {activeQuestion.options.map((option) => {
              const isThisSelected =
                userSelectedOption?._id === option.id ||
                userSelectedOption?.id === option.id;

              const isCorrect =
                activeQuestion.answer_status === "right" && isThisSelected;

              const isValidating = isValidatingAnswer && isThisSelected;

              const getOptionStyle = () => {
                if (!isAnswered) {
                  if (isValidating && isThisSelected) {
                    return "bg-warning/20 border-warning animate-pulse";
                  }
                  return "hover:bg-base-200 transition-colors duration-200 border-base-300";
                }

                if (isThisSelected) {
                  return isCorrect
                    ? "bg-success text-success-content border-success"
                    : "bg-error text-error-content border-error";
                } else if (
                  activeQuestion.answer_status === "right" &&
                  option.id === activeQuestion.correct_answer_id
                ) {
                  return "bg-success/20 border-success";
                }

                return "bg-base-100 border-base-300";
              };

              const getCursorStyle = () => {
                if (isAnswered || isValidating) return "cursor-not-allowed";
                return "cursor-pointer";
              };

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-left transition-all text-sm sm:text-base ${getOptionStyle()} ${getCursorStyle()}`}
                  disabled={isValidatingAnswer}
                >
                  {option.value}
                </button>
              );
            })}
          </div>

          {/* Next / Submit Button */}
          <button
            className={`btn ${
              isFinalQuestion ? "btn-success" : "btn-primary"
            } ${isSubmittingQuiz ? "loading" : ""} w-full mt-6`}
            onClick={moveForward}
            disabled={!isAnswered || isSubmittingQuiz}
          >
            {isSubmittingQuiz
              ? "Submitting..."
              : isFinalQuestion
              ? "Submit Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
