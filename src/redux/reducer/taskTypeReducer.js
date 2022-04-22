const initialState = {
    taskTypeData: [],
    taskTypeDetailData: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "GET_TASKTYPE":
            return {...state, taskTypeData: payload };
        case "GET_TASK_DETAIL":
            return {...state, taskTypeDetailData: payload };
        default:
            return state;
    }
};