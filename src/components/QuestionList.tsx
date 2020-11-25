import {QuestionRequestResult} from "../interface/QuestionRequestResult";
import React, {useEffect, useState} from "react";
import DOMPurify from 'dompurify';
import Question from "../model/Question";


export default function QuestionList(props: { listOfQuestions: Question[] }) {
    const [questionList, setQuestionList] = useState<Question[]>([]);
    const CHAR = 'ABCD';
    
    useEffect(() => {
        setQuestionList(props.listOfQuestions);
    }, [props.listOfQuestions])

    return (
        <div>
            {questionList.map((question, id) => (
                <div key={id}>
                    <h3 dangerouslySetInnerHTML={{__html: `${id + 1}. ${DOMPurify.sanitize(question.question)}`}}></h3>
                    <ul className="Answer-list">
                        {question.possible_answers.map((answer, idx) => (
                            <li key={`answer-${idx}`}>
                                <button dangerouslySetInnerHTML={{__html: `${CHAR[idx]}. ${DOMPurify.sanitize(answer)}`}}></button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}