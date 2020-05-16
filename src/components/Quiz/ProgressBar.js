import React, { useContext } from "react";
import { Progress } from "semantic-ui-react";
import QuizContext from "../Context/QuizContext";

const ProgressBar = () => {
  const { state } = useContext(QuizContext);
  const { currentQuestion, questionList } = state;
  let percentUploaded = (
    (currentQuestion / questionList.length) *
    100
  ).toFixed();

  return (
    <>
      <h3>
        Question {currentQuestion + 1} of {questionList.length}
      </h3>
      <Progress percent={percentUploaded} progress />
    </>
  );
};

export default ProgressBar;
