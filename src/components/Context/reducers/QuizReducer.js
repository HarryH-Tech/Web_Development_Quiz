import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ERROR,
  SET_ANSWERS,
  SET_SHOW_RESULTS,
  SET_START_QUIZ,
  SET_TIMER,
  SET_CORRECT_ANSWERS,
  SET_OPEN_MODAL,
  SET_CLOSE_MODAL,
  SET_NAVBAR_COLOR,
} from "./types";

const quizReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.currentAnswer,
      };

    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case SET_ANSWERS:
      return {
        ...state,
        answers: action.answers,
      };

    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.showResults,
      };

    case SET_START_QUIZ:
      return {
        ...state,
        startQuiz: action.startQuiz,
      };

    case SET_TIMER:
      return {
        ...state,
        initialTime: 150,
        isTimerActive: true,
        timerFinished: action.timerFinished,
      };

    case SET_CORRECT_ANSWERS:
      return {
        ...state,
        correctAnswers: action.correctAnswers,
      };

    case SET_OPEN_MODAL:
      return {
        ...state,
        modal: true,
      };

    case SET_CLOSE_MODAL:
      return {
        ...state,
        modal: false,
      };

    case SET_NAVBAR_COLOR:
      return {
        ...state,
        primaryColor: action.action,
      };

    default:
      return state;
  }
};

export default quizReducer;
