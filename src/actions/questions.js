import { ADD_QUESTION, SAVE_ANSWER, RECEIVE_QUESTIONS } from '../constants/actionTypes'

export const receieveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})