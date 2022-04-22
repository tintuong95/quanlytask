import { call, put, takeLatest } from "redux-saga/effects";
import taskTypeService from "../../services/taskTypeService";
import { STATUS_CODE } from "../../util/contants/contantService";
import { getAllProjectSagaAction } from "../actions/projectAction";
import { openNotification } from "../../components/Notification"

function* getTaskTypeSagaAction(action) {
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.getTaskType();
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_TASKTYPE",
                payload: data.content,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getTaskTypeWatchSaga() {
    yield takeLatest("GET_TASKTYPE_SAGA", getTaskTypeSagaAction);
}

function* createTaskActionSaga(action) {
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.createTaskType(action.payload);
        });
        if (status == STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            openNotification("success", "Thành công")
        }
    } catch (err) {
        openNotification("error", "Thất bại")
    }
}

export function* createTaskWatchSaga() {
    yield takeLatest("CREATE_TASK_SAGA", createTaskActionSaga);
}

function* getTaskDetailActionSaga(action) {
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.getTaskDetail(action.payload);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_TASK_DETAIL",
                payload: data.content,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getTaskDetailWatchSaga() {
    yield takeLatest("GET_TASK_DETAIL_SAGA", getTaskDetailActionSaga);
}

function* putUpdateTaskDetailActionSaga(action) {
    console.log(action);
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.putUpdateTaskDetail(action.payload.data);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_DETAIL_PROJECT_SAGA",
                payload: action.payload.id,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* putUpdateTaskDetailWatchSaga() {
    yield takeLatest("PUT_UPDATE_TASKDETAIL", putUpdateTaskDetailActionSaga);
}

function* putUpdateStatusTaskActionSaga(action) {
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.putUpdateStatusTask(action.payload);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_DETAIL_PROJECT_SAGA",
                payload: action.payload.id,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* putUpdateStatusTaskWatchSaga() {
    yield takeLatest("PUT_UPDATE_STATUS_SAGA", putUpdateStatusTaskActionSaga);
}

function* addUserToTaskActionSaga(action) {
    console.log(action);
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.addUserToTask(action.payload);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_TASK_DETAIL_SAGA",
                payload: action.payload.taskId,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* addUserToTaskWatchSaga(action) {
    yield takeLatest("ADD_USER_TASK_SAGA", addUserToTaskActionSaga);
}

function* addCommentToTaskActionSaga(action) {
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.addCommentToTask(action.payload)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_TASK_DETAIL_SAGA",
                payload: action.payload.taskId,
            })

        }
    } catch (err) {
        console.log(err)
    }
}


export function* addCommentToTaskWatchSaga() {
    yield takeLatest("ADD_COMMENT_TASK_SAGA", addCommentToTaskActionSaga)
}


function* deleteCommentTaskActionSaga(action) {
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.deleteCommmentTask(action.payload.id)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_TASK_DETAIL_SAGA",
                payload: action.payload.taskId,
            })
            openNotification("success", "Thành công")
        }

    } catch (err) {
        openNotification("error", "Thất bại")
    }
}


export function* deleteCommentTaskWatchSaga() {
    yield takeLatest("DELETE_COMMENT_TASK_SAGA", deleteCommentTaskActionSaga)
}


function* putUpdateCommentTaskActionSaga(action) {
    console.log(action)
    try {
        let { data, status } = yield call(() => {
            return taskTypeService.putUpdateCommentTask(action.payload.id, action.payload.content)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_TASK_DETAIL_SAGA",
                payload: action.payload.taskId,
            })
            openNotification("success", "Thành công")
        }
    } catch (err) {
        openNotification("error", "Thất bại")
    }
}

export function* putUpdateCommentTaskWatchSaga() {
    yield takeLatest("PUT_UPDATE_COMMENT_SAGA", putUpdateCommentTaskActionSaga)
}