import React from 'react';
import './App.css';
import firebase from '../firebase';

const App = () => {
	return (
		<>
			<h1>App logged in</h1>
			<button onClick={() => firebase.auth().signOut()}>Sign Out</button>
		</>
	)
}


export default App;