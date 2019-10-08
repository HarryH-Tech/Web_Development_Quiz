import React from 'react';
import { Button } from 'semantic-ui-react'; 

const Answer = ({ letter, answer, selected, handleClick }) => {
	let classes = ['answer'];
	
	if(selected) {
		classes.push('selected');
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