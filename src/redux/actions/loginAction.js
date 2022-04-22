import { LOGIN_POST_SAGA } from "../contants/signupContant";

export const loginSagaAction = (data) => ({
    type: LOGIN_POST_SAGA,
    payload: data,
});