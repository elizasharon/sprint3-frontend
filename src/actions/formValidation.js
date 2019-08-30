import { USER_BASIC_DATA_EVENT_HANDLER } from './types';

export const userDataEventHandler = (data) => (dispatch) => {
    console.log(data);
    return dispatch({
        type: USER_BASIC_DATA_EVENT_HANDLER,
        payload: data
    })
}