import React, { useCallback, useState } from "react";
import QuestionBubble from "../assets/question-bubble.png";
import GreenCheckMark from "../assets/check-circle-green.svg";
import QuizLogo from "./ui/QuizLogo";
import Card from "./ui/Card";
import Button from "./ui/Button";
import useQuestionContext from "../hooks/useQuestionContext.js";
import fetchQuestionAPI from "../api/fetchQuestion";
import handleError from "../utils/handleError";

const WelcomeScreen = ({ showQuestionScreen }) => {
  const [loading, setLoading] = useState(false);
  const { processQuestions } = useQuestionContext();

  const handleResponse = useCallback(
    function (responseData) {
      console.log(responseData);
      processQuestions(responseData.questions);

      //Change screen
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen]
  );

  const beginQuiz = useCallback(
    function () {
      fetchQuestionAPI(handleResponse, handleError, setLoading);
    },
    [handleResponse]
  );

  return (
    <section className="welcome-section">
      <QuizLogo size="large" />

      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} alt="" />
          <h2>Are you Ready ?</h2>
          <h3>Lets see how many questions you can answer</h3>
        </div>

        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={GreenCheckMark} alt="" />
            There are 30 Questions
          </li>
          <li className="list-item">
            <img src={GreenCheckMark} alt="" />
            You need to pick 1 answer
          </li>
        </ul>

        <Button
          size="large"
          className="btn large hover"
          onClick={beginQuiz}
          loading={loading}
          loadingText="Starting the Quiz..."
        >
          I'm Ready - Start the Quiz
        </Button>
      </Card>
    </section>
  );
};

export default WelcomeScreen;
