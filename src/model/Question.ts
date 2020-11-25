import {QuestionRequestResult} from "../interface/QuestionRequestResult";
import {QuestionType} from "../enum/QuestionType";
import {Difficulty} from "../enum/Difficulty";
import {shuffleArray} from "../Util";

export default class Question {
    category: string;
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
    possible_answers: string[];
    correct_answer_index: number;

    constructor(questionResult: QuestionRequestResult) {
        this.category = questionResult.category;
        this.type = questionResult.type;
        this.question = questionResult.question;
        this.difficulty = questionResult.difficulty;

        const combinedAnswers: string[] = [questionResult.correct_answer, ...questionResult.incorrect_answers];

        shuffleArray(combinedAnswers);

        this.possible_answers = combinedAnswers;
        this.correct_answer_index = this.possible_answers.findIndex(s => s === questionResult.correct_answer);
    }
}
