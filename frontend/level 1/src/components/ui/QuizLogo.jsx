import Logo from "../../assets/quiz-logo.svg";
import React from "react";

const allsizes = {
  small: 168,
  large: 306,
};

const QuizLogo = ({ size = "small" }) => {
  return <img src={Logo} alt="quiz logo" width={allsizes[size]} />;
};

export default QuizLogo;
