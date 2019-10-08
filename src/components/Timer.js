import React, { useState, useEffect } from 'react';

const Timer = ({ timerFinished, quizTimerFinished }) => {
	const [seconds, setSeconds] = useState(3);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		setIsActive(true);
		let interval = null;
		if(seconds === 0) {
			timerFinished = true;
			console.log('timerFinished', timerFinished)		
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
		<>
			<div>{seconds} Seconds Remaining</div>
			
		</>
		
	
	)
}

export default Timer;