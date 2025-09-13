import React, { useCallback, useEffect, useMemo, useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import Card from "./ui/Card";
import clsx from "clsx";
import ProgressBar from "./ui/ProgressBar";
import Button from "./ui/Button";
import useQuestionContext from "../hooks/useQuestionContext";
import validateAnswerApi from "../api/validateAnswers.js";
import handleError from "../utils/handleError";
import NextArrow from "../assets/chevron-left-rounded.svg";
import correctCheckMark from "../assets/white-checkmark.svg";
import incorrectCheckMark from "../assets/incorrect-cross.svg";

function NextArrowIcon() {
  return <img src={NextArrow} alt="Next Question" />;
}

const QuestionScreen = ({ showResultScreen }) => {
  const [loading, setLoading] = useState(false);
  const [userSelectedOption, setUserSelectedOption] = useState("");

  const {
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    updateQuestionStatus,
    activeNextQuestion,
  } = useQuestionContext();

  const handleResponse = useCallback(
    (responseData) => {
      const isCorrectAnswer = responseData.status === 1;
      updateQuestionStatus(isCorrectAnswer);
    },
    [updateQuestionStatus]
  );
  console.log(activeQuestion._id);
  console.log(userSelectedOption);

  const handleClick = useCallback(
    (selectedOption) => {
      setUserSelectedOption(selectedOption.id);

      validateAnswerApi(
        activeQuestion._id,
        selectedOption,
        handleResponse,
        handleError,
        setLoading
      );
    },
    [activeQuestion._id, handleResponse]
  );

  useEffect(() => {
    setUserSelectedOption("");
  }, [activeQuestion._id]);

  const hasAttempted = Boolean(userSelectedOption);

  const ifFinalQuestion = useMemo(
    () => activeQuestionNumber === totalQuestions,
    [activeQuestionNumber, totalQuestions]
  );

  return (
    <section className="question-section">
      <QuizLogo />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">
            {`${activeQuestionNumber}/${totalQuestions}`}
          </div>
          <p className="question-text">{activeQuestion.question}</p>
          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isThisSelected = option.id === userSelectedOption;

              const isOptionCorrect =
                isThisSelected && activeQuestion.isAnswerCorrect;

              const isOptionIncorrect =
                isThisSelected && !activeQuestion.isAnswerCorrect;

              const isLoading = isThisSelected && loading;

              return (
                <button
                  className={clsx(
                    "option",
                    !hasAttempted && "not-answered",
                    isLoading && "loading",
                    isOptionCorrect && "correct-answer",
                    isOptionIncorrect && "incorrect-answer"
                  )}
                  key={activeQuestion._id + "-" + option.id}
                  onClick={() => handleClick(option)}
                  disabled={hasAttempted}
                >
                  {option.value}
                  {isThisSelected ? (
                    <span
                      className={clsx(
                        isOptionCorrect &&
                          "correct-radio".isOptionIncorrect &&
                          "incorrect-radio"
                      )}
                    >
                      {isOptionCorrect && (
                        <img src={correctCheckMark} alt="correct answer" />
                      )}
                      {isOptionIncorrect && (
                        <img src={incorrectCheckMark} alt="incorrect answer" />
                      )}
                    </span>
                  ) : (
                    <span className="unattempted-radio" />
                  )}
                </button>
              );
            })}
          </div>

          {ifFinalQuestion ? (
            <Button
              onClick={showResultScreen}
              disabled={!activeQuestion.hasAttempted}
              icon={<NextArrowIcon />}
              iconPosition="right"
              size="small"
            >
              Submit
            </Button>
          ) : (
            <Button
              disabled={!activeQuestion.hasAttempted}
              icon={<NextArrowIcon />}
              iconPosition="right"
              size="small"
              onClick={() => activeNextQuestion()}
            >
              Next
            </Button>
          )}
        </Card>
      </div>
    </section>
  );
};

export default QuestionScreen;
