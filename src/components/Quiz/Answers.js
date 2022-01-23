import React, { useContext } from 'react';
import Answer from './Answer';
import { Segment } from 'semantic-ui-react';
import QuizContext from '../Context/QuizContext';

const Answers = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { currentAnswer, questionList, currentQuestion } = state;
  const answer = questionList[currentQuestion];

  return (
    <>
      <div style={{ width: '100%' }}>
        <Segment.Group horizontal>
          <Segment textAlign="center">
            <Answer
              letter="a"
              dispatch={dispatch}
              selected={currentAnswer === 'a'}
              answer={answer.a}
            />
          </Segment>

          <Segment textAlign="center">
            <Answer
              letter="b"
              dispatch={dispatch}
              selected={currentAnswer === 'b'}
              answer={answer.b}
              style={{ width: '100%' }}
            />
          </Segment>

          <Segment textAlign="center">
            <Answer
              letter="c"
              dispatch={dispatch}
              selected={currentAnswer === 'c'}
              answer={answer.c}
            />
          </Segment>
        </Segment.Group>
      </div>
    </>
  );
};

export default Answers;
