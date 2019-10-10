import React from 'react';
import { Header, Button, Segment, Icon } from 'semantic-ui-react';
import Navbar from './Navbar';

const WecomePage = ({ startQuiz, beginQuiz, currentUser }) => {

		
		return (
			<>
				<Navbar />
				<Segment textAlign="center">
					<Icon name=""  />
					<Header as="h1">
						Welcome to my web development quiz&nbsp;
						{currentUser.displayName}. 
						< br/>
						
					</Header>
					
					<Header.Subheader>
						Please click the button below to begin.
					</Header.Subheader>	
					<br />
					
					<Button 
						animated="fade"
						onClick={beginQuiz}
						positive
					>
						<Button.Content visible>Start Quiz</Button.Content>
						<Button.Content hidden>
							<Icon name="play" />
						</Button.Content>
					</Button>
				</Segment>
			</>
		
		)
	};
	

export default WecomePage;


// 				<h1>Hi {currentUser.displayName}</h1>
