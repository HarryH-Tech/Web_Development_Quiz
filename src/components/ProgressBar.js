import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({ current, total, percentUploaded }) => {
	return (
		<>
			<h3>Question {current} of {total}</h3>
			<Progress percent={percentUploaded} progress />
		</>
	
	)
	
}

export default ProgressBar;