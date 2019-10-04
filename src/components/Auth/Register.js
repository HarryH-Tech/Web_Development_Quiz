import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';


const Register = () => {
	
	//Set login initial state values
	const [loginDetails, setLoginDetails] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	
	//Set other app state values
	const [appDetails, setAppDetails] = useState({
		errors: "",
		loading: false
	});
	
	//Validate Form Submission called in handleSubmit Function
	const validateForm = () => {
		console.log('validateForm');
		
		if(isFormEmpty(loginDetails)) {
			setAppDetails({errors: "Please fill in all fields"});
			console.log('fill in all fields')
			return false;
		}
		
		else if(!isPasswordValid(loginDetails)) {
			console.log('password invalid')
			setAppDetails({errors: "Password is invalid. It must be at least 6 letters long and both passwords must match."});
			return false;
		}
	}
	
	//Check if all form fields are filled in, called in validateForm function
	const isFormEmpty = ({ username, email, password, confirmPassword }) => {
		return !loginDetails.username.length || !loginDetails.email.length || !loginDetails.password.length || 
		!confirmPassword.length;
	}
	
	// Validate password, called in validateForm function
	const isPasswordValid = ({password, confirmPassword}) => {
		if(loginDetails.password.length < 6 || loginDetails.confirmPassword.length < 6) {
			return false;
		}
		else if(password !== confirmPassword) {
			return false;
		}
		else {
			return true;
		}
	}
	
	
	//Display Errors
	const displayErrors = errors => errors.map((error, i) => (
		<p key={i}>{error.message}</p>
	))
	
	
	
	
	
	const handleSubmit = () => {
		validateForm();
	}
	
	
	//Save User to DB

	
	const { username, email, password, confirmPassword } = loginDetails;
	return (
	
	
		<Grid textAlign="center" verticalAlign="middle" className="app">
			<Grid.Column style={{ maxWidth: 600, height: 400 }}>
				<Header as="h1" color="blue" textAlign="center">
					<Icon name="fort awesome" color="blue"/>
					Welcome To My French App
				</Header>
				
				{/* Input Fields */}
				<Form size="large" onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Input icon="user" iconPosition="left" name="username"
						placeholder="Username" onChange={(e) => setLoginDetails({...loginDetails, [e.target.name]: e.target.value})}
						value={username} type="text">
						</Form.Input>
						
						<Form.Input icon="mail" iconPosition="left" name="email"
						placeholder="Email" onChange={(e) => setLoginDetails({...loginDetails, [e.target.name]: e.target.value})}
						value={email} type="email">
						</Form.Input>
						
						<Form.Input icon="lock" iconPosition="left" name="password"
						placeholder="Password" onChange={(e) => setLoginDetails({...loginDetails, [e.target.name]: e.target.value})}
						value={password} type="password">
						</Form.Input>
						
						<Form.Input icon="plus circle" iconPosition="left" name="confirmPassword"
						placeholder="Confirm Password" onChange={(e) => setLoginDetails({...loginDetails, [e.target.name]: e.target.value})}
						value={confirmPassword} type="password">
						</Form.Input>
					
					
					<Button
						disabled={appDetails.loading}
						className={appDetails.loading ? 'loading' : ''}
						color="blue"
						fluid
						size="large"
					>
						Submit
					</Button>
					</Segment>
					</Form>
					
					
					<Message>
						Already a User?{" "}
						<Link to="/login">
							Login
						</Link>
					
					</Message>
					
				
			</Grid.Column>
		</Grid>
	)
	
}

export default Register;
		
	
	
	