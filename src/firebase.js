import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCTZrYihrJ_1l5hLZO2vVOw_tlPRgcdDFY",
	authDomain: "french-quiz-b8132.firebaseapp.com",
	databaseURL: "https://french-quiz-b8132.firebaseio.com",
	projectId: "french-quiz-b8132",
	storageBucket: "gs://french-quiz-b8132.appspot.com",
	messagingSenderId: "397007280430",
	appId: "1:397007280430:web:a906708f57222bda3fc2bf",
	measurementId: "G-83JDQFSSV1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;