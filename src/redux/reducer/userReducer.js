import { FIND_USER } from "../contants/userContant"

const initialState = {
    findUserData: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case FIND_USER:
            {
                return {...state, findUserData: payload }
            }


        default:
            return state
    }
}