import { call, takeLatest } from "redux-saga/effects";
import { signupService } from "../../services/signupService";
import { SIGNUP_POST_SAGA } from "../contants/signupContant";
import {STATUS_CODE,TOKEN} from "../../util/contants/contantService"
import {history} from "../../util/libs/history";
function * signupActionPostSaga(action){
    try{
        let {data,status}=yield call(()=>{
            return signupService.signupPost(action.payload)
        })
        if(status===STATUS_CODE.SUCCESS){
            history.push("/login")
        }
    }catch(err){
        console.log(err)
    }
}
export function * signupWatchPostSaga(){
    yield takeLatest(SIGNUP_POST_SAGA,signupActionPostSaga)
}