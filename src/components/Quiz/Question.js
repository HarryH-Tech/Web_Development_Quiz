import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react'
import QuizContext from '../Context/QuizContext'

const Question = () => {
	const { state, dispatch } = useContext(QuizContext);
	const { currentQuestion, questions } = state;
	const question = questions[currentQuestion];
	
	return (
		<>
			<Header as="h3" textAlign='center'>
				<Header.Content> 
					{question.question}
				</Header.Content>
			</Header>
		
		</>
	
	)
	
}

export default Question;