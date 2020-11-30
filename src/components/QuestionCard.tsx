import DOMPurify from "dompurify";
import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Container} from "reactstrap";

export default function QuestionCard(props: { questionNumber: number, question: string, possible_answers: string[], correctAnswerIndex: number, onUserAnswer: (correctly: boolean) => void }) {
    const CHAR = 'ABCD';

    const [isUserAnswered, setIsUserAnswered] = useState(false);
    const [userAnsweredCorrectly, setUserAnsweredCorrectly] = useState(false);
    const [userAnswer, setUserAnswer] = useState(-1);

    const checkAnswer = (answerId: number) => {
        setUserAnswer(answerId);
        setIsUserAnswered(true);

        if (props.correctAnswerIndex === answerId) {
            setUserAnsweredCorrectly(true);
            props.onUserAnswer(true);
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
                <Button className='mb-2'
                        disabled={isUserAnswered}
                        color={color}
                        onClick={() => checkAnswer(idx)}
                        dangerouslySetInnerHTML={{__html: `${CHAR[idx]}. ${DOMPurify.sanitize(answer)}`}}></Button>
            </li>
        )
    }

    return (
        <Container>
            <Card>
                <CardHeader
                    dangerouslySetInnerHTML={{__html: `${props.questionNumber}. ${DOMPurify.sanitize(props.question)}`}}></CardHeader>
                <CardBody>
                    <ul className="Answer-list">
                        {props.possible_answers.map((answer, idx) => (
                            renderAnswer(idx, answer)
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </Container>
    )
}