import React from 'react';
import Answer from './Answer';
import { Segment } from 'semantic-ui-react';

const Answers = ({ answer, currentAnswer, handleClick }) => {
	return (
		<>
			<Segment.Group horizontal>
				<Segment textAlign="center">
				<Answer letter="a" answer={answer.a} selected={currentAnswer === 'a'} handleClick={handleClick}/>
				</Segment>
				
				<Segment textAlign="center">
				<Answer letter="b" answer={answer.b} selected={currentAnswer === 'b'} handleClick={handleClick}/>
				</Segment>
				
				<Segment textAlign="center">
				<Answer letter="c" answer={answer.c} selected={currentAnswer ==='c'} handleClick={handleClick}/>
				</Segment>
			</Segment.Group>
		</>
	
	)
	
}

export default Answers;