import React, {useState} from 'react';
import './App.css';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';

const questions = [
     {
	id:1,
	question: "This farm 'yielded' very well this year.",
	answer_a:"produce",
	answer_b:"performance",
	answer_c:"scarce",
	answer_d:"fall down",
	correct_answer: "a"
     },
     {
    	id: 2,
    	question: "Jannet did't appreciate her boss''dig' about her hairstyle.",
        answer_a: "critic",
        answer_b: "compliment",
        answer_c: "hole",
        answer_d: "critical remark",
        correct_answer: "d"
     },
     {
	id: 3,
        question: "The assistant 'ushered' the visitor to the boss's office",
        answer_a: "asked",
        answer_b: "showed",
        answer_c: "walked someone to position",
        answer_d: "assigned",
        correct_answer: "c"
      },
      {
	id: 4,
        question: "American officials are fearful of upending trade negotiations since they could be harmful ",
        answer_a: "v. improve",
        answer_b: "v. deny",
        answer_c: "v. cut",
        answer_d: "v. change drastically",
        correct_answer: "d"
      },
      {
	id: 5,
        question: " Elizabeth always dithers for a while before she acts",
        answer_a: "v. think",
        answer_b: "v. hesitate",
        answer_c: "v. forget",
        answer_d: "v. speak",
        correct_answer: "b"
      },
      {
	id: 6,
        question: "Huawei, a telecoms giant, is in the blacklist since May over concerns that Chinese spooks use its gears to spy on America.",
        answer_a: "n. watcher",
        answer_b: "n. worker",
        answer_c: "n. spy",
        answer_d: "n. soldier",
        correct_answer: "c"
      },
      {
	id: 7,
        question: "Huawei have been hoarding parts in anticipation of a ban and have sought other suppliers",
        answer_a: "v. keeping for future",
        answer_b: "v. wasting",
        answer_c: "v. needing",
        answer_d: "v. buying",
        correct_answer: "a"
      },
      {
	id: 8,
        question: "A shortfall in recruitment led to the company being understaffed  ",
        answer_a: "n. abundance",
        answer_b: "n. deficit, less than needed",
        answer_c: "n. ware",
        answer_d: "n. team",
        correct_answer: "b"
      },
      {
	id: 9,
        question: "I think it's important not to downplay the significance of the event.",
        answer_a: "v. play carefully",
        answer_b: "v. enhance",
        answer_c: "v. play hard",
        answer_d: "v. minimize importance of",
        correct_answer: "d"
      },
      {
	id: 10,
        question: "If we can get to the engine's innards we might find out what's making that noise.",
        answer_a: "n. internal organs",
        answer_b: "1",
        answer_c: "2",
        answer_d: "3",
        correct_answer: "a"
      }
]
console.log(questions.length);
function App() {
/////////////////////////////HOOKS///////////////////////////////////
	const [currentQuestion, setCurrentQuestion]= useState(0);
	const [currentAnswer, setCurrentAnswer]= useState('');
	const [answers, setAnswers]= useState([]);
	const [error, setError]= useState(false);
	const [showResults, setShowResults]= useState('');
/////////////////////////////////////////////////////////////////////
const question = questions[currentQuestion]
const handleClick = e => {
	setCurrentAnswer(e.target.value);
	setError(' ');	
}

const renderError = () => {
	if (!error){
	return;	
	}
	return <div className="error">{error}</div>
}
	
const next = () => {
	const answer = {questionId: question.id, answer: currentAnswer};
	if (!currentAnswer) {
	setError('You havent selected an option, please select one!');
	return; //the function stop here and return if an option is not selected	
	}	
	answers.push(answer);
        //setAnswers(answers);
	setCurrentAnswer(' ');
	if (currentQuestion + 1 < questions.length){
	setCurrentQuestion(currentQuestion + 1);
	return;
	} else {
	setShowResults(true);
	}
}

const restart = () => {
	setAnswers([]);
	setCurrentAnswer('');
	setCurrentQuestion(0);
	setShowResults(false);
}

const renderResultsData = () => {
	return answers.map(answer => {
	const question = questions.find(question => question.id === answer.questionId);
	return <div key={question.id}>{question.question} - {renderResultMark(question, answer)}</div>
})
}

const renderResultMark = (question, answer) => {
	if(question.correct_answer === answer.answer) {
	return <span className="correct">Correct</span>
	} else {
	return <span className="failed">Failed</span>	
	}
}

if (showResults){
	return(
	<div className="container results">
	  <h2>Results</h2>
		<ul>{renderResultsData()}</ul>
	  <button className="btn btn-primary" onClick={restart}>Restart</button>		
	</div>	
	)
} else {
  return (
    <div className="container">
      <Progress total={questions.length} current={currentQuestion + 1}/>
      <Question question={question.question}/>
	{renderError()}
      <Answers question={question} currentAnswer={currentAnswer} handleClick={handleClick}/>
      <button className="btn btn-primary" onClick={next}>Confirm and Continue</button>
    </div>
  );
}
}
export default App;
