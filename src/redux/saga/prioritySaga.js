import { call, put, takeLatest } from "redux-saga/effects";
import priorityService from "../../services/priorityService";
import { STATUS_CODE } from "../../util/contants/contantService";

function* getPrioritySagaAction() {
    try {
        let { data, status } = yield call(() => priorityService.getPriority())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_PRIORITY",
                payload: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* getPriorityWatchSaga() {
    yield takeLatest("GET_PRIORITY_SAGA", getPrioritySagaAction)
}