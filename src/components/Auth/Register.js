import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import firebase from '../../firebase';


const Register = () => {
		
	//Set login initial state values
	const [loginDetails, setLoginDetails] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		usersRef: firebase.database().ref('users')
	});
	

	
	//Set other app state values
	const [appDetails, setAppDetails] = useState({
		errors: "",
		loading: false
	});
	
	//Destructure state values
	const { username, email, password, confirmPassword, usersRef } = loginDetails;
	const { errors, loading } = appDetails;
	
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
		
		else {
			return true;
		}
	}
	
	//Check if all form fields are filled in, called in validateForm function
	const isFormEmpty = ({ username, email, password, confirmPassword }) => {
		return !username.length || !email.length || !password.length || 
		!confirmPassword.length;
	}
	
	// Validate password, called in validateForm function
	const isPasswordValid = ({password, confirmPassword}) => {
		if(password.length < 6 || confirmPassword.length < 6) {
			return false;
		}
		else if(password !== confirmPassword) {
			return false;
		}
		else {
			return true;
		}
	}
	
	
	
	
	//Save User to DB, called in handleSubmit function
	const saveUser = createdUser => {
		return usersRef.child(createdUser.user.uid).set({
			name: createdUser.user.displayName,
			avatar: createdUser.user.photoURL
		});
	};
	
	
	// handle input errors called in handleSubmit function
	const handleInputError = (errors, inputName) => {
		return errors.some(error => (
			error.message.toLowerCase().includes(inputName)
		) ? "error" : '')
	};
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if(validateForm()) {
			console.log('form valid');
			setAppDetails({errors: "", loading: true});
			firebase			
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(createdUser => {
					console.log(createdUser);
					createdUser.user.updateProfile({
						displayName: username,
						photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
					})
					.then(() => {
						saveUser(createdUser).then(() => {
							console.log("User Saved");
					})
				})
				
				.catch(err => {
					console.error(err);
					setAppDetails({errors: errors.concat(err), loading: false})
				})
			})
			.catch(err => {
				console.error(err);
				setAppDetails({errors: errors.concat(err), loading: false})
			})
			
		}
	}
	
	
	

	
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
						disabled={loading}
						className={loading ? 'loading' : ''}
						color="blue"
						fluid
						size="large"
					>
						Submit
					</Button>
					</Segment>
					</Form>
					{errors && (
						<Message error>
							<h3>Error:</h3>
							{errors}
						</Message>
					)}
					
					
					<Message>
						Already a User?<br /><br />
						<Link style={{ color: '#FFF' }} to="/login">
							<Button 
								compact
								color="green"
							>
									Login	
							</Button>
						</Link>
					</Message>
					
				
			</Grid.Column>
		</Grid>
	)
	
}

export default Register;
		
	
	
	