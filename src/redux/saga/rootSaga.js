import React from "react";
import { all } from "redux-saga/effects";
import * as SignupSaga from "./signupSaga";
import * as LoginSaga from "./loginSaga";
import * as ProjectSaga from "./projectSaga";
import * as UserSaga from "./userSaga";
import * as TaskTypeSaga from "./taskTypeSaga";
import * as PrioritySaga from "./prioritySaga";
import * as StatusSaga from "./statusSaga";

export function* rootSaga() {
  yield all([
    SignupSaga.signupWatchPostSaga(),
    LoginSaga.loginWatchPostSaga(),
    ProjectSaga.getAllProjectWatchSaga(),
    UserSaga.findUserWatchSaga(),
    UserSaga.addUserToProjectWatchSaga(),
    UserSaga.removeUserProjectWatchSaga(),
    ProjectSaga.getProjectCategoryWatchSaga(),
    ProjectSaga.createProjectWatchSaga(),
    ProjectSaga.getDetailProjectWatchSaga(),
    TaskTypeSaga.getTaskTypeWatchSaga(),
    PrioritySaga.getPriorityWatchSaga(),
    StatusSaga.getStatusWatchSaga(),
    ProjectSaga.removeProjectWatchSaga(),
    TaskTypeSaga.createTaskWatchSaga(),
    ProjectSaga.updateProjectWatchSaga(),
    TaskTypeSaga.getTaskDetailWatchSaga(),
    TaskTypeSaga.putUpdateTaskDetailWatchSaga(),
    TaskTypeSaga.putUpdateStatusTaskWatchSaga(),
    TaskTypeSaga.addUserToTaskWatchSaga(),
    TaskTypeSaga.addCommentToTaskWatchSaga(),
    TaskTypeSaga.deleteCommentTaskWatchSaga(),
    TaskTypeSaga.putUpdateCommentTaskWatchSaga(),
  ]);
}
