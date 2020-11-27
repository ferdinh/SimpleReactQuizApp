import DOMPurify from "dompurify";
import React, {useState} from "react";
import {Button} from "reactstrap";

export default function QuestionCard(props: { questionNumber: number, question: string, possible_answers: string[], correctAnswerIndex: number }) {
    const CHAR = 'ABCD';

    const [isUserAnswered, setIsUserAnswered] = useState(false);
    const [userAnsweredCorrectly, setUserAnsweredCorrectly] = useState(false);
    const [userAnswer, setUserAnswer] = useState(-1);

    const checkAnswer = (answerId: number) => {
        setUserAnswer(answerId);
        setIsUserAnswered(true);

        if (props.correctAnswerIndex === answerId) {
            setUserAnsweredCorrectly(true);
        }
    }

    function determineColor(answerId: number): string {
        if (isUserAnswered) {
            if (answerId === props.correctAnswerIndex) {
                return 'success';
            }
            if (!userAnsweredCorrectly) {
                if (answerId === userAnswer) {
                    return 'danger';
                }
            }
        }

        return 'secondary';
    }

    function renderAnswer(idx: number, answer: string) {

        const color = determineColor(idx);

        return (
            <li key={`answer-${idx}`}>
                <Button disabled={isUserAnswered}
                        color={color}
                        onClick={() => checkAnswer(idx)}
                        dangerouslySetInnerHTML={{__html: `${CHAR[idx]}. ${DOMPurify.sanitize(answer)}`}}></Button>
            </li>
        )
    }

    return (
        <div>
            <h3 dangerouslySetInnerHTML={{__html: `${props.questionNumber}. ${DOMPurify.sanitize(props.question)}`}}></h3>
            <ul className="Answer-list">
                {props.possible_answers.map((answer, idx) => (
                    renderAnswer(idx, answer)
                ))}
            </ul>
        </div>
    )
}