import React, {useEffect, useState} from "react";
import Question from "../model/Question";
import QuestionCard from "./QuestionCard";
import {Alert, Col, Container, Row} from "reactstrap";


export default function QuestionList(props: { listOfQuestions: Question[] }) {
    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    function onUserAnswer(correctly: boolean) {
        if (correctly) {
            setCorrectAnswer(correctAnswer + 1);
        }
    }

    function renderScore() {
        if (questionList.length !== 0) {
            return (
                <Row className='justify-content-center'>
                    <Col xs={8} md={4} lg={4}>
                        <Alert
                            color="dark">{questionList.length !== 0 ? `Score: ${correctAnswer}/${questionList.length}` : ''} </Alert>
                    </Col>
                </Row>
            )
        }
        
        return null;
    }

    useEffect(() => {
        setQuestionList(props.listOfQuestions);
    }, [props.listOfQuestions])

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} md={6} lg={6}>
                    {questionList.map((question, id) => (
                        <Row className='mb-3'>
                            <Col>
                                <QuestionCard key={id} questionNumber={id + 1} question={question.question}
                                              possible_answers={question.possible_answers}
                                              correctAnswerIndex={question.correct_answer_index}
                                              onUserAnswer={onUserAnswer}
                                />
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>

            {renderScore()}
        </Container>
    )
}