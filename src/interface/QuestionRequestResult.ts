import {QuestionType} from "../enum/QuestionType";
import {Difficulty} from "../enum/Difficulty";

export interface QuestionRequestResult {
    category: string,
    type: QuestionType,
    difficulty: Difficulty,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}