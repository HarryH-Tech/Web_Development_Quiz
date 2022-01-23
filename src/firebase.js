import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCVvNh9XOydrqYQWCifFvqQNLTXF7U7yso',
  authDomain: 'web-dev-quiz-b96c7.firebaseapp.com',
  databaseURL: 'https://web-dev-quiz-b96c7.firebaseio.com',
  projectId: 'web-dev-quiz-b96c7',
  storageBucket: 'web-dev-quiz-b96c7.appspot.com',
  messagingSenderId: '1075198808593',
  appId: '1:1075198808593:web:a09d21e9c328dba70b97b0',
  measurementId: 'G-TGNHP9018Y',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
