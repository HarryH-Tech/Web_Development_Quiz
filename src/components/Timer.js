import React, { useState, useEffect } from 'react';
import { Message, Icon } from 'semantic-ui-react';

const Timer = ({ timerFinished, quizTimerFinished }) => {
	const [seconds, setSeconds] = useState(20);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		setIsActive(true);
		let interval = null;
		if(seconds === 0) {
			timerFinished = true;
			quizTimerFinished();
		}
		else if (isActive) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds - 1);
			}, 1000);
		} 
		
	
	return () => clearInterval(interval);
	}, [isActive, seconds]);
			
	
	return (
			<Message 
				icon
				color={seconds > 5 ? 'green' : 'red'}
				style={{width: '35%', margin: 'auto', textAlign: 'center'}} 
			>
			<Icon name='clock'/>
				<Message.Content>
					{seconds} Seconds Remaining
				</Message.Content>
			</Message>
	)
}

export default Timer;