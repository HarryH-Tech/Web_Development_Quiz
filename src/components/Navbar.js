import React, { useContext } from 'react';
import { Segment, Header, Button, Modal, Icon, Label } from 'semantic-ui-react';
import firebase from '../firebase';
import { SET_OPEN_MODAL, SET_CLOSE_MODAL } from './Context/reducers/types';
import QuizContext from './Context/QuizContext';

	
const Navbar = () => {
	const { state, dispatch } = useContext(QuizContext);
	const { primaryColor } = state;
	
	const openModal = () => {
		dispatch({ type:SET_OPEN_MODAL, action: true });
		console.log(openModal)		
	}


	
	

	return (
		<Segment style={{backgroundColor: primaryColor}}>
			<Header as="h1" inverted>
			Quiz App
			<Button 
				onClick={() => firebase.auth().signOut()}
				floated="right"
				color="red"
			>
				Sign Out
			</Button>

			<Button
				color="yellow"
				floated="right"
				style={{marginRight: '1em'}}
				onClick={openModal}
			>
				Change The Navbar Color
			</Button>
				
				
				
			</Header>
		</Segment>
	)
}

export default Navbar;