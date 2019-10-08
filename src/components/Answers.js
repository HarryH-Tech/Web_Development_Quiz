import React from 'react';
import Answer from './Answer';

const Answers = ({ answer, currentAnswer, handleClick }) => {
	return (
		<>
			<Answer letter="a" answer={answer.a} selected={currentAnswer === 'a'} handleClick={handleClick}/>
			<Answer letter="b" answer={answer.b} selected={currentAnswer === 'b'} handleClick={handleClick}/>
			<Answer letter="c" answer={answer.c} selected={currentAnswer ==='c'} handleClick={handleClick}/>
			
		</>
	
	)
	
}

export default Answers;