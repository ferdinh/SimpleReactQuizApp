import {QuestionRequestResult} from "../interface/QuestionRequestResult";
import React, {useEffect, useState} from "react";
import DOMPurify from 'dompurify';
import Question from "../model/Question";
import QuestionCard from "./QuestionCard";


export default function QuestionList(props: { listOfQuestions: Question[] }) {
    const [questionList, setQuestionList] = useState<Question[]>([]);
    
    useEffect(() => {
        setQuestionList(props.listOfQuestions);
    }, [props.listOfQuestions])

    return (
        <div>
            {questionList.map((question, id) => (
                <QuestionCard questionNumber={id + 1} question={DOMPurify.sanitize(question.question)} possible_answers={question.possible_answers} />
            ))}
        </div>
    )
}