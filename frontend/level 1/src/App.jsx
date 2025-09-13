import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import QuestionProvider from "./context/QuestionContextProvider";

const App = () => {
  const [viewScreen, setViewScreen] = useState("welcome");

  const showQuestionScreen = () => {
    setViewScreen("question");
  };

  const showResultScreen = () => {
    setViewScreen("result");
  };

  return (
    <>
      <QuestionProvider>
        <div>
          {viewScreen === "welcome" && (
            <WelcomeScreen showQuestionScreen={showQuestionScreen} />
          )}
        </div>
        ;
        <div>
          {viewScreen === "question" && (
            <QuestionScreen showResultScreen={showResultScreen} />
          )}
        </div>
        ;
        <div>
          {viewScreen === "result" && (
            <ResultScreen showQuestionScreen={showQuestionScreen} />
          )}
        </div>
      </QuestionProvider>
    </>
  );
};

export default App;
