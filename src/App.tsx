import React, {useState} from 'react';
import './App.css';
import BackgroundImage from './images/bg-image.jpg';
import QuestionList from "./components/QuestionList";
import Question from "./model/Question";
import {Button} from "reactstrap";

function App() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const loadQuestions = async () => {
        console.log('Retrieving questions');
        const request = await fetch('https://opentdb.com/api.php?amount=10');

        const data = await request.json();
        const questionResult = data.results;
        const mappedData: Question[] = [];

        for (let i = 0; i < questionResult.length; i++) {
            mappedData.push(new Question(questionResult[i]));
        }

        setQuestions(mappedData);
    }

    const renderStartButton = () => {
        if (questions.length <= 0) {
            return <Button onClick={() => loadQuestions()}>Start</Button>;
        }
    }

    return (
        <div className="App">
            <h1>React Trivia Quiz</h1>
            <h2>Total Questions: {questions.length}</h2>
            {renderStartButton()}
            <QuestionList listOfQuestions={questions}/>
        </div>
    );
}

export default App;
