import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import firebase from '../firebase';
import { AuthContext } from './Context/Auth';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import md5 from 'md5';


const AccountDetails = () => {
	const userContext = useContext(AuthContext);
	const { currentUser } = userContext;
	console.log(currentUser);
			
	//Set login initial state values
	const [userDetails, setUserDetails] = useState({
		username: currentUser.displayName,
		email: currentUser.email,
		//avatarUrl: currentUser.photoURL,
		password: '',
		confirmPassword: '',
		usersRef: firebase.database().ref('users1')
	});
	

	
	//Set other app state values
	const [appDetails, setAppDetails] = useState({
		errors: "",
		loading: false
	});
	
	//Destructure state values
	const { username, email, password, confirmPassword, usersRef } = userDetails;
	const { errors, loading } = appDetails;
	
	//Validate Form Submission called in handleSubmit Function
	const validateForm = () => {
		console.log('validateForm');
		
		if(isFormEmpty(userDetails)) {
			setAppDetails({errors: "Please fill in all fields"});
			console.log('fill in all fields')
			return false;
		}
		
		else if(!isPasswordValid(userDetails)) {
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

	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		//if(validateForm()) {
			console.log('form valid');
			setAppDetails({errors: "", loading: true});
			updateDatabase();
				
		//}
	}
	
	const updateDatabase = (createdUser) => {
		console.log(currentUser.uid);
		return firebase.database().ref(usersRef+'/'+currentUser.uid)
			.set({
				displayName: username
			})
	};
	
	
	
	return (
		<>
			<Navbar />
			<Form>
			<Form.Field>
				<label>Display Name</label>
				<Input 
					defaultValue={username} 
					onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
					name='username'
				/>
			</Form.Field>
			<Form.Field>
				<label>Email</label>
				<Input defaultValue={email} type="email"/>
			</Form.Field>
			{/*
			<Form.Field>
				<label>Avatar Image</label>
				<Input type="file"/>
			</Form.Field>
			*/}
			<Form.Field>
				<Button 
					type="submit" 
					color="blue"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Form.Field>
		</Form>
		</>
	)
}

export default AccountDetails;