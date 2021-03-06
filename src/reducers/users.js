import { RECEIVE_USERS, SAVE_ANSWER, ADD_QUESTION, ADD_USER } from '../constants/actionTypes'
import * as newUser from '../images/new-user.jpg'

/**
 * reducer that organises the store users state
 * recieves and stores initial users list, adds a question to user questions parameter,
 * saves answered question and option selected to relevant user and adds in new user to list
 * default value of empty obj
 */

//state here = users slice of store state
const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION:
            const { author, id } = action.newQ
            //it spreads the user state and then we grab the author via action
            //then inside that property we spread the data in the author obj
            //which give us access to it properties of which we add the new q onto the questions array
            return {
               //add q id to users questions array
               ...state,
               [author]: {
                   ...state[author],
                   questions: state[author].questions.concat([id])
               }
            }
        case SAVE_ANSWER:
            const { authedUser, qid, answer } = action.answerInfo

            return {
                //add qid and option answer selected to userId answers list
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case ADD_USER:
            const { name, password } = action.newUser

            return {
                ...state,
                [action.userName]: {
                    id: action.userName,
                    name,
                    password,
                    avatarURL: newUser,
                    answers: {},
                    questions: []
                }
            }
        default:
            return state
    }
}

export default users