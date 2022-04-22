import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_DETAIL_PROJECT_SAGA, GET_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_SAGA, GET_PROJECT_DETAIL } from "../contants/projectContant"
import { CREATE_PROJECT_SAGA } from "../contants/userContant"

export const getAllProjectSagaAction = () => {

    return {
        type: GET_ALL_PROJECT_SAGA
    }
}

export const getAllProjectAction = (data) => {
    return {
        type: GET_ALL_PROJECT,
        payload: data,
    }
}


export const getProjectCategoryAction = (data) => {
    return {
        type: GET_PROJECT_CATEGORY,
        payload: data
    }
}

export const getProjectCategorySagaAction = () => {
    return {
        type: GET_PROJECT_CATEGORY_SAGA
    }
}

export const addProjectSagaAction = (data) => {
    return {
        type: CREATE_PROJECT_SAGA,
        payload: data,
    }
}


export const getDetailProject = (data) => {
    return {
        type: GET_PROJECT_DETAIL,
        payload: data,
    }
}


export const getDetailProjectSaga = (id) => {
    return {
        type: GET_DETAIL_PROJECT_SAGA,
        payload: id,
    }
}

