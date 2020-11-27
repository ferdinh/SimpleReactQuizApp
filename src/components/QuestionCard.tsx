import DOMPurify from "dompurify";
import React from "react";

export default function QuestionCard(props: { questionNumber: number, question: string, possible_answers: string[] }) {
    const CHAR = 'ABCD';

    return (
        <div>
            <h3>{`${props.questionNumber}. ${props.question}`}</h3>
            <ul className="Answer-list">
                {props.possible_answers.map((answer, idx) => (
                    <li key={`answer-${idx}`}>
                        <button>{CHAR[idx]}. {DOMPurify.sanitize(answer)}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}