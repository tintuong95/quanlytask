import { call, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../services/userService";
import { ADD_USER_PROJECT_SAGA, FIND_USER_SAGA } from "../contants/userContant";
import { STATUS_CODE } from "../../util/contants/contantService"
import { findUserAction } from "../actions/userAction";
import { getAllProjectSagaAction } from "../actions/projectAction";
import { openNotification } from "../../components/Notification";

function* findUserGetSagaAction(action) {
    try {
        let { data, status } = yield call(() => {
            return userService.findUser(action.payload)
        })
        if (status == STATUS_CODE.SUCCESS) {

            yield put(findUserAction(data.content))
        }
    } catch (err) {
        console.log(err)
    }
}


export function* findUserWatchSaga() {
    yield takeLatest(FIND_USER_SAGA, findUserGetSagaAction)
}

function* addUserProjectSagaAction(action) {
    console.log(action)
    try {
        let { data, status } = yield call(() => {
            return userService.addUserProject(action.payload)
        })
        if (status === STATUS_CODE.SUCCESS) {
            // console.log(data)
            yield put(getAllProjectSagaAction())
            openNotification("success", "Thành công !", )
        }
    } catch (err) {
        openNotification("error", "Thất bại !", )
    }
}

export function* addUserToProjectWatchSaga() {

    yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSagaAction)
}



function* removeUserProjectSagaAction(action) {
    try {
        let { data, status } = yield call(() => {
            return userService.removerUserProject(action.payload)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction())
            openNotification("success", "Thành công !", )
        }
    } catch (err) {
        openNotification("error", "Thất bại !", )
    }
}

export function* removeUserProjectWatchSaga() {
    yield takeLatest("REMOVE_USER_PROJECT_SAGA", removeUserProjectSagaAction)
}