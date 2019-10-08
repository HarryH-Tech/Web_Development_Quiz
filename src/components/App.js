import React, { useContext, useReducer } from 'react';
import './App.css';
import firebase from '../firebase';
import { Segment, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//Custom Component Imports
import { AuthContext } from './Context/Auth';
import ProgressBar from './ProgressBar';
import Question from './Question';
import Answers from './Answers';
import Timer from './Timer';
import WelcomePage from './WelcomePage';

const SET_CURRENT_ANSWER = "SET_CURRENT_ANSWER";
const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";
const SET_ERROR = "SET_ERROR";
const SET_ANSWERS = "SET_ANSWERS";
const SET_SHOW_RESULTS = "SET_SHOW_RESULTS";
const SET_START_QUIZ = "SET_START_QUIZ";
const SET_TIMER = "SET_TIMER";



const quizReducer = (state, action) => {
	switch(action.type) {
		case SET_CURRENT_ANSWER:
			return {
				...state, 
				currentAnswer: action.currentAnswer
			}
			
		case SET_CURRENT_QUESTION:
			return {
				...state,
				currentQuestion: action.currentQuestion
			}
			
		case SET_ERROR:
			return {
				...state,
				error: action.error
			}
			
		case SET_ANSWERS:
			return {
				...state,
				answers: action.answers
			}
			
		case SET_SHOW_RESULTS:
			return {
				...state,
				showResults: action.showResults
			}
			
		case SET_ANSWERS:
			return {
				...state,
				answers: action.answers
			}
			
		case SET_START_QUIZ:
			return {
				...state,
				startQuiz: action.startQuiz
			}
			
		case SET_TIMER:
			return {
				...state,
				initialTime: 150,
				isTimerActive: true,
				timerFinished: action.timerFinished
			}
			
			
			
			
			default:
				return state;
			
	}
	
}



const App = () => {
	const initialState = {
		currentQuestion: 0,
		currentAnswer: '',
		answers: [],
		showResults: false,
		error: '',
		startQuiz: false,
		initialTime: 150,
		isTimerActive: false,
		timerFinished: false
	}
	
	const [state, dispatch] = useReducer(quizReducer, initialState);
	const { 
		currentQuestion, 
		currentAnswer, 
		answers, 
		showResults, 
		error, 
		startQuiz,
		initialTime,
		isTimerActive,
		timerFinished
	} = state;
		
		
	const userContext = useContext(AuthContext);
	const { currentUser } = userContext;
		
		
	const questions = [
		{
			number: '1',
			question: "Quelle ____ est-il?",
			a: "vie",
			b: "bien",
			c: "heure",
			correct: "c"
		},
		{
			number: '2',
			question: "____ est la boîte?",
			a: "Ensuite",
			b: "Où",
			c: "Pourquoi",
			correct: "b"
		}		
	];
	
	
	const showQuiz = () => {
		dispatch({ type:SET_START_QUIZ, startQuiz: true });	
	}
	
	const showError = () => {
		if(!error) {
			return ;
		}
		
		return <div>{error}</div>;
	};
	
	//console.log(userContext.currentUser);
	const question=questions[currentQuestion]
	
	
	
	const handleClick = (e) => {
		dispatch({ type:SET_CURRENT_ANSWER, currentAnswer: e.target.value });	
		dispatch({ type:SET_ERROR, error: '' });	
	}
	
	const next = () => {
		const answer = {questionId: question.number, answer: currentAnswer}
		if(!currentAnswer) {
			dispatch({ type:SET_ERROR, error: 'Please Select An Option' });	
			return;
		}
		
		answers.push(answer);
		dispatch({ type:SET_ANSWERS, answers: answers });	
		dispatch({ type:SET_CURRENT_ANSWER, currentAnswer: '' });
		if(currentQuestion + 1  < questions.length) {
			dispatch({ type:SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1 });	
			return;
		}
		dispatch({ type:SET_SHOW_RESULTS, showResults: true });	

	}
	
	const showResultsData = () => {
		return answers.map(answer => {
			const question = questions.find(
				question => question.number === answer.questionId
		);
		
			return (
				<div key={question.number}>{question.question} - {showResultMark(question, answer)}</div>
			)
		})
		
	};
	
	const showResultMark = (question, answer) => {
		if(question.correct === answer.answer) {
			return <span className="correct">Correct</span>			
		}
		return <span className="incorrect">Incorrect</span>	
	}
	
	const restartQuiz = () => {
		dispatch({ type:SET_CURRENT_QUESTION, currentQuestion:0 });	
		dispatch({ type:SET_SHOW_RESULTS, showResults: false });	
		dispatch({ type:SET_CURRENT_ANSWER, currentAnswer: '' });
		dispatch({ type:SET_ANSWERS, answers: [] });
		dispatch({ type:SET_TIMER, initialTime: 150, isTimerActive: true, timerFinished: false });		
		
	}
	
	const beginQuiz = () => {
		dispatch({ type:SET_START_QUIZ, startQuiz: true });	
		dispatch({ type:SET_TIMER, initialTime: 150, isTimerActive: true });		
	};
	
	const quizTimerFinished = () => {
		dispatch({ type:SET_TIMER, timerFinished: true });		
		
	};
	
	
	if(showResults || timerFinished) {
		return (
			<div className="container">
			<ul>
				{showResultsData()}
			</ul>
				<button 
					className="btn btn-primary"
					onClick={restartQuiz}
				>
					Restart Quiz
				</button>
			</div>
		)	
	}
	
	else if(!startQuiz) {
		return (
			<div>
				<WelcomePage 
					beginQuiz={beginQuiz}
					currentUser={currentUser}
				/>
			</div>
		)
	}
	
	else {
		return (
			<>
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
					</Header>
				</Segment>
				
				<h1>Hi {currentUser.displayName}. Welcome to my French Quiz!</h1>
				<Timer 
					timerFinished={timerFinished}
					quizTimerFinished={quizTimerFinished}
				/>
				<Segment>
					{/*Timer -  Q - answers - progress - score*/}
					
					<Question
						question={question.question}
						
					/>
					{showError()}
					<Answers 
						answer={question}
						currentAnswer={currentAnswer}
						handleClick={handleClick}
					/>
					<ProgressBar 
						total={questions.length}
						current={currentQuestion + 1}
						percentUploaded={(currentQuestion / questions.length) * 100}
					/>
					
					<button 
						className="btn btn-primary"
						onClick={next}
					>
						Submit Answer
					</button>
					
				</Segment>				
			</>
	)
	}
}


export default App;