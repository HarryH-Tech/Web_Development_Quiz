import React, { useContext } from 'react';
import Answer from './Answer';
import { Segment } from 'semantic-ui-react';
import QuizContext from '../Context/QuizContext'

const Answers = () => {
	const { state, dispatch} = useContext(QuizContext);
	const {  currentAnswer, questions, currentQuestion } = state;
	const answer = questions[currentQuestion];
	
	return (
		<>
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
					/>
				</Segment>
				
				<Segment textAlign="center">
					<Answer 
						letter="c" 
						dispatch={dispatch} 
						selected={currentAnswer ==='c'} 
						answer={answer.c}
					/>
				</Segment>
			</Segment.Group>
		</>
	
	)
	
}

export default Answers;