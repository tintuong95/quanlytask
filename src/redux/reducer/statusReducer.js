const initialState = {
    statusData: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "GET_STATUS":
            return {...state, statusData: payload }

        default:
            return state
    }
}