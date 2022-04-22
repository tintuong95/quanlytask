import { SIGNUP_POST_SAGA } from "../contants/signupContant";

export const signupSagaAction = (data) => ({
    type: SIGNUP_POST_SAGA,
    payload: data,
});