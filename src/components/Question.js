import React from 'react';
import { Header } from 'semantic-ui-react'

const Question = (props) => {
	return (
		<>
			<Header as="h3" textAlign='center'>
				<Header.Content> 
					{props.question}
				</Header.Content>
			</Header>
		
		</>
	
	)
	
}

export default Question;