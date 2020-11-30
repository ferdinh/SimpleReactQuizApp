import React, {useEffect, useState} from "react";
import Question from "../model/Question";
import QuestionCard from "./QuestionCard";
import {Col, Container, Row} from "reactstrap";


export default function QuestionList(props: { listOfQuestions: Question[] }) {
    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    function onUserAnswer(correctly: boolean) {
        if (correctly) {
            setCorrectAnswer(correctAnswer + 1);
        }
    }

    useEffect(() => {
        setQuestionList(props.listOfQuestions);
    }, [props.listOfQuestions])

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} md={6} lg={6}>
                    {questionList.map((question, id) => (
                        <QuestionCard key={id} questionNumber={id + 1} question={question.question}
                                      possible_answers={question.possible_answers}
                                      correctAnswerIndex={question.correct_answer_index}
                                      onUserAnswer={onUserAnswer}
                        />
                    ))}
                </Col>
            </Row>

            <Row>
                <Col>
                    <p>{questionList.length !== 0 ? `Score: ${correctAnswer}/${questionList.length}` : ''} </p>
                </Col>
            </Row>

        </Container>
    )
}