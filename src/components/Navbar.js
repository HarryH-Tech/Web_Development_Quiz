import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import AccountDetails from './AccountDetails';
 
const Navbar = () => {
	return (
		<Segment inverted>
			<Header as="h1" inverted color="blue">
			Quiz App
			<Button 
				onClick={() => firebase.auth().signOut()}
				floated="right"
				color="red"
			>
				Sign Out
			</Button>
			
			<Link to="/account_details">
				<Button
					color="blue"
					floated="right"
					style={{marginRight: '1em'}}
				>
					Account Details
				</Button>
			</Link>
			<Link to="/">
				<Button
					color="green"
					floated="right"
					style={{marginRight: '1em'}}
				>
					Quiz
				</Button>
			</Link>
			</Header>
		</Segment>
	)
}

export default Navbar;