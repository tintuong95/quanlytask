import {
    GET_ALL_PROJECT,
    GET_PROJECT_CATEGORY,
    GET_PROJECT_DETAIL,
} from "../contants/projectContant";

const initialState = {
    allProjectData: [],
    allProjectCategory: [],
    projectDetail: {

        lstTask: [{ lstTaskDeTail: Array(1), statusId: '1', statusName: 'BACKLOG', alias: 'tồn đọng' }],
        members: [{ userId: 1030, name: 'long', avatar: 'https://ui-avatars.com/api/?name=long', email: null, phoneNumber: null }],
    },
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_PROJECT:
            return {...state, allProjectData: payload };
        case GET_PROJECT_CATEGORY:
            return {...state, allProjectCategory: payload };
        case GET_PROJECT_DETAIL:
            {

                state.projectDetail = payload

                return {...state };
            }
        default:
            return state;
    }
};