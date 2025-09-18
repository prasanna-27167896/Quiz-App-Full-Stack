import React, { useCallback, useEffect, useMemo, useState } from "react";
import useResultState from "../hooks/useResultState";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAttemptsAPI,
  fetchCompletedQuizAPI,
} from "../store/thunks/resultThunk";
import { routes } from "../App";
import Navbar from "./Navbar";

const ResultPage = () => {
  const [displayCorrectAnswers, setDisplayCorrectAnswers] = useState(false);

  const {
    inCorrectAnswers,
    correctAnswers,
    attempts,
    noOfCorrectAnswers,
    noOfInCorrectAnswers,
    totalQuestions,
    status,
    loading,
    error,
  } = useResultState();

  //If there are no incorrect answers, then display correct answers by default

  useEffect(() => {
    if (status && !noOfInCorrectAnswers) {
      setDisplayCorrectAnswers(true);
    }
  }, [noOfInCorrectAnswers, status]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCompletedQuizAPI());
    dispatch(fetchAttemptsAPI());
  }, [dispatch]);

  const correctPercentage = useMemo(() => {
    return Math.floor((noOfCorrectAnswers / totalQuestions) * 100);
  }, [noOfCorrectAnswers, totalQuestions]);

  const handleReset = useCallback(() => {
    navigate(routes.protectedRoutes.questions);
  }, [navigate]);

  const displayQuestions = useMemo(() => {
    if (noOfInCorrectAnswers === 0) {
      return correctAnswers;
    }
    return displayCorrectAnswers ? correctAnswers : inCorrectAnswers;
  }, [displayCorrectAnswers, correctAnswers, inCorrectAnswers]);

  console.log(displayQuestions);

  if (loading) {
    return (
      <>
        <div className="flex flex-col h-screen">
          <span className=" loading loading-infinity loading-xl m-auto"></span>
        </div>
      </>
    );
  }
  if (Boolean(error)) {
    return (
      <>
        <div className="flex flex-col h-screen">
          <div className="badge badge-error badge-xl m-auto">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="h-screen bg-slate-950 bg-[radial-gradient(circle_400px_at_50%_300px,#3e3e3e,transparent)] text-white flex flex-col">
      {/* Navbar */}
      <Navbar handleReset={handleReset} />

      {/* Main Content */}
      <div className="flex flex-1 p-4 sm:p-6 gap-4 sm:gap-6 overflow-hidden flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-1/3 w-full bg-slate-900/70 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-700 flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-300 text-center mb-4 sm:mb-6">
            Score Board
          </h2>
          <h2 className="text-base sm:text-xl font-semibold text-blue-300 text-center mb-6">
            You Have Played{" "}
            <span className="text-white font-bold text-2xl sm:text-3xl">
              {attempts.attempts}
            </span>{" "}
            Quizzes
          </h2>

          {/* Circular Progress */}
          <div className="relative flex justify-center my-4">
            <div
              className="radial-progress text-blue-500"
              style={{ "--value": correctPercentage }}
              role="progressbar"
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-blue-300">
                {noOfCorrectAnswers}
              </span>
              <span className="text-xs text-slate-400">Score</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-slate-800/70 p-2 sm:p-3 rounded-lg text-center hover:scale-105 transition">
              <p className="text-purple-300 font-bold text-sm sm:text-base">
                100%
              </p>
              <p className="text-xs sm:text-sm">Completions</p>
            </div>
            <div className="bg-slate-800/70 p-2 sm:p-3 rounded-lg text-center hover:scale-105 transition">
              <p className="text-blue-300 font-bold text-sm sm:text-base">
                {totalQuestions}
              </p>
              <p className="text-xs sm:text-sm">Questions</p>
            </div>
            <div
              className="bg-slate-800/70 p-2 sm:p-3 rounded-lg text-center hover:scale-105 transition cursor-pointer"
              onClick={() => setDisplayCorrectAnswers(true)}
            >
              <p className="text-green-400 font-bold text-sm sm:text-base">
                {noOfCorrectAnswers}
              </p>
              <p className="text-xs sm:text-sm">Correct</p>
            </div>
            <div
              className="bg-slate-800/70 p-2 sm:p-3 rounded-lg text-center hover:scale-105 transition cursor-pointer"
              onClick={() => setDisplayCorrectAnswers(false)}
            >
              <p className="text-red-400 font-bold text-sm sm:text-base">
                {noOfInCorrectAnswers}
              </p>
              <p className="text-xs sm:text-sm">Wrong</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:w-2/3 w-full bg-slate-900/70 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-700 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-800">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-300 mb-4">
            Your Answers
          </h2>

          {loading || !displayQuestions?.length ? (
            <div className="flex justify-center items-center h-24">
              <span>Loading...</span>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {displayQuestions.map((q, index) => (
                <div
                  key={`${q.question_id}-${index}`}
                  className="bg-slate-800/60 rounded-lg p-3 sm:p-4 border border-slate-700 hover:scale-[1.01] transition"
                >
                  <p className="font-medium text-slate-200 mb-2 text-sm sm:text-base break-words">
                    {index + 1}. {q.question}
                  </p>

                  {displayCorrectAnswers ? (
                    <p className="text-green-400 bg-green-900/40 p-2 rounded mb-2 text-sm sm:text-base break-words">
                      ✅ Selected: {q.submitted_answer.value}
                    </p>
                  ) : (
                    <>
                      <p className="text-red-400 bg-red-900/40 p-2 rounded mb-2 text-sm sm:text-base break-words">
                        ❌ Selected: {q.submitted_answer.value}
                      </p>
                      <p className="text-green-400 bg-green-900/40 p-2 rounded text-sm sm:text-base break-words">
                        ✅ Correct: {q.answer.value}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
