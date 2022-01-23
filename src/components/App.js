import React, { useContext, useReducer } from 'react';
import './App.css';
import { Segment, Button, Icon, Grid, Divider } from 'semantic-ui-react';
import QuizContext from './Context/QuizContext';
import firebase from '../firebase';

//Custom Component Imports
import { AuthContext } from './Context/Auth';
import ProgressBar from './Quiz/ProgressBar';
import Question from './Quiz/Question';
import Answers from './Quiz/Answers';
import Timer from './Quiz/Timer';
import WelcomePage from './WelcomePage';
import Navbar from './Navbar';
import ColorModal from './ColorModal';

import { questionList } from './Quiz/QuestionList';

import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ERROR,
  SET_ANSWERS,
  SET_SHOW_RESULTS,
  SET_START_QUIZ,
  SET_TIMER,
  SET_CORRECT_ANSWERS,
} from './Context/reducers/types';

import quizReducer from './Context/reducers/QuizReducer';

const App = () => {
  const initialState = {
    questionList,
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    showResults: false,
    error: '',
    startQuiz: false,
    timerFinished: false,
    correctAnswers: 0,
    modal: false,
    primaryColor: '#4444FF',
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    error,
    startQuiz,
    timerFinished,
    correctAnswers,
    modal,
  } = state;

  const userContext = useContext(AuthContext);
  const { currentUser } = userContext;

  const showError = () => {
    if (!error) {
      return;
    }

    return (
      <Divider horizontal>
        <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>
      </Divider>
    );
  };

  const question = questionList[currentQuestion];

  const next = () => {
    const answer = { questionId: question.number, answer: currentAnswer };

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: 'Please Select An Option' });
      return;
    }

    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers: answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < questionList.length) {
      if (answer.answer === question.correct) {
        dispatch({
          type: SET_CORRECT_ANSWERS,
          correctAnswers: correctAnswers + 1,
        });
      }
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }
    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  const showResultsData = () => {
    return answers.map((answer) => {
      const question = questionList.find(
        (question) => question.number === answer.questionId
      );

      return (
        <Segment size="huge" key={question.number}>
          <div style={{ textAlign: 'center' }}>
            {question.question} - {showResultMark(question, answer)}
            <br />
            <br />
            <br />
          </div>
        </Segment>
      );
    });
  };

  const showResultMark = (question, answer) => {
    if (question.correct === answer.answer) {
      let answerKey = answer.answer;
      return (
        <div key={question.number}>
          <strong>
            You answered: {question[answerKey]} <br />
            <br />
            <br />
          </strong>
          <span className="correct">
            <Icon name="thumbs up" size="small" /> Correct
          </span>
        </div>
      );
    }
    return (
      <div key={question.number}>
        <strong>
          Sorry, you got this question wrong. <br />
          <br />
          <br />
        </strong>
        <span className="incorrect">
          <Icon name="thumbs down" size="small" /> Incorrect
        </span>
      </div>
    );
  };

  const restartQuiz = () => {
    dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: 0 });
    dispatch({ type: SET_SHOW_RESULTS, showResults: false });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });
    dispatch({ type: SET_ANSWERS, answers: [] });
    dispatch({ type: SET_CORRECT_ANSWERS, correctAnswers: 0 });
    dispatch({
      type: SET_TIMER,
      initialTime: 150,
      isTimerActive: true,
      timerFinished: false,
    });
  };

  const beginQuiz = () => {
    dispatch({ type: SET_START_QUIZ, startQuiz: true });
    dispatch({ type: SET_TIMER, initialTime: 150, isTimerActive: true });
  };

  // If window or tab are closed or refreshed, sign user out
  window.addEventListener('beforeunload', (e) => {
    firebase.auth().signOut();
  });

  if (showResults || timerFinished) {
    return (
      <>
        <QuizContext.Provider value={{ state, dispatch }}>
          {modal ? <ColorModal /> : ''}
          <Navbar />
          {showResultsData()}
          <Segment
            size="huge"
            style={{ textAlign: 'center' }}
            key={question.number}
          >
            You got {correctAnswers} out of {questionList.length} right.
            <br />
            <br />
            {correctAnswers > 5 ? (
              <Icon name="smile" size="large" />
            ) : (
              <Icon name="meh" size="large" />
            )}
          </Segment>
          <Grid>
            <Grid.Column textAlign="center">
              <Button color="green" onClick={restartQuiz}>
                Restart Quiz
              </Button>
              <br />
            </Grid.Column>
          </Grid>
        </QuizContext.Provider>
      </>
    );
  } else if (!startQuiz) {
    return (
      <div>
        <QuizContext.Provider value={{ state, dispatch }}>
          {modal ? <ColorModal /> : ''}

          <WelcomePage beginQuiz={beginQuiz} currentUser={currentUser} />
        </QuizContext.Provider>
      </div>
    );
  } else {
    return (
      <>
        <QuizContext.Provider value={{ state, dispatch }}>
          <Navbar />
          {modal ? <ColorModal /> : ''}

          <Timer />
          <Segment>
            <Grid>
              <Grid.Column textAlign="center">
                <Question />
                {showError()}
                <Answers />
                <ProgressBar />
                <Button onClick={next} color="green" size="huge">
                  Submit Answer
                </Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </QuizContext.Provider>
      </>
    );
  }
};

export default App;
