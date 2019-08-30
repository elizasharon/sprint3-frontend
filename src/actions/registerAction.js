import {
    FETCH_SECURITY_QUESTIONS, FILTER_SECURITY_QUESTIONS,
    FILTER_SECURITY_QUESTION_ONE, FILTER_SECURITY_QUESTION_TWO,
    USER_BASIC_DATA_EVENT_HANDLER, PASSWORD_EVENT_HANDLER,
    SECURITY_ANSWER_ONE, SECURITY_ANSWER_TWO, 
    GENDER_EVENT_HANDLER, MARITAL_STATUS_EVENT_HANDLER,
    SET_USER_ID
} from './types';
import Axios from '../Axios';

export const fetchSecurityQuestions = (filterQuestions) => dispatch => {
    Axios.auth.getSecurityQuestions()
        .then(response => {
            dispatch({
                type: FETCH_SECURITY_QUESTIONS,
                payload: response.data
            })
        }).then(() => { filterQuestions(1, 3) })
}

export const filterSecurityQuestions = (data) => (dispatch) => {
    dispatch({
        type: FILTER_SECURITY_QUESTIONS,
        payload: data
    })
}

export const filterSecurityQuestionOne = (data) => (dispatch) => {
    dispatch({
        type: FILTER_SECURITY_QUESTION_ONE,
        payload: data
    })
}

export const filterSecurityQuestionTwo = (data) => (dispatch) => {
    dispatch({
        type: FILTER_SECURITY_QUESTION_TWO,
        payload: data
    })
}

export const userDataEventHandler = (data) => (dispatch) => {
    return dispatch({
        type: USER_BASIC_DATA_EVENT_HANDLER,
        payload: data
    })
}

export const passwordEventHandler = (data) => (dispatch) => {
    return dispatch({
        type: PASSWORD_EVENT_HANDLER,
        payload: data
    })
}

export const selectBoxEventHandler = (data) => (dispatch) => {
    if (data.name === "gender") {
        return dispatch({
            type: GENDER_EVENT_HANDLER,
            payload: data.value
        })
    }
    else {
        return dispatch({
            type: MARITAL_STATUS_EVENT_HANDLER,
            payload: data.value
        })
    }
}


export const securityAnswers = (data) => (dispatch) => {

    if (data.answerID === 1) {
        return dispatch({
            type: SECURITY_ANSWER_ONE,
            payload: data.answer
        })
    }
    else {
        return dispatch({
            type: SECURITY_ANSWER_TWO,
            payload: data.answer
        })
    }
}

export const setUserId = (data) => (dispatch) => {
    console.log(data);
    return dispatch({
        type: SET_USER_ID,
        payload: data
    })
}

