import { ADD_USER_PROJECT_SAGA, FIND_USER, FIND_USER_SAGA, REMOVE_PROJECT_SAGA, REMOVE_USER_PROJECT_SAGA } from "../contants/userContant";

export const findUserSagaAction = (keyword) => {
    return {
        type: FIND_USER_SAGA,
        payload: keyword,
    };
};

export const findUserAction = (data) => {
    return {
        type: FIND_USER,
        payload: data
    }
}

export const addUserToProjectAction = (data) => {
    return {
        type: ADD_USER_PROJECT_SAGA,
        payload: data,
    }
}
export const removeUserProjectSagaAction = (data) => {
    return {
        type: REMOVE_USER_PROJECT_SAGA,
        payload: data,
    }
}
export const removeProjectSaga = (data) => {
    return {
        type: REMOVE_PROJECT_SAGA,
        payload: data,
    }
}