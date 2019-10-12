import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react'; 
import { SET_CURRENT_ANSWER, SET_ERROR } from '../Context/reducers/types';

const Answer = ({ letter, answer, selected, dispatch }) => {

	let classes = ['answer'];
	
	if(selected) {
		classes.push('selected');
	}
	
	const handleClick = (e) => {
		dispatch({ type:SET_CURRENT_ANSWER, currentAnswer: e.target.value });	
		dispatch({ type:SET_ERROR, error: '' });	
	}
	
	return (
		<>
			<Button onClick={handleClick} value={letter} primary className={classes.join(' ')}>
				<span> {letter}) </span> &nbsp;
				{answer}
			</Button>			
		</>
	)
}

export default Answer;