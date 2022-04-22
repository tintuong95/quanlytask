import { notification } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { openNotification } from "../../components/Notification";
import { projectService } from "../../services/projectService";
import { STATUS_CODE } from "../../util/contants/contantService";
import {
  getAllProjectAction,
  getAllProjectSagaAction,
  getDetailProject,
  getProjectCategoryAction,
} from "../actions/projectAction";
import {
  GET_ALL_PROJECT_SAGA,
  GET_DETAIL_PROJECT_SAGA,
  GET_PROJECT_CATEGORY_SAGA,
} from "../contants/projectContant";
import { CREATE_PROJECT_SAGA } from "../contants/userContant";

function* getAllProjcetSagaAction(action) {
  try {
    let { data, status } = yield call(() => {
      return projectService.getAllProject();
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put(getAllProjectAction(data.content));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getAllProjectWatchSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjcetSagaAction);
}

function* getProjectCategorySagaAction(action) {
   
  try {
    let { data, status } = yield call(() =>
      projectService.getProjectCategory()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(getProjectCategoryAction(data.content));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getProjectCategoryWatchSaga() {
    
  yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySagaAction);
}

function* createProjectSagaAction(action) {

  try {
    let { data, status } = yield call(() => {
      return projectService.createProject(action.payload);
    });
    if (status === STATUS_CODE.SUCCESS) {
        
      yield put(getAllProjectSagaAction());
      openNotification("success","Thành công !",)
    }
  } catch (err) {
    openNotification("error","Thất bại !",)
  }
}

export function* createProjectWatchSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSagaAction);
}


function * getDetailProjectSagaAction(action){
   
    try{
        let {data,status}=yield call(()=>{
            return projectService.getDetailProject(action.payload)
        })
     
        if(status===STATUS_CODE.SUCCESS){
         
            yield put(getDetailProject(data.content))
        }
    }
    catch(err){
        console.log(err)
    }
}


export function * getDetailProjectWatchSaga(){
    yield takeLatest(GET_DETAIL_PROJECT_SAGA,getDetailProjectSagaAction)
}

function * removeProjectActionSaga(action){
  
  try{
    let {data,status}=yield call(()=>{
      return projectService.removeProject(action.payload)
    })
    if(status===STATUS_CODE.SUCCESS){
      
      yield put(getAllProjectSagaAction())
      openNotification("success","Thành công !",)
    }
  }catch(err){
    openNotification("error","Thất bại !",)
  }
}

export function * removeProjectWatchSaga(){
  yield takeLatest("REMOVE_PROJECT_SAGA",removeProjectActionSaga)
}


function * updateProjectActionSaga(action){
 
  try{
      let {data,status}=yield call(()=>{
        return projectService.updataProject(action.payload.id,action.payload.data)
        
      })
      if(status===STATUS_CODE.SUCCESS){
        yield put(getAllProjectSagaAction())
        openNotification("success","Thành công !",)
      }
  }catch(err){
    openNotification("error","Thất bại !",)
  }
}


export function * updateProjectWatchSaga(){
  yield takeLatest("UPDATE_PROJECT_SAGA",updateProjectActionSaga)
}