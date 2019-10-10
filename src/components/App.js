import React, { useContext, useReducer } from 'react';
import './App.css';
import { Segment, Button, Icon, Grid, Divider } from 'semantic-ui-react';

//Custom Component Imports
import { AuthContext } from './Context/Auth';
import ProgressBar from './ProgressBar';
import Question from './Question';
import Answers from './Answers';
import Timer from './Timer';
import WelcomePage from './WelcomePage';
import Navbar from './Navbar';

const SET_CURRENT_ANSWER = "SET_CURRENT_ANSWER";
const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";
const SET_ERROR = "SET_ERROR";
const SET_ANSWERS = "SET_ANSWERS";
const SET_SHOW_RESULTS = "SET_SHOW_RESULTS";
const SET_START_QUIZ = "SET_START_QUIZ";
const SET_TIMER = "SET_TIMER";
const SET_CORRECT_ANSWERS = "SET_CORRECT_ANSWERS";



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
		
		case SET_CORRECT_ANSWERS: 
			return {
				...state,
				correctAnswers: action.correctAnswers
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
		timerFinished: false,
		correctAnswers: 0
	}
	
	const [state, dispatch] = useReducer(quizReducer, initialState);
	const { 
		currentQuestion, 
		currentAnswer, 
		answers, 
		showResults, 
		error, 
		startQuiz,
		timerFinished,
		correctAnswers
	} = state;
		
		
	const userContext = useContext(AuthContext);
	const { currentUser } = userContext;
		
		
	const questions = [
		{
			number: '1',
			question: "What is HTTP?",
			a: "A programming language.",
			b: "A transfer protocol.",
			c: "A CSS framework.",
			correct: "b"
		},
		{
			number: '2',
			question: "Who Invented Javascript?",
			a: "Brendan Eich",
			b: "Bjarne Stroustrup",
			c: "Guido van Rossum",
			correct: "a"
		},
		{
			number: '3',
			question: "Which of thes is not a Javascript array method?",
			a: ".map()",
			b: ".shift()",
			c: ".implode()",
			correct: "c"
		}				
	];
	

	
	const showError = () => {
		if(!error) {
			return ;
		}
		
		return (
			<Divider horizontal>
				<div style={{color: 'red', fontWeight: 'bold'}}>
					{error}
				</div>
			</Divider>
		)
	};
	
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
			if(answer.answer === question.correct) {
				dispatch({ type:SET_CORRECT_ANSWERS, correctAnswers: correctAnswers + 1 });	
			}
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
				<Segment size="huge">
					<div key={question.number} style={{textAlign:'center'}}>
						{question.question} - {showResultMark(question, answer)}<br /><br />
					<br />
					</div>
				</Segment>
			)
		})
	};
	
	
	const showResultMark = (question, answer) => {

		if(question.correct === answer.answer) {
			let answerKey = answer.answer;
			return (
				<div key={question.number}>
					<strong>
						You answered:  {question[answerKey]} <br /><br /><br />
					</strong>
					<span className="correct">
						<Icon name="thumbs up" size="small"/> Correct
					</span>	
				</div>
				
			)
		}
		return (
			<div key={question.number}>
				<strong>
					Sorry, you got this question wrong. <br /><br /><br />
				</strong>
				<span className="incorrect">
					<Icon name="thumbs down" size="small"/> Incorrect
				</span>	
			</div>
		)
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
				{showResultsData()}

			<Segment size="huge" style={{textAlign: 'center'}}>
				You got {correctAnswers} out of {questions.length} right.<br /><br />
					{ correctAnswers > 10 ? (
						<Icon name="smile" size="large"/>
					) : ( 
						<Icon name="meh" size="large"/>
					)}
			</Segment>
			<Grid>
				<Grid.Column textAlign="center"> 
					<Button 
						color="green"
						onClick={restartQuiz}
					>
						Restart Quiz
					</Button>
					<br />
				</Grid.Column>
			</Grid>
			
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
				<Navbar />		
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
					
					<Grid>
						<Grid.Column textAlign="center"> 
							<Button 
								onClick={next}
								color="green"
								size='huge'
							>
								Submit Answer
							</Button>
						</Grid.Column>
					</Grid>
				</Segment>				
			</>
	)
	}
}


export default App;