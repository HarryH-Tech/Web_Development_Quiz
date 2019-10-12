import React, { useContext } from 'react';
import { Progress } from 'semantic-ui-react';
import QuizContext from '../Context/QuizContext';

const ProgressBar = () => {
	const { state, dispatch } = useContext(QuizContext)
	const { currentQuestion, questions } = state;
	let percentUploaded = ((currentQuestion / questions.length) * 100).toFixed();
	
	return (
		<>
			<h3>Question {currentQuestion+1} of {questions.length}</h3>
			<Progress percent={percentUploaded} progress />
		</>
	
	)
	
}



export default ProgressBar;