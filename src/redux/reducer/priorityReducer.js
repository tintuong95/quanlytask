const initialState = {
    priorityData: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "GET_PRIORITY":
            return {...state, priorityData: payload }

        default:
            return state
    }
}