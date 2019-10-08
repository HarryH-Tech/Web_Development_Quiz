import React, { useState, useContext } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import { Redirect } from 'react-router';
import { AuthContext } from '../Context/Auth';


const Login = ({ history }) => {
	
	//Create and destructure state values
	const [userDetails, setUserDetails] = useState({
		email: '',
		password: ''
	});
	const [appDetails, setAppDetails] = useState({
		errors: [],
		loading: false
	}); 
	const { email, password } = userDetails;
	const { errors, loading } = appDetails;
	
	
	//if error, specify which input field caused the error
	const handleInputError = (errors, inputName) => {
		return errors.some(error => 
			error.message.toLowerCase().includes(inputName)
			) ? 'error': ''
	};
	
	const displayErrors = errors => errors.map((error, i) => (
		<p key={i}>{error.message}</p>
	))
	
	
	const { currentUser } = useContext(AuthContext);
	
	if(currentUser) {
		return <Redirect to="/" />;
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if(validateForm(userDetails)) {
			setAppDetails({errors: [], loading: true });
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(signedInUser => {
					console.log(signedInUser)
					history.push("/")
				})
				
				.catch(err => {
					console.error(err)
					setAppDetails({
						errors: errors.concat(err),
						loading: false
					})
				})
		};
		
	}
	
	const validateForm = ({ email, password }) => email && password;
	
	return (
		<Grid textAlign="center" verticalAlign="middle" className="app">
			<Grid.Column style={{ maxWidth: 600, height: 400 }}>
				<Header as="h1" color="blue" textAlign="center">
					<Icon name="language" color="blue" />
						Login
				</Header>
				
				<Form size="large" onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Input fluid name="email" icon="mail"
						iconPosition="left" placeholder="Email Address"
						onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
						type="email" value={email} className={handleInputError(errors, 'email')} 
						/>
						
						<Form.Input fluid name="password" icon="lock"
						iconPosition="left" placeholder="Password"
						onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
						type="password"	value={password} className={handleInputError(errors, 'password')}
						/>
					
				
							
			
						<Button 
							disabled={loading}
							className={loading ? 'loading' : ''}
							color="green" 
							fluid 
							size="large"
							icon
							labelPosition="left"
						>
							<Icon name="sign in" />
							Log In
						</Button>
					</Segment>
				</Form>		
				{errors.length > 0 && (
					<Message error>
						<h3>Error:</h3>
						{displayErrors(errors)}
					</Message>
				)}
				<Message>Don't Have an Account?<br /><br />
					<Link style={{ color: '#FFF' }} to="/register">
						<Button 
							compact
							color="blue"
						>
							Register Here
						</Button>
					</Link>
				</Message>
					
			</Grid.Column>
		</Grid>
		
	)
}


export default Login;