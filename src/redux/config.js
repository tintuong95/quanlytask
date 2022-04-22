import { combineReducers, applyMiddleware, createStore } from "redux";

import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
import projectReducer from "./reducer/projectReducer";
import userReducer from "./reducer/userReducer";
import modalReducer from "./reducer/modalReducer";
import taskTypeReducer from "./reducer/taskTypeReducer";
import priorityReducer from "./reducer/priorityReducer";
import statusReducer from "./reducer/statusReducer";

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
    projectReducer,
    userReducer,
    modalReducer,
    taskTypeReducer,
    priorityReducer,
    statusReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;