import React, { useState, useEffect, useContext } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import QuizContext from '../Context/QuizContext';
import { SET_TIMER } from '../Context/reducers/types';

const Timer = () => {
  const { state, dispatch } = useContext(QuizContext);
  let { timerFinished } = state;

  //Set Starting Time
  const [seconds, setSeconds] = useState(90);
  const [isActive, setIsActive] = useState(false);

  const quizTimerFinished = () => {
    dispatch({ type: SET_TIMER, timerFinished: true });
  };

  useEffect(() => {
    setIsActive(true);
    let interval = null;
    if (seconds === 0) {
      timerFinished = true;
      quizTimerFinished();
    } else if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <Message icon color={seconds > 5 ? 'green' : 'red'}>
      <div style={{ width: '35%', margin: 'auto', textAlign: 'center' }}>
        <Icon size="big" name="clock" />
        <Message.Content>{seconds} Seconds Remaining</Message.Content>
      </div>
    </Message>
  );
};

export default Timer;
