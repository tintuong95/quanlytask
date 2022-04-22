import { ADD_COMMENT_TASK_SAGA, CREATE_TASK_SAGA, DELETE_COMMENT_TASK_SAGA, GET_DETAIL_PROJECT_SAGA, GET_PRIORITY_SAGA, GET_STATUS_SAGA, GET_TASKTYPE_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, PUT_UPDATE_COMMENT_SAGA, PUT_UPDATE_STATUS_SAGA, PUT_UPDATE_TASKDETAIL } from "../contants/taskContant"

export const createTaskSagaAction = (data) => {
    return {
        type: CREATE_TASK_SAGA,
        payload: data,
    }
}
export const getDetailProjectSagaAction = (data) => {
    return {
        type: GET_DETAIL_PROJECT_SAGA,
        payload: data,
    }
}

export const getTaskTypeSagaAction = () => {
    return {
        type: GET_TASKTYPE_SAGA,

    }
}
export const getPrioritySagaAction = () => {
    return {
        type: GET_PRIORITY_SAGA,

    }
}
export const getStatusSagaAction = () => {
    return {
        type: GET_STATUS_SAGA,

    }
}
export const getTaskDetailAction = (data) => {
    return {
        type: GET_TASK_DETAIL,
        payload: data
    }
}
export const putUpdateTaskDetailAction = (data) => {
    return {
        type: PUT_UPDATE_TASKDETAIL,
        payload: data
    }
}
export const addCommentTaskSagaAction = (data) => {
    return {
        type: ADD_COMMENT_TASK_SAGA,
        payload: data
    }
}
export const deleteCommentTaskSagaAction = (data) => {
    return {
        type: DELETE_COMMENT_TASK_SAGA,
        payload: data
    }
}
export const putUpdateStatusSagaAction = (data) => {
    return {
        type: PUT_UPDATE_STATUS_SAGA,
        payload: data
    }
}
export const getDetailTaskSagaAction = (data) => {
    return {
        type: GET_TASK_DETAIL_SAGA,
        payload: data
    }
}
export const putUpdateCommentSagaAction = (data) => {
    return {
        type: PUT_UPDATE_COMMENT_SAGA,
        payload: data
    }
}