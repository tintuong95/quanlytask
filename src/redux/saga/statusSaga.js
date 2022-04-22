import { call, put, takeLatest } from "redux-saga/effects";
import statusService from "../../services/statusService";
import { STATUS_CODE } from "../../util/contants/contantService";

function* getStatusActionSaga() {
    try {
        let { data, status } = yield call(() => statusService.getStatus())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "GET_STATUS",
                payload: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}


export function* getStatusWatchSaga() {
    yield takeLatest("GET_STATUS_SAGA", getStatusActionSaga)
}