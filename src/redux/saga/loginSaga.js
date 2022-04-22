import { call, takeLatest } from "redux-saga/effects";
import { signupService } from "../../services/signupService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/contants/contantService";
import { history } from "../../util/libs/history";

function * loginPostSagaAction(action){
    try{
        let {data,status}=yield call(()=>{
            return signupService.loginPost(action.payload)
        })
        if(status===STATUS_CODE.SUCCESS){
            
            localStorage.setItem(TOKEN,data.content.accessToken)
            localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))
            history.push("/home")
        }
    }catch(err){
        console.log(err)
    }
}

export function * loginWatchPostSaga(){
    yield takeLatest("LOGIN_POST_SAGA",loginPostSagaAction)
}